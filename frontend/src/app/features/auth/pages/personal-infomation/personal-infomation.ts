import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { InputField } from '../../../../shared/components/input-field/input-field';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { using } from 'rxjs';

@Component({
  selector: 'app-personal-infomation',
  imports: [FormsModule , ButtonComponent, InputField],
  templateUrl: './personal-infomation.html',
  styleUrl: './personal-infomation.css',
})
export class PersonalInfomation{

  constructor(private router: Router){}

    enter = true;
    showValid = true;
    contextText: string = ''

    role = '';

    username = '';
    password = '';
    rePassword = '';

    selectRole() {

        if(!this.role){
            this.contextText = "Choose role";
            this.showValid = false;
            return;
        }
        this.showValid = true;
        this.enter = !this.enter;
        console.log(this.role);
    }

    createAccount() {
        console.log({
            role: this.role,
            username: this.username,
            password: this.password,
            rePassword: this.rePassword
        });
    }

    signupPage(){
        this.router.navigate(['./signup']);
    }
}