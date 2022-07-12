import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {LoginModalComponent} from './login-modal.component';

@Injectable({
    providedIn: 'root'
})
export class LoginModalService {
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {
    }

    login() {
        this.bsModalRef = this.modalService.show(LoginModalComponent);
    }
}
