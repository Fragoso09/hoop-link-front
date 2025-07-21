import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from './components/header/header.component'
import { NewsBarComponent } from "./components/news-bar/news-bar.component";
import { BannerSpaceComponent } from "./components/banner-space/banner-space.component";
import { InfoCardsComponent } from "./components/info-cards/info-cards.component";

@Component({
  selector: 'app-authenticated-layout',
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterModule,
    NewsBarComponent,
    BannerSpaceComponent,
    InfoCardsComponent
],
  templateUrl: './authenticated-layout.component.html',
  styleUrl: './authenticated-layout.component.scss'
})
export class AuthenticatedLayoutComponent {

}
