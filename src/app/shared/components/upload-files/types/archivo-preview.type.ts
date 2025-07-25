import { SafeResourceUrl } from "@angular/platform-browser";

export type ArchivoPreview = {
  file: File;
  url?: string | SafeResourceUrl; // <- actualiza esto
  nombre: string;
  tipo: string;
  extension: string;
};
