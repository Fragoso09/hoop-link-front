import { Injectable } from '@angular/core';

import { WebApiService } from '../web-api/web-api.service';
import { Observable, catchError, throwError } from 'rxjs';

import { WebApiConstants } from '../../constants/web-api/web-api.constants';

@Injectable({
  providedIn: 'root'
})
export class InformacionPersonalService {

//#region Propiedades
//#endregion

//#region Constructor
  constructor(
    private readonly _webApiService:WebApiService
  ) { }
//#endregion

//#region Servicios
  public save(datos: FormData): Observable<any> {
    const url: string = WebApiConstants.informacion_personal.save;

    return this._webApiService.post<any>(url, datos, true).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
//#endregion

}
