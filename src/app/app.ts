import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * @description
 * Represents the root component of the application.
 *
 * This component serves as the entry point for the Angular application. It defines
 * the root view and configuration for the application, including the primary router outlet.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('retovulcano');
}
