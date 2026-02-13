import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MiniNewsSection} from '../news/mini-news-section/mini-news-section';
import {Footer} from './footer/footer';

/**
 * @description
 * Represents the root component of the application.
 *
 * This component serves as the entry point for the Angular application. It defines
 * the root view and configuration for the application, including the primary router outlet.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MiniNewsSection, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('retovulcano');
}
