import { Component } from '@angular/core';
import { removeClass } from '../../../../shared/utils/ui/design.util';

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../core/enums';

@Component({
  selector: 'app-politica-copyright',
  standalone: true,
  imports: [],
  templateUrl: './politica-copyright.component.html',
  styleUrl: './politica-copyright.component.css'
})
export class PoliticaCopyrightComponent {

//#region Propiedades
  public sections = [
    { id: 'pol1', title: 'Propiedad Intelectual' },
    { id: 'pol2', title: 'Contenido Generado por Usuarios' },
    { id: 'pol3', title: 'Uso Permitido' },
    { id: 'pol4', title: 'Prohibiciones' },
    { id: 'pol5', title: 'Reclamos por Infracción de Copyright' },
    { id: 'pol6', title: 'Modificaciones a la Política de Copyright' },
    { id: 'pol7', title: 'Contacto' },
  ];

  private readonly _contextLog = 'PoliticaCopyrightComponent';
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
