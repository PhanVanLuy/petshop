import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {UrlConstants} from '../../../constants/url-constants';
import {HttpClient} from '@angular/common/http';
import {userError} from '@angular/compiler-cli/src/transformers/util';
import {map} from 'rxjs-compat/operator/map';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  public loginValid = true;

  private readonly returnUrl: string;
  loginForm: FormGroup;
  url = UrlConstants.HOME;
  forgot = UrlConstants.FORGOT_PASSWORD;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private http: HttpClient
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || UrlConstants.PRODUCTS;
  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  login() {
    this.auth.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }


}
