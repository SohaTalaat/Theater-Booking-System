import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.user() && auth.isAdmin()) {
    return true;
  } else if (auth.user()) {
    // Logged in but not admin
    router.navigate(['/']);
    return false;
  } else {
    // Not logged in
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
