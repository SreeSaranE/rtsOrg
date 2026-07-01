import { Component } from '@angular/core';

import { jobStore } from '../../../../services/job/job.store';
import { ApplicationStore } from '../../../../services/application/application.store';
import { InterviewStore } from '../../../../services/interview/interview.store';
import { CandidateStore } from '../../../../services/candidate/candidate.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recruiter-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class RecruiterDashboard {

  constructor(
    public jobStore: jobStore,
    public applicationStore: ApplicationStore,
    public interviewStore: InterviewStore,
    public candidateStore: CandidateStore
  ) {
    this.jobStore.refresh();
    this.applicationStore.refresh();
    this.interviewStore.refresh();
    this.candidateStore.refresh();
  }

  // ===================== JOBS =====================

  get totalJobs(): number {
    return this.jobStore.jobs().length;
  }

  get activeJobs(): number {
    return this.jobStore.jobs().filter(j => j.jobStatus).length;
  }

  get closedJobs(): number {
    return this.jobStore.jobs().filter(j => !j.jobStatus).length;
  }

  // ===================== APPLICATIONS =====================

  get totalApplications(): number {
    return this.applicationStore.applications().length;
  }

  // ===================== CANDIDATES =====================

  get totalCandidates(): number {
    return this.candidateStore.candidates().length;
  }

  // ===================== INTERVIEWS =====================

  get totalInterviews(): number {
    return this.interviewStore.interviews().length;
  }

  get pendingInterviews(): number {
    return this.interviewStore
      .interviews()
      .filter(i => !i.result || i.result === "OnHold")
      .length;
  }

  get selectedCandidates(): number {
    return this.interviewStore
      .interviews()
      .filter(i => i.result === "Passes")
      .length;
  }

  get rejectedCandidates(): number {
    return this.interviewStore
      .interviews()
      .filter(i => i.result === "Failed")
      .length;
  }

  // ===================== RECENT APPLICATIONS =====================

  get recentApplications() {
    return [...this.applicationStore.applications()]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }

  // ===================== UPCOMING INTERVIEWS =====================

  get upcomingInterviews() {
    const now = new Date();

    return this.interviewStore
      .interviews()
      
      .slice(0, 5);
  }
}