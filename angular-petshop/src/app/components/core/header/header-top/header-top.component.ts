import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../constants/category';
import {AssetsConstants} from '../../../../constants/assets-constants';
import {UrlConstants} from '../../../../constants/url-constants';
import {CartService} from '../../../../services/cart.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../../../services/auth.service';
import {LoginModalService} from '../../../../commons/modals/login-modal/login-modal.service';
import {TitleConstants} from '../../../../constants/title-constants';
import {Cart} from '../../../../models/cart';

@Component({
    selector: 'app-header-top',
    templateUrl: './header-top.component.html',
    styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit {
    ASSETS = AssetsConstants;
    URL = UrlConstants;
    TITLE = TitleConstants;
    categories = Category.CATEGORIES;
    linkCategories = Category.LINK_CATEGORIES;

    cartHeader: boolean;

    products: Observable<Cart[]>;

    totals: Observable<number>;

    count: Observable<number>;

    constructor(
        public cartService: CartService,
        public auth: AuthService,
        public loginService: LoginModalService
    ) {
    }

    ngOnInit() {
        this.cartHeader = false;
        this.products = this.cartService.products;
        this.totals = this.cartService.totals;
        this.count = this.cartService.count;
    }

    removeCart(productId: string) {
        this.cartService.remove(productId);
    }

}
