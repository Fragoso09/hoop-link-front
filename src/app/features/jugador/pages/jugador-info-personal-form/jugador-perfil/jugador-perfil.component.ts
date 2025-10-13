import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { BlockUserIService } from '../../../../../core/services/blockUI/block-user-i.service';
import { ToastService } from '../../../../../core/services/messages/toast.service';
import { CatalogoService } from '../../../../../shared/services/catalogo/catalogo.service';
import { FormularioUtilsService } from '../../../../../shared/utils/form/formulario-utils.service';

import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { ICatalogo } from '../../../../../shared/interfaces/catalogo/catalogo.interface';

import { CatalogoConstants } from '../../../../../shared/constants/catalogo/catalogo.constants';
import { ProfileImageComponent } from "../../../../../shared/components/profile-image/profile-image.component";
import { CommonMessages, SeverityMessageType } from '../../../../../core/enums';
import { ErrorImagenPerfil } from '../../../../../shared/components/profile-image/enums/error-profile-image.enum';
import { SkeletonComponent } from "../../../../../shared/components/skeleton/skeleton.component";

import { LoggerService } from '../../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../../core/enums';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-jugador-perfil',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    CommonModule,
    InputTextModule,
    InputNumber,
    Select,
    TextareaModule,
    ProfileImageComponent,
    SkeletonComponent
],
  templateUrl: './jugador-perfil.component.html',
  styleUrl: './jugador-perfil.component.css'
})
export class JugadorPerfilComponent implements OnInit, OnDestroy {

//#region Propiedades
  @Input({required: true}) form!: FormGroup;
  @Input({required: true}) cargandoData: boolean = true;
  public allEstatusJugador: ICatalogo[] | undefined;

  private mensaje:string = '';
  private totalCatalogos: number = 1; // Ejemplo
  private catalogosCargados: number = 0;

  public fotoPreviewUrl: string | null = null;

  private readonly _contextLog = 'JugadorPerfilComponent';
  private readonly _destroy$ = new Subject<void>();

//#endregion

//#region Constructor
  constructor(
    private readonly _formularioUtils: FormularioUtilsService, private readonly _catalagoService: CatalogoService,
    private readonly _blockUserIService:BlockUserIService, private readonly _toastService: ToastService,
    private readonly _router: Router, private readonly _logger: LoggerService,
  ) { }
//#endregion

//#region Ng
  ngOnInit() {
    this._logger.log(LogLevel.Info, `${this._contextLog} >> ngOnInit`, 'Inicializando componente.');
    this.inicializa();
    this.form.valueChanges.subscribe(val => {
      this.cargaFotoPerfil();
    });
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Info, `${this._contextLog} >> ngOnDestroy`, 'Destruyendo componente y limpiando recursos.');
    this._destroy$.next();
    this._destroy$.complete();
  }
//#endregion

//#region Generales
  private inicializa() {
    try {
      this._logger.log(LogLevel.Debug, `${this._contextLog} >> inicializa`, 'Mostrando loader');
      this._blockUserIService.show(this.mensaje);
      this.cargaCatalogoEstatusJugador();

    } catch (error) {
      this._logger.log(LogLevel.Error, `${this._contextLog} >> inicializa`, 'Error al inicializar', error);
      this._toastService.showMessage(SeverityMessageType.Error, CommonMessages.Error, 'Ocurrió un error al inicializar los datos del perfil.');
    } finally {
      this._logger.log(LogLevel.Debug, `${this._contextLog} >> inicializa`, 'Ocultando loader');
      this._blockUserIService.hide();
    }
  }

  private cargaFotoPerfil() {
    this.fotoPreviewUrl = this.form.get('fotoPerfil')?.value;
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> cargaFotoPerfil`, 'Actualizando vista previa de foto de perfil', this.fotoPreviewUrl);
  }


  private cargaCatalogoEstatusJugador() {
    this.mensaje = CatalogoConstants.CARGANDO_CATALOGO_MULTIPLE('Busqueda Jugador', this.catalogosCargados + 1, this.totalCatalogos);
    this._catalagoService.getAllEstatusBusquedaJugador()
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: (estatus) => {
        this.allEstatusJugador = estatus;
        this._logger.log(LogLevel.Info, 'JugadorPerfilComponent', 'Catálogo de estatus cargado correctamente', estatus);
      },
      error: (err) => {
        this._logger.log(LogLevel.Error, 'JugadorPerfilComponent', 'Error al cargar catálogo', err);
        this._toastService.showMessage(SeverityMessageType.Error, CommonMessages.Error, 'Error al cargar el catálogo de estatus de jugador.');
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

  public onFileSelected(file: File): void {
    this._logger.log(LogLevel.Info, `${this._contextLog} >> onFileSelected`, 'Archivo seleccionado', file.name);
    this.form.get('fotoPerfil')?.setValue(file);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.fotoPreviewUrl = reader.result;
        this._logger.log(LogLevel.Debug, `${this._contextLog} >> onFileSelected`, 'Vista previa generada');
      }
    };
    reader.readAsDataURL(file);
  }

  public handleFileTooLarge(size: number): void {
    const sizeMB = (size / (1024 * 1024)).toFixed(2);
    this._logger.log(LogLevel.Warn, `${this._contextLog} >> handleFileTooLarge`, `Archivo demasiado grande (${sizeMB} MB)`);
    this._toastService.showMessage(SeverityMessageType.Warn, `${CommonMessages.Atencion}: ${ErrorImagenPerfil.ArchivoDemasiadoGrande}`, `La imagen supera los 7 MB (actual: ${sizeMB} MB)`, undefined, 5000);
  }
//#endregion

}
