import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { UsuarioService } from '../../../../core/services/usuario/usuario.service';
import { ModalTokenValidoComponent } from "../../components/modal-token-valido/modal-token-valido.component";
import { FormularioUtilsService } from '../../../../shared/utils/form/formulario-utils.service';
import { correoElectronicoValidator } from '../../../../../app/shared/validators';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ModalRecuperaContrasenaComponent } from "../../components/modal-recupera-contrasena/modal-recupera-contrasena.component";
import { IRegistro } from '../../../../shared/interfaces/usuario/registro.interface';
import { IResponse } from '../../../../core/interfaces/response/response.interface';
import { BlockUserIService } from '../../../../core/services/blockUI/block-user-i.service';
import { ToastService } from '../../../../core/services/messages/toast.service';
import { ILogin } from '../../../../core/auth/interfaces/login.interface';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { IAuthUser } from '../../../../core/auth/interfaces/auth-user.interface';
import { firstValueFrom, filter, take, switchMap, Subject, takeUntil } from 'rxjs';
import { CommonMessages, SeverityMessageType } from '../../../../core/enums';

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../core/enums';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ModalTokenValidoComponent,
    CardModule, ButtonModule, InputTextModule,
    FormsModule, FloatLabel, CommonModule, ReactiveFormsModule, PasswordModule, DividerModule,
    RouterModule,
    ModalRecuperaContrasenaComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit, OnDestroy {
//#region Propiedades
  public esVisibleDialog:boolean = false;
  public formulario: FormGroup;
  public esVisibleRecuperaContrasenaDialog:boolean = false;

  private readonly _contextLog = 'LoginPageComponent';
  private _destroy$ = new Subject<void>();
//#endregion


//#region Constructor
  constructor(
    private readonly usuarioService:UsuarioService, private fb: FormBuilder,
    private readonly _formularioUtils:FormularioUtilsService, private readonly router:Router,
    private readonly toastService: ToastService, private readonly blockUserIService:BlockUserIService,
    private readonly authService: AuthService, private readonly _logger: LoggerService,
  ) {
    this.formulario = this.fb.group({
      correo: new FormControl('', {
        validators: [Validators.required, correoElectronicoValidator()]
      }),
      contrasena: new FormControl('', {
        validators: [Validators.required]
      }),
    });

  }
//#endregion Constructor

//#region Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Componente inicializado.');
    this.inicializa();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }
//#endregion

//#region Generales
  private inicializa() {
    this.muestraEsTokenValido();
  }

  private muestraEsTokenValido() {
    this.esVisibleDialog = this.usuarioService.usuarioTokenValidado;
  }

  public async enviar(): Promise<void>  {
    if(this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this._logger.log(LogLevel.Warn, `${this._contextLog} >> enviar`, 'Formulario inválido.', this.formulario.value);
      return;
    } else if (this.formulario.valid) {
      this._formularioUtils.aplicaTrim(this.formulario);
      const credenciales = this.formulario.value as ILogin;
      this.blockUserIService.show();
      this.authService.login(credenciales)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
       next: () => {
          this._logger.log(LogLevel.Info, `${this._contextLog} >> enviar`, 'Login exitoso.');
          this.formulario.reset();
          this.router.navigateByUrl('/desktop');
        },
        error: (error) => {
          this._logger.log(LogLevel.Error, `${this._contextLog} >> enviar`, 'Error en login.', error);
          this.toastService.showMessage(SeverityMessageType.Error, CommonMessages.Error, error.error.message);
        },
        complete: () => {
          this.blockUserIService.hide();
        }
      });
    }
  }

  public esValido(campo: string):boolean| null {
    return this._formularioUtils.esCampoValido(this.formulario, campo);
  }

  public getErrores(campo: string, nombreMostrar:string):string | null {
    const errores = this._formularioUtils.getCampoError(this.formulario, campo, nombreMostrar);
    return errores;

  }

  public registrarme():void {
    this.router.navigateByUrl('/registro');
  }

  public muestraRecuperaContrasena() {
    this.esVisibleRecuperaContrasenaDialog = true;
  }

//#endregion Metodos

}
