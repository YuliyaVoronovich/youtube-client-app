import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const { YOUTUBE_API_KEY } = environment;

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newRequest = req.clone({
      params: req.params.set('key', YOUTUBE_API_KEY),
    });
    return next.handle(newRequest);
  }
}
