import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../../../../../shared/components/button/button';
import { ConfirmationDialog } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { DataTableComponent } from '../../../../../shared/components/table/data-table';
import { AddDialogComponent } from '../../../../../shared/components/add-dialog/add-dialog';

import { TableColumn } from '../../../../../shared/components/table/table-column';
import { ApplicationDetails } from '../../../../services/application/models/applicationDetails';
import { ApplicationService } from '../../../../services/application/application-service';
import { ApplicationStore } from '../../../../services/application/application.store';

import { TokenService } from '../../../../../core/services/token/token-service';

import { UserStore } from '../../../../services/admin/user.store';

@Component({
  selector: 'app-applied-jobs',
  imports: [
    ButtonComponent,
    ConfirmationDialog,
    DataTableComponent,
    AddDialogComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './applied-jobs.html',
  styleUrl: './applied-jobs.css',
})
export class CandidateAppliedJobs {

  constructor(
    private applicationService: ApplicationService,
    public applicationStore: ApplicationStore,
    public userStore: UserStore 
  ) {

    this.candId = this.tokenService.getUserId() ??  ''
    this.applicationStore.candRefresh(
      this.candId ?? '');
    this.userStore.refresh();
  }
  
  private fb = inject(FormBuilder);
  private tokenService = inject(TokenService);

  candId = this.tokenService.getUserId() ?? ''

  columns: TableColumn<ApplicationDetails>[] = [
    { key: 'jobName', label: 'Job' },
    { key: 'stage', label: 'Stage' },
    { key: 'createdAt', label: 'Created At', type: 'date' }
  ];

  showDeleteDialog = false;
  selectedApplication!: ApplicationDetails;

  delete(app: ApplicationDetails) {
    this.selectedApplication = app;
    this.showDeleteDialog = true;
  }

  cancelDelete() {
    this.showDeleteDialog = false;
  }

  confirmDelete() {    
    this.applicationService
      .deleteApplication(this.selectedApplication.jobApplicationId)
      .subscribe({
        next: () => {
          this.applicationStore.candRefresh(this.candId);
          this.showDeleteDialog = false;
        },
        error: err => console.log(err)
      });
      this.showDeleteDialog = false;
  }
}
