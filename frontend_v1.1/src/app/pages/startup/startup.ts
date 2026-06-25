import { Component } from '@angular/core';
import { NavigationService } from '../../core/services/navigation/navigation-service';

@Component({
  selector: 'app-startup',
  imports: [],
  templateUrl: './startup.html',
  styleUrl: './startup.css',
})
export class Startup {

  constructor(
    private navigationService: NavigationService
  ){
    navigationService.navigateByRole()
  }
}
