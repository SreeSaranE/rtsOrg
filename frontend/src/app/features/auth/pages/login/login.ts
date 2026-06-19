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

  login() {

    if (!this.email || !this.password){
      console.log('Enter Valid Details');
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
        console.log('Login Success');

      this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log('Login Failed');
        console.log(error);
      }
    });
  }

  register(){
    this.router.navigate(['/signup'])
  }
}