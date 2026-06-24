import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token/token-service';

export const roleGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const tokenService = inject(TokenService);

  const expectedRole = route.data['role'];
  const userRole = tokenService.getRole();
  const isActive = tokenService.isActive();

  if (userRole !== expectedRole){
    router.navigate(['/unauthorized']);
    return false;
  }
  if (!isActive){    
    router.navigate(['/verification'])
    return false;
  }
  return true;
};
