import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-partner',
    templateUrl: './partner.component.html',
    styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {
    public images = [
        'assets/img/brand/bestproducts.png',
        'assets/img/brand/aliexpress.png',
        'assets/img/brand/amazon.png',
        'assets/img/brand/ebay.png',
        'assets/img/brand/etsy.png',
        'assets/img/brand/overstock.png',
        'assets/img/brand/zappos.png'
    ];
    public options = {
        items: 5, dots: true, nav: true, loop: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    };

    constructor() {
    }

    ngOnInit() {
    }

}
