import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VideoUploaderComponent } from '../../../components/video-uploader/video-uploader.component';
import { SkeletonComponent } from "../../../../../shared/components/skeleton/skeleton.component";

@Component({
  selector: 'app-jugador-videos',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    VideoUploaderComponent,
    SkeletonComponent
],
  templateUrl: './jugador-videos.component.html',
  styleUrl: './jugador-videos.component.scss'
})
export class JugadorVideosComponent implements OnInit {
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
//#endregion

//#region Ng
  ngOnInit(): void {
    this.videoBotandoUrl = this.form.get('videoBotando')?.value;
    this.videoTirandoUrl = this.form.get('videoTirando')?.value;
    this.videoColadaUrl = this.form.get('videoColada')?.value;
    this.videoEntrenandoUrl = this.form.get('videoEntrenando')?.value;
    this.videoJugandoUrl = this.form.get('videoJugando')?.value;
  }
//#endregion

//#region Generales

  handleVideoError(key: string, message: string) {
    this.videoErrors[key] = message;
    this.form.get(`videos.${key}`)?.setErrors({ invalid: true });
  }

//#endregion
}
