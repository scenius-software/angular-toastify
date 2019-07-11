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
  private readonly transitionDurations = 1000;

  @Input() position: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left' = 'top-right';
  @Input() transition: 'bounce' | 'slide' | 'zoom' | 'flip' = 'bounce';
  @Input() autoClose = 5000;
  @Input() hideProgressBar = false;
  @Input() pauseOnHover = true;
  @Input() pauseOnVisibilityChange = true;
  @Input() closeOnClick = true;
  @Input() newestOnTop = false;
  @Input() iconLibrary: 'material' | 'font-awesome' | 'none' = 'none';

  ToastType = ToastType;
  toasts = new Array<Toast>();
  toastTransitionDict = {};

  constructor(private _toastService: ToastService, private _cd: ChangeDetectorRef) { }

  ngOnChanges(): void {
    this._cd.markForCheck();
  }

  dismiss(toast: Toast): void {
    this.toastTransitionDict[toast.time] = TransitionState.exiting;
    setTimeout(() => {
      const index = this.toasts.indexOf(toast);
      this.toasts.splice(index, 1);
      this._cd.markForCheck();
    }, this.transitionDurations);
  }

  getClass(toast: Toast): string {
    let base = `toast toast--${ToastType[toast.type]} `;
    if (this.toastTransitionDict[toast.time] === TransitionState.entering) {
      base += `${this.transition}-enter ${this.transition}-enter--${this.position}`;
    } else if (this.toastTransitionDict[toast.time] === TransitionState.exiting) {
      base += `${this.transition}-exit ${this.transition}-exit--${this.position}`;
    }
    return base;
  }

  ngOnInit(): void {
    this._toastService.dismissAllEvent.subscribe(() => {
      this.toasts = new Array<Toast>();
      this._cd.markForCheck();
    });

    this._toastService.toastAddedEvent.subscribe(toast => {
      this.toastTransitionDict[toast.time] = TransitionState.entering;
      setTimeout(() => {
        this.toastTransitionDict[toast.time] = TransitionState.noTransition;
        this._cd.markForCheck();
      }, this.transitionDurations);

      if (this.newestOnTop) {
        this.toasts.unshift(toast);
      } else {
        this.toasts.push(toast);
      }
      this._cd.markForCheck();
    });
  }
}

enum TransitionState {
  entering,
  noTransition,
  exiting
}
