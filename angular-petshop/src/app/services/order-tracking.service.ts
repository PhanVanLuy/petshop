import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {FirestoreConstants} from '../constants/firestore-constants';
import {map, switchMap} from 'rxjs/operators';
import {OrderTracking} from '../models/order/order-tracking';

@Injectable({
    providedIn: 'root'
})
export class OrderTrackingService {

    fastCurrentOrderTracking: OrderTracking;

    constructor(
        private firestore: AngularFirestore
    ) {
    }

    getOrder(id: string): Observable<OrderTracking> {
        return this.firestore.collection(FirestoreConstants.ORDERS).doc<OrderTracking>(id).get().pipe(
            map(value => {
                // tslint:disable-next-line:max-line-length
                return value.exists ? value.data() as OrderTracking : (this.fastCurrentOrderTracking ? (this.fastCurrentOrderTracking.id === id ? this.fastCurrentOrderTracking : null) : null);
            })
        );
    }

    getOrderHaveBeenDelivered(id: string): Observable<OrderTracking> {
        return this.firestore.collection(FirestoreConstants.ORDERS).doc<OrderTracking>(id).get().pipe(
            map(value => {
                // tslint:disable-next-line:max-line-length
                return value.exists ? ((value.data() as OrderTracking).status === 'DELIVERED' ? value.data() as OrderTracking : null) : (this.fastCurrentOrderTracking ? (this.fastCurrentOrderTracking.id === id ? this.fastCurrentOrderTracking : null) : null);
            })
        );
    }

    getOrdersByEmail(email: string): Observable<string[]> {
        return this.firestore.collection(FirestoreConstants.ORDERS_BY_EMAIL).doc(email).get().pipe(
            map(value => {
                return value.exists ? (value.data() ? value.data().orders as string[] : []) : [];
            })
        );
    }

    setOrderTracking(orderTracking: OrderTracking) {
        this.fastCurrentOrderTracking = orderTracking;
    }
}
