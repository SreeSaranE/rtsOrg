import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../service/auth/token-service';

export const roleGuard: CanActivateFn = (route, state) => {
  
  const tokenservice = inject(TokenService);
  const router = inject(Router);

  const expectedRole = route.data['role'];
  const userRole = tokenservice.getRole();

  if (userRole !== expectedRole){
    router.navigate(['/unauthorized']);
    return false;
  }
  return true;
};
