import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injector, inject } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<boolean | null>(null);

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const injector = inject(Injector);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/login') && !req.url.includes('/auth/yopli')) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          const authService = injector.get(AuthService);

          return authService.refreshToken().pipe(
            switchMap(() => authService.checkAuth()),  // Espera a checkAuth
            switchMap(() => {
              refreshTokenSubject.next(true);
              return next(req);
            }),
            catchError(err => {
              return authService.logout().pipe(
                switchMap(() => throwError(() => error))
              );
            }),
            finalize(() => {
              isRefreshing = false;
            })
          );
        } else {
          return refreshTokenSubject.pipe(
            filter(result => result === true),
            take(1),
            switchMap(() => next(req))
          );
        }
      }

      return throwError(() => error);
    })
  );
};

