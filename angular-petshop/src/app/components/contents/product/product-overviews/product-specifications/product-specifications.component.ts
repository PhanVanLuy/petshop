import {Component, Input, OnInit} from '@angular/core';
import {Property} from '../../../../../models/product/property';

@Component({
    selector: 'app-product-specifications',
    templateUrl: './product-specifications.component.html',
    styleUrls: ['./product-specifications.component.scss']
})
export class ProductSpecificationsComponent implements OnInit {
    @Input() properties: Property[];

    constructor() {
    }

    ngOnInit() {
    }

}
