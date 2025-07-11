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
export class DesktopComponent implements OnInit, OnDestroy {
//#region Propiedaddes
  usuario = signal<IAuthUser | null>(null);
  private subscription?: Subscription;
//#endregion

//#region Constructor
  constructor(private readonly _authService:AuthService) { }
//#endregion

//#region Ng
  ngOnInit(): void {
    this.subscription = this._authService.user$.subscribe(user => {
      this.usuario.set(user);
    });
    this._authService.yopli().subscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
//#endregion
}
