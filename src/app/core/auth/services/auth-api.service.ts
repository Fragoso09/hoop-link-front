import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ILogin } from "../interfaces/login.interface";
import { WebApiConstants } from "../../constants/web-api/web-api.constants";

// auth-api.service.ts
@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private http: HttpClient) {}

  login(credenciales: ILogin): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${WebApiConstants.auth.login}`, credenciales, { withCredentials: true });
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${WebApiConstants.auth.refresh}`, {}, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${WebApiConstants.auth.logout}`, {}, { withCredentials: true });
  }
}
