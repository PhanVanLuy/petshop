import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CacheService} from './cache.service';
import {SyncConstants} from '../constants/sync-constants';
import {Coupon} from '../models/coupon';

@Injectable({
    providedIn: 'root'
})
export class CouponService {

    private couponData = new BehaviorSubject<Coupon>(null);

    private dataStore: { coupon: Coupon } = {coupon: null};

    constructor(
        private cacheService: CacheService,
    ) {
        this.dataStore.coupon = cacheService.getSingle(SyncConstants.COUPON);
        this.next();
    }

    private next() {
        this.couponData.next(Object.assign({}, this.dataStore).coupon);
    }

    get coupon() {
        return this.couponData.asObservable();
    }

    synCoupon(coupon: Coupon) {
        this.dataStore.coupon = coupon;
        this.next();
    }

    update(coupon: Coupon) {
        this.dataStore.coupon = coupon;
        this.next();
        this.storeCache();
    }

    storeCache() {
        this.cacheService.set(this.dataStore.coupon, SyncConstants.COUPON);
    }
}
