import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { removeClass } from '../../../../shared/utils/ui/design.util';

import { ColorPicker } from 'primeng/colorpicker';

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../core/enums';

@Component({
  selector: 'app-politica-marca',
  standalone: true,
  imports: [ColorPicker, FormsModule],
  templateUrl: './politica-marca.component.html',
  styleUrl: './politica-marca.component.css'
})
export class PoliticaMarcaComponent {

//#region Propiedades
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

  private readonly _contextLog = 'PoliticaMarcaComponent';

  public naranjaIntenso = '#f14e23';
  public naranja = '#f47621';
  public azulProdunfo = '#0c2251';
  public azulMarino = '#003e61';
  public azulVerde = '#004e6d';
  public azulClaro = '#deebf9';

//#endregion

//#region Constructor
  constructor(private readonly _logger: LoggerService) { }
//#endregion

//#region Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Componente inicializado.');
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }
//#endregion

//#region Generales
  public moveToSection(id:string, event: Event) {
    event.preventDefault();
    removeClass('sectionLegalClick');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      element?.classList.add('sectionLegalClick');
    }
  }
//#endregion
}
