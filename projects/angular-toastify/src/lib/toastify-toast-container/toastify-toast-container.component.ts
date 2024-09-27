import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { ToastService } from '../toast.service';
import { Toast } from '../toast';
import { ToastType } from '../toast-type';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-toastify-toast-container',
  templateUrl: './toastify-toast-container.component.html',
  styleUrls: ['./toastify-toast-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastifyToastContainerComponent implements OnInit, OnChanges {
  private readonly transitionDurations = 400;

  @Input() position: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left' = 'top-right';
  @Input() transition: 'bounce' | 'slide' | 'zoom' | 'flip' = 'bounce';
  @Input() autoClose = 5000;
  @Input() autoCloseError = undefined;
  @Input() autoCloseSuccess = undefined;
  @Input() autoCloseInfo = undefined;
  @Input() autoCloseWarn = undefined;
  @Input() hideProgressBar = false;
  @Input() pauseOnHover = true;
  @Input() pauseOnVisibilityChange = true;
  @Input() closeOnClick = true;
  @Input() newestOnTop = false;
  @Input() preventDuplicates = false;
  @Input() iconLibrary: 'material' | 'font-awesome' | 'none' = 'none';

  ToastType = ToastType;
  toasts = new Array<Toast>();
  toastTransitionDict = {};

  constructor(private _toastService: ToastService, private _cd: ChangeDetectorRef) { }

  ngOnChanges(): void {
    this._cd.markForCheck();
  }

  dismiss(toast: Toast): void {
    this.toastTransitionDict[toast.id] = TransitionState.exiting;
    setTimeout(() => {
      const index = this.toasts.indexOf(toast);
      this.toasts.splice(index, 1);
      this._cd.markForCheck();
    }, this.transitionDurations);
  }

  getClass(toast: Toast): string {
    let base = `angular-toastify-toast angular-toastify-toast--${ToastType[toast.type]} `;
    const state = this.toastTransitionDict[toast.id];
    if (state === TransitionState.entering) {
      base += `angular-toastify-${this.transition}-enter angular-toastify-${this.transition}-enter--${this.position}`;
    } else if (state === TransitionState.exiting) {
      base += `angular-toastify-${this.transition}-exit angular-toastify-${this.transition}-exit--${this.position}`;
    }

    return base;
  }

  ngOnInit(): void {
    this._toastService.dismissAllEvent.subscribe(() => {
      this.toasts = new Array<Toast>();
      this._cd.markForCheck();
    });

    this._toastService.toastAddedEvent.subscribe((toast: Toast) => this.handleToastAddedEvent(toast));
  }

  handleToastAddedEvent(toast: Toast): void {
    // If "preventDuplicates" is enabled, toast is not added if one toast with same message exists
    // The only thing to do is to update the toast time to keep it visible
    if(this.preventDuplicates === true) {
      const sameToast: Toast = this.toasts.find((existingToast) => existingToast.message === toast.message);
      if (sameToast) {
        sameToast.$resetToast.next();
        this._cd.markForCheck();
        return;
      }
    }

    // Add new toast transition
    this.toastTransitionDict[toast.id] = TransitionState.entering;
    setTimeout(() => {
      this.toastTransitionDict[toast.id] = TransitionState.noTransition;
      this._cd.markForCheck();
    }, this.transitionDurations);

    // Add new toast
    if (this.newestOnTop) {
      this.toasts.unshift(toast);
    } else {
      this.toasts.push(toast);
    }
    this._cd.markForCheck();
  }
}

enum TransitionState {
  entering,
  noTransition,
  exiting
}
