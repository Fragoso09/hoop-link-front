import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Dialog, DialogModule } from 'primeng/dialog';

import { ToastService } from '../../../../core/services/messages/toast.service';
import { UsuarioService } from '../../../../core/services/usuario/usuario.service';
import { IResponse } from '../../../../core/interfaces/response/response.interface';
import { IResponseError } from '../../../../core/interfaces/error/error.interface';
import { SeverityMessageType } from '../../../../core/enums';

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../core/enums';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-valida-correo',
  standalone: true,
  imports: [
    Dialog,
    DialogModule,
  ],
  templateUrl: './valida-correo.component.html',
  styleUrl: './valida-correo.component.css'
})
export class ValidaCorreoComponent implements OnInit, AfterViewInit, OnDestroy {

//#region Propiedades
  private token!:string;
  public muestraLoader:boolean = true;
  public error:string = '';

  private readonly _contextLog = 'ValidaCorreoComponent';
  private _destroy$ = new Subject<void>();
//#endregion Propiedades

//#region Constructor
  constructor(
    private routeActive: ActivatedRoute,
    private readonly usuarioService:UsuarioService,
    private readonly toastService: ToastService,
    private readonly router:Router,
    private readonly _logger: LoggerService,
  ) { }
//#endregion

//#region Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Componente inicializado.');
    this.routeActive.queryParamMap
    .pipe(takeUntil(this._destroy$))
    .subscribe(params => {
      this.token = params.get('token') ?? '';
    });
  }

  ngAfterViewInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngAfterViewInit`, 'Componente despues de inicializado.');
    this.validaToken();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }
//#endregion

//#region Generales
  private validaToken() {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> validaToken`, 'Validando token.');

    this.usuarioService.validaToken(this.token)
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: (response:IResponse<string>) => {
        this._logger.log(LogLevel.Debug, `${this._contextLog} >> validaToken`, 'Toekn válido.', response);
        this.toastService.showMessage(SeverityMessageType.Success, 'Excelente', response.mensaje, undefined, 5000);
        this.usuarioService.usuarioTokenValidado = true;
        setTimeout(() => this.router.navigateByUrl('/login'), 500);
      },
      error: (error:IResponseError) => {
        this._logger.log(LogLevel.Error, `${this._contextLog} >> validaToken`, 'Error al validar token', error);
        this.muestraLoader = false;
        this.error = error.error.message;
      }
    });
  }
//#endregion

}
