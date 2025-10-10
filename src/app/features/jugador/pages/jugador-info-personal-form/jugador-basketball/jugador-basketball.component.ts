import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { SkeletonComponent } from "../../../../../shared/components/skeleton/skeleton.component";

import { LoggerService } from '../../../../../core/services/logger/logger.service';
import { CommonMessages, LogLevel, SeverityMessageType } from '../../../../../core/enums';
import { Subject, takeUntil } from 'rxjs';

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
    SkeletonComponent
],
  templateUrl: './jugador-basketball.component.html',
  styleUrl: './jugador-basketball.component.css'
})
export class JugadorBasketballComponent implements OnInit, OnDestroy {

//#region Propiedades
  @Input({required: true}) form!: FormGroup;
  @Input({required: true}) cargandoData: boolean = true;
  public allPosicionJugador: ICatalogo[] | undefined;
  private mensaje:string = '';
  private totalCatalogos: number = 1; // Ejemplo
  private catalogosCargados: number = 0;
  public iconoSi: string = "fa-solid fa-hand-point-left";
  public iconoSi2: string = "pi pi-check";

  private readonly _contextLog = 'JugadorBasketballComponent';
  private _destroy$ = new Subject<void>();
//#endregion

//#region Constructor
  constructor(
    private readonly _formularioUtils: FormularioUtilsService, private readonly _catalagoService: CatalogoService,
    private readonly _blockUserIService:BlockUserIService, private readonly _toastService: ToastService,
    private readonly _logger: LoggerService,
  ) { }
//#endregion

//#region Ng
  ngOnInit() {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Componente inicializado.');

    this.inicializa();
  }

  ngOnDestroy() {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
    this._destroy$.next();
    this._destroy$.complete();
  }
//#endregion

//#region Generales

  private inicializa() {
      try {
      this._blockUserIService.show(this.mensaje);
      this._logger.log(LogLevel.Debug, `${this._contextLog} >> inicializa`, 'Inicialización: cargando catálogo de posiciones de jugador');
      this.cargaCatalogoPosicionJugador();
      this._logger.log(LogLevel.Info, `${this._contextLog} >> inicializa`, 'Catálogo de posiciones cargado correctamente', { cantidad: this.allPosicionJugador?.length });
    } finally {
      this._blockUserIService.hide();
    }
  }

  private cargaCatalogoPosicionJugador() {
    this.mensaje = CatalogoConstants.CARGANDO_CATALOGO_MULTIPLE('Posición Jugador', this.catalogosCargados + 1, this.totalCatalogos);
    this._catalagoService.getAllPosicionJugador()
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: (posicion) => {
        this.allPosicionJugador = posicion;
        this._logger.log(LogLevel.Debug, `${this._contextLog} >> cargaCatalogoPosicionJugador`, 'getAllPosicionJugador >> datos recibidos', posicion);
      },
      error: (error) => {
        this._logger.log(LogLevel.Error, `${this._contextLog} >> cargaCatalogoPosicionJugador`, 'Error cargando getAllPosicionJugador', error);
        this._toastService.showMessage(SeverityMessageType.Error, CommonMessages.Error, 'No se pudo cargar el catálogo de posiciones.');
      }
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
