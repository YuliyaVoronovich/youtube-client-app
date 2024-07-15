import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Routes } from '@core/models/route.model';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = () => {
  const authService: AuthService = inject(AuthService);

  if (authService.isLoginned()) {
    return true;
  }
  return inject(Router).navigate([Routes.Login]);
};
