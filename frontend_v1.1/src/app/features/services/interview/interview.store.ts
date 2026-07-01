import { Injectable, computed, signal } from '@angular/core';
import { InterviewService } from './interview-service';
import { interviewDetails } from './models/interviewDetails';

@Injectable({
  providedIn: 'root'
})
export class InterviewStore{

    constructor(private interviewServiceer: InterviewService){}

    interviews = signal<interviewDetails[]>([]);
    interviewsCount = computed(() => this.interviews().length);

    refresh() {
        this.interviewServiceer.getAllInterviews().subscribe({
           next: (response) => {
                this.interviews.set(response);
            },
            error: (err) => console.error(err) 
        });
    }

    
}