import { Component } from '@angular/core';
import { ButtonComponent } from "../../../../../shared/components/button/button";
import { ConfirmationDialog } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { JobService } from '../../../../services/job/job-service';
import { jobStore } from '../../../../services/job/job.store';
import { jobDetails } from '../../../../services/job/models/jobDetails';
import { DataTableComponent } from "../../../../../shared/components/table/data-table";
import { TableColumn } from '../../../../../shared/components/table/table-column';
import { AddDialogComponent } from "../../../../../shared/components/add-dialog/add-dialog";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { TokenService } from '../../../../../core/services/token/token-service';

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
export class RecruiterJobs {

  constructor(
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
        key: 'jobStatus',
        label: 'Status',
        type: 'boolean'
      },
      {
        key: 'createdAt',
        label: 'Created At',
        type: 'date'
      }
    ];

  updateStatus(event: { item: jobDetails; value: boolean }) {
  
    event.item.jobStatus = event.value;
  
    this.jobservice
      .updateJobStatus(event.item.jobId)
      .subscribe(() => this.jobStore.refresh());
  }

  showDeleteDialog = false;
  selectedJob!: jobDetails;

  delete(job: jobDetails){
    this.selectedJob = job;
    this.showDeleteDialog = true;
  }

  cancelDelete() {
    this.showDeleteDialog = false;
  }

  confirmDelete() {
    this.jobservice
      .deletejob(this.selectedJob.jobId)
      .subscribe({
        next: () => {
          this.jobStore.refresh();
          this.showDeleteDialog = false;
        },
        error: err => console.log(err)
      });
  }

  userId: string = this.tokenService.getUserId() ?? '';

  showAddJob = false;
  jobForm = this.fb.nonNullable.group({
    name: '',
    dept: '',
    createdBy: this.userId
  });

  addJob(){
    this.showAddJob = true;
  }

  saveJob(){
    const { name, dept } = this.jobForm.getRawValue();

    if (!name.trim() || !dept.trim()) {
      return;
    }

    const data = this.jobForm.getRawValue()
    this.jobservice.addJob(data).subscribe({
      next: () => {
        this.jobStore.refresh();
        this.showAddJob = false;
        this.jobForm.reset();
      },
      error: err => console.log(err)
    })
  }
}