import { Component } from '@angular/core';
import { removeClass } from '../../../../shared/utils/ui/design.util';

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../core/enums';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [],
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.css'
})
export class PoliticaPrivacidadComponent {

//#region Propiedades
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

  private readonly _contextLog = 'PoliticaPrivacidadComponent';

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
