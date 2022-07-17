import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {UrlConstants} from '../../../constants/url-constants';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  public loginValid = true;
  public email = '';
  public password = '';

  private readonly returnUrl: string;
  loginForm: FormGroup;
  url = UrlConstants.HOME;
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || UrlConstants.PRODUCTS;
  }
  ngOnInit() {
    sessionStorage.setItem('token', '');
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    this.email = this.loginForm.get('email').value;
    this.password = this.loginForm.get('password').value;
    const result = this.http.post(`${this.baseUrl}/login`, {
      email: this.email,
      password: this.password
    }).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem(
          'token',
          btoa(this.email + ':' + this.password)
        );
        this.router.navigateByUrl('/products');
      } else {
        alert('Authentication failed.');
      }
    });
  }

}
