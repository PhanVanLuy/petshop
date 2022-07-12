import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Product = new Product();

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      () => {
        this.getBookInfo();
      }
    );
  }

  getBookInfo() {
    const id: number = +this.activatedRoute.snapshot.paramMap.get('id');

    this.productService.get(id).subscribe(
      data => {
        this.book = data;
      }
    );
  }

  addToCart() {
    console.log(`book name: ${this.book.name}, and price: ${this.book.price}`);
    const cartItem = new CartItem(this.book);
    this.cartService.addToCart(cartItem);
  }

}
