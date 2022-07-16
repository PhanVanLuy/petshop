import {Component, OnInit, TemplateRef} from '@angular/core';
import {ToastService} from '../toast.service';

@Component({
    selector: 'app-toasts',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
    ngOnInit(): void {
    }

    constructor(public toastService: ToastService) {
    }

    isTemplate(toast) {
        return toast.textOrTpl instanceof TemplateRef;
    }

}
