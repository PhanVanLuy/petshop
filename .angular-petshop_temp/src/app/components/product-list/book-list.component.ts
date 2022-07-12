import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [NgbPaginationConfig]
})
export class BookListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId = 1;
  previousCategoryId = 1;
  searchMode = false;

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
      this.listBooks();
    });
  }

  listBooks() {
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');

    // if (this.searchMode) {
    //   // do search work
    //   this.handleSearchBooks();
    // } else {
    //   // display books based on category
    //   this.handleListBooks();
    // }
    this.handleListBooks();
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

    console.log('current page size', this.currentPage - 1 );

    this.productService.getProductList();
    // console.log(this.productService.getProduct().subscribe(this.processResult()));
  }

  // handleSearchBooks() {
  //   const keyword: string = this.activatedRoute.snapshot.paramMap.get('keyword');
  //
  //   this.productService.searchBooks(keyword,
  //                                 this.currentPage - 1,
  //                                 this.pageSize)
  //                                 .subscribe(this.processResult());
  // }

  // client side paging and server side paging
  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }

  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    };
  }

  addToCart(product: Product) {
    console.log(`book name: ${product.name}, and price: ${product.price}`);
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

}
