import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {InformationModalComponent} from "./information-modal.component";

@Injectable({
    providedIn: 'root'
})
export class InformationModalService {

    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {
    }

    open(content: string) {
        this.bsModalRef = this.modalService.show(InformationModalComponent);
        this.bsModalRef.content.content = content;
    }
}
