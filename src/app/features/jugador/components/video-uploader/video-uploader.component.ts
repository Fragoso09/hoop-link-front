import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { InformacionPersonalService } from '../../../../core/services/informacion-personal/informacion-personal.service';
import { WebApiConstants } from '../../../../core/constants/web-api/web-api.constants';
import { IResponse } from '../../../../core/interfaces/response/response.interface';
import { IVideoInformacionPersonalResponse } from '../../../../shared/interfaces/video/videos-response.interface';
import { BlockUserIService } from '../../../../core/services/blockUI/block-user-i.service';
import { JugadorConstants } from '../../constants/general/general.constants';
import { finalize } from 'rxjs';
import { SeverityMessageType } from '../../../../core/enums';
import { ToastService } from '../../../../core/services/messages/toast.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-video-uploader',
  imports: [
    CommonModule
  ],
  templateUrl: './video-uploader.component.html',
  styleUrl: './video-uploader.component.scss'
})
export class VideoUploaderComponent implements OnInit {
//#region Propiedades
  @Input() label = 'Subir video';
  @Input() maxSizeMB = 30;
  @Input() maxDurationSec = 60;
  @Input() errorMessage: string | null = null;
  @Input() videoUrl: string | null = null;
  @Input() id: string | null = '';
  @Output() videoSelected = new EventEmitter<File | number>();
  @Output() fileError = new EventEmitter<string>();
  @Output() videoUploaded = new EventEmitter<string>(); // URL o ID del video subido
  @Output() videoUploadedId = new EventEmitter<string>(); // URL o ID del video subido
  previewUrl: string | null = null;
//#endregion

//#region Constructor
  constructor(
    private readonly _informacionPersonalService:InformacionPersonalService,
    private readonly _blockUserIService:BlockUserIService,
    private readonly _toastService: ToastService,
  ) { }
//#endregion

//#region Ng
  ngOnInit(): void {
    if (this.videoUrl) {
      this.previewUrl = this.videoUrl;
    }
  }
//#endregion

//#region Generales
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > this.maxSizeMB) {
      this.fileError.emit(`Máximo permitido: ${this.maxSizeMB} MB`);
      return;
    }

    const videoUrl = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.src = videoUrl;

    video.onloadedmetadata = () => {
      if (video.duration > this.maxDurationSec) {
        this.fileError.emit(`Duración máxima: ${this.maxDurationSec} segundos`);
        URL.revokeObjectURL(videoUrl);
      } else {
        this.previewUrl = videoUrl;
        this.videoSelected.emit(file);
        this.uploadVideo(file);
      }
    };
  }

  private uploadVideo(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this._blockUserIService.show(JugadorConstants.SUBIENDO_VIDEO);
    this._blockUserIService.setProgress(45); // ejemplo

    this._informacionPersonalService.uploadVideos(this.label, `?id=${this.label}`, formData).pipe(
      finalize( () => {
        this._blockUserIService.hide();
      })
    )
    .subscribe({
    next: (event) => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        // Actualizas la barra o texto de progreso
        this._blockUserIService.setProgress(percentDone);
        this._blockUserIService.show(`Subiendo video ${percentDone} de 100`);
      } else if (event.type === HttpEventType.Response) {
        // Evento con la respuesta final
        const response = event.body as IResponse<IVideoInformacionPersonalResponse>;
        this.previewUrl = response.data?.pathPublic ?? null;
        this.videoSelected.emit(response.data?.ficheroId);
        this._toastService.showMessage(SeverityMessageType.Success, 'Genial', 'Video actualizado.', undefined, 5000);
        // this._blockUserIService.hide();
      }
    },
    error: () => {
      this.fileError.emit('Error al subir el video');
      // this._blockUserIService.hide();
    }
  });
  }
//#endregion
}
