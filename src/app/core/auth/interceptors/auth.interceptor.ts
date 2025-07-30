import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Injector, inject } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<boolean | null>(null);


export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const injector = inject(Injector);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(req);
      console.log('[Interceptor] Error 401 detectado');
      if (error.status === 401 && !req.url.includes('/auth/login')) {
        // if (error.status === 401 && !req.url.includes('/auth/login') && !req.url.includes('/auth/yopli')) {
        console.log('[Interceptor] Intentando refrescar token...');

        const authService = injector.get(AuthService);
        const router = injector.get(Router);

        if (!isRefreshing) {
          console.log('[Interceptor] enttro al priemr if...');
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return authService.refreshToken().pipe(
            switchMap(() => authService.checkAuth()),
            switchMap(() => {
              console.log('Emitiendo true en refreshTokenSubject');
              refreshTokenSubject.next(true);
              console.log('true emitido');
              return next(req.clone());
            }),
           catchError(err => {
              console.log('[Interceptor] error al refrescar token, notificando...');
              refreshTokenSubject.next(false); // 🔑 desbloquear el else
              return authService.logout().pipe(
                switchMap(() => {
                  router.navigate(['/login']);
                  return throwError(() => error);
                })
              );
            }),
            finalize(() => {
              console.log('[Interceptor] entor al finalize...');
              isRefreshing = false;
            })
          );
        } else {
          console.log('[Interceptor] Entro al else del primer if...');
          console.log('Interceptor: esperando refreshTokenSubject...');
          return refreshTokenSubject.pipe(
            take(1),
            switchMap(result => {
              console.log('refreshTokenSubject emitió:', result);
              if (result === true) {
                console.log('Refresh completado, reintentando petición...');
                return next(req.clone());
              } else {
                console.log('Refresh fallido, redirigiendo...');
                router.navigate(['/login']);
                return throwError(() => error);
              }
            })
          );
        }
      }

      return throwError(() => error);
    })
  );
};
