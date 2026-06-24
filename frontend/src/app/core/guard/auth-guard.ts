import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authservice = inject(AuthService);
  const router = inject(Router);

  if (!authservice.isLoggedIn()){
    router.navigate(['/login']);
    return false;
  }
    return true;
};
