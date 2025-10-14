import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../core/enums';

@Component({
  selector: 'app-terminos-condiciones',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './terminos-condiciones.component.html',
  styleUrl: './terminos-condiciones.component.css'
})
export class TerminosCondicionesComponent implements OnInit, OnDestroy {

  //#region Propiedades
  public sections = [
    { route: '/legal/acerca-de', title: 'Acerca de' },
    { route: '/legal/condiciones-uso', title: 'Condiciones de uso' },
    { route: '/legal/politica-privacidad', title: 'Política de privacidad' },
    { route: '/legal/politica-cookies', title: 'Política de cookies' },
    { route: '/legal/politica-copyright', title: 'Política de copyright' },
    { route: '/legal/politica-marca', title: 'Política de marca' },
  ];

  private readonly _contextLog = 'TerminosCondicionesComponent';
//#endregion Propiedades

  //#region Constructor
  constructor(
    private activatedRoute: ActivatedRoute, private router: Router,
    private readonly _logger: LoggerService
  ) { }
  //#endregion Constructor

//#region Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Componente inicializado.');
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }
//#endregion

}
