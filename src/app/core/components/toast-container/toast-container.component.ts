import { Component, OnDestroy, OnInit } from '@angular/core';

import { Toast } from 'primeng/toast';

import { LoggerService } from '../../services/logger/logger.service';
import { LogLevel } from '../../enums';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [
    Toast
  ],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css'
})
export class ToastContainerComponent implements OnInit, OnDestroy {

//#region Propiedades
  private readonly _contextLog = 'ToastContainerComponent';
//#endregion

//#region Constructor
  constructor(private _logger: LoggerService) {}
//#endregion

//#region Metodos Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Componente inicializado');
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido');
  }

//#endregion

}
