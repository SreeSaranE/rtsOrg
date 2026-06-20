import { Routes } from '@angular/router';
import { App } from './app';
import { Login } from './features/auth/pages/login/login';
import { Signup } from './features/auth/pages/signup/signup';
import { PersonalInfomation } from './features/auth/pages/personal-infomation/personal-infomation';
import { Dashboard } from './features/dashboard/dashboard';
import { StartupComponent } from './core/pages/startup/startup';
import { AdminDashboard } from './features/admin/dashboard/dashboard';
import { CandidateDashboard } from './features/candidate/dashboard/dashboard';
import { RecruiterDashboard } from './features/recruiter/dashboard/dashboard';
import { InterviewerDashboard } from './features/interviewer/dashboard/dashboard';
import { authGuard } from './core/guard/auth-guard';
import { NotFound } from './features/not-found/not-found';
import { roleGuard } from './core/guard/role-guard';
import { Unauthorized } from './features/unauthorized/unauthorized';

export const routes: Routes = [
    {path: '', component: StartupComponent},
    {path: 'login', component: Login},
    {path: 'signup', component: Signup},
    {path: 'personal-information', component: PersonalInfomation},
    {path: 'dashboard', component: Dashboard, canActivate: [authGuard]},

    {path: 'admin/dashboard', component: AdminDashboard,
        canActivate: [authGuard, roleGuard], data: {role: 'admin'}},
    {path: 'recruiter/dashboard', component: RecruiterDashboard,
        canActivate: [authGuard, roleGuard], data: {role: 'recruiter'}},
    {path: 'interviewer/dashboard', component: InterviewerDashboard,
        canActivate: [authGuard, roleGuard], data: {role: 'interviewer'}},
    {path: 'candidate/dashboard', component: CandidateDashboard,
        canActivate: [authGuard, roleGuard], data: {role: 'candidate'}},
    
    {path: 'unauthorized', component: Unauthorized},
    {path: '**', component: NotFound}
];