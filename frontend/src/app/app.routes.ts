import { Routes } from '@angular/router';
import { App } from './app';
import { Login } from './features/auth/pages/login/login';
import { Signup } from './features/auth/pages/signup/signup';
import { PersonalInfomation } from './features/auth/pages/personal-infomation/personal-infomation';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
    {path: '', component: App},
    {path: 'login', component: Login},
    {path: 'signup', component: Signup},
    {path: 'personal-information', component: PersonalInfomation},
    {path: 'dashboard', component: Dashboard}
];
