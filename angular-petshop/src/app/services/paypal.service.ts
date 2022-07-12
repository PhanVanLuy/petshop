import {Injectable} from '@angular/core';
import {OrderItem} from '../models/order/order-item';
import {DecimalPipe} from '@angular/common';
import {ToastService} from '../commons/toasts/toast.service';
import {ICreateOrderRequest, IPayPalConfig, ITransactionItem} from 'ngx-paypal';
import {Information} from '../models/information';
import {Subject} from 'rxjs';
import {ApiService} from './api.service';
import {CartService} from './cart.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {OrderTracking} from '../models/order/order-tracking';
import {OrderTrackingService} from './order-tracking.service';

@Injectable({
    providedIn: 'root'
})
export class PaypalService {

    private static CURRENCY_CODE = 'USD';
    private static CLIENT_ID = 'xxx';

    private orderItems: OrderItem[];
    private couponDiscount: number;
    private couponName: string;

    private information: Information;

    readonly config: IPayPalConfig;

    private orderConfirm = new Subject<OrderTracking>();

    get orderStatus() {
        return this.orderConfirm.asObservable();
    }

    constructor(
        private decimalPipe: DecimalPipe,
        private toastService: ToastService,
        private apiService: ApiService,
        private cartService: CartService,
        private spinnerService: NgxSpinnerService,
        private orderTrackingService: OrderTrackingService,
    ) {
        this.config = {
            currency: PaypalService.CURRENCY_CODE,
            clientId: PaypalService.CLIENT_ID,
            createOrderOnClient: () => {
                return this.getOrderRequest();
            },
            onApprove: () => {
                this.spinnerService.show().then();
                setTimeout(() => {
                    this.spinnerService.hide().then();
                }, 4000);

            },
            onClientAuthorization: (data) => {
                this.information.id = data.id;
                this.apiService.postOrder(this.information).subscribe(() => {});
                const orderTracking: OrderTracking = {
                    timestamps: {
                        received: undefined,
                        delivered: undefined,
                        preparingToShip: undefined,
                        processing: undefined,
                        shipped: undefined
                    },
                    id: data.id,
                    orderItems: [],
                    status: 'RECEIVED',
                    value: 0,
                    information: this.information,
                    billingInformation: {
                        email: data.payer.email_address,
                        firstName: data.payer.name.given_name,
                        lastName: data.payer.name.surname,
                    }
                };
                this.orderConfirm.next(orderTracking);
                this.orderTrackingService.setOrderTracking(orderTracking);
                this.cartService.clearCarts();
            },
            onCancel: () => {
                this.spinnerService.hide().then();
            },
            onError: (error) => {
                this.toastService.showError('Ops! Something wrong, try again!');
                this.spinnerService.hide().then();
            },
        };
    }

    updateOrderItems(orderItems: OrderItem[]) {
        this.orderItems = orderItems;
    }

    updateInformation(information: Information) {
        this.information = information;
    }

    updateCouponDiscount(couponDiscount: number, couponName: string) {
        this.couponName = couponName;
        this.couponDiscount = Number(this.decimalPipe.transform(couponDiscount, '.2-2'));
    }

    getOrderRequest(): ICreateOrderRequest {
        const transactionItems = this.getTransactionItems();
        if (this.couponDiscount) {
            let totalCount = 0;
            transactionItems.forEach(value => {
                totalCount += Number(value.quantity);
            });
            const currentCoupon = this.couponDiscount;
            const eachCoupon = Number(this.decimalPipe.transform(currentCoupon / totalCount, '.2-2'));
            transactionItems.map((value, index) => {
                let currentPricing = Number(value.unit_amount.value);
                currentPricing -= eachCoupon;
                currentPricing = Number(this.decimalPipe.transform(currentPricing, '.2-2'));
                value.unit_amount.value = currentPricing + '';
                value.name = value.name + ' - COUPON - ' + this.couponName;
                transactionItems[length - (index + 1)] = value;
            });
        }
        let finalTotals = 0;
        transactionItems.forEach(value => {
            finalTotals += Number(this.decimalPipe.transform(Number(value.quantity) * Number(value.unit_amount.value), '.2-2'));
        });
        return {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: PaypalService.CURRENCY_CODE,
                    value: (finalTotals) + '',
                    breakdown: {
                        item_total: {
                            currency_code: PaypalService.CURRENCY_CODE,
                            value: (finalTotals) + ''
                        }
                    }
                },
                items: transactionItems,
                shipping: {
                    name: {
                        full_name: this.information.firstName + ' ' + this.information.lastName
                    },
                    address: {
                        address_line_1: this.information.address,
                        address_line_2: this.information.apartment,
                        admin_area_2: this.information.city,
                        postal_code: this.information.postalCode,
                        country_code: this.information.country,
                    }
                }
            }],
            application_context: {
                shipping_preference: 'SET_PROVIDED_ADDRESS'
            },
            payer: {
                email_address: this.information.email,
            }
        };
    }

    getTransactionItems(): ITransactionItem[] {
        return this.orderItems.map(orderItem => {
            return {
                name: orderItem.name,
                description: orderItem.description,
                quantity: orderItem.quantity + '',
                category: 'PHYSICAL_GOODS',
                unit_amount: {
                    currency_code: PaypalService.CURRENCY_CODE,
                    value: orderItem.value + ''
                }
            };
        });
    }

}
