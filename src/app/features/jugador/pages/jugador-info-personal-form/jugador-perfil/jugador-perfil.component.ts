import { Component, Input, OnInit } from '@angular/core';
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
    ProfileImageComponent
],
  templateUrl: './jugador-perfil.component.html',
  styleUrl: './jugador-perfil.component.scss'
})
export class JugadorPerfilComponent implements OnInit {

//#region Propiedades
  @Input({required: true}) form!: FormGroup;
  public allEstatusJugador: ICatalogo[] | undefined;
  private mensaje:string = '';
  private totalCatalogos: number = 1; // Ejemplo
  private catalogosCargados: number = 0;
  public fotoPreviewUrl: string | null = null;
//#endregion

//#region Constructor
  constructor(
    private readonly _formularioUtils: FormularioUtilsService, private readonly _catalagoService: CatalogoService,
    private readonly _blockUserIService:BlockUserIService, private readonly _toastService: ToastService,
    private readonly _router: Router
  ) { }
//#endregion

//#region Ng
  async ngOnInit() {
    await this.inicializa();
  }
//#endregion

//#region Generales
  private async inicializa() {
     try {
      this._blockUserIService.show(this.mensaje);
      await this.cargaCatalogoEstatusJugador();
    } finally {
      this._blockUserIService.hide();
    }
  }

  private async cargaCatalogoEstatusJugador() {
    this.mensaje = CatalogoConstants.CARGANDO_CATALOGO_MULTIPLE('Busqueda Jugador', this.catalogosCargados + 1, this.totalCatalogos);
    this._catalagoService.getAllEstatusBusquedaJugador().subscribe( (estatus) => {
      this.allEstatusJugador = estatus;
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
    this.form.get('fotoPerfil')?.setValue(file);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.fotoPreviewUrl = reader.result;
      }
    };
    reader.readAsDataURL(file);
  }

  public handleFileTooLarge(size: number): void {
    const sizeMB = (size / (1024 * 1024)).toFixed(2);
    this._toastService.showMessage(SeverityMessageType.Warn, `${CommonMessages.Atencion}: ${ErrorImagenPerfil.ArchivoDemasiadoGrande}`, `La imagen supera los 7 MB (actual: ${sizeMB} MB)`, undefined, 5000);
  }
//#endregion

}
