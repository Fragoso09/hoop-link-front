import { AfterViewInit, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { UsuarioService } from '../../core/services/usuario/usuario.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { IAuthUser } from '../../core/auth/interfaces/auth-user.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { LoggerService } from '../../core/services/logger/logger.service';
import { LogLevel } from '../../core/enums';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent implements OnInit, OnDestroy {

//#region Propiedades
  private readonly _contextLog = 'DesktopComponent';
//#endregion

//#region Constructor
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _logger: LoggerService
  ) {
    effect(() => {
      const user = this._authService.user();
      const checked = this._authService.authChecked();

      if (!checked) return;

      if (!user) {
        this._logger.log(
          LogLevel.Warn,
          `${this._contextLog} >> constructor`,
          'No hay usuario autenticado. Redirigiendo al login.'
        );

        this._router.navigate(['/login']);
        return;
      }

      this._logger.log(
        LogLevel.Info,
        `${this._contextLog} >> constructor`,
        `Usuario autenticado detectado`,
        { rol: user.rol, correo: user.correo }
      );

      switch (user.rol) {
        case 'jugador':
          this._logger.log(
            LogLevel.Info,
            `${this._contextLog} >> constructor`,
            'Redirigiendo al escritorio de jugador.'
          );

          this._router.navigate(['/desktop/jugador']);
          break;
        case 'admin':
          this._logger.log(
            LogLevel.Info,
            `${this._contextLog} >> constructor`,
            'Redirigiendo al escritorio de administrador.'
          );

          this._router.navigate(['/desktop/admin']);
          break;
        default:
          this._logger.log(
            LogLevel.Warn,
            `${this._contextLog} >> constructor`,
            `Rol desconocido: ${user.rol}. Redirigiendo a access-denied.`
          );

          this._router.navigate(['/access-denied']);
      }
    });
  }
//#endregion

//#region Metodos Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Componente inicializado.');
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }
//#endregion

}
