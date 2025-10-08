import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ILogin, ITokens } from "../interfaces";
import { WebApiConstants } from "../../constants/web-api/web-api.constants";
import { IResponse } from "../../interfaces/response/response.interface";

// auth-api.service.ts
@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private http: HttpClient) {}

  login(credenciales: ILogin): Observable<IResponse<ITokens>> {
    return this.http.post<IResponse<ITokens>>(`${environment.apiUrl}/${WebApiConstants.auth.login}`, credenciales,);
  }

  refreshToken(refreshToken: string): Observable<IResponse<ITokens>> {
    return this.http.post<IResponse<ITokens>>(`${environment.apiUrl}/${WebApiConstants.auth.refresh}`, { refreshToken });
  }

  logout(refreshToken: string): Observable<IResponse<any>> {
    return this.http.post<IResponse<any>>(`${environment.apiUrl}/${WebApiConstants.auth.logout}`, { refreshToken });
  }
}
