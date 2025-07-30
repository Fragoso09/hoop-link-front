import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { finalize } from 'rxjs';

import { ToastService } from '../../../../core/services/messages/toast.service';
import { BlockUserIService } from '../../../../core/services/blockUI/block-user-i.service';
import { FormularioUtilsService } from '../../../../shared/utils/form/formulario-utils.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { InformacionPersonalService } from '../../../../core/services/informacion-personal/informacion-personal.service';

import { ButtonModule } from 'primeng/button';

import { BotonVolverComponent } from "../../../../shared/components/boton-volver/boton-volver.component";
import { ResponsiveTabsComponent } from "../../../../shared/components/responsive-tabs/responsive-tabs.component";
import { JugadorPerfilComponent } from "./jugador-perfil/jugador-perfil.component";
import { JugadorFuerzaResistenciaComponent } from "./jugador-fuerza-resistencia/jugador-fuerza-resistencia.component";
import { JugadorBasketballComponent } from './jugador-basketball/jugador-basketball.component';
import { JugadorExperienciaComponent } from "./jugador-experiencia/jugador-experiencia.component";

import { SeverityMessageType } from '../../../../core/enums';

import { JugadorConstants } from '../../constants/general/general.constants';
import { InfoPersonalDetail, InfoPersonalSummary } from '../../constants';

