import { Component } from '@angular/core';

import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ImageModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public anio:number = new Date().getFullYear();
}
