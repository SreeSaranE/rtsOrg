import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button';
import { NavigationService } from '../../core/service/navigation/navigation-service';

@Component({
  selector: 'app-unauthorized',
  imports: [ButtonComponent],
  templateUrl: './unauthorized.html',
  styleUrl: './unauthorized.css',
})
export class Unauthorized {

  constructor(
    private router: Router,
    private navigationService: NavigationService
  ){}

  navigateHome(){
    this.navigationService.navigateByRole()
  }
}
