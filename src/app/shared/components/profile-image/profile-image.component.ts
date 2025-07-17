import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

import { ImagenPerfilTipoArchivoPermitido } from './enums/tipo-archivo-permitido.enum';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-profile-image',
  imports: [
    ImageModule
  ],
  templateUrl: './profile-image.component.html',
  styleUrl: './profile-image.component.scss'
})
export class ProfileImageComponent {
//#region Propiedades
  @Input() archivosPermitidos:ImagenPerfilTipoArchivoPermitido = ImagenPerfilTipoArchivoPermitido.Imagenes;
  @Input() permiteCargaMultiple:boolean = false;
  @Input() imageUrl: string | null = null;
  @Output() imageSelected = new EventEmitter<File>();
  @Output() fileTooLarge = new EventEmitter<number>();
  private tamanioImagen: number = 7;
  imageUrlPreview: string | null = null;
  isPreviewOpen = false;
//#endregion

//#region Generales
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const MAX_SIZE_BYTES = this.tamanioImagen * 1024 * 1024;

    if (file.size > MAX_SIZE_BYTES) {
      this.fileTooLarge.emit(file.size);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrlPreview = reader.result as string;
      this.imageSelected.emit(file); // Emitimos el base64 válido
    };
    reader.readAsDataURL(file);
  }

  openPreview() {
    document.body.style.overflow = 'hidden'
    this.isPreviewOpen = true;
  }

  closePreview() {
    document.body.style.overflow = 'auto';
    this.isPreviewOpen = false;
  }

//#endregion
}
