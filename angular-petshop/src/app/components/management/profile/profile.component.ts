import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UrlConstants} from "../../../constants/url-constants";
import {User} from "../../../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CountryCodeConstants} from "../../../constants/country-code-constants";
import {HistoryService} from "../../../services/history.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    private subscription: Subscription;

    URL = UrlConstants;
    COUNTRY_CODES = CountryCodeConstants.COUNTRY_CODES;

    user: User;

    informationForm: FormGroup;

    informationSubmitted: boolean;
    isChanging: boolean;
    currentCountry: string;
    loading = false;
    errorMessage = '';
    successMessage = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private historyService: HistoryService,
    ) {
    }

    ngOnInit() {
        this.informationSubmitted = false;
        this.isChanging = false;
        this.subscription = this.authService.user.subscribe(user => {
            if (user) {
                this.user = user;
                this.updateUserInformation();
            } else {
                this.subscription.unsubscribe();
                this.router.navigate([UrlConstants.INDEX]).then();
            }
        });
        this.initialInformationForm();
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

    onSubmitFormInformation() {

        this.informationSubmitted = true;
        if (this.informationForm.invalid) {
            return;
        }
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.historyService.logChangeProfile().then();
        this.authService.updateUserInformation(this.user.uid, this.informationForm.value).then(() => {
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

    changeCountry() {
        const country = this.COUNTRY_CODES.find(value => {
            return value.code === this.informationForm.controls.country.value;
        });
        if (!country) {
            this.informationForm.controls.postalCode.setValidators([Validators.required]);
        } else {
            this.informationForm.controls.postalCode.setValidators(country.postalCode ? Validators.required : null);
        }
        this.informationForm.controls.postalCode.updateValueAndValidity();
        const index = this.COUNTRY_CODES.findIndex(value => value.code === this.informationForm.controls.country.value);
        this.currentCountry = this.COUNTRY_CODES[index].value;
    }

    changeInformationClick() {
        this.isChanging = !this.isChanging;
        this.isChangingStatus();
        this.updateUserInformation();
    }

    private isChangingStatus() {
        if (this.isChanging) {
            this.informationForm.enable();
            this.successMessage = false;
        } else {
            this.informationForm.disable();
        }
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

    private getInformation(field: string): string {
        return this.user ? this.user.information ? this.user.information[field] : null : null;
    }
}
