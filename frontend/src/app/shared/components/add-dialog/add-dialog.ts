import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-dialog',
  standalone: true,
  templateUrl: './add-dialog.html',
  styleUrl: './add-dialog.css'
})
export class AddDialogComponent {

  @Input() isOpen = false;

  @Input() title = 'Add';

  @Input() saveText = 'Save';

  @Input() cancelText = 'Cancel';

  @Output() save = new EventEmitter<void>();

  @Output() cancel = new EventEmitter<void>();

}