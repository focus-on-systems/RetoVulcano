import {ImageGallery} from './gallery-image';

export interface INews {
  _id: string;
  title: string;
  date: string;
  short_description: string;
  description?: string;
  images?: ImageGallery;
  body: any[]; // 'block' content usually comes as an array of objects
  author?: string;
}

export type IMiniNews = Pick<INews, '_id' | 'title' | 'date' | 'short_description' | 'images' | 'author'>;
