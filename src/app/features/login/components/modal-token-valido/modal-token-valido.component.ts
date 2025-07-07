import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog, DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-modal-token-valido',
  standalone: true,
  imports: [
    Dialog,
    DialogModule,
  ],
  templateUrl: './modal-token-valido.component.html',
  styleUrl: './modal-token-valido.component.scss'
})
export class ModalTokenValidoComponent {
  @Input() esVisibleDialog!: boolean;
  @Output() esVisibleDialogChange = new EventEmitter<boolean>();

  onHide() {
    this.esVisibleDialogChange.emit(false);
  }
}
