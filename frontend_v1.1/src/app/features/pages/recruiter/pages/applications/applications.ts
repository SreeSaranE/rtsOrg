import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/components/button/button';
import { ConfirmationDialog } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { DataTableComponent } from '../../../../../shared/components/table/data-table';
import { TableColumn } from '../../../../../shared/components/table/table-column';
import { ApplicationDetails } from '../../../../services/application/models/applicationDetails';
import { ApplicationService } from '../../../../services/application/application-service';
import { ApplicationStore } from '../../../../services/application/application.store';

@Component({
  selector: 'app-applications',
  imports: [
    ButtonComponent,
    ConfirmationDialog,
    DataTableComponent,
    ConfirmationDialog
  ],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
})
export class RecruiterApplications {

  constructor(
    private applicationService: ApplicationService,
    public applicationStore: ApplicationStore,    
  ){ applicationStore.refresh();}

    columns: TableColumn<ApplicationDetails>[] = [
      {
        key: 'jobName',
        label: 'job'
      },
      {
        key: 'candidateName',
        label: 'Candidate'
      },
      {
        key: 'stage',
        label: 'Stage'
      },
      {
        key: 'createdAt',
        label: 'Created At',
        type: 'date'
      }
    ];

    showDeleteDialog = false;
    selectedApplication!: ApplicationDetails;
  
    delete(candidate: ApplicationDetails) {
      this.selectedApplication = candidate;
      this.showDeleteDialog = true;
    }
  
    cancelDelete() {
      this.showDeleteDialog = false;
    }
  
    confirmDelete() {
      this.applicationService
        .deleteApplication(this.selectedApplication.candidateId)
        .subscribe({
          next: () => {
            this.applicationStore.refresh();
            this.showDeleteDialog = false;
          },
          error: err => console.log(err)
        });
    }
    
}
