import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ToastType } from "../toast-type";
import { Toast } from "../toast";
import { interval } from "rxjs";
import { throttle, throttleTime } from "rxjs/operators";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "lib-toastify-toast",
  templateUrl: "./toastify-toast.component.html",
  styleUrls: ["./toastify-toast.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastifyToastComponent implements OnInit, OnDestroy {
  @ViewChild("progressBar") progressBar: ElementRef<HTMLElement>;

  @Input() autoClose = 5000;
  @Input() hideProgressBar = false;
  @Input() pauseOnHover = true;
  @Input() pauseOnVisibilityChange = true;
  @Input() closeOnClick = true;
  @Input() toast: Toast;
  @Input() iconLibrary: "material" | "font-awesome" | "none";

  @Output() dismissEvent = new EventEmitter();

  private expectedAutoDismissTime: number;
  private autoDismissTimeout: any;
  private autoCloseRemaining: number;

  private pauseTime: number;
  private startTime: number;

  private _progressBarAnimation: number;
  private _$updateTimer;

  ToastType = ToastType;
  running = false;

  constructor(private _cd: ChangeDetectorRef, private _zone: NgZone) {}

  ngOnInit(): void {
    this.autoCloseRemaining = this.autoClose;
    this.startTime = this.toast.time;
    this.toast.$resetToast.subscribe(() => this.resetToastTimer());
    // Do not start timer when toast is prompted while window is out of focus
    if (this.handleVisibilityChange && document.visibilityState === "visible") {
      this.startCloseTimer();
    }

    // Start progress bar animation
    this.triggerProgressBarAnimation();
  }

  private triggerProgressBarAnimation(): void {
    // Cancel previous animlation to avoid leaks
    if (this._progressBarAnimation !== undefined) {
      cancelAnimationFrame(this._progressBarAnimation);
    }

    // Start animation
    const frame = () => {
      if (this.running) {
        const remainingTime = Math.max(0, this.expectedAutoDismissTime - new Date().getTime());
        const percentage = (remainingTime / this.autoClose) * 100;
        this.progressBar.nativeElement.style.width = percentage + "%";
        if (percentage <= 0) return;
      }
      this._progressBarAnimation = requestAnimationFrame(frame);
    };
    this._progressBarAnimation = requestAnimationFrame(frame);
  }

  ngOnDestroy(): void {
    // Cancel animation
    if (this._progressBarAnimation) {
      cancelAnimationFrame(this._progressBarAnimation);
      this._progressBarAnimation = undefined;
    }
    // Clear auto close timeout
    this.clearTimerTimeout();
    // Complete all observables
    this.toast.$resetToast?.complete();
    this.toast.$resetToast = null;
    this._$updateTimer?.complete();
    this._$updateTimer = null;
  }

  startCloseTimer(): void {
    if (this.running || !this.autoClose) {
      return;
    }

    this.running = true;
    this.expectedAutoDismissTime =
      new Date().getTime() + this.autoCloseRemaining;
    this.autoDismissTimeout = this._zone.runOutsideAngular(() =>
      setTimeout(() => {
        this._zone.run(() => {
          this.dismissEvent.emit();
          this._cd.markForCheck();
        });
      }, this.autoCloseRemaining)
    );
  }

  pauseCloseTimer(): void {
    this.running = false;
    this.clearTimerTimeout();

    // Calculate the elapsed time, subtract remaining time
    this.pauseTime = new Date().getTime();
    const elapsed = this.pauseTime - this.startTime;
    this.autoCloseRemaining = this.autoClose - elapsed;
  }

  resetToastTimer() {
    this.clearTimerTimeout();
    this.running = false;
    this.startTime = new Date().getTime();
    this.autoCloseRemaining = this.autoClose;
    this.startCloseTimer();
  }

  clearTimerTimeout(): void {
    if (this.autoDismissTimeout !== undefined) {
      this.expectedAutoDismissTime = undefined;
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

  @HostListener("click")
  handleHostClick(): void {
    if (this.closeOnClick) {
      this.clearTimerTimeout();
      this.dismissEvent.emit();
    }
  }

  @HostListener("mouseenter")
  handleMouseEnter(): void {
    if (this.pauseOnHover) {
      this.pauseCloseTimer();
    }
  }

  @HostListener("mouseleave")
  handleMouseLeave(): void {
    if (this.pauseOnHover) {
      this.startCloseTimer();
      this.startTime = new Date().getTime() + (this.startTime - this.pauseTime);
    }
  }

  @HostListener("document:visibilitychange")
  handleVisibilityChange(): void {
    if (!this.pauseOnVisibilityChange) {
      return;
    }

    if (document.visibilityState !== "visible") {
      this.pauseCloseTimer();
      this._cd.detectChanges();
    } else {
      this.startCloseTimer();
    }
  }
}
