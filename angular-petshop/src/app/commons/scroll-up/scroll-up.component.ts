import {Component, HostListener, OnInit} from '@angular/core';

@Component({
    selector: 'app-scroll-up',
    templateUrl: './scroll-up.component.html',
    styleUrls: ['./scroll-up.component.scss']
})
export class ScrollUpComponent implements OnInit {

    isShow: boolean;
    topPosToStartShowing = 100;

    constructor() {
    }

    ngOnInit() {
    }

    @HostListener('window:scroll')
    checkScroll() {

        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        this.isShow = scrollPosition >= this.topPosToStartShowing;
    }

    gotoTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

}
