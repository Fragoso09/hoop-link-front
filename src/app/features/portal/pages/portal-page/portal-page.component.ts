import { Component, HostListener, OnInit  } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { IconsSvgComponent } from "../../../../core/components/icons-svg/icons-svg.component";

import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { InputGroup } from 'primeng/inputgroup';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IResizeImg } from '../../../../shared/interfaces/ui/ui.interface';
import { redibujaImg } from '../../../../shared/utils/ui/responsive.util';
import { TipoSvg } from '../../../../../app/core/enums/index';
import { UsuarioService } from '../../../../core/services/usuario/usuario.service';
import { ModalRegistroComponent } from '../../components/modal-registro/modal-registro.component';

@Component({
  selector: 'app-portal-page',
  standalone: true,
  imports: [
    RouterModule,
    ImageModule,
    ButtonModule,
    RouterModule,
    InputGroup,
    InputGroupAddonModule,
    CardModule,
    InputTextModule,
    IconsSvgComponent,
    ToastModule,
    ModalRegistroComponent
  ],
  templateUrl: './portal-page.component.html',
  styleUrl: './portal-page.component.scss'
})
export class PortalPageComponent {
//#region Variables publicas
  public widthImg:string = "600";
  public tipoSvg = TipoSvg;
  public items!: MenuItem[];
  public widthImageUnirse:string = '300';
  public esVisibleDialog:boolean = false;
//#endregion

//#region Variables privadas
  private _imgWidht:IResizeImg = {
      limSuperior:600,
      limInferior:550,
      valSuperior:600,
      valInferior:480,
  };
//#endregion

//#region Constructor
  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }
//#endregion

//#region Metodos Ng
  ngOnInit(): void {
   this.inicializa();
  }
//#endregion

//#region Listenners
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthImg = redibujaImg(this._imgWidht, 2);
  }
//#endregion

//#region Metodos
  onClickUnirse() {
    this.router.navigateByUrl('/registro')
  }

  private inicializa() {
    this.defineTamanio();
    this.muestraEsRegistro();
  }

  private defineTamanio() {
    this.widthImg = redibujaImg(this._imgWidht, 2);
  }

  private muestraEsRegistro() {
    this.esVisibleDialog = this.usuarioService.esRegistro;
  }

//#endregion
}
