import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormularioUtilsService } from '../../../../../shared/utils/form/formulario-utils.service';

import { FloatLabel } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { SkeletonComponent } from "../../../../../shared/components/skeleton/skeleton.component";

@Component({
  selector: 'app-jugador-vision',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    CommonModule,
    TextareaModule,
    SkeletonComponent
],
  templateUrl: './jugador-vision.component.html',
  styleUrl: './jugador-vision.component.scss'
})
export class JugadorVisionComponent {
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
