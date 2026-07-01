import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../../shared/components/sidebar/sidebar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './candidate.html',
  styleUrl: './candidate.css',
})
export class Candidate {

  constructor(private router: Router)
  { router.navigate(["candidate/jobs"]) }

  navList = ["Jobs", "Applied", "Details"]

  showSidebar = signal<boolean>(true);

  onSidebarChange(value: boolean) {
    this.showSidebar.set(value);
    console.log(value);
  } 
}
