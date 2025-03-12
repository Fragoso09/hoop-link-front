import { Component } from '@angular/core';
import { removeClass } from '../../../core/utils';

@Component({
  selector: 'app-politica-cookies',
  standalone: true,
  imports: [],
  templateUrl: './politica-cookies.component.html',
  styleUrl: './politica-cookies.component.scss'
})
export class PoliticaCookiesComponent {
  public sections = [
    { id: 'pol1', title: '¿Qué son las cookies?' },
    { id: 'pol2', title: 'Tipos de cookies que utilizamos' },
    { id: 'pol3', title: '¿Cómo gestionar las cookies?' },
    { id: 'pol4', title: 'Cookies de terceros' },
    { id: 'pol5', title: 'Cambios en esta Política de Cookies' },
    { id: 'pol6', title: 'Contacto' }
  ];

  public moveToSection(id:string, event: Event) {
    event.preventDefault();
    removeClass('sectionClick');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      element?.classList.add('sectionClick');
    }
  }
}
