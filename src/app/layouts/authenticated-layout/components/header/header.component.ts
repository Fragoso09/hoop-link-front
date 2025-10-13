import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { Tooltip } from 'primeng/tooltip';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Router } from '@angular/router';

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../core/enums';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    Tooltip
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

//#region Propiedades
  private readonly _contextLog = 'HeaderComponent';
  private _destroy$ = new Subject<void>();
//#endregion

//#region Constructor
  constructor(private readonly _authService:AuthService, private router: Router, private readonly _logger: LoggerService) { }
//#endregion

//#region Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Componente inicializado.');
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }
//#endregion

//#region Generales
  logout(): void {
    this._logger.log(LogLevel.Info, `${this._contextLog} >> logout`, 'Intentando cerrar sesión...');

    this._authService.logout()
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: () => {
        this._logger.log(LogLevel.Info, `${this._contextLog} >> logout`, 'Sesión cerrada correctamente.');
        this.router.navigate(['/login']); // redirige a login
      },
      error: (error) => {
        // Manejar error si quieres
        this._logger.log(LogLevel.Error, `${this._contextLog} >> logout`, 'Error al cerrar sesión.', error);
      }
    })
  }
//#endregion
}
