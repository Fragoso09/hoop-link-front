import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../../layouts/public-layout/components/header/header.component";
import { FooterComponent } from "../../../layouts/public-layout/components/footer/footer.component";

@Component({
  selector: 'app-public-portal-layout',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './public-portal-layout.component.html',
  styleUrl: './public-portal-layout.component.scss'
})
export class PublicPortalLayoutComponent {

}
