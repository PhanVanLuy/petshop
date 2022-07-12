import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {ReviewsSummary} from '../../../../../models/product/reviews-summary';

@Component({
    selector: 'app-product-star',
    templateUrl: './product-star.component.html',
    styleUrls: ['./product-star.component.scss']
})
export class ProductStarComponent implements OnInit, OnDestroy {

    @Input() public reviewSummary: ReviewsSummary;

    @Input() public orders: number;

    @Output() public viewReviews = new EventEmitter<void>();

    public starSection: boolean;

    constructor() {
    }

    ngOnInit() {
        this.starSection = true;
    }

    goToReviews() {
        this.viewReviews.emit();
    }

    ngOnDestroy(): void {
    }
}
