import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jobDetails } from './models/jobDetails';
import { AddJobDTO } from './models/addJobDTO';

@Injectable({
  providedIn: 'root',
})
export class JobService {

  constructor(
    private http: HttpClient
  ){}

  private readonly jobApiUrl: string = "https://localhost:7033/api/job"

  getAllJobs(): Observable<jobDetails[]>{
    return this.http.get<jobDetails[]>(
      `${this.jobApiUrl}/jobs`
    )
  }

  updateJobStatus(guid: string){
    return this.http.put<string>(
      `${this.jobApiUrl}/edit/${guid}/status`, null
    )
  }

  deletejob(guid: string){
    return this.http.put<string>(
      `${this.jobApiUrl}/delete/${guid}/`, null
    )
  }

  addJob(dto: AddJobDTO){
    return this.http.post(
      `${this.jobApiUrl}/add`, dto
    )
  }
}
