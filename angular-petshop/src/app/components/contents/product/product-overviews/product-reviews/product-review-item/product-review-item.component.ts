import {Component, Input, OnInit} from '@angular/core';
import {ReviewService} from '../../../../../../services/review.service';
import {Review} from '../../../../../../models/product/review';

@Component({
    selector: 'app-product-review-item',
    templateUrl: './product-review-item.component.html',
    styleUrls: ['./product-review-item.component.scss']
})
export class ProductReviewItemComponent implements OnInit {
    @Input() productId: string;
    @Input() reviewId: string;

    review: Review;

    constructor(
        private reviewService: ReviewService
    ) {
    }

    ngOnInit() {
        this.reviewService.getReview(this.productId, this.reviewId).subscribe(value => {
            this.review = value;
        });
    }

}
