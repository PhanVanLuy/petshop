import {Component, OnInit} from '@angular/core';
import {AssetsConstants} from '../../../constants/assets-constants';
import {UrlConstants} from '../../../constants/url-constants';
import {TitleConstants} from '../../../constants/title-constants';
import {NavigationEnd, Router} from '@angular/router';


@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
    ASSERTS = AssetsConstants;
    URL = UrlConstants;
    TITLE = TitleConstants;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

}
