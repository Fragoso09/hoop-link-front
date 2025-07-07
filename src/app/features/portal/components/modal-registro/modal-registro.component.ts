import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog, DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-modal-registro',
  standalone: true,
  imports: [
    Dialog,
    DialogModule,
  ],
  templateUrl: './modal-registro.component.html',
  styleUrl: './modal-registro.component.scss'
})
export class ModalRegistroComponent {
  @Input() esVisibleDialog!: boolean;
  @Output() esVisibleDialogChange = new EventEmitter<boolean>();

  onHide() {
    this.esVisibleDialogChange.emit(false);
  }
}
