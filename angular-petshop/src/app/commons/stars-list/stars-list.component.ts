import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-stars-list',
    templateUrl: './stars-list.component.html',
    styleUrls: ['./stars-list.component.scss']
})
export class StarsListComponent implements OnInit {
    @Input() count: number;
    @Input() fiveCount: number;
    @Input() fourCount: number;
    @Input() threeCount: number;
    @Input() twoCount: number;
    @Input() oneCount: number;

    constructor() {
    }

    ngOnInit() {
    }

}
