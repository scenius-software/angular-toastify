import { NgModule } from '@angular/core';
import { ToastifyToastComponent } from './toastify-toast/toastify-toast.component';
import { ToastifyToastContainerComponent } from './toastify-toast-container/toastify-toast-container.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ToastifyToastComponent, ToastifyToastContainerComponent],
  imports: [ CommonModule ],
  exports: [ToastifyToastContainerComponent]
})
export class AngularToastifyModule { }
