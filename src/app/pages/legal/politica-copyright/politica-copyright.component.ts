import { Component } from '@angular/core';
import { removeClass } from '../../../core/utils';

@Component({
  selector: 'app-politica-copyright',
  standalone: true,
  imports: [],
  templateUrl: './politica-copyright.component.html',
  styleUrl: './politica-copyright.component.scss'
})
export class PoliticaCopyrightComponent {
  public sections = [
    { id: 'pol1', title: 'Propiedad Intelectual' },
    { id: 'pol2', title: 'Contenido Generado por Usuarios' },
    { id: 'pol3', title: 'Uso Permitido' },
    { id: 'pol4', title: 'Prohibiciones' },
    { id: 'pol5', title: 'Reclamos por Infracción de Copyright' },
    { id: 'pol6', title: 'Modificaciones a la Política de Copyright' },
    { id: 'pol7', title: 'Contacto' },
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
