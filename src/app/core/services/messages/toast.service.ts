import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SeverityMessageType, PositionMessageType } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  showMessage(severity: SeverityMessageType, summary: string, detail: string, position: PositionMessageType = PositionMessageType.TopRight, life:number = 3000) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      key: position,
      life: life
    });
  }

  clearMessages() {
    this.messageService.clear();
  }

}
