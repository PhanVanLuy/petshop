import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
    selector: 'app-information-modal',
    templateUrl: './information-modal.component.html',
    styleUrls: ['./information-modal.component.scss']
})
export class InformationModalComponent implements OnInit {

    public content: string;

    constructor(
        public bsModalRef: BsModalRef
    ) {
    }

    ngOnInit() {
    }

}
