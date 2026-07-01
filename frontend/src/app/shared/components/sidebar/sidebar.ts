import { Component, signal } from '@angular/core';
import { ButtonComponent } from "../button/button";
import { Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { TokenService } from '../../../core/services/token/token-service';

@Component({
  selector: 'app-sidebar',
  imports: [ButtonComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  constructor(
    private router: Router,
    public tokenService: TokenService
  ){
    this.hide()
  }
  
  showSidebar = signal<boolean>(false);

  @Output() sidebarChange = new EventEmitter<boolean>();

  @Input() path = ""
  @Input() naviList = ["Settings"]

  minWidth = 20;

  clickBtn(page: string){
    console.log(page.toLowerCase());
    this.router.navigate([`/${this.path}/${page.toLowerCase()}`])
  }

  hide(){
    this.showSidebar.update(value => !value);
    this.sidebarChange.emit(this.showSidebar());
  }
}
