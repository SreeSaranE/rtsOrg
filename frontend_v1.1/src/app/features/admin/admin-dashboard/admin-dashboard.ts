import { Component } from '@angular/core';
import { AdminServices } from '../services/admin-services';
import { ButtonComponent } from "../../../shared/components/button/button";
import { DatePipe } from '@angular/common';
import { Sidebar } from "../../../shared/components/sidebar/sidebar";

export interface userDetails {
  userId: number,
  name: string,
  email: string,
  role: string,
  isActive: boolean,
  createdAt: Date
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [ButtonComponent, DatePipe, Sidebar],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  constructor(
    private adminService: AdminServices
  ){}

  users: any[] = [];
  navList = ["Dashboard", "Users", "Candidates"]

  getDetail(){
    this.adminService.getAllUsers()
    .subscribe({
      next: (response) => {
        console.log(response);
        this.users = response;
      },
      error: (error) => {
        console.log(error);
        
      }
    })
  }

  //----------------------


  currentPage = 1;
  pageSize = 10;

  get totalPages(): number {
    return Math.ceil(this.users.length / this.pageSize);
  }

  get pagedUsers(): userDetails[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.users.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  updateStatus(user: userDetails, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    user.isActive = value === 'true';
  }
  //----------------------
}
