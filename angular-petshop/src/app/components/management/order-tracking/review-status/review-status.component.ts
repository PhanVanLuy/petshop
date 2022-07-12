import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../../../models/product/review";
import {ReviewService} from "../../../../services/review.service";
import {User} from "../../../../models/user";
import {AuthService} from "../../../../services/auth.service";
import {UrlConstants} from "../../../../constants/url-constants";
import {LoginModalService} from "../../../../commons/modals/login-modal/login-modal.service";

@Component({
    selector: 'app-review-status',
    templateUrl: './review-status.component.html',
    styleUrls: ['./review-status.component.scss']
})
export class ReviewStatusComponent implements OnInit {

    @Input() id: string;
    @Input() name: string;

    URL = UrlConstants;

    review: Review;

    user: User;

    constructor(
        private reviewService: ReviewService,
        private authService: AuthService,
        public loginService: LoginModalService,
    ) {
        this.authService.user.subscribe(value => {
            this.user = value;
            if (this.user) {
                this.reviewService.getReviewAsync(this.id, this.user.uid).subscribe(review => {
                    this.review = review;
                });
            }
        });
    }

    ngOnInit() {

    }

    showIcon(index: number) {
        if (this.review.star >= index + 1) {
            return 'star';
        } else {
            return 'star_border';
        }
    }

}
