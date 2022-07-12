import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {

  bookCategories: ProductCategory[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // this.listBookCategories();
  }

  listBookCategories() {
    // this.productService.getBookCategories().subscribe(
    //   data => this.bookCategories = data
    // );
  }

}
