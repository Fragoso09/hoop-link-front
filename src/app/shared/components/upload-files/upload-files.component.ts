import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { TipoArchivoPermitido } from './enums/tipo-archivo-permitido.enum';

import { ArchivoPreview } from './types/archivo-preview.type';

import { LoggerService } from '../../../core/services/logger/logger.service';
import { LogLevel } from '../../../core/enums';

@Component({
  selector: 'app-upload-files',
  standalone: true,
  imports: [],
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.css'
})
export class UploadFilesComponent {

//#region Propiedades

  archivos: ArchivoPreview[] = [];

  @Input() tituloBoton:string = 'Subir Archivos';
  @Input() archivosPermitidos:TipoArchivoPermitido = TipoArchivoPermitido.Todos;
  @Input() permiteCargaMultiple:boolean = true;
  @Output() archivosCambiados = new EventEmitter<File[]>();

  private readonly _contextLog = 'UploadFilesComponent';
//#endregion

//#region Constructor
  constructor(private sanitizer: DomSanitizer, private readonly _logger: LoggerService) {}
//#endregion

//#region Ng
  ngOnInit() {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, `Componente inicializado.`);
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }
//#endregion

//#region Generales
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
    this._logger.log(LogLevel.Warn, `${this._contextLog} >> onFileSelected`, 'No se seleccionaron archivos.');


      return;
    }

    const files = Array.from(input.files);
    if (!this.permiteCargaMultiple) {
      this.archivos = [];
      this._logger.log(LogLevel.Debug, `${this._contextLog} >> onFileSelected`, 'Se limpia la lista de archivos por carga única.')
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
          this._logger.log(LogLevel.Debug, `${this._contextLog} >> onFileSelected`, `Archivo agregado con preview: ${file.name}`);
          this.emitir();
        };
        reader.readAsDataURL(file);
      } else {
        this.archivos.push(preview);
        this._logger.log(LogLevel.Debug, `${this._contextLog} >> onFileSelected`, `Archivo agregado sin preview: ${file.name}`);
        this.emitir();
      }
    }

    input.value = '';
  }

  eliminarArchivo(index: number): void {
    const archivoEliminado = this.archivos[index];
    this.archivos.splice(index, 1);
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> eliminarArchivo`, `Archivo eliminado: ${archivoEliminado?.nombre}`);
    this.emitir();
  }

  private emitir() {
    this.archivosCambiados.emit(this.archivos.map(a => a.file));
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> emitir`, `Archivos emitidos: ${this.archivos.map(a => a.nombre).join(', ')}`);
  }

//#endregion
}
