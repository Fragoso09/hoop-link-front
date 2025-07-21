import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CintaHorizontalComponent } from "../../../../shared/components/cinta-horizontal/cinta-horizontal.component";

@Component({
  selector: 'app-jugador-dashboard',
  imports: [CintaHorizontalComponent],
  templateUrl: './jugador-dashboard.component.html',
  styleUrl: './jugador-dashboard.component.scss'
})
export class JugadorDashboardComponent {
//#region  Propiedades
  public mensaje:string = 'Your information. Your recruitment. Your future. Taking charge of your recruitment starts by claiming your Player Profile.';
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
