import { Component, signal } from '@angular/core';
import { ThemeService } from './core/services/theme/theme-service';
import { RouterOutlet } from '@angular/router';
import { NavigationService } from './core/services/navigation/navigation-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend_v1.1');

  constructor(
    private readonly themeSerice: ThemeService,
  ){}
}
