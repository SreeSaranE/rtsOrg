import { Component, signal } from '@angular/core';
import { Sidebar } from "../../../../shared/components/sidebar/sidebar";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-interviewer',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './interviewer.html',
  styleUrl: './interviewer.css',
})
export class Interviewer {

  constructor(private router: Router)
  { router.navigate(["interviewer/assigned"]) }
  
  navList = ["Assigned", "History"]

  showSidebar = signal<boolean>(true);

  onSidebarChange(value: boolean) {
    this.showSidebar.set(value);
    console.log(value);
  } 
}
