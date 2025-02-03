import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/components/pages/footer/footer.component";
import { RouterModule } from '@angular/router';
import { HeaderLegalComponent } from "../../shared/components/pages/header-legal/header-legal.component";

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [FooterComponent, RouterModule, HeaderLegalComponent],
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.scss'
})
export class LegalComponent {

}
