export const WebApiConstants = {
  catalogo: {
    getAllTipoUsuario: `catalogo/getAllTipoUsuario`,
    getAllEstado: `catalogo/getAllEstado`,
    getAllMunicipioByEstado: (id:string) => `catalogo/getAllMunicipioByEstado/${id}`,
  },
  usuario: {
    save: `usuario/save`,
    validaToken: (token:string) => `usuario/valida-token?token=${token}`,
    recuperaContrasena: `usuario/recupera-contrasena`,

  },
  auth:{
    login: `auth/login`,
    refresh: `auth/refresh`,
    logout: `auth/logout`,
    yopli: 'auth/yopli',
  }
}
