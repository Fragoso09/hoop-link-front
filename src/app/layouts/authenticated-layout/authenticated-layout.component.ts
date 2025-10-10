import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from './components/header/header.component'
import { NewsBarComponent } from "./components/news-bar/news-bar.component";
import { BannerSpaceComponent } from "./components/banner-space/banner-space.component";
import { InfoCardsComponent } from "./components/info-cards/info-cards.component";

import { LoggerService } from '../../core/services/logger/logger.service';
import { LogLevel } from '../../core/enums';

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
  styleUrl: './authenticated-layout.component.css'
})
export class AuthenticatedLayoutComponent implements OnInit, OnDestroy {

//#region Propiedades
  private readonly _contextLog = 'AuthenticatedLayoutComponent';
//#endregion

//#region Constructor
  constructor(private readonly _logger: LoggerService) { }
//#endregion

//#region Ng
  ngOnInit(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, 'Componente inicializado.');
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }
//#endregion

}
