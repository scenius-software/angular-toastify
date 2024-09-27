import { Component, OnInit } from '@angular/core';
import { ToastType } from 'projects/angular-toastify/src/lib/toast-type';
import { environment } from 'projects/demo/src/environments/environment';
import { ToastService } from '../../../../../../angular-toastify/src/lib/toast.service';

@Component({
  selector: 'app-testcomponent',
  templateUrl: './testcomponent.component.html',
  styleUrls: ['./testcomponent.component.css']
})
export class TestcomponentComponent {
  transitions = ['bounce', 'slide', 'zoom', 'flip'];
  transition = 'bounce';

  positions = ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'];
  position = 'top-right';

  iconLibraries = ['none', 'material', 'font-awesome'];
  iconLibrary = 'material';
  ToastType = ToastType;
  autoClose = 5000;
  disableAutoClose = false;
  hideProgress = false;
  newestOnTop = false;
  closeOnClick = true;
  pauseDelayHover = true;
  pauseVisibilityChange = true;
  environment = environment;


  constructor(private _toastService: ToastService) { }

  message = 'This is a Angular Toastify test # ';
  messageIndex = 1;

  addInfoToast() {
    this._toastService.info(this.message + this.messageIndex);
    this.messageIndex++;
  }

  addWarnToast() {
    this._toastService.warn(this.message + this.messageIndex);
    this.messageIndex++;
  }

  addErrorToast() {
    this._toastService.error(this.message + this.messageIndex);
    this.messageIndex++;
  }

  addSuccessToast() {
    this._toastService.success(this.message + this.messageIndex);
    this.messageIndex++;
  }

  addDefaultToast() {
    this._toastService.default(this.message + this.messageIndex);
    this.messageIndex++;
  }

  addAllToasts() {
    this.addInfoToast();
    this.addWarnToast();
    this.addErrorToast();
    this.addSuccessToast();
    this.addDefaultToast();
  }

}
