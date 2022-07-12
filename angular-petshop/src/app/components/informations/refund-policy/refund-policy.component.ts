import {Component, OnInit} from '@angular/core';
import {UrlConstants} from '../../../constants/url-constants';
import {Constants} from '../../../constants/constants';

@Component({
    selector: 'app-refund-policy',
    templateUrl: './refund-policy.component.html',
    styleUrls: ['./refund-policy.component.scss']
})
export class RefundPolicyComponent implements OnInit {
    URL = UrlConstants;
    CONSTANTS = Constants;

    constructor() {
    }

    ngOnInit() {
    }

}
