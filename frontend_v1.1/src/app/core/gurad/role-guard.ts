import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);

  const expectedRole = route.data['role'];
  const userRole = 'hr';

  if (userRole !== expectedRole){
    router.navigate(['/unauthorized']);
    return false;
  }
  return true;
};
