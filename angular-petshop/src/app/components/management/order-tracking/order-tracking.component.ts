import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {UrlConstants} from '../../../constants/url-constants';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderTrackingService} from '../../../services/order-tracking.service';
import * as _ from 'underscore';
import {OrderTracking} from '../../../models/order/order-tracking';
import {OrderStatusConstants} from '../../../constants/order-status-constants';
import {MatStepper} from '@angular/material/stepper';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PatternConstants} from '../../../constants/pattern-constants';
import {LoginModalService} from '../../../commons/modals/login-modal/login-modal.service';
import {AuthService} from '../../../services/auth.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-order-tracking',
    templateUrl: './order-tracking.component.html',
    styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit {

    @ViewChild('stepper', {static: false}) stepper: MatStepper;

    orderColumns = [
        'product',
        'price',
        'quantity',
        'subtotal',
    ];

    ORDER_STATUS = OrderStatusConstants;
    URL = UrlConstants;

    orderTracking: OrderTracking;
    searchOrderTracking = true;
    isVertical = false;

    orderTrackingForm: FormGroup;
    submitted = false;
    searchNotFound: string;

    ordersByEmail: Observable<string[]>;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private orderTrackingService: OrderTrackingService,
        public loginService: LoginModalService,
        public authService: AuthService
    ) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (!_.isEmpty(params)) {
                if (params.id) {
                    this.searchOrderTracking = false;
                    const id = params.id;
                    this.orderTrackingService.getOrder(id).subscribe(value => {
                        if (value == null) {
                            this.router.navigate([UrlConstants.ORDER_TRACKING]).then();
                            return;
                        }
                        this.orderTracking = value;
                    }, () => {
                        this.router.navigate([UrlConstants.ORDER_TRACKING]).then();
                        return;
                    });
                    return;
                }
            } else {
                this.searchOrderTracking = true;
                this.initialOrderTrackingForm();
                this.authService.user.subscribe(user => {
                    if (user) {
                        this.ordersByEmail = this.orderTrackingService.getOrdersByEmail(user.email);
                    }
                });
            }
        });
    }


    getCurrentStatus() {
        return this.ORDER_STATUS.ORDER_STATUS.findIndex(status => {
            return status === this.orderTracking.status;
        });
    }

    @HostListener('window:resize')
    onResize() {
        this.isVertical = window.innerWidth < 768;
    }

    private initialOrderTrackingForm() {
        this.submitted = false;
        this.orderTrackingForm = new FormGroup({
            order: new FormControl('', [Validators.required, Validators.pattern(PatternConstants.ID)]),
            email: new FormControl('', [Validators.required, Validators.pattern(PatternConstants.EMAIL)])
        });
    }

    onSubmitOrderTracking() {
        this.submitted = true;
        if (this.orderTrackingForm.invalid) {
            return;
        }
        const orderId = this.orderTrackingForm.controls.order.value;
        const email = this.orderTrackingForm.controls.email.value;
        const notFound = `${orderId} and ${email} did not match any orders`;
        this.orderTrackingService.getOrder(orderId).subscribe(value => {
            if (value == null) {
                this.searchNotFound = notFound;
                return;
            }
            if (value.information.email === email || value.billingInformation.email === email) {
                this.orderTracking = value;
                this.router.navigate([UrlConstants.ORDER_TRACKING, this.orderTracking.id]).then();
            } else {
                this.searchNotFound = notFound;
            }
        }, () => {
            this.searchNotFound = notFound;
        });
    }

}
