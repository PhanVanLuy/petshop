import {Component, Input, OnInit} from '@angular/core';
import {ReviewsSummary} from '../../../../../models/product/reviews-summary';
import {ReviewFilterPipe} from '../../../../../pipes/review-filter.pipe';

@Component({
    selector: 'app-product-reviews',
    templateUrl: './product-reviews.component.html',
    styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {

    @Input() productId: string;
    @Input() reviewSummary: ReviewsSummary;

    sortActions = [
        {
            id: ReviewFilterPipe.POINT,
            value: 'Sort by most helpful'
        },
        {
            id: ReviewFilterPipe.TIMESTAMP,
            value: 'Sort by latest'
        }
    ];

    page = 0;
    pageSize = 10;
    currentSort = this.sortActions[0];

    constructor() {
    }

    ngOnInit() {
        this.currentSort = this.sortActions[0];
    }

    sortAction(sort: any) {
        this.currentSort = sort;
        this.page = 0;
    }
}
