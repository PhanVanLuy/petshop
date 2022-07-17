import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductService} from './services/product.service';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ProductCategoryComponent} from './components/product-category/product-category.component';
import {SearchComponent} from './components/search/search.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {CartStatusComponent} from './components/cart-status/cart-status.component';
import {CartDetailsComponent} from './components/cart-details/cart-details.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginModalComponent} from './common/modals/login-modal/login-modal.component';
import {UrlConstants} from './constants/url-constants';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FooterComponent } from './common/core/footer/footer.component';
// client side paging
// import { JwPaginationComponent } from 'jw-angular-pagination';


const routes: Routes = [
  {
    path: UrlConstants.CHECKOUT,
    component: CheckoutComponent
  },
  {
    path: UrlConstants.LOGIN,
    component: LoginModalComponent
  },
  {
    path: UrlConstants.CART_DETAIL,
    component: CartDetailsComponent
  },
  {
    path: UrlConstants.PRODUCT_ID,
    component: ProductDetailsComponent
  },
  {
    path: UrlConstants.PRODUCTS,
    component: ProductListComponent
  },
  {
    path: UrlConstants.SEARCH_KEYWORD,
    component: ProductListComponent
  },
  {
    path: UrlConstants.SEARCH,
    redirectTo: UrlConstants.PRODUCTS,
    pathMatch: 'full'
  },
  {
    path: UrlConstants.CATEGORY_ID,
    component: ProductListComponent
  },
  {
    path: '',
    redirectTo: UrlConstants.PRODUCTS,
    pathMatch: 'full'
  },
  {
    path: UrlConstants.NOT_FOUND,
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    PageNotFoundComponent,
    ProductCategoryComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginModalComponent,
    FooterComponent
    // client side paging
    // JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
