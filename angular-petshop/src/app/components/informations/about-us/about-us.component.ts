import {Component, OnInit} from '@angular/core';
import {AssetsConstants} from '../../../constants/assets-constants';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
    ASSET = AssetsConstants;

    constructor() {
    }

    ngOnInit() {
    }

}
