import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgcCookieConsentService} from 'ngx-cookieconsent';
import {AuthService} from './services/auth.service';
import {SyncService} from './services/sync.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from "rxjs/operators";
import {Breadcrumb, BreadcrumbService} from "angular-crumbs";
import {Meta, Title} from "@angular/platform-browser";

// tslint:disable-next-line:ban-types
declare let ga: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    // noinspection JSUnusedLocalSymbols
    constructor(
        private ccService: NgcCookieConsentService,
        private authService: AuthService,
        private syncService: SyncService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private breadcrumbService: BreadcrumbService,
        private titleService: Title,
        private metaService: Meta,
    ) {
    }

    private static createTitle(routesCollection: Breadcrumb[]) {
        const title = 'Store4Pet';
        const titles = routesCollection.filter((route) => route.displayName);
        if (!titles.length) {
            return `Pet Supplies Accessories And Products Online - ${title}`;
        }

        const routeTitle = AppComponent.titlesToString(titles);
        return `${routeTitle}${title}`;
    }

    private static titlesToString(titles) {
        return titles.reduce((prev, curr) => {
            return `${curr.displayName} - ${prev}`;
        }, '');
    }

    ngOnInit() {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd)
        ).subscribe((event) => {
            window.scrollTo(0, 0);
            if (event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });
        this.breadcrumbService.breadcrumbChanged.subscribe((crumbs) => {
            const title = AppComponent.createTitle(crumbs);
            this.titleService.setTitle(title);
            this.metaService.updateTag({
                name: 'description', content: title
            });
            this.metaService.updateTag({
                name: 'twitter:title', content: title
            });
            this.metaService.updateTag({
                property: 'og:description', content: title
            });
            this.metaService.updateTag({
                property: 'og:url', content: `https://store4pet.net${this.router.url}`
            });
            this.metaService.updateTag({
                property: 'og:title', content: title
            });
        });
    }

    ngOnDestroy() {
    }
}
