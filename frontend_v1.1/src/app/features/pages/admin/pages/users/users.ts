import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/components/button/button';
import { AdminServices } from '../../../../services/admin/admin-service';
import { UserStore } from '../../../../services/admin/user.store';
import { userDetails } from '../../../../services/admin/models/userDetails';
import { ConfirmationDialog } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { DataTableComponent } from '../../../../../shared/components/table/data-table';
import { TableColumn } from '../../../../../shared/components/table/table-column';

@Component({
  selector: 'app-users',
  imports: [ButtonComponent, ConfirmationDialog, DataTableComponent,
    ConfirmationDialog],
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

      columns: TableColumn<userDetails>[] = [
      {
        key: 'name',
        label: 'Name'
      },
      {
        key: 'email',
        label: 'Email'
      },
      {
        key: 'role',
        label: 'Role'
      },
      {
        key: 'isActive',
        label: 'Status',
        type: 'boolean'
      },
      {
        key: 'createdAt',
        label: 'Created At',
        type: 'date'
      }
    ];

  updateStatus(event: { item: userDetails; value: boolean }) {
  
      event.item.isActive = event.value;
  
      this.adminService
        .updateStatus(event.item.userId)
        .subscribe(() => this.userStore.refresh());
  
    }

  showDeleteDialog = false;
  selectedUser!: userDetails;

  delete(user: userDetails) {
    this.selectedUser = user;
    this.showDeleteDialog = true;
  }
  
  cancelDelete() {
    this.showDeleteDialog = false;
  }

  confirmDelete() {
    this.adminService
      .deleteUser(this.selectedUser.userId)
      .subscribe({
        next: () => {
          this.userStore.refresh();
          this.showDeleteDialog = false;
        },
        error: err => console.log(err)
      });
  }
}