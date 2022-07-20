import { Component, OnInit } from '@angular/core';
import {UrlConstants} from '../../constants/url-constants';
import {User} from '../../models/user';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private subscription: Subscription;
  URL = UrlConstants;

  user: User;

  loading = false;
  isChanging: boolean;
  informationForm: FormGroup;
  informationSubmitted: boolean;

  errorMessage = '';
  successMessage = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.subscription = this.authService.user.subscribe(user => {
        if (user) {
          this.user = user;
          this.updateUserInformation();
        } else {
          this.subscription.unsubscribe();
          this.router.navigateByUrl(UrlConstants.HOME).then();
        }
      });
  }

  private initialInformationForm() {
    this.informationSubmitted = false;
    this.informationForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      company: new FormControl(''),
      address: new FormControl(''),
      apartment: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      postalCode: new FormControl(''),
      phone: new FormControl('')
    });
    this.isChangingStatus();
  }

  private isChangingStatus() {
    if (this.isChanging) {
      this.informationForm.enable();
      this.successMessage = false;
    } else {
      this.informationForm.disable();
    }
  }

  private getInformation(field: string): string {
    return this.user ? this.user.information ? this.user.information[field] : null : null;
  }
  private updateUserInformation() {
    this.informationForm.controls.firstName.setValue(this.getInformation('firstName'));
    this.informationForm.controls.lastName.setValue(this.getInformation('lastName'));
    this.informationForm.controls.company.setValue(this.getInformation('company'));
    this.informationForm.controls.address.setValue(this.getInformation('address'));
    this.informationForm.controls.apartment.setValue(this.getInformation('apartment'));
    this.informationForm.controls.city.setValue(this.getInformation('city'));
    this.informationForm.controls.country.setValue(this.getInformation('country'));
    this.informationForm.controls.postalCode.setValue(this.getInformation('postalCode'));
    this.informationForm.controls.phone.setValue(this.getInformation('phone'));
  }

  onSubmitFormInformation() {

    this.informationSubmitted = true;
    if (this.informationForm.invalid) {
      return;
    }
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.authService.updateUserInformation(this.user.uid, this.informationForm.value).toPromise().then(() => {
      this.successMessage = true;
      this.loading = false;
      this.changeInformationClick();
    }).catch(reason => {
      if (reason && reason.statusText) {
        this.errorMessage = reason.statusText;
      }
      this.loading = false;
    });
  }
  changeInformationClick() {
    this.isChanging = !this.isChanging;
    this.isChangingStatus();
    this.updateUserInformation();
  }
}
