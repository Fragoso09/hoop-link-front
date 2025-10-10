import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { LoggerService } from '../../../core/services/logger/logger.service';
import { LogLevel } from '../../../core/enums';

@Component({
  selector: 'app-cinta-horizontal',
  imports: [],
  templateUrl: './cinta-horizontal.component.html',
  styleUrl: './cinta-horizontal.component.css'
})
export class CintaHorizontalComponent implements OnInit, OnDestroy {
//#region Propiedades
  @Input() mensaje: string = 'gomu gomu no pistol';

  private readonly _contextLog = 'BotonVolverComponent';
//#endregion

//#region Constructor
  constructor(
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

}
