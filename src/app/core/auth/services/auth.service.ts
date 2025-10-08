import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, of, throwError, combineLatest } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ILogin } from '../interfaces/login.interface';
import { IAuthUser } from '../interfaces/auth-user.interface';
import { IResponse } from '../../interfaces/response/response.interface';
import { ITokens } from '../interfaces';
import { AuthApiService } from './auth-api.service';
import { WebApiService } from '../../services/web-api/web-api.service';
import { WebApiConstants } from '../../constants/web-api/web-api.constants';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // 👇 Signals en lugar de BehaviorSubjects
  private readonly _user = signal<IAuthUser | null>(null);
  private readonly _authChecked = signal<boolean>(false);

  // Expuestos si necesitas leerlos en otras partes (readonly)
  public readonly user = this._user;
  public readonly authChecked = this._authChecked;

  // usados por el guard
  readonly user$ = toObservable(this.user);
  readonly authChecked$ = toObservable(this.authChecked);

  constructor(
    private readonly authApi: AuthApiService,
    private readonly webApiService: WebApiService,
    private readonly router: Router
  ) {}

  /** 🔐 LOGIN */
  login(credenciales: ILogin): Observable<IAuthUser | null> {
    return this.authApi.login(credenciales).pipe(
      map(res => res.data), // ⬅️ Extrae los tokens desde la respuesta
      tap(tokens => {
        if (!tokens) throw new Error('Respuesta sin tokens');
        localStorage.setItem('accessToken', tokens.token);
        localStorage.setItem('refreshToken', tokens.refreshToken);
      }),
      switchMap(() => this.checkAuth()),
      switchMap(() =>
        combineLatest([this.user$, this.authChecked$]).pipe(
          filter(([user, checked]) => !!user && checked),
          take(1),
          map(([user]) => user)
        )
      ),
      tap(user => {
        this._user.set(user);
        this._authChecked.set(true);
      }),
      catchError(err => {
        this.clearTokens();
        this._user.set(null);
        this._authChecked.set(true);
        return throwError(() => err);
      })
    );
  }

  /** 🚪 LOGOUT */
  logout(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.authApi.logout(refreshToken ?? '').pipe(
      catchError(() => of(null)), // incluso si el backend falla
      tap(() => {
        this.clearTokens();
        this._user.set(null);
        this._authChecked.set(true);
        this.router.navigate(['/login']);
      })
    );
  }

  /** 👁️ Verificar usuario autenticado */
  checkAuth(): Observable<IAuthUser | null> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this._user.set(null);
      this._authChecked.set(true);
      return of(null);
    }

    return this.webApiService.get<IResponse<IAuthUser>>(WebApiConstants.auth.yopli, true).pipe(
      map(response => response.data ?? null),
      tap(user => {
        console.log('[checkAuth] USUARIO CARGADO:', user);
        this._user.set(user);
        this._authChecked.set(true);
      }),
      catchError(err => {
        console.warn('[checkAuth] Token inválido o expirado:', err);
        this.clearTokens();
        this._user.set(null);
        this._authChecked.set(true);
        return of(null);
      })
    );
  }

  /** 🔄 REFRESH TOKEN */
  refreshToken(): Observable<IAuthUser | null> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return of(null);

    return this.authApi.refreshToken(refreshToken).pipe(
      map(res => res.data), // ⬅️ extrae los tokens del IResponse
      tap(tokens => {
        if (!tokens) throw new Error('No se recibieron nuevos tokens');
        localStorage.setItem('accessToken', tokens.token);
        localStorage.setItem('refreshToken', tokens.refreshToken);
      }),
      switchMap(() => this.checkAuth()),
      catchError(err => {
        console.error('[refreshToken] Error:', err);
        this.clearTokens();
        this._user.set(null);
        this._authChecked.set(true);
        return of(null);
      })
    );
  }

  /** 🧹 Helpers */
  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!this._user();
  }

  getUser(): IAuthUser | null {
    return this._user();
  }

  setUser(user: IAuthUser) {
    this._user.set(user);
  }

  setChecked(checked: boolean) {
    this._authChecked.set(checked);
  }

  /** Debug o endpoint manual */
  yopli(): Observable<IAuthUser | null> {
    return this.webApiService.get<IResponse<IAuthUser>>(WebApiConstants.auth.yopli, true).pipe(
      map(response => response.data ?? null),
      tap(user => this._user.set(user)),
      catchError(error => throwError(() => error))
    );
  }
}
