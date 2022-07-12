import { Product } from './product';

export class CartItem {
    id: string;
    name: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;

    constructor(book: Product) {
        this.id = book.id;
        this.name = book.name;
    }
}
