import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {AuthService} from '../../../services/auth.service';
import {HistoryService} from "../../../services/history.service";

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

    constructor(
        public bsModalRef: BsModalRef,
        private auth: AuthService,
        private historyService: HistoryService,
    ) {
    }

    ngOnInit() {
    }

    googleSignIn() {
        this.auth.googleSignIn().then(() => {
            this.historyService.logLogin().then();
            this.bsModalRef.hide();
        }).catch(() => {
            this.bsModalRef.hide();
        });
    }

    facebookSignIn() {
        this.auth.facebookSignIn().then(() => {
            this.historyService.logLogin().then();
            this.bsModalRef.hide();
        }).catch(() => {
            this.bsModalRef.hide();
        });
    }
}
