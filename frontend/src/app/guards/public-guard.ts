import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const publicGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.user()) {
    router.navigate(['/dashboard']); // Redirect to dashboard if already logged in
    return false;
  } else {
    return true; // Allow access to login/register pages
  }
};
