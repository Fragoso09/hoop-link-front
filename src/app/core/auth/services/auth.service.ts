import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable, of, throwError, timer } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { WebApiConstants } from '../../constants/web-api/web-api.constants';
import { ILogin } from '../interfaces/login.interface';
import { WebApiService } from '../../services/web-api/web-api.service';
import { IAuthUser } from '../interfaces/auth-user.interface';
import { AuthApiService } from './auth-api.service';
import { IResponse } from '../../interfaces/response/response.interface';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
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

  constructor(private readonly authApi: AuthApiService, private readonly webApiService:WebApiService, private readonly router:Router) {

  }

  login(credenciales: ILogin): Observable<IAuthUser | null> {
    return this.authApi.login(credenciales).pipe(
      switchMap(() => timer(100).pipe(switchMap(() => this.checkAuth()))),
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
        this._user.set(null);
        this._authChecked.set(true);
        return throwError(() => err);
      })
    );
  }

 logout(): Observable<any> {
    return this.authApi.logout().pipe(
      catchError(() => of(null)),
      tap(() => {
        this._user.set(null);
        this._authChecked.set(true);  // importante dejar true aquí
        this.router.navigate(['/login']);
      }),
    );
  }

  checkAuth(): Observable<IAuthUser | null> {
    return this.webApiService.get<IResponse<IAuthUser>>(WebApiConstants.auth.yopli, true).pipe(
      // tap(checked => console.log('Auth checked:', checked)),
      map(response => response.data ?? null), // Extrae solo el usuario
      tap(user => {
        this._user.set(user);
        this._authChecked.set(true);  // <- Esto es crucial
      }),
      catchError(() => {
        this._user.set(null);
        this._authChecked.set(true);  // <- Esto también
        return of(null);
      })
    );
  }

  refreshToken(): Observable<any> {
    return this.authApi.refreshToken().pipe(
      switchMap(() => this.checkAuth()), // así sí espera a que checkAuth termine
      catchError(err => {
        this._user.set(null);
        this._authChecked.set(true);  // importante marcar que terminó la comprobación
        return throwError(() => err);
      })
    );
  }

  isAuthenticated(): boolean {
    return !! this._user();
  }

  getUser(): IAuthUser | null {
    return this.user();
  }

  setUser(user: IAuthUser) {
    this._user.set(user);
  }

  clearUser() {
    this._user.set(null);
  }

  setChecked(checked:boolean) {
    this._authChecked.set(checked);
  }


  public yopli(): Observable<any> {
    const url:string = WebApiConstants.auth.yopli;
    return this.webApiService.get<IResponse<IAuthUser>>(url, true).pipe(
      map(response => response.data ?? null), // extrae solo el usuario
      tap(user => {
        this._user.set(user)
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}

