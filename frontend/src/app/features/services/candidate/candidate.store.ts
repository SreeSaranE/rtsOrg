import { Injectable, computed, signal } from '@angular/core';
import { CandidateService } from './candidate-service';
import { candidateDetails } from './models/candidateDetails';

@Injectable({
  providedIn: 'root'
})
export class CandidateStore {

    constructor(private candidateService: CandidateService) {}

    candidates = signal<candidateDetails[]>([]);
    candidateCount = computed(() => this.candidates().length);

  refresh() {
    this.candidateService.getAllCandidates().subscribe({
      next: (response) => {
        this.candidates.set(response);
      },
      error: (err) => console.error(err)
    });
  }
}