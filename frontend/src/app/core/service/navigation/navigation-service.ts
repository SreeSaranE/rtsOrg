import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../auth/token-service';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  navigateByRole(): void {
    const role = this.tokenService.getRole();

    switch (role) {
      case 'admin':
        this.router.navigate(['/admin/dashboard']);
        break;

      case 'recruiter':
        this.router.navigate(['/recruiter/dashboard']);
        break;

      case 'hr':
        this.router.navigate(['/hr/dashboard']);
        break;

      case 'candidate':
        this.router.navigate(['/candidate/dashboard']);
        break;

      default:
        this.router.navigate(['/login']);
    }
  }
}

