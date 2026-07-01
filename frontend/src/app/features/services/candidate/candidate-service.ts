import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { candidateDetails } from './models/candidateDetails';
import { candidateData } from './models/candidateData';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {

  constructor(
    private http: HttpClient
  ){}

  private readonly candidateApiUrl: string = "https://localhost:7033/api/candidate"

  getAllCandidates(): Observable<candidateDetails[]>{
      return this.http.get<candidateDetails[]>(
        `${this.candidateApiUrl}/candidates`
      )
    }

  updateStatus(guid: string){
      return this.http.put<string>(
        `${this.candidateApiUrl}/edit/${guid}/status`, null
      )
    }

  deleteCandidate(guid: string){
    return this.http.put<string>(
      `${this.candidateApiUrl}/delete/${guid}/`, null
    )
  }

  getProfile(guid: string) {
    return this.http.get<candidateData>(
      `${this.candidateApiUrl}/${guid}`
    );
  }

  updateProfile(candidate: candidateData) {
    console.log(candidate);
    
    return this.http.post(
      `${this.candidateApiUrl}/update`,
      candidate
    );
  }
}
