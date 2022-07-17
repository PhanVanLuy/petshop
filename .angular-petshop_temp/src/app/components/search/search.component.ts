import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UrlConstants} from '../../constants/url-constants';
import {isNull} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  searchProducts(keyword: string) {
    if (keyword.length !== 0) {
      this.router.navigateByUrl('/search/' + keyword);
    } else {
      this.router.navigateByUrl(UrlConstants.PRODUCTS).then();
    }
  }
}
