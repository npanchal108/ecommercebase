// import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { RoutingState } from '../services/routingState';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CartService } from '../services/cart.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryComponent } from '@kolkov/ngx-gallery';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Common } from '../../app/model/common.model';
import { SEOService } from '../services/seo.service';
import { DemoService } from '../services/demo.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Component, OnInit, Optional, Inject, PLATFORM_ID, OnDestroy, ViewChild } from '@angular/core';
//import { RESPONSE, REQUEST } from '@nguniversal/express-engine/tokens';
import { isPlatformServer } from '@angular/common';
import { Request, Response, urlencoded } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
//import * as arraySort from 'array-sort';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel';
import * as $ from 'jquery';
import { environment } from '../../environments/environment';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  Addtocart: boolean = true;
  item: any = {};
  item1: any;
  itemNo: any;
  sysnote = [];
  sysimage = [];
  @ViewChild(NgxGalleryComponent) ngxGalleryComponent: NgxGalleryComponent;
  qtymsg: any;
  objUnitArr = [];
  slideConfig = { "slidesToShow": 3, "slidesToScroll": 3, "autoplay": false, "arrows": true, "dots": true, "responsive": [{ "breakpoint": 767, "settings": { "slidesToShow": 2, } }, { "breakpoint": 480, "settings": { "slidesToShow": 1, } }] };
  isSAitem: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  Label7: any;
  isvendor: any;
  isMenufacturer: any;
  showSlider: boolean = true;
  pricemsgwithoutlogin: any;
  qtymsgwithoutlogin: any;
  objPriceArr: any = [];
  objQtyArr: any = [];
  prodPrice: any = {};
  Pricebreaks: any = [];
  profileinfo: any;
  AddZero: any;
  webtype: any;
  show3D: boolean = false;
  prodId3d: string;
  urlp: string;
  listprice: any;
  userwishlist: any = [];
  userrfqlist: any = [];
  currentitem: any;
  iswish: boolean = false;
  isrfq: boolean = false;
  iswishshow: any;
  isrfqshow: any;
  showstock: any;
  isshowpricebreaks: any;
  ismultipleum: any;
  isitemprofile: any;
  addtonotavail: any;
  annastock: any;
  annavail: any;
  priceshow: any;
  pricemsg: any;
  GuestUserID: any;
  featureTitle: string;
  profileTitle: string;
  overviewTitle: string;
  D3Title: string;
  withloginprice: any;
  withloginpricelist: any;
  withloginavailshow: any;
  withloginavaillist: any;
  warehousenames: any;
  warehousenamesetting: any;
  withloginavailqty: any;
  isLoggedIn: any;
  isaccesswithlogin: any;
  Guestwarehouse: any;
  withoutloginavaillist: any;
  warehouse: any;
  origin: any;
  MinQty: boolean = false;
  MaxQty: boolean = false;
  Multiply: any;
  isprofiledesc: any;
  profilenoforitemdesc: any;
  arraynoforitemdesc: any;
  sy_prof_label: any;
  IsMuscle: any;
  decimalpoints: any;
  Productlineshow: any;
  orderdic: string;
  ddt: string = "order";
  orderdic1: any;
  childproducts: any = [];
  itemselect: any;
  cartProducts: any;
  itlable: any;
  israteshowforcu: any;
  isumdescr: any;
  umdescrlist: any;
  threedhtml: any;
  itemList: any = [];
  multiviewtype: any;
  bulkpriceformultiproduct: any = [];
  PriceRound: any;
  isshowsinglecart: boolean = true;
  isfeature: boolean = false;
  baseitemAdd: any;
  showups: any;
  isshowpriceifone: any;
  Label1: any;
  Label2: any;
  Label3: any;
  Label4: any;
  Label5: any;
  Label6: any;
  multiplewarehouseinone: any;
  SelectedPartNumber: any;
  fllagtochild: any = false;
  isnotedisplay: any;
  salablelist: any;
  urlCache = new Map<string, SafeResourceUrl>();
  businesstype: any;
  configforcartbyprofile: any = '0';
  AddToCartAsPerProfileNo: any;
  AddToCartAsPerProfileArrayNo: any;
  DisplayListPriceInProductDetails: any = '0';
  DisplayListPriceInProductDetailswithoutLogin: any;
  DisplayListPriceLable: any = 'List Price';
  PriceOrLable: any;
  ProfilePriceLable: any;
  stocklable: any;
  titleheader1: any;
  breadcumin: any;
  drop_ship: any;
  drop_shiplable: any;
  UrlWithDetails: any;
  UrlWithFreeForm: any;
  threedsetting: any = '0';
  ItemDisclamier: any;
  IsRelatedProduct: any;
  RelatedProductLable: any;
  RelatedProductList: any;
  iscartthere: any;
  isWishthere: any;
  isrfqthere: any;
  vendorinproductlist: any;
  showIndicators: any = true;
  priceshowcust: any;
  treeNodeValue: any;
  IsRetailPrice: any;
  RetailPriceLabel: any;
  IsProfileShow: any;
  ProfileNo: any;
  ProfileIndex: any;
  ProfileLable: any;
  UMdropdown: any;
  ListPriceShow: any;
  DescrToShow: any;
  wishlistlable: any;
  itemnameddl: any = "";
  showProductDDL: any;
  newItemDate: any;
  newitemdays: any;
  showColorPellet: any;
  Multiplewarehouseforavaibility: any;
  isNewProduct: boolean = false;
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
  private _routerSub = Subscription.EMPTY;
  avg_lead_time: any;
  avg_lead_time_lable: any;
  DisplayUmQty: any;
  avg_lead_time_value: any;
  pdfbuttonshow: any;
  isGuestLogin: any;
  logintype: any;
  maxlable: any;
  minlable: any;
  avaibilitylable: any = 'Availability:';
  childitemlable: any;
  addnewqtywithnewlogic: any;
  displaynewavails: any;
  displaynewavailslable: any;
  tabord:any=1;
  image1:any;
  whlable1:any;
  whlable2:any;
  whlable3:any;
  documentlist:any;
  iskrayden:any;
  pdfSrc = '../../../assets/sample.pdf';

  constructor(
    // @Optional() @Inject(REQUEST) private request: Request,
    // @Optional() @Inject(RESPONSE) private response: Response,
    @Inject(PLATFORM_ID) private platformId: any,private gtmService: GoogleTagManagerService, private seoService: SEOService, private routingState: RoutingState, private toastr: ToastrService, private dataService: DataService, private route: ActivatedRoute, private cartService: CartService, private router: Router,
    private sanitizer: DomSanitizer, private demoService: DemoService) {
    //this.galleryImages=[];
    this.getlogintype();
    this.GetavaibilitylableConfig();
    this.guestLoginSetting();
    this.iskrayden=environment.iskyraden;
    this.Getwarehousenamesetting();
    this.getbaseitemconfig();
    this.getwithloginprice();
    this.getwithloginavailshow();
    this.getpricemsg();
    this.ConfigurationForpdfbuttonshow();
    this.GetConfigtomultiplewarehouseinone();
    this.GetNewItemDate();
    this.Getnewitemdays();
    this.getchilditemlable();
    this.GetDropdownConfig();
    this.GetCollerPelletConfig();
    this.GetUMdropdown();
    this.Getavg_lead_time();
    this.GetConfigforwishlistlable();
    this.GetMultiplewarehouseforavaibility();
    this.getDescrToShow();
    this.getListPriceShow();
    this.getIsRetailPrice();
    this.getIsProfileShow();
    this.getUrlWithDetails();
    this.getiscartthere();
    this.getiswishthere();
    this.getisrfqthere();
    this.configforvendorinproductlist();
    this.ConfigurationForItemDisclamier();
    this.getthreedsetting();
    this.showpricetocustomers();
    this.GetDisplayUmQty();
    this.Getminlable();
    this.Getmaxlable();
    this.Getaddnewqtywithnewlogic();
    this.Getdisplaynewavails();
    this.Getdisplaynewavailslable();
    this.getconfigtowhlable1();
    this.getconfigtowhlable2();
    this.getconfigtowhlable3();
    //if (this.threedsetting == '0') {
    this._routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe((value) => {

        if (this.router.url.indexOf("/productdetail/") != -1) {
          var itemNo = this.route.snapshot.paramMap.get('item');
          itemNo = decodeURI(itemNo);
          
          if (this.item1 != undefined && this.item1 != null && this.item1.itemname != itemNo) {
            this.galleryImages=[];
            this.getproductdetailsfirst();
            this.gototop();
          }
        }
      });
    //}
    this.dataService.GetPermissionConfig().subscribe((res: any) => {
      if (res == "1") {
        if (Common.getWithExpiry("UserType") == '3') {
          var permis = JSON.parse(Common.getWithExpiry("ProfileLog"));
          this.israteshowforcu = permis[8];
        }
        else if( Common.getWithExpiry("SalesUserType")=='2'){
          var subuser = Common.getWithExpiry("subuser").toString();
          if(subuser!=undefined && subuser!=''){
            var permissions = Common.getWithExpiry("Permission").split(';');
            if (permissions.indexOf("SP") != -1) {
              this.israteshowforcu = true;
            }
            else {
              this.israteshowforcu = false;
            }  
          }
          else{
            this.israteshowforcu = true;
          }
        }
        else {
          this.israteshowforcu = true;
        }        
        
      }
      else {
        if (Common.getWithExpiry("UserType") == '3') {
          var permissions = Common.getWithExpiry("Permission").split(';');
          if (permissions.indexOf("SP") != -1) {
            this.israteshowforcu = true;
          }
          else {
            this.israteshowforcu = false;
          }
        }
        else if( Common.getWithExpiry("SalesUserType")=='2'){
          var subuser = Common.getWithExpiry("subuser").toString();
          if(subuser!=undefined && subuser!=''){
            var permissions = Common.getWithExpiry("Permission").split(';');
            if (permissions.indexOf("SP") != -1) {
              this.israteshowforcu = true;
            }
            else {
              this.israteshowforcu = false;
            }  
          }
          else{
            this.israteshowforcu = true;  
          }
        }
        else{
          this.israteshowforcu = true;
        }
      }
    });

    this.Getsalable();
    this.cofigurtiondfordrop_ship();
    this.configforbreadcuminproductdetail();
    this.configforstocklable();
    this.GetConfigurationforPriceOrLable();
    this.GetConfigurationforProfilePriceLable();
    this.GetViewTypeformultipleproduct();
    this.GetpriceRoundingsetting();
    this.GetItemNoteSetting();
    this.getmultipleum();
    this.getitlableconfig();
    this.getisprofiledesc();
    this.getIsMuscle();
    this.getumdescrconfig();
    this.ProductDetailsOrderConfig();

    this.GetConfigfordecimalpoints();
    this.GetConfigForAddToCartAsPerProfile();
    if (Common.getWithExpiry("CustID") != "" && Common.getWithExpiry("CustID") != null) {
      this.warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
      this.getCustomerDetails();
      this.getproductdetailsfirst();
      this.getwishconfig();
      this.getrfqconfig();
      this.getwishlist();
      this.getRfqlist();
      this.getqtymsg();
      this.isLoggedIn = true;

    }
    else {
      this.isLoggedIn = false;
      this.Accessannomyous();
    }
    this.GetDisplayListPriceLable();
    this.GetDisplayListPriceInProductDetails();
    this.GetDisplayListPriceInProductDetailswithoutLogin();
    this.Getvendor();
    this.GeManufactureSetting();
    this.getAddZero();
    this.addtocartnotavail();
    this.isitemprofileset();
    this.getisSAitem();
    this.get3DTitle();
    this.getOverviewTitle();
    this.getFeatureTitle();
    this.getProfileTitle();
    this.getMinQtySetting();
    this.getMaxQtySetting();
    this.getMultiplyQtySetting();
    this.getProductlineshow();
    this.Getlabel1();
    this.Getlabel2();
    this.Getlabel3();
    this.Getlabel4();
    this.Getlabel5();
    this.Getlabel6();
    this.Getlabel7();
    this.getconfigurationforups();
  }


  tagmanager() {
    try{
    var item = [];
    var total = this.item1.list_price;
    
        item.push({ "item_id": this.item.itemname, "item_name": this.item.itemname, "item_brand": this.item.links, "item_category": this.item.prodlinename, "item_category2": this.item.manufacturer, "item_list_id": "", "item_list_name": this.item.itemname, "price": this.item.list_price, "quantity": "1" })
    
    var gtmTag = {
        event: 'view_item',
        ecommerce: {
            currency: "USD",
            value: total,
            items: item
        }
    };
    console.log('gtmService',gtmTag);
    this.gtmService.pushTag(gtmTag);
}catch(ex){
    console.log(ex.toString());
}
}

  getlogintype() {
    this.logintype = this.dataService.Getconfigbykey("logintype");
    if (this.logintype == null || this.logintype == undefined || this.logintype == '') {
      this.logintype = Common.getWithExpiry("logintype");
    }

  }
  LoginForAddtoQuote(){
    //this.router.navigate(['/login']);
    this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url } });      
  }
  getchilditemlable() {
    this.childitemlable = this.dataService.Getconfigbykey("childitemlable");
    if (this.childitemlable == null || this.childitemlable == undefined || this.childitemlable == '') {
      this.childitemlable = Common.getWithExpiry("childitemlable");
    }
    if (this.childitemlable == null || this.childitemlable == undefined || this.childitemlable == '') {
      this.dataService.Getchilditemlable().subscribe((data: any) => {
        this.childitemlable = data;
        Common.setWithExpiry("childitemlable", this.childitemlable);

      });
    }
  }

  activetabord(tab){
this.tabord=tab;
  }
  guestLoginSetting() {
    this.isGuestLogin = this.dataService.Getconfigbykey("GuestLogin");
    if (this.isGuestLogin == null || this.isGuestLogin == undefined || this.isGuestLogin == '') {
      this.isGuestLogin = Common.getWithExpiry("GuestLogin");
    }
    if (this.isGuestLogin == null || this.isGuestLogin == undefined || this.isGuestLogin == '') {
      this.dataService.GuestLoginSetting().subscribe((data: any) => {
        this.isGuestLogin = data;
        Common.setWithExpiry("GuestLogin", this.isGuestLogin);

      });
    }
  }
  GetavaibilitylableConfig() {
    this.avaibilitylable = this.dataService.Getconfigbykey("avaibilitylable");
    if (this.avaibilitylable == null || this.avaibilitylable == undefined || this.avaibilitylable == '') {
      this.avaibilitylable = Common.getWithExpiry("avaibilitylable");
    }
    if (this.avaibilitylable == null || this.avaibilitylable == undefined || this.avaibilitylable == '') {
      this.dataService.GetavaibilitylableConfig().subscribe((data: any) => {
        this.avaibilitylable = data;
        Common.setWithExpiry("avaibilitylable", this.avaibilitylable);

      });
    }
  }
  Getminlable() {
    this.minlable = this.dataService.Getconfigbykey("minlable");
    if (this.minlable == null || this.minlable == undefined || this.minlable == '') {
      this.minlable = Common.getWithExpiry("minlable");
    }
    if (this.minlable == null || this.minlable == undefined || this.minlable == '') {
      this.dataService.Getminlable().subscribe((data: any) => {
        this.minlable = data;
        Common.setWithExpiry("minlable", this.minlable);

      });
    }
  }
  Getmaxlable() {
    this.maxlable = this.dataService.Getconfigbykey("maxlable");
    if (this.maxlable == null || this.maxlable == undefined || this.maxlable == '') {
      this.maxlable = Common.getWithExpiry("maxlable");
    }
    if (this.maxlable == null || this.maxlable == undefined || this.maxlable == '') {
      this.dataService.Getmaxlable().subscribe((data: any) => {
        this.maxlable = data;
        Common.setWithExpiry("maxlable", this.maxlable);

      });
    }
  }
  Getaddnewqtywithnewlogic() {
    this.addnewqtywithnewlogic = this.dataService.Getconfigbykey("addnewqtywithnewlogic");
    if (this.addnewqtywithnewlogic == null || this.addnewqtywithnewlogic == undefined || this.addnewqtywithnewlogic == '') {
      this.addnewqtywithnewlogic = Common.getWithExpiry("addnewqtywithnewlogic");
    }
    if (this.addnewqtywithnewlogic == null || this.addnewqtywithnewlogic == undefined || this.addnewqtywithnewlogic == '') {
      this.dataService.Getaddnewqtywithnewlogic().subscribe((data: any) => {
        this.addnewqtywithnewlogic = data;
        Common.setWithExpiry("addnewqtywithnewlogic", this.addnewqtywithnewlogic);

      });
    }
  }
  Getdisplaynewavails() {
    this.displaynewavails = this.dataService.Getconfigbykey("displaynewavails");
    if (this.displaynewavails == null || this.displaynewavails == undefined || this.displaynewavails == '') {
      this.displaynewavails = Common.getWithExpiry("displaynewavails");
    }
    if (this.displaynewavails == null || this.displaynewavails == undefined || this.displaynewavails == '') {
      this.dataService.Getdisplaynewavails().subscribe((data: any) => {
        this.displaynewavails = data;
        Common.setWithExpiry("displaynewavails", this.displaynewavails);

      });
    }
  }
  Getdisplaynewavailslable() {
    this.displaynewavailslable = this.dataService.Getconfigbykey("displaynewavailslable");
    if (this.displaynewavailslable == null || this.displaynewavailslable == undefined || this.displaynewavailslable == '') {
      this.displaynewavailslable = Common.getWithExpiry("displaynewavailslable");
    }
    if (this.displaynewavailslable == null || this.displaynewavailslable == undefined || this.displaynewavailslable == '') {
      this.dataService.Getdisplaynewavailslable().subscribe((data: any) => {
        this.displaynewavailslable = data;
        Common.setWithExpiry("displaynewavailslable", this.displaynewavailslable);

      });
    }
  }
  getconfigtowhlable1() {
    this.whlable1 = this.dataService.Getconfigbykey("whlable1");
    if (this.whlable1 == null || this.whlable1 == undefined || this.whlable1 == '') {
      this.whlable1 = Common.getWithExpiry("whlable1");
    }
    if (this.whlable1 == null || this.whlable1 == undefined || this.whlable1 == '') {
      this.dataService.getconfigtowhlable1().subscribe((data: any) => {
        this.whlable1 = data;
        Common.setWithExpiry("whlable1", this.whlable1);

      });
    }
  }
  getconfigtowhlable2() {
    this.whlable2 = this.dataService.Getconfigbykey("whlable2");
    if (this.whlable2 == null || this.whlable2 == undefined || this.whlable2 == '') {
      this.whlable2 = Common.getWithExpiry("whlable2");
    }
    if (this.whlable2 == null || this.whlable2 == undefined || this.whlable2 == '') {
      this.dataService.getconfigtowhlable2().subscribe((data: any) => {
        this.whlable2 = data;
        Common.setWithExpiry("whlable2", this.whlable2);

      });
    }
  }
  getconfigtowhlable3() {
    this.whlable3 = this.dataService.Getconfigbykey("whlable3");
    if (this.whlable3 == null || this.whlable3 == undefined || this.whlable3 == '') {
      this.whlable3 = Common.getWithExpiry("whlable3");
    }
    if (this.whlable3 == null || this.whlable3 == undefined || this.whlable3 == '') {
      this.dataService.getconfigtowhlable3().subscribe((data: any) => {
        this.whlable3 = data;
        Common.setWithExpiry("whlable3", this.whlable3);

      });
    }
  }


  GetcategoriespathProductDetails(param) {
    try {
      if (Common.getWithExpiry('titleheader' + param + '1') != undefined) {
        var titleheader1 = JSON.parse(Common.getWithExpiry('titleheader' + param + '1'));
      }
    } catch (ed) { }
    if (titleheader1 == null || titleheader1 == undefined || titleheader1.length == 0) {
      this.dataService.GetcategoriespathProductDetails(param).subscribe((res: any) => {
        this.titleheader1 = res;
        for (var i = 0; i < this.titleheader1.length; i++) {
          if (this.titleheader1[i].urls == "self") {
            this.titleheader1[i].urls = this.router.url;
          }
        }
        Common.setWithExpiry('titleheader' + param + '1', this.titleheader1);

      });
    } else {
      this.titleheader1 = titleheader1;
      for (var i = 0; i < this.titleheader1.length; i++) {
        if (this.titleheader1[i].urls == "self") {
          this.titleheader1[i].urls = this.router.url;
        }
      }
    }
  }
  ngOnDestroy() {
    this._routerSub.unsubscribe();
  }
  configforvendorinproductlist() {
    this.vendorinproductlist = this.dataService.Getconfigbykey("vendorinproductlist");
    if (this.vendorinproductlist == null || this.vendorinproductlist == undefined || this.vendorinproductlist == '') {
      this.vendorinproductlist = Common.getWithExpiry("vendorinproductlist");
    }
    if (this.vendorinproductlist == null || this.vendorinproductlist == undefined || this.vendorinproductlist == '') {
      this.dataService.configforvendorinproductlist().subscribe((data: any) => {
        this.vendorinproductlist = data;
        Common.setWithExpiry("vendorinproductlist", this.vendorinproductlist);
      })
    }
  }
  ConfigurationForpdfbuttonshow() {
    this.pdfbuttonshow = this.dataService.Getconfigbykey("pdfbuttonshow");
    if (this.pdfbuttonshow == null || this.pdfbuttonshow == undefined || this.pdfbuttonshow == '') {
      this.pdfbuttonshow = Common.getWithExpiry("pdfbuttonshow");
    }
    if (this.pdfbuttonshow == null || this.pdfbuttonshow == undefined || this.pdfbuttonshow == '') {
      this.dataService.ConfigurationForpdfbuttonshow().subscribe((data: any) => {
        this.pdfbuttonshow = data;
        Common.setWithExpiry("pdfbuttonshow", this.pdfbuttonshow);
      })
    }
  }
  GetConfigtomultiplewarehouseinone() {
    this.multiplewarehouseinone = this.dataService.Getconfigbykey("multiplewarehouseinone");
    if (this.multiplewarehouseinone == null || this.multiplewarehouseinone == undefined || this.multiplewarehouseinone == '') {
      this.multiplewarehouseinone = Common.getWithExpiry("multiplewarehouseinone");
    }
    if (this.multiplewarehouseinone == null || this.multiplewarehouseinone == undefined || this.multiplewarehouseinone == '') {
      this.dataService.GetConfigtomultiplewarehouseinone().subscribe((data: any) => {
        this.multiplewarehouseinone = data;
        Common.setWithExpiry("multiplewarehouseinone", this.multiplewarehouseinone);
      })
    }
  }

  GetDropdownConfig() {
    this.showProductDDL = this.dataService.Getconfigbykey("ShowProductDropdown");
    if (this.showProductDDL == null || this.showProductDDL == undefined || this.showProductDDL == '') {
      this.showProductDDL = Common.getWithExpiry("ShowProductDropdown");
    }
    if (this.showProductDDL == null || this.showProductDDL == undefined || this.showProductDDL == '') {
      this.dataService.GetConfigforproductDDL().subscribe((data: any) => {
        this.showProductDDL = data;
        Common.setWithExpiry("ShowProductDropdown", this.showProductDDL);
      });
    }
  }

  GetNewItemDate() {
    this.newItemDate = this.dataService.Getconfigbykey("NewItemDate");
    if (this.newItemDate == null || this.newItemDate == undefined || this.newItemDate == '') {
      this.newItemDate = Common.getWithExpiry("NewItemDate");
    }
    if (this.newItemDate == null || this.newItemDate == undefined || this.newItemDate == '') {
      this.dataService.GetConfigforNewItem().subscribe((data: any) => {
        this.newItemDate = data;
        Common.setWithExpiry("NewItemDate", this.newItemDate);
      });
    }
  }
  Getnewitemdays() {
    this.newitemdays = this.dataService.Getconfigbykey("newitemdays");
    if (this.newitemdays == null || this.newitemdays == undefined || this.newitemdays == '') {
      this.newitemdays = Common.getWithExpiry("newitemdays");
    }
    if (this.newitemdays == null || this.newitemdays == undefined || this.newitemdays == '') {
      this.dataService.Getconfigurationnewitemdays().subscribe((data: any) => {
        this.newitemdays = data;
        Common.setWithExpiry("newitemdays", this.newitemdays);
      });
    }
  }

  GetCollerPelletConfig() {
    this.showColorPellet = this.dataService.Getconfigbykey("ShowColorPellet");
    if (this.showColorPellet == null || this.showColorPellet == undefined || this.showColorPellet == '') {
      this.showColorPellet = Common.getWithExpiry("ShowColorPellet");
    }
    if (this.showColorPellet == null || this.showColorPellet == undefined || this.showColorPellet == '') {
      this.dataService.GetConfigforcolorpellet().subscribe((data: any) => {
        this.showColorPellet = data;
        Common.setWithExpiry("ShowColorPellet", this.showColorPellet);
      });
    }
  }

  GetConfigforwishlistlable() {
    this.wishlistlable = this.dataService.Getconfigbykey("wishlistlable");
    if (this.wishlistlable == null || this.wishlistlable == undefined || this.wishlistlable == '') {
      this.wishlistlable = Common.getWithExpiry("wishlistlable");
    }
    if (this.wishlistlable == null || this.wishlistlable == undefined || this.wishlistlable == '') {
      this.dataService.GetConfigforwishlistlable().subscribe((data: any) => {
        this.wishlistlable = data;
        Common.setWithExpiry("wishlistlable", this.wishlistlable);
      });
    }
  }
  GetMultiplewarehouseforavaibility() {
    this.Multiplewarehouseforavaibility = this.dataService.Getconfigbykey("Multiplewarehouseforavaibility");
    if (this.Multiplewarehouseforavaibility == null || this.Multiplewarehouseforavaibility == undefined || this.Multiplewarehouseforavaibility == '') {
      this.Multiplewarehouseforavaibility = Common.getWithExpiry("Multiplewarehouseforavaibility");
    }
    if (this.Multiplewarehouseforavaibility == null || this.Multiplewarehouseforavaibility == undefined || this.Multiplewarehouseforavaibility == '') {
      this.dataService.GetMultiplewarehouseforavaibility().subscribe((data: any) => {
        this.Multiplewarehouseforavaibility = data;
        Common.setWithExpiry("Multiplewarehouseforavaibility", this.Multiplewarehouseforavaibility);
      });
    }
  }

  getDescrToShow() {
    this.DescrToShow = this.dataService.Getconfigbykey("DescrToShow");
    if (this.DescrToShow == null || this.DescrToShow == undefined || this.DescrToShow == '') {
      this.DescrToShow = Common.getWithExpiry("DescrToShow");
    }
    if (this.DescrToShow == null || this.DescrToShow == undefined || this.DescrToShow == '') {
      this.dataService.GetDescrToShow().subscribe((data: any) => {
        this.DescrToShow = data;
        Common.setWithExpiry("DescrToShow", this.DescrToShow);
      });
    }
  }
  getListPriceShow() {
    this.ListPriceShow = this.dataService.Getconfigbykey("PricePerEach");
    if (this.ListPriceShow == null || this.ListPriceShow == undefined || this.ListPriceShow == '') {
      this.ListPriceShow = Common.getWithExpiry("ListPriceShow");
    }
    if (this.ListPriceShow == null || this.ListPriceShow == undefined || this.ListPriceShow == '') {
      this.dataService.GetListPriceShow().subscribe((data: any) => {
        this.ListPriceShow = data;
        Common.setWithExpiry("ListPriceShow", this.ListPriceShow);
      });
    }
  }
  showpricetocustomers() {
    this.priceshowcust = this.dataService.Getconfigbykey("ShowPrices");
    if (this.priceshowcust == null || this.priceshowcust == undefined || this.priceshowcust == '') {
      this.priceshowcust = Common.getWithExpiry("priceshowcust");
    }
    if (this.priceshowcust == null || this.priceshowcust == undefined || this.priceshowcust == '') {
      this.dataService.showpricetocustomers().subscribe((data: any) => {
        this.priceshowcust = data;
        Common.setWithExpiry("priceshowcust", this.priceshowcust);
      })
    }
  }
  GetDisplayUmQty() {
    this.DisplayUmQty = this.dataService.Getconfigbykey("DisplayUmQty");
    if (this.DisplayUmQty == null || this.DisplayUmQty == undefined || this.DisplayUmQty == '') {
      this.DisplayUmQty = Common.getWithExpiry("DisplayUmQty");
    }
    if (this.DisplayUmQty == null || this.DisplayUmQty == undefined || this.DisplayUmQty == '') {
      this.dataService.GetConfigtoDisplayUmQty().subscribe((data: any) => {
        this.DisplayUmQty = data;
        Common.setWithExpiry("DisplayUmQty", this.DisplayUmQty);
      })
    }
  }
  getUrlWithFreeForm() {
    this.UrlWithFreeForm = this.dataService.Getconfigbykey("UrlWithFreeForm");
    if (this.UrlWithFreeForm == null || this.UrlWithFreeForm == undefined || this.UrlWithFreeForm == '') {
      this.UrlWithFreeForm = Common.getWithExpiry("UrlWithFreeForm");
    }
    if (this.UrlWithFreeForm == null || this.UrlWithFreeForm == undefined || this.UrlWithFreeForm == '') {
      this.dataService.GetUrlWithFreeFormsetting().subscribe((data: any) => {
        this.UrlWithFreeForm = data;
        Common.setWithExpiry("UrlWithFreeForm", this.UrlWithFreeForm);
      })
    }
  }
  getisrfqthere() {
    this.isrfqthere = this.dataService.Getconfigbykey("RFQshowinhover");
    if (this.isrfqthere == null || this.isrfqthere == undefined || this.isrfqthere == '') {
      this.isrfqthere = Common.getWithExpiry("isrfqthere");
    }
    if (this.isrfqthere == null || this.isrfqthere == undefined || this.isrfqthere == '') {
      this.dataService.showandhiderfqinlist().subscribe((res: any) => {
        this.isrfqthere = res;
        Common.setWithExpiry("isrfqthere", this.isrfqthere);
      });
    }
  }

  setSeodetails() {

    try {
      this.item1.links = this.item1.links.replace('[', '').replace(']', '').replace(',', '').replace(',', '').replace(',', '').replace(',', '').replace(',', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').trim();
    } catch (ed) { }

    // this.item1.descr=this.item1.itemdesc;
    // Common.Setdescriptionforitem(this.item1,this.isprofiledesc);
    var geturl = Common.getWithExpiry("cpname");
    geturl = this.item1.itemname + ' - ' + this.item1.links + ' - ' + geturl;
    this.seoService.createLinkForCanonicalURLforproduct(encodeURIComponent(this.item1.itemname) + '/' + this.item1.links);
    if (this.item1.title_tag != undefined && this.item1.title_tag != null && this.item1.title_tag != '') {
      this.seoService.setPageTitle(this.item1.title_tag);
    }
    else {
      this.seoService.setPageTitle(geturl);
    }
    if (this.item1.meta != undefined && this.item1.meta != null && this.item1.meta != '') {
      this.seoService.setkeywords(this.item1.meta);
    }
    else {
      this.seoService.setkeywords(this.item1.itemname + ',' + this.item1.prodlinename + ',' + (this.item1.manufacturer == null ? "" : this.item1.manufacturer) + ',' + (this.isprofiledesc == '0' ? this.item1.descrstring : this.item1.freeform));
    }
    if (this.item1.seodescr != undefined && this.item1.seodescr != null && this.item1.seodescr != '') {
      this.seoService.setdescription(this.item1.seodescr);
    }
    else {
      this.seoService.setdescription(this.item1.itemname + ',' + this.item1.prodlinename + ',' + (this.item1.manufacturer == null ? "" : this.item1.manufacturer) + ',' + (this.isprofiledesc == '0' ? this.item1.descrstring : this.item1.freeform));
    }
  }

  getiswishthere() {
    this.isWishthere = this.dataService.Getconfigbykey("wishshowinhover");
    if (this.isWishthere == null || this.isWishthere == undefined || this.isWishthere == '') {
      this.isWishthere = Common.getWithExpiry("isWishthere");
    }
    if (this.isWishthere == null || this.isWishthere == undefined || this.isWishthere == '') {
      this.dataService.showandhidewishinlist().subscribe((res: any) => {
        this.isWishthere = res;
        Common.setWithExpiry("isWishthere", this.isWishthere);
      });
    }
  }
  getiscartthere() {
    this.iscartthere = this.dataService.Getconfigbykey("Addtocartinhover");
    if (this.iscartthere == null || this.iscartthere == undefined || this.iscartthere == '') {
      this.iscartthere = Common.getWithExpiry("iscartthere");
    }
    if (this.iscartthere == null || this.iscartthere == undefined || this.iscartthere == '') {
      this.dataService.showandhidecartinlist().subscribe((res: any) => {
        this.iscartthere = res;
        Common.setWithExpiry("iscartthere", this.iscartthere);
      });
    }
  }
  Getavg_lead_time() {
    this.avg_lead_time = this.dataService.Getconfigbykey("avg_lead_time");
    if (this.avg_lead_time == null || this.avg_lead_time == undefined || this.avg_lead_time == '') {
      this.avg_lead_time = Common.getWithExpiry("avg_lead_time");
    }
    else {
      if (this.avg_lead_time == '1') {
        this.Getavg_lead_time_lable();
        this.Getavg_lead_time_value();
      }
    }
    if (this.avg_lead_time == null || this.avg_lead_time == undefined || this.avg_lead_time == '') {
      this.dataService.Getavg_lead_time().subscribe((data: any) => {
        this.avg_lead_time = data;
        Common.setWithExpiry("avg_lead_time", this.avg_lead_time);
        if (this.avg_lead_time == '1') {
          this.Getavg_lead_time_lable();
          this.Getavg_lead_time_value();
        }
      })
    }
    else {
      if (this.avg_lead_time == '1') {
        this.Getavg_lead_time_lable();
        this.Getavg_lead_time_value();
      }
    }
  }
  Getavg_lead_time_lable() {
    this.avg_lead_time_lable = this.dataService.Getconfigbykey("avg_lead_time_lable");
    if (this.avg_lead_time_lable == null || this.avg_lead_time_lable == undefined || this.avg_lead_time_lable == '') {
      this.avg_lead_time_lable = Common.getWithExpiry("avg_lead_time_lable");
    }
    if (this.avg_lead_time_lable == null || this.avg_lead_time_lable == undefined || this.avg_lead_time_lable == '') {
      this.dataService.Getavg_lead_time_lable().subscribe((data: any) => {
        this.avg_lead_time_lable = data;
        Common.setWithExpiry("avg_lead_time_lable", this.avg_lead_time_lable);
      })
    }
  }
  Getavg_lead_time_value() {
    this.avg_lead_time_value = this.dataService.Getconfigbykey("avg_lead_time_value");
    if (this.avg_lead_time_value == null || this.avg_lead_time_value == undefined || this.avg_lead_time_value == '') {
      this.avg_lead_time_value = Common.getWithExpiry("avg_lead_time_value");
    }
    if (this.avg_lead_time_value == null || this.avg_lead_time_value == undefined || this.avg_lead_time_value == '') {
      this.dataService.Getavg_lead_time_value().subscribe((data: any) => {
        this.avg_lead_time_value = data;
        Common.setWithExpiry("avg_lead_time_value", this.avg_lead_time_value);
      })
    }
  }
  GetUMdropdown() {
    this.UMdropdown = this.dataService.Getconfigbykey("UMdropdown");
    if (this.UMdropdown == null || this.UMdropdown == undefined || this.UMdropdown == '') {
      this.UMdropdown = Common.getWithExpiry("UMdropdown");
    }
    if (this.UMdropdown == null || this.UMdropdown == undefined || this.UMdropdown == '') {
      this.dataService.GetUMdropdown().subscribe((data: any) => {
        this.UMdropdown = data;
        Common.setWithExpiry("UMdropdown", this.UMdropdown);
      })
    }
  }
  getIsRetailPrice() {
    this.IsRetailPrice = this.dataService.Getconfigbykey("IsRetailPrice");
    if (this.IsRetailPrice == null || this.IsRetailPrice == undefined || this.IsRetailPrice == '') {
      this.IsRetailPrice = Common.getWithExpiry("IsRetailPrice");
    }
    if (this.IsRetailPrice == null || this.IsRetailPrice == undefined || this.IsRetailPrice == '') {
      this.dataService.getRetailPriceConfg().subscribe((data: any) => {
        this.IsRetailPrice = data;
        Common.setWithExpiry("IsRetailPrice", this.IsRetailPrice);
        if (this.IsRetailPrice == '1') {
          this.getRetailPriceLabel();
        }
      })
    }
    else {
      if (this.IsRetailPrice == '1') {
        this.getRetailPriceLabel();
      }
    }
  }
  getRetailPriceLabel() {
    this.RetailPriceLabel = this.dataService.Getconfigbykey("RetailPriceLabel");
    if (this.RetailPriceLabel == null || this.RetailPriceLabel == undefined || this.RetailPriceLabel == '') {
      this.RetailPriceLabel = Common.getWithExpiry("RetailPriceLabel");
    }
    if (this.RetailPriceLabel == null || this.RetailPriceLabel == undefined || this.RetailPriceLabel == '') {
      this.dataService.getRetailPriceLabel().subscribe((data: any) => {
        this.RetailPriceLabel = data;
        Common.setWithExpiry("RetailPriceLabel", this.RetailPriceLabel);
      })
    }
  }
  getIsProfileShow() {
    this.IsProfileShow = this.dataService.Getconfigbykey("IsProfileShow");
    if (this.IsProfileShow == null || this.IsProfileShow == undefined || this.IsProfileShow == '') {
      this.IsProfileShow = Common.getWithExpiry("IsProfileShow");
    }
    if (this.IsProfileShow == null || this.IsProfileShow == undefined || this.IsProfileShow == '') {
      this.dataService.ConfigforIsProfileShow().subscribe((data: any) => {
        this.IsProfileShow = data;
        Common.setWithExpiry("IsProfileShow", this.IsProfileShow);
        if (this.IsProfileShow == '1') {
          this.ConfigforProfileNo();
          this.ConfigforProfileIndex();
          this.ConfigforProfileLable();
        }
      })
    }
    else {
      if (this.IsProfileShow == '1') {
        this.ConfigforProfileNo();
        this.ConfigforProfileIndex();
        this.ConfigforProfileLable();
      }
    }
  }
  ConfigforProfileNo() {
    this.ProfileNo = this.dataService.Getconfigbykey("ProfileNo");
    if (this.ProfileNo == null || this.ProfileNo == undefined || this.ProfileNo == '') {
      this.ProfileNo = Common.getWithExpiry("ProfileNo");
    }
    if (this.ProfileNo == null || this.ProfileNo == undefined || this.ProfileNo == '') {
      this.dataService.ConfigforProfileNo().subscribe((data: any) => {
        this.ProfileNo = data;
        Common.setWithExpiry("ProfileNo", this.ProfileNo);
      })
    }
  }
  ConfigforProfileIndex() {
    this.ProfileIndex = this.dataService.Getconfigbykey("ProfileIndex");
    if (this.ProfileIndex == null || this.ProfileIndex == undefined || this.ProfileIndex == '') {
      this.ProfileIndex = Common.getWithExpiry("ProfileIndex");
    }
    if (this.ProfileIndex == null || this.ProfileIndex == undefined || this.ProfileIndex == '') {
      this.dataService.ConfigforProfileIndex().subscribe((data: any) => {
        this.ProfileIndex = data;
        Common.setWithExpiry("ProfileIndex", this.ProfileIndex);
      })
    }
  }

  ConfigforProfileLable() {
    this.ProfileLable = this.dataService.Getconfigbykey("ProfileLable");
    if (this.ProfileLable == null || this.ProfileLable == undefined || this.ProfileLable == '') {
      this.ProfileLable = Common.getWithExpiry("ProfileLable");
    }
    if (this.ProfileLable == null || this.ProfileLable == undefined || this.ProfileLable == '') {
      this.dataService.ConfigforProfileLable().subscribe((data: any) => {
        this.ProfileLable = data;
        Common.setWithExpiry("ProfileLable", this.ProfileLable);
      })
    }
  }
  getUrlWithDetails() {
    this.UrlWithDetails = this.dataService.Getconfigbykey("UrlWithDetails");
    if (this.UrlWithDetails == null || this.UrlWithDetails == undefined || this.UrlWithDetails == '') {
      this.UrlWithDetails = Common.getWithExpiry("UrlWithDetails");
    }
    if (this.UrlWithDetails == null || this.UrlWithDetails == undefined || this.UrlWithDetails == '') {
      this.dataService.GetUrlWithDetailssetting().subscribe((data: any) => {
        this.UrlWithDetails = data;
        Common.setWithExpiry("UrlWithDetails", this.UrlWithDetails);
        if (this.UrlWithDetails == '1') {
          this.getUrlWithFreeForm();
        }
      })
    }
    else {
      if (this.UrlWithDetails == '1') {
        this.getUrlWithFreeForm();
      }
    }
  }
  getIsRelatedProduct() {
    this.IsRelatedProduct = this.dataService.Getconfigbykey("IsRelatedProduct");
    if (this.IsRelatedProduct == null || this.IsRelatedProduct == undefined || this.IsRelatedProduct == '') {
      this.IsRelatedProduct = Common.getWithExpiry("IsRelatedProduct");
    }
    if (this.IsRelatedProduct == null || this.IsRelatedProduct == undefined || this.IsRelatedProduct == '') {
      this.dataService.GetconfigforIsRelatedProduct().subscribe((data: any) => {
        this.IsRelatedProduct = data;
        if (this.IsRelatedProduct == '1') {
          this.getRelatedProductLable();
          this.GetRelatedProductList();
        }
        Common.setWithExpiry("IsRelatedProduct", this.IsRelatedProduct);
      })
    }
    if (this.IsRelatedProduct == '1') {
      this.getRelatedProductLable();
      this.GetRelatedProductList();
    }
  }

  GetRelatedProductList() {
    var wh = (this.warehouse == null ? this.Guestwarehouse : this.warehouse);
    this.dataService.GetProductListByRelatedItem(this.itemNo, wh, Common.getWithExpiry("company_sy")).subscribe((res: any) => {
      this.RelatedProductList = res;
      this.getnewproductlist();
    });
  }
  Getitemdetailspagebyitem() {
    
    this.dataService.Getitemdetailspagebyitem(this.itemNo).subscribe((res: any) => {
      if(res!=undefined && res!=null && res.length>0){
        this.documentlist=[];
      for (let docl of res) {
          if(docl.type=='image'){
            
            if(docl.sequence>1){
            this.galleryImages.push({
              small: docl.details_or_url,
              medium: docl.details_or_url,
              big: docl.details_or_url
            })
          }
          }
          else{
            this.documentlist.push(docl);
          }
      }
    }
    });
  }

  getnewproductlist() {
    var bulkPrice = [];

    var itemstoavails = '';
    var getkeywords = '';
    for (let img of this.RelatedProductList) {
      img.Addtocart = true;
      itemstoavails = itemstoavails + img.itemname + ',';
      if (this.drop_ship == '0') {
        img.drop_ship = false;
      }
      var gum = JSON.parse(img.um);
      var gqt = JSON.parse(img.umqty);
      for (var i = 0; i < gum.length; i++) {
        if (i == 0 && gum[i] != '') {
          img.firstum = gum[i];
          img.firstumqty = (gqt[i - 1] == undefined ? 1 : gqt[i - 1]);
        }
        if (i == 0) {
          if (img.um_display == gum[i]) {
            img.um_displayQty = 1;
          }
        }
        else {
          if (img.um_display == gum[i]) {
            img.um_displayQty = gqt[i - 1];
          }

        }
      }

      var profile1 = JSON.parse(img.profile);
      if ((profile1[1] != "" && this.threedsetting == '1') && (profile1[2] == 'YES' || profile1[2] == 'yes')) {
        img.IsBaseProduct = true;
      }
      else {
        img.IsBaseProduct = false;
      }

      getkeywords = getkeywords + ',' + img.itemname;

      try {
        img.descr = img.description1;
        Common.Setdescriptionforitem(img, this.DescrToShow);
        // var dept1 = [];
        // try {
        //   dept1 = JSON.parse(img.description1);
        // } catch (ex) {

        //   img.description1 = img.description1.replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';');
        //   img.description1 = img.description1.replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '')
        //     .replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '');
        //   dept1 = img.description1.replace('[', '').replace(']', '').split(';');
        // }
        // var des1 = '';
        // var des2 = [];
        // for (let newdesrc of dept1) {
        //   newdesrc = newdesrc.trim();
        //   if (newdesrc != '') {
        //     des1 = des1 + newdesrc;
        //     des2.push(newdesrc);
        //   }
        // }
        // img.description = des2;
        // img.descr = des1;


        if (this.webtype == '5' || this.webtype == '6') {
          var sa_group_label = JSON.parse(img.sa_group_label);
          var sa_group_label1 = [];
          this.isfeature = false;
          for (var i = 0; i <= 3; i++) {
            if (sa_group_label[i] != '') {
              this.isfeature = true;
              this.activetabord(1);
              if (i == 0 && img.sa_group_1 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_1 });
              }
              else if (i == 1 && img.sa_group_2 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_2 });
              }
              else if (i == 2 && img.sa_group_3 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_3 });
              }
              else if (i == 3 && img.sa_group_4 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_4 });
              }
              else if (i == 4 && img.sa_group_5 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_5 });
              }
              else if (i == 5 && img.sa_group_6 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_6 });
              }
              else if (i == 6 && img.sa_group_7 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_7 });
              }
              else if (i == 7 && img.sa_group_8 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_8 });
              }
              else if (i == 8 && img.sa_group_9 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_9 });
              }
              else if (i == 9 && img.sa_group_10 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_10 });
              }
              else if (i == 10 && img.sa_group_11 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_11 });
              }
              else if (i == 11 && img.sa_group_12 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_12 });
              }
              else if (i == 12 && img.sa_group_13 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_13 });
              }
              else if (i == 13 && img.sa_group_14 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_14 });
              }
              else if (i == 14 && img.sa_group_15 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_15 });
              }
            }
          }
        }
        if (sa_group_label1 != undefined && sa_group_label1.length > 0) {
          for (var i = 0; i <= 3; i++) {
            for (var j = 0; j < this.salablelist.length; j++) {
              if (sa_group_label1[i].lbl == this.salablelist[j].salablecode) {
                sa_group_label1[i].lbl = this.salablelist[j].salabledescr;
              }
            }
          }
        }
        img.sa_group_label = sa_group_label1;
      } catch (ex) { }

      //Common.gotoproductdetails(img, this.UrlWithDetails, this.UrlWithFreeForm);

      var getunit = JSON.parse(img.um);
      if (this.isLoggedIn && this.withloginprice == '1' && this.withloginpricelist != '1') {
        try {
          if (this.ListPriceShow == '1') {
            var umos = JSON.parse(img.um);
            bulkPrice.push({
              "customer": Common.getWithExpiry("CustID"),
              "item": img.itemname,
              "quantity": 1,
              "warehouse": Common.getWithExpiry("warehouse"),
              "rounding": this.PriceRound,
              "qty_unit": (umos[0]),
              "company_sy": Common.getWithExpiry("company_sy")
            })
          }
        } catch (ed) { }
        bulkPrice.push({
          "customer": Common.getWithExpiry("CustID"),
          "item": img.itemname,
          "quantity": 1,
          "warehouse": Common.getWithExpiry("warehouse"),
          "rounding": this.PriceRound,
          "qty_unit": (img.um_display == undefined ? getunit[0] : (img.um_display == null ? getunit[0] : img.um_display)),
          "company_sy": Common.getWithExpiry("company_sy")
        })

      }
      else if (!this.isLoggedIn && this.priceshow == '1' && this.listprice != '1') {
        try {
          if (this.ListPriceShow == '1') {
            var umos = JSON.parse(img.um);
            bulkPrice.push({
              "customer": Common.getWithExpiry("CustID"),
              "item": img.itemname,
              "quantity": 1,
              "warehouse": Common.getWithExpiry("warehouse"),
              "rounding": this.PriceRound,
              "qty_unit": (umos[0]),
              "company_sy": Common.getWithExpiry("company_sy")
            })
          }
        } catch (ed) { }
        bulkPrice.push({
          "customer": this.GuestUserID,
          "item": img.itemname,
          "quantity": 1,
          "warehouse": this.Guestwarehouse,
          "rounding": this.PriceRound,
          "qty_unit": (img.um_display == undefined ? getunit[0] : (img.um_display == null ? getunit[0] : img.um_display)),
          "company_sy": Common.getWithExpiry("company_sy")
        })

      }
    }

    if (this.isLoggedIn || this.annavail == '1') {
      var getitem: any;
      var warehous = "";
      if (this.Multiplewarehouseforavaibility != undefined && this.Multiplewarehouseforavaibility != null && this.Multiplewarehouseforavaibility != '') {
        warehous = this.Multiplewarehouseforavaibility;
      }
      else {
        warehous = Common.getWithExpiry("warehouse");
      }
      if (this.isLoggedIn && this.withloginavailshow == '1' && this.withloginavaillist != 1) {
        getitem = {
          items: itemstoavails,
          warehouse: warehous,
          company_sy: Common.getWithExpiry("company_sy"),
        }
      }
      else {
        var warehous = "";
        if (this.Multiplewarehouseforavaibility != undefined && this.Multiplewarehouseforavaibility != null && this.Multiplewarehouseforavaibility != '') {
          warehous = this.Multiplewarehouseforavaibility;
        }
        else {
          warehous = this.Guestwarehouse;
        }
        if (!this.isLoggedIn && this.annavail == '1' && this.withoutloginavaillist != '1') {
          getitem = {
            items: itemstoavails,
            warehouse: warehous,
            company_sy: Common.getWithExpiry("company_sy")
          }
        }
      }

      if (getitem != null && getitem != undefined) {
        this.dataService.getProductavailibity(getitem).subscribe((res: any) => {
          var availdata = res;
          for (var i = 0; i < this.RelatedProductList.length; i++) {
            this.RelatedProductList[i].isavails = false;
            this.RelatedProductList[i].productavails = [];
            this.RelatedProductList[i].warehouse = '';
            this.RelatedProductList[i].available = 0;
            if (availdata != null && availdata != undefined) {
              for (var j = 0; j < availdata.length; j++) {
                if (this.RelatedProductList[i].itemname == availdata[j].item) {
                  this.RelatedProductList[i].productavails.push(availdata[j]);
                  this.RelatedProductList[i].warehouse = (this.RelatedProductList[i].warehouse != '' ? this.RelatedProductList[i].warehouse + ', ' + availdata[j].warehouse : availdata[j].warehouse);
                  this.RelatedProductList[i].available = this.RelatedProductList[i].available + availdata[j].available;
                  if (this.addnewqtywithnewlogic == '1') {
                    this.RelatedProductList[i].availablenew = (availdata[j].available + availdata[j].on_po) - availdata[j].backorder;
                  }
                  if (this.displaynewavails == '1') {
                    this.RelatedProductList[i].availablenew1 = availdata[j].on_po - availdata[j].backorder;
                  }
                  if (availdata[j].available > 0) {
                    this.RelatedProductList[i].isavails = true;
                    this.RelatedProductList[i].available1 = availdata[j].available;
                  }
                  else {
                    this.RelatedProductList[i].isavails = false;
                    this.RelatedProductList[i].available1 = 0;
                  }
                }
              }
            }
          }
        })
      }
    }

    if (bulkPrice != null && bulkPrice != undefined && bulkPrice.length > 0) {
      this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
        var data = res;
        for (var i = 0; i < this.RelatedProductList.length; i++) {
          for (var j = 0; j < data.length; j++) {
            if (this.RelatedProductList[i].itemname == data[j].item && this.RelatedProductList[i].um_display == data[j].qty_unit) {
              this.RelatedProductList[i].isLoggedIn = this.isLoggedIn;
              this.RelatedProductList[i].price = parseFloat(data[j].extension) / parseFloat(data[j].quantity);
              this.RelatedProductList[i].origin = data[j].origin;
              var profilefor = null
              if (this.AddToCartAsPerProfileNo == '1' && this.RelatedProductList[i].profile != undefined) {
                var profilefor = JSON.parse(this.RelatedProductList[i].profile);
              }
              else if (this.AddToCartAsPerProfileNo == '2' && this.RelatedProductList[i].profile2 != undefined) {
                var profilefor = JSON.parse(this.RelatedProductList[i].profile2);
              }
              else if (this.AddToCartAsPerProfileNo == '3' && this.RelatedProductList[i].profile3 != undefined) {
                var profilefor = JSON.parse(this.RelatedProductList[i].profile3);
              }
              if ((this.configforcartbyprofile == '1' && profilefor != undefined && profilefor != null && profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1].toUpperCase() == 'NO') && ((data[j].origin != 'CI'))) {
                this.RelatedProductList[i].Addtocart = false;
                if (this.PriceOrLable == '2') {
                  this.RelatedProductList[i].list_price = 0;
                  this.RelatedProductList[i].price = 0;
                }
              }
              if(this.iskrayden && data[j].origin != 'CI' && data[j].origin != 'SP'){
                this.RelatedProductList[i].price=this.RelatedProductList[i].list_price;
              }
            }
            try {
              this.RelatedProductList[i].umarray = JSON.parse(this.RelatedProductList[i].um);
              if (this.ListPriceShow == '1' && this.RelatedProductList[i].itemname == data[j].item && this.RelatedProductList[i].umarray[0] == data[j].qty_unit) {
                this.RelatedProductList[i].ListPriceShow = data[j].extension;
              }
            } catch (ed) { }
          }

        }
      });
    }


  }

  RemoveSpacesandSpeacialCharacters(str) {
    try {
      str = str.trim();
      var newString = str.replace(/[^A-Z0-9]+/ig, "-");
      return newString;
    }
    catch (ed) {

      return str;
    }
  }
  getRelatedProductLable() {
    this.RelatedProductLable = this.dataService.Getconfigbykey("RelatedProductLable");
    if (this.RelatedProductLable == null || this.RelatedProductLable == undefined || this.RelatedProductLable == '') {
      this.RelatedProductLable = Common.getWithExpiry("RelatedProductLable");
    }
    if (this.RelatedProductLable == null || this.RelatedProductLable == undefined || this.RelatedProductLable == '') {
      this.dataService.GetconfigforRelatedProductLable().subscribe((data: any) => {
        this.RelatedProductLable = data;
        Common.setWithExpiry("RelatedProductLable", this.RelatedProductLable);
      })
    }
  }
  ConfigurationForItemDisclamier() {
    this.ItemDisclamier = this.dataService.Getconfigbykey("ItemDisclamier");
    if (this.ItemDisclamier == null || this.ItemDisclamier == undefined || this.ItemDisclamier == '') {
      this.ItemDisclamier = Common.getWithExpiry("ItemDisclamier");
    }
    if (this.ItemDisclamier == null || this.ItemDisclamier == undefined || this.ItemDisclamier == '') {
      this.dataService.ConfigurationForItemDisclamier().subscribe((data: any) => {
        this.ItemDisclamier = data;
        Common.setWithExpiry("ItemDisclamier", this.ItemDisclamier);
      })
    }
  }
  getthreedsetting() {
    this.threedsetting = this.dataService.Getconfigbykey("Show3D");
    if (this.threedsetting == null || this.threedsetting == undefined || this.threedsetting == '') {
      this.threedsetting = Common.getWithExpiry("threedsetting");
    }
    if (this.threedsetting == null || this.threedsetting == undefined || this.threedsetting == '') {
      this.dataService.Get3DSetting().subscribe((data: any) => {
        this.threedsetting = data;
        Common.setWithExpiry("threedsetting", this.threedsetting);
      })
    }
  }
  catclick(treeNode, index) {
    var getstrs1 = treeNode.split(',');

    if (getstrs1[0] == "category") {
      if (index > 1) {
        Common.setWithExpiry('selectedmaj_class', '');
        Common.setWithExpiry('selectedprod_line', getstrs1[1]);
        Common.setWithExpiry('selectedtreenode', '');
      }
      if (index == 2) {
        //        this.router.navigate(['/products', getstrs1[1].toLowerCase()]);
      }
      else if (index != 1) {
        //      this.router.navigate(['/product', getstrs1[1].toLowerCase()]);
      }

      else if (getstrs1[0] == "Products") {
        //    this.router.navigate(['/product']);
      }
    }
    else {

      if (index > 1) {
        Common.setWithExpiry('selectedmaj_class', '');
        Common.setWithExpiry('selectedprod_line', '');
        Common.setWithExpiry('selectedtreenode', treeNode);
      }

      if (index == 2) {
        //  this.router.navigate(['/category', treeNode.toLowerCase()]);
      }
      else if (index != 1) {
        //this.router.navigate(['/categories', treeNode.toLowerCase()]);
      }

    }
  }


  getProductlineshow() {
    this.Productlineshow = this.dataService.Getconfigbykey("prodlineindetail");
    if (this.Productlineshow == null || this.Productlineshow == undefined || this.Productlineshow == '') {
      this.Productlineshow = Common.getWithExpiry("Productlineshow");
    }
    if (this.Productlineshow == null || this.Productlineshow == undefined || this.Productlineshow == '') {
      this.dataService.GetConfigForProductlineshow().subscribe((data: any) => {
        this.Productlineshow = data;
        Common.setWithExpiry("Productlineshow", this.Productlineshow);
      })
    }
  }
  GetTreeNodeValue() {
    this.treeNodeValue = this.dataService.Getconfigbykey("TreeNode");
    if (this.treeNodeValue == null || this.treeNodeValue == undefined || this.treeNodeValue == '') {
      this.treeNodeValue = Common.getWithExpiry("TreeNode");
    }
    if (this.treeNodeValue == null || this.treeNodeValue == undefined || this.treeNodeValue == '') {
      this.dataService.GetTreeNodeValue().subscribe((data1: any) => {
        this.treeNodeValue = data1;
        Common.setWithExpiry("TreeNode", this.treeNodeValue);
      });
    }
  }

  GetDisplayListPriceLable() {
    this.DisplayListPriceLable = this.dataService.Getconfigbykey("DisplayListPriceLable");
    if (this.DisplayListPriceLable == null || this.DisplayListPriceLable == undefined || this.DisplayListPriceLable == '') {
      this.DisplayListPriceLable = Common.getWithExpiry("DisplayListPriceLable");
    }
    if (this.DisplayListPriceLable == null || this.DisplayListPriceLable == undefined || this.DisplayListPriceLable == '') {
      this.dataService.GetDisplayListPriceLable().subscribe((data: any) => {
        this.DisplayListPriceLable = data;
        Common.setWithExpiry("DisplayListPriceLable", this.DisplayListPriceLable);
      })
    }
  }
  GetDisplayListPriceInProductDetails() {
    this.DisplayListPriceInProductDetails = this.dataService.Getconfigbykey("DisplayListPriceInProductDetails");
    if (this.DisplayListPriceInProductDetails == null || this.DisplayListPriceInProductDetails == undefined || this.DisplayListPriceInProductDetails == '') {
      this.DisplayListPriceInProductDetails = Common.getWithExpiry("DisplayListPriceInProductDetails");
    }
    if (this.DisplayListPriceInProductDetails == null || this.DisplayListPriceInProductDetails == undefined || this.DisplayListPriceInProductDetails == '') {
      this.dataService.GetDisplayListPriceInProductDetails().subscribe((data: any) => {
        this.DisplayListPriceInProductDetails = data;
        Common.setWithExpiry("DisplayListPriceInProductDetails", this.DisplayListPriceInProductDetails);
      })
    }
  }
  GetDisplayListPriceInProductDetailswithoutLogin() {
    this.DisplayListPriceInProductDetailswithoutLogin = this.dataService.Getconfigbykey("DisplayListPriceInProductDetailswithoutLogin");
    if (this.DisplayListPriceInProductDetailswithoutLogin == null || this.DisplayListPriceInProductDetailswithoutLogin == undefined || this.DisplayListPriceInProductDetailswithoutLogin == '') {
      this.DisplayListPriceInProductDetailswithoutLogin = Common.getWithExpiry("DisplayListPriceInProductDetailswithoutLogin");
    }
    if (this.DisplayListPriceInProductDetailswithoutLogin == null || this.DisplayListPriceInProductDetailswithoutLogin == undefined || this.DisplayListPriceInProductDetailswithoutLogin == '') {
      this.dataService.GetDisplayListPriceInProductDetailswithoutLogin().subscribe((data: any) => {
        this.DisplayListPriceInProductDetailswithoutLogin = data;
        Common.setWithExpiry("DisplayListPriceInProductDetailswithoutLogin", this.DisplayListPriceInProductDetailswithoutLogin);
      })
    }
  }
  getitlableconfig() {
    this.itlable = this.dataService.Getconfigbykey("ItemLable");
    if (this.itlable == null || this.itlable == undefined || this.itlable == '') {
      this.itlable = Common.getWithExpiry("itlable");
    }
    if (this.itlable == null || this.itlable == undefined || this.itlable == '') {
      this.dataService.Getconfigforitemlable().subscribe((res: any) => {
        this.itlable = res;
        Common.setWithExpiry("itlable", this.itlable);
      });
    }
  }
  getumdescrconfig() {
    this.umdescrlist = [];
    this.isumdescr = this.dataService.Getconfigbykey("SettingForUMDescription");
    if (this.isumdescr == null || this.isumdescr == undefined || this.isumdescr == '') {
      this.isumdescr = Common.getWithExpiry("isumdescr");
    }
    if (this.isumdescr == null || this.isumdescr == undefined || this.isumdescr == '') {
      this.dataService.SettingForUMDescription().subscribe((res: any) => {
        this.isumdescr = res;
        Common.setWithExpiry("isumdescr", this.isumdescr);
        if (this.isumdescr == '1') {
          try {
            if (Common.getWithExpiry("umdescrlist") != undefined) {
              var umdescrlist = JSON.parse(Common.getWithExpiry("umdescrlist"));
            }
          } catch (ed) { }
          if (umdescrlist == null || umdescrlist == undefined || umdescrlist.length == 0) {
            this.dataService.getunitdescription().subscribe((res: any) => {
              this.umdescrlist = res;
              Common.setWithExpiry("umdescrlist", JSON.stringify(this.umdescrlist));
            });
          }
          else {
            this.umdescrlist = umdescrlist;
          }
        }

      });
    }
    else {
      if (this.isumdescr == '1') {
        try {
          if (Common.getWithExpiry("umdescrlist") != undefined) {
            var umdescrlist = JSON.parse(Common.getWithExpiry("umdescrlist"));
          }
        } catch (ed) { }
        if (umdescrlist == null || umdescrlist == undefined || umdescrlist.length == 0) {
          this.dataService.getunitdescription().subscribe((res: any) => {
            this.umdescrlist = res;
            Common.setWithExpiry("umdescrlist", JSON.stringify(this.umdescrlist));
          });
        }
        else {
          this.umdescrlist = umdescrlist;
        }
      }
    }

  }
  getumdescbyumcode(umcode) {
    if (this.isumdescr == '1') {
      
      for (var i = 0; i < this.umdescrlist.length; i++) {
        if (this.umdescrlist[i].code.toLowerCase() == umcode.toLowerCase()) {
          return this.umdescrlist[i].descr;
        }
      }
      return umcode;
    }
    else {
      return umcode;
    }
  }

  ProductDetailsOrderConfig() {
    this.orderdic = this.dataService.Getconfigbykey("detailorder");
    
    if (this.orderdic == null || this.orderdic == undefined || this.orderdic == '') {
      this.orderdic = Common.getWithExpiry("detailorder");
    }
    if (this.orderdic == null || this.orderdic == undefined || this.orderdic == '') {
      this.dataService.ProductDetailsOrderConfig().subscribe((data: any) => {
        this.orderdic = data;
        Common.setWithExpiry("detailorder", this.orderdic);
        var getli = this.orderdic.split(',');
        this.orderdic1 = [];
        for (var i = 0; i < getli.length; i++) {
          if (i == 0) {
            this.orderdic1.push({ order: getli[i], name: "sa" });
          }
          if (i == 1) {
            this.orderdic1.push({ order: getli[i], name: "profile" });
          }
          if (i == 2) {
            this.orderdic1.push({ order: getli[i], name: "note" });
          }
          if (i == 3) {
            this.orderdic1.push({ order: getli[i], name: "3d" });
          }
        }
      })
    }
    else {
      var getli = this.orderdic.split(',');
      this.orderdic1 = [];
      for (var i = 0; i < getli.length; i++) {
        if (i == 0) {
          this.orderdic1.push({ order: getli[i], name: "sa" });
        }
        if (i == 1) {
          this.orderdic1.push({ order: getli[i], name: "profile" });
        }
        if (i == 2) {
          this.orderdic1.push({ order: getli[i], name: "note" });
        }
        if (i == 3) {
          this.orderdic1.push({ order: getli[i], name: "3d" });
        }
      }
    }
    console.log('ProductDetailsOrderConfig',this.orderdic1);
  }

  register() {

    Common.setWithExpiry("url", this.item.itemname);
    Common.setWithExpiry("pid", this.SelectedPartNumber);
    this.businesstype = this.dataService.Getconfigbykey("businesstype");
    if (this.businesstype == null || this.businesstype == undefined || this.businesstype == '') {
      this.businesstype = Common.getWithExpiry("businesstype");
    }
    if (this.businesstype == null || this.businesstype == undefined || this.businesstype == '') {
      this.dataService.Getbusinesstype().subscribe((data1: any) => {
        this.businesstype = data1;
        Common.setWithExpiry("businesstype", this.businesstype);
        if (this.businesstype == "B2C") {
          this.router.navigate(['b2c-registration']);
        }
        else if (this.businesstype == "B2B") {
          this.router.navigate(['b2b-registration']);
        }
        else {
          this.router.navigate(['new-customer']);
        }
      })
    }
    else {
      if (this.businesstype == "B2C") {
        this.router.navigate(['b2c-registration']);
      }
      else if (this.businesstype == "B2B") {
        this.router.navigate(['b2b-registration']);
      }
      else {
        this.router.navigate(['new-customer']);
      }
    }
  }

  getpriceforproductmulti() {


    if (this.bulkpriceformultiproduct != null && this.bulkpriceformultiproduct != undefined && this.bulkpriceformultiproduct.length > 0 && this.bulkpriceformultiproduct.length == this.childproducts.length) {

      this.cartService.getBulkPrice(this.bulkpriceformultiproduct).subscribe((res: any) => {
        var data = res;

        if (data != null && data != undefined) {
          for (var i = 0; i < this.childproducts.length; i++) {
            for (var j = 0; j < data.length; j++) {
              if (this.childproducts[i].itemname == data[j].item) {
                this.childproducts[i].isLoggedIn = this.isLoggedIn;
                this.childproducts[i].price = data[j].extension;
                this.childproducts[i].origin = data[j].origin;
                if (this.childproducts[i].Pricebreaks != undefined && this.childproducts[i].Pricebreaks.length > 0) {
                  for (var l = 0; l < this.childproducts[i].Pricebreaks.length; l++) {
                    if (this.childproducts[i].Pricebreaks[l].break_unit == data[j].qty_unit) {
                      this.childproducts[i].Pricebreaks[l].par = ((data[j].extension - this.childproducts[i].Pricebreaks[l].amount) / data[j].extension) * 100;
                    }
                  }
                }

              }
            }
          }
        }
      })
    }
  }
  GetConfigForAddToCartAsPerProfile() {
    this.configforcartbyprofile = this.dataService.Getconfigbykey("AddToCartAsPerProfile");
    if (this.configforcartbyprofile == null || this.configforcartbyprofile == undefined || this.configforcartbyprofile == '') {
      this.configforcartbyprofile = Common.getWithExpiry("configforcartbyprofile");
    }
    if (this.configforcartbyprofile == null || this.configforcartbyprofile == undefined || this.configforcartbyprofile == '') {
      this.dataService.GetConfigForAddToCartAsPerProfile().subscribe((res: any) => {
        this.configforcartbyprofile = res;
        if (this.configforcartbyprofile == '1') {
          this.GetGetAddToCartAsPerProfileNo();
          this.GetAddToCartAsPerProfileArrayNo();
        }
        Common.setWithExpiry("configforcartbyprofile", this.configforcartbyprofile);
      });
    }
    else {
      if (this.configforcartbyprofile == '1') {
        this.GetGetAddToCartAsPerProfileNo();
        this.GetAddToCartAsPerProfileArrayNo();
      }
    }
  }
  GetGetAddToCartAsPerProfileNo() {
    this.AddToCartAsPerProfileNo = this.dataService.Getconfigbykey("AddToCartAsPerProfileNo");
    if (this.AddToCartAsPerProfileNo == null || this.AddToCartAsPerProfileNo == undefined || this.AddToCartAsPerProfileNo == '') {
      this.AddToCartAsPerProfileNo = Common.getWithExpiry("AddToCartAsPerProfileNo");
    }
    if (this.AddToCartAsPerProfileNo == null || this.AddToCartAsPerProfileNo == undefined || this.AddToCartAsPerProfileNo == '') {
      this.dataService.GetAddToCartAsPerProfileNo().subscribe((res: any) => {
        this.AddToCartAsPerProfileNo = res;
        Common.setWithExpiry("AddToCartAsPerProfileNo", this.AddToCartAsPerProfileNo);
      });
    }
  }
  GetAddToCartAsPerProfileArrayNo() {
    this.AddToCartAsPerProfileArrayNo = this.dataService.Getconfigbykey("AddToCartAsPerProfileArrayNo");
    if (this.AddToCartAsPerProfileArrayNo == null || this.AddToCartAsPerProfileArrayNo == undefined || this.AddToCartAsPerProfileArrayNo == '') {
      this.AddToCartAsPerProfileArrayNo = Common.getWithExpiry("AddToCartAsPerProfileArrayNo");
    }
    if (this.AddToCartAsPerProfileArrayNo == null || this.AddToCartAsPerProfileArrayNo == undefined || this.AddToCartAsPerProfileArrayNo == '') {
      this.dataService.GetAddToCartAsPerProfileArrayNo().subscribe((res: any) => {
        this.AddToCartAsPerProfileArrayNo = res;
        Common.setWithExpiry("AddToCartAsPerProfileArrayNo", this.AddToCartAsPerProfileArrayNo);
      });
    }
  }
  GetConfigfordecimalpoints() {
    this.decimalpoints = this.dataService.Getconfigbykey("decimalpoints");
    if (this.decimalpoints == null || this.decimalpoints == undefined || this.decimalpoints == '') {
      this.decimalpoints = Common.getWithExpiry("decimalpoints");
    }
    if (this.decimalpoints == null || this.decimalpoints == undefined || this.decimalpoints == '') {
      this.dataService.GetConfigfordecimalpoints().subscribe((res: any) => {
        this.decimalpoints = res;
        Common.setWithExpiry("decimalpoints", this.decimalpoints);
      });
    }
  }
  getIsMuscle() {
    this.IsMuscle = this.dataService.Getconfigbykey("IsMuscle");
    if (this.IsMuscle == null || this.IsMuscle == undefined || this.IsMuscle == '') {
      this.IsMuscle = Common.getWithExpiry("IsMuscle");
    }
    if (this.IsMuscle == null || this.IsMuscle == undefined || this.IsMuscle == '') {
      this.dataService.GetConfigForIsMuscle().subscribe((data: any) => {
        this.IsMuscle = data;
        Common.setWithExpiry("IsMuscle", this.IsMuscle);
      })
    }
  }
  configforstocklable() {
    this.stocklable = this.dataService.Getconfigbykey("stocklable");
    if (this.stocklable == null || this.stocklable == undefined || this.stocklable == '') {
      this.stocklable = Common.getWithExpiry("stocklable");
    }
    if (this.stocklable == null || this.stocklable == undefined || this.stocklable == '') {
      this.dataService.configforstocklable().subscribe((data: any) => {
        this.stocklable = data;
        Common.setWithExpiry("stocklable", this.stocklable);
      })
    }
  }
  cofigurtiondfordrop_ship() {
    this.drop_ship = this.dataService.Getconfigbykey("drop_ship");
    if (this.drop_ship == null || this.drop_ship == undefined || this.drop_ship == '') {
      this.drop_ship = Common.getWithExpiry("drop_ship");
    }
    if (this.drop_ship == null || this.drop_ship == undefined) {
      this.dataService.cofigurtiondfordrop_ship().subscribe((data: any) => {
        this.drop_ship = data;
        if (this.drop_ship == '1') {
          this.cofigurtiondfordrop_shiplable();
        }
        Common.setWithExpiry("drop_ship", this.drop_ship);
      })
    }
    else {
      if (this.drop_ship == '1') {
        this.cofigurtiondfordrop_shiplable();
      }
    }
  }
  cofigurtiondfordrop_shiplable() {
    this.drop_shiplable = this.dataService.Getconfigbykey("drop_shiplable");
    if (this.drop_shiplable == null || this.drop_shiplable == undefined || this.drop_shiplable == '') {
      this.drop_shiplable = Common.getWithExpiry("drop_shiplable");
    }
    if (this.drop_shiplable == null || this.drop_shiplable == undefined || this.drop_shiplable == '') {
      this.dataService.cofigurtiondfordrop_shiplable().subscribe((data: any) => {
        this.drop_shiplable = data;
        Common.setWithExpiry("drop_shiplable", this.drop_shiplable);
      })
    }
  }
  configforbreadcuminproductdetail() {
    this.breadcumin = this.dataService.Getconfigbykey("breadcuminproductdetail");
    if (this.breadcumin == null || this.breadcumin == undefined || this.breadcumin == '') {
      this.breadcumin = Common.getWithExpiry("breadcumin");
    }
    if (this.breadcumin == null || this.breadcumin == undefined || this.breadcumin == '') {
      this.dataService.configforbreadcuminproductdetail().subscribe((data: any) => {
        this.breadcumin = data;
        Common.setWithExpiry("breadcumin", this.breadcumin);
      })
    }
  }
  GetConfigurationforPriceOrLable() {
    this.PriceOrLable = this.dataService.Getconfigbykey("PriceOrLable");
    if (this.PriceOrLable == null || this.PriceOrLable == undefined || this.PriceOrLable == '') {
      this.PriceOrLable = Common.getWithExpiry("PriceOrLable");
    }
    if (this.PriceOrLable == null || this.PriceOrLable == undefined || this.PriceOrLable == '') {
      this.dataService.GetConfigurationforPriceOrLable().subscribe((data: any) => {
        this.PriceOrLable = data;
        Common.setWithExpiry("PriceOrLable", this.PriceOrLable);
      })
    }
  }
  GetConfigurationforProfilePriceLable() {
    this.ProfilePriceLable = this.dataService.Getconfigbykey("ProfilePriceLable");
    if (this.ProfilePriceLable == null || this.ProfilePriceLable == undefined || this.ProfilePriceLable == '') {
      this.ProfilePriceLable = Common.getWithExpiry("ProfilePriceLable");
    }
    if (this.ProfilePriceLable == null || this.ProfilePriceLable == undefined || this.ProfilePriceLable == '') {
      this.dataService.GetConfigurationforProfilePriceLable().subscribe((data: any) => {
        this.ProfilePriceLable = data;
        Common.setWithExpiry("ProfilePriceLable", this.ProfilePriceLable);
      })
    }
  }
  Getsalable() {
    try {
      if (Common.getWithExpiry("salablelist") != undefined) {
        var salablelist = JSON.parse(Common.getWithExpiry("salablelist"));
      }
    } catch (ex) { }
    if (salablelist == null || salablelist == undefined || salablelist == '') {
      this.dataService.Getgetsalablesettings().subscribe((data: any) => {
        this.salablelist = data;
        Common.setWithExpiry("salablelist", JSON.stringify(this.salablelist));
      })
    }
    else {
      this.salablelist = salablelist;
    }
  }
  getqtymsgwithoutlogin() {
    this.qtymsgwithoutlogin = this.dataService.Getconfigbykey("qtymsgwithoutlogin");
    if (this.qtymsgwithoutlogin == null || this.qtymsgwithoutlogin == undefined || this.qtymsgwithoutlogin == '') {
      this.qtymsgwithoutlogin = Common.getWithExpiry("qtymsgwithoutlogin");
    }
    if (this.qtymsgwithoutlogin == null || this.qtymsgwithoutlogin == undefined || this.qtymsgwithoutlogin == '') {
      this.dataService.qtymsgwithoutlogin().subscribe((res: any) => {
        this.qtymsgwithoutlogin = res;
        Common.setWithExpiry("qtymsgwithoutlogin", this.qtymsgwithoutlogin);
      });
    }
  }
  getpricemsgwithoutlogin() {
    this.pricemsgwithoutlogin = this.dataService.Getconfigbykey("pricemsgwithoutlogin");
    if (this.pricemsgwithoutlogin == null || this.pricemsgwithoutlogin == undefined || this.pricemsgwithoutlogin == '') {
      this.pricemsgwithoutlogin = Common.getWithExpiry("pricemsgwithoutlogin");
    }
    if (this.pricemsgwithoutlogin == null || this.pricemsgwithoutlogin == undefined || this.pricemsgwithoutlogin == '') {
      this.dataService.pricemsgwithoutlogin().subscribe((res: any) => {
        this.pricemsgwithoutlogin = res;
        Common.setWithExpiry("pricemsgwithoutlogin", this.pricemsgwithoutlogin);
      });
    }
  }
  getMinQtySetting() {
    var MinQtySetting = this.dataService.Getconfigbykey("MinQty");
    if (MinQtySetting == null || MinQtySetting == undefined || MinQtySetting == '') {
      MinQtySetting = Common.getWithExpiry("MinQtySetting");
    }
    if (MinQtySetting == null || MinQtySetting == undefined || MinQtySetting == '') {
      this.dataService.MinQtySetting().subscribe((data: any) => {
        var dd = data;
        Common.setWithExpiry("MinQtySetting", dd);
        if (dd == "1") {
          this.MinQty = true;
        }
        else {
          this.MinQty = false;
        }
      });
    }
    else {
      if (MinQtySetting == "1") {
        this.MinQty = true;
      }
      else {
        this.MinQty = false;
      }
    }
  }
  getMaxQtySetting() {
    var MaxQtySetting = this.dataService.Getconfigbykey("MaxQty");
    if (MaxQtySetting == null || MaxQtySetting == undefined || MaxQtySetting == '') {
      MaxQtySetting = Common.getWithExpiry("MaxQtySetting");
    }
    if (MaxQtySetting == null || MaxQtySetting == undefined || MaxQtySetting == '') {
      this.dataService.MaxQtySetting().subscribe((data: any) => {
        var dd = data;
        Common.setWithExpiry("MaxQtySetting", dd);
        if (dd == "1") {
          this.MaxQty = true;
        }
        else {
          this.MaxQty = false;
        }
      });
    }
    else {
      if (MaxQtySetting == "1") {
        this.MaxQty = true;
      }
      else {
        this.MaxQty = false;
      }
    }
  }
  GetCountFormultipleproduct(item) {
    this.dataService.GetCountFormultipleproduct(item, this.warehouse).subscribe((data: any) => {

      this.dataService.GetSAGroupColorCodeConfig().subscribe((conRes: any) => {
        this.childproducts = data;
        for (var i = 0; i < this.childproducts.length; i++) {
          this.childproducts[i].galleryImages = [];
          if (conRes != "" && conRes != undefined && conRes != null) {
            switch (conRes) {
              case "1":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_1;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_1;
                break;
              case "2":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_2;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_2;
                break;
              case "3":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_3;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_3;
                break;
              case "4":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_4;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_4;
                break;
              case "5":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_5;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_5;
                break;
              case "6":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_6;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_6;
                break;
              case "7":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_7;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_7;
                break;
              case "8":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_8;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_8;
                break;
              case "9":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_9;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_9;
                break;
              case "10":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_10;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_10;
                break;
              case "11":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_11;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_11;
                break;
              case "12":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_12;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_12;
                break;
              case "13":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_13;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_13;
                break;
              case "14":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_14;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_14;
                break;
              case "15":
                this.childproducts[i].cu_item = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_15;
                this.childproducts[i].cu_item_desc = this.childproducts[i].itemname + " " + this.childproducts[i].sa_group_15;
                break;
            }
          }
          else {
            this.childproducts[i].cu_item = this.childproducts[i].itemname;
            this.childproducts[i].cu_item_desc = this.childproducts[i].itemname;
          }

        }

        if (this.newItemDate != '' && this.newItemDate != undefined && this.newItemDate != null) {
          for (var i = 0; i < this.childproducts.length; i++) {
            if (this.childproducts[i].last_update >= this.newItemDate) {
              this.childproducts[i].cu_item = '* New * ' + this.childproducts[i].cu_item;
            }
          }
        }
        if (this.newitemdays != '' && this.newitemdays != undefined && this.newitemdays != null) {
          for (var i = 0; i < this.childproducts.length; i++) {
            var ndate = new Date();
            ndate.setDate(ndate.getDate() - parseInt(this.newitemdays));
            if (this.childproducts[i].last_update >= ndate) {
              this.childproducts[i].cu_item = '* New * ' + this.childproducts[i].cu_item;
            }
          }
        }



        if (this.childproducts != undefined && this.childproducts != null && this.childproducts.length > 0) {
          this.itemnameddl = this.childproducts[0].cu_item;

          // if (this.multiviewtype == '2') {
          //   this.isshowsinglecart = false;
          // }
          this.bulkpriceformultiproduct = [];
          for (var i = 0; i < this.childproducts.length; i++) {
            this.childproducts[i].quantity = undefined;
            var umslist = JSON.parse(this.childproducts[i].um);
            var umqty = JSON.parse(this.childproducts[i].umqty);
            for (var l = 0; l < umslist.length; l++) {
              if (umslist[l] == this.childproducts[i].um_display) {
                this.childproducts[i].u_qty = (umqty[l - 1] == undefined ? 1 : umqty[l - 1])
              }
            }
            try {
              var dept1 = [];
              try {
                dept1 = JSON.parse(this.childproducts[i].itemdesc);
              } catch (ex) {
                this.childproducts[i].itemdesc = this.childproducts[i].itemdesc.replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';');
                this.childproducts[i].itemdesc = this.childproducts[i].itemdesc.replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '')
                  .replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '');
                dept1 = this.childproducts[i].itemdesc.replace('[', '').replace(']', '').split(';');
              }
              var des1 = '';
              var des2 = [];
              for (let newdesrc of dept1) {
                newdesrc = newdesrc.trim();
                if (newdesrc != '') {
                  des1 = des1 + newdesrc;
                  des2.push(newdesrc);
                }
              }
              this.childproducts[i].itemdesc = des2;
              this.childproducts[i].des1 = des1;
            } catch (ex) { }
            if (this.isLoggedIn == true && this.withloginprice == '1' && this.withloginpricelist != '1') {
              this.bulkpriceformultiproduct.push({
                "customer": Common.getWithExpiry("CustID"),
                "item": this.childproducts[i].itemname,
                "qty_unit": this.childproducts[i].um_display,
                "quantity": 1,
                "warehouse": this.warehouse,
                "rounding": this.PriceRound,
                "company_sy": Common.getWithExpiry("company_sy")
              })
            }
            else if (this.isLoggedIn == false && this.priceshow == '1' && this.listprice != '1') {
              this.bulkpriceformultiproduct.push({
                "customer": this.GuestUserID,
                "item": this.childproducts[i].itemname,
                "qty_unit": this.childproducts[i].um_display,
                "quantity": 1,
                "warehouse": this.Guestwarehouse,
                "rounding": this.PriceRound,
                "company_sy": Common.getWithExpiry("company_sy")
              })
            }
            //if (this.showProductDDL != '1' || this.showColorPellet != '1') {
            this.getpriceforproductmulti();
            this.GetIsshowpricebreak(this.childproducts[i]);
            //}
            //this.getProductImage(this.childproducts[i]);
            //this.getimageforthumbimage(this.childproducts[i]);
            //
          }
        }

        if (this.childproducts != undefined && this.childproducts != null && this.childproducts.length > 0) {
          if (this.baseitemAdd != '1') {
            this.SelectItem(this.childproducts[0], 0);
          } else {
            this.itemselect = this.item.itemname;
          }

        }

      });
    });
  }
  getisprofiledesc() {
    this.isprofiledesc = this.dataService.Getconfigbykey("isprofiledesc");
    if (this.isprofiledesc == null || this.isprofiledesc == undefined || this.isprofiledesc == '') {
      this.isprofiledesc = Common.getWithExpiry("isprofiledesc");
    }
    if (this.isprofiledesc == null || this.isprofiledesc == undefined || this.isprofiledesc == '') {
      this.dataService.GetConfigforisprofiledesc().subscribe((res: any) => {
        this.isprofiledesc = res;
        Common.setWithExpiry("isprofiledesc", this.isprofiledesc);
      });
    }
  }
  GetpriceRoundingsetting() {
    this.PriceRound = this.dataService.Getconfigbykey("PriceRound");
    if (this.PriceRound == null || this.PriceRound == undefined || this.PriceRound == '') {
      this.PriceRound = Common.getWithExpiry("PriceRound");
    }
    if (this.PriceRound == null || this.PriceRound == undefined || this.PriceRound == '') {
      this.dataService.GetpriceRoundingsetting().subscribe((res: any) => {
        this.PriceRound = res;
        Common.setWithExpiry("PriceRound", this.PriceRound);
      });
    }
  }
  GetItemNoteSetting() {
    this.isnotedisplay = this.dataService.Getconfigbykey("ProductDetailNote");
    if (this.isnotedisplay == null || this.isnotedisplay == undefined || this.isnotedisplay == '') {
      this.isnotedisplay = Common.getWithExpiry("ProductDetailNote");
    }
    if (this.isnotedisplay == null || this.isnotedisplay == undefined || this.isnotedisplay == '') {
      this.dataService.GetProductDetailNote().subscribe((res: any) => {
        this.isnotedisplay = res;
        Common.setWithExpiry("ProductDetailNote", this.isnotedisplay);
      });
    }
  }
  GetViewTypeformultipleproduct() {
    this.multiviewtype = this.dataService.Getconfigbykey("MultipleproductView");
    if (this.multiviewtype == null || this.multiviewtype == undefined || this.multiviewtype == '') {
      this.multiviewtype = Common.getWithExpiry("multiviewtype");
    }
    if (this.multiviewtype == null || this.multiviewtype == undefined || this.multiviewtype == '') {
      this.dataService.GetViewTypeformultipleproduct().subscribe((res: any) => {
        this.multiviewtype = res;
        Common.setWithExpiry("multiviewtype", this.multiviewtype);
      });
    }
  }
  Getpricebreakoneline() {
    this.isshowpriceifone = this.dataService.Getconfigbykey("pricebreakoneline");
    if (this.isshowpriceifone == null || this.isshowpriceifone == undefined || this.isshowpriceifone == '') {
      this.isshowpriceifone = Common.getWithExpiry("isshowpriceifone");
    }
    if (this.isshowpriceifone == null || this.isshowpriceifone == undefined || this.isshowpriceifone == '') {
      this.dataService.Getpricebreakoneline().subscribe((res: any) => {
        this.isshowpriceifone = res;
        Common.setWithExpiry("isshowpriceifone", this.isshowpriceifone);
      });
    }
  }
  getconfigurationforups() {
    this.showups = this.dataService.Getconfigbykey("UPSshow");
    if (this.showups == null || this.showups == undefined || this.showups == '') {
      this.showups = Common.getWithExpiry("showups");
    }
    if (this.showups == null || this.showups == undefined || this.showups == '') {
      this.dataService.Getconfigurationfroups().subscribe((res: any) => {
        this.showups = res;
        Common.setWithExpiry("showups", this.showups);
      });
    }
  }
  getbaseitemconfig() {
    this.baseitemAdd = this.dataService.Getconfigbykey("baseitemShow");
    if (this.baseitemAdd == null || this.baseitemAdd == undefined || this.baseitemAdd == '') {
      this.baseitemAdd = Common.getWithExpiry("baseitemShow");
    }
    if (this.baseitemAdd == null || this.baseitemAdd == undefined || this.baseitemAdd == '') {
      this.dataService.Getthebaseitemconfiguration().subscribe((res: any) => {
        this.baseitemAdd = res;
        Common.setWithExpiry("baseitemShow", this.baseitemAdd);
      });
    }
    //this.baseitemAdd ='1';
  }
  ChangeQty(type) {
    if (type == 1) {
      if (this.item.qty_warn != undefined && this.item.qty_warn != "0" && this.Multiply == '1') {
        this.item.quantity = (parseFloat(this.item.quantity) + parseFloat(this.item.qty_warn));
      }
      else {
        this.item.quantity = (parseFloat(this.item.quantity) + 1);
      }
    }
    else {
      if (this.item.qty_warn != undefined && this.item.qty_warn != "0" && this.Multiply == '1') {
        this.item.quantity = (parseFloat(this.item.quantity) - parseFloat(this.item.qty_warn));
      }
      else {
        this.item.quantity = (parseFloat(this.item.quantity) - 1);
      }
    }
  }
  getprofilenoforitemdesc() {
    this.profilenoforitemdesc = this.dataService.Getconfigbykey("profilenoforitemdesc");
    if (this.profilenoforitemdesc == null || this.profilenoforitemdesc == undefined || this.profilenoforitemdesc == '') {
      this.profilenoforitemdesc = Common.getWithExpiry("profilenoforitemdesc");
    }
    if (this.profilenoforitemdesc == null || this.profilenoforitemdesc == undefined || this.profilenoforitemdesc == '') {
      this.dataService.GetConfigforprofilenoforitemdesc().subscribe((res: any) => {
        this.profilenoforitemdesc = res;
        Common.setWithExpiry("profilenoforitemdesc", this.profilenoforitemdesc);
      });
    }
  }


  getMultiplyQtySetting() {
    this.Multiply = this.dataService.Getconfigbykey("Multiply");
    if (this.Multiply == null || this.Multiply == undefined || this.Multiply == '') {
      this.Multiply = Common.getWithExpiry("Multiply");
    }
    if (this.Multiply == null || this.Multiply == undefined || this.Multiply == '') {
      this.dataService.MultiplySetting().subscribe((data: any) => {
        this.Multiply = data;
        Common.setWithExpiry("Multiply", this.Multiply);
      });
    }
  }
  getGuestUserID() {
    this.GuestUserID = this.dataService.Getconfigbykey("GuestUserID");
    if (this.GuestUserID == null || this.GuestUserID == undefined || this.GuestUserID == '') {
      this.GuestUserID = Common.getWithExpiry("GuestUserID");
    }
    if (this.GuestUserID == null || this.GuestUserID == undefined || this.GuestUserID == '') {
      this.dataService.GetConfidForGuestUserID().subscribe((res: any) => {
        this.GuestUserID = res;
        Common.setWithExpiry("GuestUserID", this.GuestUserID);
      });
    }
  }
  getGuestwarehouse() {
    this.Guestwarehouse = Common.getWithExpiry("Guestwarehouse");
    if (this.Guestwarehouse == null || this.Guestwarehouse == undefined || this.Guestwarehouse == '') {
      this.dataService.GetConfidForGuestwarehouse().subscribe((res: any) => {
        this.Guestwarehouse = res;
        Common.setWithExpiry("Guestwarehouse", this.Guestwarehouse);
        this.getproductdetailsfirst();
      });
    }
    else {
      this.getproductdetailsfirst();
    }
  }

  Accessannomyous() {
    this.isaccesswithlogin = this.dataService.Getconfigbykey("withoutloginBrowse");
    if (this.isaccesswithlogin == null || this.isaccesswithlogin == undefined || this.isaccesswithlogin == '') {
      this.isaccesswithlogin = Common.getWithExpiry("isaccesswithlogin");
    }
    if (this.isaccesswithlogin == null || this.isaccesswithlogin == undefined || this.isaccesswithlogin == '') {
      this.dataService.GetConfidForanonymoususersbrowsethesite().subscribe((res: any) => {
        this.isaccesswithlogin = res;
        Common.setWithExpiry("isaccesswithlogin", this.isaccesswithlogin);
        if (this.isaccesswithlogin == '0') {
          this.router.navigate(['login']);
        }
        else {
          this.getqtymsgwithoutlogin();
          this.getpricemsgwithoutlogin();
          this.getannavail();
          this.getStockconfig();
          this.getpriceshow();
          this.getGuestUserID();
          this.getGuestwarehouse();
          this.Getlabel1();
          this.Getlabel2();
          this.Getlabel3();
          this.Getlabel4();
          this.Getlabel5();
          this.Getlabel6();
          this.getconfigurationforups();
        }
      });
    }
    else {
      if (this.isaccesswithlogin == '0') {
        this.router.navigate(['login']);
      }
      else {
        this.getqtymsgwithoutlogin();
        this.getpricemsgwithoutlogin();
        this.getannavail();
        this.getGuestUserID();
        this.getpriceshow();
        this.getStockconfig();
        this.getGuestwarehouse();
        this.Getlabel1();
        this.Getlabel2();
        this.Getlabel3();
        this.Getlabel4();
        this.Getlabel5();
        this.Getlabel6();
        this.getconfigurationforups();
      }
    }
  }
  getannavail() {
    this.annavail = this.dataService.Getconfigbykey("withoutloginavailshow");
    if (this.annavail == null || this.annavail == undefined || this.annavail == '') {
      this.annavail = Common.getWithExpiry("annavail");
    }
    if (this.annavail == null || this.annavail == undefined || this.annavail == '') {
      this.dataService.anonymoususersavailable().subscribe((res: any) => {
        this.annavail = res;
        Common.setWithExpiry("annavail", this.annavail);
        if (this.annavail == '1') {
          this.getannastock();
          this.getwithoutloginavaillist();
        }
      });
    }
    else {
      if (this.annavail == '1') {
        this.getannastock();
        this.getwithoutloginavaillist();
      }
    }
  }
  getwithloginprice() {
    this.withloginprice = this.dataService.Getconfigbykey("withloginprice");
    if (this.withloginprice == null || this.withloginprice == undefined || this.withloginprice == '') {
      this.withloginprice = Common.getWithExpiry("withloginprice");
    }
    if (this.withloginprice == null || this.withloginprice == undefined || this.withloginprice == '') {
      this.dataService.withloginprice().subscribe((res: any) => {
        this.withloginprice = res;
        Common.setWithExpiry("withloginprice", this.withloginprice);
        if (this.withloginprice == '1') {
          this.getwithloginpricelist();
        }
      });
    }
    else {
      if (this.withloginprice == '1') {
        this.getwithloginpricelist();
      }
    }
  }
  getwithloginpricelist() {
    this.withloginpricelist = this.dataService.Getconfigbykey("withloginpricelist");
    if (this.withloginpricelist == null || this.withloginpricelist == undefined || this.withloginpricelist == '') {
      this.withloginpricelist = Common.getWithExpiry("withloginpricelist");
    }
    if (this.withloginpricelist == null || this.withloginpricelist == undefined || this.withloginpricelist == '') {
      this.dataService.withloginpricelist().subscribe((res: any) => {
        this.withloginpricelist = res;
        Common.setWithExpiry("withloginpricelist", this.withloginpricelist);
      });
    }
  }
  getwithloginavailshow() {
    this.withloginavailshow = this.dataService.Getconfigbykey("withloginavailshow");
    if (this.withloginavailshow == null || this.withloginavailshow == undefined || this.withloginavailshow == '') {
      this.withloginavailshow = Common.getWithExpiry("withloginavailshow");
    }
    if (this.withloginavailshow == null || this.withloginavailshow == undefined || this.withloginavailshow == '') {
      this.dataService.withloginavailshow().subscribe((res: any) => {
        this.withloginavailshow = res;
        Common.setWithExpiry("withloginavailshow", this.withloginavailshow);
        if (this.withloginavailshow == '1') {
          this.getwithloginavaillist();
          this.getwithloginavailqty();
        }
      });
    }
    else {
      if (this.withloginavailshow == '1') {
        this.getwithloginavaillist();
        this.getwithloginavailqty();
      }
    }
  }
  getwithloginavaillist() {
    this.withloginavaillist = this.dataService.Getconfigbykey("withloginavaillist");
    if (this.withloginavaillist == null || this.withloginavaillist == undefined || this.withloginavaillist == '') {
      this.withloginavaillist = Common.getWithExpiry("withloginavaillist");
    }
    if (this.withloginavaillist == null || this.withloginavaillist == undefined || this.withloginavaillist == '') {
      this.dataService.withloginavaillist().subscribe((res: any) => {
        this.withloginavaillist = res;
        Common.setWithExpiry("withloginavaillist", this.withloginavaillist);
      });
    }
  }
  getwithloginavailqty() {
    this.withloginavailqty = this.dataService.Getconfigbykey("withloginavailqty");
    if (this.withloginavailqty == null || this.withloginavailqty == undefined || this.withloginavailqty == '') {
      this.withloginavailqty = Common.getWithExpiry("withloginavailqty");
    }
    if (this.withloginavailqty == null || this.withloginavailqty == undefined || this.withloginavailqty == '') {
      this.dataService.withloginavailqty().subscribe((res: any) => {
        this.withloginavailqty = res;
        Common.setWithExpiry("withloginavailqty", this.withloginavailqty);
      });
    }
  }
  getpriceshow() {
    this.priceshow = this.dataService.Getconfigbykey("withoutloginpriceshow");
    if (this.priceshow == null || this.priceshow == undefined || this.priceshow == '') {
      this.priceshow = Common.getWithExpiry("priceshow");
    }
    if (this.priceshow == null || this.priceshow == undefined || this.priceshow == '') {
      this.dataService.GetConfidForanonymoususersPriceshow().subscribe((res: any) => {
        this.priceshow = res;
        Common.setWithExpiry("priceshow", this.priceshow);
        if (this.priceshow == '1') {
          this.getlistprice();
        }
      });
    }
    else {
      if (this.priceshow == '1') {
        this.getlistprice();
      }
    }
  }



  getwithoutloginavaillist() {
    this.withoutloginavaillist = this.dataService.Getconfigbykey("withoutloginavaillist");
    if (this.withoutloginavaillist == null || this.withoutloginavaillist == undefined || this.withoutloginavaillist == '') {
      this.withoutloginavaillist = Common.getWithExpiry("withoutloginavaillist");
    }
    if (this.withoutloginavaillist == null || this.withoutloginavaillist == undefined || this.withoutloginavaillist == '') {
      this.dataService.withoutloginavaillist().subscribe((res: any) => {
        this.withoutloginavaillist = res;
        Common.setWithExpiry("withoutloginavaillist", this.withoutloginavaillist);
      });
    }
  }
  getavail() {
    this.annavail = this.dataService.Getconfigbykey("withoutloginavailshow");
    if (this.annavail == null || this.annavail == undefined || this.annavail == '') {
      this.annavail = Common.getWithExpiry("annavail");
    }
    if (this.annavail == null || this.annavail == undefined || this.annavail == '') {
      this.dataService.anonymoususersavailable().subscribe((zeros: any) => {
        this.annavail = zeros;
        Common.setWithExpiry("annavail", this.annavail);
        if (this.annavail == '1') {
          this.getannastock();
        }
      });
    }
    else {
      if (this.annavail == '1') {
        this.getannastock();
      }
    }
  }
  getqtymsg() {
    this.qtymsg = this.dataService.Getconfigbykey("qtymsg");
    if (this.qtymsg == null || this.qtymsg == undefined || this.qtymsg == '') {
      this.qtymsg = Common.getWithExpiry("qtymsg");
    }
    if (this.qtymsg == null || this.qtymsg == undefined || this.qtymsg == '') {
      this.dataService.msgdisplayforavaibility().subscribe((res: any) => {
        this.qtymsg = res;
        Common.setWithExpiry("qtymsg", this.qtymsg);
      });
    }
  }
  Getvendor() {
    this.isvendor = this.dataService.Getconfigbykey("vendor");
    if (this.isvendor == null || this.isvendor == undefined || this.isvendor == '') {
      this.isvendor = Common.getWithExpiry("isvendor");
    }
    if (this.isvendor == null || this.isvendor == undefined || this.isvendor == '') {
      this.dataService.GetConfigForVendorinProductDetailspage().subscribe((res: any) => {
        this.isvendor = res;
        Common.setWithExpiry("isvendor", this.isvendor);
      });
    }
  }
  GeManufactureSetting() {
    this.isMenufacturer = this.dataService.Getconfigbykey("Manufacturer");
    if (this.isMenufacturer == null || this.isMenufacturer == undefined || this.isMenufacturer == '') {
      this.isMenufacturer = Common.getWithExpiry("isMenufacture");
    }
    if (this.isMenufacturer == null || this.isMenufacturer == undefined || this.isMenufacturer == '') {
      this.dataService.GetConfigForManufacturerinProductDetailspage().subscribe((res: any) => {
        this.isMenufacturer = res;
        Common.setWithExpiry("isMenufacture", this.isMenufacturer);
      });
    }
  }
  addtocartnotavail() {
    this.addtonotavail = this.dataService.Getconfigbykey("addifunavail");
    if (this.addtonotavail == null || this.addtonotavail == undefined || this.addtonotavail == '') {
      this.addtonotavail = Common.getWithExpiry("addtonotavail");
    }
    if (this.addtonotavail == null || this.addtonotavail == undefined || this.addtonotavail == '') {
      this.dataService.GetConfigForisaddifunavail().subscribe((res: any) => {
        this.addtonotavail = res;
        Common.setWithExpiry("addtonotavail", this.addtonotavail);
      });
    }
  }

  getpricemsg() {
    this.pricemsg = this.dataService.Getconfigbykey("pricemsg");
    if (this.pricemsg == null || this.pricemsg == undefined || this.pricemsg == '') {
      this.pricemsg = Common.getWithExpiry("pricemsg");
    }
    if (this.pricemsg == null || this.pricemsg == undefined || this.pricemsg == '') {
      this.dataService.msgdisplayforprice().subscribe((res: any) => {
        this.pricemsg = res;
        Common.setWithExpiry("pricemsg", this.pricemsg);
      });
    }
  }
  getlistprice() {
    this.listprice = this.dataService.Getconfigbykey("withoutloginpricelist");
    if (this.listprice == null || this.listprice == undefined || this.listprice == '') {
      this.listprice = Common.getWithExpiry("listprice");
    }
    if (this.listprice == null || this.listprice == undefined || this.listprice == '') {
      this.dataService.GetConfidForlistprice().subscribe((res: any) => {
        this.listprice = res;
        Common.setWithExpiry("listprice", this.listprice);
      });
    }
  }
  getannastock() {
    this.annastock = this.dataService.Getconfigbykey("withoutloginavailqty");
    if (this.annastock == null || this.annastock == undefined || this.annastock == '') {
      this.annastock = Common.getWithExpiry("annastock");
    }
    if (this.annastock == null || this.annastock == undefined || this.annastock == '') {
      this.dataService.anonymoususersIsstock().subscribe((zeros: any) => {
        this.annastock = zeros;
        Common.setWithExpiry("annastock", this.annastock);
      });
    }
  }

  cleanURL(oldURL: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }
  getmultipleum() {
    this.ismultipleum = this.dataService.Getconfigbykey("ismultium");
    if (this.ismultipleum == null || this.ismultipleum == undefined || this.ismultipleum == '') {
      this.ismultipleum = Common.getWithExpiry("ismultipleum");
    }
    if (this.ismultipleum == null || this.ismultipleum == undefined || this.ismultipleum == '') {
      this.dataService.Allowmultipleum().subscribe((res: any) => {
        this.ismultipleum = res;
        Common.setWithExpiry("ismultipleum", this.ismultipleum);
      });
    }
  }
  Getlabel1() {
    this.Label1 = this.dataService.Getconfigbykey("Label1");
    if (this.Label1 == null || this.Label1 == undefined || this.Label1 == '') {
      this.Label1 = Common.getWithExpiry("Label1");
    }
    if (this.Label1 == null || this.Label1 == undefined || this.Label1 == '') {
      this.dataService.GetConfigurationforlable1().subscribe((res: any) => {
        this.Label1 = res;
        Common.setWithExpiry("Label1", this.Label1);
      });
    }
  }
  Getlabel2() {
    this.Label2 = this.dataService.Getconfigbykey("Label2");
    if (this.Label2 == null || this.Label2 == undefined || this.Label2 == '') {
      this.Label2 = Common.getWithExpiry("Label2");
    }
    if (this.Label2 == null || this.Label2 == undefined || this.Label2 == '') {
      this.dataService.GetConfigurationforlable2().subscribe((res: any) => {
        this.Label2 = res;
        Common.setWithExpiry("Label2", this.Label2);
      });
    }
  }
  Getlabel3() {
    this.Label3 = this.dataService.Getconfigbykey("Label3");
    if (this.Label3 == null || this.Label3 == undefined || this.Label3 == '') {
      this.Label3 = Common.getWithExpiry("Label3");
    }
    if (this.Label3 == null || this.Label3 == undefined || this.Label3 == '') {
      this.dataService.GetConfigurationforlable3().subscribe((res: any) => {
        this.Label3 = res;
        Common.setWithExpiry("Label3", this.Label3);
      });
    }
  }
  Getlabel4() {
    this.Label4 = this.dataService.Getconfigbykey("Label4");
    if (this.Label4 == null || this.Label4 == undefined || this.Label4 == '') {
      this.Label4 = Common.getWithExpiry("Label4");
    }
    if (this.Label4 == null || this.Label4 == undefined || this.Label4 == '') {
      this.dataService.GetConfigurationforlable4().subscribe((res: any) => {
        this.Label4 = res;
        Common.setWithExpiry("Label4", this.Label4);
      });
    }
  }
  Getlabel5() {
    this.Label5 = this.dataService.Getconfigbykey("Label5");
    if (this.Label5 == null || this.Label5 == undefined || this.Label5 == '') {
      this.Label5 = Common.getWithExpiry("Label5");
    }
    if (this.Label5 == null || this.Label5 == undefined || this.Label5 == '') {
      this.dataService.GetConfigurationforlable5().subscribe((res: any) => {
        this.Label5 = res;
        Common.setWithExpiry("Label5", this.Label5);
      });
    }
  }
  Getlabel6() {
    this.Label6 = this.dataService.Getconfigbykey("Label6");
    if (this.Label6 == null || this.Label6 == undefined || this.Label6 == '') {
      this.Label6 = Common.getWithExpiry("Label6");
    }
    if (this.Label6 == null || this.Label6 == undefined || this.Label6 == '') {
      this.dataService.GetConfigurationforlable6().subscribe((res: any) => {
        this.Label6 = res;
        Common.setWithExpiry("Label6", this.Label6);
      });
    }
  }
  Getlabel7() {
    this.Label7 = this.dataService.Getconfigbykey("Label7");
    if (this.Label7 == null || this.Label7 == undefined || this.Label7 == '') {
      this.Label7 = Common.getWithExpiry("Label7");
    }
    if (this.Label7 == null || this.Label7 == undefined || this.Label7 == '') {
      this.dataService.GetConfigurationforlable7().subscribe((res: any) => {
        this.Label7 = res;
        Common.setWithExpiry("Label7", this.Label7);
      });
    }

  }
  getisSAitem() {
    this.isSAitem = this.dataService.Getconfigbykey("isSAitem");
    if (this.isSAitem == null || this.isSAitem == undefined || this.isSAitem == '') {
      this.isSAitem = Common.getWithExpiry("isSAitem");
    }
    if (this.isSAitem == null || this.isSAitem == undefined || this.isSAitem == '') {
      this.dataService.Allowsaitemtags().subscribe((res: any) => {
        this.isSAitem = res;
        Common.setWithExpiry("isSAitem", this.isSAitem);
      });
    }
  }
  isitemprofileset() {
    this.isitemprofile = this.dataService.Getconfigbykey("IsItemProfile");
    if (this.isitemprofile == null || this.isitemprofile == undefined || this.isitemprofile == '') {
      this.isitemprofile = Common.getWithExpiry("isitemprofile");
    }
    if (this.isitemprofile == null || this.isitemprofile == undefined || this.isitemprofile == '') {
      this.dataService.GetConfigForItemProfileshow().subscribe((res: any) => {
        this.isitemprofile = res;
        Common.setWithExpiry("isitemprofile", this.isitemprofile);
      });
    }
  }
  getStockconfig() {
    this.showstock = this.dataService.Getconfigbykey("withoutloginavailqty");
    if (this.showstock == null || this.showstock == undefined || this.showstock == '') {
      this.showstock = Common.getWithExpiry("showstock");
    }
    if (this.showstock == null || this.showstock == undefined || this.showstock == '') {
      this.dataService.GetConfigForStockShow().subscribe((res: any) => {
        this.showstock = res;
        Common.setWithExpiry("showstock", this.showstock);
      });
    }

  }

  getFeatureTitle() {
    this.featureTitle = this.dataService.Getconfigbykey("FeatureTitle");
    if (this.featureTitle == null || this.featureTitle == undefined || this.featureTitle == '') {
      this.featureTitle = Common.getWithExpiry("featureTitle");
    }
    if (this.featureTitle == null || this.featureTitle == undefined || this.featureTitle == '') {
      this.dataService.GetFeatureTitle().subscribe((res: any) => {
        this.featureTitle = res;
        Common.setWithExpiry("featureTitle", this.featureTitle);
      });
    }
  }

  getProfileTitle() {
    this.profileTitle = this.dataService.Getconfigbykey("ProfileTitle");
    if (this.profileTitle == null || this.profileTitle == undefined || this.profileTitle == '') {
      this.profileTitle = Common.getWithExpiry("profileTitle");
    }
    if (this.profileTitle == null || this.profileTitle == undefined || this.profileTitle == '') {
      this.dataService.GetProfileTitle().subscribe((res: any) => {
        this.profileTitle = res;
        Common.setWithExpiry("profileTitle", this.profileTitle);
      });
    }
  }

  getOverviewTitle() {
    this.overviewTitle = this.dataService.Getconfigbykey("OverviewTitle");
    if (this.overviewTitle == null || this.overviewTitle == undefined || this.overviewTitle == '') {
      this.overviewTitle = Common.getWithExpiry("overviewTitle");
    }
    if (this.overviewTitle == null || this.overviewTitle == undefined || this.overviewTitle == '') {
      this.dataService.GetOverviewTitle().subscribe((res: any) => {
        this.overviewTitle = res;
        Common.setWithExpiry("overviewTitle", this.overviewTitle);
      });
    }
  }


  get3DTitle() {
    this.D3Title = this.dataService.Getconfigbykey("3DTitle");
    if (this.D3Title == null || this.D3Title == undefined || this.D3Title == '') {
      this.D3Title = Common.getWithExpiry("D3Title");
    }
    if (this.D3Title == null || this.D3Title == undefined || this.D3Title == '') {
      this.dataService.Get3DTitle().subscribe((res: any) => {
        this.D3Title = res;
        Common.setWithExpiry("D3Title", this.D3Title)
      });
    }
  }

  GetIsshowpricebreak(item) {
    var userid = (this.GuestUserID == undefined ? Common.getWithExpiry("CustID") : this.GuestUserID);
    this.isshowpricebreaks = this.dataService.Getconfigbykey("ispricebreaks");
    if (this.isshowpricebreaks == null || this.isshowpricebreaks == undefined || this.isshowpricebreaks == '') {
      this.isshowpricebreaks = Common.getWithExpiry("isshowpricebreaks");
    }
    if (this.isshowpricebreaks == null || this.isshowpricebreaks == undefined || this.isshowpricebreaks == '') {
      this.dataService.Allowpricebreaks().subscribe((res: any) => {
        this.isshowpricebreaks = res;
        Common.setWithExpiry("isshowpricebreaks", this.isshowpricebreaks);
        if (this.isshowpricebreaks == 1) {
          this.getpricebreaks(userid, item);
          this.Getpricebreakoneline();
        }
      });
    }
    else {
      if (this.isshowpricebreaks == 1) {
        this.getpricebreaks(userid, item);
        this.Getpricebreakoneline();
      }
    }
  }
  getAddZero() {
    this.AddZero = this.dataService.Getconfigbykey("AddZeroValue");
    if (this.AddZero == null || this.AddZero == undefined || this.AddZero == '') {
      this.AddZero = Common.getWithExpiry("AddZero");
    }
    if (this.AddZero == null || this.AddZero == undefined || this.AddZero == '') {
      this.dataService.GetConfigForZeroPrice().subscribe((res: any) => {
        this.AddZero = res;
        Common.setWithExpiry("AddZero", this.AddZero);
      });
    }
  }
  getIframeYouTubeUrl(videoId: string): SafeResourceUrl {
    var url = this.urlCache.get(videoId);
    if (url == undefined || url == null || url == '') {
      url = this.sanitizer.bypassSecurityTrustResourceUrl(videoId);
      this.urlCache.set(videoId, url);
    }
    return url;
  }
  public loadScript() {
    let body = <HTMLDivElement>document.body;

    let script = document.createElement('script');
    script.innerHTML = "";
    script.src = 'assets/js/3dmodule.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
  GetInprocessto() {
    var customer = Common.getWithExpiry("CustID");
    var sshipid = Common.getWithExpiry("UserID");
    this.item1.inprocess = 0;
    this.dataService.GetItemInProcessto(this.item1.itemname, sshipid, customer).subscribe((data: any) => {
      var getdatac = data;
      if (getdatac != null && getdatac != undefined && getdatac.length > 0) {
        for (let index = 0; index < getdatac.length; index++) {
          this.item1.inprocess = this.item1.inprocess + getdatac[index].q_comm_d;
        }
      }
      else {
        this.toastr.error("Data Not Found...");
      }
    })

  }
  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success("Copied to Clipboard")
  }
  checkvalues() {
    this.SelectedPartNumber = Common.getWithExpiry("partnumber");
    var wh = (this.warehouse == null ? this.Guestwarehouse : this.warehouse);
    this.dataService.getProductDetailbyItemName(this.SelectedPartNumber, wh, Common.getWithExpiry("CustID")).subscribe((res: any) => {
      var item2 = res;
      if (item2 != undefined && item2 != null) {
        this.fllagtochild = false;
        this.SelectItem(item2, 0)
      }
      else {

        this.fllagtochild = true;
        var getbaseit = Common.getWithExpiry('baseitem');
        this.dataService.getProductDetailbyItemName(getbaseit, wh, Common.getWithExpiry("CustID")).subscribe((res: any) => {
          var item2 = res;
          if (item2 != undefined && item2 != null) {
            this.SelectItem(item2, 0)
          }
          else {
            var itemNo = this.route.snapshot.paramMap.get('item');
            // if (this.UrlWithDetails == '1') {
            //   itemNo = itemNo.split('^')[0];
            // }
            itemNo = decodeURIComponent(itemNo);
            this.dataService.getProductDetailbyItemName(itemNo, wh, Common.getWithExpiry("CustID")).subscribe((res: any) => {
              var item2 = res;
              this.tagmanager();
              if (item2 != undefined && item2 != null) {
                this.SelectItem(item2, 0)
              }
            });
          }
        });
      }
    });
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  ngOnInit() {
    console.log('Product Details Page on init');
    this.gototop();
    this.webtype = this.dataService.Getconfigbykey("websitetype");
    if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
      this.webtype = Common.getWithExpiry("websitetype");
    }
    if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
      this.dataService.GetWebsiteType().subscribe((data: any) => {
        this.webtype = data;
        Common.setWithExpiry("websitetype", this.webtype);
      })
    }
    //this.activetabord(2);
  }
  SelectItem(item, index) {



    this.itemnameddl = item.cu_item;

    // try {

    //   if (this.childproducts.length < this.galleryImages.length) {
    //     index++;

    //     this.ngxGalleryComponent.show(index);
    //     this.ngxGalleryComponent.openPreview(0);
    //     this.ngxGalleryComponent.onPreviewClose();
    //   }
    //   else{
    //     this.ngxGalleryComponent.show(index);
    //     this.ngxGalleryComponent.openPreview(0);
    //     this.ngxGalleryComponent.onPreviewClose();
    //   }
    // } catch (ed) { }


    //this.item1 = item;
    this.item1 = Object.assign({}, item)
    

    try {
      if (this.item1.last_update != undefined && this.item1.last_update != null && this.item1.last_update != '' && this.newItemDate != undefined && this.newItemDate != "" && this.newItemDate != null) {
        this.newItemDate = new Date(this.newItemDate);
        this.item1.last_update = new Date(this.item1.last_update);
        if (this.item1.last_update != undefined && this.item1.last_update != null && this.item1.last_update >= this.newItemDate) {
          this.isNewProduct = true;
        }
      }

      if (this.item1.last_update != undefined && this.item1.last_update != null && this.item1.last_update != '' && this.newitemdays != undefined && this.newitemdays != "" && this.newitemdays != null) {
        var ndate = new Date();
        ndate.setDate(ndate.getDate() - parseInt(this.newitemdays));
        this.item1.last_update = new Date(this.item1.last_update);
        if (this.item1.last_update != undefined && this.item1.last_update != null && this.item1.last_update >= ndate) {
          this.isNewProduct = true;
        }
      }

    } catch (ex) { }

    //this.GetItemNotesforchild(this.item1.itemname);
    if (this.multiviewtype != 2) {
      this.item1.quantity = 1;
    }
    this.itemselect = item.itemname;
    this.sysnote = [];

    try {

      this.item1.descr = this.item1.itemdesc;
      Common.Setdescriptionforitem(this.item1, this.DescrToShow);
      //    if (this.showColorPellet == '1') {
      //this.galleryImages = [];
      this.sysimage = [];
      this.getProductImage(this.item1);
      this.GetItemNotes(this.item1.itemname);

      try {
        this.ngxGalleryComponent.images = this.galleryImages;
        this.ngxGalleryComponent.openPreview(0);
        this.ngxGalleryComponent.onPreviewClose();
      } catch (ex) { }

      // }
      // else{
      //   this.GetItemNotes(this.item1.itemname);
      // }
      if (this.webtype == '5' || this.webtype == '6') {
        var sa_group_label = JSON.parse(this.item1.sa_group_label);
        var sa_group_label1 = [];
        this.isfeature = false;
        for (var i = 0; i < sa_group_label.length; i++) {
          if (sa_group_label[i] != '') {
            this.isfeature = true;
            if (i == 0 && this.item1.sa_group_1 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_1 });
            }
            else if (i == 1 && this.item1.sa_group_2 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_2 });
            }
            else if (i == 2 && this.item1.sa_group_3 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_3 });
            }
            else if (i == 3 && this.item1.sa_group_4 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_4 });
            }
            else if (i == 4 && this.item1.sa_group_5 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_5 });
            }
            else if (i == 5 && this.item1.sa_group_6 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_6 });
            }
            else if (i == 6 && this.item1.sa_group_7 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_7 });
            }
            else if (i == 7 && this.item1.sa_group_8 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_8 });
            }
            else if (i == 8 && this.item1.sa_group_9 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_9 });
            }
            else if (i == 9 && this.item1.sa_group_10 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_10 });
            }
            else if (i == 10 && this.item1.sa_group_11 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_11 });
            }
            else if (i == 11 && this.item1.sa_group_12 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_12 });
            }
            else if (i == 12 && this.item1.sa_group_13 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_13 });
            }
            else if (i == 13 && this.item1.sa_group_14 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_14 });
            }
            else if (i == 14 && this.item1.sa_group_15 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_15 });
            }
          }
        }
      }
      if (sa_group_label1 != undefined && sa_group_label1.length > 0) {
        for (var i = 0; i < sa_group_label1.length; i++) {
          for (var j = 0; j < this.salablelist.length; j++) {
            if (sa_group_label1[i].lbl == this.salablelist[j].salablecode) {
              sa_group_label1[i].lbl = this.salablelist[j].salabledescr;
            }
          }
        }
      }
      this.item1.sa_group_label = sa_group_label1;
    } catch (ex) { }




    var units = JSON.parse(this.item1.um);
    var umArr = JSON.parse(this.item1.umqty);
    var getallows = [];
    if (this.item1.web_um_alws == undefined || this.item1.web_um_alws == null) {
      getallows = JSON.parse("[true,true,true,true,true]");
    }
    else {
      getallows = JSON.parse(this.item1.web_um_alws);
    }
    var umList = [];
    var getindex = 0;
    var umList1 = [];
    var gethr = 0;
    if (this.ismultipleum == '1') {
      for (var i = 0; i < units.length; i++) {
        if (i == 0 && units[i] != '') {
          this.item1.firstum = units[i];
          this.item1.firstumqty = (umArr[i - 1] == undefined ? 1 : umArr[i - 1]);
        }
        if (i == 0 && units[i] != '' && getallows[i] == true) {

          if (units[i] == this.item1.um_display) {
            getindex = 0;
          }

          umList1.push(units[i]);
          umList.push({ lables: this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (1)' : ''), qty: 1, umdisplay: units[i], lvalue: units[i] + ' (1)' });
          units[i] = units[i] + ' (1)';
          gethr = gethr + 1;
          this.item1.um_displayQty = 1;
        }
        else if (units[i] != '' && getallows[i] == true) {
          if (units[i] == this.item1.um_display) {
            getindex = gethr;
            this.item1.um_displayQty = umArr[i - 1];
          }
          gethr = gethr + 1;
          umList1.push(units[i]);
          umList.push({ lables: this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (' + umArr[i - 1] + ')' : ''), qty: umArr[i - 1], umdisplay: units[i], lvalue: units[i] + ' (' + umArr[i - 1] + ')' });
          units[i] = units[i] + ' (' + umArr[i - 1] + ')';

        }
      }
    }
    else {
      for (var i = 0; i < units.length; i++) {
        if (i == 0 && units[i] != '') {
          this.item1.firstum = units[i];
          this.item1.firstumqty = (umArr[i - 1] == undefined ? 1 : umArr[i - 1]);
        }
        if (units[i] != '' && units[i] == this.item1.um_display) {
          if (i == 0) {
            umList1.push(units[i]);
            //umList.push(units[i]);

            umList.push({ lables: this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (1)' : ''), qty: 1, umdisplay: units[i], lvalue: units[i] + ' (1)' });
            units[i] = units[i] + ' (1)';

            this.item1.um_displayQty = 1;
          }
          else {
            umList1.push(units[i]);
            umList.push({ lables: this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (' + umArr[i - 1] + ')' : ''), qty: umArr[i - 1], umdisplay: units[i], lvalue: units[i] + ' (' + umArr[i - 1] + ')' });
            units[i] = units[i] + ' (' + umArr[i - 1] + ')';
            //umList.push(units[i]);
            this.item1.um_displayQty = umArr[i - 1];
          }
        }
      }
    }
    try {
      this.item1.descrarray = JSON.parse(this.item1.itemdesc);
    } catch (ex) {
      this.item1.descrarray = this.item1.itemdesc;
    }
    this.item1.unitMeasure = umList[getindex].lvalue;
    this.item1.unitList = umList;
    this.objUnitArr = umList1;
    
    //this.item1.profile2 = JSON.parse(this.item1.profile2)
    this.item = this.item1;
    
    this.item.profilelabel = "";
    if (this.ProfileNo == '1') {
      var getprofile = JSON.parse(this.item.profile1);
      this.item.profilelabel = getprofile[this.ProfileIndex - 1];
    }
    else if (this.ProfileNo == '2') {
      var getprofile = JSON.parse(this.item.profile2);
      this.item.profilelabel = getprofile[this.ProfileIndex - 1];
    }
    else if (this.ProfileNo == '3') {
      var getprofile = JSON.parse(this.item.profile3);
      this.item.profilelabel = getprofile[this.ProfileIndex - 1];
    }

    for (var i = 0; i < this.item.unitList.length; i++) {
      var u = this.item.unitList[i].umdisplay.split(' ');
      if (u[0] == this.item.umdisplay) {
        this.item.unitMeasure = this.item.unitList[i].lvalue;
        break;
      }
    }
    if (this.item1.qty_warn != undefined && this.item1.qty_warn != "0" && this.Multiply == '1') {
      this.item1.quantity = this.item1.qty_warn / this.item1.um_displayQty;
      this.item.quantity = this.item1.qty_warn / this.item1.um_displayQty;
    }
    // else{
    //   this.item1.quantity = this.item1.um_displayQty;
    //   this.item.quantity = this.item1.um_displayQty;
    // }
    this.GetitemProfileDetails(this.item1.itemname);
    //this.getProductImage(this.item1);
    this.GetIsshowpricebreak(this.item1);
    this.getProductPrice();
    this.getproductavaibility();
    this.getpriceforproductmulti();
    this.setSeodetails();


  }
  openpopup(){
    this.isrfq = false;
  }
  getproductdetailsfirst() {
    this.itemNo = this.route.snapshot.paramMap.get('item');
    var desc = '';
    try {
      desc = this.route.snapshot.paramMap.get('desc');
    } catch (ed) { }

    // if (this.UrlWithDetails == '1') {
    //   this.itemNo = this.itemNo.split('^')[0];
    // }

    this.itemNo = decodeURIComponent(this.itemNo);
    this.GetItemNotes(this.itemNo);
    this.GetcategoriespathProductDetails(this.itemNo)
    var wh = (this.warehouse == null ? this.Guestwarehouse : this.warehouse);
    this.dataService.getProductDetailbyItemName(this.itemNo, wh, Common.getWithExpiry("CustID")).subscribe((res: any) => {
      this.item1 = res;
      this.tagmanager();
      try{
      this.item1.profile_2 = JSON.parse(this.item1.profile2);
      }catch(ed){}
      if (this.logintype == '3' && this.isLoggedIn) {
        this.GetInprocessto();
      }

      if (this.item1.last_update != undefined && this.item1.last_update != null && this.item1.last_update != '' && this.newItemDate != undefined && this.newItemDate != "" && this.newItemDate != null) {
        if (this.item1.last_update >= this.newItemDate) {
          this.isNewProduct = true;
        }
      }
      // else {
      //   this.isNewProduct = false;
      // }
      if (this.item1.last_update != undefined && this.item1.last_update != null && this.item1.last_update != '' && this.newitemdays != undefined && this.newitemdays != "" && this.newitemdays != null) {
        var ndate = new Date();
        ndate.setDate(ndate.getDate() - parseInt(this.newitemdays));
        this.item1.last_update = new Date(this.item1.last_update);
        if (this.item1.last_update != undefined && this.item1.last_update != null && this.item1.last_update >= ndate) {
          this.isNewProduct = true;
        }
      }
      // else {
      //   this.isNewProduct = false;
      // }

      this.item1.descr = this.item1.itemdesc;
      this.item1.quantity = 1;
      Common.Setdescriptionforitem(this.item1, this.DescrToShow);

      // Common.gotoproductdetails(this.item1,this.UrlWithDetails,this.UrlWithFreeForm);  

      // if(desc==undefined || desc==null || desc=='' || desc=='null'){
      //   this.router.navigate([this.item1.links]);
      //   //this.router.navigateByUrl(this.item1.links, { skipLocationChange: true })
      //   //this.router.navigateByUrl(this.item1.links)
      // } else 
      //if(desc!=undefined && desc!=null && desc!='' && desc!='null' && this.item1.links.indexOf(desc)==-1){
      // if (isPlatformServer(this.platformId)) {
      //  this.response.status(404);
      //this.request.res.status(404);
      //}
      //this.router.navigate(['404']);
      //this.router.navigateByUrl('404', { skipLocationChange: true })
      // }

      this.getIsRelatedProduct();
      if (this.item1.replenish == true) {
        this.itemselect = this.item1.itemname;
      }
      if (this.drop_ship == false) {
        this.item1.drop_ship = false;
      }
      this.GetCountFormultipleproduct(this.item1.itemname);
      this.item1.available = this.item1.qty_oh;

      if (this.threedsetting == "1") {
        var profile1 = JSON.parse(this.item1.profile1);

        if (profile1[1] != "") {
          this.show3D = true;
          this.prodId3d = profile1[1];
          if (profile1[0] != undefined && profile1[0] != null && profile1[0] != '') {
            Common.setWithExpiry('baseitem', profile1[0]);
          }
          Common.setWithExpiry("id", profile1[1]);
          var getpid = Common.getWithExpiry("pid");
          if (getpid != undefined && getpid != null && getpid != '') {
            //Common.setWithExpiry("pid", getpid);
            //Common.removeWithExpiry("pid");
            Common.setWithExpiry("pid", profile1[3]);
          }
          else {
            Common.setWithExpiry("pid", profile1[3]);
          }
          Common.setWithExpiry("cid", this.isLoggedIn.toString());
          this.loadScript();
        }
        else {
          this.show3D = false;
        }
      }
      else {
        this.show3D = false;

      }

      this.GetitemProfileDetails(this.item1.itemname);
      var units = JSON.parse(this.item1.um);

      // try {
      //   var dept1 = [];
      //   try {
      //     dept1 = JSON.parse(this.item1.itemdesc);
      //   } catch (ex) {
      //     this.item1.itemdesc = this.item1.itemdesc.replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';');
      //     this.item1.itemdesc = this.item1.itemdesc.replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '')
      //       .replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '');
      //     dept1 = this.item1.itemdesc.replace('[', '').replace(']', '').split(';');
      //   }
      //   var des1 = '';
      //   var des2 = [];
      //   for (let newdesrc of dept1) {
      //     newdesrc = newdesrc.trim();
      //     if (newdesrc != '') {
      //       des1 = des1 + newdesrc;
      //       des2.push(newdesrc);
      //     }
      //   }
      //   this.item1.itemdesc = des2;
      //   this.item1.descr = des1;
      // } catch (ex) { }
      this.setSeodetails();
      if (this.webtype == '5' || this.webtype == '6') {
        var sa_group_label = JSON.parse(this.item1.sa_group_label);
        var sa_group_label1 = [];
        this.isfeature = false;
        for (var i = 0; i < sa_group_label.length; i++) {
          if (sa_group_label[i] != '') {
            this.isfeature = true;
            if (i == 0 && this.item1.sa_group_1 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_1 });
            }
            else if (i == 1 && this.item1.sa_group_2 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_2 });
            }
            else if (i == 2 && this.item1.sa_group_3 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_3 });
            }
            else if (i == 3 && this.item1.sa_group_4 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_4 });
            }
            else if (i == 4 && this.item1.sa_group_5 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_5 });
            }
            else if (i == 5 && this.item1.sa_group_6 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_6 });
            }
            else if (i == 6 && this.item1.sa_group_7 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_7 });
            }
            else if (i == 7 && this.item1.sa_group_8 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_8 });
            }
            else if (i == 8 && this.item1.sa_group_9 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_9 });
            }
            else if (i == 9 && this.item1.sa_group_10 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_10 });
            }
            else if (i == 10 && this.item1.sa_group_11 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_11 });
            }
            else if (i == 11 && this.item1.sa_group_12 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_12 });
            }
            else if (i == 12 && this.item1.sa_group_13 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_13 });
            }
            else if (i == 13 && this.item1.sa_group_14 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_14 });
            }
            else if (i == 14 && this.item1.sa_group_15 != '') {
              sa_group_label1.push({ lbl: sa_group_label[i], txt: this.item1.sa_group_15 });
            }
          }
        }
      }
      if (sa_group_label1 != undefined && sa_group_label1.length > 0) {
        for (var i = 0; i < sa_group_label1.length; i++) {
          for (var j = 0; j < this.salablelist.length; j++) {
            if (sa_group_label1[i].lbl == this.salablelist[j].salablecode) {
              sa_group_label1[i].lbl = this.salablelist[j].salabledescr;
            }
          }
        }
      }
      this.item1.sa_group_label = sa_group_label1;
      var index = 0;
      for (var i = 0; i < units.length; i++) {
        units[i] = units[i].trim();
        var existingUnit = units[i].replace('"', '').replace('"', '');
        var un = 'each';
        if (existingUnit.toLowerCase() == "ea" || existingUnit.toLowerCase() == "each") {
          index = i;
          break;
        }
      }
      this.galleryOptions = [
        {
          width: '100%',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
        },
        {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
        },
        {
          breakpoint: 400,
          preview: false
        }
      ];
      //this.galleryImages = [];
      var units = JSON.parse(this.item1.um);

      var umArr = JSON.parse(this.item1.umqty);
      var getallows = [];
      if (this.item1.web_um_alws == undefined || this.item1.web_um_alws == null) {
        getallows = JSON.parse("[true,true,true,true,true]");
      }
      else {
        getallows = JSON.parse(this.item1.web_um_alws);
      }
      var umList = [];
      var getindex = 0;
      var umList1 = [];
      var gethr = 0;
      if (this.ismultipleum == '1') {
        for (var i = 0; i < units.length; i++) {
          if (i == 0 && units[i] != '') {
            this.item1.firstum = units[i];
            this.item1.firstumqty = (umArr[i - 1] == undefined ? 1 : umArr[i - 1]);
          }
          if (i == 0 && units[i] != '' && getallows[i] == true) {

            if (units[i] == this.item1.um_display) {
              getindex = 0;
            }

            umList1.push(units[i]);
            umList.push({ lables: this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (1)' : ''), qty: 1, umdisplay: units[i], lvalue: units[i] + ' (1)' });
            units[i] = units[i] + ' (1)';
            //umList.push(units[i]);
            gethr = gethr + 1;
            this.item1.um_displayQty = 1;
          }
          else if (units[i] != '' && getallows[i] == true) {
            if (units[i] == this.item1.um_display) {
              getindex = gethr;
              this.item1.um_displayQty = umArr[i - 1];
            }
            gethr = gethr + 1;
            umList1.push(units[i]);
            umList.push({ lables: this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (' + umArr[i - 1] + ')' : ''), qty: umArr[i - 1], umdisplay: units[i], lvalue: units[i] + ' (' + umArr[i - 1] + ')' });
            units[i] = units[i] + ' (' + umArr[i - 1] + ')';
            //umList.push(units[i]);
          }
        }
      }
      else {
        for (var i = 0; i < units.length; i++) {
          if (i == 0 && units[i] != '') {
            this.item1.firstum = units[i];
            this.item1.firstumqty = (umArr[i - 1] == undefined ? 1 : umArr[i - 1]);
          }
          if (units[i] != '' && units[i] == this.item1.um_display) {
            if (i == 0) {
              umList1.push(units[i]);
              umList.push({ lables: this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (1)' : ''), qty: 1, umdisplay: units[i], lvalue: units[i] + ' (1)' });
              units[i] = units[i] + ' (1)';
              //umList.push(units[i]);
              this.item1.um_displayQty = 1;
            }
            else {
              umList1.push(units[i]);
              umList.push({ lables: this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (' + umArr[i - 1] + ')' : ''), qty: umArr[i - 1], umdisplay: units[i], lvalue: units[i] + ' (' + umArr[i - 1] + ')' });
              units[i] = units[i] + ' (' + umArr[i - 1] + ')';
              //umList.push(units[i]);
              this.item1.um_displayQty = umArr[i - 1];
            }
          }
        }
      }

      this.item1.unitMeasure = umList[getindex].lvalue;

      this.item1.unitList = umList;
      this.objUnitArr = umList1;

      this.item = this.item1;

      this.item.profilelabel = "";
      if (this.ProfileNo == '1') {
        var getprofile = JSON.parse(this.item.profile1);
        this.item.profilelabel = getprofile[this.ProfileIndex - 1];
      }
      else if (this.ProfileNo == '2') {
        var getprofile = JSON.parse(this.item.profile2);
        this.item.profilelabel = getprofile[this.ProfileIndex - 1];
      }
      else if (this.ProfileNo == '3') {
        var getprofile = JSON.parse(this.item.profile3);
        this.item.profilelabel = getprofile[this.ProfileIndex - 1];
      }
      for (var i = 0; i < this.item.unitList.length; i++) {
        var u = this.item.unitList[i].umdisplay.split(' ');
        if (u[0] == this.item.umdisplay) {
          this.item.unitMeasure = this.item.unitList[i].lvalue;
          break;
        }
      }
      if (this.item1.qty_warn != undefined && this.item1.qty_warn != "0" && this.Multiply == '1') {
        this.item1.quantity = this.item1.qty_warn / this.item1.um_displayQty;
      }
      var geturl = Common.getWithExpiry("cpname");
      geturl = this.item1.itemname + ' - ' + (this.DescrToShow == '1' ? this.item1.descrstring : this.item1.freeform) + ' - ' + geturl;

      this.getProductImage(this.item1);
      this.GetIsshowpricebreak(this.item1);
      this.getProductPrice();
      this.getproductavaibility();
      this.Getitemdetailspagebyitem();
      //this.getpriceforproductmulti();

      // }, (error: HttpErrorResponse) => {
      //   this.router.navigateByUrl('404', { skipLocationChange: true })
    });
  }


  setimageindex(index) {
    index = index - 1;
    this.galleryOptions = [
      {
        width: '100%',
        height: '350px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        startIndex: index
      },
      // max-width 800
      {
        breakpoint: 500,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }
  getpricebreaks(uname, items) {
    if (items != undefined && items != null) {
      this.dataService.getPriceBreaks(uname, items.itemname).subscribe((res: any) => {
        var getdatta = res;
        if (getdatta != null && getdatta != undefined && getdatta.length > 0) {
          items.Pricebreaks = [];
          items.Pricebreaks = getdatta;
          for (var i = 0; i < items.Pricebreaks.length; i++) {
            items.Pricebreaks[i].label = null;

            if (items.Pricebreaks[i].label == '' || items.Pricebreaks[i].label == undefined || items.Pricebreaks[i].label == null) {
              items.Pricebreaks[i].label = items.Pricebreaks[i].from + (items.Pricebreaks[i].to == '0' ? ' or ' : ' To ') + (items.Pricebreaks[i].to == '0' ? 'Above' : items.Pricebreaks[i].to);
            }
          }
        }

      });
    }
  }

  GetitemProfileDetails(items) {
    this.profileinfo = [];
    this.dataService.GetitemProfileDetails(items).subscribe((res: any) => {
      this.profileinfo = res;
      if(this.profileinfo!=undefined && this.profileinfo!=null && this.profileinfo.length>0 && (this.item1.sa_group_label==undefined || this.item1.sa_group_label==null || this.item1.sa_group_label.length==0)){
        this.activetabord(2);
      }
    });
  }
  getwishconfig() {
    this.iswishshow = this.dataService.Getconfigbykey("iswishlist");
    if (this.iswishshow == null || this.iswishshow == undefined || this.iswishshow == '') {
      this.iswishshow = Common.getWithExpiry("this.iswishshow");
    }
    if (this.iswishshow == null || this.iswishshow == undefined || this.iswishshow == '') {
      this.dataService.Getwishlistfeatureonoff().subscribe((res: any) => {
        this.iswishshow = res;
        Common.setWithExpiry("this.iswishshow", this.iswishshow);
      });
    }
  }
  getrfqconfig() {
    this.isrfqshow = this.dataService.Getconfigbykey("isrfqlist");
    if (this.isrfqshow == null || this.isrfqshow == undefined || this.isrfqshow == '') {
      this.isrfqshow = Common.getWithExpiry("isrfqshow");
    }
    if (this.isrfqshow == null || this.isrfqshow == undefined || this.isrfqshow == '') {
      this.dataService.Getrfqlistfeatureonoff().subscribe((res: any) => {
        this.isrfqshow = res;
        Common.setWithExpiry("isrfqshow", this.isrfqshow);
      });
    }
  }

  getProductPrice() {
    var bulkPrice = [];

    if (this.isLoggedIn == true && this.withloginprice == '1' && this.withloginpricelist != '1') {
      try {
        if (this.ListPriceShow == '1') {
          var umos = JSON.parse(this.item.um);
          bulkPrice.push({
            "customer": Common.getWithExpiry("CustID"),
            "item": this.item.itemname,
            "quantity": 1,
            "warehouse": Common.getWithExpiry("warehouse"),
            "rounding": this.PriceRound,
            "qty_unit": (umos[0]),
            "company_sy": Common.getWithExpiry("company_sy")
          })
        }
        else {
          for (let img of this.objUnitArr) {
            bulkPrice.push({
              "customer": Common.getWithExpiry("CustID"),
              "item": this.item.itemname,
              "qty_unit": img.trim(),
              "quantity": 1,
              "warehouse": this.warehouse,
              "rounding": this.PriceRound,
              "company_sy": Common.getWithExpiry("company_sy")
            })
          }
        }
      } catch (ed) { }


    }
    else if (this.isLoggedIn == false && this.priceshow == '1' && this.listprice != '1') {
      try {
        if (this.ListPriceShow == '1') {
          var umos = JSON.parse(this.item.um);
          bulkPrice.push({
            "customer": Common.getWithExpiry("CustID"),
            "item": this.item.itemname,
            "quantity": 1,
            "warehouse": Common.getWithExpiry("warehouse"),
            "rounding": this.PriceRound,
            "qty_unit": (umos[0]),
            "company_sy": Common.getWithExpiry("company_sy")
          })
        }
        else {
          for (let img of this.objUnitArr) {
            try {
              bulkPrice.push({
                "customer": this.GuestUserID,
                "item": this.item.itemname,
                "qty_unit": img.trim(),
                "quantity": 1,
                "warehouse": this.Guestwarehouse,
                "rounding": this.PriceRound,
                "company_sy": Common.getWithExpiry("company_sy")
              })
            } catch (ed) { }
          }
        }
      } catch (ed) { }


    }


    if (bulkPrice != null && bulkPrice != undefined && bulkPrice.length > 0) {

      this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
        var data = res;
        if (data != null && data != undefined) {
          this.objPriceArr = data;

          var profilefor = null
          if (this.AddToCartAsPerProfileNo == '1' && this.item1.profile1 != undefined) {
            var profilefor = JSON.parse(this.item1.profile1);
          }
          else if (this.AddToCartAsPerProfileNo == '2' && this.item1.profile2 != undefined) {
            var profilefor = JSON.parse(this.item1.profile2);
          }
          else if (this.AddToCartAsPerProfileNo == '3' && this.item1.profile3 != undefined) {
            var profilefor = JSON.parse(this.item1.profile3);
          }

          if ((this.configforcartbyprofile == '1' && profilefor != undefined && profilefor != null && profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1].toUpperCase() == 'NO') && ((data[0].origin != 'CI'))) {
            this.Addtocart = false;
            if (this.PriceOrLable == '2') {
              this.item1.list_price = 0;
              this.item.list_price = 0;
              for (var l = 0; l < this.objPriceArr.length; l++) {
                this.objPriceArr[l].price = 0;
                // if(this.iskrayden && this.objPriceArr[l].origin != 'CI' && this.objPriceArr[l].origin != 'SP'){
                //   this.objPriceArr[l].extension=this.item.list_price;
                //   this.objPriceArr[l].price=this.item.list_price;
                // }
              }
            }
          }
          
          this.item1.umarray = JSON.parse(this.item1.um);
          var getumlist = JSON.parse(this.item1.um);
          var getumqtylist = JSON.parse(this.item1.umqty);
          for (var i = 0; i < this.objPriceArr.length; i++) {
            if(this.iskrayden && this.objPriceArr[i].origin != 'CI' && this.objPriceArr[i].origin != 'SP'){
              this.objPriceArr[i].extension=this.item.list_price;
              this.objPriceArr[i].price=this.item.list_price;
            }
            if (this.item1.Pricebreaks != undefined && this.item1.Pricebreaks.length > 0) {
              for (var l = 0; l < this.item1.Pricebreaks.length; l++) {
                if (this.item1.Pricebreaks[l].break_unit == this.objPriceArr[i].qty_unit) {
                  this.item1.Pricebreaks[l].par = ((this.objPriceArr[i].extension - this.item1.Pricebreaks[l].amount) / this.objPriceArr[i].extension) * 100;

                }
              }
            }
            for (var l = 0; l < getumlist.length; l++) {
              if (l == 0 && getumlist[l] == this.objPriceArr[i].qty_unit) {
                this.objPriceArr[i].qunits = 1;
              }
              else if (getumlist[l] == this.objPriceArr[i].qty_unit) {
                this.objPriceArr[i].qunits = getumqtylist[l - 1];
              }
            }
            if (this.ListPriceShow == '1') {
              if (this.objPriceArr[i].qty_unit == getumlist[0]) {
                this.item1.ListPriceShow = this.objPriceArr[i].extension;
              }
            }

            if (this.isumdescr == '1' && this.umdescrlist != null && this.umdescrlist != undefined && this.umdescrlist.length > 0) {

              for (var g = 0; g < this.umdescrlist.length; g++) {
                if (this.objPriceArr[i].qty_unit.toLowerCase() == this.umdescrlist[g].code.toLowerCase()) {
                  this.objPriceArr[i].descr = this.umdescrlist[g].descr;
                }
              }
            }

            this.origin = data[0].origin;
            if (this.objPriceArr[i].qty_unit.toLowerCase() != 'each' && this.objPriceArr[i].qty_unit.toLowerCase() != 'ea') {
              var qty = 0;
              for (var j = 0; j < this.objQtyArr.length; j++) {
                if (i == j) {
                  qty = this.objQtyArr[j];
                  break;
                }
              }
              this.objPriceArr[i].perUnitPrice = "($" + this.objPriceArr[i].extension + " EACH)";
            }
            else {
              this.prodPrice.extension = this.objPriceArr[i].extension;
              this.prodPrice.qty_unit = this.objPriceArr[i].qty_unit;
              this.prodPrice.perUnitPrice = "";
            }
          }
          //   var getnewarray=[];
          // for (let prObj of this.objPriceArr) {
          //   if (prObj.unit.toLowerCase() != 'each') {
          //   }
          //   if (this.ismultipleum=='0' && prObj.qty_unit.toLowerCase() == this.item1.um_display.toLowerCase()) {
          //     getnewarray.push(prObj);
          //   }
          // }
          // this.objPriceArr=getnewarray;
        }
      })
    }
  }

  checkforduplicat(item) {
    var flag = true;
    if(this.galleryImages!=undefined && this.galleryImages!=null && this.galleryImages.length>0){
    for (let imgObj of this.galleryImages) {

      if (imgObj.small === item) {
        flag = false;
        break;
      }
    }
  }
    return flag;
  }


  GetItemNotesimg(item, seq) {
    this.dataService.GetItemNotesimg(item, seq).subscribe((res: any) => {
      var data = res;
      if (data != undefined && data != null && data.image != undefined) {
        var getimah = "data:" + data.encoding + "," + data.image;
        if (this.checkforduplicat(getimah)) {
          this.sysimage.push(getimah);

          this.galleryImages.push({
            small: getimah,
            medium: getimah,
            big: getimah
          })
        }
        try {
          //this.ngxGalleryComponent.images =arraySort(this.galleryImages, ['small']); ;
          this.ngxGalleryComponent.openPreview(0);
          this.ngxGalleryComponent.onPreviewClose();
        } catch (ex) { }
      }
    })
  }
  GetItemNotesimgforthumb(itemobj, item, seq) {
    this.dataService.GetItemNotesimg(item, seq).subscribe((res: any) => {
      var data = res;
      if (data != undefined && data != null && data.image != '') {
        var getimah = "data:" + data.encoding + "," + data.image;

        this.sysimage.push(getimah);
        this.galleryImages.push({
          small: getimah,
          medium: getimah,
          big: getimah
        })
      }
      try {
        this.ngxGalleryComponent.images = this.galleryImages;
        this.ngxGalleryComponent.openPreview(0);
        this.ngxGalleryComponent.onPreviewClose();
      } catch (ex) { }
    })
  }

  printother(order, type) {
    try {
      this.dataService.GetPdfForItemNotes(order, type).subscribe((res: any) => {
        var data = res;
        if (data == 'NotFound') {
          //this.toastr.error("Document Not Found.", 'Message!');
          var dlnk = document.getElementById(type);
          dlnk.setAttribute("style", "display:none");
        }
        else {
          try {
            var dlnk = document.getElementById(type);
            dlnk.setAttribute("download", type);
            dlnk.setAttribute("href", data);
          } catch (ed) { }
        }
      });
    } catch (ed) {
      var dlnk = document.getElementById(type);
      dlnk.setAttribute("style", "display:none");
      //this.toastr.error("Document Not Found.", 'Message!');

    }
  }





  GetItemNotes(item) {
    this.dataService.GetItemNotes(item).subscribe((res: any) => {
      var data = res;
      if (data != null && data != undefined && data != '' && data.length > 0) {
        var im1 = 1;
        this.sysnote = []
        for (var i = 0; i < data.length; i++) {
          if (data[i].note != '' && data[i].note != 'undefined' && data[i].note != undefined) {
            var geturl = window.location.href.toString();
            geturl = geturl.replace(this.router.url, '');

            do {
              data[i].note = data[i].note.replace('{{baseurl}}', geturl);
            } while (data[i].note.toString().indexOf('{{baseurl}}') != -1)
            if (data[i].note.indexOf('.pdf') > -1 && data[i].tech_doc_type != '') {
              //var docname = data[i].note.split('/');
              if (this.pdfbuttonshow == '1') {
                var docname = data[i].table_key + i + data[i].tech_doc_type.replace(' ', '') + '.pdf';
                this.printother(data[i].note, docname);
                this.sysnote.push("<div style='text-align:center'><a id='" + docname + "' target='_blank' class='btn btn-upper btn-primary outer-right-xs mr20 cpointer'><strong>" + data[i].tech_doc_type + "</strong></a></div>");
              }
            }
            else if (data[i].note.indexOf('iframe') > -1) {
              this.sysnote.push("<div style='text-align:center'>" + data[i].note + "</div>");
            }
            else {
              this.sysnote.push(data[i].note);
            }

          }
          if (data[i].note_image != '' && (this.showColorPellet == '1' ? data[i].note_seq != 8 : data[i].note_seq == data[i].note_seq)) {

            this.GetItemNotesimg(data[i].table_key, data[i].note_seq);
          }
          im1 = im1 + 1;

        }
      }

    })
  }

  getimageforthumbimage(item) {
    this.dataService.GetItemNotes(item.itemname).subscribe((res: any) => {
      var data = res;
      if (data != null && data != undefined && data != '' && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].note_image != '' && (this.showColorPellet == '1' ? data[i].note_seq != 8 : data[i].note_seq == data[i].note_seq)) {
            this.GetItemNotesimgforthumb(item, data[i].table_key, data[i].note_seq);
          }
        }
      }
    })
  }


  GetItemNotesforchild(item) {
    this.dataService.GetItemNotes(item).subscribe((res: any) => {
      var data = res;
      if (data != null && data != undefined && data != '' && data.length > 0) {
        var im1 = 1;
        this.sysnote = []
        for (var i = 0; i < data.length; i++) {
          if (data[i].note != '' && data[i].note != 'undefined' && data[i].note != undefined) {
            var geturl = window.location.href.toString();
            geturl = geturl.replace(this.router.url, '');

            do {
              data[i].note = data[i].note.replace('{{baseurl}}', geturl);
            } while (data[i].note.toString().indexOf('{{baseurl}}') != -1)
            if (data[i].note.indexOf('.pdf') > -1 && data[i].tech_doc_type != '') {
              //var docname = data[i].note.split('/');
              if (this.pdfbuttonshow == '1') {
                var docname = data[i].table_key + i + data[i].tech_doc_type.replace(' ', '') + '.pdf';
                this.printother(data[i].note, docname);
                this.sysnote.push("<div style='text-align:center'><a id='" + docname + "' target='_blank' class='btn btn-upper btn-primary outer-right-xs mr20 cpointer'><strong>" + data[i].tech_doc_type + "</strong></a></div>");
              }
            }
            else if (data[i].note.indexOf('iframe') > -1) {
              this.sysnote.push("<div style='text-align:center'>" + data[i].note + "</div>");
            }
            else {
              this.sysnote.push(data[i].note);
            }

          }
          if (data[i].note_image != '') {

            //this.GetItemNotesimg(data[i].table_key, data[i].note_seq);
          }
          im1 = im1 + 1;

        }
      }

    })
  }

  logClick() {
    Common.setWithExpiry("url", this.item.itemname);
    Common.setWithExpiry("pid", this.SelectedPartNumber);
    this.router.navigate(['login']);
  }
  onbluereventq(item) {
    if (item.quantity > 0) {
      this.itemList.push(item);
    }
  }
  onKeydownq(event, item, i) {
    if (event.key === "Enter" && item.quantity > 0) {
      this.Addtocartq(item, i);
    }
  }
  Addtocartq(getitem, i) {
    try {
      if (getitem.quantity != undefined) {
        if (getitem.quantity > 0) {

          this.dataService.getProductDetailbyItemName(getitem.itemname, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
            var item1 = res;
            if (item1 != null) {
              item1.TotQty = 0;
              var units = item1.um.replace('[', '').replace(']', '').split(',')[0];
              getitem.units = units.replace('"', '').replace('"', '');
            }
            else {
              this.toastr.error(getitem.itemname + " is not available", 'Message!');
              i = i + 1;
              //$("#" + i).focus();
            }
          });
          var getitem12 = {
            items: getitem.itemname,
            warehouse: this.warehouse,
            company_sy: Common.getWithExpiry("company_sy")
          }
          var usrid = null;
          if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
            usrid = Common.getWithExpiry("UserID") + Common.getWithExpiry("CustID");
          }
          else {
            usrid = Common.getWithExpiry("CustID");
          }
          this.cartService.getCartItemByUserID().subscribe((res: any) => {
            this.cartProducts = res;
            var getproduct = null;
            getitem.TotQty = 0;
            for (let cprod of this.cartProducts) {
              if (cprod.itemname == getitem.itemname) {
                getproduct = cprod;
                var getums = JSON.parse(getproduct.um);
                var getumsqty = JSON.parse(getproduct.umqty);
                for (var i = 0; i < getums.length; i++) {
                  if (i == 0 && getums[i] != '') {
                    getproduct.firstum = getums[i];
                    getproduct.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
                    if (getums[i] == getproduct.MeasureUnit) {
                      getitem.TotQty = getitem.TotQty + (getproduct.Quantity * 1);
                    }
                    if (getums[i] == getproduct.um_display) {
                      getproduct.um_displayQty = 1;
                      getproduct.Qty = (getproduct.Quantity * 1);
                    }
                  }
                  else if (i != 0 && getums[i] != '') {
                    if (getums[i] == getproduct.MeasureUnit) {
                      getitem.TotQty = getitem.TotQty + (getproduct.Quantity * getumsqty[i - 1]);
                    }
                    if (getums[i] == getproduct.um_display) {
                      getproduct.Qty = (getproduct.Quantity * getumsqty[i - 1]);
                      getproduct.um_displayQty = getumsqty[i - 1];
                    }
                  }
                }
              }
            }

            this.dataService.getProductavailibity(getitem12).subscribe((res: any) => {
              var availdata = res;
              var bulkPrice = [];
              var qty = parseFloat(getitem.quantity) + (getproduct == null ? 0 : parseFloat(getproduct.Quantity));
              bulkPrice.push({
                "customer": Common.getWithExpiry("CustID"),
                "item": getitem.itemname,
                "qty_unit": getitem.um_display,
                "quantity": qty,
                "warehouse": this.warehouse,
                "rounding": this.PriceRound,
                "company_sy": Common.getWithExpiry("company_sy")
              })
              if (getproduct == undefined || getproduct == null) {
                getproduct = getitem;
                var getums = JSON.parse(getproduct.um);
                var getumsqty = JSON.parse(getproduct.umqty);
                for (var i = 0; i < getums.length; i++) {
                  if (i == 0 && getums[i] != '') {
                    getproduct.firstum = getums[i];
                    getproduct.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
                    if (i == 0 && getums[i] == getproduct.MeasureUnit) {
                      getitem.TotQty = getitem.TotQty + (getproduct.Quantity * 1);
                    }
                    if (getums[i] == getproduct.um_display) {
                      getproduct.Qty = (getproduct.Quantity * 1);
                      getproduct.um_displayQty = 1;
                    }
                  }
                  else if (i != 0 && getums[i] != '') {
                    if (getums[i] == getproduct.um_display) {
                      getproduct.Qty = (getproduct.Quantity * getumsqty[i - 1]);
                      getproduct.um_displayQty = getumsqty[i - 1];
                    }
                    if (getums[i] == getproduct.MeasureUnit) {
                      getitem.TotQty = getitem.TotQty + (getproduct.Quantity * getumsqty[i - 1]);

                    }

                  }
                }
              }
              this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
                var data = res;
                if(this.iskrayden && data[0].origin != 'CI' && data[0].origin != 'SP'){
                  
                  getitem.list_price = getitem.list_price;
                }
                else{
          

                getitem.list_price = parseFloat(data[0].extension) / parseFloat(bulkPrice[0].quantity);
                }
                getitem.itemname = getitem.itemname;
                var usrid = null;



                if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
                  usrid = Common.getWithExpiry("UserID");
                }
                else {
                  usrid = Common.getWithExpiry("CustID");
                }
                if (availdata[0].available == 0 && this.addtonotavail == 0 && getitem.TotQty > (parseFloat((this.addnewqtywithnewlogic == '1' ? this.item1.availablenew : this.item1.available)))) {
                  this.toastr.info(getitem.quantity + " " + this.getumdescbyumcode(getitem.units.trim().replace('"', '').replace('"', '')) + " of item " + getitem.itemname + " is not available", 'Message!');
                  return;
                }
                if (this.AddZero == 0 && (getitem.list_price == 0 || getitem.list_price == undefined)) {
                  this.toastr.error("Please Call For Pricing.", 'Add To Cart Disabled!');
                  return;
                }
                var isVal = false;
                var um = getitem.um_display + ' (' + getitem.u_qty + ')';
                var getum = um.split(' ')[1].replace('(', '').replace(')', '').trim();
                getitem.TotQty = getitem.TotQty + (getitem.quantity * parseFloat(getitem.u_qty));
                if (getitem.min != undefined && getitem.min != "0" && getitem.TotQty < getitem.min && this.MinQty) {
                  this.toastr.error("Minimum quantity should be " + this.item.min + 'of ' + this.getumdescbyumcode(getitem.units.trim()));
                  isVal = true;
                }

                if (getitem.max != undefined && getitem.max != "0" && getitem.TotQty > getitem.max && this.MaxQty) {
                  this.toastr.error("Maximum quantity should be " + getitem.max + 'of ' + this.getumdescbyumcode(getitem.units.trim()));
                  isVal = true;
                }

                if (getitem.qty_warn != undefined && getitem.qty_warn != "0" && this.Multiply == '1') {
                  if ((getitem.quantity * parseFloat(getitem.u_qty)) % getitem.qty_warn != 0) {
                    this.toastr.error("Please enter item in multiple of " + getitem.qty_warn / getitem.u_qty + ' of ' + this.getumdescbyumcode(getitem.units.trim()));
                    isVal = true;
                  }
                }

                if (isVal) {
                  return;
                }
                this.cartService.addProductToCart(getitem, getitem.um_display).subscribe((res: any) => {
                  this.cartService.cartBroadCaster(res);

                })
                this.toastr.success(getitem.quantity + " " + this.getumdescbyumcode(getitem.units.trim().replace('"', '').replace('"', '')) + " of item " + getitem.itemname + " has been added to your cart.", 'Success!');
              })
              i = i + 1;
              //$("#" + i).focus();
            });
          });
        }
        else {
          this.toastr.error("Invalid Quantity", 'Message!');
          //$("#" + i).focus();
        }
      }
    } catch (exception) {
      this.toastr.error("Cannot be added to cart", 'Product not available!');
      i = i + 1;
      //$("#" + i).focus();
    }
  }
  addToCartMultipleq() {
    for (var i = 0; i < this.childproducts.length; i++) {
      if (this.childproducts[i].quantity != undefined && this.childproducts[i].quantity != null && this.childproducts[i].quantity > 0) {
        this.Addtocartq(this.childproducts[i], i);
      }
      else {
        if (this.childproducts[i].quantity != undefined && this.childproducts[i].quantity < 0) {
          this.toastr.error("Invalid Quantity", 'Message!');
        }
      }
    }
    this.itemList = [];
    //$(".text-input").val('');
  }
  closewishbox() {
    this.iswish = false;
    //$('body').removeClass('popup-open');
  }
  closerfqbox() {
    this.isrfq = false;
    //$('body').removeClass('popup-open');
  }
  createnewlist() {
    if (this.fllagtochild == true) {
      this.currentitem.itemname = this.currentitem.itemname + '~' + this.SelectedPartNumber;
    }
    if (this.currentitem != undefined && this.currentitem != null) {
      this.router.navigate(['/wishlist', this.currentitem.itemname.toLowerCase()]);
      //$('body').removeClass('popup-open');
    }
    else if (this.childproducts != undefined && this.childproducts != null && this.childproducts.length > 0) {
      this.router.navigate(['/wishlist', this.childproducts[0].itemname.toLowerCase()]);
      //$('body').removeClass('popup-open');
    }
  }
  createnewrfqlist() {
    if (this.fllagtochild == true) {
      this.currentitem.itemname = this.currentitem.itemname + '~' + this.SelectedPartNumber;
    }
    if (this.currentitem != undefined && this.currentitem != null) {
      this.router.navigate(['/rfqlist', this.currentitem.itemname.toLowerCase(), '']);
      //$('body').removeClass('popup-open');
    }
    else if (this.childproducts != undefined && this.childproducts != null && this.childproducts.length > 0) {
      this.router.navigate(['/rfqlist', this.childproducts[0].itemname.toLowerCase(), '']);
      //$('body').removeClass('popup-open');
    }
  }
  Setitemname(product) {
    // alert('hello');

    Common.setWithExpiry("itemname", product.itemname);
  }

  AddtowishList(WishlistID) {
    if (this.currentitem != undefined && this.currentitem != null) {
      if (this.fllagtochild == true) {
        this.currentitem.itemname = this.currentitem.itemname + '~' + this.SelectedPartNumber;
      }
      this.currentitem.quantity = 1;
      if (this.currentitem.qty_warn != 0 && this.Multiply == '1') {
        this.currentitem.quantity = this.currentitem.qty_warn / this.currentitem.um_displayQty;
        this.toastr.error("item will be added in multiple of " + this.currentitem.quantity + ' of ' + this.getumdescbyumcode(this.currentitem.um_display));
      }
      if (this.currentitem.min != undefined && this.currentitem.min != "0" && this.currentitem.quantity < this.currentitem.min && this.MinQty) {
        this.currentitem.quantity = this.currentitem.min;
        this.toastr.error("Minimum quantity should be " + this.currentitem.min + ' of ' + this.getumdescbyumcode(this.currentitem.um_display));
        //return;
      }

      if (this.currentitem.max != undefined && this.currentitem.max != "0" && this.currentitem.quantity > this.currentitem.max && this.MaxQty) {
        this.toastr.error("Maximum quantity should be " + this.currentitem.max + ' of ' + this.getumdescbyumcode(this.currentitem.um_display));
        return;
      }
      this.dataService.AddProducttowishlist(null, WishlistID, this.currentitem.itemname, this.currentitem.quantity).subscribe((res: any) => {
        var results = res;
        if (results) {
          this.currentitem = undefined;
          this.toastr.success("Product Added to " + this.wishlistlable, 'Message!');
        }
        else {
          this.currentitem = undefined;
          this.toastr.error("Product Already Exist", 'Message!');
        }
      });
    }
    if (this.childproducts != undefined && this.childproducts != null && this.childproducts.length > 0) {
      for (var i = 0; i < this.childproducts.length; i++) {
        if (this.childproducts[i].quantity > 0) {
          this.dataService.AddProducttowishlist(null, WishlistID, this.childproducts[i].itemname, 2).subscribe((res: any) => {
            var results = res;
          });
        }
      }
      this.toastr.success("Products Added to your Wishlist", 'Message!');
      this.itemList = [];
    }
  }
  AddrfqList(WishlistID) {
    if (this.currentitem != undefined && this.currentitem != null) {
      if (this.fllagtochild == true) {
        this.currentitem.itemname = this.currentitem.itemname + '~' + this.SelectedPartNumber;
      }
      this.currentitem.quantity = 1;
      if (this.currentitem.qty_warn != 0 && this.Multiply == '1') {
        this.currentitem.quantity = this.currentitem.qty_warn / this.currentitem.um_displayQty;
        this.toastr.error("item will be added in multiple of " + this.currentitem.quantity + ' of ' + this.getumdescbyumcode(this.currentitem.um_display));
      }
      if (this.currentitem.min != undefined && this.currentitem.min != "0" && this.currentitem.quantity < this.currentitem.min && this.MinQty) {
        this.currentitem.quantity = this.currentitem.min;
        this.toastr.error("Minimum quantity should be " + this.currentitem.min + ' of ' + this.getumdescbyumcode(this.currentitem.um_display));
        //return;
      }

      if (this.currentitem.max != undefined && this.currentitem.max != "0" && this.currentitem.quantity > this.currentitem.max && this.MaxQty) {
        this.toastr.error("Maximum quantity should be " + this.currentitem.max + ' of ' + this.getumdescbyumcode(this.currentitem.um_display));
        return;
      }
      this.dataService.AddProducttowishlist(null, WishlistID, this.currentitem.itemname, this.currentitem.quantity).subscribe((res: any) => {
        var results = res;
        if (results) {
          this.currentitem = undefined;
          this.toastr.success("Product Added to your Rfqlist", 'Message!');
        }
        else {
          this.currentitem = undefined;
          this.toastr.error("Product Already Exist", 'Message!');
        }
      });
    }
    if (this.childproducts != undefined && this.childproducts != null && this.childproducts.length > 0) {
      for (var i = 0; i < this.childproducts.length; i++) {
        if (this.childproducts[i].quantity > 0) {
          this.dataService.AddProducttowishlist(null, WishlistID, this.childproducts[i].itemname, 2).subscribe((res: any) => {
            var results = res;
          });
        }
      }
      this.toastr.success("Products Added to your Rfqlist", 'Message!');
      this.itemList = [];
    }
  }
  Addtowishlistbulk() {
    this.iswish = true;
    this.currentitem == undefined
  }
  Addtorfqlistbulk() {
    this.isrfq = true;
    this.currentitem == undefined
  }
  AddtoList(product) {
    this.currentitem = product;
    this.iswish = true;
    //$('body').addClass('popup-open');
  }
  AddtorfqList(product) {
    this.currentitem = product;
    this.isrfq = true;
    //$('body').addClass('popup-open');
  }

  getwishlist() {
    this.dataService.GetUserwishlist(Common.getWithExpiry("CustID"), 1).subscribe((res: any) => {
      this.userwishlist = res;
    });
  }
  getRfqlist() {
    this.dataService.GetUserwishlist(Common.getWithExpiry("CustID"), 2).subscribe((res: any) => {
      this.userrfqlist = res;
    });
  }

  AddtowishListNew(WishlistID) {
    this.dataService.AddProducttowishlist(null, WishlistID, this.currentitem.itemname, 1).subscribe((res: any) => {
      var results = res;
      if (results) {
        this.toastr.success("Product Added to your Wishlist", 'Message!');
      }
      else {
        this.toastr.error("Product Already Exist", 'Message!');
      }
    });

  }
  AddtonewrfqListNew(WishlistID) {
    this.dataService.AddProducttowishlist(null, WishlistID, this.currentitem.itemname, 2).subscribe((res: any) => {
      var results = res;
      if (results) {
        this.toastr.success("Product Added to your rfqlist", 'Message!');
      }
      else {
        this.toastr.error("Product Already Exist", 'Message!');
      }
    });

  }

  getproductavaibility() {
    
    var getitem: any;
    if (this.isLoggedIn || this.annavail == '1') {
      if (this.isLoggedIn && this.withloginavailshow == '1' && this.withloginavaillist != 1) {
        var warehous = "";
        if (this.Multiplewarehouseforavaibility != undefined && this.Multiplewarehouseforavaibility != null && this.Multiplewarehouseforavaibility != '') {
          warehous = this.Multiplewarehouseforavaibility;
        }
        else {
          warehous = this.warehouse;
        }
        getitem = {
          items: this.item1.itemname,
          warehouse: warehous,
          company_sy: Common.getWithExpiry("company_sy")
        }
      }
      else if (!this.isLoggedIn && this.annavail == '1' && this.withoutloginavaillist != '1') {
        var warehous = "";
        if (this.Multiplewarehouseforavaibility != undefined && this.Multiplewarehouseforavaibility != null && this.Multiplewarehouseforavaibility != '') {
          warehous = this.Multiplewarehouseforavaibility;
        }
        else {
          warehous = this.Guestwarehouse;
        }
        getitem = {
          items: this.item1.itemname,
          warehouse: warehous,
          company_sy: Common.getWithExpiry("company_sy")
        }
      }
    }
    if (getitem != null && getitem != undefined) {
      this.dataService.getProductavailibity(getitem).subscribe((res: any) => {
        var data = res;
        this.item.productavails = data;
        this.item.warehouse = '';
        this.item.available = 0;
        for (var j = 0; j < this.item.productavails.length; j++) {
          this.item.warehouse = (this.item.warehouse != '' ? this.item.warehouse + ', ' + this.item.productavails[j].warehouse : this.item.productavails[j].warehouse);
          this.item.available = this.item.available + this.item.productavails[j].available;
        }
        if (data != undefined && data != null && data[0] != null && this.addnewqtywithnewlogic == '1') {
          this.item.availablenew = (data[0].available + data[0].on_po) - data[0].backorder;
          this.item1.availablenew = (data[0].available + data[0].on_po) - data[0].backorder;


        }
        if (data != undefined && data != null && data[0] != null && this.displaynewavails == '1') {
          this.item.availablenew1 = data[0].on_po - data[0].backorder;
          this.item1.availablenew1 = data[0].on_po - data[0].backorder;
        }
        if (data != undefined && data != null && data[0] != null && data[0].available > 0) {
          this.item.isavails = true;
          this.item1.isavails = true;
          this.item1.available1 = data[0].available;
          this.item.available1 = data[0].available;


        }
        else {
          this.item.isavails = false;
          this.item1.isavails = false;
          this.item1.available1 = 0;
          this.item.available1 = 0;
        }

      })
    }
  }

  getProductImage(pitem) {
    if (pitem != undefined && pitem != null) {
      if (pitem.image != null && pitem.image != '' && pitem.image != undefined && pitem.image != null) {

        if (this.checkforduplicat(pitem.image)) {
          
          this.sysimage.push(pitem.image);

          if(this.galleryImages==undefined || this.galleryImages==null || this.galleryImages.length==0){
            this.galleryImages=[];
          }

          this.galleryImages.push({
            small: pitem.image,
            medium: pitem.image,
            big: pitem.image
          })
        }
        try {
          this.ngxGalleryComponent.images = this.galleryImages;
          this.ngxGalleryComponent.openPreview(0);
          this.ngxGalleryComponent.onPreviewClose();
        } catch (ex) { }
      }
      else {
        var getimage = 'https://portal.distone.com/assets/images/Product.png';
        if (this.checkforduplicat(getimage)) {
          this.sysimage.push(getimage);

          this.galleryImages.push({
            small: getimage,
            medium: getimage,
            big: getimage
          })
        }
        try {
          this.ngxGalleryComponent.images = this.galleryImages;
          this.ngxGalleryComponent.openPreview(0);
          this.ngxGalleryComponent.onPreviewClose();
        } catch (ed) { }

        this.image1=this.galleryImages[0];
      }
    }
  }

  // ngAfterViewInit() {
  //   $.getScript('../assets/js/wow.min.js');
  //   $.getScript('../assets/js/scripts.js');
  // }

