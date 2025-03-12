import { Injectable } from '@angular/core';
import { WebApiService } from '../web-api/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  //#region Propiedades

  //#endregion Propiedades

  constructor(
    private readonly webApiService:WebApiService
  ) { }



}
