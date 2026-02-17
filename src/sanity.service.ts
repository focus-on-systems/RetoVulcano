import {Injectable} from '@angular/core';
import {createClient} from '@sanity/client';
import {createImageUrlBuilder} from '@sanity/image-url';
import {IMiniNews, INews} from './news/news';
import {ICurrentEditionInfo} from './app/current-edition-info';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private readonly CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  private cache: { [key: string]: { data: any, timestamp: number } } = {};

  public readonly client = createClient({
    projectId: 'ww43trcd', // Replace with your project ID
    dataset: 'production', // Or your specific dataset name
    useCdn: true, // Use a CDN for faster delivery of content
    apiVersion: 'v2026-02-13', // Use a recent API version
  });

  private readonly imgUrlBuilder = createImageUrlBuilder(this.client);

  private async getCachedData<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
    // TODO store in sessionStorage
    const cached = this.cache[key];
    const now = Date.now();

    if (cached && (now - cached.timestamp < this.CACHE_DURATION_MS)) {
      return cached.data;
    }

    try {
      const data = await fetchFn();
      this.cache[key] = { data, timestamp: now };
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async getRecentNews(since: Date): Promise<IMiniNews[]> {
    since.setHours(0, 0, 0, 0);
    const cacheKey = `recentNews_${since.getTime()}`;
    return this.getCachedData(cacheKey, async () => {
      const sanityQuery = `*[_type == 'news' && 'reto-vulcano' in tags && date > $since]{
          _id,
          author,
          date,
          description,
          images,
          short_description,
          title
        }`;

      try {
        const miniNews = await this.client.fetch<IMiniNews[]>(sanityQuery, {since});
        return miniNews.map(news => {
          if (!news.images)
            return news;

          news.images.Gallery.forEach(image => image.asset.url = this.imgUrlBuilder.image(image.asset).url());
          return news;
        });
      } catch (e) {
        // TODO: Handle error in UI!
        console.error("Failed to fetch news", e);
        throw e;
      }
    });
  }

  public async getNews(id: string): Promise<INews> {
    const sanityQuery = `*[_type == 'news' && _id == $id][0]{
        _id,
        author,
        date,
        description,
        images,
        short_description,
        title,
        body
      }`;

    try {
      const news = await this.client.fetch<INews>(sanityQuery, {id});
      if (news && news.images)
        news.images.Gallery.forEach(image => image.asset.url = this.imgUrlBuilder.image(image.asset).url());
      return news;
    } catch (e) {
      console.error("Failed to fetch news", e);
      throw e;
    }
  }

  public async getCurrentEdition(): Promise<ICurrentEditionInfo> {
    const cacheKey = "currentEdition";
    return this.getCachedData(cacheKey, async () => {
      const sanityQuery = `*[_type == 'edition' && 'reto-vulcano' in tags]{
          _id,
          date,
          miniDescription,
          description
        } | order(date desc)[0]`;

      try {
        return await this.client.fetch<ICurrentEditionInfo>(sanityQuery);
      } catch (e) {
        // TODO: Handle error in UI!
        console.error("Failed to fetch current edition", e);
        throw e;
      }
    });
  }
}
