import { AfterViewInit, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { UsuarioService } from '../../core/services/usuario/usuario.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { IAuthUser } from '../../core/auth/interfaces/auth-user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss'
})
export class DesktopComponent implements OnInit {
//#region Propiedaddes
  usuario = this._authService.user;
//#endregion

//#region Constructor
  constructor(private readonly _authService:AuthService) { }
//#endregion

//#region Ng
  ngOnInit(): void {
    console.log(this.usuario);
    this._authService.yopli().subscribe(user => {
    console.log('Usuario obtenido en desktop:', user);
  });
  }
//#endregion
}
