import {Component, OnInit} from '@angular/core';
import {UrlConstants} from '../../../constants/url-constants';
import {Constants} from '../../../constants/constants';

@Component({
    selector: 'app-user-policy',
    templateUrl: './user-policy.component.html',
    styleUrls: ['./user-policy.component.scss']
})
export class UserPolicyComponent implements OnInit {
    URL = UrlConstants;
    CONSTANTS = Constants;

    constructor() {
    }

    ngOnInit() {
    }

}
