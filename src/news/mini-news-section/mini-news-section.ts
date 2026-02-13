import {Component, OnInit} from '@angular/core';
import {SanityService} from '../../sanity.service';
import {IMiniNews} from '../news';
import {MiniNews} from '../mini-news/mini-news';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-mini-news-section',
  imports: [MiniNews, CommonModule],
  templateUrl: './mini-news-section.html',
  styleUrl: './mini-news-section.css',
})
export class MiniNewsSection implements OnInit {
  public miniNews: Promise<IMiniNews[]> = new Promise(() => []);

  constructor(private readonly sanity: SanityService) {}

  ngOnInit(): void {
    const today = new Date();
    const aMonthAgo = new Date(today);
    if (today.getMonth() > 0)
      aMonthAgo.setMonth(today.getMonth() - 1);
    else {
      aMonthAgo.setFullYear(today.getFullYear() - 1);
      aMonthAgo.setMonth(11); // Month is 0-indexed, 11 is December
    }

    this.miniNews = this.sanity.getRecentNews(aMonthAgo);
  }
}
