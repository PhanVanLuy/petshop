import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User ;
  constructor(private router: Router ) {
  }
  private getInformation(field: string): string {
    return this.user ? this.user.information ? this.user.information[field] : null : null;
  }
  // private updateUserInformation() {
  //   this.informationForm.controls.firstName.setValue(this.getInformation('firstName'));
  //   this.informationForm.controls.lastName.setValue(this.getInformation('lastName'));
  //   this.informationForm.controls.company.setValue(this.getInformation('company'));
  //   this.informationForm.controls.address.setValue(this.getInformation('address'));
  //   this.informationForm.controls.apartment.setValue(this.getInformation('apartment'));
  //   this.informationForm.controls.city.setValue(this.getInformation('city'));
  //   this.informationForm.controls.country.setValue(this.getInformation('country'));
  //   this.informationForm.controls.postalCode.setValue(this.getInformation('postalCode'));
  //   this.informationForm.controls.phone.setValue(this.getInformation('phone'));
  // }

}
