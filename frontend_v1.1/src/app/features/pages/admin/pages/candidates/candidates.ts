import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/components/button/button';
import { DatePipe } from '@angular/common';
import { CandidateService } from '../../../../services/candidate/candidate-service';
import { CandidateStore } from '../../../../services/candidate/candidate.store';
import { candidateDetails } from '../../../../services/candidate/models/candidateDetails';
import { ConfirmationDialog } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-candidates',
  imports: [ButtonComponent, DatePipe, ConfirmationDialog],
  templateUrl: './candidates.html',
  styleUrl: './candidates.css',
})
export class Candidates {

  constructor(
    private candidateService: CandidateService,
    public candidateStore: CandidateStore
  ) {
    this.candidateStore.refresh();
  }

  updateStatus(candidate: candidateDetails, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    candidate.isActive = value === 'true';

    this.candidateService.updateStatus(candidate.candidateId).subscribe({
      next: () => this.candidateStore.refresh(),
      error: (err) => console.log(err)
    });
  }

  showDeteteDialog = false;
  tempCandidate = ['', ''];

  delete(candidate: candidateDetails) {
    this.showDeteteDialog = true;
    this.tempCandidate[0] = candidate.candidateId;
    this.tempCandidate[1] = candidate.name;
  }

  cancelDelete() {
    this.showDeteteDialog = false;
  }

  confirmDelete() {
    this.candidateService.deleteCandidate(this.tempCandidate[0]).subscribe({
      next: () => {
        this.candidateStore.refresh();
        this.showDeteteDialog = false;
      },
      error: (err) => console.log(err)
    });
  }

  // ---------------- Pagination ----------------

  currentPage = 1;
  pageSize = 10;

  get totalPages(): number {
    return Math.ceil(this.candidateStore.candidates().length / this.pageSize);
  }

  get pagedUsers(): candidateDetails[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.candidateStore.candidates().slice(start, start + this.pageSize);
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

  sortColumn: keyof candidateDetails | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  sort(column: keyof candidateDetails): void {

    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    const sorted = [...this.candidateStore.candidates()].sort((a, b) => {

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

    this.candidateStore.candidates.set(sorted);
    this.currentPage = 1;
  }

  getSortIcon(column: keyof candidateDetails): string {
    if (this.sortColumn !== column) {
      return '↕';
    }

    return this.sortDirection === 'asc' ? '▲' : '▼';
  }
}