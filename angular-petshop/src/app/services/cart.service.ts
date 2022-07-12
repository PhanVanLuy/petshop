import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ToastService} from '../commons/toasts/toast.service';
import {Cart} from '../models/cart';
import {SyncConstants} from '../constants/sync-constants';
import {CacheService} from './cache.service';
import {FirestoreConstants} from "../constants/firestore-constants";
import {Carts} from "../models/carts";
import {AngularFirestore} from "@angular/fire/firestore";
import {HistoryService} from "./history.service";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private carts = new BehaviorSubject<Cart[]>([]);
    private dataStore: { carts: Cart[], totals: number, count: number } = {carts: [], totals: 0, count: 0};
    private total = new BehaviorSubject<number>(0);
    private countLength = new BehaviorSubject<number>(0);

    private subscribe = false;
    private userId: string;
    private subscription: Subscription;

    constructor(
        private toastService: ToastService,
        private cacheService: CacheService,
        private firestore: AngularFirestore,
        private historyService: HistoryService,
    ) {
        this.dataStore.carts = cacheService.get(SyncConstants.CART);
        this.next();
    }

    private next() {
        this.dataStore.totals = 0;
        this.dataStore.count = 0;
        this.dataStore.carts.forEach((t) => {
            this.dataStore.totals += t.currentPricing * t.quantity;
            this.dataStore.count++;
        });
        this.carts.next(Object.assign({}, this.dataStore).carts);
        this.total.next(Object.assign({}, this.dataStore).totals);
        this.countLength.next(Object.assign({}, this.dataStore).count);
    }

    get products() {
        return this.carts.asObservable();
    }

    get totals() {
        return this.total.asObservable();
    }

    get count() {
        return this.countLength.asObservable();
    }

    add(cart: Cart) {
        if (this.dataStore.carts.some(value => {
            return value.id === cart.id;
        })) {
            return;
        }
        this.dataStore.carts.push(cart);
        this.store();
        this.next();
        this.historyService.logAddCart(cart.id).then();
    }

    remove(productId: string) {
        this.dataStore.carts.forEach((t, i) => {
            if (t.id === productId) {
                this.dataStore.carts.splice(i, 1);
            }
        });
        this.store();
        this.next();
    }

    clearCarts() {
        this.dataStore.carts = [];
        this.store();
        this.next();
    }


    syncAllCarts(carts: Cart[]) {
        this.dataStore.carts = carts;
        this.next();
    }

    store() {
        if (this.subscribe) {
            this.storeServer();
        } else {
            this.storeCache();
        }
    }

    storeCache() {
        this.cacheService.set(this.dataStore.carts, SyncConstants.CART);
    }

    storeServer() {
        // tslint:disable-next-line:max-line-length
        this.firestore.collection(FirestoreConstants.USERS).doc(this.userId).collection(FirestoreConstants.CART).doc<Carts>(FirestoreConstants.CART_DOC)
            .set({
                carts: this.dataStore.carts
            }).then();
    }

    subscribeCarts(userId: string) {
        this.subscribe = true;
        this.userId = userId;
        // tslint:disable-next-line:max-line-length
        this.subscription = this.firestore.collection(FirestoreConstants.USERS).doc(this.userId).collection(FirestoreConstants.CART).doc<Carts>(FirestoreConstants.CART_DOC).valueChanges().subscribe(carts => {
            if (carts) {
                this.syncAllCarts(carts.carts);
            } else {
                this.syncAllCarts([]);
            }
        });
    }

    unsubscribeCarts() {
        this.subscribe = false;
        this.userId = undefined;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    updateQuantity(productId: string, updatedQuantity: number) {
        const cartIndex = this.dataStore.carts.findIndex(productItem => {
            return productItem.id === productId;
        });
        this.dataStore.carts[cartIndex].quantity = updatedQuantity;
        this.store();
        this.next();
    }
}
