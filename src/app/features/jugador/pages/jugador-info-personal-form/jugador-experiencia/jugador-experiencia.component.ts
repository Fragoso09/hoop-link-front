import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButton } from 'primeng/togglebutton';

import { BlockUserIService } from '../../../../../core/services/blockUI/block-user-i.service';
import { ToastService } from '../../../../../core/services/messages/toast.service';
import { FormularioUtilsService } from '../../../../../shared/utils/form/formulario-utils.service';
import { ButtonModule } from 'primeng/button';

import { v4 as uuidv4 } from 'uuid'; // Asegúrate de instalar: npm install uuid

@Component({
  selector: 'app-jugador-experiencia',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    CommonModule,
    InputTextModule,
    InputNumber,
    DatePicker,
    ToggleButton,
    ButtonModule,
  ],
  templateUrl: './jugador-experiencia.component.html',
  styleUrl: './jugador-experiencia.component.scss'
})
export class JugadorExperienciaComponent {

//#region Propiedades
  @Input({required: true}) form!: FormGroup;
  public iconoSi: string = "pi pi-check";
//#endregion

//#region Constructor
  constructor(
    private readonly _formularioUtils: FormularioUtilsService, private readonly _blockUserIService:BlockUserIService,
    private readonly _toastService: ToastService, private readonly _fb: FormBuilder,
  ) { }
//#endregion

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

  get Equipo(): FormArray {
    return this.form.get('historialEquipos') as FormArray;
  }

  get Entrenadores(): FormArray {
    return this.form.get('historialEntrenadores') as FormArray;
  }

  get Logros(): FormArray {
    return this.form.get('logrosClave') as FormArray;
  }

  public esValidoEquipo(index: number, campo: string): boolean {
    const control = this.Equipo.at(index).get(campo);
    return control?.invalid && (control?.touched || control?.dirty) || false;
  }

  public getErroresEquipo(index: number, campo: string, nombreMostrar: string): string | null {
    const control = this.Equipo.at(index);
    return this._formularioUtils.getCampoError(control, campo, nombreMostrar);
  }

  public esValidoEntrenadores(index: number, campo: string): boolean {
    const control = this.Entrenadores.at(index).get(campo);
    return control?.invalid && (control?.touched || control?.dirty) || false;
  }

  public getErroresEntrenadores(index: number, campo: string, nombreMostrar: string): string | null {
    const control = this.Entrenadores.at(index);
    return this._formularioUtils.getCampoError(control, campo, nombreMostrar);
  }

  public esValidoLogros(index: number, campo: string): boolean {
    const control = this.Logros.at(index).get(campo);
    return control?.invalid && (control?.touched || control?.dirty) || false;
  }

  public getErroresLogros(index: number, campo: string, nombreMostrar: string): string | null {
    const control = this.Logros.at(index);
    return this._formularioUtils.getCampoError(control, campo, nombreMostrar);
  }

  private crearFormularioEquipos(): FormGroup {
    const grupo = this._fb.group({
      id: [uuidv4()],
      nombre: ['', Validators.required],
    });

    return grupo;
  }

  private crearFormularioEntrenadores(): FormGroup {
    const grupo = this._fb.group({
      id: [uuidv4()],
      nombre: ['', Validators.required],
    });

    return grupo;
  }

  private crearFormularioLogros(): FormGroup {
    const grupo = this._fb.group({
      id: [uuidv4()],
      nombre: ['', Validators.required],
    });

    return grupo;
  }

  public onAgregaEquipo() {
    this.Equipo.push(this.crearFormularioEquipos());
  }

  public onEliminaEquipo(index: number): void {
    this.Equipo.removeAt(index);
  }

  public onAgregaEntrenadores() {
    this.Entrenadores.push(this.crearFormularioEntrenadores());
  }

  public onEliminaEntrenadores(index: number): void {
    this.Entrenadores.removeAt(index);
  }

  public onAgregaLogros() {
    this.Logros.push(this.crearFormularioLogros());
  }

  public onEliminaLogros(index: number): void {
    this.Logros.removeAt(index);
  }

}
