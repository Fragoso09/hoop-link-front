import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { LoggerService } from '../../../core/services/logger/logger.service';
import { LogLevel } from '../../../core/enums';

@Component({
  selector: 'app-boton-volver',
  imports: [
    ButtonModule,
  ],
  templateUrl: './boton-volver.component.html',
  styleUrl: './boton-volver.component.css'
})
export class BotonVolverComponent implements OnInit, OnDestroy {

//#region Propiedades
  private readonly _contextLog = 'BotonVolverComponent';
//#endregion

//#region Constructor
  constructor(
    private readonly _location:Location, private readonly _router: Router,
    private readonly _logger: LoggerService
  ) { }
//#endregion

//#region Ng
  ngOnInit() {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, `Componente inicializado.`);
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }
//#endregion

//#region Generales
 volver(): void {
  if (window.history.length > 1) {
    this._logger.log(LogLevel.Info, `${this._contextLog} >> volver`, 'Volviendo a la vista anterior.');
    this._location.back();
  } else {
    this._logger.log(LogLevel.Info, `${this._contextLog} >> volver`, 'Sin historial, redirigiendo a /desktop.');
    this._router.navigate(['/desktop']); // ruta por defecto
  }
}
//#endregion

}
