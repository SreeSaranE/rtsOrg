import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/components/button/button';
import { DatePipe } from '@angular/common';
import { AdminServices } from '../../../../services/admin/admin-service';
import { UserStore } from '../../../../services/admin/user.store';
import { userDetails } from '../../../../services/admin/models/userDetails';
import { ConfirmationDialog } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-users',
  imports: [ButtonComponent, DatePipe, ConfirmationDialog],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

  constructor(
    private adminService: AdminServices,
    public userStore: UserStore
  ) {
    this.userStore.refresh();
  }

  updateStatus(user: userDetails, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    user.isActive = value === 'true';

    this.adminService.updateStatus(user.userId).subscribe({
      next: () => {
        this.userStore.refresh();
      },
      error: (err) => console.log(err)
    });
  }

  showDeteteDialog = false;
  tempUser = ['', ''];

  delete(user: userDetails) {
    this.showDeteteDialog = true;
    this.tempUser[0] = user.userId;
    this.tempUser[1] = user.name;
  }

  cancelDelete() {
    this.showDeteteDialog = false;
  }

  confirmDelete() {
    this.adminService.deleteUser(this.tempUser[0]).subscribe({
      next: () => {
        this.userStore.refresh();
        this.showDeteteDialog = false;
      },
      error: (err) => console.log(err)
    });
  }

  // ---------------- Pagination ----------------

  currentPage = 1;
  pageSize = 10;

  get totalPages(): number {
    return Math.ceil(this.userStore.users().length / this.pageSize);
  }

  get pagedUsers(): userDetails[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.userStore.users().slice(start, start + this.pageSize);
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

  // ---------------- Sorting ----------------

  sortColumn: keyof userDetails | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  sort(column: keyof userDetails): void {

    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    const sorted = [...this.userStore.users()].sort((a, b) => {

      let valueA: any = a[column];
      let valueB: any = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (typeof valueA === 'boolean') {
        valueA = valueA ? 1 : 0;
        valueB = valueB ? 1 : 0;
      }

      if (column === 'createdAt') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }

      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }

      return 0;
    });

    this.userStore.users.set(sorted);
    this.currentPage = 1;
  }

  getSortIcon(column: keyof userDetails): string {
    if (this.sortColumn !== column) {
      return '↕';
    }

    return this.sortDirection === 'asc' ? '▲' : '▼';
  }
}