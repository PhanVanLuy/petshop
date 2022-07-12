import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-product-shares',
    templateUrl: './product-shares.component.html',
    styleUrls: ['./product-shares.component.scss']
})
export class ProductSharesComponent implements OnInit {

    @Input() link: string;
    @Input() title: string;
    @Input() image: string;

    constructor() {
    }

    ngOnInit() {
        this.title = this.title.replace(/ /g, '%20');
        this.image = this.image.replace(/%/g, '%25');
        this.image = this.image.replace(/&/g, '%26');
    }

}
