import { inject } from '@angular/core';
import { CanActivateFn, CanLoadFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, combineLatest, filter, take, of, tap } from 'rxjs';

export const authGuard: CanActivateFn & CanLoadFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

   return combineLatest([authService.user$, authService.authChecked$]).pipe(
    filter(([_, checked]) => checked), // Espera a que authChecked sea true
    take(1),
    // tap(([user]) => console.log('authGuard user:', user)),
    map(([user]) => {
      if (user) {
        return true;
      }
      return router.parseUrl('/login');
    }),
    catchError(() => of(router.parseUrl('/login')))
  );
};
