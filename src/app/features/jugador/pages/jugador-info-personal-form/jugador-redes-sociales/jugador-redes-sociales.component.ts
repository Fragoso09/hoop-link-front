import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormularioUtilsService } from '../../../../../shared/utils/form/formulario-utils.service';
import { CommonModule } from '@angular/common';

import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonComponent } from "../../../../../shared/components/skeleton/skeleton.component";

import { LoggerService } from '../../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../../core/enums';

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
  styleUrl: './jugador-redes-sociales.component.css'
})
export class JugadorRedesSocialesComponent implements OnInit, OnDestroy {

//#region Propiedades
  @Input({required: true}) form!: FormGroup;
  @Input({required: true}) cargandoData: boolean = true;

  private readonly _contextLog = 'JugadorRedesSocialesComponent';
//#endregion

//#region Constructor
  constructor(
    private readonly _formularioUtils: FormularioUtilsService,
    private readonly _logger: LoggerService,
  ) { }
//#endregion

//#region Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Info, `${this._contextLog} >> ngOnInit`, 'Inicializando componente.');
    console.log(this.form);
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Info, `${this._contextLog} >> ngOnDestroy`, 'Destruyendo componente.');
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
