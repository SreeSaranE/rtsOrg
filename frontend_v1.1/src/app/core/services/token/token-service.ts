import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  getToken(){
    return localStorage.getItem('token')
  }

  getDecodedToken(){
    const token = this.getToken()

    if(!token) return null

    return jwtDecode(token);
  }

  getUserId(): number | null {
    const token: any = this.getDecodedToken();

    return token
      ? Number(token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
      : null;
  }

  getUserName(): string | null {
    const token: any = this.getDecodedToken();

    return token
      ? token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
      : null;
  }

  getEmail(): string | null {
    const token: any = this.getDecodedToken();

    return token
      ? token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
      : null;
  }

  getRole(): string | null {
    const token: any = this.getDecodedToken();

    return token
      ? token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      : null;
  }

  isActive(): boolean {
    const token: any = this.getDecodedToken();

    return token
      ? token['IsActive'] === 'True'
      : false;
  }
}
