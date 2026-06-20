import { Component } from '@angular/core';
import { ConfirmationDialog } from '../../shared/components/confirmation-dialog/confirmation-dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth/auth-service';

@Component({
  selector: 'app-dashboard',
  imports: [ConfirmationDialog],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  showLogoutDialog = false;
  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  logout() {
    //this.router.navigate(['./login']);
    console.log("Logged out")
    this.authService.logout();
    this.showLogoutDialog = false;
  }

  cancelLogout() {
    this.showLogoutDialog = false;
  }

  openLogoutDialog() {
    this.showLogoutDialog = true;
  }
}
