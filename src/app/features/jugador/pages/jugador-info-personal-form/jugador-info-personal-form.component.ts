import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastService } from '../../../../core/services/messages/toast.service';
import { BlockUserIService } from '../../../../core/services/blockUI/block-user-i.service';
import { FormularioUtilsService } from '../../../../shared/utils/form/formulario-utils.service';

import { ButtonModule } from 'primeng/button';

import { BotonVolverComponent } from "../../../../shared/components/boton-volver/boton-volver.component";

import { ITab } from '../../../../shared/components/responsive-tabs/interfaces/responsive-tabs.interface';
import { CommonModule } from '@angular/common';
import { ResponsiveTabsComponent } from "../../../../shared/components/responsive-tabs/responsive-tabs.component";
import { JugadorPerfilComponent } from "./jugador-perfil/jugador-perfil.component";
import { SeverityMessageType } from '../../../../core/enums';
import { InfoPersonalDetail, InfoPersonalSummary } from '../../constants';
import { JugadorConstants } from '../../constants/general/general.constants';
import { InformacionPersonalService } from '../../../../core/services/informacion-personal/informacion-personal.service';
import { finalize } from 'rxjs';
import { IPerfilInformacionPersonal, IRegistraInformacionPersonal } from '../../../../shared/interfaces/informacion-personal';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { IResponse } from '../../../../core/interfaces/response/response.interface';
import { IInformacinPersonal } from '../../../../shared/interfaces/informacion-personal/informacion-personal.interfaces';

@Component({
  selector: 'app-jugador-info-personal-form',
  imports: [
    BotonVolverComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ResponsiveTabsComponent,
    JugadorPerfilComponent,
    ButtonModule,
],
  templateUrl: './jugador-info-personal-form.component.html',
  styleUrl: './jugador-info-personal-form.component.scss'
})
export class JugadorInfoPersonalFormComponent implements OnInit {
//#region Propiedades
  public formularioPrincipal!: FormGroup;
  public tabs:ITab[] = [
    {
      tabName: 'Perfil',
      icon: 'fa-solid fa-id-card'
    },
    {
      tabName: 'Fuerza y Resistencia',
      icon: 'fa-solid fa-dumbbell',
    },
    {
      tabName: 'Basketball',
      icon: 'fa-solid fa-basketball',
    },
    {
      tabName: 'Experiencia',
      icon: 'fa-solid fa-award',
    },
    {
      tabName: 'Visión',
      icon: 'fa-solid fa-crosshairs',
    },
    {
      tabName: 'Tests',
      icon: 'fa-solid fa-brain',
    },
    {
      tabName: 'Videos',
      icon: 'fa-solid fa-video',
    },
    {
      tabName: 'Redes',
      icon: 'fa-solid fa-globe',
    },
  ];
//#endregion

//#region Constructor
  constructor(
    private readonly _fb: FormBuilder, private readonly _toastService: ToastService,
    private readonly _blockUserIService:BlockUserIService, private readonly _formularioService:FormularioUtilsService,
    private readonly _informacionPersonalService:InformacionPersonalService, private readonly _authService:AuthService,

  ) { }
//#endregion

//#region Ng
  ngOnInit(): void {
    this.inicializa();
  }
//#endregion

//#region Generales
  private inicializa(): void {
    this.prepareFormularios();
    this.cargaDatos();
  }

   private prepareFormularios(): void {
    this.formularioPrincipal = this._fb.group({
      perfil: this._fb.group({
        informacionPersonalId: new FormControl(null),
        usuarioId: new FormControl(null),
        fotoPerfil: new FormControl(null),
        altura: new FormControl(null, Validators.required),
        peso: new FormControl(null, Validators.required),
        estatusBusquedaJugador: new FormControl('', Validators.required),
        medidaMano: new FormControl(null, Validators.required),
        largoBrazo: new FormControl(null, Validators.required),
        quienEres: new FormControl(null, Validators.required),
      })
    });
  }

