import { Component } from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-terminos-condiciones',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './terminos-condiciones.component.html',
  styleUrl: './terminos-condiciones.component.scss'
})
export class TerminosCondicionesComponent {

  //#region Propiedades
  public sections = [
    { route: '/legal/acerca-de', title: 'Acerca de' },
    { route: '/legal/condiciones-uso', title: 'Condiciones de uso' },
    { route: '/legal/politica-privacidad', title: 'Política de privacidad' },
    { route: '/legal/politica-cookies', title: 'Política de cookies' },
    { route: '/legal/politica-copyright', title: 'Política de copyright' },
    { route: '/legal/politica-marca', title: 'Política de marca' },
  ];
  //#endregion Propiedades

  //#region Constructor
  constructor(
    private activatedRoute: ActivatedRoute, private router: Router
  ) { }
  //#endregion Constructor

}
