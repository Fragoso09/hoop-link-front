import { ICatalogo } from "../catalogo/catalogo.interface";

export interface IInformacinPersonal {
  informacionPersonalId: number,
  fotoPerfilId: number,
  altura: number,
  peso: number,
  estatusBusquedaJugador: ICatalogo,
  medidaMano: number,
  largoBrazo: number,
  quienEres: string,
  fotoPerfilPublicUrl: string
}
