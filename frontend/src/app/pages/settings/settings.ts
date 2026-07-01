import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button';
import { Router } from '@angular/router';
import { ConfirmationDialog} from '../../shared/components/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-settings',
  imports: [ButtonComponent, ConfirmationDialog],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {

  constructor(
    private router: Router
  ){}

  showLogoutDialog = false;

  openLogoutDialog(){
    this.showLogoutDialog = true;
  }

  logout(){
    this.router.navigate(['./login'])
    localStorage.clear();
  }

  cancelLogout(){
    this.showLogoutDialog = false;
  }
}
