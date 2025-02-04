import { Component } from '@angular/core';

import { removeClass } from '../../../core/utils/ui/design.util';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [],
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.scss'
})
export class PoliticaPrivacidadComponent {

  public sections = [
    { id: 'pol1', title: 'Responsable del Tratamiento de Datos' },
    { id: 'pol2', title: 'Datos Personales que Recopilamos' },
    { id: 'pol3', title: 'Finalidades del Tratamiento' },
    { id: 'pol4', title: 'Transferencia de Datos' },
    { id: 'pol5', title: 'Derechos ARCO' },
    { id: 'pol6', title: 'Uso de Cookies y Tecnologías Similares' },
    { id: 'pol7', title: 'Seguridad de los Datos' },
    { id: 'pol8', title: 'Cambios a la Política de Privacidad' },
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
