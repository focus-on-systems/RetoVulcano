import { Routes } from '@angular/router';
import {News} from '../news/news/news';
import {Landing} from './landing/landing';

export const routes: Routes = [
  {
    path: 'news/:id',
    component: News
  },
  {
    path: '**',
    component: Landing
  },
];
