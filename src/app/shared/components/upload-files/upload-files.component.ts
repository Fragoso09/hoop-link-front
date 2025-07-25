import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { TipoArchivoPermitido } from './enums/tipo-archivo-permitido.enum';

import { ArchivoPreview } from './types/archivo-preview.type';

@Component({
  selector: 'app-upload-files',
  standalone: true,
  imports: [],
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.scss'
})
export class UploadFilesComponent {

  archivos: ArchivoPreview[] = [];

  @Input() tituloBoton:string = 'Subir Archivos';
  @Input() archivosPermitidos:TipoArchivoPermitido = TipoArchivoPermitido.Todos;
  @Input() permiteCargaMultiple:boolean = true;
  @Output() archivosCambiados = new EventEmitter<File[]>();

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    if (!this.permiteCargaMultiple) {
      this.archivos = [];
    }

    for (let file of files) {
      const tipo = file.type;
      const extension = file.name.split('.').pop() ?? '';
      const preview: ArchivoPreview = {
        file,
        nombre: file.name,
        tipo,
        extension
      };

      if (tipo.startsWith('image/') || tipo === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const unsafeUrl = e.target?.result as string;
          preview.url = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
          this.archivos.push(preview);
          this.emitir();
        };
        reader.readAsDataURL(file);
      } else {
        this.archivos.push(preview);
        this.emitir();
      }
    }

    input.value = '';
  }

  eliminarArchivo(index: number): void {
    this.archivos.splice(index, 1);
    this.emitir();
  }

  private emitir() {
    this.archivosCambiados.emit(this.archivos.map(a => a.file));
  }
}
