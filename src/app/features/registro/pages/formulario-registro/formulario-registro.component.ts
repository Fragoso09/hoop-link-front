import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ICatalogo } from '../../../../shared/interfaces/catalogo/catalogo.interface';
import { IRegistro } from '../../../../shared/interfaces/usuario/registro.interface';

import { CatalogoService } from '../../../../shared/services/catalogo/catalogo.service';
import { UsuarioService } from '../../../../core/services/usuario/usuario.service';
import { FormularioUtilsService } from '../../../../shared/utils/form/formulario-utils.service';

import { contraseniaFuerteValidator, correoElectronicoValidator, edadMinimaValidator, edadSegunTipoUsuarioValidator } from '../../../../../app/shared/validators';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputMask } from 'primeng/inputmask';
import { Checkbox } from 'primeng/checkbox';
import { Select, SelectChangeEvent } from 'primeng/select';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { ToastService } from '../../../../core/services/messages/toast.service';
import { IResponse } from '../../../../core/interfaces/response/response.interface';
import { BlockUserIService } from '../../../../core/services/blockUI/block-user-i.service';

@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [CardModule, ButtonModule, InputTextModule,
      FormsModule, FloatLabel, DatePicker, InputMask, Checkbox,
      Select, CommonModule, ReactiveFormsModule, PasswordModule, DividerModule,
      RouterModule],
  templateUrl: './formulario-registro.component.html',
  styleUrl: './formulario-registro.component.scss'
})
export class FormularioRegistroComponent implements OnInit {

//#region Propiedades
  public allTipoUsuario: ICatalogo[] = [];
  public allEstados: ICatalogo[] = [];
  public allMunicipios: ICatalogo[] = [];
  public aceptoTerrminos: boolean = false;
  public formulario: FormGroup;
  public hoy:Date = new Date();
  public estadoSeleccionado: boolean = false;
//#endregion Propiedades

//#endregion Constructor
  constructor(
    private readonly catalagoService: CatalogoService, private readonly usuarioService:UsuarioService,
    private readonly _formularioUtiuls:FormularioUtilsService, private fb: FormBuilder,
    private readonly toastService: ToastService, private readonly blockUserIService:BlockUserIService,
    private readonly router:Router
  ) {
    this.formulario = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellidoPaterno: new FormControl('', Validators.required),
      apellidoMaterno: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', {
        validators: [Validators.required, edadMinimaValidator(12)]
      }),
      estado: new FormControl('', Validators.required),
      municipio: new FormControl({value: '', disabled: true}, Validators.required),
      residencia: new FormControl('', Validators.required),
      correo: new FormControl('', {
        validators: [Validators.required, correoElectronicoValidator()]
      }),
      telefono: new FormControl('', Validators.required),
      tipoUsuario: new FormControl('', {
        validators: [Validators.required]
      }),
      contrasena: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8), contraseniaFuerteValidator()]
      }),
      aceptaTerminos: new FormControl(false, Validators.requiredTrue)
    },{ validators: edadSegunTipoUsuarioValidator() }
    );
  }
//#endregion Constructor

//#region Ng
  ngOnInit(): void {
    this.inicializa();
  }
//#endregion Ng

//#region Generales
  private inicializa(): void {
    this.catalagoService.getAllTipoUsuario().subscribe( (tipoUsuario) => {
      this.allTipoUsuario = tipoUsuario;
    });

    this.catalagoService.getAllEstado().subscribe( (estado) => {
      this.allEstados = estado;
    });
  }

  public onCambiaEstado(event: SelectChangeEvent) {
    this.catalagoService.getAllMunicipioByEstado(event.value.id).subscribe( (municipio) => {
      this.allMunicipios = municipio;
      this.formulario.controls['municipio'].enable();
    });
  }

  public guardar(): void {
    if(this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    } else if (this.formulario.valid) {
      this._formularioUtiuls.aplicaTrim(this.formulario);
      const registro = this.formulario.value as IRegistro;
      this.blockUserIService.show('Registrando Información...');
      this.usuarioService.save(registro).subscribe({
        next: (response:IResponse<any>) => {
          this.toastService.showMessage('success', 'Genial', response.mensaje, 5000);
          this.formulario.reset();
          this.blockUserIService.hide();
          this.usuarioService.esRegistro = true;
          this.router.navigateByUrl('/portal');
        },
        error: (error) => {
          this.toastService.showMessage('error', 'Error', error.error.message);
          this.blockUserIService.hide();
        }
      });
    }
  }

  public esValido(campo: string):boolean| null {
    return this._formularioUtiuls.esCampoValido(this.formulario, campo);
  }

  public getErrores(campo: string, nombreMostrar:string):string | null {
    const errores = this._formularioUtiuls.getCampoError(this.formulario, campo, nombreMostrar);
    return errores;

  }

//#endregion Generales

}
