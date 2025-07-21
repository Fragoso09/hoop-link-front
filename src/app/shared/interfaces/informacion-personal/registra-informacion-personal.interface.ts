import { IFuerzaResistenciaInformacionPersonal } from "./fuerza-resistencia-informacion-personal.interface";
import { IPerfilInformacionPersonal } from "./perfil-informacion-personal.interface";

export interface IRegistraInformacionPersonal {
  perfil: IPerfilInformacionPersonal,
  fuerzaResistencia: IFuerzaResistenciaInformacionPersonal,
}
