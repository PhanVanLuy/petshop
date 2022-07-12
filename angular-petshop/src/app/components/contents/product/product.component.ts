import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'underscore';
import {Subject, Subscription} from 'rxjs';
import {Product} from '../../../models/product/product';
import {ProductService} from '../../../services/product.service';
import {UrlConstants} from '../../../constants/url-constants';
import {ReviewsSummary} from '../../../models/product/reviews-summary';
import {ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {BreadcrumbService} from "angular-crumbs";
import {Meta} from "@angular/platform-browser";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [DatePipe]
})
export class ProductComponent implements OnInit, OnDestroy {

    id: string;
    product: Product;
    reviewSummary: ReviewsSummary;
    productSubscription: Subscription;
    reviewSubscription: Subscription;

    gotoReviews: Subject<boolean> = new Subject();

    jsonBreadcrumbList: any;
    jsonProduct: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private scrollToService: ScrollToService,
        private breadcrumbService: BreadcrumbService,
        private metaService: Meta,
        private datePipe: DatePipe
    ) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (!_.isEmpty(params)) {
                if (params.id) {
                    const url = params.id;
                    const splits = url.split('-');
                    this.id = splits[splits.length - 1];
                    this.productSubscription = this.productService.getProduct(this.id).subscribe(value => {
                        if (value == null) {
                            this.router.navigate(['/']).then();
                            return;
                        }
                        this.product = value;
                        // tslint:disable-next-line:max-line-length
                        this.breadcrumbService.changeBreadcrumb(this.activatedRoute.snapshot, this.product.productTitle);
                        this.metaService.updateTag({
                            property: 'og:image', content: this.product.pic
                        });
                        this.metaService.updateTag({
                            name: 'twitter:image', content: this.product.pic
                        });
                        this.updateAttributes();
                        if (this.product.link !== url) {
                            this.router.navigate([UrlConstants.PRODUCT, this.product.link]).then();
                            return;
                        }
                        this.reviewSubscription = this.productService.getReviewSummary(this.id).subscribe(review => {
                            this.reviewSummary = review;
                            this.updateJson();
                        });
                    });
                    return;
                }
            }
        });
    }

    viewReviews() {
        this.scrollToService.scrollTo({
            target: 'overviews-section'
        });
        this.gotoReviews.next(true);
    }

    ngOnDestroy(): void {
        if (this.productSubscription) {
            this.productSubscription.unsubscribe();
        }
        if (this.reviewSubscription) {
            this.reviewSubscription.unsubscribe();
        }
    }

    private updateAttributes() {
        for (const attribute of this.product.attributes) {
            if (attribute.options && attribute.options.length !== 0) {
                attribute.id = attribute.options[0].optionId;
                attribute.value = attribute.options[0].text;
            }
        }
    }

    private updateJson() {
        this.jsonBreadcrumbList = {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                        "@id": "https://store4pet.net",
                        name: "Store4Pet"
                    }
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    item: {
                        "@id": "https://store4pet.net/shop/" + this.product.category,
                        name: this.product.category
                    }
                }
            ]
        };
        this.jsonProduct = {
            "@context": "https://schema.org/",
            "@type": "Product",
            name: this.product.productTitle,
            sku: this.product.productId,
            brand: {
                "@type": "Thing",
                name: "Store4Pet"
            },
            review: {
                "@type": "Review",
                reviewRating: {
                    "@type": "Rating",
                    ratingValue: this.reviewSummary.average + "",
                    bestRating: "5"
                },
                author: {
                    "@type": "Person",
                    name: "Store4Pet"
                }
            },
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: this.reviewSummary.average + "",
                reviewCount: this.reviewSummary.count + ""
            },
            image: this.product.pictures,
            description: this.product.productTitle,
            offers: {
                "@type": "Offer",
                url: "https://store4pet.net/product/" + this.product.link,
                priceCurrency: "USD",
                price: this.product.currentMin + "",
                priceValidUntil: this.datePipe.transform(new Date(new Date().getFullYear() + 1, 12, 5), 'yyyy-MM-dd'),
                itemCondition: "https://schema.org/UsedCondition",
                availability: "https://schema.org/InStock",
                seller: {
                    "@type": "Organization",
                    name: "Store4Pet"
                }
            }
        };
    }
}
