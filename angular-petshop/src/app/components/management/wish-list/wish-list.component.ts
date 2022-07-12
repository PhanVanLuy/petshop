import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {WishService} from '../../../services/wish.service';
import {UrlConstants} from '../../../constants/url-constants';
import {Wish} from '../../../models/wish';

@Component({
    selector: 'app-wish-list',
    templateUrl: './wish-list.component.html',
    styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
    URL = UrlConstants;

    products: Observable<Wish[]>;

    count: Observable<number>;

    constructor(
        private wishService: WishService
    ) {
    }

    ngOnInit() {
        this.products = this.wishService.products;
        this.count = this.wishService.count;
    }

    removeWish(productId: string) {
        this.wishService.remove(productId);
    }
}
