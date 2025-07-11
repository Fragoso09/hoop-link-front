import { inject } from '@angular/core';
import { CanActivateFn, CanLoadFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, combineLatest, filter, take, of, tap, switchMap } from 'rxjs';

export const authGuard: CanActivateFn & CanLoadFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return combineLatest([
  authService.user$,
  authService.authChecked$
]).pipe(
  // tap(([user, checked]) => {
  //   console.log('Guard values:', { user, checked });
  // }),
  filter(([_, checked]) => checked),
  take(1),
  map(([user]) => user ? true : router.parseUrl('/login')),
  catchError(() => of(router.parseUrl('/login')))
);

};
