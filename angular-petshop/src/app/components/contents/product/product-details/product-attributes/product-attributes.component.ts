import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Attribute} from '../../../../../models/product/attribute';

@Component({
    selector: 'app-product-attributes',
    templateUrl: './attributes.component.html',
    styleUrls: ['./attributes.component.scss']
})
export class ProductAttributesComponent implements OnInit {

    @Input() attributes: Attribute[];

    @Output() private changeAttributes = new EventEmitter<any[]>();

    constructor() {
    }

    ngOnInit() {
    }


    changeAttribute(value: string, id: string, i: number) {
        this.attributes[i].value = value;
        this.attributes[i].id = id;
        this.changeAttributes.emit(this.attributes.map(attr => {
            return {id: attr.id, value: attr.value};
        }));
    }
}
