import {
  Component, OnInit, Input, HostListener, Output, EventEmitter,
  OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { ToastType } from '../toast-type';
import { Toast } from '../toast';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lib-toastify-toast',
  templateUrl: './toastify-toast.component.html',
  styleUrls: ['./toastify-toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastifyToastComponent implements OnInit, OnDestroy {

  @Input() autoClose = 5000;
  @Input() hideProgressBar = false;
  @Input() pauseOnHover = true;
  @Input() pauseOnVisibilityChange = true;
  @Input() closeOnClick = true;
  @Input() toast: Toast;
  @Input() iconLibrary: 'material' | 'font-awesome' | 'none';

  @Output() dismissEvent = new EventEmitter();

  private autoDismissTimeout: any;
  private autoCloseRemaining: number;

  private pauseTime: number;
  private startTime: number;

  ToastType = ToastType;
  running = false;

  constructor(private _cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.autoCloseRemaining = this.autoClose;
    this.startTime = this.toast.time;
    // Do not start timer when toast is prompted while window is out of focus
    if (this.handleVisibilityChange && document.visibilityState === 'visible') {
      this.startCloseTimer();
    }
  }

  ngOnDestroy(): void {
    this.clearTimerTimeout();
  }

  startCloseTimer(): void {
    if (this.running || !this.autoClose) {
      return;
    }

    this.startTime = new Date().getTime();
    this.running = true;
    this.autoDismissTimeout = setTimeout(() => {
      this.dismissEvent.emit();
      this._cd.markForCheck();
    }, this.autoCloseRemaining);
  }

  pauseCloseTimer(): void {
    this.running = false;
    this.clearTimerTimeout();

    // Calculate the elapsed time, subtract remaining time
    this.pauseTime = new Date().getTime();
    const elapsed = this.pauseTime - this.startTime;
    this.autoCloseRemaining -= elapsed;
  }

  clearTimerTimeout(): void {
    if (this.autoDismissTimeout !== undefined) {
      clearTimeout(this.autoDismissTimeout);
    }
  }

  handleDismissButtonAction(): void {
    if (this.closeOnClick) {
      return; // Let the other event handle the dismissal
    }

    this.clearTimerTimeout();
    this.dismissEvent.emit();
  }

  @HostListener('click')
  handleHostClick(): void {
    if (this.closeOnClick) {
      this.clearTimerTimeout();
      this.dismissEvent.emit();
    }
  }

  @HostListener('mouseenter')
  handleMouseEnter(): void {
    if (this.pauseOnHover) {
      this.pauseCloseTimer();
    }
  }

  @HostListener('mouseleave')
  handleMouseLeave(): void {
    if (this.pauseOnHover) {
      this.startCloseTimer();
    }
  }

  @HostListener('document:visibilitychange')
  handleVisibilityChange(): void {
    if (!this.pauseOnVisibilityChange) {
      return;
    }

    if (document.visibilityState !== 'visible') {
      this.pauseCloseTimer();
      this._cd.detectChanges();
    } else {
      this.startCloseTimer();
    }
  }
}
