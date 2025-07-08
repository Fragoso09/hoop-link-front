import { Component, OnInit } from '@angular/core';
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
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
//#region Variables publicas
  public esVisibleDialog:boolean = false;
  public formulario: FormGroup;
  public esVisibleRecuperaContrasenaDialog:boolean = false;
//#endregion Variables publicas

//#region Constructor
  constructor(
    private readonly usuarioService:UsuarioService, private fb: FormBuilder, private readonly _formularioUtils:FormularioUtilsService,
    private readonly router:Router, private readonly toastService: ToastService, private readonly blockUserIService:BlockUserIService,
    private readonly authService: AuthService
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

//#region Metodos Ng
  ngOnInit(): void {
    this.inicializa();
  }
//#endregion

//#region Metodos
  private inicializa() {
    this.muestraEsTokenValido();
  }

  private muestraEsTokenValido() {
    this.esVisibleDialog = this.usuarioService.usuarioTokenValidado;
  }

  public enviar():void {
    if(this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    } else if (this.formulario.valid) {
      this._formularioUtils.aplicaTrim(this.formulario);
      const credenciales = this.formulario.value as ILogin;
      this.blockUserIService.show();
      this.authService.login(credenciales).subscribe({
        next: (response:IResponse<any>) => {
          this.formulario.reset();
          this.blockUserIService.hide();
          this.router.navigateByUrl('/desktop');
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

  public registrarme():void {
    this.router.navigateByUrl('/registro');
  }

  public muestraRecuperaContrasena() {
    this.esVisibleRecuperaContrasenaDialog = true;
  }

//#endregion Metodos

}
