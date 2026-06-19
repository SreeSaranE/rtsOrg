import { Component } from '@angular/core';
import { ConfirmationDialog } from '../../shared/components/confirmation-dialog/confirmation-dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ConfirmationDialog],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  showLogoutDialog = false;
  constructor(
    private router: Router
  ){}

  logout() {
    this.router.navigate(['./login']);
    this.showLogoutDialog = false;
  }

  cancelLogout() {
    this.showLogoutDialog = false;
  }

  openLogoutDialog() {
    this.showLogoutDialog = true;
  }
}
