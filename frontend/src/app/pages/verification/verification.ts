import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button';

@Component({
  selector: 'app-verification',
  imports: [ButtonComponent],
  templateUrl: './verification.html',
  styleUrl: './verification.css',
})
export class Verification {
    constructor(
    private router: Router,
  ){}

  navigateLogin(){
    this.router.navigate(['/login'])
  }
}
