import { Injectable } from '@angular/core';
import { TokenService } from '../token/token-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ){}

  navigateByRole(){
    
    const role = this.tokenService.getRole()
    
    switch (role) {
      case 'Admin':
        this.router.navigate(['/admin']);
        break;

      case 'Recruiter':
        this.router.navigate(['/recruiter']);
        break;

      case 'HR':
        this.router.navigate(['/hr']);
        break;

      case 'Candidate':
        this.router.navigate(['/candidate']);
        break;

      case 'Interviewer':
        this.router.navigate(['/interviewer']);
        break;

      default:        
        this.router.navigate(['/login']);
    }
  }
}
