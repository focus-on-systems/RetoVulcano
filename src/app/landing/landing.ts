import { Component } from '@angular/core';
import { MiniNewsSection } from '../../news/mini-news-section/mini-news-section';
import { LandingInfo } from '../landing-info/landing-info';
import { CurrentEditionInfo } from '../current-edition-info/current-edition-info';

@Component({
  selector: 'app-landing',
  imports: [MiniNewsSection, LandingInfo, CurrentEditionInfo],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  standalone: true
})
export class Landing {}
