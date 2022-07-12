import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ApiConstants} from '../constants/api-constants';
import {catchError} from 'rxjs/operators';
import {Information} from '../models/information';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    postRefundMessage(data: any): Observable<any> {
        return this.httpClient.post(ApiConstants.REFUND_MESSAGE, data, {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*'
            })
        }).pipe(catchError(e => throwError(e)));
    }

    postContactMessage(data: any): Observable<any> {
        return this.httpClient.post(ApiConstants.CONTACT_MESSAGE, data, {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*'
            })
        }).pipe(catchError(e => throwError(e)));
    }

    postCheckCoupon(data: any): Observable<any> {
        return this.httpClient.post(ApiConstants.CHECK_COUPON, data, {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*'
            })
        }).pipe(catchError(e => throwError(e)));
    }

    postOrder(information: Information): Observable<any> {
        return this.httpClient.post(ApiConstants.ORDER, information, {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*'
            })
        }).pipe(catchError(e => throwError(e)));
    }

    getCountryCode(): Observable<any> {
        return this.httpClient.get(ApiConstants.COUNTRY_CODE, ).pipe(catchError(e => throwError(e)));
    }

}
