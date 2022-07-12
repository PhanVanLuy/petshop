import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {User} from "../models/user";
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreConstants} from "../constants/firestore-constants";
import * as firebase from 'firebase/app';
import {HistoryType} from "../constants/history-type";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {History} from "../models/history";

@Injectable({
    providedIn: 'root'
})
export class HistoryService {

    user: User;

    constructor(
        private authService: AuthService,
        private firestore: AngularFirestore
    ) {
        this.authService.user.subscribe(value => {
            this.user = value;
        });
    }

    logLogin(): Promise<void> {
        return this.log('', HistoryType.LOGIN);
    }

    logLogout(): Promise<void> {
        return this.log('', HistoryType.LOGOUT);
    }

    logAddCart(id: string) {
        return this.log(id, HistoryType.ADD_CART);
    }

    logAddWish(id: string): Promise<void> {
        return this.log(id, HistoryType.ADD_WISH);
    }

    logPurchase(id: string): Promise<void> {
        return this.log(id, HistoryType.PURCHASE);
    }

    logRefund(id: string): Promise<void> {
        return this.log(id, HistoryType.REFUND);
    }

    logChangeProfile(): Promise<void> {
        return this.log('', HistoryType.CHANGE_PROFILE);
    }

    getHistories(userId: string): Observable<History[]> {
        return this.firestore.collection(FirestoreConstants.HISTORY).doc<any>(userId).get().pipe(
            map(value => {
                return value.exists ? value.data().histories as (History[]) : [];
            })
        );
    }

    private log(id: string, type: HistoryType): Promise<void> {
        if (this.user) {
            const history = {
                id,
                timestamp: new Date().toLocaleString(),
                type
            };
            return this.firestore.collection(FirestoreConstants.HISTORY).doc(this.user.uid).set({
                histories: firebase.firestore.FieldValue.arrayUnion(history)
            }, {merge: true});
        }
        return Promise.resolve();
    }

}
