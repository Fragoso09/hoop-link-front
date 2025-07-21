import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-boton-volver',
  imports: [
    ButtonModule,
  ],
  templateUrl: './boton-volver.component.html',
  styleUrl: './boton-volver.component.scss'
})
export class BotonVolverComponent {

//#region Constructor
  constructor(private readonly _location:Location, private readonly _router: Router) { }
//#endregion

//#region Generales
 volver(): void {
  if (window.history.length > 1) {
    this._location.back();
  } else {
    this._router.navigate(['/desktop']); // ruta por defecto
  }
}
//#endregion

}
