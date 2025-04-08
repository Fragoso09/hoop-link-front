import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/pages/header/header.component";
import { FooterComponent } from "../../../shared/components/pages/footer/footer.component";

@Component({
  selector: 'app-valida-correo',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './valida-correo.component.html',
  styleUrl: './valida-correo.component.scss'
})
export class ValidaCorreoComponent {

}
