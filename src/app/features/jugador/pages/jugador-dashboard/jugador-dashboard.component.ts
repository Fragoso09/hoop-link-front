import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jugador-dashboard',
  imports: [],
  templateUrl: './jugador-dashboard.component.html',
  styleUrl: './jugador-dashboard.component.scss'
})
export class JugadorDashboardComponent {
//#region  Propiedades

//#endregion

//#region Constructor
  constructor(private readonly _router: Router) { }
//#endregion

//#region Ng
//#endregion

//#region Generales
  onCambiaCard(id: string): void {
    switch (id) {
      case 'inf-perso':
        this._router.navigate(['/desktop/informacion-personal']);
        break;

      default:
        break;
    }
  }
//#endregion

}
