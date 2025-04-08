export interface IWebApi {
  urlCatalogo: string;
  urlUsuario: string;
}

export interface IResponse<T> {
  statusCode:number;
  mensaje:string;
  data?: T;
}
