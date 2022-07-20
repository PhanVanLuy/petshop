import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UrlConstants} from '../../../constants/url-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  passwordRef: '';
  emailRef: '';
  constructor(private  http: HttpClient) { }
  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  sendMail() {
    console.log(`${UrlConstants.LOCAL}/forgot_password`);
    return  this.http.post(`${UrlConstants.LOCAL}/forgot_password`, {
        email: this.forgotPasswordForm.get('email').value
    });
  }

  checkPasswordMatch(fieldConfirmPassword) {
    if (fieldConfirmPassword.value !== (this.forgotPasswordForm.get('password').value).value()) {
      fieldConfirmPassword.setCustomValidity('Passwords do not match!');
    } else {
      fieldConfirmPassword.setCustomValidity('');
    }
  }

}
