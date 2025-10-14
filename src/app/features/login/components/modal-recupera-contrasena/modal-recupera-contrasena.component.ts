import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { Dialog, DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { UsuarioService } from '../../../../core/services/usuario/usuario.service';
import { Router } from '@angular/router';
import { FormularioUtilsService } from '../../../../shared/utils/form/formulario-utils.service';
import { correoElectronicoValidator } from '../../../../../app/shared/validators/';
import { IRecuperaContrasena } from '../../../../shared/interfaces/usuario/registro.interface';
import { IResponse } from '../../../../core/interfaces/response/response.interface';
import { BlockUserIService } from '../../../../core/services/blockUI/block-user-i.service';
import { ToastService } from '../../../../core/services/messages/toast.service';
import { CommonMessages, SeverityMessageType } from '../../../../core/enums';

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../core/enums';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal-recupera-contrasena',
  standalone: true,
  imports: [
    Dialog,
    DialogModule,
    CardModule, ButtonModule, InputTextModule,
    FormsModule, FloatLabel, CommonModule, ReactiveFormsModule,
  ],
  templateUrl: './modal-recupera-contrasena.component.html',
  styleUrl: './modal-recupera-contrasena.component.css'
})
export class ModalRecuperaContrasenaComponent implements OnInit, OnDestroy {

//#region Propiedades
  @Input() esVisibleRecuperaContrasenaDialog!: boolean;
  @Output() esVisibleRecuperaContrasenaDialogChange = new EventEmitter<boolean>();
  public formulario: FormGroup;

  private readonly _contextLog = 'ModalRecuperaContrasenaComponent';
  private _destroy$ = new Subject<void>();
//#endregion

//#region Constructor
  constructor(
    private readonly usuarioService:UsuarioService, private fb: FormBuilder,
    private readonly _formularioUtils:FormularioUtilsService, private readonly router:Router,
    private readonly toastService: ToastService, private readonly blockUserIService:BlockUserIService,
    private readonly _logger: LoggerService
  ) {
    this.formulario = this.fb.group({
      correo: new FormControl('', {
        validators: [Validators.required, correoElectronicoValidator()]
      })
    });

  }
//#endregion

//#region Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Componente inicializado.');
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this.resetForm();
    this.esVisibleRecuperaContrasenaDialogChange.emit(false);
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }

//#endregion

//#region Generales
  public enviar():void {
    if(this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this._logger.log(LogLevel.Warn, `${this._contextLog} >> enviar`, 'Formulario inválido.', this.formulario.value);
      return;
    } else if (this.formulario.valid) {
      this._formularioUtils.aplicaTrim(this.formulario);
      const registro = this.formulario.value as IRecuperaContrasena;
      this.blockUserIService.show();
      this.usuarioService.recuperaContrasena(registro)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response:IResponse<any>) => {
          this._logger.log(LogLevel.Info, `${this._contextLog} >> enviar`, 'Correo de recuperación enviado.', response);
          this.toastService.showMessage(SeverityMessageType.Success, 'Genial 📩', 'Correo enviado.', undefined, 5000);
          this.toastService.showMessage(SeverityMessageType.Info, 'Revisa tu correo 📩', response.mensaje, undefined, 10000);
          this.formulario.reset();
          this.blockUserIService.hide();
          this.esVisibleRecuperaContrasenaDialogChange.emit(false);
        },
        error: (error) => {
          this._logger.log(LogLevel.Error, `${this._contextLog} >> enviar`, 'Error al enviar correo.', error);
          this.toastService.showMessage(SeverityMessageType.Error, CommonMessages.Error, error.error.message);
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

  private resetForm() {
    this.formulario.reset();
  }

  onHide() {
    this.esVisibleRecuperaContrasenaDialogChange.emit(false);
    this.resetForm();
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> onHide`, 'Dialog cerrado y formulario reseteado.');
  }

//#endregion

}
