import { Component, OnInit } from '@angular/core';
import {UrlConstants} from '../../../constants/url-constants';
import {Constants} from '../../../constants/constants';

@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.scss']
})
export class CookiePolicyComponent implements OnInit {
    URL = UrlConstants;
    CONSTANTS = Constants;

  constructor() { }

  ngOnInit() {
  }

}
