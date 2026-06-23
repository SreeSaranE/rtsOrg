import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [ButtonComponent],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {

  constructor(
    private router: Router
  ){}

  navigateHome(){
    this.router.navigate(['.'])
  }
}
