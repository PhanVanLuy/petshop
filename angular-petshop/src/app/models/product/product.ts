import {Attribute} from './attribute';
import {Variation} from './variation';
import {Property} from './property';

export interface Product {
    productId: string;
    productTitle: string;
    category: string;
    min: number;
    currentMin: number;
    max: number;
    currentMax: number;
    attributes: Attribute[];
    pictures: string[];
    pics: string[];
    picture: string;
    pic: string;
    requiredNote: boolean;
    noteHolder: string;
    link: string;
    variations: Variation[];
    properties: Property[];
    description: string;
    timestamp: Date;
    orders: number;
}
