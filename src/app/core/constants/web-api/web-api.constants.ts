export const WebApiConstants = {
  catalogo: {
    getAllTipoUsuario: `catalogo/getAllTipoUsuario`,
    getAllEstado: `catalogo/getAllEstado`,
    getAllMunicipioByEstado: (id:string) => `catalogo/getAllMunicipioByEstado/${id}`,
    getAllEstatusBusquedaJugador: `catalogo/getAllEstatusBusquedaJugador`
  },
  usuario: {
    save: `usuario/save`,
    validaToken: (token:string) => `usuario/valida-token?token=${token}`,
    recuperaContrasena: `usuario/recupera-contrasena`,
  },
  informacion_personal: {
    save: `informacion-personal/save`,
    getInformacion: `informacion-personal`
  },
  auth:{
    login: `auth/login`,
    refresh: `auth/refresh`,
    logout: `auth/logout`,
    yopli: 'auth/yopli',
  }
}
