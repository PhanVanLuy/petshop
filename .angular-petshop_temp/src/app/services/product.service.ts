import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/v1/products';
  private categoryUrl = 'http://localhost:8080/api/v1/book-category';

  constructor(private httpClient: HttpClient) { }

  // getBooks(theCategoryId: number): Observable<Product[]> {
  //   const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
  //   return this.getProductList(searchUrl);
  // }
  getProduct(): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}`;
    return this.getProductList();
  }

  // getBooksPaginate(theCategoryId: number, currentPage: number, pageSize: number): Observable<GetResponseProducts> {
  //   const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
  //   return this.httpClient.get<GetResponseProducts>(searchUrl);
  // }
  //
  // getBookCategories(): Observable<ProductCategory[]> {
  //   return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
  //     map(response => response._embedded.bookCategory)
  //   );
  // }
  //
  // searchBooks(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseProducts> {
  //   const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
  //   // return this.getProductList(searchUrl);
  //   return this.httpClient.get<GetResponseProducts>(searchUrl);
  // }
  //
  // private getProductList(searchUrl: string): Observable<Product[]> {
  //   return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
  //     map(response => response._embedded.products)
  //   );
  // }

  get(productId: number): Observable<Product> {
    const productDetailsUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productDetailsUrl);
  }
  // getProduct(id: number): Observable<any> {
  //   return this.httpClient.get(`${this.baseUrl}/${id}`);
  // }

  getProductList(): any {
    return this.httpClient.get(`${this.baseUrl}`);
  }
}
