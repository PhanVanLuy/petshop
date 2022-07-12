import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {LoginModalService} from "../../../../commons/modals/login-modal/login-modal.service";
import {FormControl} from "@angular/forms";
import {UrlConstants} from "../../../../constants/url-constants";
import {User} from "../../../../models/user";
import {ReviewService} from "../../../../services/review.service";
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-write-review',
    templateUrl: './write-review.component.html',
    styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private loginService: LoginModalService,
        private reviewService: ReviewService,
    ) {
    }

    @Input() id: string;
    @Input() name: string;
    @Input() user: User;

    URL = UrlConstants;

    rating = 5;
    starCount = 5;

    files: File[] = [];
    images: string[] = [];
    review: FormControl = new FormControl('');
    isLoading: boolean;

    imageUrls: string [] = [];

    protected static getRandomId() {
        const arr = new Uint8Array((20 || 40) / 2);
        window.crypto.getRandomValues(arr);
        return Array.from(arr, v => {
            return ('0' + v.toString(16)).substr(-2);
        }).join('');
    }

    ngOnInit() {
    }


    onRatingChanged(rating) {
        this.rating = rating;
    }

    onSubmitReview() {
        if (this.isLoading) {
            return;
        }
        this.isLoading = true;
        if (this.files && this.files.length !== 0) {
            const index = 0;
            this.storeImage(index);
            return;
        }
        this.saveReview();
    }

    saveReview() {
        const review: any = {
            content: this.review.value,
            displayName: this.user.displayName,
            email: this.user.email,
            images: this.imageUrls,
            photoURL: this.user.photoURL,
            point: this.review.value.length + this.rating * 20 + this.imageUrls.length * 50,
            star: this.rating,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            uid: this.user.uid
        };
        this.reviewService.postReview(this.id, this.user.uid, review).then();
    }

    private storeImage(index: number) {
        const uploadTask = firebase.storage().ref().child(`IMAGES/${this.id}/${WriteReviewComponent.getRandomId()}`).put(this.files[index]);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
            },
            () => {
                if (this.files.length === index + 1) {
                    this.saveReview();
                } else {
                    this.storeImage(index + 1);
                }
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(value => {
                    this.imageUrls.push(value);
                    if (this.files.length === index + 1) {
                        this.saveReview();
                    } else {
                        this.storeImage(index + 1);
                    }
                });
            });
    }
}
