import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CintaHorizontalComponent } from "../../../../shared/components/cinta-horizontal/cinta-horizontal.component";

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../core/enums';

@Component({
  selector: 'app-jugador-dashboard',
  imports: [CintaHorizontalComponent],
  templateUrl: './jugador-dashboard.component.html',
  styleUrl: './jugador-dashboard.component.css'
})
export class JugadorDashboardComponent implements OnInit, OnDestroy {
//#region  Propiedades
  public mensaje:string = 'Your information. Your recruitment. Your future. Taking charge of your recruitment starts by claiming your Player Profile.';

  private readonly _contextLog = 'JugadorDashboardComponent';
//#endregion

//#region Constructor
  constructor(private readonly _router: Router, private readonly _logger: LoggerService) { }
//#endregion

//#region Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, `Componente inicializado.`);
  }
  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, `Componente destruido.`);
  }
//#endregion

//#region Generales
  onCambiaCard(id: string): void {
    this._logger.log(LogLevel.Info, `${this._contextLog} >> onCambiaCard`, `Evento de selección de card detectado`, {id});
    switch (id) {
      case 'inf-perso':
        this._logger.log(
          LogLevel.Warn,
          `${this._contextLog} >> onCambiaCard`,
          `Redirigiendo a informacion-personal.`
        );
        this._router.navigate(['/desktop/informacion-personal']);
        break;

      default:
        break;
    }
  }
//#endregion

}
