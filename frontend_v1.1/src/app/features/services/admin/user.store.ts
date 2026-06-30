import { Injectable, computed, signal } from '@angular/core';
import { AdminServices } from './admin-service';
import { userDetails } from './models/userDetails';

@Injectable({
  providedIn: 'root'
})
export class UserStore {

    constructor(private adminService: AdminServices) {}

    users = signal<userDetails[]>([]);
    userCount = computed(() => this.users().length);

    roleCounts = computed(() => {
        const counts = {
            Admin: 0,
            HR: 0,
            Recruiter: 0,
            Interviewer: 0,
        };

        for (const user of this.users()) {
            counts[user.role as keyof typeof counts]++;
        }
        return counts;
    });

    refresh() {
        this.adminService.getAllUsers().subscribe({
            next: (response) => {
                this.users.set(response);
            },
            error: (err) => console.error(err)
            });
    }
}