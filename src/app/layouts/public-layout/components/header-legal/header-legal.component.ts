import { Component, HostListener, OnInit } from '@angular/core';

import { ImageModule } from 'primeng/image';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { IResizeImg } from '../../../../shared/interfaces/ui/ui.interface';
import { redibujaImg } from '../../../../shared/utils/ui/responsive.util';

@Component({
  selector: 'app-header-legal',
  standalone: true,
  imports: [RouterModule, ImageModule],
  templateUrl: './header-legal.component.html',
  styleUrl: './header-legal.component.scss'
})
export class HeaderLegalComponent implements OnInit {
  public title:string = '';
  public widthImg:string = "500";
  private _imgWidht:IResizeImg = {
    limSuperior:550,
    limInferior:350,
    valSuperior:250,
    valInferior:500,
  };

  constructor(private router: Router) { }

  ngOnInit() {
    this.widthImg = redibujaImg(this._imgWidht, 1);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthImg = redibujaImg(this._imgWidht, 1);
  }

}
