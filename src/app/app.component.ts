import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ToastService } from './core/services/messages/toast.service';
import { OverlayComponent } from './core/components/overlay/overlay.component';
import { BlockUserIService } from './core/services/blockUI/block-user-i.service';
import { AuthService } from './core/auth/services/auth.service';
import { filter, take } from 'rxjs';
import { ToastContainerComponent } from "./core/components/toast-container/toast-container.component";

import { LoggerService } from '../app/core/services/logger/logger.service';
import { LogLevel } from '../app/core/enums';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OverlayComponent, ToastContainerComponent],
  providers: [MessageService, ToastService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
//#region Propiedades
  @ViewChild(OverlayComponent) loadingComponent!: OverlayComponent;

  private readonly _contextLog = 'AppComponent';
//#endregion

//#region Constructor
  constructor(private toastService: ToastService, private blockUserIService: BlockUserIService, private authService: AuthService, private readonly _logger: LoggerService) {}
//#endregion

//#region Ng

  ngOnInit() {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, `Componente inicializado.`);
  }

  ngAfterViewInit() {
    // Cuando el componente AppComponent se inicialice, configuramos el servicio de carga.
    this.blockUserIService.setLoadingComponent(this.loadingComponent);
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }
//#endregion
  // Esto es un getter para acceder al componente de overlay cargado
}
