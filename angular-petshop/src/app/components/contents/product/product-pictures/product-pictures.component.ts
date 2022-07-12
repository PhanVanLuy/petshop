import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-product-pictures',
    templateUrl: './product-pictures.component.html',
    styleUrls: ['./product-pictures.component.scss']
})
export class ProductPicturesComponent implements OnInit {
    @Input() pictures: string[];
    @Input() pics: string[];

    isMobile = false;

    constructor() {
    }

    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
    }

    ngOnInit() {
        this.isMobile = window.innerWidth < 768;
    }

}
