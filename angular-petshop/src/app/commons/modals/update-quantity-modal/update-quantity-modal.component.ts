import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Subject} from "rxjs";
import {ToastService} from "../../toasts/toast.service";

@Component({
    selector: 'app-update-quantity-modal',
    templateUrl: './update-quantity-modal.component.html',
    styleUrls: ['./update-quantity-modal.component.scss']
})
export class UpdateQuantityModalComponent implements OnInit {

    public updatedQuantity: Subject<number>;

    public quantity: any;

    constructor(
        public bsModalRef: BsModalRef,
        private toastService: ToastService
    ) {
    }

    ngOnInit() {
        this.updatedQuantity = new Subject();
    }

    public onConfirm(): void {
        if (this.quantity > 3 || this.quantity < 1) {
            this.quantity = this.quantity > 3 ? 3 : 1;
            this.toastService.showError('Quantity should be from 1 to 3');
            return;
        }
        this.updatedQuantity.next(this.quantity);
        this.bsModalRef.hide();
    }

    public onCancel(): void {
        this.bsModalRef.hide();
    }

}
