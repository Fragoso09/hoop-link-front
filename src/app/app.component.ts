import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { ToastService } from './core/services/messages/toast.service';
import { OverlayComponent } from './core/components/overlay/overlay.component';
import { BlockUserIService } from './core/services/blockUI/block-user-i.service';
import { AuthService } from './core/auth/services/auth.service';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toast, OverlayComponent],
  providers: [MessageService, ToastService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild(OverlayComponent) loadingComponent!: OverlayComponent;

  constructor(private toastService: ToastService, private blockUserIService: BlockUserIService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkAuth().subscribe();
  }

  ngAfterViewInit() {
    // Cuando el componente AppComponent se inicialice, configuramos el servicio de carga.
    this.blockUserIService.setLoadingComponent(this.loadingComponent);
  }

  // Esto es un getter para acceder al componente de overlay cargado
}
