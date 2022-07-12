import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ConfirmModalComponent} from "./confirm-modal.component";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ConfirmModalService {
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {
    }

    confirm(content: string): Observable<boolean> {
        this.bsModalRef = this.modalService.show(ConfirmModalComponent);
        this.bsModalRef.content.content = content;
        return this.bsModalRef.content.onClose;
    }
}
