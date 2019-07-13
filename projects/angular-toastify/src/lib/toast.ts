import { ToastType } from './toast-type';

let toastIdentitySequence = 0;

export class Toast {
    id: number;
    message: string;
    type: ToastType;
    readonly time: number;

    constructor(message: string, type: ToastType) {
        this.message = message;
        this.type = type;
        this.time = new Date().getTime();
        this.id = toastIdentitySequence++;
    }
}
