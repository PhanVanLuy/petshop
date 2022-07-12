import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UrlConstants} from '../../../../constants/url-constants';
import {ShopItem} from '../../../../models/shop/shop-item';
import {ShortProduct} from '../../../../models/product/short-product';
import {Subscription} from 'rxjs';
import {ProductService} from '../../../../services/product.service';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit, OnDestroy {

    URL = UrlConstants;

    @Input() itemId: string;

    shortProduct: ShortProduct;
    shortProductSubscription: Subscription;

    constructor(
        private productService: ProductService
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
