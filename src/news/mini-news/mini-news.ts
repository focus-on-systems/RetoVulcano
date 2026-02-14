import {Component, Input} from '@angular/core';
import {IMiniNews} from '../news';
import {DatePipe, NgOptimizedImage, NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-mini-news',
  imports: [
    DatePipe,
    NgStyle,
    RouterLink
  ],
  templateUrl: './mini-news.html',
  styleUrl: './mini-news.css',
  standalone: true
})
export class MiniNews {
  @Input() public data: IMiniNews = {} as IMiniNews;
}
