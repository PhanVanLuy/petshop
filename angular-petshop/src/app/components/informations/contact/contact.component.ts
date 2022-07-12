import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {UrlConstants} from '../../../constants/url-constants';
import {Constants} from '../../../constants/constants';
// noinspection ES6UnusedImports
import {} from 'googlemaps';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../services/api.service';


@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewChecked {
    URL = UrlConstants;
    CONSTANTS = Constants;

    addScript = false;

    // @ts-ignore
    @ViewChild('map') mapElement: any;

    contactForm: FormGroup;
    submitted = false;
    loading = false;
    errorMessage = '';
    successMessage = false;

    constructor(
        private apiService: ApiService
    ) {
    }

    ngOnInit() {
        this.contactForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            message: new FormControl('', [Validators.required, Validators.minLength(30), Validators.maxLength(500)])
        });
    }

    onSubmitMessage() {
        this.errorMessage = '';
        this.successMessage = false;
        this.submitted = true;
        if (this.contactForm.invalid) {
            return;
        }
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.apiService.postContactMessage(this.contactForm.value).subscribe(() => {
            this.successMessage = true;
            this.loading = false;
        }, error => {
            if (error && error.statusText) {
                this.errorMessage = error.statusText;
            }
            this.loading = false;
        });
        this.contactForm.reset();
        this.submitted = false;
    }

    get name() {
        return this.contactForm.get('name');
    }

    get email() {
        return this.contactForm.get('email');
    }

    get message() {
        return this.contactForm.get('message');
    }

    ngAfterViewChecked(): void {
        if (!this.addScript) {
            this.loadScript().then(() => {
                const myCenter = new google.maps.LatLng(10.8492753, 106.8000577);
                const mapProperties = {
                    center: myCenter,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                const mapElement = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
                const marker = new google.maps.Marker({
                    position: myCenter,
                    icon: 'xxx',
                    map: mapElement,
                });
                marker.setMap(mapElement);
            });
        }
    }
    loadScript() {
        this.addScript = true;
        return new Promise((resolve) => {
            const scriptElement = document.createElement('script');
            scriptElement.src = 'xxx';
            scriptElement.onload = resolve;
            document.body.appendChild(scriptElement);
        });
    }
}
