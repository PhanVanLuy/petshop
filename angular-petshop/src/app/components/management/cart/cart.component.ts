import {Component, OnInit} from '@angular/core';
import {UrlConstants} from '../../../constants/url-constants';
import {Observable} from 'rxjs';
import {Cart} from '../../../models/cart';
import {CartService} from '../../../services/cart.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {CouponService} from '../../../services/coupon.service';
import {Coupon} from '../../../models/coupon';
import {CouponConstants} from '../../../constants/coupon-constants';
import {DecimalPipe} from '@angular/common';
import {UpdateQuantityModalService} from "../../../commons/modals/update-quantity-modal/update-quantity-modal.service";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    URL = UrlConstants;

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


    constructor(
        private cartService: CartService,
        private apiService: ApiService,
        public couponService: CouponService,
        private decimalPipe: DecimalPipe,
        private updateQuantityModalService: UpdateQuantityModalService,
    ) {
    }

    ngOnInit() {
        this.products = this.cartService.products;
        this.count = this.cartService.count;

        this.totals = this.cartService.totals;

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

        this.couponForm = new FormGroup({
            coupon: new FormControl('', Validators.required)
        });
        this.submitted = false;
        this.isLoading = false;
    }

    removeCart(productId: string) {
        this.cartService.remove(productId);
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

    get couponInput() {
        return this.couponForm.get('coupon');
    }

    private calculateTotals() {
        this.couponDiscount = 0;
        if (this.coupon) {
            if (this.coupon.type === CouponConstants.PERCENTAGE) {
                this.couponDiscount = Number(this.decimalPipe.transform((this.totalValue / 100) * this.coupon.value, '.2-2'));
            } else if (this.coupon.type === CouponConstants.DISCOUNT) {
                this.couponDiscount = this.coupon.value;
            }
        }
        this.finalTotals = this.totalValue - this.couponDiscount;
    }

    updateQuantity(productId: string, quantity: number) {
        this.updateQuantityModalService.updateQuantity(quantity).subscribe(value => {
            this.cartService.updateQuantity(productId, value);
        });
    }
}
