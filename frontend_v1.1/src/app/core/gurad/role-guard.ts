import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token/token-service';

export const roleGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const tokenService = inject(TokenService);

  const expectedRole = route.data['role'];
  const userRole = tokenService.getRole();

  if (userRole !== expectedRole){
    router.navigate(['/unauthorized']);
    return false;
  }
  return true;
};
