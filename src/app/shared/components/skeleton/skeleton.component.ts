import { Component, input, Input } from '@angular/core';

import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton',
  imports: [
    Skeleton
  ],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent {
//#region Propiedades
  @Input() shape: 'circle' | 'rectangle' =  'rectangle';
  @Input() size: string = '';
  @Input() styleClass: string = '';
  @Input() height: string = '';
  @Input() width: string = '';
//#endregion
}
