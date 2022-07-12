import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Property} from '../../../../models/product/property';
import {ReviewsSummary} from '../../../../models/product/reviews-summary';
import {NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-product-overviews',
    templateUrl: './product-overviews.component.html',
    styleUrls: ['./product-overviews.component.scss']
})
export class ProductOverviewsComponent implements OnInit {
    @Input() productId: string;
    @Input() description: string;
    @Input() properties: Property[];
    @Input() reviewSummary: ReviewsSummary;
    @Input() gotoReviews: Subject<boolean>;

    @ViewChild('tabs', {static: true, read: NgbTabset}) tabs: NgbTabset;

    constructor() {
    }

    ngOnInit() {
        this.gotoReviews.subscribe(() => {
            this.tabs.select('reviews');
        });
    }

}
