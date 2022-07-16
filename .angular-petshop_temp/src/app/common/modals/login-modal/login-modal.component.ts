import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {HistoryService} from '../../../services/history.service';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

    constructor(
        private auth: AuthService,
        private historyService: HistoryService,
    ) {
    }

    loginForm: FormGroup;

    ngOnInit() {
    }
}
