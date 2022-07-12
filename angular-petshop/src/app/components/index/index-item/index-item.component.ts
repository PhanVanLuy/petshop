import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UrlConstants} from "../../../constants/url-constants";
import {ShortProduct} from "../../../models/product/short-product";
import {Subscription} from "rxjs";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-index-item',
    templateUrl: './index-item.component.html',
    styleUrls: ['./index-item.component.scss']
})
export class IndexItemComponent implements OnInit, OnDestroy {

    URL = UrlConstants;

    @Input() itemId: string;
    @Input() showOrders: boolean;
    @Input() showSale: boolean;

    shortProduct: ShortProduct;
    shortProductSubscription: Subscription;

    constructor(
        private productService: ProductService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.shortProductSubscription = this.productService.getShortProduct(this.itemId).subscribe(value => {
            if (value == null) {
                return;
            }
            this.shortProduct = value;
        });
    }

    ngOnDestroy(): void {
        if (this.shortProductSubscription) {
            this.shortProductSubscription.unsubscribe();
        }
    }

    redirectProduct() {
        this.router.navigate([this.URL.SYMBOL + this.URL.PRODUCT + this.URL.SYMBOL + this.shortProduct.link]);
    }

}
