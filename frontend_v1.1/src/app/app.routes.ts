import { Routes } from '@angular/router';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { HrDashboard } from './features/hr/hr-dashboard/hr-dashboard';
import { InterviewerDashboard } from './features/interviewer/interviewer-dashboard/interviewer-dashboard';
import { RecruiterDashboard } from './features/recruiter/recruiter-dashboard/recruiter-dashboard';
import { CandidateDashboard } from './features/candidate/candidate-dashboard/candidate-dashboard';
import { Login } from './features/auth/pages/login/login';
import { Signup } from './features/auth/pages/signup/signup';
import { Unauthorized } from './pages/unauthorized/unauthorized';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './core/gurad/auth-guard';
import { roleGuard} from './core/gurad/role-guard';
import { Settings } from './pages/settings/settings';
import { Verification } from './pages/verification/verification';
import { PersonalDetails } from './features/auth/pages/personal-details/personal-details';
import { Startup } from './pages/startup/startup';

export const routes: Routes = [
    {path: "", component: Startup},

    {path: "admin", component: AdminDashboard,
        canActivate: [authGuard, roleGuard], data: {role: 'Admin'}},
    {path: "hr", component: HrDashboard,
        canActivate: [authGuard, roleGuard], data: {role: 'HR'}},
    {path: "recruiter", component: RecruiterDashboard,
        canActivate: [authGuard, roleGuard], data: {role: 'Recruiter'}},
    {path: "interviewer", component: InterviewerDashboard,
        canActivate: [authGuard, roleGuard], data: {role: 'Interviewer'}},
    {path: "candidate", component: CandidateDashboard,
        canActivate: [authGuard, roleGuard], data: {role: 'Candidate'}},

    {path: "login", component: Login},
    {path: "signup", component: Signup},
    {path: "personal-details", component: PersonalDetails},
    {path: "settings", component: Settings},

    {path: "unauthorized", component: Unauthorized},
    {path: "verification", component: Verification},
    {path: "**", component: NotFound}
];