import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../core/services/usuario/usuario.service';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss'
})
export class DesktopComponent implements OnInit {

  constructor(private readonly _authService:AuthService) {

  }

  ngOnInit(): void {
    this._authService.yopli().subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }


}
