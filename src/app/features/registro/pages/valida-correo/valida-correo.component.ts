import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Dialog, DialogModule } from 'primeng/dialog';

import { ToastService } from '../../../../core/services/messages/toast.service';
import { UsuarioService } from '../../../../core/services/usuario/usuario.service';
import { IResponse } from '../../../../core/interfaces/response/response.interface';
import { IResponseError } from '../../../../core/interfaces/error/error.interface';

@Component({
  selector: 'app-valida-correo',
  standalone: true,
  imports: [
    Dialog,
    DialogModule,
  ],
  templateUrl: './valida-correo.component.html',
  styleUrl: './valida-correo.component.scss'
})
export class ValidaCorreoComponent implements OnInit, AfterViewInit {

//#region Propiedades
  private token!:string;
  public muestraLoader:boolean = true;
  public error:string = '';
//#endregion Propiedades

//#region Constructor
  constructor(
    private routeActive: ActivatedRoute,
    private readonly usuarioService:UsuarioService,
    private readonly toastService: ToastService,
    private readonly router:Router
  ) { }
//#endregion Constructor

//#region Ng
  ngOnInit(): void {
    this.routeActive.queryParamMap.subscribe(params => {
      this.token = params.get('token') ?? '';
    });
  }

  ngAfterViewInit(): void {
    this.validaToken();
  }
//#endregion Ng

//#region Generales
  private validaToken() {
    this.usuarioService.validaToken(this.token).subscribe({
      next: (response:IResponse<string>) => {
        this.toastService.showMessage('success', 'Excelente', response.mensaje, 5000);
        this.usuarioService.usuarioTokenValidado = true;
        this.router.navigateByUrl('/login');
      },
      error: (error:IResponseError) => {
        this.muestraLoader = false;
        this.error = error.error.message;
      }
    });
  }
//#endregion Geenerales

}
