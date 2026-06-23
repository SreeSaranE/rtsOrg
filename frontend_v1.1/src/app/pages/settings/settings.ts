import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [ButtonComponent],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {

  constructor(
    private router: Router
  ){}

  logout(){
    this.router.navigate(['./login'])
  }
}
