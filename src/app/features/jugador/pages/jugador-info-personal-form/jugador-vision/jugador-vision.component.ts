import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormularioUtilsService } from '../../../../../shared/utils/form/formulario-utils.service';

import { FloatLabel } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { SkeletonComponent } from "../../../../../shared/components/skeleton/skeleton.component";

import { LoggerService } from '../../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../../core/enums';

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
  styleUrl: './jugador-vision.component.css'
})
export class JugadorVisionComponent implements OnInit, OnDestroy {
//#region Propiedades
  @Input({required: true}) form!: FormGroup;
  @Input({required: true}) cargandoData: boolean = true;

  private readonly _contextLog = 'JugadorVideosComponent';
//#endregion

//#region Constructor
  constructor(
    private readonly _formularioUtils: FormularioUtilsService, private readonly _logger: LoggerService
  ) { }
//#endregion

//#region Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Componente inicializado.');
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }
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
