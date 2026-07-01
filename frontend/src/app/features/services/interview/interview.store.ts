import { Injectable, computed, signal } from '@angular/core';
import { InterviewService } from './interview-service';
import { interviewDetails } from './models/interviewDetails';

@Injectable({
  providedIn: 'root'
})
export class InterviewStore{

    constructor(private interviewServicer: InterviewService){}

    interviews = signal<interviewDetails[]>([]);
    interviewsCount = computed(() => this.interviews().length);

    notStarted = computed(() => 
        this.interviews().filter(
            interview => interview.result === "NotStarted")
    )

    Started = computed(() => 
        this.interviews().filter(
            interview => interview.result !== "NotStarted")
    )

    refresh() {
        this.interviewServicer.getAllInterviews().subscribe({
           next: (response) => {
                this.interviews.set(response);
            },
            error: (err) => console.error(err) 
        });
    }

    refreshAssignedInterviews(guid: string) {
        this.interviewServicer.assignedInterviews(guid).subscribe({
           next: (response) => {
                this.interviews.set(response);
            },
            error: (err) => console.error(err) 
        });
    }

    updateResult(){}
}