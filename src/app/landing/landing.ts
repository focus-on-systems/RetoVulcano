import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { MiniNewsSection } from '../../news/mini-news-section/mini-news-section';
import { LandingInfo } from '../landing-info/landing-info';
import { CurrentEditionInfo } from '../current-edition-info/current-edition-info';
import {SanityService} from '../../sanity.service';
import {DatePipe, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-landing',
  imports: [MiniNewsSection, LandingInfo, CurrentEditionInfo, DatePipe, UpperCasePipe],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Landing implements OnInit {
  public editionDate: Date | null = null;

  constructor(
    private readonly sanity: SanityService,
    private readonly changeRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sanity.getCurrentEdition().then(edition => {
      if (edition) {
        this.editionDate = edition.date;
        this.changeRef.detectChanges();
      }
    });
  }
}
