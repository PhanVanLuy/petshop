import { Component, OnInit } from '@angular/core';
import {UrlConstants} from '../../../constants/url-constants';
import {Constants} from '../../../constants/constants';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {
    URL = UrlConstants;
    CONSTANTS = Constants;

  constructor() { }

  ngOnInit() {
  }

}
