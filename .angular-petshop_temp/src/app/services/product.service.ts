import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private httpClient: HttpClient) {
  }

  getProduct(): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}`;
    return this.getProductList();
  }

  getCategories(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/categories`);
  }
  //
  searchProducts(keyword: string, ): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/search/${keyword}`);
  }

  getByCateId(cateId: string, ): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/category/${cateId}`);
  }

  get(productId: number): Observable<Product> {
    const productDetailsUrl = `${this.baseUrl}/products/${productId}`;
    return this.httpClient.get<Product>(productDetailsUrl);
  }

  getProductList(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/products`);
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    // current page
    size: number,
    // total number of records in database
    totalElements: number,
    // total number of pages, starts from 0 index
    totalPages: number,
    // current page
    number: number
  };
}
