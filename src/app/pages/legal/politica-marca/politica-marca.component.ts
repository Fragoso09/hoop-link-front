import { Component } from '@angular/core';
import { removeClass } from '../../../core/utils';

@Component({
  selector: 'app-politica-marca',
  standalone: true,
  imports: [],
  templateUrl: './politica-marca.component.html',
  styleUrl: './politica-marca.component.scss'
})
export class PoliticaMarcaComponent {
  public sections = [
    { id: 'pol1', title: 'Misión y Valores de la Marca' },
    { id: 'pol2', title: 'Logo y Su Uso Correcto' },
    { id: 'pol3', title: 'Paleta de Colores' },
    { id: 'pol4', title: 'Tipografía Oficial' },
    { id: 'pol5', title: 'Tono y Estilo de Comunicación' },
    { id: 'pol6', title: 'Usos Prohibidos' },
    { id: 'pol7', title: 'Aplicaciones de la Marca' },
    { id: 'pol8', title: 'Contacto y Autorizaciones' },
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
