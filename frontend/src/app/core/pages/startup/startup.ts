import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../service/auth/token-service';

@Component({
  selector: 'app-startup',
  template: ''
})
export class StartupComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const token = this.tokenService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    const role = this.tokenService.getRole();

    switch(role?.toLowerCase()) {

      case 'admin':
        this.router.navigate(['/admin/dashboard']);
        break;

      case 'recruiter':
        this.router.navigate(['/recruiter/dashboard']);
        break;

      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}