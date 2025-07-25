import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { Tooltip } from 'primeng/tooltip';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    Tooltip
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private readonly _authService:AuthService, private router: Router) { }

  logout(): void {
    this._authService.logout().subscribe({
    next: () => {
      this.router.navigate(['/login']); // redirige a login
    },
    error: () => {
      // Manejar error si quieres
    }
    })
  }

}
