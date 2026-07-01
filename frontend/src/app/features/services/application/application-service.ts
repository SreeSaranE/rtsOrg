import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationDetails } from './models/applicationDetails';
import { addApplicationDTO } from './models/addApplicationDTO';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {

  constructor(
    private http: HttpClient
  ){}

  private readonly applicationApiUrl: string = "https://localhost:7033/api/application"

  addApplication(dto: addApplicationDTO){     
    return this.http.post(
      `${this.applicationApiUrl}/add`, dto
    )
  }

  getAllApplications(): Observable<ApplicationDetails[]>{
    return this.http.get<ApplicationDetails[]>(
      `${this.applicationApiUrl}/applications`
    )
  }

  getCandidateApplication(guid: string): Observable<ApplicationDetails[]>{
    return this.http.get<ApplicationDetails[]>(
      `${this.applicationApiUrl}/candidate/${guid}`
    )
  }

  deleteApplication(guid: string){
    return this.http.put<string>(
      `${this.applicationApiUrl}/delete/${guid}/`, null
    )
  }
}
