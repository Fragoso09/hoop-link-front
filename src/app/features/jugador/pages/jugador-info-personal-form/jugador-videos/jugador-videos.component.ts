import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VideoUploaderComponent } from '../../../components/video-uploader/video-uploader.component';
import { SkeletonComponent } from "../../../../../shared/components/skeleton/skeleton.component";

import { LoggerService } from '../../../../../core/services/logger/logger.service';
import { LogLevel } from '../../../../../core/enums';

@Component({
  selector: 'app-jugador-videos',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    VideoUploaderComponent,
    SkeletonComponent
],
  templateUrl: './jugador-videos.component.html',
  styleUrl: './jugador-videos.component.css'
})
export class JugadorVideosComponent implements OnInit, OnDestroy {
//#region Propiedades
  @Input({required: true}) form!: FormGroup;
  @Input({required: true}) cargandoData: boolean = true;
  public categorias = [
    { key: 'botando', label: 'Botando' },
    { key: 'tirando', label: 'Tirando' },
    { key: 'coladas', label: 'Coladas' },
    { key: 'entrenando', label: 'Entrenando' },
    { key: 'jugando', label: 'Jugando' }
  ];

  public videoErrors: Record<string, string | null> = {
    videoBotando: null,
    videoTirando: null,
    videoColada: null,
    videoEntrenando: null,
    videoJughando: null,
  };

  public videoBotandoUrl: string = '';
  public videoTirandoUrl: string = '';
  public videoColadaUrl: string = '';
  public videoEntrenandoUrl: string = '';
  public videoJugandoUrl: string = '';

  private readonly _contextLog = 'JugadorVideosComponent';
//#endregion

//#region Constructor
  constructor(
    private readonly _logger: LoggerService
  ) {}
//#endregion

//#region Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Componente inicializado.');

    this.videoBotandoUrl = this.form.get('videoBotando')?.value;
    this.videoTirandoUrl = this.form.get('videoTirando')?.value;
    this.videoColadaUrl = this.form.get('videoColada')?.value;
    this.videoEntrenandoUrl = this.form.get('videoEntrenando')?.value;
    this.videoJugandoUrl = this.form.get('videoJugando')?.value;
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }

//#endregion

//#region Generales

  handleVideoError(key: string, message: string) {
    this.videoErrors[key] = message;

    const control = this.form.get(`videos.${key}`);
    if (control) {
      control.setErrors({ invalid: true });
    }

    this._logger.log(LogLevel.Warn, `${this._contextLog} >> handleVideoError`, `Error en video de la categoría "${key}"`, message);
  }


//#endregion
}
