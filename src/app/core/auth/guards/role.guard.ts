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
    filter(([_, checked]) => checked), // Espera a que authChecked sea true
    take(1),
    map(([user]) => {
      console.log('from auth',user);
      if (!user) {
        // No autenticado: redirigir a login
        return router.parseUrl('/login');
      }
      if (expectedRole && user.rol !== expectedRole) {
        // Usuario sin permiso para esta ruta
        return router.parseUrl('/access-denied');
      }
      // Usuario autenticado y con rol permitido
      return true;
    }),
    catchError(() => of(router.parseUrl('/login')))
  );
};
