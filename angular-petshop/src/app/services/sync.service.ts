import {Injectable} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {delay, filter} from 'rxjs/operators';
import {SyncConstants} from '../constants/sync-constants';
import {WishService} from './wish.service';
import {CartService} from './cart.service';
import {CouponService} from './coupon.service';
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class SyncService {
    source: Observable<any>;

    constructor(
        private wishService: WishService,
        private cartService: CartService,
        private couponService: CouponService,
        private authService: AuthService
    ) {
        this.source = fromEvent(window, 'storage');
        this.source.pipe(
            delay(500),
            filter(value => value.key === SyncConstants.WISH ||
                value.key === SyncConstants.CART ||
                value.key === SyncConstants.COUPON),
            filter(evt => evt.newValue !== null),
        ).subscribe(value => {
            switch (value.key) {
                case SyncConstants.WISH:
                    this.wishService.syncAllWishes(JSON.parse(value.newValue));
                    break;
                case SyncConstants.CART:
                    this.cartService.syncAllCarts(JSON.parse(value.newValue));
                    break;
                case SyncConstants.COUPON:
                    this.couponService.synCoupon(JSON.parse(value.newValue));
                    break;
            }
        });

        this.authService.user.subscribe(user => {
            if (user) {
                this.subscribeAll(user.uid);
            } else {
                this.unsubscribeAll();
            }
        });
    }

    private subscribeAll(userId: string) {
        this.wishService.subscribeWishes(userId);
        this.cartService.subscribeCarts(userId);
    }

    private unsubscribeAll() {
        this.wishService.unsubscribeWishes();
        this.cartService.unsubscribeCarts();
    }
}
