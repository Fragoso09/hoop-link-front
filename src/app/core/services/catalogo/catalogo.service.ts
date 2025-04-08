import { Injectable } from '@angular/core';
import { WebApiService } from '../web-api/web-api.service';
import { WebApiConstants } from '../../constants/web-api/web-api.constants';
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
    const url: string = WebApiConstants.urlCatalogo + 'getAllTipoUsuario';

    return this.webApiService.get<ICatalogo[]>(url);
  }

  public getAllEstado(): Observable<ICatalogo[]> {
    const url: string = WebApiConstants.urlCatalogo + 'getAllEstado';

    return this.webApiService.get<ICatalogo[]>(url);
  }

  public getAllMunicipioByEstado(id:string): Observable<ICatalogo[]> {
    const url: string = WebApiConstants.urlCatalogo + 'getAllMunicipioByEstado/' + id;

    return this.webApiService.get<ICatalogo[]>(url);
  }

}
