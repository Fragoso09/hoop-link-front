import { Component, HostListener, OnInit  } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../../shared/components/pages/header/header.component';
import { FooterComponent } from "../../shared/components/pages/footer/footer.component";
import { IconsSvgComponent } from "../../shared/components/icons-svg/icons-svg.component";

import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { InputGroup } from 'primeng/inputgroup';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem, MessageService } from 'primeng/api';
import { SpeedDial } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IResizeImg } from '../../core/interfaces/ui.interface';
import { redibujaImg } from '../../core/utils/index';
import { TipoSvg } from '../../shared/enums';


@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ImageModule, ButtonModule, RouterModule, InputGroup, InputGroupAddonModule, CardModule, InputTextModule, IconsSvgComponent, SpeedDial, ToastModule],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
  providers: [MessageService]
})
export class PortalComponent implements OnInit {
//#region Variables publicas
  public widthImg:string = "600";
  public tipoSvg = TipoSvg;
  public items!: MenuItem[];
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
  constructor(private messageService: MessageService) { }
//#endregion

//#region Metodos Ng
  ngOnInit(): void {
    this.widthImg = redibujaImg(this._imgWidht, 2);

    this.items = [
      {
          icon: 'pi pi-pencil',
          command: () => {
              this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
      },
      {
          icon: 'pi pi-refresh',
          command: () => {
              this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
          }
      },
      {
          icon: 'pi pi-trash',
          command: () => {
              this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
      },
      {
          icon: 'pi pi-upload',
          routerLink: ['/fileupload']
      },
      {
          icon: 'pi pi-external-link',
          target: '_blank',
          url: 'http://angular.io'
      }
    ];
  }
//#endregion

//#region Listenners
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthImg = redibujaImg(this._imgWidht, 2);
  }
//#endregion

}
