import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationDetails } from './models/applicationDetails';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {

  constructor(
    private http: HttpClient
  ){}

    private readonly applicationApiUrl: string = "https://localhost:7033/api/application"

    getAllApplications(): Observable<ApplicationDetails[]>{
      return this.http.get<ApplicationDetails[]>(
        `${this.applicationApiUrl}/applications`
      )
    }

    deleteApplication(guid: string){
      return this.http.put<string>(
        `${this.applicationApiUrl}/delete/${guid}/`, null
      )
  }
}
