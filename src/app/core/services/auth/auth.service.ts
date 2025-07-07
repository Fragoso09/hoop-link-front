import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { WebApiConstants } from '../../constants/web-api/web-api.constants';
import { ILogin } from '../../interfaces/auth/login.interface';
import { WebApiService } from '../web-api/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _authSubject = new BehaviorSubject<boolean>(false);
  public readonly authStatus$ = this._authSubject.asObservable();

  constructor(private readonly webApiService:WebApiService) {}

  login(credenciales: ILogin): Observable<any> {
    const url: string = WebApiConstants.auth.login;

    return this.webApiService.post<any>(url, credenciales, true).pipe(
      tap(() => this._authSubject.next(true)),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  refreshToken(): Observable<any> {
    const url: string = WebApiConstants.auth.refresh;

    return this.webApiService.post<any>(url, {}, true).pipe(
      tap(() => this._authSubject.next(true)),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  logout(): void {
     const url: string = WebApiConstants.auth.logout;
    this._authSubject.next(false);

    this.webApiService.post(url, {}, true).subscribe({
      next: () => console.log('Logout exitoso'),
      error: (err) => console.error('Error al hacer logout', err)
    });
    // podrías llamar un endpoint /auth/logout si limpias cookies desde el backend
  }

  isAuthenticated(): boolean {
    return this._authSubject.value;
  }
}
