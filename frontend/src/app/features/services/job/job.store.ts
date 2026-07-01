import { Injectable, computed, signal } from '@angular/core';
import { JobService } from './job-service';
import { jobDetails } from './models/jobDetails';

@Injectable({
  providedIn: 'root'
})
export class jobStore {
    constructor( private jobbService: JobService ){}

    jobs = signal<jobDetails[]>([])
    jobCount = computed(() => this.jobs().length);

    refresh() {
        this.jobbService.getAllJobs().subscribe({
            next: (response) => {
                this.jobs.set(response);
            },
            error: (err) => console.error(err)
            });
    }
}