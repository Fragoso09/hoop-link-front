import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private textLegalHeader = new BehaviorSubject<string>('');
  public currentTextLegalHeader = this.textLegalHeader.asObservable();

  updateText(newText: string) {
    this.textLegalHeader.next(newText);
  }

}
