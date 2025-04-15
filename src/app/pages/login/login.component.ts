import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { UsuarioService } from '../../core/services/usuario/usuario.service';
import { HeaderComponent } from "../../shared/components/pages/header/header.component";
import { FooterComponent } from "../../shared/components/pages/footer/footer.component";
import { ModalTokenValidoComponent } from "./modal-token-valido/modal-token-valido.component";
import { GlobalfunctionsService } from '../../core/services/global-functions/global-functions.service';
import { correoElectronicoValidator } from '../../core/utils';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent, FooterComponent, ModalTokenValidoComponent,
    CardModule, ButtonModule, InputTextModule,
          FormsModule, FloatLabel, CommonModule, ReactiveFormsModule, PasswordModule, DividerModule,
          RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
//#region Variables publicas
  public esVisibleDialog:boolean = false;
  public formulario: FormGroup;
//#endregion Variables publicas

//#region Constructor
  constructor(
    private readonly usuarioService:UsuarioService, private fb: FormBuilder, private readonly globalFunctionsService:GlobalfunctionsService,
     private readonly router:Router
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

  }

  public esValido(campo: string):boolean| null {
    return this.globalFunctionsService.esCampoValido(this.formulario, campo);
  }

  public getErrores(campo: string, nombreMostrar:string):string | null {
    const errores = this.globalFunctionsService.getCampoError(this.formulario, campo, nombreMostrar);
    return errores;

  }

  public registrarme():void {
    this.router.navigateByUrl('/registro');
  }

//#endregion Metodos

}
