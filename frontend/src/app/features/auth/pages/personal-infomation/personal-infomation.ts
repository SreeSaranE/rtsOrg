import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { InputField } from '../../../../shared/components/input-field/input-field';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthRegisterService } from '../../../../core/service/auth/auth-register-service';
import { SharedService } from '../../shared/shared-service';
import { AuthLoginService } from '../../../../core/service/auth/auth-login-service';
import { NavigationService } from '../../../../core/service/navigation/navigation-service';

@Component({
  selector: 'app-personal-infomation',
  imports: [FormsModule , ButtonComponent, InputField],
  templateUrl: './personal-infomation.html',
  styleUrl: './personal-infomation.css',
})
export class PersonalInfomation implements OnInit{

    constructor(
        private router: Router,
        private authRegisterService: AuthRegisterService,
        private authLoginService: AuthLoginService,
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

        this.authRegisterService.register({
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
        this.authLoginService.login({
        email: this.email,
        password: this.password
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