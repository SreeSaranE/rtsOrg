import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { InputField } from '../../../../shared/components/input-field/input-field';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-infomation',
  imports: [FormsModule , ButtonComponent, InputField],
  templateUrl: './personal-infomation.html',
  styleUrl: './personal-infomation.css',
})
export class PersonalInfomation {

  constructor(private router: Router){}

    enter = true;

    role = '';

    username = '';
    password = '';
    rePassword = '';

    selectRole() {
        this.enter = !this.enter;
    }

    createAccount() {
        console.log({
            role: this.role,
            username: this.username,
            password: this.password,
            rePassword: this.rePassword
        });
    }
}