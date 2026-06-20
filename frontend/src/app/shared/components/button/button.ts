import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
<button [class] = "cls" (click)="clicked.emit()">
      {{ label }}
    </button>
  `,
  styleUrl: './button.css',
})
export class ButtonComponent {

  @Input() label = '';
  @Input() cls = '';
  
  @Output() clicked = new EventEmitter<void>();

}