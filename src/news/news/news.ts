import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { INews } from '../news';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {SanityService} from '../../sanity.service';
import { BackButtonComponent } from '../../app/back-button';

@Component({
  selector: 'app-news',
  imports: [DatePipe, BackButtonComponent, NgTemplateOutlet],
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

  getLink(markKey: string, markDefs: any[]): string | null {
    const def = markDefs.find(m => m._key === markKey);
    return def ? def.href : null;
  }
}
