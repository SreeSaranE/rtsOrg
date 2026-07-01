import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/components/button/button';
import { ConfirmationDialog } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { DataTableComponent } from '../../../../../shared/components/table/data-table';
import { TableColumn } from '../../../../../shared/components/table/table-column';
import { InterviewStore } from '../../../../services/interview/interview.store';
import { InterviewService } from '../../../../services/interview/interview-service';
import { interviewDetails } from '../../../../services/interview/models/interviewDetails';
import { TokenService } from '../../../../../core/services/token/token-service';
import { AddDialogComponent } from "../../../../../shared/components/add-dialog/add-dialog";
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-interviews',
  imports: [
    ButtonComponent,
    ConfirmationDialog,
    DataTableComponent,
    AddDialogComponent,
    ReactiveFormsModule   
],
  templateUrl: './interviews.html',
  styleUrl: './interviews.css',
})
export class RecruiterInterviews {

  constructor(
    private interviewService: InterviewService,
    public interviewStore: InterviewStore
  ){ this.interviewStore.refresh(); }

  private fb = inject(FormBuilder);
  private tokenService = inject(TokenService)

  columns: TableColumn<interviewDetails>[] = [
    {
      key: 'jobName',
      label: 'Job'
    },
    {
      key: 'interviewerName',
      label: 'Interviewer'
    },
    {
      key: 'startTime',
      label: 'Start Time',
    },
    {
      key: 'endTime',
      label: 'End Time',
    },
    {
      key: 'createdAt',
      label: 'Created At',
      type: 'date'
    },
    {
      key: 'result',
      label: 'Result'
    }
  ]

  showDeleteDialog = false;
  selectedInterview!: interviewDetails;

  delete(interview: interviewDetails){
    this.selectedInterview = interview;
    this.showDeleteDialog = true;
  }

  cancelDelete() {
    this.showDeleteDialog = false;
  }

  confirmDelete() {
    this.interviewService
      .deleteInterview(this.selectedInterview.interviewId)
      .subscribe({
        next: () => {
          this.interviewStore.refresh();
          this.showDeleteDialog = false;
        },
        error: err => console.log(err)
      });
  }

  userId: string = this.tokenService.getUserId() ?? '';
  showAddInterview = false;
  interviewForm = this.fb.nonNullable.group({
    jobApplicationId: '',
    interviewerId: '',
    startTime: '',
    endTime: '',
    createdBy: this.userId
    });

  addInterview(){ this.showAddInterview = true; }

  saveInterview(){
    const {
      jobApplicationId,
      interviewerId,
      startTime,
      endTime,
    } = this.interviewForm.getRawValue();

    if(
      !jobApplicationId.trim() || 
      !interviewerId.trim() || 
      !startTime.trim() || 
      !endTime.trim()){
        return;
      }

    const data = this.interviewForm.getRawValue();
    this.interviewService.addInterview(data).subscribe({
        next: () => {
          this.interviewStore.refresh();
          this.showAddInterview = false;
          this.interviewForm.reset();
        },
        error: err => console.log(err)
      })
  }

  update(){}
}
