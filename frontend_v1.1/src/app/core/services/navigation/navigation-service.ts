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
    const isActive = this.tokenService.isActive()
    if(!isActive){
      console.log("Your account still hasn't been verified by admin");
      return;
    }
    console.log("You are good to go");
    
    const role = this.tokenService.getRole()
    if (!role) return;
    console.log(role);

  }
}
