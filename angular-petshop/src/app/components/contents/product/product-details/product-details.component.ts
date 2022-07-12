import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../models/product/product';
import {ReviewsSummary} from '../../../../models/product/reviews-summary';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {WishService} from '../../../../services/wish.service';
import {UrlConstants} from '../../../../constants/url-constants';
import {Router} from '@angular/router';
import {CartService} from '../../../../services/cart.service';
import * as _ from 'underscore';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

    @Input() product: Product;
    @Input() reviewSummary: ReviewsSummary;

    @Output() public viewReviews = new EventEmitter<void>();

    pricing: number;
    currentPricing: number;

    quantity: number;
    attributes: any[];

    note = '';

    isValidAttributes: boolean;
    isValidNote: boolean;

    isWish: Observable<boolean>;

    isCart: Observable<boolean>;


    constructor(
        private router: Router,
        private wishService: WishService,
        private cartService: CartService,
    ) {
    }

    ngOnInit() {
        this.quantity = 1;
        this.isWish = this.wishService.products.pipe(
            map(wishes => {
                return wishes.some(wish => wish.id === this.product.productId);
            }),
        );

        this.isCart = this.cartService.products.pipe(
            map(carts => {
                return carts.some(cart => cart.id === this.product.productId);
            })
        );

        this.isValidAttributes = false;
        this.isValidNote = !this.product.requiredNote;
        this.changeAttributes(this.product.attributes);
    }

    changeAttributes(attributes: any[]) {
        this.isValidAttributes = false;
        this.attributes = attributes;
        this.product.variations.forEach(variation => {
            if (variation.combinedAttributes.length === attributes.length
                && attributes.every((value, index) => {
                    return value.id === variation.combinedAttributes[index];
                })) {
                this.pricing = variation.pricing;
                this.currentPricing = variation.currentPricing;
                this.isValidAttributes = true;
            }
        });

    }

    onWish() {
        this.isWish.pipe(
            take(1),
        ).subscribe(value => {
            if (value) {
                this.wishService.remove(this.product.productId);
            } else {
                this.wishService.add({
                    id: this.product.productId,
                    title: this.product.productTitle,
                    pic: this.product.pic,
                    currentMax: this.product.currentMax,
                    currentMin: this.product.currentMin,
                    max: this.product.max,
                    min: this.product.min,
                    link: this.product.link,
                });
            }
        });
    }

    onCart() {
        this.isCart.pipe(
            take(1),
        ).subscribe(value => {
            if (value) {
                this.router.navigate([UrlConstants.CART]).then();
            } else {
                this.cartService.add({
                    id: this.product.productId,
                    title: this.product.productTitle,
                    pic: this.product.pic,
                    pricing: this.pricing,
                    currentPricing: this.currentPricing,
                    combinedAttributes: this.attributes.map(attribute => attribute.id),
                    combinedValues: this.attributes.map(attribute => attribute.value),
                    quantity: this.quantity,
                    link: this.product.link,
                    note: this.note
                });
            }
        });
    }

    buyNow() {
        // tslint:disable-next-line:max-line-length
        this.router.navigate([UrlConstants.CHECKOUT, `${this.product.productId}-${this.attributes.map(value => value.id).join('-')}-${this.quantity}-${this.note}`]).then();
    }

    writeNote($event: KeyboardEvent) {
        // @ts-ignore
        const value = $event.target.value;
        if (!_.isEmpty(value)) {
            this.note = value;
            this.isValidNote = true;
        } else {
            this.note = '';
            this.isValidNote = !this.product.requiredNote;
        }
    }
}
