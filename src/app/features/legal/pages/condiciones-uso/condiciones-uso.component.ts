import { Component } from '@angular/core';

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../core/enums';

@Component({
  selector: 'app-condiciones-uso',
  standalone: true,
  imports: [],
  templateUrl: './condiciones-uso.component.html',
  styleUrl: './condiciones-uso.component.css'
})
export class CondicionesUsoComponent {

//#region Propiedades
  public sections = [
    { id: 'pol1', title: 'Aceptación de los Términos' },
    { id: 'pol2', title: 'Registro y Cuenta de Usuario' },
    { id: 'pol3', title: 'Usuarios Menores de Edad' },
    { id: 'pol4', title: 'Uso Permitido de la Plataforma' },
    { id: 'pol5', title: 'Contenido Generado por Usuarios' },
    { id: 'pol6', title: 'Privacidad y Protección de Datos' },
    { id: 'pol7', title: 'Responsabilidad de HoopLink' },
    { id: 'pol8', title: 'Suspensión y Terminación de Cuentas' },
    { id: 'pol9', title: 'Modificaciones a los Términos y Condiciones' },
    { id: 'pol10', title: 'Contacto' },
    { id: 'pol11', title: 'Ley Aplicable y Jurisdicción' },
  ];

  private readonly _contextLog = 'CondicionesUsoComponent';
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
    this.removeClass();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      element?.classList.add('sectionLegalClick');
    }
  }

  private removeClass() {
    const pasados = document.getElementsByClassName('sectionLegalClick');
    if (pasados.length > 0) {
      for (let index = 0; index < pasados.length; index++) {
        pasados[index].classList.remove('sectionLegalClick');
      }
    }
  }
//#endregion
}
