import { Routes } from '@angular/router';
import { PortalComponent } from './pages/portal/portal.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AcercaDeComponent } from './pages/legal/acerca-de/acerca-de.component';
import { LegalComponent } from './pages/legal/legal.component';

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
