import { Component, HostListener, OnInit  } from '@angular/core';
import { HeaderComponent } from '../../shared/components/pages/header/header.component';
import { FooterComponent } from "../../shared/components/pages/footer/footer.component";

import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { IResizeImg } from '../../core/interfaces/ui.interface';
import { redibujaImg } from '../../core/utils/ui/responsive.util';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ImageModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public widthImg:string = "600";
  private _imgWidht:IResizeImg = {
      limSuperior:600,
      limInferior:550,
      valSuperior:600,
      valInferior:480,
    };

  ngOnInit(): void {
    this.widthImg = redibujaImg(this._imgWidht, 2);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthImg = redibujaImg(this._imgWidht, 2);
  }
}
