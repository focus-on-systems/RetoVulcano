import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { INews } from '../news';
import { DatePipe, NgStyle } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {SanityService} from '../../sanity.service';

@Component({
  selector: 'app-news',
  imports: [DatePipe],
  templateUrl: './news.html',
  styleUrl: './news.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class News implements OnInit {
  @Input() public data: INews = {} as INews;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly sanity: SanityService,
    private readonly changeRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sanity.getNews(id).then(news => {
        this.data = news;
        this.changeRef.detectChanges();
      });
    }
  }
}
