import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  showMessage(severity: string, summary: string, detail: string, life:number = 3000) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life
    });
  }

  clearMessages() {
    this.messageService.clear();
  }

}
