import {Injectable, TemplateRef} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    toasts: any[] = [];

    show(text: string | TemplateRef<any>, options: any = {}) {
        this.toasts.push({text, ...options});
    }

    remove(toast) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

    showSuccess(text: string) {
        this.show(text, {
            headerTitle: 'Status'
        });
    }

    showError(text: string) {
        this.show(text, {
            customClass: 'bg-danger text-light',
            headerTitle: 'Error'
        });

    }
}
