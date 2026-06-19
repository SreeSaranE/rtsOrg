import { Component } from '@angular/core';
import { ConfirmationDialog } from '../../shared/components/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-dashboard',
  imports: [ConfirmationDialog],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  showLogoutDialog = false;

  logout() {
    console.log('User logged out');
    this.showLogoutDialog = false;
  }

  cancelLogout() {
    this.showLogoutDialog = false;
  }

  openLogoutDialog() {
    this.showLogoutDialog = true;
  }
}
