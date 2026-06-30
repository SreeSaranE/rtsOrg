import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/components/button/button';
import { InputField } from '../../../../../shared/components/input-field/input-field';
import { Router } from '@angular/router';
import { LoginService } from '../../../../../core/services/login/login-service';
import { NavigationService } from '../../../../../core/services/navigation/navigation-service';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, InputField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private navigationService: NavigationService
  ){}

  email: string = '';
  password: string = '';

  emailValid: boolean = true;
  hideValid: boolean = true;
  contextText: string = ''

  login(){

    if (!this.email || !this.password) {
      this.contextText = "Enter Valid Details";
      this.hideValid = false;
      return;
    }

    if (!this.emailValid) {
      this.contextText = "Invalid email address";
      this.hideValid = false;
      this.hideValid = false;
      return;
    }

    this.loginService.login({
      Email: this.email,
      Password: this.password
    }).subscribe({
      next: (response) => {
        localStorage.setItem('Token', response.token)
        this.navigationService.navigateByRole()
      },
      error: (error) => {
        this.contextText = "Incorrect email or password";
        this.hideValid = false;
        console.log(error.error);
      }
    });
  }

  register(){
    this.router.navigate(['./signup'])
  }
}