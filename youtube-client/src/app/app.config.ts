import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AccessTokenInterceptor } from '@features/youtube/interceptors/access-token.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { YoutubeEffects } from '@store/effects/youtube.effect';
import { routes } from './app.routes';
import { cardFeatureKey, CardReducer } from './store/reducers/card.reducer';
import {
  yotubeFeatureKey,
  YoutubeReducer,
} from './store/reducers/youtube.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true,
    },
    provideStore(),
    provideState({ name: cardFeatureKey, reducer: CardReducer }),
    provideState({ name: yotubeFeatureKey, reducer: YoutubeReducer }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    provideEffects(YoutubeEffects),
  ],
};
