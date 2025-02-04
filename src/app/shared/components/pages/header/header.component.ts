import { Component, HostListener, OnInit } from '@angular/core';

import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { redibujaImg } from '../../../../core/utils/index';
import { IResizeImg } from '../../../../core/interfaces/ui.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ImageModule, ButtonModule, Menubar, BadgeModule, AvatarModule, InputTextModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public items: MenuItem[] | undefined;
  public widthImg:string = "350";
  private _imgWidht:IResizeImg = {
    limSuperior:550,
    limInferior:350,
    valSuperior:250,
    valInferior:350,
  };

  constructor(private router: Router) { }

  ngOnInit() {
    this.widthImg = redibujaImg(this._imgWidht, 1);

    this.items = [
      {
        label: 'Jugadores',
        icon: 'pi pi-trophy'
      },
      {
        label: 'Escuelas',
        icon: 'pi pi-building-columns'
      },
      {
        label: 'Eventos',
        icon: 'pi pi-calendar-plus'
      },
      {
        label: 'Patrocinadores',
        icon: 'pi pi-star'
      },
      {
        label: 'Empresas',
        icon: 'pi pi-briefcase'
      }
    ];
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthImg = redibujaImg(this._imgWidht, 1);
  }

  public redirectHome():void {
    this.router.navigateByUrl('/portal')
  }
}
