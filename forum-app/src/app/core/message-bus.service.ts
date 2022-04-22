import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum MessageType {
  Success,
  Error
}

export interface IMessage { text: string, type:  MessageType }

@Injectable({
  providedIn: 'root'
})
export class MessageBusService {

  private messageQueue$ = new Subject<IMessage>();

  onNewMessage$ = this.messageQueue$.asObservable();

  constructor() { }

  notifyForMessage(message: IMessage) {
    this.messageQueue$.next(message);
  }

  clear(): void {
    this.messageQueue$.next(undefined as unknown as IMessage);
  }
}
