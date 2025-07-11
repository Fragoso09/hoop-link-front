import { inject } from '@angular/core';
import { CanActivateFn, CanLoadFn, Router, ActivatedRouteSnapshot, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { combineLatest, of } from 'rxjs';
import { filter, take, map, catchError } from 'rxjs/operators';

export const roleGuard: CanActivateFn & CanLoadFn = (route: ActivatedRouteSnapshot | Route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtén el rol esperado desde data.role (para CanLoad puede ser undefined)
  const expectedRole = route.data?.['role'] as string | undefined;

   return combineLatest([authService.user$, authService.authChecked$]).pipe(
    filter(([_, checked]) => checked),  // Espera hasta que authChecked sea true
    take(1),                            // Toma la primera vez que pasa
    map(([user]) => {
      if (!user) return router.parseUrl('/login');
      if (expectedRole && user.rol !== expectedRole) return router.parseUrl('/access-denied');
      return true;
    }),
    catchError(() => of(router.parseUrl('/login')))
  );
};
