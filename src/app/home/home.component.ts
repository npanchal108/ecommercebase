import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { exists } from 'fs';
import { LoadingService } from '../services/loading.service';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeResourceUrl } from '../../../node_modules/@angular/platform-browser';
import { Common } from '../../app/model/common.model';
import { SEOService } from '../services/seo.service';
import { ContactService } from '../services/contact.service';
import { environment } from '../../environments/environment.development';

// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel';
// import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuList: any = [];
  categoryList: any = [];
  treeNode: string = "";
  titleheader: any = [];
  isaccesswithlogin: any;
  isListView: any;
  TreeNode:any;
  warehouse: any;
  HomePageBrandsLable:any;
  homebannerList: any;
  catergoryLable: any;
  showIndicators: any = true;
  Secondcontact: any;
  productList: any = [];
  iscat:any=0;
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true };
  slideConfig1 = { "slidesToShow": 3, "slidesToScroll": 3, "autoplay": true, "arrows": false, "dots": true, "responsive": [{ "breakpoint": 767, "settings": { "slidesToShow": 2, } }, { "breakpoint": 480, "settings": { "slidesToShow": 1, } }] };
  slideConfig2 = { "slidesToShow": 3, "slidesToScroll": 3, "autoplay": true, "arrows": false, "dots": true, "responsive": [{ "breakpoint": 767, "settings": { "slidesToShow": 2, } }, { "breakpoint": 480, "settings": { "slidesToShow": 1, } }] };
  carouselOptions = {
    items: 3,
    dots: true,
    nav: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
      },
      770: {
        items: 3,
      }
    }
  };
  Allconfigurationlist: any = [];
  iskyraden:any;
  dynamicpagelist: any;
  dynamicpagelist1: any;

  constructor(private contactService: ContactService,  private loadingService: LoadingService,private seoService: SEOService, private sanitizer: DomSanitizer, private dataService: DataService, private menuService: MenuService, private router: Router, private route: ActivatedRoute) {
    this.iskyraden=environment.iskyraden;
    this.GetHomePageConfigurations();
    // var sub = this.route
    // .data
    // .subscribe(v => console.log(v));
    // var geturl = Common.getWithExpiry("cpname");    
    // this.seoService.setPageTitle('Home - '+geturl);
    // this.seoService.setmetatag('Home - '+geturl);
    // this.seoService.createLinkForCanonicalURL();
    this.getcontactusSecondDetails();
    if (Common.getWithExpiry("CustID") != undefined && Common.getWithExpiry("CustID") != null) {
      this.warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
      //this.GetFirstpageload();
    }
    else {
      //this.Accessannomyous();
    }
    // this.getProductView();
    this.bannerImage();
    this.Getpagelistbytype();
    this.Getpagelistbytype1();
    // this.cofigurtiondforcatergoryLable();
  }
  Getpagelistbytype() {
    try {
      if(Common.getWithExpiry("GetPagelistbytypeblogs")!=undefined){
        this.dynamicpagelist = JSON.parse(Common.getWithExpiry("GetPagelistbytypeblogs"));
      }
    } catch (ed) { }
    if (this.dynamicpagelist == null || this.dynamicpagelist == undefined || this.dynamicpagelist.length==0) {
    this.sendMessage('start');
    this.dataService.GetPagelistbytype(1, 5, 'blogs').subscribe((data: any) => {
      this.dynamicpagelist = data;
      Common.setWithExpiry("GetPagelistbytypeblogs",JSON.stringify(this.dynamicpagelist))
      this.sendMessage('stop');
    });
  }
  }
  Getpagelistbytype1() {
    try {
      if(Common.getWithExpiry("GetPagelistbytypeourlines")!=undefined){
        this.dynamicpagelist1 = JSON.parse(Common.getWithExpiry("GetPagelistbytypeourlines"));
      }
    } catch (ed) { }
    if (this.dynamicpagelist1 == null || this.dynamicpagelist1 == undefined || this.dynamicpagelist1.length==0) {
    this.sendMessage('start');
    this.dataService.GetPagelistbytype(1, 10, 'our-lines').subscribe((data: any) => {
      this.dynamicpagelist1 = data;
      Common.setWithExpiry("GetPagelistbytypeourlines",JSON.stringify(this.dynamicpagelist1));
      this.sendMessage('stop');
    });
  }
  }
  getFacebookShareLink(pageTitle: any): string {
    const currentUrl = window.location.href;
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${currentUrl}/${pageTitle}`)}`;
  }
  sendMessage(message: string): void {
    this.loadingService.LoadingMessage(message);
  }

  getInstaShareLink(pageTitle: any): string {
    const currentUrl = window.location.href;
    return `https://www.instagram.com/share?url=${currentUrl}/${pageTitle}`
  }

  getPinterestShareLink(pageTitle: any, image: string | number | boolean, description: string | number | boolean): string {
    const urlToShare = `${window.location.href}/${pageTitle}`;
    return `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      urlToShare
    )}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(
      description
    )}`;
  }
  getlinkedinShareLink(pageTitle: any): string {
    const currentUrl = window.location.href;
    return `https://www.linkedin.com/share?url=${currentUrl}/${pageTitle}`;
  }

  getTwitterShareLink(pageTitle: any): string {
    const urlToShare = `${window.location.href}/${pageTitle}`;
    const text = pageTitle; // Replace with your desired text
    return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      urlToShare
    )}&text=${encodeURIComponent(text)}`;
  }
  GetHomePageConfigurations() {

    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      try {
        this.Allconfigurationlist = JSON.parse(Common.getWithExpiry("Allconfigs"));
      } catch (ed) { }
    }
    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      this.sendMessage('start');
      this.dataService.GetAllConfiguration().subscribe((data: any) => {
        this.sendMessage('stop');
        this.Allconfigurationlist = data;
        Common.setWithExpiry("Allconfigs", JSON.stringify(this.Allconfigurationlist));
        for (var i = 0; i < this.Allconfigurationlist.length; i++) {
          if (this.Allconfigurationlist[i].ConfigKey == "HomePageCategoryLable") {
            this.catergoryLable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "TreeNode") {
            this.TreeNode = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "HomePageBrandsLable") {
            this.HomePageBrandsLable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withoutloginBrowse") {
            this.isaccesswithlogin = this.Allconfigurationlist[i].ConfigValue;
            if (Common.getWithExpiry("CustID") == undefined || Common.getWithExpiry("CustID") == null) {
              if (this.isaccesswithlogin == '0') {
                this.router.navigate(['login']);
              } else {
                if(!this.iskyraden){
                this.getGuestwarehouse();
                }
              }
            }
          }
        }
        
      })
    }
    else {
      for (var i = 0; i < this.Allconfigurationlist.length; i++) {
        if (this.Allconfigurationlist[i].ConfigKey == "HomePageCategoryLable") {
          this.catergoryLable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "TreeNode") {
          this.TreeNode = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "HomePageBrandsLable") {
          this.HomePageBrandsLable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withoutloginBrowse") {
          this.isaccesswithlogin = this.Allconfigurationlist[i].ConfigValue;
          if (Common.getWithExpiry("CustID") == undefined || Common.getWithExpiry("CustID") == null) {
            if (this.isaccesswithlogin == '0') {
              this.router.navigate(['login']);
            } else {
              if(!this.iskyraden){
                this.getGuestwarehouse();
                }
            }
          }
        }
      }
      if(!this.iskyraden){
      this.GetFirstpageload();
      }
    }
  }
  setprodline(prodline: string) {
    Common.setWithExpiry('selectedmaj_class', '');
    Common.setWithExpiry('selectedsearch', '');
    Common.setWithExpiry('selecctedsatags', '');
    Common.setWithExpiry('selectedprod_line', prodline);
    Common.setWithExpiry('selectedtreenode', '');
  }
  getBrandListWithCount(majclass: string) {
    Common.setWithExpiry('selectedmaj_class', majclass);
    Common.setWithExpiry('selectedprod_line', '');
    Common.setWithExpiry('selecctedsatags', '');
    Common.setWithExpiry('selectedtreenode', '');
    Common.setWithExpiry('selectedsearch', '');
  }
  cofigurtiondforcatergoryLable() {
    this.catergoryLable = Common.getWithExpiry("catergoryLable");
    if (this.catergoryLable == null || this.catergoryLable == undefined) {
      this.dataService.cofigurtiondforHomePageCategoryLable().subscribe((data: any) => {
        this.catergoryLable = data;
      });
    }
  }
  getcontactusSecondDetails() {
    try {
      if (Common.getWithExpiry("Secondcontact") != undefined) {
        var Secondcontact = JSON.parse(Common.getWithExpiry("Secondcontact"));
      }
    } catch (ed) { }
    if (Secondcontact == null || Secondcontact == undefined || Secondcontact.length == 0) {
      this.contactService.getContactSecondaryDetails().subscribe((res: any) => {
        this.Secondcontact = res;
        this.getContactDtl();
        Common.setWithExpiry("Secondcontact", JSON.stringify(this.Secondcontact));
      });
    }
    else {
      this.Secondcontact = Secondcontact;
      this.getContactDtl();
    }
  }

  getContactDtl() {
    try {
      if (Common.getWithExpiry("contactDtl") != undefined) {
        var contactDtl = JSON.parse(Common.getWithExpiry("contactDtl"));
      }
    } catch (ed) { }
    if (contactDtl == null || contactDtl == undefined || contactDtl == '') {
      this.contactService.getContact(Common.getWithExpiry("company_sy")).subscribe((res: any) => {
        contactDtl = res;
        Common.setWithExpiry("contactDtl", contactDtl);
        if (this.Secondcontact.cName == undefined || this.Secondcontact.cName == null || this.Secondcontact.cName == '') {
          Common.setWithExpiry("cpname", contactDtl.name);
        }
        else {
          Common.setWithExpiry("cpname", this.Secondcontact.cName);
        }
        Common.setWithExpiry("company_cu", contactDtl.company_cu);
        Common.setWithExpiry("company_it", contactDtl.company_it);
        Common.setWithExpiry("company_sy", contactDtl.company_sy);
        var geturl = Common.getWithExpiry("cpname");
        this.seoService.setPageTitle('Home - ' + geturl);
        this.seoService.setkeywords('Home - ' + geturl);
        this.seoService.setdescription('Home - ' + geturl);
      })
    }
    else {

      if (this.Secondcontact.cName == undefined || this.Secondcontact.cName == null || this.Secondcontact.cName == '') {
        Common.setWithExpiry("cpname", contactDtl.name);
      }
      else {
        Common.setWithExpiry("cpname", this.Secondcontact.cName);
      }
      var geturl = Common.getWithExpiry("cpname");
      this.seoService.setPageTitle('Home - ' + geturl);
      this.seoService.setkeywords('Home - ' + geturl);
      this.seoService.setdescription('Home - ' + geturl);
      
    }
  }

  bannerImage() {
    try {
      if(Common.getWithExpiry("homebannerList")!=undefined){
      var homebannerList = JSON.parse(Common.getWithExpiry("homebannerList"));
      }
    } catch (ed) { }
    if (homebannerList == null || homebannerList == undefined || homebannerList.length==0) {
      this.sendMessage('start');
    this.dataService.getHomeBanner().subscribe((res: any) => {
      this.sendMessage('stop');
      this.homebannerList = res;
      Common.setWithExpiry("homebannerList", JSON.stringify(this.homebannerList));
    });
    }
    else{
      this.homebannerList=homebannerList;
    }
  }
  //  getProductView() {
  //   this.dataService.GetProductView().subscribe((data:any) => {
  //     var dd = data;
  //     if (dd == "1") {
  //       this.isListView=false;
  //       setTimeout(function () {
  //         $("#grd").click();
  //       }, 5000);
  //     }
  //     else if(dd =="2")
  //     {
  //       this.isListView=true;
  //       setTimeout(function () {          
  //         $("#lst").click();
  //       }, 5000);
  //     }
  //     else{
  //       this.isListView=false;
  //     }
  //   });
  // }
  getGuestwarehouse() {
    this.warehouse = Common.getWithExpiry("Guestwarehouse");
    if (this.warehouse == null || this.warehouse == undefined || this.warehouse == '') {
      this.dataService.GetConfidForGuestwarehouse().subscribe((res: any) => {
        this.warehouse = res;
        Common.setWithExpiry("Guestwarehouse", this.warehouse);
        this.GetFirstpageload();
      });
    }
    else {
      this.GetFirstpageload();
    }
  }
  Accessannomyous() {
    this.isaccesswithlogin = Common.getWithExpiry("isaccesswithlogin");
    if (this.isaccesswithlogin == null || this.isaccesswithlogin == undefined || this.isaccesswithlogin == '') {
      this.dataService.GetConfidForanonymoususersbrowsethesite().subscribe((res: any) => {
        this.isaccesswithlogin = res;
        Common.setWithExpiry("iswishshow", this.isaccesswithlogin);
        if (this.isaccesswithlogin == '0') {
          this.router.navigate(['login']);
        } else {
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
  cleanURL(oldURL: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }
  GetFirstpageload() {
    if(this.TreeNode=='1'){
    this.getAllCategory();
    this.getBrandProduct();
    }
    else{
      this.getBrandProduct();
    }
    
  }

  getAllCategory() {
    //console.log('called');
    //var menuList=null;
    try {
      var getcustomer =Common.getWithExpiry('CustID');
      if (Common.getWithExpiry('menuList1'+getcustomer) != undefined) {
        this.menuList = JSON.parse(Common.getWithExpiry('menuList1'+getcustomer));
      }
    } catch (ed) { this.menuList=undefined;}
    if (this.menuList === undefined || this.menuList === null || this.menuList.length === 0) {
      //this.sendMessage('start');
      this.menuService.getMenu(this.warehouse, '',getcustomer).subscribe((res: any) => {
        //this.sendMessage('stop');
        this.menuList = res;        
        Common.setWithExpiry('menuList1'+getcustomer, JSON.stringify(this.menuList));
        //console.log('called',this.menuList);
      });
    }
    else {
      //this.menuList = menuList;
      //console.log('called',this.menuList);
    }
     
  }




  getcheckformenuchicl(treeNode: any) {
    var flag = false;
    for (let menu of this.menuList) {
      if (menu.parent_node == treeNode) {
        flag = true;
        break;
      }
    }
    return flag;
  }
  getBrandProduct() {
    var wh = this.warehouse;
    var CustID = Common.getWithExpiry("CustID");
    try {
      if (Common.getWithExpiry("getBrandProduct" + wh + CustID) != undefined) {
        var getlist = JSON.parse(Common.getWithExpiry("getBrandProduct" + wh + CustID));
      }
    } catch (ed) { }
    if (getlist != undefined && getlist != null && getlist.length > 0) {
      var keyword = ' ';
      for (let prod of getlist) {
        keyword = keyword + ', ' + prod.descr;
        if (prod.maj_class == '') {
          this.productList.push(prod);
        }
        else {
          if (!this.productList.some((x: { maj_class: string; }) => x.maj_class.toLowerCase() == prod.maj_class.toLowerCase())) {
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
      this.seoService.setkeywords(keyword + ' - ' + geturl);
      this.seoService.setdescription(keyword + ' - ' + geturl);
      if(this.productList.length>10){
        this.productList = this.productList.slice(0,8);
      }
    }
    else {
      this.dataService.getBrandProduct(wh, CustID).subscribe((res: any) => {
        var getlist = res;
        if (getlist != undefined && getlist != null && getlist.length > 0) {
          Common.setWithExpiry("getBrandProduct" + wh + CustID, JSON.stringify(getlist));
          var keyword = ' ';
          for (let prod of getlist) {
            keyword = keyword + ', ' + prod.descr;
            if (prod.maj_class == '') {
              this.productList.push(prod);
            }
            else {
              if (!this.productList.some((x: { maj_class: string; }) => x.maj_class.toLowerCase() == prod.maj_class.toLowerCase())) {
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

        }
        if(this.productList.length>10){
          this.productList = this.productList.slice(0,8);
        }
      });
    }
  }

  searcharray(nameKey: any, myArray: string | any[]) {
    var flag = false;
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        flag = true;
      }
    }
    return flag;
  }

  searcharray1(nameKey: any, myArray: string | any[]) {
    var flag = false;
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].treeNode === nameKey) {
        flag = true;
      }
    }
    return flag;
  }



  catclick(treeNode: string, name: string) {
    Common.setWithExpiry('selectedmaj_class', '');
    Common.setWithExpiry('selectedprod_line', '');
    Common.setWithExpiry('selectedtreenode', treeNode);
    var gethaschild = Common.getWithExpiry("hasChildMenu" + treeNode + this.warehouse);
    if (gethaschild != undefined && gethaschild != null && gethaschild != '') {
      if (gethaschild) {
        if(this.iskyraden){
          this.router.navigate(['categories', treeNode.toLowerCase()]);
        }
        else{
        this.router.navigate(['categories', treeNode.toLowerCase(),name.toLowerCase()]);
        }
      }
      else {
        if(this.iskyraden){
          this.router.navigate(['/category', treeNode.toLowerCase()]);
        }
        else{
        this.router.navigate(['/category', treeNode.toLowerCase(),name.toLowerCase()]);
        }
      }
    }
    else {
      this.menuService.hasChildMenu(treeNode, this.warehouse).subscribe((res: any) => {
        var hasChildMenu = res;
        if (hasChildMenu == true) {
          if(this.iskyraden){
            this.router.navigate(['categories', treeNode.toLowerCase()]);
          }
          else{
          this.router.navigate(['categories', treeNode.toLowerCase(),name.toLowerCase()]);
          }
        }
        else {
          if(this.iskyraden){
            this.router.navigate(['/category', treeNode.toLowerCase()]);
          }
          else{
          this.router.navigate(['/category', treeNode.toLowerCase(),name.toLowerCase()]);
          }
        }
      })
    }
    // this.Getcategoriespath(treeNode);
  }
}
