import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-star-average',
    templateUrl: './star-average.component.html',
    styleUrls: ['./star-average.component.scss']
})
export class StarAverageComponent implements OnInit {
    @Input() average: number;

    constructor() {
    }

    ngOnInit() {
    }

}
