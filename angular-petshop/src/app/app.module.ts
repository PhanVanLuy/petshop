import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/core/header/header/header.component';
import {IndexComponent} from './components/index/index.component';
import {HeaderTopComponent} from './components/core/header/header-top/header-top.component';
import {ShopComponent} from './components/contents/shop/shop.component';
import {CartComponent} from './components/management/cart/cart.component';
import {ContactComponent} from './components/informations/contact/contact.component';
import {BlogComponent} from './components/contents/blog/blog.component';
import {ProfileComponent} from './components/management/profile/profile.component';
import {RefundComponent} from './components/management/refund/refund.component';
import {WishListComponent} from './components/management/wish-list/wish-list.component';
import {CheckoutComponent} from './components/management/checkout/checkout.component';
import {ProductComponent} from './components/contents/product/product.component';
import {NotFoundComponent} from './commons/not-found/not-found.component';
import {HeaderBottomComponent} from './components/core/header/header-bottom/header-bottom.component';
import {OrderTrackingComponent} from './components/management/order-tracking/order-tracking.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {LoginModalComponent} from './commons/modals/login-modal/login-modal.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ToastComponent} from './commons/toasts/toast/toast.component';
import {FooterComponent} from './components/core/footer/footer/footer.component';
import {FooterTopComponent} from './components/core/footer/footer-top/footer-top.component';
import {FooterMiddleComponent} from './components/core/footer/footer-middle/footer-middle.component';
import {FooterBottomComponent} from './components/core/footer/footer-bottom/footer-bottom.component';
import {PrivacyPolicyComponent} from './components/informations/privacy-policy/privacy-policy.component';
import {CookiePolicyComponent} from './components/informations/cookie-policy/cookie-policy.component';
import {RefundPolicyComponent} from './components/informations/refund-policy/refund-policy.component';
import {TermsConditionsComponent} from './components/informations/terms-conditions/terms-conditions.component';
import {HistoryComponent} from './components/management/history/history.component';
import {AboutUsComponent} from './components/informations/about-us/about-us.component';
import {VendorDetailsComponent} from './components/informations/vendor-details/vendor-details.component';
import {DeliveryDetailsComponent} from './components/informations/delivery-details/delivery-details.component';
import {UserPolicyComponent} from './components/informations/user-policy/user-policy.component';
import {BreadcrumbComponent} from './components/core/breadcrumb/breadcrumb.component';
import {BreadcrumbModule} from 'angular-crumbs';
import {NgcCookieConsentModule} from 'ngx-cookieconsent';
import {Configs} from './constants/configs';
import {HttpClientModule} from '@angular/common/http';
import {PartnerComponent} from './commons/carousel/partner/partner.component';
import {OwlModule} from 'ngx-owl-carousel';
import {ProductStarComponent} from './components/contents/product/product-details/product-star/product-star.component';
import {ScrollUpComponent} from './commons/scroll-up/scroll-up.component';
import {ProductAttributesComponent} from './components/contents/product/product-details/product-attributes/product-attributes.component';
import {NumberPickerModule} from 'ng-number-picker';
import {NgxImageZoomModule} from 'ngx-image-zoom';
import {ProductDetailsComponent} from './components/contents/product/product-details/product-details.component';
import {ProductPicturesComponent} from './components/contents/product/product-pictures/product-pictures.component';
import {ProductOverviewsComponent} from './components/contents/product/product-overviews/product-overviews.component';
import {ProductOverviewComponent} from './components/contents/product/product-overviews/product-overview/product-overview.component';
import {ProductReviewsComponent} from './components/contents/product/product-overviews/product-reviews/product-reviews.component';
// tslint:disable-next-line:max-line-length
import {ProductSpecificationsComponent} from './components/contents/product/product-overviews/product-specifications/product-specifications.component';
// tslint:disable-next-line:max-line-length
import {ProductReviewItemComponent} from './components/contents/product/product-overviews/product-reviews/product-review-item/product-review-item.component';
import { StarsListComponent } from './commons/stars-list/stars-list.component';
import { StarAverageComponent } from './commons/star-average/star-average.component';
import { ReviewFilterPipe } from './pipes/review-filter.pipe';
import { StarComponent } from './commons/star/star.component';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {DecimalPipe} from '@angular/common';
import {NgxPayPalModule} from 'ngx-paypal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatStepperModule} from '@angular/material/stepper';
import { ReplacePipe } from './pipes/replace.pipe';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { StarRatingComponent } from './commons/star-rating/star-rating.component';
import { ImageUploadComponent } from './commons/image-upload/image-upload.component';
import { WriteReviewComponent } from './components/management/order-tracking/write-review/write-review.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { ReviewStatusComponent } from './components/management/order-tracking/review-status/review-status.component';
import { ConfirmModalComponent } from './commons/modals/confirm-modal/confirm-modal.component';
import { InformationModalComponent } from './commons/modals/information-modal/information-modal.component';
import { SearchComponent } from './components/management/search/search.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import { GridItemComponent } from './components/contents/shop/grid-item/grid-item.component';
import { ListItemComponent } from './components/contents/shop/list-item/list-item.component';
import {SafePipe} from "./pipes/safe.pipe";
import { IndexItemComponent } from './components/index/index-item/index-item.component';
import { UpdateQuantityModalComponent } from './commons/modals/update-quantity-modal/update-quantity-modal.component';
import { ProductSharesComponent } from './components/contents/product/product-shares/product-shares.component';
import {NgxJsonLdModule} from "ngx-json-ld";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        IndexComponent,
        HeaderTopComponent,
        ShopComponent,
        CartComponent,
        ContactComponent,
        BlogComponent,
        ProfileComponent,
        RefundComponent,
        WishListComponent,
        CheckoutComponent,
        ProductComponent,
        NotFoundComponent,
        HeaderBottomComponent,
        OrderTrackingComponent,
        LoginModalComponent,
        ToastComponent,
        FooterComponent,
        FooterTopComponent,
        FooterMiddleComponent,
        FooterBottomComponent,
        PrivacyPolicyComponent,
        CookiePolicyComponent,
        RefundPolicyComponent,
        TermsConditionsComponent,
        HistoryComponent,
        AboutUsComponent,
        VendorDetailsComponent,
        DeliveryDetailsComponent,
        UserPolicyComponent,
        BreadcrumbComponent,
        PartnerComponent,
        ProductStarComponent,
        ScrollUpComponent,
        ProductAttributesComponent,
        ProductDetailsComponent,
        ProductPicturesComponent,
        ProductOverviewsComponent,
        ProductOverviewComponent,
        ProductReviewsComponent,
        ProductSpecificationsComponent,
        ProductReviewItemComponent,
        StarsListComponent,
        StarAverageComponent,
        ReviewFilterPipe,
        StarComponent,
        ReplacePipe,
        SafePipe,
        StarRatingComponent,
        ImageUploadComponent,
        WriteReviewComponent,
        ReviewStatusComponent,
        ConfirmModalComponent,
        InformationModalComponent,
        SearchComponent,
        GridItemComponent,
        ListItemComponent,
        IndexItemComponent,
        UpdateQuantityModalComponent,
        ProductSharesComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        ModalModule.forRoot(),
        NgxImageZoomModule.forRoot(),
        BreadcrumbModule,
        NgcCookieConsentModule.forRoot(Configs.COOKIE_CONFIG),
        HttpClientModule,
        OwlModule,
        NumberPickerModule,
        ScrollToModule.forRoot(),
        NgxPayPalModule,
        BrowserAnimationsModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgxSpinnerModule,
        MatProgressBarModule,
        MatStepperModule,
        MatIconModule,
        MatBadgeModule,
        MatTableModule,
        MatButtonModule,
        MatTooltipModule,
        FormsModule,
        MatCardModule,
        MatButtonToggleModule,
        MatPaginatorModule,
        NgxJsonLdModule,
    ],
    providers: [DecimalPipe],
    bootstrap: [AppComponent],
    entryComponents: [
        LoginModalComponent,
        ConfirmModalComponent,
        InformationModalComponent,
        UpdateQuantityModalComponent
    ]
})
export class AppModule {
}
