import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.auth.access_token$.pipe(
      take(1),
      switchMap(accessToken => {
        if (accessToken) {
          const newRequest = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
          });
          return next.handle(newRequest);
        }
        return next.handle(request);
      })
    );
  }

}
