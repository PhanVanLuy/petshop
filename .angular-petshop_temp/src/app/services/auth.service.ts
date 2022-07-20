import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {UrlConstants} from '../constants/url-constants';
import {map} from 'rxjs-compat/operator/map';
import {Information} from '../models/information';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  user: Observable<User> ;
  url = UrlConstants.LOCAL;


  constructor(private router: Router,
              private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token')));
    this.user = this.userSubject.asObservable();
  }


  public updateUserInformation(uid: string, informationValue: any): Observable<any> {
    return this.httpClient.put(`${this.url}/infos/${uid}`, {
      informationValue
    });
  }
  private updateUserData(user) {

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return this.httpClient.put(`${this.url}/users/${data.uid}`, {
      data
    });
  }
  logout() {
    sessionStorage.removeItem('token');
    this.user = null;
    this.router.navigateByUrl(UrlConstants.LOGIN);
  }


  login(emailIn: any, passwordIn: any) {

    const result = this.httpClient.post(`${this.url}/login`, {
      email: emailIn,
      password: passwordIn
    }).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem(
          'token',
          btoa(emailIn + ':' + passwordIn)
        );
        this.router.navigateByUrl('/products');
      } else {
        alert('Authentication failed.');
      }
    });
  }
  // remember add info after add user
  register(user: User) {
    return this.httpClient.post(`${this.url}/users`, user);
  }

  addInfo(info: Information) {
    return  this.httpClient.post(`${this.url}/infos`, info);
  }

  isUserLogin() {
    const userLogin = sessionStorage.getItem('token');
    return !(userLogin === null);

  }

  getAll() {
    return this.httpClient.get<User[]>(`${this.url}/users`);
  }

  getById(id: string) {
    return this.httpClient.get<User>(`${this.url}/users/${id}`);
  }


  getUser(uid: any) {
    return this.httpClient.get(`${this.url}/users/{uid}`);
  }

}
