import { Component } from '@angular/core';
import { InputField } from '../../../../shared/components/input-field/input-field';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { Router } from '@angular/router';
import { SignupService } from '../../../../core/services/signup/signup-service';
import { SharedService } from '../../shared/shared-service';

@Component({
  selector: 'app-signup',
  imports: [InputField, ButtonComponent],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  constructor(
    private router: Router,
    private signUpService: SignupService,
    private sharedService: SharedService
  ){}

  hideValid: boolean = true;
  emailValid: boolean = true;
  contextText: string = "";
  email: string = "";

  signup()
  {
    if (!this.email){
      this.contextText = "Email is required!"
      this.hideValid = false;
      return;
    }

    if (!this.emailValid){
      this.contextText = "Invalid email address"
      this.hideValid = false;
      return;
    }

    this.signUpService.emailCheck(this.email)
      .subscribe(exists => {
        if(exists){
          this.contextText = "Email already exists"
          this.hideValid = false;
        } else {
          this.sharedService.email = this.email;
          this.router.navigate(['./personal-details'])
        }
      })
  }

  signIn(){
    this.router.navigate(['/login'])
  }
}
