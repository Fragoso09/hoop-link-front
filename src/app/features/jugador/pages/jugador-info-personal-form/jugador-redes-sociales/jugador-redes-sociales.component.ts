import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormularioUtilsService } from '../../../../../shared/utils/form/formulario-utils.service';
import { CommonModule } from '@angular/common';

import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonComponent } from "../../../../../shared/components/skeleton/skeleton.component";

@Component({
  selector: 'app-jugador-redes-sociales',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabel,
    InputTextModule,
    SkeletonComponent
],
  templateUrl: './jugador-redes-sociales.component.html',
  styleUrl: './jugador-redes-sociales.component.scss'
})
export class JugadorRedesSocialesComponent implements OnInit {
//#region Propiedades
  @Input({required: true}) form!: FormGroup;
  @Input({required: true}) cargandoData: boolean = true;
//#endregion

ngOnInit(): void {
  console.log(this.form);
}

//#region Constructor
  constructor(
    private readonly _formularioUtils: FormularioUtilsService,
  ) { }
//#endregion

//#region Generales
  public esValido(campo: string):boolean| null {
    return this._formularioUtils.esCampoValido(this.form, campo);
  }

  public esOpcionalValido(campo: string):boolean| null {
    return this._formularioUtils.esCampoOpcionalValido(this.form, campo);
  }

  public getErrores(campo: string, nombreMostrar:string):string | null {
    const errores = this._formularioUtils.getCampoError(this.form, campo, nombreMostrar);
    return errores;
  }
//#endregion


}
