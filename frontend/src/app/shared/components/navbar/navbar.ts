import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  username = localStorage.getItem('email');
  role = localStorage.getItem('role');

  constructor(private router: Router) {}

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');

    this.router.navigate(['/login']);
  }
}