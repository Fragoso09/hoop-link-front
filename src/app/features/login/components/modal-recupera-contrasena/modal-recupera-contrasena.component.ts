import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
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
  styleUrl: './modal-recupera-contrasena.component.scss'
})
export class ModalRecuperaContrasenaComponent implements OnDestroy {

//#region Variables publicas
  @Input() esVisibleRecuperaContrasenaDialog!: boolean;
  @Output() esVisibleRecuperaContrasenaDialogChange = new EventEmitter<boolean>();
  public formulario: FormGroup;
//#endregion Variables publicas

//#region Constructor
  constructor(
    private readonly usuarioService:UsuarioService, private fb: FormBuilder, private readonly _formularioUtils:FormularioUtilsService,
    private readonly router:Router, private readonly toastService: ToastService, private readonly blockUserIService:BlockUserIService,
  ) {
    this.formulario = this.fb.group({
      correo: new FormControl('', {
        validators: [Validators.required, correoElectronicoValidator()]
      })
    });

  }
  //#endregion Constructor

  //#region Metodos Ng
  ngOnDestroy(): void {
    this.esVisibleRecuperaContrasenaDialogChange.emit(false);
    this.resetForm();
  }

//#endregion

//#region Metodos
  public enviar():void {
    if(this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    } else if (this.formulario.valid) {
      this._formularioUtils.aplicaTrim(this.formulario);
      const registro = this.formulario.value as IRecuperaContrasena;
      this.blockUserIService.show();
      this.usuarioService.recuperaContrasena(registro).subscribe({
        next: (response:IResponse<any>) => {
          this.toastService.showMessage('success', 'Genial 📩', 'Correo enviado.', 5000);
          this.toastService.showMessage('info', 'Revisa tu correo 📩', response.mensaje, 10000);
          this.formulario.reset();
          this.blockUserIService.hide();
          this.esVisibleRecuperaContrasenaDialogChange.emit(false);
        },
        error: (error) => {
          this.toastService.showMessage('error', 'Error', error.error.message);
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
  }

//#endregion Metodos

}
