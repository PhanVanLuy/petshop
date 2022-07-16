import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {User} from '../models/user';
import {HistoryType} from '../constants/history-type';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {History} from '../models/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  user: User;
  history: History[];

  constructor(
    private authService: AuthService
  ) {
    // this.authService.user.subscribe(value => {
    //   this.user = value;
    // });
  }

  logLogin(): Promise<void> {
    return this.log('', HistoryType.LOGIN);
  }

  logLogout(): Promise<void> {
    return this.log('', HistoryType.LOGOUT);
  }

  logAddCart(cartItem: string) {
    return this.log(cartItem, HistoryType.ADD_CART);
  }

  logPurchase(total: string): Promise<void> {
    return this.log(total, HistoryType.PURCHASE);
  }

  logChangeProfile(): Promise<void> {
    return this.log('', HistoryType.CHANGE_PROFILE);
  }

  private log(name: string, type: HistoryType): Promise<void> {
    if (this.user) {
      const history1 = {type, name, timestamp: new Date().toLocaleString()};
      this.history.push(history1);
    }
    return Promise.resolve();
  }


  // getHistories(userId: string): Observable<History[]> {
  //     return this.firestore.collection(FirestoreConstants.HISTORY).doc<any>(userId).get().pipe(
  //         map(value => {
  //             return value.exists ? value.data().histories as (History[]) : [];
  //         })
  //     );
  // }

}
