import { Component } from '@angular/core';
import { Product } from './common/product';
import {UrlConstants} from './constants/url-constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  URL = UrlConstants;
  constructor( private router: Router) {
  }
  login() {
    this.router.navigate([this.URL.SYMBOL + this.URL.LOGIN]).then();
  }
}
