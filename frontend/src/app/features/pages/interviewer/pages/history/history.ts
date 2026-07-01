import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '../../../../../shared/components/button/button';
import { ConfirmationDialog } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { DataTableComponent } from '../../../../../shared/components/table/data-table';

import { InterviewService } from '../../../../services/interview/interview-service';
import { InterviewStore } from '../../../../services/interview/interview.store';

import { ApplicationService } from '../../../../services/application/application-service';
import { ApplicationStore } from '../../../../services/application/application.store';

import { TokenService } from '../../../../../core/services/token/token-service';

import { TableColumn } from '../../../../../shared/components/table/table-column';
import { interviewDetails } from '../../../../services/interview/models/interviewDetails';

import { updateResultDTO } from '../../../../services/interview/models/updateResultDTO';

@Component({
  selector: 'app-history',
  imports: [
    ButtonComponent,
    ConfirmationDialog,
    DataTableComponent,
    ReactiveFormsModule],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class InterviewerHistory implements OnInit {

  private interviewService = inject(InterviewService);
  public interviewStore = inject(InterviewStore);
  private applicationService = inject(ApplicationService);
  private applicationStore = inject(ApplicationStore);
  private tokenService = inject(TokenService);

  // ================= TABLE CONFIG =================

  columns: TableColumn<interviewDetails>[] = [
    { key: 'candidateName', label: 'Candidate' },
    { key: 'jobName', label: 'Job' },
    {
      key: 'result',
      label: 'Result',
      type: 'select',
      options: [
        { label: 'Not Started', value: 'NotStarted' },
        { label: 'Passed', value: 'Passes' },
        { label: 'Failed', value: 'Failed' },
        { label: 'Hold', value: 'OnHold'}
      ]
    }
  ];

  // ================= STATE =================

  showDeleteDialog = false;
  selectedInterview: interviewDetails | null = null;

  // ================= INIT =================

  ngOnInit(): void {
    this.interviewStore.refresh();
  }

  // ================= DELETE FLOW =================

  delete(interview: interviewDetails): void {
    this.selectedInterview = interview;
    this.showDeleteDialog = true;
  }

  cancelDelete(): void {
    this.showDeleteDialog = false;
    this.selectedInterview = null;
  }

  confirmDelete(): void {

    if (!this.selectedInterview) return;

    this.interviewService
      .deleteInterview(this.selectedInterview.interviewId)
      .subscribe({
        next: () => {

          this.afterInterviewDeleted(
            this.selectedInterview!.jobApplicationId,
            this.tokenService.getUserId() ?? ''
          );

          this.interviewStore.refresh();
          this.showDeleteDialog = false;
          this.selectedInterview = null;

        },
        error: err => console.error(err)
      });
  }

  private afterInterviewDeleted(applicationId: string, modifiedBy: string): void {

    const payload = {
      applicationId,
      stage: 'Applied',
      modifiedBy
    };

    this.applicationService.updateApplicationStage(payload)
      .subscribe({
        next: () => this.applicationStore.refresh(),
        error: err => console.error(err)
      });
  }

  // ================= RESULT UPDATE =================

  updateResult(event: {
    item: interviewDetails;
    key: keyof interviewDetails;
    value: any;
  }): void {
    const updated: interviewDetails = {
      ...event.item,
      [event.key]: event.value
    };

    const payload: updateResultDTO = {
      interviewId: event.item.interviewId,
      result: event.value
    }  

    this.interviewService.updateInterviewStatus(payload)
      .subscribe({
        next: () => this.interviewStore.refresh(),
        error: err => console.error(err)
      });
  }
} {}
