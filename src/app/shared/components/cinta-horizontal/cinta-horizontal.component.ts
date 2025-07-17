import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cinta-horizontal',
  imports: [],
  templateUrl: './cinta-horizontal.component.html',
  styleUrl: './cinta-horizontal.component.scss'
})
export class CintaHorizontalComponent {
//#region Propiedades
  @Input() mensaje: string = 'gomu gomu no pistol';
//#endregion
}
