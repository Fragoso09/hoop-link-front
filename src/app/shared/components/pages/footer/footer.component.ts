import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ImageModule } from 'primeng/image';
import { CommunicationService } from '../../../../core/services/ui/communication.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ImageModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public anio:number = new Date().getFullYear();

  constructor(
    private activatedRoute: ActivatedRoute, private router: Router,
    private communicationService:CommunicationService,
  ) {

  }

  public redirectHome():void {
    this.router.navigateByUrl('/portal')
  }
}
