import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userDetails } from './models/userDetails';

@Injectable({
  providedIn: 'root',
})
export class AdminServices {

  constructor(
    private http: HttpClient
  ){}

  private readonly adminApiUrl: string = "https://localhost:7033/api/admin"

  getAllUsers(): Observable<userDetails[]>{
    return this.http.get<userDetails[]>(
      `${this.adminApiUrl}/users`
    )
  }

  updateStatus(guid: string){
    return this.http.put<string>(
      `${this.adminApiUrl}/edit/${guid}/status`, null
    )
  }

  deleteUser(guid: string){
    return this.http.put<string>(
      `${this.adminApiUrl}/delete/${guid}/`, null
    )
  }
}