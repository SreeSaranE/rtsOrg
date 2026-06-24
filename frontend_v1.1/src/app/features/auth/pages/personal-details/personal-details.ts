import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { InputField } from '../../../../shared/components/input-field/input-field';
import { Router } from '@angular/router';
import { SignupService } from '../../../../core/services/signup/signup-service';
import { LoginService } from '../../../../core/services/login/login-service';
import { SharedService } from '../../shared/shared-service';
import { NavigationService } from '../../../../core/services/navigation/navigation-service';

@Component({
  selector: 'app-personal-details',
  imports: [FormsModule, ButtonComponent, InputField],
  templateUrl: './personal-details.html',
  styleUrl: './personal-details.css',
})
export class PersonalDetails implements OnInit{

    constructor(
        private router: Router,
        private signupService: SignupService,
        private loginService: LoginService,
        private sharedService: SharedService,
        private navigationService: NavigationService
    ){}

    ngOnInit(){
        this.email = this.sharedService.email;
        if(!this.email) this.router.navigate(['/signup'])
    }

    enter = true;
    showValid = true;
    contextText: string = ''
    
    role = '';

    email = ''
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
    }

    createAccount() {

        const usernamePattern = /^[A-Za-z0-9]{3,20}$/;

        if (!usernamePattern.test(this.username)) {
            this.contextText = 'Username must be 3-20 letters or numbers';
            this.showValid = false;
            return;
        }
        if (!this.username || !this.password || !this.rePassword) {
            this.contextText = 'All fields are required';
            this.showValid = false;
            return;
        }

        if (this.password !== this.rePassword) {
            this.contextText = 'Passwords do not match';
            this.showValid = false;
            return;
        }

        this.showValid = true;

        if(this.role == "Candidate"){
          console.log("Its candidate");
          return;
        }        

        this.signupService.registerUser({
            Name: this.username,
            Email: this.email,
            Password: this.password,
            Role: this.role
        }).subscribe({
            next: () => {
                this.confirmLogin();
            },
            error: (err) => {
                console.log(err.status);
                console.log(err.error);
            }
        })
    }

    confirmLogin(){        
        this.loginService.login({
        Email: this.email,
        Password: this.password
        }).subscribe({
        next: (response) => {
            localStorage.setItem('token', response.token)
            this.navigationService.navigateByRole();
        },
        error: (error) => {
            this.showValid = false;
            console.log(error);
        }
        });  
    }

    signupPage(){
        this.router.navigate(['./signup']);
    }
  }