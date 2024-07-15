import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '@core/pages/not-found-page/not-found-page.component';
import { LoginPageComponent } from '@features/auth/pages/login-page/login-page.component';
import { authGuard } from '@features/auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    loadComponent: () =>
      import('@features/youtube/pages/main-page/main-page.component').then(
        m => m.MainPageComponent
      ),
    canMatch: [authGuard],
  },
  {
    path: 'watch/:id',
    loadComponent: () =>
      import(
        '@features/youtube/pages/detailed-information-page/detailed-information-page.component'
      ).then(m => m.DetailedInformationPageComponent),
    canMatch: [authGuard],
  },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
