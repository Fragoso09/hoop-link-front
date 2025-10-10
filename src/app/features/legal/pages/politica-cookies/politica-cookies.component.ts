import { Component } from '@angular/core';
import { removeClass } from '../../../../shared/utils/ui/design.util';

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../core/enums';

@Component({
  selector: 'app-politica-cookies',
  standalone: true,
  imports: [],
  templateUrl: './politica-cookies.component.html',
  styleUrl: './politica-cookies.component.css'
})
export class PoliticaCookiesComponent {

//#region Propiedades
  public sections = [
    { id: 'pol1', title: '¿Qué son las cookies?' },
    { id: 'pol2', title: 'Tipos de cookies que utilizamos' },
    { id: 'pol3', title: '¿Cómo gestionar las cookies?' },
    { id: 'pol4', title: 'Cookies de terceros' },
    { id: 'pol5', title: 'Cambios en esta Política de Cookies' },
    { id: 'pol6', title: 'Contacto' }
  ];

  private readonly _contextLog = 'PoliticaCookiesComponent';
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
