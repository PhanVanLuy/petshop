import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from "rxjs";
import {FirestoreConstants} from "../constants/firestore-constants";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class IndexService {
    carouselIndicators: any[];

    constructor(
        private firestore: AngularFirestore
    ) {
    }

    getCarouselIndicators(): Observable<any[]> {
        if (this.carouselIndicators) {
            return new BehaviorSubject<any[]>(this.carouselIndicators).asObservable();
        }
        return this.firestore.collection(FirestoreConstants.CAROUSE_INDICATORS).doc<any>(FirestoreConstants.CAROUSE_INDICATORS).get().pipe(
            map(value => {
                if (value.exists) {
                    this.carouselIndicators = value.data().list;
                }
                return value.exists ? value.data().list : null;
            })
        );
    }
}
