import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {FirestoreConstants} from '../constants/firestore-constants';
import {switchMap} from 'rxjs/operators';
import {ShopItem} from '../models/shop/shop-item';

@Injectable({
    providedIn: 'root'
})
export class ShopService {

    shop: Observable<ShopItem[]>;
    title: Observable<string[]>;

    constructor(
        private firestore: AngularFirestore
    ) {
        this.shop = this.firestore.collection(FirestoreConstants.SHOPS).doc<any>(FirestoreConstants.SHOP_DOC).valueChanges().pipe(
            switchMap(data => {
                const arrays = [];
                data.items.forEach(item => {
                    arrays.push(data[item]);
                });
                return of(arrays);
            })
        );
        this.title = this.firestore.collection(FirestoreConstants.SHOPS).doc<any>(FirestoreConstants.SHOP_TITLE_DOC).valueChanges();
    }

    getShop(): Observable<ShopItem[]> {
        return this.shop;
    }

    getTitle(): Observable<string[]> {
        return this.title;
    }

}
