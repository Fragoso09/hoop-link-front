import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(private http: HttpClient) {}

  // Método GET (con opción de autenticación)
  get<T>(endpoint: string, authRequired = false): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/${endpoint}`, this.getOptions(authRequired));
  }

  // Método POST
  post<T>(endpoint: string, data: any, authRequired = false): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/${endpoint}`, data, this.getOptions(authRequired));
  }

  // Método PUT
  put<T>(endpoint: string, data: any, authRequired = false): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}/${endpoint}`, data, this.getOptions(authRequired));
  }

  // Método DELETE
  delete<T>(endpoint: string, authRequired = false): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}/${endpoint}`, this.getOptions(authRequired));
  }

  // Método privado para construir los headers
  private getOptions(authRequired: boolean) {
    let headers = new HttpHeaders();

    if (authRequired) {
      const token = localStorage.getItem('token'); // O usa un servicio de autenticación
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return { headers };
  }
}
