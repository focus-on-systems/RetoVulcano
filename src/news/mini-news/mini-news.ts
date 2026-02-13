import {Component, Input} from '@angular/core';
import {IMiniNews} from '../news';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-mini-news',
  imports: [
    DatePipe,
  ],
  templateUrl: './mini-news.html',
  styleUrl: './mini-news.css',
})
export class MiniNews {
  @Input() public data: IMiniNews = {} as IMiniNews;
}
