import { Injectable } from '@angular/core';
import { IRecuperaContrasena, IRegistro } from '../../interfaces/usuario/registro.interface';
import { WebApiService } from '../web-api/web-api.service';
import { catchError, Observable, throwError } from 'rxjs';
import { WebApiConstants } from '../../constants/web-api/web-api.constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //#region Propiedades
  public esRegistro:boolean = false;
  public usuarioTokenValidado = false;
  //#endregion Propiedades

  //#region Constructor
  constructor(
    private readonly webApiService:WebApiService
  ) { }
  //#endregion Constructor

  //#region Generales
  public save(registroDTO:IRegistro): Observable<any> {
    const url: string = WebApiConstants.urlUsuario + 'save';

    return this.webApiService.post<IRegistro>(url, registroDTO).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  public validaToken(token:string): Observable<any> {
    const url: string = WebApiConstants.urlUsuario + `valida-token?token=${token}`;
    return this.webApiService.get<string>(url).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  public recuperaContrasena(correo: IRecuperaContrasena): Observable<any> {
    const url: string = WebApiConstants.urlUsuario + `recupera-contrasena`;
    return this.webApiService.post<any>(url, correo).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  //#endregion Generales

}
