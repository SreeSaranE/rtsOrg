import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { InputField } from '../../../../shared/components/input-field/input-field';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/service/auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, InputField],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  email: string = '';
  password: string = '';

  emailValid = true;
  showValid = true;
  contextText: string = ''

  login() {

    if (!this.email || !this.password){
      this.contextText = "Enter Valid Details";
      this.showValid = false;
      return;
    }

    if (!this.emailValid){
      this.contextText = "Invalid email address";
      this.showValid = false;
      this.showValid = false;
      return;
    } 

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        localStorage.setItem(
          'token', response.token
        )

      this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.contextText = "Incorrect email or password";
        this.showValid = false;
        console.log(error);
      }
    });
  }

  register(){
    this.router.navigate(['/signup'])
  }
}