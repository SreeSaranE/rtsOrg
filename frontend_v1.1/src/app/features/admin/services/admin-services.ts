import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface userDetails {
  UserId: number,
  Name: string,
  Email: string,
  Role: string,
  IsActive: boolean,
  CreatedAt: Date
}

@Injectable({
  providedIn: 'root',
})
export class AdminServices {

  constructor(
    private http: HttpClient
  ){}

  private readonly apiUrl: string = "https://localhost:7033/api/auth"

  getAllUsers(): Observable<userDetails[]>{
    return this.http.get<userDetails[]>(
      `${this.apiUrl}/users`
    )
  }
}