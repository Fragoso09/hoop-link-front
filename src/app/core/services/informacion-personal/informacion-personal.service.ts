import { Injectable } from '@angular/core';

import { WebApiService } from '../web-api/web-api.service';
import { Observable, catchError, throwError } from 'rxjs';

import { WebApiConstants } from '../../constants/web-api/web-api.constants';
import { IResponse } from '../../interfaces/response/response.interface';
import { IVideoInformacionPersonalResponse } from '../../../shared/interfaces/video/videos-response.interface';
import { HttpEvent } from '@angular/common/http';

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
  public save(datos: FormData): Observable<IResponse<any>> {
    const url: string = WebApiConstants.informacion_personal.save;

    return this._webApiService.post<IResponse<any>>(url, datos, true).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  public getInformacionPersonal(): Observable<any> {
    const url: string = WebApiConstants.informacion_personal.getInformacion
    return this._webApiService.get<IResponse<any>>(url, true).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  public uploadVideos(tipo:string, id:string, file: FormData): Observable<HttpEvent<IResponse<IVideoInformacionPersonalResponse>>> {
    const url: string = WebApiConstants.informacion_personal.uploadVideos(tipo, id);
    return this._webApiService.post<IResponse<IVideoInformacionPersonalResponse>>(url, file, true, { reportProgress: true, observe: 'events' }).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
//#endregion

}
