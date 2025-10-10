import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { BlockUI, BlockUIModule } from 'primeng/blockui';

import { LoggerService } from '../../services/logger/logger.service';

import { LogLevel } from '../../enums';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [BlockUI, BlockUIModule],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.css'
})
export class OverlayComponent implements OnInit, OnDestroy {

//#region Propiedades
  private readonly _contextLog = 'OverlayComponent';

  blockedDocument: boolean = false;
  mensaje:string = ''
  progress = 0; // default 0
//#endregion

//#region Constructor
  constructor(private _cd: ChangeDetectorRef, private _logger: LoggerService) {}
//#endregion

//#region Metodos Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Componente inicializado');
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido');
  }
//#endregion

//#region Metodos Generales
  blockDocument(mensaje:string) {
    this.blockedDocument = true;
    this.mensaje = mensaje;
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> blockDocument`, 'Documento bloqueado', { mensaje });
  }

  unblockDocument() {
    this.blockedDocument = false;
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> unblockDocument`, 'Documento desbloqueado');
  }

  setProgress(value: number) {
    this.progress = value;
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> setProgress`, 'Progreso actualizado', { progress: value });
  }
//#region

}
