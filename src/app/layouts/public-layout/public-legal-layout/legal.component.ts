import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterModule } from '@angular/router';
import { HeaderLegalComponent } from "../components/header-legal/header-legal.component";

import { LoggerService } from '../../../core/services/logger/logger.service';
import { LogLevel } from '../../../core/enums';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [FooterComponent, RouterModule, HeaderLegalComponent],
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.css'
})
export class LegalComponent {

//#region Propiedades
  private readonly _contextLog = 'LegalComponent';
//#endregion

//#region Constructor
  constructor(private readonly _logger: LoggerService) { }
//#endregion

//#region Ng
  ngOnInit() {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnInit`, `Componente inicializado.`);
  }

  ngOnDestroy(): void {
    this._logger.log(LogLevel.Debug, `${this._contextLog} >> ngOnDestroy`, 'Componente destruido.');
  }
//#endregion

}
