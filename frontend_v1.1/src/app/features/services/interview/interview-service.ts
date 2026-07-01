import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { interviewDetails } from './models/interviewDetails';
import { addIntervewDTO } from './models/addInterviewDTO';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {

  constructor(
    private http: HttpClient
  ){}

    private readonly interviewApiUrl: string = "https://localhost:7033/api/interview"

    getAllInterviews(): Observable<interviewDetails[]>{
      return this.http.get<interviewDetails[]>(
        `${this.interviewApiUrl}/interviews`
      )
    }

    addInterview(dto: addIntervewDTO){
      return this.http.post(
        `${this.interviewApiUrl}/add`, dto
      )
    }

    deleteInterview(guid: string){
      return this.http.put<string>(
        `${this.interviewApiUrl}/delete/${guid}/`, null
      )
  }
}
