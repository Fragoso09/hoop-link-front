import {
  Component,
  Input,
  ContentChildren,
  TemplateRef,
  QueryList,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  ElementRef,
  ViewChildren,
  Renderer2,
  EventEmitter,
  Output
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Agregar esto
import { ITab } from './interfaces/responsive-tabs.interface';


@Component({
  selector: 'app-responsive-tabs',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './responsive-tabs.component.html',
  styleUrl: './responsive-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveTabsComponent implements AfterContentInit {

  @Input({required: true}) tabLabels: ITab[] = [];
  @ContentChildren('tab') templates!: QueryList<TemplateRef<any>>;
  @ViewChildren('tabButton') tabButtons!: QueryList<ElementRef>;
  @Output() informacionAlPadre = new EventEmitter<any>();
  activeTabIndex = 0;
  isMobileView = false;
  private tabConClaseEspecialIndex: number | null = null; // Para rastrear el índice del tab con la clase especial
  private claseEspecial = 'tab-active'; // Nombre de la clase especial

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

  ngAfterContentInit() {
    if (this.tabLabels.length !== this.templates.length) {
      console.warn('El número de labels no coincide con las secciones');
    }
    this.checkScreenWidth();
  }

  get activeTemplate(): TemplateRef<any> {
    return this.templates.toArray()[this.activeTabIndex];
  }

  selectTab(index: number) {
    this.activeTabIndex = index;
    for (let index = 0; index < this.tabLabels.length; index++) {
      if (this.activeTabIndex !== index) {
        this.removeClassFromTab(index, this.claseEspecial);
      }

    }
    // No necesitamos llamar a checkScreenWidth aquí, el cambio de vista se detecta en onResize
    // y el estilo activo se actualiza automáticamente con la condición en el template.
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  private checkScreenWidth() {
    const wasMobileView = this.isMobileView;
    this.isMobileView = window.innerWidth < 768; // Ajusta el breakpoint según tu SCSS (md)
    if (wasMobileView !== this.isMobileView) {
      this.cdr.detectChanges(); // Forzar la detección de cambios al cambiar el tipo de vista
      this.addClassToTab(this.activeTabIndex, this.claseEspecial);
    }
  }

  addClassToTab(index: number, className: string) {
    if (this.tabButtons && this.tabButtons.toArray()[index]) {
      const tabElement = this.tabButtons.toArray()[index].nativeElement;
      this.renderer.addClass(tabElement, className);
    }
  }

  removeClassFromTab(index: number, className: string) {
    if (this.tabButtons && this.tabButtons.toArray()[index]) {
      const tabElement = this.tabButtons.toArray()[index].nativeElement;
      this.renderer.removeClass(tabElement, className);
    }
  }
}
