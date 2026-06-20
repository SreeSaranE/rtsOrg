import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../service/auth/token-service';
import { NavigationService } from '../../service/navigation/navigation-service';

@Component({
  selector: 'app-startup',
  template: ''
})

export class StartupComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn(): void{
    const token = this.tokenService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.navigationService.navigateByRole()
  }
}