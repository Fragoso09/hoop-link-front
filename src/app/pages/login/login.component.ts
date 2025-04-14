import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../core/services/usuario/usuario.service';
import { HeaderComponent } from "../../shared/components/pages/header/header.component";
import { FooterComponent } from "../../shared/components/pages/footer/footer.component";
import { ModalTokenValidoComponent } from "./modal-token-valido/modal-token-valido.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ModalTokenValidoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
//#region Variables publicas
  public esVisibleDialog:boolean = false;
//#endregion Variables publicas

//#region Constructor
  constructor(
    private readonly usuarioService:UsuarioService
  )
  { }
//#endregion Constructor

//#region Metodos Ng
  ngOnInit(): void {
    this.inicializa();
  }
//#endregion

//#region Metodos
  private inicializa() {
    this.muestraEsTokenValido();
  }

  private muestraEsTokenValido() {
    this.esVisibleDialog = this.usuarioService.usuarioTokenValidado;
  }
//#endregion Metodos

}
