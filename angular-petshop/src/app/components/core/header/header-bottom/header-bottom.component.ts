import {Component, OnInit} from '@angular/core';
import {UrlConstants} from '../../../../constants/url-constants';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {LoginModalService} from '../../../../commons/modals/login-modal/login-modal.service';
import {TitleConstants} from '../../../../constants/title-constants';
import {Router} from "@angular/router";
import {HistoryService} from "../../../../services/history.service";

@Component({
    selector: 'app-header-bottom',
    templateUrl: './header-bottom.component.html',
    styleUrls: ['./header-bottom.component.scss']
})
export class HeaderBottomComponent implements OnInit {
    URL = UrlConstants;
    TITLE = TitleConstants;

    searchProducts = new FormGroup({
        keyword: new FormControl(''),
    });

    constructor(
        public auth: AuthService,
        public loginService: LoginModalService,
        private router: Router,
        private historyService: HistoryService,
    ) {
    }

    ngOnInit() {
    }

    onSearchSubmit() {
        this.router.navigate([UrlConstants.SEARCH],
            {
                queryParams: {'q': this.searchProducts.controls.keyword.value},
            }).then(() => {
            window.location.reload();
        });
    }

    logout() {
        this.historyService.logLogout().then(() => {
            this.auth.signOut();
        });
    }
}
