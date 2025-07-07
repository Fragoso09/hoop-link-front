export const WebApiConstants = {
  catalogo: {
    getAllTipoUsuario: `catalogo/getAllTipoUsuario`,
    getAllEstado: `catalogo/getAllEstado`,
    getAllMunicipioByEstado: (id:string) => `getAllMunicipioByEstado/${id}`,
  },
  usuario: {
    save: `usuario/save`,
    validaToken: (token:string) => `usuario/valida-token?token=${token}`,
    recuperaContrasena: `recupera-contrasena`,
  },
  auth:{
    login: `auth/login`,
    refresh: `auth/refresh`,
    logout: `logout`
  }
}
