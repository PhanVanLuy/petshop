/* tslint:disable:object-literal-key-quotes */
import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UrlConstants} from '../../../constants/url-constants';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'underscore';
import {ProductService} from '../../../services/product.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {CartService} from '../../../services/cart.service';
import {Cart} from '../../../models/cart';
import {Product} from '../../../models/product/product';
import {CouponService} from '../../../services/coupon.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Coupon} from '../../../models/coupon';
import {CouponConstants} from '../../../constants/coupon-constants';
import {ApiService} from '../../../services/api.service';
import {PaypalService} from '../../../services/paypal.service';
import {DecimalPipe} from '@angular/common';
import {LoginModalService} from '../../../commons/modals/login-modal/login-modal.service';
import {PatternConstants} from '../../../constants/pattern-constants';
import {CountryCodeConstants} from '../../../constants/country-code-constants';
import {Information} from '../../../models/information';
import {BillingInformation} from '../../../models/order/billing-information';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user";
import {HistoryService} from "../../../services/history.service";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService,
        public couponService: CouponService,
        private apiService: ApiService,
        public paypalService: PaypalService,
        private decimalPipe: DecimalPipe,
        public loginService: LoginModalService,
        public authService: AuthService,
        private historyService: HistoryService,
    ) {
    }

    get couponInput() {
        return this.couponForm.get('coupon');
    }

    shippingStatus = false;

    URL = UrlConstants;

    COUNTRY_CODES = CountryCodeConstants.COUNTRY_CODES;

    products: Observable<Cart[]>;

    count: Observable<number>;

    totals: Observable<number>;

    couponForm: FormGroup;

    totalValue: number;
    coupon: Coupon;
    couponDiscount: number;
    finalTotals: number;

    submitted: boolean;
    isLoading: boolean;
    couponMessage: string;
    isSuccess: boolean;

    public isCollapsed = false;

    shippingAddressForm: FormGroup;
    shipSubmitted: boolean;

    currentCountry: string;

    shippingInformation: Information;
    billingInformation: BillingInformation;
    successOrder = false;

    private static getInformation(user: User, field: string): string {
        return user ? user.information ? user.information[field] : null : null;
    }

    ngOnInit() {
        this.successOrder = false;

        this.isCollapsed = window.innerWidth < 768;
        this.activatedRoute.params.subscribe(params => {
            if (!_.isEmpty(params)) {
                if (params.id) {
                    const url = params.id;
                    const splits = url.split('-');
                    const id = splits[0];
                    this.productService.getProduct(id).subscribe(value => {
                        if (value == null) {
                            this.router.navigate([UrlConstants.CHECKOUT]).then();
                            return;
                        }
                        const cart = this.getCart(value, splits);
                        if (!cart) {
                            this.router.navigate([UrlConstants.CHECKOUT]).then();
                            return;
                        }
                        this.products = new BehaviorSubject<Cart[]>([cart]).asObservable();
                        this.count = new BehaviorSubject<number>(1).asObservable();
                        this.totals = new BehaviorSubject<number>(cart.currentPricing * cart.quantity).asObservable();
                        this.subscribeSubject();
                    }, () => {
                        this.router.navigate([UrlConstants.CHECKOUT]).then();
                        return;
                    });
                    return;
                }
            } else {
                this.products = this.cartService.products;
                this.count = this.cartService.count;
                this.totals = this.cartService.totals;
                this.subscribeSubject();
            }
        });

        this.couponForm = new FormGroup({
            coupon: new FormControl('', Validators.required)
        });
        this.submitted = false;
        this.isLoading = false;

        this.initialShippingAddressForm();
    }

    ngOnDestroy(): void {
    }

    applyCoupon() {
        this.submitted = true;
        if (this.couponForm.invalid) {
            return;
        }

        if (this.isLoading) {
            return;
        }

        this.isLoading = true;
        const lastCoupon = this.couponForm.controls.coupon.value;
        this.apiService.postCheckCoupon(this.couponForm.value).subscribe(value => {
            if (lastCoupon === value.name) {
                this.couponService.update(value);
                this.isSuccess = true;
            } else {
                this.couponMessage = value.name;
                this.isSuccess = false;
            }
            this.isLoading = false;
        }, error => {
            if (error && error.statusText) {
                this.couponMessage = error.statusText;
            }
            this.isSuccess = false;
            this.isLoading = false;
        });

        this.couponForm.reset();
        this.submitted = false;

    }

    private calculateTotals() {
        this.couponDiscount = 0;
        let couponName = '';
        if (this.coupon) {
            if (this.coupon.type === CouponConstants.PERCENTAGE) {
                this.couponDiscount = Number(this.decimalPipe.transform((this.totalValue / 100) * this.coupon.value, '.2-2'));
            } else if (this.coupon.type === CouponConstants.DISCOUNT) {
                this.couponDiscount = this.coupon.value;
            }
            couponName = this.coupon.name;
        }
        this.finalTotals = this.totalValue - this.couponDiscount;
        this.paypalService.updateCouponDiscount(this.couponDiscount, couponName);
    }

    private subscribeSubject() {
        this.apiService.getCountryCode().subscribe(value => {
            const index = this.COUNTRY_CODES.findIndex(country => country.code === value.country_code);
            if (index === -1) {
                this.shippingAddressForm.patchValue({
                    country: 'US'
                });
            } else {
                this.shippingAddressForm.patchValue({
                    country: this.COUNTRY_CODES[index].code
                });
            }
            this.changeCountry();
        }, () => {
            this.shippingAddressForm.patchValue({
                country: 'US'
            });
            this.changeCountry();
        });
        this.totals.subscribe(value => {
            this.totalValue = value;
            this.calculateTotals();
        });

        this.couponService.coupon.subscribe(value => {
            if (value) {
                this.coupon = value;
                this.calculateTotals();
            }
        });

        this.products.subscribe(products => {
            this.paypalService.updateOrderItems(products.map(product => {
                return {
                    id: product.id,
                    // tslint:disable-next-line:max-line-length
                    name: (product.title.length < 50 ? product.title : product.title.substr(0, 50)) + ' ' + product.combinedValues.join(' - ') + ' ' + product.note,
                    description: product.id + ' - ' + product.combinedValues.join(' - ') + ' - ' + product.note,
                    quantity: product.quantity,
                    value: product.currentPricing,
                };
            }));
        });

        this.paypalService.orderStatus.subscribe(value => {
            this.shippingInformation = value.information;
            this.billingInformation = value.billingInformation;
            window.scrollTo(0, 0);
            this.successOrder = true;
            this.historyService.logPurchase(value.id).then();
        });

        this.authService.user.subscribe(user => {
            if (user) {
                this.updateInformation(user);
            }
        });
    }

    getCart(product: Product, splits: string[]): Cart { // id, quantity, note
        if (splits.length !== product.attributes.length + 3) {
            return null;
        }
        const noteValue = splits[splits.length - 1];
        const quantityValue = +splits[splits.length - 2];
        const attributes = splits.slice(1, splits.length - 2);
        let pricingValue = 0;
        let currentPricingValue = 0;

        product.variations.forEach(variation => {
            if (variation.combinedAttributes.length === attributes.length
                && attributes.every((value, index) => {
                    return value === variation.combinedAttributes[index];
                })) {
                pricingValue = variation.pricing;
                currentPricingValue = variation.currentPricing;
            }
        });
        if (pricingValue === 0) {
            return null;
        }

        const combinedAttributesValue = [];
        const combinedValuesValue = [];

        attributes.forEach(attribute => {
            product.attributes.forEach(value => {
                const index = value.options.findIndex(option => option.optionId === attribute);
                if (index === -1) {
                    return;
                }
                combinedAttributesValue.push(value.options[index].optionId);
                combinedValuesValue.push(value.options[index].text);
            });

        });

        if (combinedAttributesValue.length !== attributes.length) {
            return null;
        }

        return {
            combinedAttributes: combinedAttributesValue,
            combinedValues: combinedValuesValue,
            currentPricing: currentPricingValue,
            pricing: pricingValue,
            id: product.productId,
            link: product.link,
            title: product.productTitle,
            pic: product.pic,
            quantity: quantityValue,
            note: noteValue
        };
    }

    @HostListener('window:resize')
    onResize() {
        this.isCollapsed = window.innerWidth < 768;
    }

    private initialShippingAddressForm() {
        this.shipSubmitted = false;
        this.shippingAddressForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.pattern(PatternConstants.EMAIL)]),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            company: new FormControl(''),
            address: new FormControl('', Validators.required),
            apartment: new FormControl(''),
            city: new FormControl('', Validators.required),
            country: new FormControl('', Validators.required),
            postalCode: new FormControl('', Validators.required),
            phone: new FormControl('')
        });
    }

    onSubmitShippingAddress() {
        this.shipSubmitted = true;
        if (this.shippingAddressForm.invalid) {
            return;
        }
        this.paypalService.updateInformation({
            id: '',
            email: this.shippingAddressForm.controls.email.value,
            firstName: this.shippingAddressForm.controls.firstName.value,
            lastName: this.shippingAddressForm.controls.lastName.value,
            company: this.shippingAddressForm.controls.company.value,
            phone: this.shippingAddressForm.controls.phone.value,
            address: this.shippingAddressForm.controls.address.value,
            apartment: this.shippingAddressForm.controls.apartment.value,
            city: this.shippingAddressForm.controls.city.value,
            country: this.shippingAddressForm.controls.country.value,
            countryName: this.COUNTRY_CODES.find(value => {
                return value.code === this.shippingAddressForm.controls.country.value;
            }).value,
            postalCode: this.shippingAddressForm.controls.postalCode.value,
        });
        if (window.innerWidth < 768) {
            this.isCollapsed = true;
        }
        window.scrollTo(0, 0);
        this.shippingStatus = true;
    }

    changeCountry() {
        const country = this.COUNTRY_CODES.find(value => {
            return value.code === this.shippingAddressForm.controls.country.value;
        });
        if (!country) {
            this.shippingAddressForm.controls.postalCode.setValidators([Validators.required]);
        } else {
            this.shippingAddressForm.controls.postalCode.setValidators(country.postalCode ? Validators.required : null);
        }
        this.shippingAddressForm.controls.postalCode.updateValueAndValidity();
        const index = this.COUNTRY_CODES.findIndex(value => value.code === this.shippingAddressForm.controls.country.value);
        if (index && index !== -1) {
            this.currentCountry = this.COUNTRY_CODES[index].value;
        }
    }

    private updateInformation(user: User) {
        this.shippingAddressForm.controls.email.setValue(user.email);
        this.shippingAddressForm.controls.firstName.setValue(CheckoutComponent.getInformation(user, 'firstName'));
        this.shippingAddressForm.controls.lastName.setValue(CheckoutComponent.getInformation(user, 'lastName'));
        this.shippingAddressForm.controls.company.setValue(CheckoutComponent.getInformation(user, 'company'));
        this.shippingAddressForm.controls.address.setValue(CheckoutComponent.getInformation(user, 'address'));
        this.shippingAddressForm.controls.apartment.setValue(CheckoutComponent.getInformation(user, 'apartment'));
        this.shippingAddressForm.controls.city.setValue(CheckoutComponent.getInformation(user, 'city'));
        this.shippingAddressForm.controls.postalCode.setValue(CheckoutComponent.getInformation(user, 'postalCode'));
        this.shippingAddressForm.controls.phone.setValue(CheckoutComponent.getInformation(user, 'phone'));

        const country = CheckoutComponent.getInformation(user, 'country');
        if (country) {
            this.shippingAddressForm.controls.country.setValue(country);
        }
        this.changeCountry();
    }
}
