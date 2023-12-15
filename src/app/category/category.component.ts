import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeResourceUrl } from '../../../node_modules/@angular/platform-browser';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { MenuService } from '../services/menu.service';
import { Common } from '../model/common.model';
import { SEOService } from '../services/seo.service';
import { HttpErrorResponse } from '@angular/common/http';

// import * as $ from 'jquery';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  Guestwarehouse: any;
  productList: any = [];
  majclass: string = "";
  isaccesswithlogin: any;
  isListView: any;
  warehouse: any;
  titleheader1: any = [];
  brandlableshow: any;
  DisplayCounts: any;
  productdetailsforlist:any;
  constructor(private seoService: SEOService, private dataService: DataService,
    private menuService: MenuService, private router: Router, private route: ActivatedRoute) {
    
    if (Common.getWithExpiry("CustID") != "" && Common.getWithExpiry("CustID") != null) {
      this.warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
      this.getFirstListingPage();
      
    }
    else {
      this.Accessannomyous();
    }


  }


  ondivclick(category){
    if(category.maj_class=='' || category.maj_class==undefined){
      this.router.navigate(['/products',category.product_line.toLowerCase(), category.descr.toLowerCase()]);
    }
    else{
      this.router.navigate(['/product',category.maj_class.toLowerCase(), category.descr.toLowerCase()]);
    }
  }


  GetconfigurationforDisplayCounts() {
    this.DisplayCounts = Common.getWithExpiry("DisplayCounts");
    if (this.DisplayCounts == null || this.DisplayCounts == undefined || this.DisplayCounts == '') {
      this.dataService.GetconfigurationforDisplayCounts().subscribe((res:any) => {
        this.DisplayCounts = res;
        Common.setWithExpiry("DisplayCounts", this.DisplayCounts);
      });
    }
  }
  GetConfigtoproductlineLableShow() {
    this.brandlableshow = Common.getWithExpiry("brandlableshow");
    if (this.brandlableshow == null || this.brandlableshow == undefined || this.brandlableshow == '') {
      this.dataService.GetConfigtoproductlineLableShow().subscribe((res:any) => {
        this.brandlableshow = res;
        Common.setWithExpiry("brandlableshow", this.brandlableshow);
      });
    }
  }
  catclick(treeNode, name) {
    
    var getstrs1 = treeNode.split(',');
    if (getstrs1[0] == "category") {
      Common.setWithExpiry('selectedmaj_class', '');
      Common.setWithExpiry('selectedprod_line', getstrs1[1]);
      Common.setWithExpiry('selectedtreenode', '');
      Common.setWithExpiry('selectedsearch', '');
      Common.setWithExpiry('selecctedsatags', '');
      //this.router.navigate(['products', getstrs1[1].toLowerCase()]);
    }
    else if (getstrs1[0] == "Products") {
      //this.router.navigate(['/product']);
      //window.location.reload();
      this.productList = [];
      this.Getcategoriespath('');
      this.getBrandProduct();
    }
    else {
      Common.setWithExpiry('selectedmaj_class', '');
      Common.setWithExpiry('selectedsearch', '');
      Common.setWithExpiry('selecctedsatags', '');
      Common.setWithExpiry('selectedprod_line', '');
      Common.setWithExpiry('selectedtreenode', treeNode);
      //this.router.navigate(['/categories', treeNode.toLowerCase()]);
    }
  }
  getFirstListingPage() {
    this.GetConfigtoproductlineLableShow();
    this.getProductView();
    this.GetconfigurationforDisplayCounts();
    this.route.params.subscribe(params => {
      this.majclass = this.route.snapshot.paramMap.get('name');
      this.Getcategoriespath(this.majclass);
      if (this.majclass == undefined || this.majclass == '') {
        Common.setWithExpiry('selectedmaj_class', '');
        Common.setWithExpiry('selectedsearch', '');
        Common.setWithExpiry('selectedprod_line', '');
        Common.setWithExpiry('selecctedsatags', '');
        Common.setWithExpiry('selectedtreenode', '');
        this.getBrandProduct();
      }
      else {
        this.dataService.getproductdetailforlist(3, this.majclass).subscribe((res: any) => {
          this.productdetailsforlist = res;
        });
        this.getBrandListWithCount(this.majclass);
      }
    });
  }
  setlistview(listvi) {
    Common.setWithExpiry("ProductView", listvi);
    if (listvi == "1") {
      this.isListView = false;
    }
    else if (listvi == "2") {
      this.isListView = true;
    }
    else {
      this.isListView = false;
    }
  }
  getProductView() {
    var ProductView = Common.getWithExpiry("ProductView");
    if (ProductView == null || ProductView == undefined || ProductView == '') {
      this.dataService.GetProductView().subscribe((data:any) => {
        var dd = data;
        if (dd == "1") {
          this.isListView = false;
          // setTimeout(function () {
          //   $("#grd").click();
          // }, 5000);
        }
        else if (dd == "2") {
          this.isListView = true;
          // setTimeout(function () {
          //   $("#lst").click();
          // }, 5000);
        }
        else {
          this.isListView = false;
        }
      });
    }
    else {
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
  getGuestwarehouse() {
    this.Guestwarehouse = Common.getWithExpiry("Guestwarehouse");
    if (this.Guestwarehouse == null || this.Guestwarehouse == undefined || this.Guestwarehouse == '') {
      this.dataService.GetConfidForGuestwarehouse().subscribe((res:any) => {
        this.Guestwarehouse = res;
        Common.setWithExpiry("Guestwarehouse", this.Guestwarehouse);
        this.getFirstListingPage();
      });
    }
    else {
      this.getFirstListingPage();
    }
  }
  Accessannomyous() {
    this.isaccesswithlogin = Common.getWithExpiry("isaccesswithlogin");
    if (this.isaccesswithlogin == null || this.isaccesswithlogin == undefined || this.isaccesswithlogin == '') {
      this.dataService.GetConfidForanonymoususersbrowsethesite().subscribe((res:any) => {
        this.isaccesswithlogin = res;
        Common.setWithExpiry("iswishshow", this.isaccesswithlogin);
        if (this.isaccesswithlogin == '0') {
          this.router.navigate(['login']);
        }
        else {
          this.getGuestwarehouse();
        }
      });
    }
    else {
      if (this.isaccesswithlogin == '0') {
        this.router.navigate(['login']);
      } else {
        this.getGuestwarehouse();
      }
    }
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  ngOnInit() {
    this.gototop();
  }

  getBrandProduct() {
    var wh = (this.warehouse == null ? this.Guestwarehouse : this.warehouse);
    var CustID = Common.getWithExpiry("CustID");
    try {
      if (Common.getWithExpiry("getBrandProduct" + wh + CustID) != undefined) {
        var getlist = JSON.parse(Common.getWithExpiry("getBrandProduct" + wh + CustID));
      }
    } catch (ed) { }
    if (getlist != undefined && getlist != null && getlist.length > 0) {
      var keyword = ' ';
      for (let prod of getlist) {
        keyword =keyword + ', ' +  prod.descr ;
        if (prod.maj_class == '') {
          this.productList.push(prod);
        }
        else {
          if (!this.productList.some(x => x.maj_class.toLowerCase() == prod.maj_class.toLowerCase())) {
            this.productList.push(prod);
          }
          else {
            for (let neprod of this.productList) {
              if (neprod.maj_class.toLowerCase() == prod.maj_class.toLowerCase()) {
                neprod.Counts = parseInt(neprod.Counts) + parseInt(prod.Counts);
              }
            }
          }
        }
      }
       var geturl = Common.getWithExpiry("cpname");      
      this.seoService.setkeywords(keyword+' - '+geturl);
      this.seoService.setdescription(keyword+' - '+geturl);
    }
    else {      
      this.dataService.getBrandProduct(wh, CustID).subscribe((res:any) => {
        var getlist = res;
        if (getlist != undefined && getlist != null && getlist.length > 0) {
          Common.setWithExpiry("getBrandProduct" + wh + CustID, JSON.stringify(getlist));
          var keyword = ' ';
          for (let prod of getlist) {
            keyword =keyword + ', ' +  prod.descr ;
            if (prod.maj_class == '') {
              this.productList.push(prod);
            }
            else {
              if (!this.productList.some(x => x.maj_class.toLowerCase() == prod.maj_class.toLowerCase())) {
                this.productList.push(prod);
              }
              else {
                for (let neprod of this.productList) {
                  if (neprod.maj_class == prod.maj_class) {
                    neprod.Counts = parseInt(neprod.Counts) + parseInt(prod.Counts);
                  }
                }
              }
            }
          }
           var geturl = Common.getWithExpiry("cpname");          
          this.seoService.setkeywords(keyword+' - '+geturl);
          this.seoService.setdescription(keyword+' - '+geturl);
        }
      });
    }
  }
  Getcategoriespath(param) {
    try {
      if (Common.getWithExpiry('titleheader' + param + '1') != undefined) {
        var titleheader1 = JSON.parse(Common.getWithExpiry('titleheader' + param + '1'));
      }
    } catch (ed) { }
    if (titleheader1 == null || titleheader1 == undefined || titleheader1.length == 0) {
      this.dataService.Getcategoriespath(param, 1).subscribe((res: any) => {
        this.titleheader1 = res;
        this.titleheader1.splice(2, 1);
        var geturl = Common.getWithExpiry("cpname");
        for (var i = 0; i < this.titleheader1.length; i++) {
          geturl=this.titleheader1[i].name +' - '+geturl;
        }
        if(this.titleheader1==undefined || this.titleheader1==null || this.titleheader1.length==0){
          geturl='Product - '+geturl;
        }
        if(this.titleheader1!=undefined && this.titleheader1!=null && this.titleheader1.length>1){
          this.seoService.createLinkForCanonicalURLforproduct(this.titleheader1[1].urls);
        }
        
        this.seoService.setPageTitle(geturl);
        Common.setWithExpiry('titleheader' + param + '1', JSON.stringify(this.titleheader1));
      });      
    }
    else{
      this.titleheader1=titleheader1;
      if(this.titleheader1!=undefined && this.titleheader1!=null && this.titleheader1.length>1){
        this.seoService.createLinkForCanonicalURLforproduct(this.titleheader1[1].urls);
      }
      var geturl = Common.getWithExpiry("cpname");
        for (var i = 0; i < this.titleheader1.length; i++) {
          geturl=this.titleheader1[i].name +' - '+geturl;
        }
        if(this.titleheader1==undefined || this.titleheader1==null || this.titleheader1.length==0){
          geturl='Product - '+geturl;
        }
        this.seoService.setPageTitle(geturl);
    }
  }
  setprodline(prodline) {
    Common.setWithExpiry('selectedmaj_class', '');
    Common.setWithExpiry('selectedsearch', '');
    Common.setWithExpiry('selecctedsatags', '');
    Common.setWithExpiry('selectedprod_line', prodline);
    Common.setWithExpiry('selectedtreenode', '');
  }

  getBrandListWithCount(majclass) {
    Common.setWithExpiry('selectedmaj_class', majclass);
    Common.setWithExpiry('selectedprod_line', '');
    Common.setWithExpiry('selecctedsatags', '');
    Common.setWithExpiry('selectedtreenode', '');
    Common.setWithExpiry('selectedsearch', '');
    var getcustomer=Common.getWithExpiry("CustID");
    this.Getcategoriespath(majclass);
    this.productList = [];
    var wh = (this.warehouse == null ? this.Guestwarehouse : this.warehouse);
    var result = null;
    try {
      if (Common.getWithExpiry("getBrandListWithMenu" + majclass + wh+getcustomer) != undefined) {
        result = JSON.parse(Common.getWithExpiry("getBrandListWithMenu" + majclass + wh+getcustomer));
      }
    } catch (ed) { }
    if (result != undefined && result != null && result.length > 0) {
      var keyword = ' ';
      for (let prod of result) {

        this.productList.push({
          "image": prod.image,
          "Counts": prod.ItemCount,
          "descr": prod.PLDescr,
          "product_line": prod.product_line
        });
        keyword =keyword + ', ' + prod.PLDescr;
      }
       var geturl = Common.getWithExpiry("cpname");
      this.seoService.setkeywords(keyword+' - '+geturl);
      this.seoService.setdescription(keyword+' - '+geturl);
    }
    else {
      this.menuService.getBrandListWithMenu(majclass, wh,getcustomer).subscribe((res:any) => {
        let result: any = res;
        if(result==undefined || result==null || result.length==0){
          this.router.navigate(['categories']);
        }
        Common.setWithExpiry("getBrandListWithMenu" + majclass + wh+getcustomer, JSON.stringify(result));
        var keyword = ' ';
        for (let prod of result) {

          this.productList.push({
            "image": prod.image,
            "Counts": prod.ItemCount,
            "descr": prod.PLDescr,
            "product_line": prod.product_line
          });
          keyword =keyword + ', ' +  prod.PLDescr;
        }
         var geturl = Common.getWithExpiry("cpname");
         this.seoService.setkeywords(keyword+' - '+geturl);
         this.seoService.setdescription(keyword+' - '+geturl);
        // }, (error: HttpErrorResponse) => {
        //   this.router.navigateByUrl('404', { skipLocationChange: true })
        });
    }
    this.gototop();
  }
}
