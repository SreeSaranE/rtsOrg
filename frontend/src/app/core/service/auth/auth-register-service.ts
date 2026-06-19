import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterRequest {
  Name: string;
  Email: string;
  Password: string;
  Role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthRegisterService {

  private apiUrl = 'https://localhost:7034/api/auth';

  constructor(
    private http: HttpClient
  ){}

  emailCheck(email: string): Observable<boolean> {
      return this.http.get<boolean>(
        `${this.apiUrl}/email?email=${encodeURIComponent(email)}`
      )
  };

  register(data: RegisterRequest): Observable<string>{
    return this.http.post(
      `${this.apiUrl}/register`, data, { responseType: 'text' }
    )
  }
}