import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import {Observable} from 'rxjs';
import {UrlConstants} from '../../constants/url-constants';

@Component({
  selector: 'app-book-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  productCategories!: ProductCategory[];
  URL: UrlConstants;

  constructor(private productService: ProductService,
              ) { }

  ngOnInit() {
    this.listCategories();
  }

  listCategories() {
    this.productService.getCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    );
  }
}
