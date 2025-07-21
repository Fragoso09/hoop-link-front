import { Component } from '@angular/core';

import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [
    Toast
  ],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss'
})
export class ToastContainerComponent {

}
