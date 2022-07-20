import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice = 0;
  totalQuantity = 0;

  // tslint:disable-next-line:variable-name
  constructor(private _cartService: CartService) { }

  ngOnInit() {
    this.updateCartStatus();
  }

  updateCartStatus() {
    // subscribe to the events
    this._cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this._cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }


}
