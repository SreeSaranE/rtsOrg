import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { InputField } from '../../../../shared/components/input-field/input-field';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthRegisterService } from '../../../../core/service/auth/auth-register-service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, ButtonComponent, InputField],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  
  constructor(
    private router: Router,
    private authRegisterService: AuthRegisterService
  ){}

  emailValid = true;
  showValid = true;
  contextText: string = ''
  
  email = '';
  password = '';
  rePassword = '';
  role: string = '';
  username = '';
  
  signup() {

    if (!this.email){
      this.contextText = "Email is required!"
      this.showValid = false;
      return;
    }

    if (!this.emailValid){
      this.contextText = "Invalid email address"
      this.showValid = false;
      return;
    } 
    
    this.authRegisterService.emailCheck(this.email).subscribe(exists => {
      if (exists) {
        this.contextText = "Email already exists"
        this.showValid = false;
      } else {
        this.router.navigate(['./personal-information'])
      }
    });
  }

  signIn(){
    this.router.navigate(['/login'])
  }
}