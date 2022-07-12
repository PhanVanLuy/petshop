import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ToastService} from '../commons/toasts/toast.service';
import {Wish} from '../models/wish';
import {CacheService} from './cache.service';
import {SyncConstants} from '../constants/sync-constants';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreConstants} from "../constants/firestore-constants";
import {Wishes} from "../models/wishes";
import {HistoryService} from "./history.service";

@Injectable({
    providedIn: 'root'
})
export class WishService {

    private wishList = new BehaviorSubject<Wish[]>([]);
    private dataStore: { wishList: Wish[], count: number } = {wishList: [], count: 0};
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
        this.dataStore.wishList = cacheService.get(SyncConstants.WISH);
        this.next();
    }

    private next() {
        this.dataStore.count = 0;
        this.dataStore.wishList.forEach(() => {
            this.dataStore.count++;
        });
        this.wishList.next(Object.assign({}, this.dataStore).wishList);
        this.countLength.next(Object.assign({}, this.dataStore).count);
    }

    get products() {
        return this.wishList.asObservable();
    }

    get count() {
        return this.countLength.asObservable();
    }

    add(wish: Wish) {
        if (this.dataStore.wishList.some(value => {
            return value.id === wish.id;
        })) {
            return;
        }
        this.dataStore.wishList.push(wish);
        this.store();
        this.next();
        this.historyService.logAddWish(wish.id).then();
    }

    syncAllWishes(wishes: Wish[]) {
        this.dataStore.wishList = wishes;
        this.next();
    }

    remove(id: string) {
        this.dataStore.wishList.forEach((t, i) => {
            if (t.id === id) {
                this.dataStore.wishList.splice(i, 1);
            }
        });
        this.store();
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
        this.cacheService.set(this.dataStore.wishList, SyncConstants.WISH);
    }

    storeServer() {
        // tslint:disable-next-line:max-line-length
        this.firestore.collection(FirestoreConstants.USERS).doc(this.userId).collection(FirestoreConstants.WISH).doc<Wishes>(FirestoreConstants.WISH_DOC)
            .set({
                wishes: this.dataStore.wishList
            }).then();
    }

    subscribeWishes(userId: string) {
        this.subscribe = true;
        this.userId = userId;
        // tslint:disable-next-line:max-line-length
        this.subscription = this.firestore.collection(FirestoreConstants.USERS).doc(this.userId).collection(FirestoreConstants.WISH).doc<Wishes>(FirestoreConstants.WISH_DOC).valueChanges().subscribe(wishes => {
            if (wishes) {
                this.syncAllWishes(wishes.wishes);
            } else {
                this.syncAllWishes([]);
            }
        });
    }

    unsubscribeWishes() {
        this.subscribe = false;
        this.userId = undefined;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
