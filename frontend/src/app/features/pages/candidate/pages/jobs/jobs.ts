import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { inject } from '@angular/core';

import { ButtonComponent } from '../../../../../shared/components/button/button';
import { ConfirmationDialog } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { DataTableComponent } from '../../../../../shared/components/table/data-table';
import { TableColumn } from '../../../../../shared/components/table/table-column';
import { AddDialogComponent } from '../../../../../shared/components/add-dialog/add-dialog';
import { TokenService } from '../../../../../core/services/token/token-service';
import { JobService } from '../../../../services/job/job-service';
import { jobStore } from '../../../../services/job/job.store';
import { jobDetails } from '../../../../services/job/models/jobDetails';
import { ApplicationService } from '../../../../services/application/application-service';

@Component({
  selector: 'app-jobs',
  imports: [
    ButtonComponent,
    ConfirmationDialog,
    DataTableComponent,
    AddDialogComponent,
    ReactiveFormsModule
  ],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
})
export class CandidateJobs {

  constructor(
    private applicationService: ApplicationService,
    private jobservice: JobService,
    public jobStore: jobStore,
  ){
    this.jobStore.refresh();
  }

  private fb = inject(FormBuilder);
  private tokenService = inject(TokenService)

  columns: TableColumn<jobDetails>[] = [
      {
        key: 'name',
        label: 'Name'
      },
      {
        key: 'dept',
        label: 'Department'
      },
      {
        key: 'createdAt',
        label: 'Created At',
        type: 'date'
      }
    ];
// ===============application
  candidateId: string = this.tokenService.getUserId() ?? '';

  applicationForm = this.fb.nonNullable.group({
    jobId: '',
    candidateId: this.candidateId
  });

  selectedJob!: jobDetails;
  showApply = false;

  apply(job: jobDetails){
    this.selectedJob = job;
    
    this.applicationForm.patchValue({
      jobId: job.jobId
    });
    this.showApply = true;
  }

  saveApplication(){
    this.applicationService.addApplication(this.applicationForm.getRawValue())
    .subscribe({
      next: () => {
        this.applicationForm.reset();
      },
      error: (error) => {
        console.log(error.error.message) }
    });
    this.showApply = false;
  }
  
}
