import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,

  template:
   `
    <button
      [class] = "cls"
      [style.--btn-minWidth]="minWidth"
      [style.--btn-maxWidth]="maxWidth"
      [style.--btn-color]="color"
      [style.--btn-bgColor]="bgColor"
      [style.--btn-position]="position"
      [style.--btn-leftPad]="leftPad"
      
      (click)="clicked.emit()">
      {{ label }}
    </button>
  `,

  styleUrl: './button.css',
})
export class ButtonComponent {

  @Input() label = '';
  @Input() cls = '';
  @Input() minWidth = '250px';
  @Input() maxWidth = '35vw';
  @Input() color = "var(--background-color)"
  @Input() bgColor = "var(--text-primary)"
  @Input() position = "center";
  @Input() leftPad = "10px"

  constructor(){
  }

  @Output() clicked = new EventEmitter<void>();

}