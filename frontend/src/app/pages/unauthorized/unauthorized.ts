import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button';

@Component({
  selector: 'app-unauthorized',
  imports: [ButtonComponent],
  templateUrl: './unauthorized.html',
  styleUrl: './unauthorized.css',
})
export class Unauthorized {

  constructor(
    private router: Router,
  ){}

  navigateHome(){
    this.router.navigate(['.'])
  }
}
