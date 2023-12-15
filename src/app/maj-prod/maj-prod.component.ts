import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
// import * as $ from 'jquery';
import { Router } from '../../../node_modules/@angular/router';
import { Common } from '../../app/model/common.model';
import { SEOService } from '../services/seo.service';
@Component({
  selector: 'app-maj-prod',
  templateUrl: './maj-prod.component.html',
  styleUrls: ['./maj-prod.component.scss']
})
export class MajProdComponent implements OnInit {
  productList: any = [];
  isListView: any;
  brandlableshow:any;
  constructor(private dataService: DataService,private seoService: SEOService, private router: Router) {
    this.GetConfigtoproductlineLableShow();
    var geturl = Common.getWithExpiry("cpname");    
    this.seoService.setPageTitle('Products - '+geturl);
    this.seoService.setkeywords('Products - '+geturl);
    this.seoService.setdescription('Products - '+geturl);
    
   }

  ngOnInit() {
    this.getProductView();
    this.getMajProd()
  }
  GetConfigtoproductlineLableShow(){
    this.brandlableshow = Common.getWithExpiry("brandlableshow");
    if (this.brandlableshow == null || this.brandlableshow == undefined || this.brandlableshow == '') {
      this.dataService.GetConfigtoproductlineLableShow().subscribe((res:any) => {
        this.brandlableshow = res;
        Common.setWithExpiry("brandlableshow", this.brandlableshow);    
      });
    }
  }

  getProductView() {
    var ProductView = Common.getWithExpiry("ProductView");    
    if (ProductView == null || ProductView == undefined || ProductView == '') {
    this.dataService.GetProductView().subscribe((data:any) => {
      ProductView = data;
      Common.setWithExpiry("ProductView",ProductView);    
      if (ProductView == "1") {
        this.isListView = false;
        // setTimeout(function () {
        //   $("#grd").click();
        // }, 5000);
      }
      else if (ProductView == "2") {
        this.isListView = true;
        // setTimeout(function () {
        //   $("#lst").click();
        // }, 5000);
      }
      else {
        this.isListView = false;
      }
    });
  }else{
    if (ProductView == "1") {
      this.isListView = false;
      // setTimeout(function () {
      //   $("#grd").click();
      // }, 5000);
    }
    else if (ProductView == "2") {
      this.isListView = true;
      // setTimeout(function () {
      //   $("#lst").click();
      // }, 5000);
    }
    else {
      this.isListView = false;
    }
  }
  }

  getMajProd() {
    this.dataService.getMajProd().subscribe((res: any) => {
      var data = res;
      if (data.length > 0)
        this.productList = res;
      else
        this.router.navigate(['/brands']);
    })
  }
}
