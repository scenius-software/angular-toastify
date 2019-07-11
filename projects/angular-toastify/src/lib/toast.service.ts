import { Injectable, EventEmitter } from '@angular/core';
import { Toast } from './toast';
import { ToastType } from './toast-type';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastAddedEvent = new EventEmitter();
  constructor() { }

  dismissAllEvent = new EventEmitter();

  dismissAll() {
    this.dismissAllEvent.emit();
  }

  info(message: string) {
    const toast = new Toast(message, ToastType.info);
    this.toastAddedEvent.emit(toast);
  }

  success(message: string) {
    const toast = new Toast(message, ToastType.success);
    this.toastAddedEvent.emit(toast);
  }

  warn(message: string) {
    const toast = new Toast(message, ToastType.warning);
    this.toastAddedEvent.emit(toast);
  }

  error(message: string) {
    const toast = new Toast(message, ToastType.error);
    this.toastAddedEvent.emit(toast);
  }

  default(message: string) {
    const toast = new Toast(message, ToastType.default);
    this.toastAddedEvent.emit(toast);
  }
}
