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

import { InterviewService } from '../../../../services/interview/interview-service';
import { InterviewStore } from '../../../../services/interview/interview.store';
import { TokenService } from '../../../../../core/services/token/token-service';

import { UserStore } from '../../../../services/admin/user.store';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    ButtonComponent,
    ConfirmationDialog,
    DataTableComponent,
    AddDialogComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
})
export class RecruiterApplications {

  constructor(
    private applicationService: ApplicationService,
    public applicationStore: ApplicationStore,
    private interviewService: InterviewService,
    public interviewStore: InterviewStore,
    public userStore: UserStore 
  ) {
    this.applicationStore.refresh();
    this.userStore.refresh();
  }

  private fb = inject(FormBuilder);
  private tokenService = inject(TokenService);

  get interviewers() {
    return this.userStore.users().filter(
      u => u.role === 'Interviewer'
    );
  }

  columns: TableColumn<ApplicationDetails>[] = [
    { key: 'candidateName', label: 'Candidate' },
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
      .deleteApplication(this.selectedApplication.candidateId)
      .subscribe({
        next: () => {
          this.applicationStore.refresh();
          this.showDeleteDialog = false;
        },
        error: err => console.log(err)
      });
  }

  showAddInterview = false;
  selectedApplicationForInterview!: ApplicationDetails;

  userId: string = this.tokenService.getUserId() ?? '';

  interviewForm = this.fb.nonNullable.group({
    jobApplicationId: '',
    interviewerId: '',
    startTime: '',
    endTime: '',
    createdBy: this.userId
  });

  addInterview(application: ApplicationDetails) {

    this.selectedApplicationForInterview = application;

    this.interviewForm.patchValue({
      jobApplicationId: application.jobApplicationId ?? application.jobName
    });

    this.showAddInterview = true;
  }

  saveInterview() {
    const {
      jobApplicationId,
      interviewerId,
      startTime,
      endTime,
    } = this.interviewForm.getRawValue();

    if (
      !jobApplicationId.trim() ||
      !interviewerId.trim() ||
      !startTime.trim() ||
      !endTime.trim()
    ) {
      return;
    }

    const payload = {
      jobApplicationId,
      interviewerId,
      createdBy: this.userId,

      // ✅ convert dates properly
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    };

    this.interviewService.addInterview(payload).subscribe({
      next: () => {
        this.interviewStore.refresh();
        this.showAddInterview = false;
        this.interviewForm.reset();
      },
      error: err => console.log(err)
    });
  }
}