import { ToastType } from './toast-type';
import { Observable, Subject } from 'rxjs';

let toastIdentitySequence = 0;

export class Toast {
    id: number;
    message: string;
    type: ToastType;
    readonly time: number;

    $resetToast: Subject<any>;

    constructor(message: string, type: ToastType) {
        this.message = message;
        this.type = type;
        this.time = new Date().getTime();
        this.id = toastIdentitySequence++;

        this.$resetToast = new Subject();
    }
}
