import { Routes } from '@angular/router';
// import { PortalComponent } from './pages/portal/portal.component';
// import { NotFoundComponent } from './pages/not-found/not-found.component';
// import { AcercaDeComponent } from './pages/legal/acerca-de/acerca-de.component';
// import { LegalComponent } from './pages/legal/legal.component';
// import { PoliticaPrivacidadComponent } from './pages/legal/politica-privacidad/politica-privacidad.component';
// import { PoliticaCookiesComponent } from './pages/legal/politica-cookies/politica-cookies.component';
// import { CondicionesUsoComponent } from './pages/legal/condiciones-uso/condiciones-uso.component';
// import { PoliticaMarcaComponent } from './pages/legal/politica-marca/politica-marca.component';
// import { PoliticaCopyrightComponent } from './pages/legal/politica-copyright/politica-copyright.component';
// import { RegistroComponent } from './pages/registro/registro.component';
// import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'portal',
    title: 'Portal | HoopLink',
    loadComponent: () => import('./pages/portal/portal.component').then(p => p.PortalComponent),
  },
  {
    path: 'legal',
    title: 'Legal | HoopLink',
    loadComponent: () => import('./pages/legal/legal.component').then(l => l.LegalComponent),
    children: [
      {
        path: 'acerca-de',
        title: 'Acerca de | HoopLink',
        loadComponent: () => import('./pages/legal/acerca-de/acerca-de.component').then(c => c.AcercaDeComponent),
      },
      {
        path: 'condiciones-uso',
        title: 'Condiciones de Uso | HoopLink',
        loadComponent: () => import('./pages/legal/condiciones-uso/condiciones-uso.component').then(c => c.CondicionesUsoComponent),
      },
      {
        path: 'politica-privacidad',
        title: 'Política de Privacidad | HoopLink',
        loadComponent: () => import('./pages/legal/politica-privacidad/politica-privacidad.component').then(c => c.PoliticaPrivacidadComponent),
      },
      {
        path: 'politica-cookies',
        title: 'Política de Cookies | HoopLink',
        loadComponent: () => import('./pages/legal/politica-cookies/politica-cookies.component').then(c => c.PoliticaCookiesComponent),
      },
      {
        path: 'politica-copyright',
        title: 'Política de Copyright | HoopLink',
        loadComponent: () => import('./pages/legal/politica-copyright/politica-copyright.component').then(c => c.PoliticaCopyrightComponent),
      },
      {
        path: 'politica-marca',
        title: 'Política de Marca | HoopLink',
        loadComponent: () => import('./pages/legal/politica-marca/politica-marca.component').then(c => c.PoliticaMarcaComponent),
      },
    ]
  },
  {
    path: 'registro',
    title: 'Registro | HoopLink',
    loadComponent: () => import('./pages/registro/registro.component').then(r => r.RegistroComponent),
    children: [
      {
        path: 'valida-correo',
        title: 'Valida Correo | HoopLink',
        loadComponent: () => import('./pages/registro/valida-correo/valida-correo.component').then(v => v.ValidaCorreoComponent),
      }
    ]
  },
  {
    path: 'login',
    title: 'Login | HoopLink',
    loadComponent: () => import('./pages/login/login.component').then(l=> l.LoginComponent),
  },
  {
    path: 'terminos-condiciones',
    title: 'Terminos y Condiciones | HoopLink',
    loadComponent: () => import('./pages/terminos-condiciones/terminos-condiciones.component').then(t => t.TerminosCondicionesComponent),
  },
  {
    path: '',
    redirectTo: '/portal',
    pathMatch: 'full',
  },
  {
    path: '**',
    title: '404 | HoopLink',
    loadComponent: () => import('./pages/not-found/not-found.component').then(n => n.NotFoundComponent),
  }
];