  private cargaDatos() {
    this._informacionPersonalService.getInformacionPersonal().subscribe({
      next: (response: IResponse<IInformacinPersonal>) => {
        const { data } = response;
        console.log(data);

        const perfil: IPerfilInformacionPersonal = {
          altura: data?.altura ?? 0,
          peso: data?.peso ?? 0,
          estatusBusquedaJugador: data?.estatusBusquedaJugador ?? { id: '', nombre: ''},
          largoBrazo: data?.largoBrazo ?? 0,
          medidaMano: data?.medidaMano ?? 0,
          quienEres: data?.quienEres ?? '',
          informacionPersonalId: data?.informacionPersonalId,
          fotoPerfil: data?.fotoPerfilPublicUrl
        }

        this.setPerfilEnFormulario(perfil);
      },
      error: (error) => { }
    });
  }

  private setPerfilEnFormulario(perfil: IPerfilInformacionPersonal) {
    console.log('aqui el perfil en set perfil', perfil);
    this.perfil.patchValue({
      informacionPersonalId: perfil.informacionPersonalId,
      fotoPerfil: perfil.fotoPerfil,
      altura: perfil.altura,
      peso: perfil.peso,
      estatusBusquedaJugador: perfil.estatusBusquedaJugador,
      medidaMano: perfil.medidaMano,
      largoBrazo: perfil.largoBrazo,
      quienEres: perfil.quienEres,
    });
  }

  get perfil(): FormGroup {
    return this.formularioPrincipal.get('perfil') as FormGroup;
  }

  private validaPerfil() {
    if (this._formularioService.tieneErroresEnControlEspecifico(this.formularioPrincipal, 'perfil')) {
      this._toastService.showMessage(SeverityMessageType.Warn, InfoPersonalSummary.SECCION_FALTANTE, InfoPersonalDetail.PERFIL_INCOMPLETO, undefined, 5000);
    }
  }

  private validaErrores() {
    this.validaPerfil();
  }

  public onSubmit(): void {
    function dtoToFormData(dto: IRegistraInformacionPersonal, formularioPrincipal: FormGroup): FormData {
      const formData = new FormData();

      // Guardamos la referencia a fotoPerfil y luego la borramos para no duplicar en JSON
      const fotoPerfil = dto.perfil?.fotoPerfil;

      if (dto.perfil) {
        // Eliminamos fotoPerfil del objeto antes de hacer JSON
        dto.perfil.fotoPerfil = undefined;
      }

      // Serializamos sin el archivo
      formData.append('datos', JSON.stringify(dto));

      // Si fotoPerfil existe y es un File, lo agregamos
      if (fotoPerfil && fotoPerfil instanceof File) {
        formData.append('fotoPerfil', fotoPerfil);
      }

      return formData;
    }

    if (this.formularioPrincipal.invalid) {
      this.formularioPrincipal.markAllAsTouched();
      this.validaErrores();
      console.log(this.perfil);
    } else {
      this._blockUserIService.show(JugadorConstants.APLICANDO_CAMBIOS);
      const raw = this.formularioPrincipal.getRawValue();

      let formCompleto: IRegistraInformacionPersonal;
      formCompleto = {
        perfil: raw.perfil
      }
      const formData = dtoToFormData(formCompleto, this.formularioPrincipal);

      this._informacionPersonalService.save(formData).pipe(
        finalize(() => this._blockUserIService.hide())
      ).subscribe({
        next: (response: any) => {
          console.log('Respuesta exitosa:', response);
          this._toastService.showMessage(SeverityMessageType.Success, 'Genial', response.mensaje, undefined, 5000);
          this.cargaDatos();
        },
        error: (error: any) => {
          console.error('Ocurrió un error:', error);
          // Aquí puedes mostrar un toast, modal o mensaje en pantalla
          this._toastService.showMessage(SeverityMessageType.Error, 'Error al guardar', error.error.message || 'Algo salió mal');
          this._blockUserIService.hide();
        }
      });
    }
  }
//#endregion

}
