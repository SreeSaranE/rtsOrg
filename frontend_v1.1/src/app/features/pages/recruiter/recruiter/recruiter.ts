import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../../shared/components/sidebar/sidebar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-dashboard',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './recruiter.html',
  styleUrl: './recruiter.css',
})
export class Recruiter {

  constructor(private router: Router)
  { router.navigate(["recruiter/dashboard"]) }

    navList = ["Dashboard", "Jobs", "Applications", "Candidates", "Interviews"]

    showSidebar = signal<boolean>(true);

    onSidebarChange(value: boolean) {
      this.showSidebar.set(value);
      console.log(value);
    } 
}
