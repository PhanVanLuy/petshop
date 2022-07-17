import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import {Observable} from 'rxjs';
import {getMatIconFailedToSanitizeLiteralError} from '@angular/material/icon';

@Component({
  selector: 'app-book-list',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [NgbPaginationConfig]
})
export class ProductListComponent implements OnInit {

  products!: Observable<Product[]>;
  currentCategoryId = 1;
  previousCategoryId = 1;
  searchMode = false;
  categoryMode = false;

  // properties for client side paging

  // pageOfItems: Array<Product>;
  // pageSize: number = 5;

  // new properties for server-side paging
  currentPage: 1;
  pageSize: number;
  totalRecords: 0;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              config: NgbPaginationConfig) {
                  config.boundaryLinks = true;
                  config.maxSize = 10;
              }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');
    this.categoryMode = this.activatedRoute.snapshot.paramMap.has('cateId');
    if (this.searchMode) {
      this.categoryMode = false;
      // do search work
      this.handleSearchProducts();
    } else {
      // display books based on category
      this.handleListBooks();
    }
    if (this.categoryMode) {
      this.handleGetProductByCategory();
    }
    // this.handleListBooks();
  }

  handleListBooks() {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId !== this.currentCategoryId) {
      this.currentPage = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.products = this.productService.getProductList();
  }

  handleSearchProducts() {
    const keyword: string = this.activatedRoute.snapshot.paramMap.get('keyword');
    this.products = this.productService.searchProducts(keyword);
  }
  handleGetProductByCategory() {
    const categoryId: string = this.activatedRoute.snapshot.paramMap.get('cateId');
    this.products = this.productService.getByCateId(categoryId);
  }

  // client side paging and server side paging
  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listProducts();
  }

  addToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

}
