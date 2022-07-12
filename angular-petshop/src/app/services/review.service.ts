import {Injectable} from '@angular/core';
import {Review} from '../models/product/review';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreConstants} from '../constants/firestore-constants';
import {Product} from '../models/product/product';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    reviews: any;

    constructor(
        private firestore: AngularFirestore
    ) {
        this.reviews = {};
    }

    postReview(productId: string, uid: string, review: any): Promise<void> {
        // tslint:disable-next-line:max-line-length
        return this.firestore.collection(FirestoreConstants.PRODUCTS).doc(productId).collection(FirestoreConstants.REVIEWS).doc(uid).set(review);
    }

    getReview(productId: string, reviewId: string): Observable<Review> {
        if (this.reviews[productId] === undefined) {
            this.reviews[productId] = {};
            if (Object.keys(this.reviews).length >= 4) {
                delete this.reviews[Object.keys(this.reviews)[0]];
            }
        }
        if (this.reviews[productId][reviewId] === undefined) {
            this.reviews[productId][reviewId] = this.getReviewData(productId, reviewId);
        }
        return this.reviews[productId][reviewId];
    }

    private getReviewData(productId: string, reviewId: string): Observable<Review> {
        return this.firestore.collection(FirestoreConstants.PRODUCTS).doc<Product>(productId)
            .collection(FirestoreConstants.REVIEWS).doc(reviewId).get().pipe(
                take(1),
                map(value => {
                        return value.exists ? value.data() as Review : null;
                    }
                ),
            );
    }

    getReviewAsync(productId: string, reviewId: string): Observable<Review> {
        return this.firestore.collection(FirestoreConstants.PRODUCTS).doc<Product>(productId)
            .collection(FirestoreConstants.REVIEWS).doc<Review>(reviewId).valueChanges();
    }
}
