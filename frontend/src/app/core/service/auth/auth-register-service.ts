import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthRegisterService {

  private apiUrl = 'https://localhost:7034/api/auth';

  constructor(
    private authSerice: AuthService,
    private http: HttpClient
  ){}

  emailCheck(email: string): Observable<boolean> {
      return this.http.get<boolean>(
        `${this.apiUrl}/email?email=${encodeURIComponent(email)}`
      )
  };
}