import { ITab } from '../../../../shared/components/responsive-tabs/interfaces/responsive-tabs.interface';
import { IBasketballInformacionPersonal, IFuerzaResistenciaInformacionPersonal, IPerfilInformacionPersonal, IRegistraInformacionPersonal, IExperienciaInformacionPersonal, IInformacinPersonal, IVisionInformacionPersonal, IRedesSocialesInformacionPersonal } from '../../../../shared/interfaces/informacion-personal';
import { IResponse } from '../../../../core/interfaces/response/response.interface';
import { JugadorVisionComponent } from './jugador-vision/jugador-vision.component';
import { JugadorTestComponent } from "./jugador-test/jugador-test.component";
import { JugadorVideosComponent } from "./jugador-videos/jugador-videos.component";
import { JugadorRedesSocialesComponent } from "./jugador-redes-sociales/jugador-redes-sociales.component";
import { IVideosInformacionPersonal } from '../../../../shared/interfaces/informacion-personal/videos-informacion-personal.interface';
import { SkeletonComponent } from "../../../../shared/components/skeleton/skeleton.component";

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
    JugadorFuerzaResistenciaComponent,
    JugadorBasketballComponent,
    JugadorExperienciaComponent,
    JugadorVisionComponent,
    JugadorTestComponent,
    JugadorVideosComponent,
    JugadorRedesSocialesComponent,
    SkeletonComponent
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
  public cargandoData = true;
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
    console.log(this.cargandoData);
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
      }),
      fuerzaResistencia: this._fb.group({
        alturaSaltoVertical: new FormControl(null, Validators.required),
        distanciaSaltoHorizontal: new FormControl(null, Validators.required),
        pesoBenchPress: new FormControl(null),
        pesoSquats: new FormControl(null),
        pesoPressMilitar: new FormControl(null),
        pesoRepeticionBenchPress: new FormControl(null),
        pesoRepeticionSquats: new FormControl(null),
        pesoRepeticionPressMilitar: new FormControl(null),
        tiempoDistanciaCienMts: new FormControl(null),
        tiempoDistanciaUnKm: new FormControl(null),
        tiempoDistanciaTresKm: new FormControl(null),
        tiempoDistanciaCincoKm: new FormControl(null),
      }),
      basketball: this._fb.group({
        anioEmpezoAJugar: new FormControl(null, Validators.required),
        manoJuego: new FormControl(false, Validators.required),
        posicionJuegoUno: new FormControl('', Validators.required),
        posicionJuegoDos: new FormControl('', Validators.required),
        clavas: new FormControl(false, Validators.required),
        puntosPorJuego: new FormControl(null),
        asistenciasPorJuego: new FormControl(null),
        rebotesPorJuego: new FormControl(null),
        porcentajeTirosMedia: new FormControl(null),
        porcentajeTirosTres: new FormControl(null),
        porcentajeTirosLibres: new FormControl(null),
      }),
      experiencia: this._fb.group({
        desdeCuandoJuegas: new FormControl(null, Validators.required),
        horasEntrenamientoSemana: new FormControl(null),
        horasGymSemana: new FormControl(null),
        pertenecesClub: new FormControl(false, Validators.required) ,
        nombreClub: new FormControl(null) ,
        historialEquipos: this._fb.array([]) ,
        historialEntrenadores: this._fb.array([]) ,
        logrosClave: this._fb.array([]) ,
      }),
      vision: this._fb.group({
        objetivos: new FormControl(null, Validators.required),
        valores: new FormControl(null, Validators.required),
      }),
      videos: this._fb.group({
        videoBotando: new FormControl(null),
        videoTirando: new FormControl(null),
        videoColada: new FormControl(null),
        videoEntrenando: new FormControl(null),
        videoJugando: new FormControl(null),
      }),
      redes: this._fb.group({
        facebook: new FormControl(null),
        instagram: new FormControl(null),
        tiktok: new FormControl(null),
        youtube: new FormControl(null),
      }),
    });
  }

  private cargaDatos() {
    this._informacionPersonalService.getInformacionPersonal()
      .pipe(
        finalize(() => this.cargandoData = false) // desactiva cuando termina
      ).subscribe({
        next: (response: IResponse<IInformacinPersonal>) => {
          const { data } = response;
          console.log(data);

          // preparo la informacion
          const { perfil, fuerzaResistencia, basketball, experiencia, vision, videos, redes } = this.preparaSeccionesToSetEnFormulario(data);

          // actualizo la informacion
          this.setPerfilEnFormulario(perfil);
          this.setFuerzaResistenciaEnFormulario(fuerzaResistencia);
          this.setBasketballEnFormulario(basketball);
          this.setExperienciaEnFormulario(experiencia);
          this.setVisionEnFormulario(vision);
          this.setVideosEnFormulario(videos);
          this.setRedesEnFormulario(redes);
        },
        error: (error) => { }
    });
  }

  private preparaSeccionesToSetEnFormulario(infoPersonal?: IInformacinPersonal): IRegistraInformacionPersonal {
    const perfil: IPerfilInformacionPersonal = {
      altura: infoPersonal?.altura,
      peso: infoPersonal?.peso,
      estatusBusquedaJugador: infoPersonal?.estatusBusquedaJugador ?? { id: '', nombre: ''},
      largoBrazo: infoPersonal?.largoBrazo,
      medidaMano: infoPersonal?.medidaMano,
      quienEres: infoPersonal?.quienEres ?? '',
      informacionPersonalId: infoPersonal?.informacionPersonalId,
      fotoPerfil: infoPersonal?.fotoPerfilPublicUrl
    }

    const fuerzaResistencia: IFuerzaResistenciaInformacionPersonal = {
      alturaSaltoVertical: infoPersonal?.alturaSaltoVertical,
      distanciaSaltoHorizontal: infoPersonal?.distanciaSaltoHorizontal,
      pesoBenchPress: infoPersonal?.pesoBenchPress,
      pesoSquats: infoPersonal?.pesoSquats,
      pesoPressMilitar: infoPersonal?.pesoPressMilitar,
      pesoRepeticionBenchPress: infoPersonal?.pesoRepeticionBenchPress,
      pesoRepeticionSquats: infoPersonal?.pesoRepeticionSquats,
      pesoRepeticionPressMilitar: infoPersonal?.pesoRepeticionPressMilitar,
      tiempoDistanciaCienMts: infoPersonal?.tiempoDistanciaCienMts,
      tiempoDistanciaUnKm: infoPersonal?.tiempoDistanciaUnKm,
      tiempoDistanciaTresKm: infoPersonal?.tiempoDistanciaTresKm,
      tiempoDistanciaCincoKm: infoPersonal?.tiempoDistanciaCincoKm,
    }

    const basketball: IBasketballInformacionPersonal = {
      anioEmpezoAJugar: infoPersonal?.anioEmpezoAJugar ?? undefined,
      manoJuego: infoPersonal?.manoJuego ?? false,
      posicionJuegoUno: infoPersonal?.posicionJuegoUno ?? { id: '', nombre: ''},
      posicionJuegoDos: infoPersonal?.posicionJuegoDos ?? { id: '', nombre: ''},
      clavas: infoPersonal?.clavas ?? false,
      puntosPorJuego: infoPersonal?.puntosPorJuego,
      asistenciasPorJuego: infoPersonal?.asistenciasPorJuego,
      rebotesPorJuego: infoPersonal?.rebotesPorJuego,
      porcentajeTirosMedia: infoPersonal?.porcentajeTirosMedia,
      porcentajeTirosTres: infoPersonal?.porcentajeTirosTres,
      porcentajeTirosLibres: infoPersonal?.porcentajeTirosLibres,
    }

    const experiencia: IExperienciaInformacionPersonal = {
      desdeCuandoJuegas: infoPersonal?.desdeCuandoJuegas ?? undefined,
      horasEntrenamientoSemana: infoPersonal?.horasEntrenamientoSemana ,
      horasGymSemana: infoPersonal?.horasGymSemana ,
      pertenecesClub: infoPersonal?.pertenecesClub ?? false ,
      nombreClub: infoPersonal?.nombreClub ,
      historialEquipos: infoPersonal?.historialEquipos ,
      historialEntrenadores: infoPersonal?.historialEntrenadores ,
      logrosClave: infoPersonal?.logrosClave,
    }

    const vision: IVisionInformacionPersonal = {
      objetivos: infoPersonal?.objetivos ?? '',
      valores: infoPersonal?.valores ?? '',
    }

    const videos: IVideosInformacionPersonal = {
      videoBotando: infoPersonal?.videoBotandoPublicUrl,
      videoTirando: infoPersonal?.videoTirandoPublicUrl,
      videoColada: infoPersonal?.videoColadaPublicUrl,
      videoEntrenando: infoPersonal?.videoEntrenandoPublicUrl,
      videoJugando: infoPersonal?.videoJugandoPublicUrl,
    }

    const redes: IRedesSocialesInformacionPersonal = {
      facebook: infoPersonal?.facebook,
      instagram: infoPersonal?.instagram,
      tiktok: infoPersonal?.tiktok,
      youtube: infoPersonal?.youtube,
    }

    const infoPersonalPreparada: IRegistraInformacionPersonal = {
      perfil,
      fuerzaResistencia,
      basketball,
      experiencia,
      vision,
      videos,
      redes,
    }

    return infoPersonalPreparada;
  }

  private setRedesEnFormulario(redes: IRedesSocialesInformacionPersonal) {
    this.redes.patchValue({
      facebook: redes?.facebook,
      instagram: redes?.instagram,
      tiktok: redes?.tiktok,
      youtube: redes?.youtube,
    });
  }

  private setVideosEnFormulario(videos: IVideosInformacionPersonal) {
    this.videos.patchValue({
      videoBotando: videos.videoBotando,
      videoTirando: videos.videoTirando,
      videoColada: videos.videoColada,
      videoEntrenando: videos.videoEntrenando,
      videoJugando: videos.videoJugando,
    });
  }

  private setVisionEnFormulario(vision: IVisionInformacionPersonal) {
    this.vision.patchValue({
      objetivos: vision?.objetivos,
      valores: vision?.valores,
    });
  }

  private setExperienciaEnFormulario(experiencia: IExperienciaInformacionPersonal) {
    console.log('entro al set experiencia');
    this.experiencia.patchValue({
      desdeCuandoJuegas: experiencia?.desdeCuandoJuegas !== undefined ? new Date(experiencia?.desdeCuandoJuegas) : undefined,
      horasEntrenamientoSemana: experiencia?.horasEntrenamientoSemana,
      horasGymSemana: experiencia?.horasGymSemana,
      pertenecesClub: experiencia?.pertenecesClub,
      nombreClub: experiencia?.nombreClub,
    });

    // patcheo los que pueden tener mas de uno
    const { historialEntrenadores, historialEquipos, logrosClave } = experiencia;
    console.log('Entrenadores:', historialEntrenadores);
    console.log('Eventos:', historialEquipos);
    console.log('Logros:', logrosClave);

    if (Array.isArray(historialEquipos)) {
      // --- Historial de eventos ---
      const historialEquiposFormArray = this.experiencia.get('historialEquipos') as FormArray;
      historialEquiposFormArray.clear();
      experiencia.historialEquipos?.forEach(evento => {
        historialEquiposFormArray.push(this._fb.group({
          id: [evento.id],
          nombre: [evento.nombre],
        }));
      });
    }

    if (Array.isArray(historialEntrenadores)) {
      // --- Historial de entrenadores ---
      const historialEntrenadoresFormArray = this.experiencia.get('historialEntrenadores') as FormArray;
      historialEntrenadoresFormArray.clear();
      experiencia.historialEntrenadores?.forEach(entrenador => {
        historialEntrenadoresFormArray.push(this._fb.group({
          id: [entrenador.id],
          nombre: [entrenador.nombre],
        }));
      });
    }

    if (Array.isArray(logrosClave)) {
      // --- Logros clave ---
      const logrosClaveFormArray = this.experiencia.get('logrosClave') as FormArray;
      logrosClaveFormArray.clear();
      experiencia.logrosClave?.forEach(logro => {
        logrosClaveFormArray.push(this._fb.group({
          id: [logro.id],
          nombre: [logro.nombre],
        }));
      });
    }
  }

  private setBasketballEnFormulario(basketball: IBasketballInformacionPersonal) {
    this.basketball.patchValue({
      anioEmpezoAJugar: basketball?.anioEmpezoAJugar !== undefined ? new Date(basketball?.anioEmpezoAJugar) : undefined,
      manoJuego: basketball?.manoJuego,
      posicionJuegoUno: basketball?.posicionJuegoUno,
      posicionJuegoDos: basketball?.posicionJuegoDos,
      clavas: basketball?.clavas,
      puntosPorJuego: basketball?.puntosPorJuego,
      asistenciasPorJuego: basketball?.asistenciasPorJuego,
      rebotesPorJuego: basketball?.rebotesPorJuego,
      porcentajeTirosMedia: basketball?.porcentajeTirosMedia,
      porcentajeTirosTres: basketball?.porcentajeTirosTres,
      porcentajeTirosLibres: basketball?.porcentajeTirosLibres,
    });
  }

  private setFuerzaResistenciaEnFormulario(fuerzaResistencia: IFuerzaResistenciaInformacionPersonal) {
    this.fuerzaResistencia.patchValue({
      alturaSaltoVertical: fuerzaResistencia.alturaSaltoVertical,
      distanciaSaltoHorizontal: fuerzaResistencia.distanciaSaltoHorizontal,
      pesoBenchPress: fuerzaResistencia.pesoBenchPress,
      pesoSquats: fuerzaResistencia.pesoSquats,
      pesoPressMilitar: fuerzaResistencia.pesoPressMilitar,
      pesoRepeticionBenchPress: fuerzaResistencia.pesoRepeticionBenchPress,
      pesoRepeticionSquats: fuerzaResistencia.pesoRepeticionSquats,
      pesoRepeticionPressMilitar: fuerzaResistencia.pesoRepeticionPressMilitar,
      tiempoDistanciaCienMts: fuerzaResistencia.tiempoDistanciaCienMts,
      tiempoDistanciaUnKm: fuerzaResistencia.tiempoDistanciaUnKm,
      tiempoDistanciaTresKm: fuerzaResistencia.tiempoDistanciaTresKm,
      tiempoDistanciaCincoKm: fuerzaResistencia.tiempoDistanciaCincoKm,
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

  get fuerzaResistencia(): FormGroup {
    return this.formularioPrincipal.get('fuerzaResistencia') as FormGroup;
  }

  get basketball(): FormGroup {
    return this.formularioPrincipal.get('basketball') as FormGroup;
  }

  get experiencia(): FormGroup {
    return this.formularioPrincipal.get('experiencia') as FormGroup;
  }

  get vision(): FormGroup {
    return this.formularioPrincipal.get('vision') as FormGroup;
  }

  get videos(): FormGroup {
    return this.formularioPrincipal.get('videos') as FormGroup;
  }

  get redes(): FormGroup {
    return this.formularioPrincipal.get('redes') as FormGroup;
  }

  private validaPerfil() {
    if (this._formularioService.tieneErroresEnControlEspecifico(this.formularioPrincipal, 'perfil')) {
      this._toastService.showMessage(SeverityMessageType.Warn, InfoPersonalSummary.SECCION_FALTANTE, InfoPersonalDetail.PERFIL_INCOMPLETO, undefined, 5000);
    }
  }

  private validaFuerzaResistencia() {
    if (this._formularioService.tieneErroresEnControlEspecifico(this.formularioPrincipal, 'fuerzaResistencia')) {
      this._toastService.showMessage(SeverityMessageType.Warn, InfoPersonalSummary.SECCION_FALTANTE, InfoPersonalDetail.FUERZA_RESISTENCIA_INCOMPLETO, undefined, 5000);
    }
  }

  private validaBasketball() {
    if (this._formularioService.tieneErroresEnControlEspecifico(this.formularioPrincipal, 'basketball')) {
      this._toastService.showMessage(SeverityMessageType.Warn, InfoPersonalSummary.SECCION_FALTANTE, InfoPersonalDetail.BASKETBALL, undefined, 5000);
    }
  }

  private validaExperiencia() {
    if (this._formularioService.tieneErroresEnControlEspecifico(this.formularioPrincipal, 'experiencia')) {
      this._toastService.showMessage(SeverityMessageType.Warn, InfoPersonalSummary.SECCION_FALTANTE, InfoPersonalDetail.EXPERIENCIA, undefined, 5000);
    }
  }

  private validaVision() {
    if (this._formularioService.tieneErroresEnControlEspecifico(this.formularioPrincipal, 'vision')) {
      this._toastService.showMessage(SeverityMessageType.Warn, InfoPersonalSummary.SECCION_FALTANTE, InfoPersonalDetail.VISION, undefined, 5000);
    }
  }

   private validaRedes() {
    if (this._formularioService.tieneErroresEnControlEspecifico(this.formularioPrincipal, 'redes')) {
      this._toastService.showMessage(SeverityMessageType.Warn, InfoPersonalSummary.SECCION_FALTANTE, InfoPersonalDetail.REDES, undefined, 5000);
    }
  }

  private validaErrores() {
    this.validaPerfil();
    this.validaFuerzaResistencia();
    this.validaBasketball();
    this.validaExperiencia();
    this.validaVision();
    this.validaRedes();
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
        perfil: raw.perfil,
        fuerzaResistencia: raw.fuerzaResistencia,
        basketball: raw.basketball,
        experiencia: raw.experiencia,
        vision: raw.vision,
        videos: raw.videos,
        redes: raw.redes,
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
