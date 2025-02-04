import { Routes } from '@angular/router';
import { PortalComponent } from './pages/portal/portal.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AcercaDeComponent } from './pages/legal/acerca-de/acerca-de.component';
import { LegalComponent } from './pages/legal/legal.component';
import { PoliticaPrivacidadComponent } from './pages/legal/politica-privacidad/politica-privacidad.component';
import { PoliticaCookiesComponent } from './pages/legal/politica-cookies/politica-cookies.component';
import { CondicionesUsoComponent } from './pages/legal/condiciones-uso/condiciones-uso.component';

export const routes: Routes = [
  {
    path: 'portal',
    title: 'Portal | HoopLink',
    loadComponent: () => import('./pages/portal/portal.component').then(c => PortalComponent),
  },
  {
    path: 'legal',
    title: 'Legal | HoopLink',
    loadComponent: () => import('./pages/legal/legal.component').then(c => LegalComponent),
    children: [
      {
        path: 'acerca-de',
        title: 'Acerca de | HoopLink',
        loadComponent: () => import('./pages/legal/acerca-de/acerca-de.component').then(c => AcercaDeComponent),
      },
      {
        path: 'condiciones-uso',
        title: 'Condiciones de uso | HoopLink',
        loadComponent: () => import('./pages/legal/condiciones-uso/condiciones-uso.component').then(c => CondicionesUsoComponent),
      },
      {
        path: 'politica-privacidad',
        title: 'Política de Privacidad | HoopLink',
        loadComponent: () => import('./pages/legal/politica-privacidad/politica-privacidad.component').then(c => PoliticaPrivacidadComponent),
      },
      {
        path: 'politica-cookies',
        title: 'Política de Cookies | HoopLink',
        loadComponent: () => import('./pages/legal/politica-cookies/politica-cookies.component').then(c => PoliticaCookiesComponent),
      },
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
    loadComponent: () => import('./pages/not-found/not-found.component').then(c => NotFoundComponent),
  }
];
