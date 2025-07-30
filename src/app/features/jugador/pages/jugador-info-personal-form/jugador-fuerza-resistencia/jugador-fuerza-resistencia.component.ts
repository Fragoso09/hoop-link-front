import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormularioUtilsService } from '../../../../../shared/utils/form/formulario-utils.service';

import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { SkeletonComponent } from "../../../../../shared/components/skeleton/skeleton.component";

@Component({
  selector: 'app-jugador-fuerza-resistencia',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    CommonModule,
    InputTextModule,
    InputNumber,
    SkeletonComponent
],
  templateUrl: './jugador-fuerza-resistencia.component.html',
  styleUrl: './jugador-fuerza-resistencia.component.scss'
})
export class JugadorFuerzaResistenciaComponent {

//#region Propiedades
  @Input({required: true}) form!: FormGroup;
  @Input({required: true}) cargandoData: boolean = true;
//#endregion

//#region Constructor
  constructor(
    private readonly _formularioUtils: FormularioUtilsService
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
