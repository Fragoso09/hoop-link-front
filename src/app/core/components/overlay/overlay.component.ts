import { ChangeDetectorRef, Component, Input } from '@angular/core';

import { BlockUI, BlockUIModule } from 'primeng/blockui';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [BlockUI, BlockUIModule],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss'
})
export class OverlayComponent {
  blockedDocument: boolean = false;
  mensaje:string = ''
  progress = 0; // default 0

  constructor(private cd: ChangeDetectorRef) {}

  blockDocument(mensaje:string) {
    this.blockedDocument = true;
    this.mensaje = mensaje;
  }

  unblockDocument() {
    this.blockedDocument = false;
  }

  setProgress(value: number) {
    this.progress = value;
  }
}
