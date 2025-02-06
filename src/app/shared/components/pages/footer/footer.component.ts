import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { CommunicationService } from '../../../../core/services/ui/communication.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ImageModule, RouterModule, DividerModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public anio:number = new Date().getFullYear();
  public sections = [
    { route: '/legal/acerca-de', title: 'Acerca de' },
    { route: '/legal/condiciones-uso', title: 'Condiciones de uso' },
    { route: '/legal/politica-privacidad', title: 'Política de privacidad' },
    { route: '/legal/politica-cookies', title: 'Política de cookies' },
    { route: '/legal/politica-copyright', title: 'Política de copyright' },
    { route: '/legal/politica-marca', title: 'Política de marca' },
  ];

  constructor(
    private activatedRoute: ActivatedRoute, private router: Router,
    private communicationService:CommunicationService,
  ) {

  }

  public redirectHome():void {
    this.router.navigateByUrl('/portal')
  }
}
