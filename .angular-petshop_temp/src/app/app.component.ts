import { Component } from '@angular/core';
import {UrlConstants} from './constants/url-constants';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  URL = UrlConstants;
  constructor( private router: Router,
               private auth: AuthService) {
  }
  login() {
    this.router.navigate([this.URL.SYMBOL + this.URL.LOGIN]).then();
  }

}
