import { Injectable, computed, signal } from '@angular/core';
import { ApplicationService } from './application-service';
import { ApplicationDetails } from './models/applicationDetails';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStore{
    constructor(private applicationService: ApplicationService){}

    applications = signal<ApplicationDetails[]>([])
    applicationsCount = computed(() => this.applications().length);

    refresh() {
        this.applicationService.getAllApplications().subscribe({
            next: (response) => {
                this.applications.set(response);
            },
            error: (err) => console.error(err)
            }
        );
    }
}