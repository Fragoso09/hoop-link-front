import { inject } from '@angular/core';
import { CanActivateFn, CanLoadFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, combineLatest, filter, take, of, tap, switchMap } from 'rxjs';

export const authGuard: CanActivateFn & CanLoadFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return combineLatest([authService.user$, authService.authChecked$]).pipe(
    tap(([user, checked]) => {
      console.log('[authGuard] user:', user, 'checked:', checked);
    }),
    filter(([_, checked]) => checked),
    take(1),
    map(([user]) => {
      if (user) {
        console.log('[authGuard] acceso concedido');
        return true;
      } else {
        console.log('[authGuard] acceso denegado, redirigiendo a login');
        return router.parseUrl('/login');
      }
    }),
    catchError(err => {
      console.error('[authGuard] error:', err);
      return of(router.parseUrl('/login'));
    })
  );
};

