import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './components/index/index.component';
import {UrlConstants} from './constants/url-constants';
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
import {OrderTrackingComponent} from './components/management/order-tracking/order-tracking.component';
import {TermsConditionsComponent} from './components/informations/terms-conditions/terms-conditions.component';
import {CookiePolicyComponent} from './components/informations/cookie-policy/cookie-policy.component';
import {RefundPolicyComponent} from './components/informations/refund-policy/refund-policy.component';
import {PrivacyPolicyComponent} from './components/informations/privacy-policy/privacy-policy.component';
import {HistoryComponent} from './components/management/history/history.component';
import {DeliveryDetailsComponent} from './components/informations/delivery-details/delivery-details.component';
import {VendorDetailsComponent} from './components/informations/vendor-details/vendor-details.component';
import {AboutUsComponent} from './components/informations/about-us/about-us.component';
import {UserPolicyComponent} from './components/informations/user-policy/user-policy.component';
import {TitleConstants} from './constants/title-constants';
import {SearchComponent} from './components/management/search/search.component';


const routes: Routes = [
    {
        path: UrlConstants.INDEX,
        component: IndexComponent, pathMatch: 'full'
    },
    {
        path: UrlConstants.SHOP,
        component: ShopComponent,
        data: {breadcrumb: TitleConstants.SHOP},
    },
    {
        path: UrlConstants.SHOP_CATEGORY,
        component: ShopComponent,
        data: {breadcrumb: TitleConstants.SHOP}
    },
    {
        path: UrlConstants.CART,
        component: CartComponent,
        data: {breadcrumb: TitleConstants.CART}
    },
    {
        path: UrlConstants.BLOG,
        component: BlogComponent,
        data: {breadcrumb: TitleConstants.BLOG}
    },
    {
        path: UrlConstants.PROFILE,
        component: ProfileComponent,
        data: {breadcrumb: TitleConstants.PROFILE}
    },
    {
        path: UrlConstants.REFUND,
        component: RefundComponent,
        data: {breadcrumb: TitleConstants.REFUND}
    },
    {
        path: UrlConstants.WISH_LIST,
        component: WishListComponent,
        data: {breadcrumb: TitleConstants.WISH_LIST}
    },
    {
        path: UrlConstants.CHECKOUT,
        component: CheckoutComponent,
        data: {breadcrumb: TitleConstants.CHECKOUT}
    },
    {
        path: UrlConstants.CHECKOUT_ID,
        component: CheckoutComponent,
        data: {breadcrumb: TitleConstants.CHECKOUT}
    },
    {
        path: UrlConstants.PRODUCT_ID,
        component: ProductComponent,
        data: {breadcrumb: TitleConstants.PRODUCT}
    },
    {
        path: UrlConstants.ORDER_TRACKING,
        component: OrderTrackingComponent,
        data: {breadcrumb: TitleConstants.ORDER_TRACKING}
    },
    {
        path: UrlConstants.ORDER_TRACKING_ID,
        component: OrderTrackingComponent,
        data: {breadcrumb: TitleConstants.ORDER_TRACKING}
    },
    {
        path: UrlConstants.HISTORY,
        component: HistoryComponent,
        data: {breadcrumb: TitleConstants.HISTORY}
    },


    /*---------------------INFORMATION-----------------------------------*/
    {
        path: UrlConstants.CONTACT,
        component: ContactComponent,
        data: {breadcrumb: TitleConstants.CONTACT}
    },
    {
        path: UrlConstants.PRIVACY_POLICY,
        component: PrivacyPolicyComponent,
        data: {breadcrumb: TitleConstants.PRIVACY_POLICY}
    },
    {
        path: UrlConstants.REFUND_POLICY,
        component: RefundPolicyComponent,
        data: {breadcrumb: TitleConstants.REFUND_POLICY}
    },
    {
        path: UrlConstants.COOKIE_POLICY,
        component: CookiePolicyComponent,
        data: {breadcrumb: TitleConstants.COOKIE_POLICY}
    },
    {
        path: UrlConstants.TERMS_CONDITIONS,
        component: TermsConditionsComponent,
        data: {breadcrumb: TitleConstants.TERMS_CONDITIONS}
    },
    {
        path: UrlConstants.USER_POLICY,
        component: UserPolicyComponent,
        data: {
            breadcrumb: TitleConstants.USER_POLICY
        }
    },
    {
        path: UrlConstants.ABOUT_US,
        component: AboutUsComponent,
        data: {breadcrumb: TitleConstants.ABOUT_US}
    },
    {
        path: UrlConstants.VENDOR_DETAILS,
        component: VendorDetailsComponent,
        data: {breadcrumb: TitleConstants.VENDOR_DETAILS}
    },
    {
        path: UrlConstants.DELIVERY_DETAILS,
        component: DeliveryDetailsComponent,
        data: {breadcrumb: TitleConstants.DELIVERY_DETAILS}
    },
    {
        path: UrlConstants.SEARCH,
        component: SearchComponent,
        data: {breadcrumb: TitleConstants.SEARCH}
    },


    /*---------------------COMMON-----------------------------------*/
    {
        path: UrlConstants.NOT_FOUND,
        component: NotFoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
