import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GlobalfunctionsService {

  //#region Propiedades

  //#endregion Propiedades

  //#region Constructor
  constructor() { }
  //#endregion Constructor

  //#region Formularios
  esCampoValido(formulario: FormGroup, campo: string):boolean|null {
    return formulario.controls[campo].errors && formulario.controls[campo].touched;
  }

  getCampoError(formulario: FormGroup, campo:string, nombreMostrar:string):string|null {
    if(!formulario.controls[campo]) return null;

    const errors = formulario.controls[campo].errors || {};
    const mensajes: string[] = [];

    for (const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          mensajes.push(`* El campo ${nombreMostrar} es obligatorio.`);
          break;
        case 'minlength':
          mensajes.push(`* Mínimo ${errors['minlength'].requiredLength} caracteres.`);
          break;
        case 'edadMinima':
          mensajes.push(`* Debes tener al menos ${ errors['edadMinima'].requiredAge} años.\n Actualmente tienes ${ errors['edadMinima'].actualAge } años.`);
          break;
        case 'correoInvalido':
          mensajes.push(`* El campo ${nombreMostrar} no tiene un formato válido.`);
          break;
        case 'contraseniaDebil':
          mensajes.push(`* El campo ${nombreMostrar} no tiene un formato válido.`);
          break;
      }
    }

    // Revisar errores a nivel de formulario (edadInsuficiente) SOLO si el campo es fechaNacimiento o tipoUsuario
    const errorEdad = formulario.errors?.['edadInsuficiente']; // <-- Corrección
    if (errorEdad && (campo === 'tipoUsuario')) {
      mensajes.push(
        `* Debes tener al menos ${errorEdad.requiredAge} años.\n Actualmente tienes ${errorEdad.actualAge} años.`
      );
    }

    return mensajes.length > 0 ? mensajes.join('<br>') : null;
  }

  aplicaTrim(formulario: FormGroup): void {
    // Itera sobre todos los controles del formulario
    Object.keys(formulario.controls).forEach(key => {
      const control = formulario.get(key);
      // Si el control tiene un valor y es una cadena de texto
      if (control && typeof control.value === 'string') {
        // Aplica trim() y actualiza el valor sin emitir el evento de cambio
        control.setValue(control.value.trim(), { emitEvent: false });
      }
    });
  }

  //#endregion Formularios

  //#region Fechas
  diferenciaEnAniosEntreFechas(fechaInicial:Date, fechaFinal:Date): number {
    let diferencia = fechaFinal.getFullYear() - fechaInicial.getFullYear();
    const mesActual = fechaFinal.getMonth();
    const diaActual = fechaFinal.getDate();
    const mesInicial = fechaInicial.getMonth();
    const diaInicial = fechaInicial.getDate();

    // Restar un año si aún no ha pasado el cumpleaños
    if (mesActual < mesInicial || (mesActual === mesInicial && diaActual < diaInicial)) {
      diferencia--;
    }

    return diferencia;
  }
  //#endregion Fechas

}
