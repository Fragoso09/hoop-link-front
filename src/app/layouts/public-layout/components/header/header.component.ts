import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { redibujaImg } from '../../../../shared/utils/ui/responsive.util';
import { IResizeImg } from '../../../../shared/interfaces/ui/ui.interface';
import { Router, RouterModule } from '@angular/router';

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../core/enums';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ImageModule, ButtonModule, Menubar, BadgeModule, AvatarModule, InputTextModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

//#region Propiedades
  public items: MenuItem[] | undefined;
  public widthImg:string = "350";
  private _imgWidht:IResizeImg = {
    limSuperior:550,
    limInferior:350,
    valSuperior:250,
    valInferior:350,
  };

  private readonly _contextLog = 'HeaderComponent';
//#endregion

//#region Constructor
  constructor(private router: Router, private readonly _logger: LoggerService) { }
//#endregion

//#region Ng
  ngOnInit() {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, `Componente inicializado.`);

    this.widthImg = redibujaImg(this._imgWidht, 1);

    this.items = [
      {
        label: 'Jugadores',
        icon: 'pi pi-trophy'
      },
      {
        label: 'Escuelas',
        icon: 'pi pi-building-columns'
      },
      {
        label: 'Eventos',
        icon: 'pi pi-calendar-plus'
      },
      {
        label: 'Patrocinadores',
        icon: 'pi pi-star'
      },
      {
        label: 'Empresas',
        icon: 'pi pi-briefcase'
      }
    ];
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

  public redirectHome():void {
    this._logger.log(LogLevel.Info, `${this._contextLog} >> redirectHome`, 'Usuario redirigido al portal.');
    this.router.navigateByUrl('/portal');
  }

  public goLogin() {
    this._logger.log(LogLevel.Info, `${this._contextLog} >> goLogin`, 'Usuario redirigido al login.');
    this.router.navigateByUrl('/login')
  }
//#endregion
}
