import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {LoginModalService} from "../../../commons/modals/login-modal/login-modal.service";
import {History} from "../../../models/history";
import {HistoryService} from "../../../services/history.service";
import {HistoryType} from "../../../constants/history-type";
import {UrlConstants} from "../../../constants/url-constants";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

    constructor(
        public authService: AuthService,
        public loginModalService: LoginModalService,
        private historyService: HistoryService,
    ) {
    }

    HISTORY_TYPE = HistoryType;
    URL = UrlConstants;

    histories: History[];

    ngOnInit() {
        this.authService.user.subscribe(value => {
            if (value) {
                this.historyService.getHistories(value.uid).subscribe(histories => {
                    this.histories = histories.reverse();
                });
            }
        });
    }

}
