import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '@core/pages/not-found-page/not-found-page.component';
import { MainPageComponent } from './features/youtube/pages/main-page/main-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
