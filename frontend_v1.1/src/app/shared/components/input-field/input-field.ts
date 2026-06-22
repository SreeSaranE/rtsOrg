import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [FormsModule],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})

export class InputField {

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() value: string = '';
  @Input() showValid = true;

  @Output() valueChange = new EventEmitter<string>();
  @Output() validChange = new EventEmitter<boolean>();

  onValueChange(value: string, input: HTMLInputElement) {
    this.value = value;

    this.valueChange.emit(value);
    const isValid =
      value.length === 0
        ? false
        : input.validity.valid;

    this.validChange.emit(isValid);
  }
}
