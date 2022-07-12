import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
// @ts-ignore
import {Product} from '../models/product/product';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
// @ts-ignore
import {ReviewsSummary} from '../models/product/reviews-summary';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    products: Map<string, Product> = new Map<string, Product>();
    // shortProducts: Map<string, ShortProduct> = new Map<string, ShortProduct>();
    private baseUrl = 'http://localhost:8080/api/v1/products';

    constructor(
        // private firestore: AngularFirestore
        private httpClient: HttpClient
    ) {
    }

    getProduct(id: string): Observable<Product> {
        if (this.products.get(id) !== undefined) {
            return new BehaviorSubject<Product>(this.products.get(id)).asObservable();
        }
        // return this.firestore.collection(FirestoreConstants.PRODUCTS).doc<Product>(id).get().pipe(
        //     map(value => {
        //         if (value.exists) {
        //             this.products.set(id, value.data() as Product);
        //         }
        //         return value.exists ? value.data() as Product : null;
        //     })
        // );
        const productDetailsUrl = `${this.baseUrl}/${id}`;
        return this.httpClient.get<Product>(productDetailsUrl);
    }

    // getShortProduct(id: string): Observable<ShortProduct> {
    //     if (this.shortProducts.get(id) !== undefined) {
    //         return new BehaviorSubject<ShortProduct>(this.shortProducts.get(id)).asObservable();
    //     }
    //     return this.firestore.collection(FirestoreConstants.SHORT_PRODUCTS).doc<ShortProduct>(id).get().pipe(
    //         map(value => {
    //             if (value.exists) {
    //                 this.shortProducts.set(id, value.data() as ShortProduct);
    //             }
    //             return value.exists ? value.data() as ShortProduct : null;
    //         })
    //     );
    // }
    //
    getReviewSummary(id: string): Observable<ReviewsSummary> {
        return null;
    }

}
