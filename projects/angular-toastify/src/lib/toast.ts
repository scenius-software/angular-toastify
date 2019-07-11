import { ToastType } from './toast-type';

export class Toast {
    message: string;
    type: ToastType;
    readonly time: number;

    constructor(message: string, type: ToastType) {
        this.message = message;
        this.type = type;
        this.time = new Date().getTime();
    }
}