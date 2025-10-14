import { Component, input, Input, OnDestroy, OnInit } from '@angular/core';

import { Skeleton } from 'primeng/skeleton';

import { LoggerService } from '../../../core/services/logger/logger.service';
import { LogLevel } from '../../../core/enums';

@Component({
  selector: 'app-skeleton',
  imports: [
    Skeleton
  ],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css'
})
export class SkeletonComponent implements OnInit, OnDestroy {
//#region Propiedades
  @Input() shape: 'circle' | 'rectangle' =  'rectangle';
  @Input() size: string = '';
  @Input() styleClass: string = '';
  @Input() height: string = '';
  @Input() width: string = '';

  private readonly _contextLog = 'SkeletonComponent';
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
