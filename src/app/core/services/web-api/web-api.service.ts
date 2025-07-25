import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(private http: HttpClient) {}

  // Método GET (con opción de autenticación)
  get<T>(endpoint: string, authRequired: boolean = false): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/${endpoint}`, this.getOptions(authRequired));
  }

  // Método POST
  post<T>(
    endpoint: string,
    data: any,
    authRequired?: boolean,
    extraOptions?: { reportProgress?: boolean; observe?: 'body' }
  ): Observable<T>;

  post<T>(
    endpoint: string,
    data: any,
    authRequired: boolean,
    extraOptions: { reportProgress?: boolean; observe: 'events' }
  ): Observable<HttpEvent<T>>;

  post<T>(
    endpoint: string,
    data: any,
    authRequired: boolean = false,
    extraOptions: { reportProgress?: boolean; observe?: 'body' | 'events' } = {}
  ): Observable<T> | Observable<HttpEvent<T>> {
    const baseOptions = this.getOptions(authRequired);

    // Crea un nuevo objeto para las opciones HTTP sin mezclar tipos
    const httpOptions: any = { ...baseOptions };

    if (extraOptions.observe === 'events') {
      httpOptions.observe = 'events';
      httpOptions.reportProgress = extraOptions.reportProgress ?? true;
    } else {
      // Por defecto o si observe es 'body' o undefined
      httpOptions.observe = 'body';
      httpOptions.reportProgress = extraOptions.reportProgress ?? false;
    }

    return this.http.post<T>(`${environment.apiUrl}/${endpoint}`, data, httpOptions);
  }



  // Método PUT
  put<T>(endpoint: string, data: any, authRequired: boolean = false): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}/${endpoint}`, data, this.getOptions(authRequired));
  }

  // Método DELETE
  delete<T>(endpoint: string, authRequired: boolean = false): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}/${endpoint}`, this.getOptions(authRequired));
  }

  // Método privado para construir los headers
  private getOptions(authRequired: boolean): { headers?: HttpHeaders, withCredentials?: boolean } {
    let options: any = {};

    // Solo añadir withCredentials si es necesario
    if (authRequired) {
      options.withCredentials = true;
    }

    return options;
  }

}
