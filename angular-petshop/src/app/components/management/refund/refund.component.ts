import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderTrackingService} from '../../../services/order-tracking.service';
import {OrderTracking} from '../../../models/order/order-tracking';
import {UrlConstants} from '../../../constants/url-constants';
import {AuthService} from '../../../services/auth.service';
import {LoginModalService} from '../../../commons/modals/login-modal/login-modal.service';
import {PatternConstants} from '../../../constants/pattern-constants';
import {ConfirmModalService} from '../../../commons/modals/confirm-modal/confirm-modal.service';
import {InformationModalService} from '../../../commons/modals/information-modal/information-modal.service';
import {ApiService} from '../../../services/api.service';
import {HistoryService} from '../../../services/history.service';

@Component({
    selector: 'app-refund',
    templateUrl: './refund.component.html',
    styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {

    orderForm: FormGroup;
    submitted = false;
    searchNotFound: string;

    orderTracking: OrderTracking;

    ordersByEmail: any[] = [];
    URL = UrlConstants;

    constructor(
        private orderTrackingService: OrderTrackingService,
        public authService: AuthService,
        public loginService: LoginModalService,
        private confirmModalService: ConfirmModalService,
        private informationModalService: InformationModalService,
        private apiService: ApiService,
        private historyService: HistoryService,
    ) {
    }

    ngOnInit() {
        this.submitted = false;
        this.orderForm = new FormGroup({
            order: new FormControl('', [Validators.required, Validators.pattern(PatternConstants.ID)]),
            email: new FormControl('', [Validators.required, Validators.pattern(PatternConstants.EMAIL)])
        });
        this.authService.user.subscribe(user => {
            if (user) {
                this.orderTrackingService.getOrdersByEmail(user.email).subscribe(value => {
                    this.ordersByEmail = [];
                    value.forEach(value1 => {
                        this.orderTrackingService.getOrderHaveBeenDelivered(value1).subscribe(value2 => {
                            if (value2) {
                                this.ordersByEmail.push(value2);
                            }
                        });
                    });
                });
            }
        });
    }

    onSubmitSearchOrder() {
        this.submitted = true;
        this.searchNotFound = '';
        if (this.orderForm.invalid) {
            return;
        }
        const orderId = this.orderForm.controls.order.value;
        const email = this.orderForm.controls.email.value;
        const notFound = `${orderId} and ${email} did not match any orders have been delivered`;
        this.orderTrackingService.getOrderHaveBeenDelivered(orderId).subscribe(value => {
            if (value == null) {
                this.searchNotFound = notFound;
                return;
            }
            if (value.information.email === email || value.billingInformation.email === email) {
                this.orderTracking = value;
            } else {
                this.searchNotFound = notFound;
            }
        }, () => {
            this.searchNotFound = notFound;
        });
    }

    refund(order: string) {
        this.confirmModalService.confirm('Are you sure want to refund ' + order + ' ?').subscribe(value => {
            if (value) {
                this.historyService.logRefund(order).then();
                this.apiService.postRefundMessage({
                    orderId: order
                }).subscribe(() => {
                    // tslint:disable-next-line:max-line-length
                    this.informationModalService.open('Your request to refund ' + order + ' have been sent. Please waiting for email confirm your request.');
                }, () => {
                    this.informationModalService.open('Something wrong. Pls try again!!');
                });
            }
        });
    }
}
