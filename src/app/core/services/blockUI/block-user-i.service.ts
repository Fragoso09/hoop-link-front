import { Injectable } from '@angular/core';
import { BlockUI } from 'primeng/blockui';
import { OverlayComponent } from '../../components/overlay/overlay.component';

@Injectable({
  providedIn: 'root'
})
export class BlockUserIService {
  private overlayComponent: OverlayComponent | null = null;

  setLoadingComponent(component: OverlayComponent) {
    this.overlayComponent = component;
  }

  show(mensaje: string = 'Cargando...') {
    this.overlayComponent?.blockDocument(mensaje);
  }

  hide() {
    this.overlayComponent?.unblockDocument();
  }
}
