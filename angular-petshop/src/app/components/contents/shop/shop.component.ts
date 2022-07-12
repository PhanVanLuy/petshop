import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UrlConstants} from '../../../constants/url-constants';
import * as _ from 'underscore';
import {Category} from '../../../constants/category';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {merge, Observable, Subject, Subscription} from 'rxjs';
import {ShopService} from '../../../services/shop.service';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {ShowType} from '../../../constants/show-type';
import {ShopOrder} from '../../../constants/shop-order';
import {ShopItem} from '../../../models/shop/shop-item';
import {UtilsService} from "../../../services/utils.service";
import {Title} from "@angular/platform-browser";
import {BreadcrumbService} from "angular-crumbs";

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    subscriptionTitle: Subscription;

    URL = UrlConstants;

    categories = Category.CATEGORIES;
    linkCategories = Category.LINK_CATEGORIES;

    shop: ShopItem[];
    shopTitle: any[];

    category: string;
    model: any;

    order: ShopOrder;
    showType: ShowType;

    public shopOrderEnum = ShopOrder;
    public shopTypeEnum = ShowType;

    @ViewChild('instance', {static: true}) instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();
    isSearch = false;

    listOfItems: ShopItem[];
    listOfNames: string[];

    listOfItemsFilterBySearch: ShopItem[];
    listOfItemsOrdered: ShopItem[];
    index = 0;

    listOfItemsPageIndex: ShopItem[];
    pageIndex = 1;
    pageSize = 20;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private shopService: ShopService,
        private utilsService: UtilsService,
        private breadcrumbService: BreadcrumbService,
    ) {
        this.subscription = this.shopService.getShop().subscribe(value => {
            this.shop = value;
            this.updateStatus();
        });
        this.subscriptionTitle = this.shopService.getTitle().subscribe(value => {
            this.shopTitle = value;
            this.updateStatus();
        });
        this.order = ShopOrder.BEST;
        this.showType = ShowType.GRID;
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            if (!_.isEmpty(params)) {
                if (params.order) {
                    this.changeOrder(params.order.toUpperCase());
                }
            }
        });
        this.activatedRoute.params.subscribe(params => {
            if (!_.isEmpty(params)) {
                if (params.category) {
                    if (params.category !== 'all' && !this.linkCategories.includes(params.category)) {
                        this.router.navigate([UrlConstants.SYMBOL + UrlConstants.SHOP_ALL]).then();
                        return;
                    }
                    this.category = params.category;
                    // tslint:disable-next-line:max-line-length
                    this.breadcrumbService.changeBreadcrumb(this.activatedRoute.snapshot, this.categories[this.linkCategories.indexOf(this.category)]);
                    this.updateStatus();
                    return;
                }
            } else {
                this.router.navigate([UrlConstants.SYMBOL + UrlConstants.SHOP_ALL]).then();
                return;
            }
        });
    }

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;
        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => (term === '' ? []
                : this.listOfNames.filter(v => v === null ? false : v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.subscriptionTitle) {
            this.subscriptionTitle.unsubscribe();
        }
    }

    private updateStatus() {
        if (this.shop && this.shopTitle && this.category !== undefined) {
            this.listOfItems = this.shop.filter(item => {
                return this.category === 'all' || this.category === item.category;
            });

            this.listOfNames = this.listOfItems.map(item => this.shopTitle[item.id]);
            this.clearSearch();
        }
    }

    searchByName(value: any) {
        this.isSearch = true;
        this.filterBySearch(value);
    }

    clickSearchIcon() {
        if (this.isSearch) {
            this.clearSearch();
        }
    }

    clearSearch() {
        this.model = '';
        this.isSearch = false;
        this.filterBySearch('');

    }

    filterBySearch(searchText: string) {
        if (this.listOfItems) {
            // tslint:disable-next-line:max-line-length
            this.listOfItemsFilterBySearch = this.listOfItems.filter(item => !this.shopTitle[item.id] ? false : (searchText === '' ? true : this.shopTitle[item.id].toLowerCase().indexOf(searchText.toLowerCase()) > -1));
            this.index = this.listOfItemsFilterBySearch.length;
            this.orderItems();
        }
    }

    changeCategory() {
        this.router.navigate([UrlConstants.SYMBOL + UrlConstants.SHOP + UrlConstants.SYMBOL + this.category]).then();
    }

    changeOrder(value: string) {
        this.order = this.shopOrderEnum[value];
        if (this.order === undefined) {
            this.order = ShopOrder.BEST;
        }
        this.orderItems();
    }

    orderItems() {
        if (this.listOfItemsFilterBySearch) {
            this.listOfItemsOrdered = this.listOfItemsFilterBySearch.sort((itemFirst, itemSecond) => {
                switch (this.order) {
                    case ShopOrder.BEST:
                        return this.utilsService.compare(itemFirst.point, itemSecond.point);
                    case ShopOrder.ORDERS:
                        return this.utilsService.compare(itemFirst.orders, itemSecond.orders);
                    case ShopOrder.NEW:
                        return this.utilsService.compare(itemFirst.timestamp, itemSecond.timestamp);
                    case ShopOrder.PRICE:
                        return this.utilsService.compare(itemFirst.pricing, itemSecond.pricing);
                    case ShopOrder.RATING:
                        return this.utilsService.compare(itemFirst.average, itemSecond.average);
                    case ShopOrder.SALE:
                        return this.utilsService.compare(itemFirst.percentage, itemSecond.percentage);
                }
                return -1;
            });
            this.changePage(1);
        }
    }

    changePage(pageIndex: number) {
        this.pageIndex = pageIndex;
        // tslint:disable-next-line:max-line-length
        this.listOfItemsPageIndex = this.listOfItemsOrdered.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex - 1) * this.pageSize + this.pageSize);
    }

    changePageBottom(pageIndex: number) {
        window.scrollTo(0, 200);
        this.changePage(pageIndex);
    }

    changeShowType(value: ShowType) {
        this.showType = value;
    }

}
