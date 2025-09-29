import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Auth } from './services/auth';

export const authResolver: ResolveFn<boolean> = (route, state) => {
  const auth = inject(Auth);

  return auth.checkAuthStatus();
};
