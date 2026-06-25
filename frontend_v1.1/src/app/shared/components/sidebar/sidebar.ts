import { Component, input } from '@angular/core';
import { ButtonComponent } from "../button/button";
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [ButtonComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  constructor(
    private router: Router
  ){}

  @Input() title = "";
  @Input() naviList = ["Settings"]

  minWidth = 20;

  clickBtn(page: string){
    console.log(this.router.url+'/'+page.toLowerCase());    
  }
}
