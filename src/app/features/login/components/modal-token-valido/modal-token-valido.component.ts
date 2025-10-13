import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Dialog, DialogModule } from 'primeng/dialog';

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../core/enums';

@Component({
  selector: 'app-modal-token-valido',
  standalone: true,
  imports: [
    Dialog,
    DialogModule,
  ],
  templateUrl: './modal-token-valido.component.html',
  styleUrl: './modal-token-valido.component.css'
})
export class ModalTokenValidoComponent implements OnInit, OnDestroy {

//#region Propiedades
  @Input() esVisibleDialog!: boolean;
  @Output() esVisibleDialogChange = new EventEmitter<boolean>();

  private readonly _contextLog = 'ModalTokenValidoComponent';
 //#endregion

 //#region Constructor
  constructor(
    private readonly _logger: LoggerService
  ) { }
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
  onHide() {
    this.esVisibleDialogChange.emit(false);
  }
//#endregion
}
