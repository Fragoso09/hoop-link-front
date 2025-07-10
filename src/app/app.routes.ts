import { Routes } from '@angular/router';
import { DesktopComponent } from './features/desktop/desktop.component';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'portal',
    title: 'Portal | HoopLink',
    loadComponent: () => import('./layouts/public-layout/public-portal-layout/public-portal-layout.component').then(p => p.PublicPortalLayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent:() => import('./features/portal/pages/portal-page/portal-page.component').then(p => p.PortalPageComponent),
      },
      {
        path: 'terminos-condiciones',
        title: 'Terminos y Condiciones | HoopLink',
        loadComponent: () => import('./features/portal/pages/terminos-condiciones/terminos-condiciones.component').then(t => t.TerminosCondicionesComponent),
      },
    ]
  },
  {
    path: 'legal',
    title: 'Legal | HoopLink',
    loadComponent: () => import('./layouts/public-layout/public-legal-layout/legal.component').then(l => l.LegalComponent),
    children: [
      {
        path: '',
        redirectTo: 'acerca-de',
        pathMatch: 'full'
      },
      {
        path: 'acerca-de',
        title: 'Acerca de | HoopLink',
        loadComponent: () => import('./features/legal/pages/acerca-de/acerca-de.component').then(c => c.AcercaDeComponent),
      },
      {
        path: 'condiciones-uso',
        title: 'Condiciones de Uso | HoopLink',
        loadComponent: () => import('./features/legal/pages/condiciones-uso/condiciones-uso.component').then(c => c.CondicionesUsoComponent),
      },
      {
        path: 'politica-privacidad',
        title: 'Política de Privacidad | HoopLink',
        loadComponent: () => import('./features/legal/pages/politica-privacidad/politica-privacidad.component').then(c => c.PoliticaPrivacidadComponent),
      },
      {
        path: 'politica-cookies',
        title: 'Política de Cookies | HoopLink',
        loadComponent: () => import('./features/legal/pages/politica-cookies/politica-cookies.component').then(c => c.PoliticaCookiesComponent),
      },
      {
        path: 'politica-copyright',
        title: 'Política de Copyright | HoopLink',
        loadComponent: () => import('./features/legal/pages/politica-copyright/politica-copyright.component').then(c => c.PoliticaCopyrightComponent),
      },
      {
        path: 'politica-marca',
        title: 'Política de Marca | HoopLink',
        loadComponent: () => import('./features/legal/pages/politica-marca/politica-marca.component').then(c => c.PoliticaMarcaComponent),
      },
    ]
  },
  {
    path: 'registro',
    title: 'Registro | HoopLink',
    loadComponent: () => import('./layouts/public-layout/public-portal-layout/public-portal-layout.component').then(r => r.PublicPortalLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'formulario-registro',
        pathMatch: 'full'
      },
      {
        path: 'formulario-registro',
        title: 'Formulario Registro | HoopLink',
        loadComponent: () => import('./features/registro/pages/formulario-registro/formulario-registro.component').then(f => f.FormularioRegistroComponent),
      },
      {
        path: 'valida-correo',
        title: 'Valida Correo | HoopLink',
        loadComponent: () => import('./features/registro/pages/valida-correo/valida-correo.component').then(v => v.ValidaCorreoComponent),
      }
    ]
  },
  {
    path: 'login',
    title: 'Login | HoopLink',
    loadComponent: () => import('./layouts/public-layout/public-portal-layout/public-portal-layout.component').then(p => p.PublicPortalLayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/login/pages/login-page/login-page.component').then(l => l.LoginPageComponent)
      }
    ],
  },
  {
    canLoad: [authGuard],
    canActivate: [authGuard],
    path: 'desktop',
    title: 'Desktop | HoopLink',
    loadComponent: () => import('./layouts/authenticated-layout/authenticated-layout.component').then(d=> d.AuthenticatedLayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/desktop/desktop.component').then(l => l.DesktopComponent)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/portal',
    pathMatch: 'full',
  },
  {
    path: '**',
    title: '404 | HoopLink',
    loadComponent: () => import('./features/not-found/pages/not-found/not-found.component').then(n => n.NotFoundComponent),
  }
];
