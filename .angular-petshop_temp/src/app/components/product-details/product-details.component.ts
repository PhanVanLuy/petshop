import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      () => {
        this.getProductInfo();
      }
    );
  }

  getProductInfo() {
    const id: number = +this.activatedRoute.snapshot.paramMap.get('id');

    this.productService.get(id).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  addToCart() {
    console.log(`Product name: ${this.product.name}, and price: ${this.product.price}`);
    const cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }

}
