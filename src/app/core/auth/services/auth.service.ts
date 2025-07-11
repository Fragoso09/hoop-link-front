import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { WebApiConstants } from '../../constants/web-api/web-api.constants';
import { ILogin } from '../interfaces/login.interface';
import { WebApiService } from '../../services/web-api/web-api.service';
import { IAuthUser } from '../interfaces/auth-user.interface';
import { AuthApiService } from './auth-api.service';
import { IResponse } from '../../interfaces/response/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<IAuthUser | null>(null);
  public user$ = this.userSubject.asObservable();

  private authChecked = new BehaviorSubject<boolean>(false);
  public authChecked$ = this.authChecked.asObservable();

  constructor(private readonly authApi: AuthApiService, private readonly webApiService:WebApiService) {

  }

  login(credenciales: ILogin): Observable<IAuthUser> {
  const url = WebApiConstants.auth.login;

  return this.authApi.login(credenciales).pipe(
      switchMap(() => this.webApiService.post<IAuthUser>(url, credenciales, true)),
      tap(user => this.userSubject.next(user)),
      catchError(err => {
        this.userSubject.next(null);
        return throwError(() => err);
      })
    );
  }

  logout(): Observable<any>  {
    return this.authApi.logout().pipe(
      tap(() => this.userSubject.next(null))
    );
    // podrías llamar un endpoint /auth/logout si limpias cookies desde el backend
  }

 checkAuth(): Observable<IAuthUser | null> {
  return this.webApiService.get<IResponse<IAuthUser>>(WebApiConstants.auth.yopli, true).pipe(
      map(response => response.data ?? null), // Extrae solo el usuario
      tap(user => {
        this.userSubject.next(user);
        this.authChecked.next(true);
      }),
      catchError(() => {
        this.userSubject.next(null);
        this.authChecked.next(true);
        return of(null);
      })
    );
  }


  refreshToken(): Observable<any> {
     return this.authApi.refreshToken().pipe(
      tap(() => this.checkAuth()),
      catchError(err => {
        this.userSubject.next(null);
        return throwError(() => err);
      })
    );
  }


  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  getUser(): IAuthUser | null {
    return this.userSubject.value as IAuthUser;
  }

  setUser(user: IAuthUser) {
    this.userSubject.next(user);
  }

  setChecked(checked:boolean) {
    this.authChecked.next(checked);
  }

  clearUser() {
    this.userSubject.next(null);
  }

  public yopli(): Observable<any> {
    const url:string = WebApiConstants.auth.yopli;
    return this.webApiService.get<IResponse<IAuthUser>>(url, true).pipe(
      map(response => response.data ?? null), // extrae solo el usuario
      tap(user => {
        this.userSubject.next(user)
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}

