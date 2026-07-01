import { Component } from '@angular/core';
import { UserStore } from '../../../../services/admin/user.store';
import { CandidateStore } from '../../../../services/candidate/candidate.store';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class AdminDashboard {

  constructor(
    public userStore: UserStore,
    public candidateStore: CandidateStore
  ) {
    this.userStore.refresh();
    this.candidateStore.refresh();
  }
}