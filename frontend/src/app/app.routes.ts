import { Routes } from '@angular/router';
import { Admin } from './features/pages/admin/admin/admin';
import { HrDashboard } from './features/pages/hr/hr-dashboard/hr-dashboard';
import { Interviewer } from './features/pages/interviewer/interviewer/interviewer';
import { Recruiter } from './features/pages/recruiter/recruiter/recruiter';
import { Candidate } from './features/pages/candidate/candidate/candidate';
import { Login } from './features/pages/auth/pages/login/login';
import { Signup } from './features/pages/auth/pages/signup/signup';
import { Unauthorized } from './pages/unauthorized/unauthorized';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './core/gurad/auth-guard';
import { roleGuard} from './core/gurad/role-guard';
import { Settings } from './pages/settings/settings';
import { Verification } from './pages/verification/verification';
import { PersonalDetails } from './features/pages/auth/pages/personal-details/personal-details';
import { Startup } from './pages/startup/startup';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { Users } from './features/pages/admin/pages/users/users';
import { Candidates } from './features/pages/admin/pages/candidates/candidates';
import { AdminDashboard } from './features/pages/admin/pages/dashboard/dashboard';

import { RecruiterDashboard } from './features/pages/recruiter/pages/dashboard/dashboard';
import { RecruiterJobs } from './features/pages/recruiter/pages/jobs/jobs';
import { RecruiterApplications } from './features/pages/recruiter/pages/applications/applications';
import { RecruiterInterviews } from './features/pages/recruiter/pages/interviews/interviews';
import { RecruiterCandidates } from './features/pages/recruiter/pages/candidates/candidates';
import { CandidateJobs } from './features/pages/candidate/pages/jobs/jobs';
import { CandidateAppliedJobs } from './features/pages/candidate/pages/applied-jobs/applied-jobs';
import { CandidatePersonalDetails } from './features/pages/candidate/pages/candidate-personal-details/candidate-personal-details';
import { InterviewerAssigned } from './features/pages/interviewer/pages/assigned/assigned';
import { InterviewerHistory } from './features/pages/interviewer/pages/history/history';

export const routes: Routes = [
    {path: "", component: Startup},

    {path: "admin", component: Admin,
        canActivate: [authGuard, roleGuard], data: {role: 'Admin'},
        children: [
            { path: "dashboard", component: AdminDashboard },
            { path: "users", component: Users },
            { path: "candidates", component: Candidates}
        ]},

    {path: "hr", component: HrDashboard,
        canActivate: [authGuard, roleGuard], data: {role: 'HR'}},


    {path: "recruiter", component: Recruiter,
        canActivate: [authGuard, roleGuard], data: {role: 'Recruiter'},
        children: [
            {path: "dashboard", component: RecruiterDashboard},
            {path: "jobs", component: RecruiterJobs},
            {path: "candidates", component: RecruiterCandidates},
            {path: "applications", component: RecruiterApplications},
            {path: "interviews", component: RecruiterInterviews}
        ]},

    {path: "candidate", component: Candidate,
        canActivate: [authGuard, roleGuard], data: {role: 'Candidate'},
        children: [
            {path: "jobs", component: CandidateJobs},
            {path: "applied", component: CandidateAppliedJobs},
            {path: "details", component: CandidatePersonalDetails}
        ]},

    {path: "interviewer", component: Interviewer,
        canActivate: [authGuard, roleGuard], data: {role: 'Interviewer'},
        children: [
            {path: "assigned", component: InterviewerAssigned},
            {path: "history", component: InterviewerHistory}
        ]},  

    {path: "login", component: Login},
    {path: "signup", component: Signup},
    {path: "personal-details", component: PersonalDetails},
    {path: "settings", component: Settings},

    {path: "side", component: Sidebar},

    {path: "unauthorized", component: Unauthorized},
    {path: "verification", component: Verification},
    {path: "**", component: NotFound}
];