import { Injectable } from '@angular/core';
import { WebApiService } from '../../../core/services/web-api/web-api.service';
import { WebApiConstants } from '../../../core/constants/web-api/web-api.constants';
import { ICatalogo } from '../../interfaces/catalogo/catalogo.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  //#region Propiedades
  public AllTipoUsuario: Array<ICatalogo> = [];
  //#endregion Propiedades

  constructor(
    private readonly webApiService:WebApiService
  ) { }

  public getAllTipoUsuario(): Observable<ICatalogo[]> {
    const url: string = WebApiConstants.catalogo.getAllTipoUsuario;

    return this.webApiService.get<ICatalogo[]>(url);
  }

  public getAllEstado(): Observable<ICatalogo[]> {
    const url: string = WebApiConstants.catalogo.getAllEstado;

    return this.webApiService.get<ICatalogo[]>(url);
  }

  public getAllMunicipioByEstado(id:string): Observable<ICatalogo[]> {
    const url: string = WebApiConstants.catalogo.getAllMunicipioByEstado(id);

    return this.webApiService.get<ICatalogo[]>(url);
  }

  public getAllEstatusBusquedaJugador(): Observable<ICatalogo[]> {
    const url: string = WebApiConstants.catalogo.getAllEstatusBusquedaJugador;

    return this.webApiService.get<ICatalogo[]>(url);
  }

   public getAllPosicionJugador(): Observable<ICatalogo[]> {
    const url: string = WebApiConstants.catalogo.getAllPosicionJugador;

    return this.webApiService.get<ICatalogo[]>(url);
  }

}
