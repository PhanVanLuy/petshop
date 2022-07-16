import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ToastService} from '../common/toasts/toast.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: Observable<User>;

    constructor(
        private toastService: ToastService
    ) {
        // this.user = this.authentication.authState.pipe(
        //     switchMap(user => {
        //         if (user) {
        //             return this.firestore.collection(FirestoreConstants.USERS).doc<User>(user.uid).valueChanges();
        //         } else {
        //             return of(null);
        //         }
        //     })
        // );
    }

    async googleSignIn() {
        // const provider = new auth.GoogleAuthProvider();
        // return this.authentication.auth.signInWithPopup(provider).then(credential => {
        //     this.toastService.showSuccess('Login successfully');
        //     return this.updateUserData(credential.user);
        // }).catch(reason => {
        //     this.toastService.showError(reason);
        // });
    }

    async facebookSignIn() {
        // const provider = new auth.FacebookAuthProvider();
        // return this.authentication.auth.signInWithPopup(provider).then(credential => {
        //     this.toastService.showSuccess('Login successfully');
        //     return this.updateUserData(credential.user);
        // }).catch(reason => {
        //     this.toastService.showError(reason);
        // });
    }

    // private updateUserData(user) {
    //     const userRef: AngularFirestoreDocument<any> = this.firestore.collection(FirestoreConstants.USERS).doc(user.uid);
    //
    //     const data = {
    //         uid: user.uid,
    //         email: user.email,
    //         displayName: user.displayName,
    //         photoURL: user.photoURL,
    //     };
    //
    //     return userRef.set(data, {merge: true});
    //
    // }

    // public updateUserInformation(uid: string, informationValue: any) {
    //     const userRef: AngularFirestoreDocument<any> = this.firestore.collection(FirestoreConstants.USERS).doc(uid);
    //
    //     const data = {
    //         information: informationValue
    //     };
    //
    //     return userRef.set(data, {merge: true});
    // }
    //
    // signOut() {
    //     this.authentication.auth.signOut().then(() => {
    //         this.toastService.showSuccess('Logout successfully');
    //     }).catch(() => {
    //         this.toastService.showError('Something wrong. Try again!!!');
    //     });
    // }
}
