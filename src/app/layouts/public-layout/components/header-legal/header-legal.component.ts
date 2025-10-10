import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { ImageModule } from 'primeng/image';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { IResizeImg } from '../../../../shared/interfaces/ui/ui.interface';
import { redibujaImg } from '../../../../shared/utils/ui/responsive.util';

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../core/enums';

@Component({
  selector: 'app-header-legal',
  standalone: true,
  imports: [RouterModule, ImageModule],
  templateUrl: './header-legal.component.html',
  styleUrl: './header-legal.component.css'
})
export class HeaderLegalComponent implements OnInit, OnDestroy {

//#region Propiedades
  public title:string = '';
  public widthImg:string = "500";
  private _imgWidht:IResizeImg = {
    limSuperior:550,
    limInferior:350,
    valSuperior:250,
    valInferior:500,
  };

  private readonly _contextLog = 'HeaderLegalComponent';
//#endregion

//#region Constructor
  constructor(private router: Router, private readonly _logger: LoggerService) { }
//#endregion

//#region Ng
  ngOnInit() {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, `Componente inicializado.`);

    this.widthImg = redibujaImg(this._imgWidht, 1);
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }
//#endregion

//#region Generales
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthImg = redibujaImg(this._imgWidht, 1);
  }
//#endregion
}
