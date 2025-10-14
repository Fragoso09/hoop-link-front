import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges  } from '@angular/core';

import { LoggerService } from '../../services/logger/logger.service';

import { TipoSvg } from '../../enums';
import { LogLevel } from '../../enums';

@Component({
  selector: 'app-icons-svg',
  standalone: true,
  imports: [],
  templateUrl: './icons-svg.component.html',
  styleUrl: './icons-svg.component.css'
})
export class IconsSvgComponent implements OnInit, OnChanges, OnDestroy {
//#region  Propiedades
  @Input({required: true}) tipo:TipoSvg = TipoSvg.default;
  @Input({required:true}) width!:string;
  @Input({required:true}) height!:string;
  @Input({required:true}) class!:string;

  private readonly _contextLog = 'IconsSvgComponent';

  public tipos = TipoSvg;
  public style:string = '';
//#endregion

//#region Constructor
 constructor(private _logger: LoggerService) {}
//#endregion

//#region Metodos Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Inicializando componente');

    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Inputs recibidos', {
      tipo: this.tipo,
      width: this.width,
      height: this.height,
      class: this.class
    });


    this.style += `width: ${this.width}; height: ${this.height};`;

    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Estilo aplicado', this.style);
  }

   ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const change = changes[propName];
      this._logger.log(
        LogLevel.Debug,
        `${this._contextLog} >> ngOnChanges`,
        `Input "${propName}" cambió`,
        {
          previous: change.previousValue,
          current: change.currentValue,
          firstChange: change.firstChange
        }
      );
    }
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido, liberando recursos');
  }
//#endregion

}
