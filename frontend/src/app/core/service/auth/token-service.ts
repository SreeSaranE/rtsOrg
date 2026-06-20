import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  getRole(): string | null {
    const token = this.getToken();

    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]))
    const role = payload[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ]
    return role;
  }
}