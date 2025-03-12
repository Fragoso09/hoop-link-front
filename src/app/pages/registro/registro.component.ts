import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../../shared/components/pages/header/header.component';
import { FooterComponent } from "../../shared/components/pages/footer/footer.component";

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputMask } from 'primeng/inputmask';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardModule, ButtonModule, InputTextModule, FormsModule, FloatLabel, DatePicker, InputMask],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  value3: string | undefined;
  date: Date | undefined;
}
