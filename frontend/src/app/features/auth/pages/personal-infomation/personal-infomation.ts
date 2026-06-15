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

  password = '';
  rePassword = '';
  role: string = '';
  username = '';

  enter: boolean = true;

  createAccount(){
    
  }
}
