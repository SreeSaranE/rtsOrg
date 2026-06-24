import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface LoginRequest {
  Name: string;
  Email: string;
  Password: string;
  Role: string;
}


@Injectable({
  providedIn: 'root',
})
export class SignupService {

  constructor(
    private http: HttpClient
  ){}

  private apiUrl = 'https://localhost:7033/api/auth';

  emailCheck(email: string): Observable<boolean>{
    return this.http.get<boolean>(
      `${this.apiUrl}/email?email=${encodeURIComponent(email)}`
    )
  }

  registerUser(data: LoginRequest): Observable<string>{
    return this.http.post(
      `${this.apiUrl}/register`, data, { responseType: 'text'}
    )
  }
}
