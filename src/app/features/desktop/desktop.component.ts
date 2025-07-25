import { AfterViewInit, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { UsuarioService } from '../../core/services/usuario/usuario.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { IAuthUser } from '../../core/auth/interfaces/auth-user.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss'
})
export class DesktopComponent {

//#region Constructor
  constructor(private readonly authService: AuthService, private readonly router: Router) {
    effect(() => {
      const user = this.authService.user();
      const checked = this.authService.authChecked();

      if (!checked) return;

      if (!user) {
        this.router.navigate(['/login']);
        return;
      }

      switch (user.rol) {
        case 'jugador':
          this.router.navigate(['/desktop/jugador']);
          break;
        case 'admin':
          this.router.navigate(['/desktop/admin']);
          break;
        default:
          this.router.navigate(['/access-denied']);
      }
    });
  }
//#endregion

}
