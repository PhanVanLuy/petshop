import {Component, OnInit} from '@angular/core';
import {UrlConstants} from '../../../constants/url-constants';
import {Constants} from '../../../constants/constants';

@Component({
    selector: 'app-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
    URL = UrlConstants;
    CONSTANTS = Constants;

    constructor() {
    }

    ngOnInit() {
    }

}
