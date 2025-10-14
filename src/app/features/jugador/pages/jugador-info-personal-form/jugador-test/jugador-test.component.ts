import { Component, OnDestroy, OnInit } from '@angular/core';

import { LoggerService } from '../../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../../core/enums';

@Component({
  selector: 'app-jugador-test',
  imports: [],
  templateUrl: './jugador-test.component.html',
  styleUrl: './jugador-test.component.css'
})
export class JugadorTestComponent implements OnInit, OnDestroy {

//#region Propiedades

  private readonly _contextLog = 'JugadorTestComponent';
//#endregion

//#region Constructor
  constructor(
    private readonly _logger: LoggerService,
  ) { }
//#endregion

//#region Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Info, `${this._contextLog} >> ngOnInit`, 'Inicializando componente.');
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Info, `${this._contextLog} >> ngOnDestroy`, 'Destruyendo componente.');
  }

//#endregion

}
