import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})

export class InputField {

  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() value = '';
  @Input() cls = '';

  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }
}
