/* tslint:disable:max-line-length */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../../constants/category';
import {UrlConstants} from '../../constants/url-constants';
import {ApiService} from '../../services/api.service';
import {CouponService} from '../../services/coupon.service';
import {IndexService} from "../../services/index.service";
import {ShopItem} from "../../models/shop/shop-item";
import {ShopService} from "../../services/shop.service";
import {Subscription} from "rxjs";
import {UtilsService} from "../../services/utils.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

    URL = UrlConstants;
    subscription: Subscription;

    categories = Category.CATEGORIES;
    linkCategories = Category.LINK_CATEGORIES;

    carouselIndicators: any[];

    shop: ShopItem[];
    hotSaleItems: ShopItem[];
    topSelectionItems: ShopItem[];
    newArrivalItems: ShopItem[];
    bestOrderItems: ShopItem[];
    moreItems: ShopItem[];

    constructor(
        private apiService: ApiService,
        private couponService: CouponService,
        private indexService: IndexService,
        private shopService: ShopService,
        private utilsService: UtilsService,
        private router: Router,
    ) {

        this.subscription = this.shopService.getShop().subscribe(value => {
            this.shop = value;
            this.filterItems();
        });
    }

    ngOnInit() {
        this.indexService.getCarouselIndicators().subscribe(value => {
            this.carouselIndicators = value;
        });
    }

    applyNewcomersCoupon() {
        const newcomersCoupon = {coupon: 'FREE5'};
        this.apiService.postCheckCoupon(newcomersCoupon).subscribe(value => {
            if (newcomersCoupon.coupon === value.name) {
                this.couponService.update(value);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    filterItems() {
        this.hotSaleItems = this.shop.sort((firstItem, secondItem) => this.utilsService.compare(firstItem.percentage, secondItem.percentage)).slice(0, 6);
        this.topSelectionItems = this.shop.filter(value => this.hotSaleItems.indexOf(value) === -1).sort((firstItem, secondItem) => this.utilsService.compare(firstItem.point, secondItem.point)).slice(0, 3);
        this.newArrivalItems = this.shop.filter(value => this.hotSaleItems.indexOf(value) === -1
            && this.topSelectionItems.indexOf(value) === -1).sort((firstItem, secondItem) => this.utilsService.compare(firstItem.timestamp, secondItem.timestamp)).slice(0, 3);
        this.bestOrderItems = this.shop.filter(value => this.hotSaleItems.indexOf(value) === -1
            && this.topSelectionItems.indexOf(value) === -1
            && this.newArrivalItems.indexOf(value) === -1).sort((firstItem, secondItem) => this.utilsService.compare(firstItem.orders, secondItem.orders)).slice(0, 6);
        this.moreItems = this.shop.filter(value => this.hotSaleItems.indexOf(value) === -1
            && this.topSelectionItems.indexOf(value) === -1
            && this.newArrivalItems.indexOf(value) === -1
            && this.bestOrderItems.indexOf(value) === -1).sort((firstItem, secondItem) => this.utilsService.compare(firstItem.point, secondItem.point)).slice(0, 24);
    }

    carouseAction(action: string) {
        switch (action) {
            case 'newcomers':
                this.applyNewcomersCoupon();
                this.router.navigate([this.URL.SYMBOL + this.URL.SHOP_ALL]).then();
                break;
            case 'hotsale':
                this.router.navigate([this.URL.SYMBOL + this.URL.SHOP_ALL], {queryParams: {order: 'sale'}}).then();
                break;
            case 'newarrival':
                this.router.navigate([this.URL.SYMBOL + this.URL.SHOP_ALL], {queryParams: {order: 'new'}}).then();
                break;
            case 'sologan':
                this.router.navigate([this.URL.SYMBOL + this.URL.SHOP_ALL]).then();
                break;
        }
    }
}
