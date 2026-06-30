import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/components/button/button';
import { CandidateService } from '../../../../services/candidate/candidate-service';
import { CandidateStore } from '../../../../services/candidate/candidate.store';
import { candidateDetails } from '../../../../services/candidate/models/candidateDetails';
import { ConfirmationDialog } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { DataTableComponent } from '../../../../../shared/components/table/data-table';
import { TableColumn } from '../../../../../shared/components/table/table-column';

@Component({
  selector: 'app-candidates',
  imports: [
    ButtonComponent,
    ConfirmationDialog,
    DataTableComponent,
    ConfirmationDialog],
  templateUrl: './candidates.html',
  styleUrl: './candidates.css',
})
export class RecruiterCandidates {

  constructor(
    private candidateService: CandidateService,
    public candidateStore: CandidateStore
  ) {
    this.candidateStore.refresh();
  }
  
  columns: TableColumn<candidateDetails>[] = [
    {
      key: 'name',
      label: 'Name'
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'createdAt',
      label: 'Created At',
      type: 'date'
    }
  ];

  updateStatus(event: { item: candidateDetails; value: boolean }) {

    event.item.isActive = event.value;

    this.candidateService
      .updateStatus(event.item.candidateId)
      .subscribe(() => this.candidateStore.refresh());
  }

  showDeleteDialog = false;
  selectedCandidate!: candidateDetails;

  delete(candidate: candidateDetails) {
    this.selectedCandidate = candidate;
    this.showDeleteDialog = true;
  }

  cancelDelete() {
    this.showDeleteDialog = false;
  }

  confirmDelete() {
    this.candidateService
      .deleteCandidate(this.selectedCandidate.candidateId)
      .subscribe({
        next: () => {
          this.candidateStore.refresh();
          this.showDeleteDialog = false;
        },
        error: err => console.log(err)
      });
  }
}
