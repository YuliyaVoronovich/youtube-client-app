import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = () => {
  const authService: AuthService = inject(AuthService);

  authService.isLoginned$.subscribe((isLoggedIn: boolean) => {
    console.warn(isLoggedIn);
    return !isLoggedIn ? inject(Router).navigate(['login']) : true;
  });

  return true;
};
