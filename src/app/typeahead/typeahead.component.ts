import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { Common } from '../model/common.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrl: './typeahead.component.scss'
})
export class TypeaheadComponent {
  searchControl = new FormControl();
  searchResults: any[] = [];
  isdescron:any='1';

  constructor(private http: HttpClient, private router: Router) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.search(term)),
      )
      .subscribe((results) => {
        this.searchResults = results;
        console.log('results',results);
        console.log('this.searchResults',this.searchResults);
      });
  }

  clearsearchtext(item:any){    
    // this.txtSearch=item.itemname;
    // this.keyword=item.itemname;
    // this.asyncSelected=item.itemname;
    // this.selecteditem=undefined;
    this.router.navigate(['productdetail', item.itemname,item.links]);
  }

  search(term: string) {
    console.log('term===>',term);
    if (term === '') {
      return of([]);
    }
    var Guestwarehouse = Common.getWithExpiry("Guestwarehouse");
    var wh = (Common.getWithExpiry("warehouse") == undefined ? Guestwarehouse : Common.getWithExpiry("warehouse"));
    var pmodel = {
      word: term,
      PageNo: 1,
      PageSize: 10,
      warehouse: wh,
      type: 0,
      customer: Common.getWithExpiry("CustID"),
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post<any>(environment.APIUrl + '/Product/GetProductListBySearchforheader', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) }).pipe(
      map(response => response)
      //map(response => response.data), //since the response is wrapped in a data object
    );
  }
}
