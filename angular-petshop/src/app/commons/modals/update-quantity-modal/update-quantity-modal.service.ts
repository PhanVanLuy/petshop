import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {UpdateQuantityModalComponent} from "./update-quantity-modal.component";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UpdateQuantityModalService {
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {
    }

    updateQuantity(quantity: number): Observable<number> {
        this.bsModalRef = this.modalService.show(UpdateQuantityModalComponent);
        this.bsModalRef.content.quantity = quantity;
        return this.bsModalRef.content.updatedQuantity;
    }
}
