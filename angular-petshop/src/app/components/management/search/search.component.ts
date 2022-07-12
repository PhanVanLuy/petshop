import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    gcseSearch: any;

    constructor(
        private sanitizer: DomSanitizer,
    ) {
    }

    ngOnInit() {
        this.gcseSearch = this.sanitizer.bypassSecurityTrustHtml("<gcse:search></gcse:search>");
        const cx = 'xxx';
        const gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
        const s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
    }

}
