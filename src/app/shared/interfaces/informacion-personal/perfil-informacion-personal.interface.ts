import { ICatalogo } from "../catalogo/catalogo.interface";

export interface IPerfilInformacionPersonal {
  usuarioId?: number,
  fotoPerfil?: string | File,
  altura: number,
  peso: number,
  estatusBusquedaJugador: ICatalogo,
  medidaMano: number,
  largoBrazo: number,
  quienEres: string,
}
