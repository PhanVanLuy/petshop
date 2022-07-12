import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ShortProduct} from "../../../../models/product/short-product";
import {UrlConstants} from "../../../../constants/url-constants";
import {Subscription} from "rxjs";
import {ProductService} from "../../../../services/product.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-grid-item',
    templateUrl: './grid-item.component.html',
    styleUrls: ['./grid-item.component.scss']
})
export class GridItemComponent implements OnInit, OnDestroy {

    URL = UrlConstants;

    @Input() itemId: string;

    shortProduct: ShortProduct;
    shortProductSubscription: Subscription;

    constructor(
        private productService: ProductService,
        private router: Router,
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

}
