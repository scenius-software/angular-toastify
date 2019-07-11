import { NgModule } from '@angular/core';
import { ToastifyToastComponent } from './toastify-toast/toastify-toast.component';
import { ToastifyToastContainerComponent } from './toastify-toast-container/toastify-toast-container.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ToastifyToastComponent, ToastifyToastContainerComponent],
  imports: [BrowserModule],
  exports: [ToastifyToastContainerComponent]
})
export class AngularToastifyModule { }
