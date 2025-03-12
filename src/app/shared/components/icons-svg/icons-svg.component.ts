import { Component, Input, OnInit } from '@angular/core';
import { TipoSvg } from '../../enums';

@Component({
  selector: 'app-icons-svg',
  standalone: true,
  imports: [],
  templateUrl: './icons-svg.component.html',
  styleUrl: './icons-svg.component.scss'
})
export class IconsSvgComponent implements OnInit {
//#region  Variables de entrada
  @Input({required: true}) tipo:TipoSvg = TipoSvg.default;
  @Input({required:true}) width!:string;
  @Input({required:true}) height!:string;
  @Input({required:true}) class!:string;
//#endregion

//#region Varibles Globales
  public tipos = TipoSvg;
  public style:string = '';
//#endregion

//#region Metodos Ng
  ngOnInit(): void {
    this.style += `width: ${this.width}; height: ${this.height};`;
  }
//#endregion

}
