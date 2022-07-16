import {Product} from './product';

export class CartItem {
  id: string;
  name: string;
  stock: number;
  image: string;
  price: number;
  quantity = 1;

  constructor(product ?: Product) {
    this.id = product.id;
    this.name = product.name;
    this.stock = product.stock;
    this.price = product.price;
    this.image = product.image;
  }
}