selectimage(image1){
  this.image1=image1;
}

  plusqty(item){
    if(item.quantity!=undefined && item.quantity>0){
      item.quantity=item.quantity+1;
    }
    else{
      item.quantity=1;
    }
  }
  minusqty(item){
    if(item.quantity!=undefined && item.quantity>0){
      item.quantity=item.quantity-1;
    }
    else{
      item.quantity=1;
    }
  }

  onAddToCart(newaproduct, um) {

    let product = Object.assign({}, newaproduct)
    var usrid = null;
    var subuserid = null;
    var cartid = null;
    if (this.isLoggedIn) {
      usrid = Common.getWithExpiry("CustID");
      cartid = Common.getWithExpiry("CustID");
      subuserid = Common.getWithExpiry("UserID");
    }
    else {
      usrid = this.GuestUserID;
      cartid = this.cartService.getSessionId();
      subuserid = cartid;
    }
    this.cartProducts = [];
    this.cartService.getCartItemByUserID().subscribe((res: any) => {
      this.cartProducts = res;
      if (this.childproducts != undefined && this.childproducts != null && this.childproducts.length > 0) {
        for (let prod of this.childproducts) {
          if (prod.itemname == this.itemselect) {
            product = prod;
          }
        }
      }
      // if (this.isLoggedIn == false) {
      //   Common.setWithExpiry("url", this.item.itemname);
      //   Common.setWithExpiry("pid", this.SelectedPartNumber);
      //   this.router.navigate(['login']);
      //   return;
      // }
      product.TotQty = 0;
      var getproduct = null;
      for (let cprod of this.cartProducts) {
        if (cprod.itemname == product.itemname) {
          getproduct = cprod;
          var getums = JSON.parse(getproduct.um);
          var getumsqty = JSON.parse(getproduct.umqty);
          for (var i = 0; i < getums.length; i++) {
            if (i == 0 && getums[i] != '') {
              getproduct.firstum = getums[i];
              getproduct.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
              if (getums[i] == getproduct.MeasureUnit) {
                product.TotQty = product.TotQty + (getproduct.Quantity * 1);
              }
              if (getums[i] == getproduct.um_display) {
                getproduct.um_displayQty = 1;
                getproduct.Qty = (getproduct.Quantity * 1);
              }
            }
            else if (i != 0 && getums[i] != '') {
              if (getums[i] == getproduct.MeasureUnit) {
                product.TotQty = product.TotQty + (getproduct.Quantity * getumsqty[i - 1]);

              }
              else if (getums[i] == getproduct.um_display) {
                getproduct.Qty = (getproduct.Quantity * getumsqty[i - 1]);
                getproduct.um_displayQty = getumsqty[i - 1];
              }
            }
          }
        }
      }
      var getunit = um.split(' ')[0];
      var bulkPrice = [];
      if (this.isLoggedIn == true && this.withloginprice == '1' && this.withloginpricelist != '1') {
        bulkPrice.push({
          "customer": usrid,
          "item": product.itemname,
          "qty_unit": getunit.trim(),
          "quantity": this.item.quantity,
          "warehouse": this.warehouse,
          "rounding": this.PriceRound,
          "company_sy": Common.getWithExpiry("company_sy")
        })
      }
      else if (this.isLoggedIn == false && this.priceshow == '1' && this.listprice != 1) {
        bulkPrice.push({
          "customer": this.GuestUserID,
          "item": product.itemname,
          "qty_unit": getunit.trim(),
          "quantity": this.item.quantity,
          "warehouse": this.Guestwarehouse,
          "rounding": this.PriceRound,
          "company_sy": Common.getWithExpiry("company_sy")
        })
      }
      if ((bulkPrice != null && bulkPrice != undefined && bulkPrice.length > 0) || (this.listprice == 1 || this.AddZero == 1)) {
        this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
          var data = res;

          var getprice = parseFloat(data[0].extension) / parseFloat(data[0].quantity);
          if(this.iskrayden && data[0].origin != 'CI' && data[0].origin != 'SP'){
            
            getprice = product.list_price;
          }
    

          if (getproduct == undefined || getproduct == null) {
            getproduct = product;
            var getums = JSON.parse(getproduct.um);
            var getumsqty = JSON.parse(getproduct.umqty);
            for (var i = 0; i < getums.length; i++) {
              if (i == 0 && getums[i] != '') {
                getproduct.firstum = getums[i];
                getproduct.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
                if (i == 0 && getums[i] == getproduct.MeasureUnit) {
                  getproduct.Qty = (getproduct.Quantity * 1);
                  product.TotQty = product.TotQty + (getproduct.Quantity * 1);
                }
                if (getums[i] == getproduct.um_display) {
                  getproduct.um_displayQty = 1;
                }
              }
              else if (i != 0 && getums[i] != '') {
                if (getums[i] == getproduct.um_display) {
                  getproduct.Qty = (getproduct.Quantity * getumsqty[i - 1]);
                  getproduct.um_displayQty = getumsqty[i - 1];
                }
                if (getums[i] == getproduct.MeasureUnit) {
                  product.TotQty = product.TotQty + (getproduct.Quantity * getumsqty[i - 1]);

                }
              }
            }
          }

          if (this.item.quantity == 0 || this.item.quantity < 0 || this.item.quantity == undefined || this.item.quantity == null) {
            this.toastr.error("Invalid Quantity ", 'Message!');
            return;
          }
          if (this.AddZero == 0 && (getprice == 0 || getprice == undefined)) {
            this.toastr.error("Please Call For Pricing.", 'Cannot be added to cart!');
            return;
          }

          if (this.addtonotavail == 0 && (this.addnewqtywithnewlogic == '1' ? this.item1.availablenew : this.item1.available) == 0 && (this.item.isavails == false || this.item.isavails == undefined) && this.item.drop_ship == false) {
            this.toastr.error("Product not available.", 'Cannot be added to cart!');
            return;
          }

          var isVal = false;
          product.quantity = this.item.quantity;
          var getum = um.split(' ')[1].replace('(', '').replace(')', '').trim();
          product.totqty = parseFloat(product.quantity) * parseFloat(getum);
          product.TotQty = product.TotQty + parseFloat(product.quantity) * parseFloat(getum);
          try {

            if (this.addtonotavail == 0 && product.TotQty > (parseFloat((this.addnewqtywithnewlogic == '1' ? this.item1.availablenew : this.item1.available))) && product.drop_ship == false) {
              this.toastr.error("you can not add quantity more than available quantity.");
              return;
            }
          } catch (ed) { }
          if (product.min != undefined && product.min != "0" && product.TotQty < product.min && this.MinQty) {
            this.toastr.error("Minimum quantity should be " + this.item.min + ' of ' + this.getumdescbyumcode(this.item1.firstum));
            isVal = true;
          }

          if (product.max != undefined && product.max != "0" && product.TotQty > product.max && this.MaxQty) {
            this.toastr.error("Maximum quantity should be " + product.max + ' of ' + this.getumdescbyumcode(this.item1.firstum));
            isVal = true;
          }

          product.totqty = parseFloat(product.quantity) * parseFloat(getum);

          if (product.qty_warn != undefined && product.qty_warn != "0" && this.Multiply == '1') {
            if ((product.quantity * parseFloat(getum)) % product.qty_warn != 0) {
              this.toastr.error("Please enter item in multiple of " + product.qty_warn / parseFloat(getum) + ' of ' + this.getumdescbyumcode(getunit));
              isVal = true;
            }
          }

          if (isVal) // It means quantity is not as per the
          {
            return;
          }


          //if (Common.getWithExpiry("CustID") != undefined && Common.getWithExpiry("CustID") != "") {
          // var usrid = null;
          // if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
          //   usrid = Common.getWithExpiry("UserID");
          // }
          // else {
          //   usrid = Common.getWithExpiry("CustID");
          // }
          product.list_price = getprice;
          um = um.split(' ')[0];
          this.cartService.addProductToCart(product, um).subscribe((res: any) => {
            this.cartService.cartBroadCaster(res);
            this.toastr.success(product.quantity + ' ' + this.getumdescbyumcode(um) + " of item " + product.itemname + " has been added to your cart.", 'Success!');
          })
          // }
          // else {
          //   Common.setWithExpiry("url", this.item.itemname);
          //   Common.setWithExpiry("pid", this.SelectedPartNumber);
          //   this.router.navigate(['login']);
          // }
        });
      }
    });
  }

  onKeyPress(e) {
    this.Onqtychange();
    if (!((e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode == 8)) {
      e.preventDefault();
      return false;
    }
    return undefined;
  }
  onAddToCartNew(product) {

    product.quantity = 1;
    product.TotQty = 0;
    if (this.isLoggedIn == false) {
      this.router.navigate(['login']);
      return;
    }
    var usrid = null;
    if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
      usrid = Common.getWithExpiry("UserID") + Common.getWithExpiry("CustID");
    }
    else {
      usrid = Common.getWithExpiry("CustID");
    }
    this.cartProducts = [];
    this.cartService.getCartItemByUserID().subscribe((res: any) => {
      this.cartProducts = res;

      var getproduct = null;
      product.TotQty = 0;
      for (let cprod of this.cartProducts) {
        if (cprod.itemname == product.itemname) {
          getproduct = cprod;
          var getums = JSON.parse(getproduct.um);
          var getumsqty = JSON.parse(getproduct.umqty);
          for (var i = 0; i < getums.length; i++) {
            if (i == 0 && getums[i] != '') {
              getproduct.firstum = getums[i];
              getproduct.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
              if (i == 0 && getums[i] == getproduct.MeasureUnit) {
                product.TotQty = product.TotQty + (getproduct.Quantity * 1);
              }
              if (getums[i] == getproduct.um_display) {
                getproduct.Qty = (getproduct.Quantity * 1);
                getproduct.um_displayQty = 1;
              }
            }
            else if (i != 0 && getums[i] != '') {
              if (getums[i] == getproduct.MeasureUnit) {
                product.TotQty = product.TotQty + (getproduct.Quantity * getumsqty[i - 1]);
              }
              if (getums[i] == getproduct.um_display) {
                getproduct.Qty = (getproduct.Quantity * getumsqty[i - 1]);
                getproduct.um_displayQty = getumsqty[i - 1];
              }
            }
          }
        }
      }
      var bulkPrice = [];
      if (this.isLoggedIn == true && this.withloginprice == '1' && this.withloginpricelist != '1') {
        var qty = parseFloat(product.quantity) + (getproduct == null ? 0 : parseFloat(getproduct.Quantity))
        bulkPrice.push({
          "customer": Common.getWithExpiry("CustID"),
          "item": product.itemname,
          "quantity": qty,
          "warehouse": Common.getWithExpiry("warehouse"),
          "rounding": this.PriceRound,
          "qty_unit": product.um_display,
          "company_sy": Common.getWithExpiry("company_sy")
        })
      }

      if (getproduct == undefined || getproduct == null) {
        getproduct = product;
        var getums = JSON.parse(getproduct.um);
        var getumsqty = JSON.parse(getproduct.umqty);
        for (var i = 0; i < getums.length; i++) {
          if (i == 0 && getums[i] != '') {
            getproduct.firstum = getums[i];
            getproduct.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
            if (getums[i] == getproduct.um_display) {
              getproduct.um_displayQty = 1;
              getproduct.Qty = (getproduct.Quantity * 1);
            }
            if (i == 0 && getums[i] == getproduct.MeasureUnit) {
              product.TotQty = product.TotQty + (getproduct.Quantity * 1);
            }
          }
          else if (i != 0 && getums[i] != '') {
            if (getums[i] == getproduct.um_display) {
              getproduct.Qty = (getproduct.Quantity * getumsqty[i - 1]);
              getproduct.um_displayQty = getumsqty[i - 1];
            }
            if (getums[i] == getproduct.MeasureUnit) {
              product.TotQty = product.TotQty + (getproduct.Quantity * getumsqty[i - 1]);
            }
          }
        }
      }


      if (bulkPrice != null && bulkPrice != undefined && bulkPrice.length > 0) {
        this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
          var data = res;
          var getprice = parseFloat(data[0].extension) / parseFloat(data[0].quantity);
          if ((this.AddZero == 0 && (product.list_price == 0 || product.list_price == undefined) && this.withloginpricelist == '1') || (this.AddZero == 0 && (product.price == 0 || product.price == undefined) && this.withloginpricelist != '1')) {
            this.toastr.error("Please Call For Pricing.", 'Cannot be added to cart!');
            return;
          }
          if (this.addtonotavail == 0 && (this.addnewqtywithnewlogic == '1' ? this.item1.availablenew : this.item1.available) == 0 && (product.isavails == false || product.isavails == undefined)) {
            this.toastr.error("Product not available.", 'Cannot be added to cart!');
            return;
          }
          if (Common.getWithExpiry("CustID") != undefined && Common.getWithExpiry("CustID") != "") {
            if (product.qty_warn != 0 && this.Multiply == '1') {
              product.quantity = product.qty_warn / product.um_displayQty;
              this.toastr.error("item will be addded in multiple of " + product.quantity + ' of ' + this.getumdescbyumcode(product.um_display));
            }
            else {
              product.quantity = 1;
            }
            product.TotQty = product.TotQty + (product.quantity * product.um_displayQty);
            if (product.min != undefined && product.min != "0" && product.TotQty < product.min && this.MinQty) {
              this.toastr.error("Minimum quantity should be " + product.min + ' of ' + this.getumdescbyumcode(getproduct.firstum));
              return;
            }

            if (product.max != undefined && product.max != "0" && product.TotQty > product.max && this.MaxQty) {
              this.toastr.error("Maximum quantity should be " + product.max + ' of ' + this.getumdescbyumcode(getproduct.firstum));
              return;
            }

            product.list_price = getprice;

            this.cartService.addProductToCart(product, product.um_display).subscribe((res: any) => {
              this.cartService.cartBroadCaster(res);
              this.toastr.success(product.quantity + " " + this.getumdescbyumcode(product.um_display) + " of item " + product.itemname + " has been added to your cart.", 'Success!');
            })
          }
        });
      }
    });

  }
  Getwarehousenamesetting() {
    this.warehousenamesetting = this.dataService.Getconfigbykey("warehousenamesetting");
    if (this.warehousenamesetting == null || this.warehousenamesetting == undefined || this.warehousenamesetting == '') {
      this.warehousenamesetting = Common.getWithExpiry("warehousenamesetting");
    }
    if (this.warehousenamesetting == null || this.warehousenamesetting == undefined || this.warehousenamesetting == '') {
      this.dataService.GetConfigforNewItem().subscribe((data: any) => {
        this.warehousenamesetting = data;
        Common.setWithExpiry("warehousenamesetting", this.warehousenamesetting);
        if (this.warehousenamesetting == '1') {
          this.Getwarehousenames();
        }
      });

    }
    else {
      if (this.warehousenamesetting == '1') {
        this.Getwarehousenames();
      }
    }
  }
  Getwarehousenames() {

    this.warehousenames = Common.getWithExpiry("warehousenames");

    if (this.warehousenames == null || this.warehousenames == undefined || this.warehousenames == '') {
      this.dataService.Getwarehousenames().subscribe((data: any) => {
        this.warehousenames = data;
        Common.setWithExpiry("warehousenames", this.warehousenames);
      });

    }
  }

  getwarehousenamebycode(wareh) {
    if (this.warehousenamesetting == '1') {
      for (var i = 0; i < this.warehousenames.length; i++) {
        if (this.warehousenames[i].code == wareh) {
          return this.warehousenames[i].descr;
        }
      }
    }
    else {
      return wareh;
    }
  }
  Onqtychange() {
    var ums = this.item.unitMeasure.split(' ')[0];
    if (this.Pricebreaks != null && this.Pricebreaks != undefined) {
      for (let prc of this.Pricebreaks) {
        if (prc.to == "0") {
          if (parseFloat(this.item.quantity) >= parseFloat(prc.from) && ums == prc.unit) {
            this.prodPrice.price = prc.amount;
          }
        }
        else {
          if (parseFloat(this.item.quantity) >= parseFloat(prc.from) && parseFloat(this.item.quantity) <= parseFloat(prc.to) && ums == prc.unit) {
            this.prodPrice.price = prc.amount;
          }
        }
      }
    }
  }


  onUnitChange(val) {
    var aa = val.split(' ');
    for (var i = 0; i < this.objPriceArr.length; i++) {
      if (this.objPriceArr[i].unit.toLowerCase() == aa[1].toLowerCase()) {
        this.prodPrice.extension = this.objPriceArr[i].extension;
        this.prodPrice.qty_unit = this.objPriceArr[i].qty_unit;
        this.prodPrice.perUnitPrice = this.objPriceArr[i].perUnitPrice;
      }
    }
  }
  downloadPDF() {
    try {
      this.demoService.downloadPDF(this.item1.itemname).subscribe((response: any) => {
        let file = new Blob([response], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
    } catch (exc) { }
  }

  Get3dmodulehtml(iname, pname, cname) {
    this.dataService.get3dmodulehtml(iname, pname, cname).subscribe((res: any) => {
      this.threedhtml = res;
    });
  }
  getCustomerDetails() {
    try {
      if (Common.getWithExpiry("custdetails") != undefined) {
        var custdetails = JSON.parse(Common.getWithExpiry("custdetails"));
      }
    } catch (ed) { }
    if (custdetails == undefined || custdetails == null) {
      this.dataService.getacustomer(Common.getWithExpiry("CustID")).subscribe((res1: any) => {
        custdetails = res1;
        Common.setWithExpiry('UserEmail', custdetails.email_address);
        Common.setWithExpiry('UserFirstName', custdetails.atn_first_name);
        Common.setWithExpiry('UserLastName', custdetails.atn_last_name);
        Common.setWithExpiry('UserCompany', custdetails.name);
        Common.setWithExpiry('UserPostalCode', custdetails.postal_code);
        Common.setWithExpiry('UserCountryCode', custdetails.country_code);
        Common.setWithExpiry('UserState', custdetails.state);
        Common.setWithExpiry('UserPhone', custdetails.phone);

        try {
          custdetails.adr = JSON.parse(custdetails.adr);
        }
        catch (ex) {
          custdetails.adr = custdetails.adr.split(';');
        }
        Common.setWithExpiry('UserAddress', custdetails.adr[0]);
        Common.setWithExpiry('UserAddress2', custdetails.adr[1]);
        Common.setWithExpiry('UserCity', custdetails.adr[2] + custdetails.adr[3]);
        Common.setWithExpiry("custdetails", JSON.stringify(custdetails));
      });
    }
    else {
      Common.setWithExpiry('UserEmail', custdetails.email_address);
      Common.setWithExpiry('UserFirstName', custdetails.atn_first_name);
      Common.setWithExpiry('UserLastName', custdetails.atn_last_name);
      Common.setWithExpiry('UserCompany', custdetails.name);
      Common.setWithExpiry('UserAddress', custdetails.adr[0]);
      Common.setWithExpiry('UserAddress2', custdetails.adr[1]);
      Common.setWithExpiry('UserCity', custdetails.adr[2] + custdetails.adr[3]);
      Common.setWithExpiry('UserPostalCode', custdetails.postal_code);
      Common.setWithExpiry('UserCountryCode', custdetails.country_code);
      Common.setWithExpiry('UserState', custdetails.state);
      Common.setWithExpiry('UserPhone', custdetails.phone);
    }
  }

  ddlSelectEvent() {

    var model;
    var index;
    for (var i = 0; i < this.childproducts.length; i++) {
      if (this.itemnameddl == this.childproducts[i].cu_item) {
        model = this.childproducts[i];
        index = i;
        break;
      }
    }

    this.SelectItem(model, index);
  }

}
