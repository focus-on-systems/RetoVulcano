import {ImageGallery} from './gallery-image';

export interface INews {
  title: string;
  date: string;
  short_description: string;
  description?: string;
  images?: ImageGallery;
  body: any[]; // 'block' content usually comes as an array of objects
  author?: string;
}

export type IMiniNews = Pick<INews, 'title' | 'date' | 'short_description' | 'images' | 'author'>;
