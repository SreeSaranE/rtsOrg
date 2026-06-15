import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { InputField } from '../../../../shared/components/input-field/input-field';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, ButtonComponent, InputField, RouterOutlet],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  
  constructor(private router: Router){}

  email = '';
  password = '';
  rePassword = '';
  role: string = '';
  username = '';

  enter: boolean = true;

  signup() {
    this.router.navigate(['./personal-information']);
  }

  signIn(){
    this.router.navigate(['/login'])
  }

}
