import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { InputField } from '../../../../shared/components/input-field/input-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, InputField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(
    private router: Router
  ){}

  email: string = '';
  password: string = '';

  emailValid = true;
  showValid = true;
  contextText: string = ''

  login(){

  }

  register(){
    this.router.navigate(['./signup'])
  }
}
