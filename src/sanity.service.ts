import { Injectable } from '@angular/core';
import { createClient } from '@sanity/client';
import {createImageUrlBuilder} from '@sanity/image-url';
import {IMiniNews, INews} from './news/news';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  public readonly client = createClient({
    projectId: 'ww43trcd', // Replace with your project ID
    dataset: 'production', // Or your specific dataset name
    useCdn: true, // Use a CDN for faster delivery of content
    apiVersion: 'v2026-02-13', // Use a recent API version
  });

  private readonly imgUrlBuilder = createImageUrlBuilder(this.client);

  public async getRecentNews(since: Date): Promise<IMiniNews[]> {
    const sanityQuery = `*[_type == 'news' && date > $since]{
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
      return Promise.reject(e);
    }
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
      return Promise.reject(e);
    }
  }
}
