import {Component, OnInit} from '@angular/core';
import {UrlConstants} from '../../../../constants/url-constants';
import {AuthService} from '../../../../services/auth.service';
import {LoginModalService} from '../../../../commons/modals/login-modal/login-modal.service';
import {Constants} from '../../../../constants/constants';
import {TitleConstants} from '../../../../constants/title-constants';

@Component({
    selector: 'app-footer-middle',
    templateUrl: './footer-middle.component.html',
    styleUrls: ['./footer-middle.component.scss']
})
export class FooterMiddleComponent implements OnInit {
    URL = UrlConstants;
    TITLE = TitleConstants;
    CONSTANTS = Constants;

    constructor(
        public auth: AuthService,
        public loginService: LoginModalService,
    ) {
    }

    ngOnInit() {
    }

}
