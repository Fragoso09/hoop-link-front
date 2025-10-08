import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Injector, inject } from '@angular/core';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, filter, switchMap, take, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const injector = inject(Injector);
  const authService = injector.get(AuthService);
  const router = injector.get(Router);

  const accessToken = localStorage.getItem('accessToken');
  let authReq = req;

  // Agregamos el token a todas las peticiones excepto login/refresh
  if (accessToken && !req.url.includes('/auth/login') && !req.url.includes('/auth/refresh')) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/login') && !req.url.includes('/auth/refresh')) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return authService.refreshToken().pipe(
            switchMap(user => {
              if (!user) {
                // Si no se obtuvo usuario después de refresh, logout
                return authService.logout().pipe(
                  switchMap(() => {
                    router.navigate(['/login']);
                    return throwError(() => error);
                  })
                );
              }

              const newAccessToken = localStorage.getItem('accessToken');
              refreshTokenSubject.next(newAccessToken);

              // Reintentamos la petición original con el nuevo token
              const clonedReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newAccessToken}` }
              });
              return next(clonedReq);
            }),
            catchError(err => {
              refreshTokenSubject.next(null);
              return authService.logout().pipe(
                switchMap(() => {
                  router.navigate(['/login']);
                  return throwError(() => err);
                })
              );
            }),
            finalize(() => {
              isRefreshing = false;
            })
          );
        } else {
          // Si ya se está haciendo refresh, esperamos que termine
          return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(token => {
              const clonedReq = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
              });
              return next(clonedReq);
            })
          );
        }
      }

      return throwError(() => error);
    })
  );
};
