import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { BlockUserIService } from '../../../../../core/services/blockUI/block-user-i.service';
import { ToastService } from '../../../../../core/services/messages/toast.service';
import { CatalogoService } from '../../../../../shared/services/catalogo/catalogo.service';
import { FormularioUtilsService } from '../../../../../shared/utils/form/formulario-utils.service';

import { ICatalogo } from '../../../../../shared/interfaces/catalogo/catalogo.interface';
import { CatalogoConstants } from '../../../../../shared/constants/catalogo/catalogo.constants';

import { CommonModule } from '@angular/common';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { ToggleButton } from 'primeng/togglebutton';

@Component({
  selector: 'app-jugador-basketball',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    CommonModule,
    InputTextModule,
    InputNumber,
    Select,
    DatePicker,
    ToggleButton,
  ],
  templateUrl: './jugador-basketball.component.html',
  styleUrl: './jugador-basketball.component.scss'
})
export class JugadorBasketballComponent implements OnInit {

//#region Propiedades
  @Input({required: true}) form!: FormGroup;
  public allPosicionJugador: ICatalogo[] | undefined;
  private mensaje:string = '';
  private totalCatalogos: number = 1; // Ejemplo
  private catalogosCargados: number = 0;
  public iconoSi: string = "fa-solid fa-hand-point-left";
  public iconoSi2: string = "pi pi-check";
//#endregion

//#region Constructor
  constructor(
    private readonly _formularioUtils: FormularioUtilsService, private readonly _catalagoService: CatalogoService,
    private readonly _blockUserIService:BlockUserIService, private readonly _toastService: ToastService,
  ) { }
//#endregion

//#region Ng
  async ngOnInit() {
    this.inicializa();
  }
//#endregion

//#region Generales

  private async inicializa() {
      try {
      this._blockUserIService.show(this.mensaje);
      await this.cargaCatalogoPosicionJugador();
    } finally {
      this._blockUserIService.hide();
    }
  }

  private async cargaCatalogoPosicionJugador() {
    this.mensaje = CatalogoConstants.CARGANDO_CATALOGO_MULTIPLE('Posición Jugador', this.catalogosCargados + 1, this.totalCatalogos);
    this._catalagoService.getAllPosicionJugador().subscribe( (posicion) => {
      this.allPosicionJugador = posicion;
    });
  }

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
