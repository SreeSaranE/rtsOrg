import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../../shared/components/sidebar/sidebar';
@Component({
  selector: 'app-admin-dashboard',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  
  navList = ["Dashboard", "Users", "Candidates"]

  showSidebar = signal<boolean>(true);

  onSidebarChange(value: boolean) {
    this.showSidebar.set(value);
    console.log(value);
  } 
}
