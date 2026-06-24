import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(
    private http: HttpClient
  ){}

  private apiUrl = 'https://localhost:7033/api/auth';

  login(data: LoginRequest): Observable<LoginResponse> {    
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`, data
    )
  };
}
