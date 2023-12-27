import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { NG_VALIDATORS, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Common } from '../model/common.model';
import { retryWhen } from 'rxjs/operators';
import { SEOService } from '../services/seo.service';
import { LoadingService } from '../services/loading.service';
import { OrderManagementService } from '../services/order-management.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { environment } from '../../environments/environment';
//import { $ } from 'protractor';
// import * as $ from 'jquery';
@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss']
})
export class CartPreviewComponent implements OnInit, AfterViewInit {
  addtonotavail: any;
  configforcartbyprofile: any;
  AddToCartAsPerProfileNo: any;
  AddToCartAsPerProfileArrayNo: any;
  GuestUserID: any;
  Guestwarehouse: any;
  cartProducts: any;
  cartTotal: number;
  sessionId: string;
  isEmpty: boolean = false;
  shopping: string = "Continue Shopping";
  checkoutbtn: string = "PROCCED TO CHEKOUT";
  withloginprice: any;
  withloginpricelist: any;
  item1: any;
  objQtyArr: any = [];
  bulkPrice: any = []
  objUnitArr = [];
  objPriceArr: any = [];
  selectedUnit: string;
  selectedItem: string;
  Pricebreaks = [];
  AddNewItem: any;
  AddNewQty: any;
  QtyControl: any;
  stocklable: any;
  itemstoavails: string = '';
  withloginavailqty: any;
  withloginavailshow: any;
  AddZero: any;
  FastAddCart: any;
  UserType: any;
  webtype: any;
  ismultipleum: any;
  isShowItemNote: boolean = false;
  warehouse: any;
  isLoggedIn: boolean = false;
  MinQty: boolean = false;
  MaxQty: boolean = false;
  Multiply: any;
  IsMuscle: any;
  listprice: any;
  priceshow: any;
  isshowpricebreaks: any;
  israteshowforcu: any;
  isprofiledesc: any;
  web_order_min_amount: any;
  PriceRound: any;
  qtymsg: any;
  withloginavaillist: any;
  flagtosubmit: any = true;
  drop_shiplable: any;
  Multiplewarehouseforavaibility: any;
  multiplewarehouseinone: any;
  baseitemShow: any;
  UrlWithFreeForm: any;
  UrlWithDetails: any;
  show3D: any;
  Cartpagemessage: any;
  Processwithzeroprice: any;
  priceshowcust: any;
  editableString: string;
  UMdropdown: any;
  DescrToShow: any;
  isPunchOut: boolean = false;
  PunchOutQuote: any;
  DisplayUmQty: any;
  isGuestLogin: any;
  guestcheckout: any;
  customer: any;
  punchOutType: any;
  umdescrlist: any;
  isumdescr: any;
  linebyline: any;
  copypaste: any;
  fileupload: any;
  withoutloginavaillist: any;
  annastock: any;
  annavail: any;
  dataSource: any;
  drop_ship: any;
  avaibilitylable: any;
  customedropdown: any;
  customed: any;
  logintype: any;
  showavaibilityincart: any;//='0';

  addnewqtywithnewlogic: any;
  displaynewavails: any;
  displaynewavailslable: any;
  addcartpop:any;
  iskyraden:any;
  constructor(private http: HttpClient,private gtmService: GoogleTagManagerService, private formBuilder: UntypedFormBuilder, el: ElementRef, private renderer: Renderer2, private loadingService: LoadingService, private seoService: SEOService, private toastr: ToastrService, private cartService: CartService, private router: Router, private dataService: DataService, private orderService: OrderManagementService) {

    this.gototop();
    var geturl = Common.getWithExpiry("cpname");
    this.punchOutType = Common.getWithExpiry("PunchOutType");
    this.logintype = this.dataService.Getconfigbykey("logintype");
    this.seoService.setPageTitle('Shopping Cart - ' + geturl);
    this.seoService.setkeywords('Shopping Cart - ' + geturl);
    this.seoService.setdescription('Shopping Cart - ' + geturl);
    this.israteshowforcu = true;
    this.iskyraden=environment.iskyraden;
    this.Getavailsincart();
    this.GetlinebylineSetting();
    this.Getcustomedropdown();
    this.configforstocklable();
    this.cofigurtiondfordrop_ship();
    this.GetcopypasteSetting();
    this.GetfileuploadSetting();
    this.guestLoginSetting();
    this.Getguestcheckout();
    this.Getdrop_shiplable();
    this.getqtymsg();
    this.GetDisplayUmQty();
    this.GetUMdropdown();
    this.getDescrToShow();
    this.GetConfigurationforProcesswithzeroprice();
    this.GetConfigtoCartpagemessage();
    this.GetConfigForAddToCartAsPerProfile();
    this.GetpriceRoundingsetting();
    this.getisprofiledesc();
    this.GetMinOrdervalue();
    this.getbaseitemShow();
    this.getUrlWithDetails();
    this.get3dsetting();
    this.getaddtonotavail();
    this.Getavaibilitylable();
    this.Getmultiplewarehouseinone();
    this.showpricetocustomers();
    this.getannavail();
    this.GetMultiplewarehouseforavaibility();
    this.getwithloginavailshow();
    this.Getaddnewqtywithnewlogic();
    this.Getdisplaynewavails();
    this.Getdisplaynewavailslable();
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


    this.getIsMuscle();
    this.tagmanager();
    this.getmultipleum();
    this.gerpricebreakconfig();
    if (Common.getWithExpiry("CustID") != "" && Common.getWithExpiry("CustID") != null) {
      this.warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
      this.isLoggedIn = true;
      this.getwithloginprice();
    }
    else {
      this.isLoggedIn = false;
      this.getGuestUserID();
      this.getGuestwarehouse();
    }

    if (Common.getWithExpiry("IsPunchOut") == "Yes") {
      this.isPunchOut = true;
      this.PunchOutQuote = Common.getWithExpiry("PunchOutQuoteNo")
    }
    else {
      this.isPunchOut = false;
    }
  }

  openpopup(){
    if(this.addcartpop==undefined || this.addcartpop=='0'){
      this.addcartpop='1';
    }
    else{
      this.addcartpop='0';
    }
  }

  tagmanager() {
    try{
    var item = [];
    var total = this.gettotalcart();
    for (var i = 0; i < this.cartProducts.length; i++) {
        item.push({ "item_id": this.cartProducts[i].itemname, "item_name": this.cartProducts[i].itemname, "item_brand": this.cartProducts[i].links, "item_category": this.cartProducts[i].prod_line, "item_category2": this.cartProducts[i].itemname, "item_list_id": "", "item_list_name": this.cartProducts[i].itemname, "price": this.cartProducts[i].PricePer, "quantity": this.cartProducts[i].Quantity })
    }
    var gtmTag = {
        event: 'view_cart',
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
  getqtymsg() {
    this.qtymsg = Common.getWithExpiry("qtymsg");
    if (this.qtymsg == null || this.qtymsg == undefined || this.qtymsg == '') {
      this.dataService.msgdisplayforavaibility().subscribe((res: any) => {
        this.qtymsg = res;
        Common.setWithExpiry("qtymsg", this.qtymsg);
      });
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
        Common.setWithExpiry("drop_ship", this.drop_ship);
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
  getannastock() {
    this.annastock = this.dataService.Getconfigbykey("withoutloginavailqty");
    if (this.annastock == null || this.annastock == undefined || this.annastock == '') {
      this.annastock = Common.getWithExpiry("annastock");
    }
    if (this.annastock == null || this.annastock == undefined || this.annastock == '') {
      this.dataService.anonymoususersIsstock().subscribe((res: any) => {
        this.annastock = res;
        Common.setWithExpiry("annastock", this.annastock);
      });
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
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
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
              this.getCartItems();
            });
          }
          else {
            this.umdescrlist = umdescrlist;
            this.getCartItems();
          }
        }
        else {
          this.getCartItems();
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
            this.getCartItems();
          });
        }
        else {
          this.umdescrlist = umdescrlist;
          this.getCartItems();
        }
      }
      else {
        this.getCartItems();
      }
    }

  }
  searchallnew(token) {
    this.dataSource = this.filterResults(token);
  }

  filterResults(token: string) {
    var Guestwarehouse = Common.getWithExpiry("Guestwarehouse");
    var wh = (Common.getWithExpiry("warehouse") == undefined ? Guestwarehouse : Common.getWithExpiry("warehouse"));
    var pmodel = {
      word: token,
      PageNo: 1,
      PageSize: 10,
      warehouse: wh,
      type: 0,
      customer: Common.getWithExpiry("CustID"),
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductListBySearchforheader', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) })
      //.map((results: any[]) => results.filter(res => res.freeform.toLowerCase().indexOf(token.toLowerCase()) > -1));
  }
  typeaheadOnSelect(event) {
    if (event.item != undefined && event.item != null) {
      this.AddNewItem = event.item.itemname;
    }
  }
  gotoquickorder() {
    this.router.navigate(['quickadd']);
  }

  getumdescbyumcode(umcode) {
    if (this.isumdescr == '1') {
      for (var i = 0; i < this.umdescrlist.length; i++) {
        if (this.umdescrlist[i].code.toLowerCase() == umcode.toLowerCase()) {
          return this.umdescrlist[i].descr;
        }
      }
    }
    else {
      return umcode;
    }
  }
  guestLoginSetting() {
    this.isGuestLogin = this.dataService.Getconfigbykey("GuestLogin");
    if (this.isGuestLogin == null || this.isGuestLogin == undefined || this.isGuestLogin == '') {
      this.isGuestLogin = Common.getWithExpiry("GuestLogin");
    }
    if (this.isGuestLogin == null || this.isGuestLogin == undefined || this.isGuestLogin == '') {
      this.dataService.GuestLoginSetting().subscribe((data: any) => {
        this.isGuestLogin = data;
        if (this.isGuestLogin == '0' && (Common.getWithExpiry("CustID") == "" || Common.getWithExpiry("CustID") == null || Common.getWithExpiry("CustID") == undefined)) {
          this.router.navigate(['login']);
        }
        Common.setWithExpiry("GuestLogin", this.isGuestLogin);

      });
    }
    if (this.isGuestLogin == '0' && (Common.getWithExpiry("CustID") == "" || Common.getWithExpiry("CustID") == null || Common.getWithExpiry("CustID") == undefined)) {
      this.router.navigate(['login']);
    }
  }
  Getguestcheckout() {
    this.guestcheckout = this.dataService.Getconfigbykey("guestcheckout");
    if (this.guestcheckout == null || this.guestcheckout == undefined || this.guestcheckout == '') {
      this.guestcheckout = Common.getWithExpiry("guestcheckout");
    }
    if (this.guestcheckout == null || this.guestcheckout == undefined || this.guestcheckout == '') {
      this.dataService.Getconfigforguestcheckout().subscribe((data: any) => {
        this.guestcheckout = data;
        Common.setWithExpiry("guestcheckout", this.guestcheckout);
      })
    }
  }
  get3dsetting() {
    this.show3D = this.dataService.Getconfigbykey("Show3D");
    if (this.show3D == null || this.show3D == undefined || this.show3D == '') {
      this.show3D = Common.getWithExpiry("show3D");
    }
    if (this.show3D == null || this.show3D == undefined || this.show3D == '') {
      this.dataService.Get3DSetting().subscribe((res: any) => {
        this.show3D = res;
        Common.setWithExpiry("show3D", this.show3D);
      });
    }
  }
  getaddtonotavail() {
    this.addtonotavail = this.dataService.Getconfigbykey("addifunavail");
    if (this.addtonotavail == null || this.addtonotavail == undefined || this.addtonotavail == '') {
      this.addtonotavail = Common.getWithExpiry("addifunavail");
    }
    if (this.addtonotavail == null || this.addtonotavail == undefined || this.addtonotavail == '') {
      this.dataService.GetConfigForisaddifunavail().subscribe((res: any) => {
        this.addtonotavail = res;
        Common.setWithExpiry("addifunavail", this.addtonotavail);
      });
    }
  }
  showpricetocustomers() {
    this.priceshowcust = this.dataService.Getconfigbykey("ShowPrices");
    if (this.priceshowcust == undefined || this.priceshowcust == null || this.priceshowcust == '') {
      this.priceshowcust = Common.getWithExpiry("priceshowcust");
    }
    if (this.priceshowcust == undefined || this.priceshowcust == null || this.priceshowcust == '') {
      this.dataService.showpricetocustomers().subscribe((data: any) => {
        this.priceshowcust = data;
        Common.setWithExpiry("priceshowcust", this.priceshowcust);
      })
    }
  }
  ngAfterViewInit() {

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
  getbaseitemShow() {
    this.baseitemShow = this.dataService.Getconfigbykey("baseitemShow");
    if (this.baseitemShow == null || this.baseitemShow == undefined || this.baseitemShow == '') {
      this.baseitemShow = Common.getWithExpiry("baseitemShow");
    }
    if (this.baseitemShow == null || this.baseitemShow == undefined || this.baseitemShow == '') {
      this.dataService.Getthebaseitemconfiguration().subscribe((data: any) => {
        this.baseitemShow = data;
        Common.setWithExpiry("baseitemShow", this.baseitemShow);
      })
    }
  }
  GetMinOrdervalue() {

    this.web_order_min_amount = Common.getWithExpiry("web_order_min_amount");
    if (this.web_order_min_amount == null || this.web_order_min_amount == undefined || this.web_order_min_amount == '') {
      this.dataService.GetMinOrdervalue().subscribe((res: any) => {
        this.web_order_min_amount = res;
        Common.setWithExpiry("web_order_min_amount", this.web_order_min_amount);
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
  gototop() {
    try{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    }catch(ed){}
  }

  gerpricebreakconfig() {
    this.isshowpricebreaks = this.dataService.Getconfigbykey("ispricebreaks");
    if (this.isshowpricebreaks == null || this.isshowpricebreaks == undefined || this.isshowpricebreaks == '') {
      this.isshowpricebreaks = Common.getWithExpiry("isshowpricebreaks");
    }
    if (this.isshowpricebreaks == null || this.isshowpricebreaks == undefined || this.isshowpricebreaks == '') {
      this.dataService.Allowpricebreaks().subscribe((res: any) => {
        this.isshowpricebreaks = res;
        Common.setWithExpiry("isshowpricebreaks", this.isshowpricebreaks);
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
  GetConfigtoCartpagemessage() {
    this.Cartpagemessage = this.dataService.Getconfigbykey("Cartpagemessage");
    if (this.Cartpagemessage == null || this.Cartpagemessage == undefined || this.Cartpagemessage == '') {
      this.Cartpagemessage = Common.getWithExpiry("Cartpagemessage");
    }
    if (this.Cartpagemessage == null || this.Cartpagemessage == undefined || this.Cartpagemessage == '') {
      this.dataService.GetConfigtoCartpagemessage().subscribe((res: any) => {
        this.Cartpagemessage = res;
        Common.setWithExpiry("Cartpagemessage", this.Cartpagemessage);
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
  GetConfigurationforProcesswithzeroprice() {
    this.Processwithzeroprice = this.dataService.Getconfigbykey("Processwithzeroprice");
    if (this.Processwithzeroprice == null || this.Processwithzeroprice == undefined || this.Processwithzeroprice == '') {
      this.Processwithzeroprice = Common.getWithExpiry("Processwithzeroprice");
    }
    if (this.Processwithzeroprice == null || this.Processwithzeroprice == undefined || this.Processwithzeroprice == '') {
      this.dataService.GetConfigurationforProcesswithzeroprice().subscribe((res: any) => {
        this.Processwithzeroprice = res;
        Common.setWithExpiry("Processwithzeroprice", this.Processwithzeroprice);
      });
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


  getUrlWithDetails() {
    this.UrlWithDetails = this.dataService.Getconfigbykey("UrlWithDetails");
    if (this.UrlWithDetails == null || this.UrlWithDetails == undefined || this.UrlWithDetails == '') {
      this.UrlWithDetails = Common.getWithExpiry("UrlWithDetails");
    }
    if (this.UrlWithDetails == null || this.UrlWithDetails == undefined || this.UrlWithDetails == '') {
      this.dataService.GetUrlWithDetailssetting().subscribe((data: any) => {
        this.UrlWithDetails = data;
        if (this.UrlWithDetails == '1') {
          this.getUrlWithFreeForm();
        }
        Common.setWithExpiry("UrlWithDetails", this.UrlWithDetails);
      })
    }
    else {
      if (this.UrlWithDetails == '1') {
        this.getUrlWithFreeForm();
      }
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

  GetIsshowpricebreak() {
    var userid = (this.GuestUserID == undefined ? Common.getWithExpiry("CustID") : this.GuestUserID);
    this.isshowpricebreaks = Common.getWithExpiry("isshowpricebreaks");
    if (this.isshowpricebreaks == null || this.isshowpricebreaks == undefined || this.isshowpricebreaks == '') {
      this.dataService.Allowpricebreaks().subscribe((res: any) => {
        this.isshowpricebreaks = res;
        Common.setWithExpiry("isshowpricebreaks", this.isshowpricebreaks);
        if (this.isshowpricebreaks == 1) {
          this.getpricebreaks(userid);
        }
      });
    }
    else {
      if (this.isshowpricebreaks == 1) {
        this.getpricebreaks(userid);
      }
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

      });
    }
    else {

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
  ngOnInit() {
    this.getItemNoteSetting();
    this.getwebsitetype();
    this.UserType = (Common.getWithExpiry("SalesUserType") == undefined ? (Common.getWithExpiry("UserType") == undefined ? "1" : Common.getWithExpiry("UserType")) : Common.getWithExpiry("SalesUserType").toString());
    this.getAddZeroconfig();
    this.getFastAddCart();
    this.QtyControl = new UntypedFormControl("", [Validators.max(100), Validators.min(0), Validators.minLength(1), Validators.maxLength(4)])
    this.sessionId = Common.getSessionId();

    this.getMinQtySetting();
    this.getMaxQtySetting();
    this.getMultiplyQtySetting();

    if (Common.getWithExpiry("IsPunchOut") == "Yes") {
      this.getCustomerInfo();
    }
    this.getumdescrconfig();

  }

  getCustomerInfo() {
    this.orderService.GetloginCustomerInfo(Common.getWithExpiry("CustID")).subscribe((res: any) => {
      var getcu = res;
      this.customer = getcu[0];
    });
  }

  getFastAddCart() {
    this.FastAddCart = this.dataService.Getconfigbykey("FastAddtocart");
    if (this.FastAddCart == null || this.FastAddCart == undefined || this.FastAddCart == '') {
      this.FastAddCart = Common.getWithExpiry("FastAddCart");
    }
    if (this.FastAddCart == null || this.FastAddCart == undefined || this.FastAddCart == '') {
      this.dataService.GetConfigForFastAddCart().subscribe((zeros: any) => {
        this.FastAddCart = zeros;
        Common.setWithExpiry("FastAddCart", this.FastAddCart);
      });
    }
  }
  getAddZeroconfig() {
    this.AddZero = this.dataService.Getconfigbykey("AddZeroValue");
    if (this.AddZero == null || this.AddZero == undefined || this.AddZero == '') {
      this.AddZero = Common.getWithExpiry("AddZeroconfig");
    }
    if (this.AddZero == null || this.AddZero == undefined || this.AddZero == '') {
      this.dataService.GetConfigForZeroPrice().subscribe((zeros: any) => {
        this.AddZero = zeros;
        Common.setWithExpiry("AddZeroconfig", this.AddZero);
      });
    }
  }

  getwebsitetype() {
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
  }
  GetlinebylineSetting() {
    this.linebyline = this.dataService.Getconfigbykey("linebyline");
    if (this.linebyline == null || this.linebyline == undefined || this.linebyline == '') {
      this.linebyline = Common.getWithExpiry("linebyline");
    }
    if (this.linebyline == null || this.linebyline == undefined || this.linebyline == '') {
      this.dataService.GetlinebylineSetting().subscribe((data: any) => {
        this.linebyline = data;
        Common.setWithExpiry("linebyline", this.linebyline);
      })
    }
  }
  Getavailsincart() {
    this.showavaibilityincart = this.dataService.Getconfigbykey("availsincart");
    if (this.showavaibilityincart == null || this.showavaibilityincart == undefined || this.showavaibilityincart == '') {
      this.showavaibilityincart = Common.getWithExpiry("availsincart");
    }
    if (this.showavaibilityincart == null || this.showavaibilityincart == undefined || this.showavaibilityincart == '') {
      this.dataService.Getavailsincart().subscribe((data: any) => {
        this.showavaibilityincart = data;
        Common.setWithExpiry("availsincart", this.showavaibilityincart);
      })
    }
  }
  Getdrop_shiplable() {
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
  Getavaibilitylable() {
    this.avaibilitylable = this.dataService.Getconfigbykey("avaibilitylable");
    if (this.avaibilitylable == null || this.avaibilitylable == undefined || this.avaibilitylable == '') {
      this.avaibilitylable = Common.getWithExpiry("avaibilitylable");
    }
    if (this.avaibilitylable == null || this.avaibilitylable == undefined || this.avaibilitylable == '') {
      this.dataService.GetavaibilitylableConfig().subscribe((data: any) => {
        this.avaibilitylable = data;
        Common.setWithExpiry("avaibilitylable", this.avaibilitylable);
      })
    }
  }
  Getmultiplewarehouseinone() {
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

getvaluebycustomerdropdown(cdvalue){
  if (this.customedropdown != undefined || this.customedropdown != undefined || this.customedropdown.length>0) {

    for (let index = 0; index < this.customedropdown.length; index++) {
      if(cdvalue==this.customedropdown[index].Value){
        return this.customedropdown[index].Name;
      }
    }

  }
}

  Getcustomedropdown() {
    try {
      this.customedropdown = JSON.parse(this.dataService.Getconfigbykey("customedropdown"));
      this.customed = this.customedropdown[0].Value;
    } catch (e) { }
    if (this.customedropdown == null || this.customedropdown == undefined || this.customedropdown == '') {
      try {
        this.customedropdown = JSON.parse(Common.getWithExpiry("customedropdown"));
        this.customed = this.customedropdown[0].Value;
      } catch (e) { }
    }
    if (this.customedropdown == null || this.customedropdown == undefined || this.customedropdown == '') {
      this.dataService.Getconfigforcustomedropdown().subscribe((data: any) => {
        if (data != undefined && data != null && data != '') {
          this.customedropdown = JSON.parse(data);
          this.customed = this.customedropdown[0].Value;
          Common.setWithExpiry("customedropdown", data);
        }
      })
    }
  }
  GetcopypasteSetting() {
    this.copypaste = this.dataService.Getconfigbykey("copypaste");
    if (this.copypaste == null || this.copypaste == undefined || this.copypaste == '') {
      this.copypaste = Common.getWithExpiry("copypaste");
    }
    if (this.copypaste == null || this.copypaste == undefined || this.copypaste == '') {
      this.dataService.GetcopypasteSetting().subscribe((data: any) => {
        this.copypaste = data;
        Common.setWithExpiry("copypaste", this.copypaste);
      })
    }
  }
  GetfileuploadSetting() {
    this.fileupload = this.dataService.Getconfigbykey("fileupload");
    if (this.fileupload == null || this.fileupload == undefined || this.fileupload == '') {
      this.fileupload = Common.getWithExpiry("fileupload");
    }
    if (this.fileupload == null || this.fileupload == undefined || this.fileupload == '') {
      this.dataService.GetfileuploadSetting().subscribe((data: any) => {
        this.fileupload = data;
        Common.setWithExpiry("fileupload", this.fileupload);
      })
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

  getItemNoteSetting() {
    var ItemNoteSetting = this.dataService.Getconfigbykey("ItemNote");
    if (ItemNoteSetting == null || ItemNoteSetting == undefined || ItemNoteSetting == '') {
      ItemNoteSetting = Common.getWithExpiry("ItemNoteSetting");
    }
    if (ItemNoteSetting == null || ItemNoteSetting == undefined || ItemNoteSetting == '') {
      this.dataService.GetItemNoteSetting().subscribe((data: any) => {
        ItemNoteSetting = data;
        if (ItemNoteSetting == "1") {
          this.isShowItemNote = true;
        }
        else {
          this.isShowItemNote = false;
        }
      });
    } else {
      if (ItemNoteSetting == "1") {
        this.isShowItemNote = true;
      }
      else {
        this.isShowItemNote = false;
      }
    }
  }

  getpricebreaks(userid) {
    this.cartTotal = 0;
    for (let pp of this.cartProducts) {
      this.dataService.getPriceBreaks(userid, pp.itemname).subscribe((res: any) => {
        var getdats = res;
        if (getdats != undefined && getdats.length > 0) {
          for (let tt of getdats) {
            if (tt.from <= pp.totqty) {
              pp.PricePer = tt.amount;
              pp.Price = (pp.totqty * tt.amount);
            }
          }
          this.cartTotal = this.cartTotal + pp.Price;
        }
        else {
          this.cartTotal = this.cartTotal + pp.Price;
        }
      });
    }
  }
  onKeydown(event) {
    if (event.key === "Enter") {
      this.AddNewProducts();
    }
  }


  gettotalcart() {
    this.cartTotal = 0;
    if (this.cartProducts != undefined && this.cartProducts != null && this.cartProducts.length > 0) {
      for (let pp of this.cartProducts) {
        this.cartTotal = this.cartTotal + (pp.PricePer * pp.Quantity);
      }
    }
    return this.cartTotal;
  }

  Checkforpricezero() {
    this.flagtosubmit = true;
    if (this.Processwithzeroprice == '0') {
      for (let pp of this.cartProducts) {
        if (pp.Price == 0) {
          this.toastr.error("Please contact for price of this product " + pp.itemname, 'Message!');
          this.flagtosubmit = false;
        }
      }
    }
  }




  getCartItems() {
    var finalResult = [];
    var total = 0;
    var usrid = null;
    this.itemstoavails = '';
    if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
      usrid = Common.getWithExpiry("UserID") + Common.getWithExpiry("CustID");
    }
    else {
      usrid = Common.getWithExpiry("CustID");
    }
    this.sendMessage('start');
    try {
      this.cartService.getCartItemByUserID().subscribe((res: any) => {
        this.sendMessage('stop');
        this.cartProducts = res;
        this.tagmanager();
        var total = 0;
        for (let pp of this.cartProducts) {


          // var profile1 = JSON.parse(pp.profile1);
          // if ((profile1[1] != "" && this.show3D == '1') && (profile1[2] == 'YES' || profile1[2] == 'yes')) {
          //   pp.IsBaseProduct = true;
          // }
          // else {
          pp.IsBaseProduct = false;
          //}
          //Common.gotoproductdetails(pp, this.UrlWithDetails, this.UrlWithFreeForm);
          pp.descr = pp.itemdesc;
          this.itemstoavails = this.itemstoavails + pp.itemname + ',';
          Common.Setdescriptionforitem(pp, this.DescrToShow)
          if (this.drop_ship == '0') {
            pp.drop_ship = false;
          }
          // try {
          //   var dept1 = [];
          //   try {
          //     dept1 = JSON.parse(pp.itemdesc);
          //   } catch (ex) {

          //     pp.itemdesc = pp.itemdesc.replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';');
          //     pp.itemdesc = pp.itemdesc.replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '')
          //       .replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '');
          //     dept1 = pp.itemdesc.replace('[', '').replace(']', '').split(';');
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
          //   pp.itemdesc = des2;
          //   pp.descr1 = des1;



          total = Number(total) + Number(pp.Price);
          var umArr = pp.umqty.replace('[', '').replace(']', '').split(',');
          var index = 0;
          var units = pp.um.trim().replace('[', '').replace(']', '').split(',');
          for (var i = 0; i < units.length; i++) {
            units[i] = units[i].trim();
            var existingUnit = units[i].replace('"', '').replace('"', '');
            var un = 'each';
            if (existingUnit.toLowerCase() == "ea" || existingUnit.toLowerCase() == "each") {
              index = i;
              break;
            }
          }

          var units = JSON.parse(pp.um);
          var umArr = JSON.parse(pp.umqty);
          var getallows = JSON.parse(pp.web_um_alws);

          var umList = [];
          var getindex = 0;
          var umList1 = [];
          if (this.ismultipleum == '1') {
            for (var i = 0; i < units.length; i++) {
              if (units[i] == pp.um_display) {

                getindex = i;
              }
              if (i == 0 && units[i] != '' && getallows[i] == true) {
                if (units[i] == pp.um_display) {
                  pp.um_displayQty = 1;
                }


                umList.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (1)', 'Price': '', 'ltext': this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (1)' : '') });
                umList1.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (1)', 'Price': '', 'ltext': this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (1)' : '') });
                if (this.isLoggedIn && this.withloginprice == '1' && this.withloginpricelist != '1') {
                  this.bulkPrice.push({
                    "customer": Common.getWithExpiry("CustID"),
                    "item": pp.itemname,
                    // "unit": units[i].trim(),
                    "quantity": pp.Quantity,
                    "warehouse": this.warehouse,
                    "rounding": this.PriceRound,
                    "qty_unit": units[i].trim(),
                    "company_sy": Common.getWithExpiry("company_sy")
                  })
                }
                else if (!this.isLoggedIn && this.priceshow == '1' && this.listprice != '1') {
                  this.bulkPrice.push({
                    "customer": this.GuestUserID,
                    "item": pp.itemname,
                    // "unit": units[i].trim(),
                    "quantity": pp.Quantity,
                    "warehouse": this.Guestwarehouse,
                    "rounding": this.PriceRound,
                    "qty_unit": units[i].trim(),
                    "company_sy": Common.getWithExpiry("company_sy")
                  })
                }
                if (pp.MeasureUnit == umList[0].Label) {
                  pp.totqty = umList[0].umqty * pp.Quantity;
                }
                // umList1.push(units[i]);
                // units[i]=units[i]+' (1)';
                // umList.push(units[i]);
              }
              else if (units[i] != '' && getallows[i] == true) {
                if (units[i] == pp.um_display) {
                  pp.um_displayQty = umArr[i - 1];
                }
                umList.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (' + umArr[i - 1] + ')', 'Price': '', 'ltext': this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (' + umArr[i - 1] + ')' : '') });
                umList1.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (' + umArr[i - 1] + ')', 'Price': '', 'ltext': this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (' + umArr[i - 1] + ')' : '') });
                if (this.isLoggedIn && this.withloginprice == '1' && this.withloginpricelist != '1') {
                  this.bulkPrice.push({
                    "customer": Common.getWithExpiry("CustID"),
                    "item": pp.itemname,
                    // "unit": units[i].trim(),
                    "quantity": pp.Quantity,
                    "warehouse": this.warehouse,
                    "rounding": this.PriceRound,
                    "qty_unit": units[i].trim(),
                    "company_sy": Common.getWithExpiry("company_sy")
                  })
                }
                else if (!this.isLoggedIn && this.priceshow == '1' && this.listprice != '1') {
                  this.bulkPrice.push({
                    "customer": this.GuestUserID,
                    "item": pp.itemname,
                    // "unit": units[i].trim(),
                    "quantity": pp.Quantity,
                    "warehouse": this.Guestwarehouse,
                    "rounding": this.PriceRound,
                    "qty_unit": units[i].trim(),
                    "company_sy": Common.getWithExpiry("company_sy")
                  })
                }
                if (pp.MeasureUnit == umList[0].Label) {
                  pp.totqty = umList[0].umqty * pp.Quantity;
                }
                // umList1.push(units[i]);
                // units[i]=units[i]+' ('+umArr[i-1]+')';
                // umList.push(units[i]);
              }
            }
          }
          else {
            for (var i = 0; i < units.length; i++) {
              if (units[i] != '' && units[i] == pp.um_display) {
                if (i == 0) {
                  umList.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (1)', 'Price': '', 'ltext': this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (1)' : '') });
                  umList1.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (1)', 'Price': '', 'ltext': this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (1)' : '') });
                  if (this.isLoggedIn && this.withloginprice == '1' && this.withloginpricelist != '1') {
                    this.bulkPrice.push({
                      "customer": Common.getWithExpiry("CustID"),
                      "item": pp.itemname,
                      // "unit": units[i].trim(),
                      "quantity": pp.Quantity,
                      "warehouse": this.warehouse,
                      "rounding": this.PriceRound,
                      "qty_unit": units[i].trim(),
                      "company_sy": Common.getWithExpiry("company_sy")
                    })
                  }
                  else if (!this.isLoggedIn && this.priceshow == '1' && this.listprice != '1') {
                    this.bulkPrice.push({
                      "customer": this.GuestUserID,
                      "item": pp.itemname,
                      // "unit": units[i].trim(),
                      "quantity": pp.Quantity,
                      "warehouse": this.Guestwarehouse,
                      "rounding": this.PriceRound,
                      "qty_unit": units[i].trim(),
                      "company_sy": Common.getWithExpiry("company_sy")
                    })
                  }
                  if (pp.MeasureUnit == umList[0].Label) {
                    pp.totqty = umList[0].umqty * pp.Quantity;
                  }
                  // umList1.push(units[i]);
                  // units[i]=units[i]+' (1)';
                  // umList.push(units[i]);
                }
                else {
                  umList.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (' + umArr[i - 1] + ')', 'Price': '', 'ltext': this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (' + umArr[i - 1] + ')' : '') });
                  umList1.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (' + umArr[i - 1] + ')', 'Price': '', 'ltext': this.getumdescbyumcode(units[i]) + (this.DisplayUmQty == '1' ? ' (' + umArr[i - 1] + ')' : '') });
                  if (this.isLoggedIn && this.withloginprice == '1' && this.withloginpricelist != '1') {
                    this.bulkPrice.push({
                      "customer": Common.getWithExpiry("CustID"),
                      "item": pp.itemname,
                      // "unit": units[i].trim(),
                      "quantity": pp.Quantity,
                      "warehouse": this.warehouse,
                      "rounding": this.PriceRound,
                      "qty_unit": units[i].trim(),
                      "company_sy": Common.getWithExpiry("company_sy")
                    })
                  }
                  else if (!this.isLoggedIn && this.priceshow == '1' && this.listprice != '1') {
                    this.bulkPrice.push({
                      "customer": this.GuestUserID,
                      "item": pp.itemname,
                      // "unit": units[i].trim(),
                      "quantity": pp.Quantity,
                      "warehouse": this.Guestwarehouse,
                      "rounding": this.PriceRound,
                      "qty_unit": units[i].trim(),
                      "company_sy": Common.getWithExpiry("company_sy")
                    })
                  }
                  if (pp.MeasureUnit == umList[0].Label) {
                    pp.totqty = umList[0].umqty * pp.Quantity;
                  }
                  // umList1.push(units[i]);
                  // units[i]=units[i]+' ('+umArr[i-1]+')';
                  // umList.push(units[i]);
                }
              }
            }
          }
          pp.unitlist = umList;
          this.objUnitArr = umList;

          //} catch (ef) { }


          //   umArr.splice(index, 0, "1");
          //   this.objQtyArr = umArr;
          //   var umList = [];
          //   var umList1 = [];
          //   var cnt = 0;
          //   var getindex=0;
          //   for (let unit of units) {
          //     unit = unit.trim();
          //     unit = unit.replace('"', '').replace('"', '');
          //     if (unit != '') {
          //       cnt = cnt + 1;
          //       if(unit==pp.um_display){
          //         getindex=cnt;
          //       }
          //       if (cnt > 1) {
          //         if (this.ismultipleum == '1') {
          //           umList.push({'Label':unit,'LabelText':'','Price':''});
          //           umList1.push({'Label':unit,'LabelText':'','Price':''});
          //           if (this.isLoggedIn && this.withloginprice == '1' && this.withloginpricelist != '1') {
          //             this.bulkPrice.push({
          //               "customer": Common.getWithExpiry("CustID"),
          //               "item": pp.itemname,
          //               "unit": unit.trim(),
          //               "quantity": 1,
          //               "warehouse": this.warehouse,
          //             })
          //           }
          //           else if (!this.isLoggedIn && this.priceshow == '1' && this.listprice != '1') {
          //             this.bulkPrice.push({
          //               "customer": this.GuestUserID,
          //               "item": pp.itemname,
          //               "unit": unit.trim(),
          //               "quantity": 1,
          //               "warehouse": this.Guestwarehouse,
          //             })
          //           }
          //         }
          //       }
          //       else {
          //         umList.push({'Label':pp.um_display,'LabelText':'','Price':''});
          //         umList1.push({'Label':pp.um_display,'LabelText':'','Price':''});
          //         if (this.isLoggedIn && this.withloginprice == '1' && this.withloginpricelist != '1') {
          //           this.bulkPrice.push({
          //             "customer": Common.getWithExpiry("CustID"),
          //             "item": pp.itemname,
          //             "unit": pp.um_display.trim(),
          //             "quantity": 1,
          //             "warehouse": this.warehouse,
          //           })
          //         }
          //         else if (!this.isLoggedIn && this.priceshow == '1' && this.listprice != '1') {
          //           this.bulkPrice.push({
          //             "customer": this.GuestUserID,
          //             "item": pp.itemname,
          //             "unit": pp.um_display.trim(),
          //             "quantity": 1,
          //             "warehouse": this.Guestwarehouse,
          //           })
          //         }
          //       }
          //     }
          //   }
          //   this.objUnitArr = umList1;
          //   var finalUnitObj = [];
          //   if (this.ismultipleum == '1') {
          //   for (var i = 0; i < umList.length; i++) {
          //     for (var j = 0; j <= i; j++) {
          //       if (i == j) {           
          //         umList[i].LabelText = umList[i].Label + " (" + umArr[j].trim() + ")";           
          //         umList[i].umqty=umArr[j].trim();
          //         if(pp.MeasureUnit==umList[i].Label){
          //             pp.totqty=umList[i].umqty * pp.Quantity;
          //         }
          //       }
          //     }
          //   }
          // }
          // else{      
          //         umList[0].LabelText = umList[0].Label + " (" + umArr[(getindex-1)].trim() + ")";          
          //         umList[0].umqty=umArr[(getindex-1)].trim();
          //         if(pp.MeasureUnit==umList[0].Label){
          //           pp.totqty=umList[0].umqty * pp.Quantity;
          //       }
          // }    
          //   pp.unitlist = umList;
          //   this.objUnitArr=umList;
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
              items: this.itemstoavails,
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
                items: this.itemstoavails,
                warehouse: warehous,
                company_sy: Common.getWithExpiry("company_sy")
              }
            }
          }

          if (getitem != null && getitem != undefined) {
            this.dataService.getProductavailibity(getitem).subscribe((res: any) => {
              var availdata = res;
              for (var i = 0; i < this.cartProducts.length; i++) {
                this.cartProducts[i].isavails = false;
                this.cartProducts[i].productavails = [];
                this.cartProducts[i].warehouse = '';
                this.cartProducts[i].available = 0;
                if (availdata != null && availdata != undefined) {
                  for (var j = 0; j < availdata.length; j++) {
                    if (this.cartProducts[i].itemname == availdata[j].item) {
                      this.cartProducts[i].productavails.push(availdata[j]);
                      this.cartProducts[i].warehouse = (this.cartProducts[i].warehouse != '' ? this.cartProducts[i].warehouse + ', ' + availdata[j].warehouse : availdata[j].warehouse);
                      this.cartProducts[i].available = this.cartProducts[i].available + availdata[j].available;
                      if (this.addnewqtywithnewlogic == '1') {
                        this.cartProducts[i].availablenew = (availdata[j].available + availdata[j].on_po) - availdata[j].backorder;
                        if (this.cartProducts[i].availablenew > 0) {
                          this.cartProducts[i].isavails = true;
                        }
                      }
                      if (availdata[j].available > 0) {
                        this.cartProducts[i].isavails = true;
                        this.cartProducts[i].available1 = availdata[j].available;
                      }
                      else {
                        this.cartProducts[i].isavails = false;
                        this.cartProducts[i].available1 = 0;

                      }
                      if (this.addtonotavail == 0 && this.cartProducts[i].drop_ship == false && (this.addnewqtywithnewlogic == '1' ? this.cartProducts[i].availablenew : this.cartProducts[i].available1) == 0) {
                        this.toastr.error("Please remove out of stock item " + this.cartProducts[i].itemname + " to check out");
                        this.flagtosubmit = false;
                      }

                    }
                  }
                }
              }
            })
          }
        }
        this.cartTotal = total;
        this.getpriceforall();

      });
    } catch (ex) {
      this.sendMessage('stop');
    }
  }
  findandreplace(stringval) {
    try {
      stringval = stringval.trim();
      stringval = stringval.replace(new RegExp("\/", "g"), '');
      stringval = stringval.replace(new RegExp("#", "g"), '');
    } catch (ed) { }
    return stringval;
  }




  getpriceforall() {
    if (this.bulkPrice != null && this.bulkPrice != undefined && this.bulkPrice.length > 0) {
      this.cartService.getBulkPrice(this.bulkPrice).subscribe((res: any) => {
        var data = res;
        if (data != undefined && data != null && data.length > 0) {
          this.cartTotal = 0;
          for (var i = 0; i < this.cartProducts.length; i++) {
            for (var t = 0; t < this.cartProducts[i].unitlist.length; t++) {
              for (var j = 0; j < data.length; j++) {
                if (this.cartProducts[i].itemname == data[j].item && this.cartProducts[i].unitlist[t].Label == data[j].unit) {
                  
                  this.cartProducts[i].unitlist[t].Price = parseFloat(data[j].extension) / parseFloat(data[j].quantity);
                  this.cartProducts[i].unitlist[t].PricePer = parseFloat(data[j].extension) / parseFloat(data[j].quantity);
                  
                  if (this.cartProducts[i].itemname == data[j].item && this.cartProducts[i].unitMeasure == data[j].qty_unit) {
                    if(this.iskyraden && data[j].origin != 'CI' && data[j].origin != 'SP'){
                      this.cartProducts[i].PricePer = this.cartProducts[i].PricePer;
                    this.cartProducts[i].Price = (parseFloat(this.cartProducts[i].PricePer) * this.cartProducts[i].Quantity);
                    }
                    else{
                    this.cartProducts[i].PricePer = parseFloat(data[j].extension) / parseFloat(data[j].quantity);
                    this.cartProducts[i].Price = (parseFloat(data[j].extension) / parseFloat(data[j].quantity) * this.cartProducts[i].Quantity);
                    }
                    this.cartTotal = this.cartTotal + this.cartProducts[i].Price;
                  }
                  
                }
              }
            }
          }
        }
      });
    }
    else {

    }
  }
  Geterror() {
    this.cartService.GetErrordatabase().subscribe((res: any) => {
      var geterr = res;
    });
  }
  removenonnumeric(myString) {
    return myString.replace(/\D/g, '');
  }

  AddNewProducts() {

    if (this.AddNewItem == null || this.AddNewItem == '') {
      this.toastr.error("Please enter valid Item Name", 'Message!');
    }
    else if (this.AddNewQty == null || this.AddNewQty == '' || this.AddNewQty < 0) {
      this.toastr.error("Please enter valid Item Quantity", 'Message!');
    }
    else {
      try {
        this.dataService.getProductDetailNameForXref(this.AddNewItem, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
          var item1 = res;
          if (item1 != null && item1 != undefined) {

            var profile1 = JSON.parse(item1.profile1);
            if ((profile1[1] != "" && this.show3D == '1') && (profile1[2] == 'YES' || profile1[2] == 'yes')) {
              item1.IsBaseProduct = true;
            }
            else {
              item1.IsBaseProduct = false;
            }
          }


          if ((item1 != null && item1.IsGrouped == false && item1.IsBaseProduct == false) || (item1 != null && item1.IsGrouped == true && this.baseitemShow == '1')) {


            var usrid = null;
            if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
              usrid = Common.getWithExpiry("UserID") + Common.getWithExpiry("CustID");
            }
            else {
              usrid = Common.getWithExpiry("CustID");
            }

            // var cartProducts1=[];
            // this.cartService.getCartItemByUserID(usrid, Common.getWithExpiry("UserType")).subscribe((res:any) => {
            //   cartProducts1 = res;
            //var getproduct=null;
            item1.TotQty = 0;


            if (this.cartProducts != undefined && this.cartProducts.length > 0) {
              for (let cprod of this.cartProducts) {
                if (cprod.itemname == item1.itemname) {
                  var getums = JSON.parse(cprod.um);
                  var getumsqty = JSON.parse(cprod.umqty);
                  for (var i = 0; i < getums.length; i++) {
                    if (i == 0 && getums[i] != '') {
                      item1.firstum = getums[i];
                      if (item1.um_display == undefined || item1.um_display == null || item1.um_display == '') {
                        item1.um_display = item1.firstum;
                      }
                      item1.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
                      if (i == 0 && getums[i] == cprod.MeasureUnit) {
                        item1.TotQty = item1.TotQty + (cprod.Quantity * 1);
                      }
                      if (getums[i] == item1.um_display) {
                        item1.um_displayQty = 1;
                        item1.Qty = (cprod.Quantity * 1);
                      }
                    }
                    else if (i != 0 && getums[i] != '') {
                      if (getums[i] == cprod.MeasureUnit) {
                        item1.TotQty = item1.TotQty + (cprod.Quantity * getumsqty[i - 1]);

                      }
                      if (getums[i] == item1.um_display) {
                        item1.Qty = (cprod.Quantity * getumsqty[i - 1]);
                        item1.um_displayQty = getumsqty[i - 1];
                      }
                    }
                  }
                }
              }
            }
            //item1.list_price = 1;
            item1.quantity = this.AddNewQty;

            //var getqty=parseFloat(this.AddNewQty)+(getproduct==null?0:parseFloat(getproduct.Quantity)) 

            if (item1.TotQty == undefined || item1.TotQty == null || item1.TotQty == 0) {
              //getproduct = item1;
              item1.Quantity = item1.quantity;
              var getums = JSON.parse(item1.um);
              var getumsqty = JSON.parse(item1.umqty);
              for (var i = 0; i < getums.length; i++) {
                if (i == 0 && getums[i] != '') {
                  item1.firstum = getums[i];
                  item1.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
                  if (getums[i] == item1.um_display) {
                    item1.um_displayQty = 1;
                    item1.Qty = (item1.Quantity * 1);
                  }
                  if (getums[i] == item1.MeasureUnit) {
                    item1.TotQty = item1.TotQty + (item1.Quantity * 1);
                  }
                }

                else if (i != 0 && getums[i] != '') {
                  if (getums[i] == item1.um_display) {
                    item1.Qty = (item1.Quantity * getumsqty[i - 1]);
                    item1.um_displayQty = getumsqty[i - 1];
                  }
                  if (getums[i] == item1.MeasureUnit) {
                    item1.TotQty = item1.TotQty + (item1.Quantity * getumsqty[i - 1]);

                  }
                }
              }
            }
            var getitem12 = {
              items: item1.itemname,
              warehouse: Common.getWithExpiry("warehouse"),
              company_sy: Common.getWithExpiry("company_sy")
            }
            this.dataService.getProductavailibity(getitem12).subscribe((res: any) => {
              var availdata = res;
              if (this.addnewqtywithnewlogic == '1') {
                availdata[0].availablenew = (availdata[0].available + availdata[0].on_po) - availdata[0].backorder;
              }
              this.bulkPrice = [];

              this.bulkPrice.push({
                "customer": Common.getWithExpiry("CustID"),
                "item": this.AddNewItem,
                "quantity": item1.Qty,
                "warehouse": this.warehouse,
                "rounding": this.PriceRound,
                "qty_unit": item1.um_display.trim(),
                "company_sy": Common.getWithExpiry("company_sy")
              })
              this.cartService.getBulkPrice(this.bulkPrice).subscribe((res: any) => {
                var pricedata = res;

                if (pricedata != undefined && pricedata.length > 0) {                  
                  if(this.iskyraden && pricedata[0].origin != 'CI' && pricedata[0].origin != 'SP'){                    
                    item1.list_price = item1.list_price;
                  }
                  else{
                    item1.list_price = parseFloat(pricedata[0].extension) / parseFloat(pricedata[0].quantity);
                  }
                  var profilefor = null
                  if (this.AddToCartAsPerProfileNo == '1' && item1.profile1 != undefined) {
                    var profilefor = JSON.parse(item1.profile1);
                  }
                  else if (this.AddToCartAsPerProfileNo == '2' && item1.profile2 != undefined) {
                    var profilefor = JSON.parse(item1.profile2);
                  }
                  else if (this.AddToCartAsPerProfileNo == '3' && item1.profile3 != undefined) {
                    var profilefor = JSON.parse(item1.profile3);
                  }

                  if ((this.configforcartbyprofile == '1' && profilefor != undefined && profilefor != null && (profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1] == 'NO' || profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1].toLowerCase() == 'no')) && ((pricedata[0].origin != 'CI') && this.isLoggedIn)) {
                    this.toastr.error("Product is Not Available");
                    return;
                  }
                }
                //console.log('item1',item1);
                item1.totqty = parseFloat(item1.quantity) * parseFloat(item1.um_displayQty.toString());
                item1.TotQty = item1.TotQty + parseFloat(item1.quantity) * parseFloat(item1.um_displayQty.toString());
                if (item1.min != undefined && item1.min != "0" && item1.TotQty < item1.min && this.MinQty) {
                  this.toastr.error("Minimum quantity should be " + item1.min + ' of ' + this.getumdescbyumcode(item1.firstum));
                  return;
                }

                if (item1.max != undefined && item1.max != "0" && item1.TotQty > item1.max && this.MaxQty) {
                  this.toastr.error("Maximum quantity should be " + item1.max + ' of ' + this.getumdescbyumcode(item1.firstum));
                  return;
                }
                if (this.addtonotavail == 0 && ((this.addnewqtywithnewlogic == '1' ? availdata[0].availablenew : availdata[0].available) == 0 || (this.addnewqtywithnewlogic == '1' ? availdata[0].availablenew : availdata[0].available) == undefined) && item1.drop_ship == false) {
                  this.toastr.error("Product not available.", 'Cannot be added to cart!');
                  return;
                }
                try {
                  if (this.addtonotavail == 0 && item1.TotQty > (parseFloat((this.addnewqtywithnewlogic == '1' ? availdata[0].availablenew : availdata[0].available))) && item1.drop_ship == false) {
                    this.toastr.error("you can not add quantity more than available quantity.");
                    return;
                  }
                } catch (ed) { }

                if (item1.qty_warn != undefined && item1.qty_warn != "0" && this.Multiply == '1') {
                  if ((item1.quantity * parseFloat(item1.um_displayQty.toString())) % item1.qty_warn != 0) {
                    this.toastr.error("Please enter item in multiple of " + parseInt(item1.qty_warn) / parseInt(item1.um_displayQty) + ' of ' + this.getumdescbyumcode(item1.um_display));
                    return;
                  }
                }

                this.cartService.addProductToCart(item1, item1.um_display).subscribe((res: any) => {
                  this.getCartItems();
                  this.cartService.cartBroadCaster(res);
                  this.AddNewItem = '';
                  this.AddNewQty = '';
                  //this.openpopup();
                  //this.NewItem.nativeElement.focus();
                  //const element = this.renderer.selectRootElement("#NewItem");
                  //element.focus();
                  // $("#AddNewItem").focus();
                })
                // })
                // }
                // else{
                //   this.cartService.addProductToCart(usrid, Common.getWithExpiry("UserType"), item1, item1.um_display).subscribe((res:any) => {
                //     this.getCartItems();
                //     this.cartService.cartBroadCaster(res);
                //     this.AddNewItem = '';
                //     this.AddNewQty = '';
                //   })
                // }
              })
            });
            //})
          }
          else {
            this.toastr.error("Product is not available", 'Message!');
          }
        })
      }
      catch (exception) {
        this.toastr.error("Product is not available", 'Message!');
      }
    }
  }

  // addNote(event, i) {
  //   let j = 0;
  //   for (let prod of this.cartProducts) {
  //     if (i == j) {
  //       prod.Note = event.value;
  //       prod.list_price_per = prod.MeasureUnit;
  //       prod.list_price = prod.PricePer;
  //       prod.quantity = prod.Quantity;
  //       this.cartService.updateCart(Common.getWithExpiry("CustID"), Common.getWithExpiry("UserID"), prod).subscribe((res:any) => {
  //         this.cartService.cartBroadCaster(res);
  //       })
  //       break;
  //     }
  //     j++;
  //   }
  // }

  addNote(product) {
    product.canEditCode = false;
    this.cartService.updateCart(product).subscribe((res: any) => {
      this.cartService.cartBroadCaster(res);
    })
  }

  Clicktoedit(product, i) {
    product.canEditCode = true;
    // window.setTimeout(() => {
    const element = this.renderer.selectRootElement("#Product" + i.toString());
    element.focus();
    //});
  }


  updateCart(product, Unit, price) {
    product.Quantity = product.Quantity;
    product.unitMeasure = Unit;
    product.PricePer = price;
    product.Price = parseFloat(product.Quantity) * parseFloat(price);
    this.cartService.updateCart(product).subscribe((res: any) => {
      this.getCartItems();
      this.cartService.cartBroadCaster(res);

    })
  }
  updatenewcart(product) {
    this.cartService.updateCart(product).subscribe((res: any) => {
      this.getCartItems();
      this.cartService.cartBroadCaster(res);
    })
  }

  deleteProduct(product) {
    var usrid = null
    if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
      usrid = Common.getWithExpiry("UserID");
    }
    else {
      usrid = Common.getWithExpiry("CustID");
    }
    this.cartService.deleteCartItem(product.itemnumber, product.unitMeasure).subscribe((res: any) => {
      this.getCartItems();
      this.cartService.cartBroadCaster(res);
    });
  }
  ClearCart() {
    var usrid = null
    if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
      usrid = Common.getWithExpiry("UserID");
    }
    else {
      usrid = Common.getWithExpiry("CustID");
    }
    for (let prs of this.cartProducts) {
      this.cartService.deleteCartItem(prs.itemnumber, prs.unitMeasure).subscribe((res: any) => {
        this.getCartItems();
        this.cartService.cartBroadCaster(res);
      });
    }
  }
  checkout() {
    this.Checkforpricezero();


    if (this.flagtosubmit == false) {
      this.toastr.error("One or Many Product dont have their price please contact for price");
      return;
    }
    else {
      if (this.cartTotal >= parseFloat(this.web_order_min_amount)) {
        if (Common.getWithExpiry("UserType") == '5') {
          this.cartService.CreatesystaemUser(Common.getWithExpiry("CustID")).subscribe((res: any) => {
            var getflag = res;

            if (Common.getWithExpiry("IsPunchOut") == "Yes") {
              if (Common.getWithExpiry("PunchOutType") == "Southern") {
                var Line = [];
                var j = 0;
                for (let prod of this.cartProducts) {
                  j = j + 1;
                  Line.push({
                    "reference": j,
                    "item": prod.itemname,
                    "image": prod.image,
                    "quantity": prod.Quantity,
                    "descrnew": prod.descrstring,
                    "descr": prod.descrarray,
                    "um_o": prod.unitMeasure,
                    "Note": prod.Note,
                    "price": prod.Price,
                    "price_per": prod.PricePer,
                    "product_line": prod.ProductLine,
                    "productline": prod.ProductLine,
                    "RowID": prod.RowID,
                    "freeform": "",
                    "company_sy": Common.getWithExpiry("company_sy"),
                    "order": "",
                    "childitem": prod.itemname
                  });
                }

                var finalObj = JSON.parse(Common.getWithExpiry("finalObj"));

                finalObj.lines = Line;

                Common.setWithExpiry("finalObj", JSON.stringify(finalObj));

                this.router.navigate(['review-order']);
              }
              else {
                this.setFinalObject();
              }
            }
            else {
              this.router.navigate(['checkout']);
            }

            //this.router.navigate(['checkout']);
          });
        }
        else {
          if (Common.getWithExpiry("IsPunchOut") == "Yes") {
            if (Common.getWithExpiry("PunchOutType") == "Southern") {
              var Line = [];
              var j = 0;
              for (let prod of this.cartProducts) {
                j = j + 1;
                Line.push({
                  "reference": j,
                  "item": prod.itemname,
                  "image": prod.image,
                  "quantity": prod.Quantity,
                  "descrnew": prod.descrstring,
                  "descr": prod.descrarray,
                  "um_o": prod.unitMeasure,
                  "Note": prod.Note,
                  "price": prod.Price,
                  "price_per": prod.PricePer,
                  "product_line": prod.ProductLine,
                  "productline": prod.ProductLine,
                  "RowID": prod.RowID,
                  "freeform": "",
                  "company_sy": Common.getWithExpiry("company_sy"),
                  "order": "",
                  "childitem": prod.itemname
                });
              }

              var finalObj = JSON.parse(Common.getWithExpiry("finalObj"));

              finalObj.lines = Line;

              Common.setWithExpiry("finalObj", JSON.stringify(finalObj));

              this.router.navigate(['review-order']);
            }
            else {
              this.setFinalObject();
            }
          }
          else {
            this.router.navigate(['checkout']);
          }
        }
      }
      else {
        this.toastr.error("Order" + this.cartTotal + " Minimum Value Should Be $" + this.web_order_min_amount, 'Message!');
      }
    }
  }
  addqty(order){
    if(order.Quantity==undefined){
      order.Quantity=1;
    }
    else if(order.Quantity>=0){
      order.Quantity=order.Quantity+1;
    }
    else{
      order.Quantity=0;
    }
    this.onUnitChange('',order);
  }
  minusqty(order){
    if(order.Quantity==undefined){
      order.Quantity=1;
    }
    else if(order.Quantity>0){
      order.Quantity=order.Quantity-1;
    }
    else{
      order.Quantity=0;
    }
    this.onUnitChange('',order);
  }

  setFinalObject() {
    var headLN = {
      "billPhone": this.customer.phone,
      "billFax": this.customer.fax,
      "ship_id": "",
      "wanted_date": "", //new Date(this.head.WantedDate),
      "cancel_date": "",
      "job_rel": "",
      "cell_phone": "",
      "cu_po": "",
      "orderby_phone": this.customer.phone,
      "email": "",
      "terms_code": "",
      "ship_via_code": "",
      "ship_via_acct": "",
      "Frieght": "",
      "c_tot_code_1": "FR",
      "c_tot_code_amt_1": "",
      "customer": Common.getWithExpiry("CustID"),
      "rec_type": "O",
      "warehouse": Common.getWithExpiry("warehouse"),
      "order_by": Common.getWithExpiry("CustID"),
      "source_code": "web",
      "s_adr": this.customer.adr,
      "s_country_code": this.customer.country_code,
      "s_name": "",
      "s_st": this.customer.state,
      "s_postal_code": this.customer.postal_code,
      "company_sy": Common.getWithExpiry("company_sy"),
      "orderid": 0,
      "orderstatus": true,
      "response": "",
      "echo": true,
      "complete": false,
      "order": "",
      "bill_phone": this.customer.phone,
      "bill_fax": this.customer.fax,
      "o_tot_taxable_it": 0,
      "o_tot_tax_amt": 0,
      "o_tot_net_ar": 0,
    };

    var Line = [];
    var j = 0;
    for (let prod of this.cartProducts) {
      if (Common.getWithExpiry("IsPunchOut") == "Yes") {
        if (Common.getWithExpiry("PunchOutType") == "KINTER") {
          if (prod.dept == undefined || prod.dept == null || prod.dept == '') {
            this.toastr.error("Please select Deaprtment for all products");
            return
          }
        }
      }

      j = j + 1;
      Line.push({
        "reference": j,
        "item": prod.itemname,
        "image": prod.image,
        "quantity": prod.Quantity,
        "descr1": prod.descrarray,
        "descr": prod.descr,
        "um_o": prod.unitMeasure,
        "Note": prod.Note,
        "price": prod.Price,
        "price_per": prod.PricePer,
        "product_line": prod.ProductLine,
        "productline": prod.ProductLine,
        "RowID": "",
        "freeform": "",
        "company_sy": Common.getWithExpiry("company_sy"),
        "order": "",
        "childitem": prod.itemname,
        "dept": prod.dept,
        "deptname":this.getvaluebycustomerdropdown(prod.dept),
        "links": prod.links
      });
    }

    var finalObj = {
      "head": headLN,
      "lines": Line,
      //"notes": this.head.notes,
      "echo": true,
      "complete": false,
      "company_sy": Common.getWithExpiry("company_sy")
    }
    Common.setWithExpiry("finalObj", JSON.stringify(finalObj));
    this.router.navigate(['review-order']);
  }

  Register() {
    var commontype = (Common.getWithExpiry("businesstype") == undefined ? "B2C" : Common.getWithExpiry("businesstype"));
    if (commontype == "B2C") {
      this.router.navigate(['b2c-registration']);
    }
    else {
      this.router.navigate(['b2b-registration']);
    }
  }
  gotoregister() {
    if(this.iskyraden){
      Common.setWithExpiry("carturl", 'viewcart');  
      this.router.navigate(['create-account']);
    }
    else{
      this.router.navigate(['registration']);
    }
  }
  gotologin() {
    Common.setWithExpiry("carturl", 'checkout');
    this.router.navigate(['login']);
  }
  onUnitChange(unit, product) {

    if (unit == '' || unit == undefined) {
      unit = product.MeasureUnit;
    }
    else {
      unit = unit.split(' ')[1];
    }
    var getproduct = null;
    product.TotQty = 0;
    for (let cprod of this.cartProducts) {
      if (cprod.itemname == product.itemname && product.MeasureUnit != cprod.MeasureUnit) {
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
              getproduct.um_displayQty = 1;
              getproduct.Qty = (getproduct.Quantity * 1);
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

    var getunits = JSON.parse(product.um);
    var firstum = getunits[0];
    if (product.Quantity == 0 || product.Quantity == undefined || product.Quantity == null || product.Quantity < 0) {
      this.toastr.error("Please Insert Valid Quantity", 'Message!');
      product.Quantity = 1;
      return;
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
            product.TotQty = product.TotQty + (getproduct.Quantity * 1);
          }
          if (getums[i] == getproduct.um_display) {
            getproduct.um_displayQty = 1;
            getproduct.Qty = (getproduct.Quantity * 1);
          }
        }
        else if (i == 0 && getums[i] != '') {
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

    for (let prod of product.unitlist) {
      if (unit == prod.Label) {
        // unit = prod.LabelText;
        // var getum = unit.split(' ')[1].replace('(', '').replace(')', '').trim();
        var getum = this.removenonnumeric(prod.LabelText);
        // product.PricePer = prod.Price;
        product.list_price_per = product.MeasureUnit;
        product.quantity = product.Quantity;
        // product.list_price = prod.Price;

        product.Price = parseFloat(product.PricePer) * parseFloat(product.Quantity);
        product.totqty = parseFloat(product.quantity) * parseFloat(getum);
        product.TotQty = product.TotQty + parseFloat(product.quantity) * parseFloat(getum);
        if (product.min != undefined && product.min != "0" && product.TotQty < product.min && this.MinQty) {
          this.toastr.error("Minimum quantity should be " + product.min + ' of ' + this.getumdescbyumcode(firstum));
          this.ngOnInit();
          return;
        }

        if (product.max != undefined && product.max != "0" && product.TotQty > product.max && this.MaxQty) {
          this.toastr.error("Maximum quantity should be " + product.max + ' of ' + this.getumdescbyumcode(firstum));
          this.ngOnInit();
          return;
        }
        if (product.qty_warn != "0" && this.Multiply == '1') {

          if ((product.quantity * parseFloat(product.TotQty)) % product.qty_warn != 0) {
            this.toastr.error("Please enter item in multiple of " + parseInt(product.qty_warn) / parseFloat(product.um_displayQty) + ' of ' + this.getumdescbyumcode(unit));
            this.ngOnInit();
            return;
          }
        }

        var usrid = null;
        if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
          usrid = Common.getWithExpiry("UserID");
        }
        else {
          usrid = Common.getWithExpiry("CustID");
        }
        var getitem12 = {
          items: product.itemname,
          warehouse: Common.getWithExpiry("warehouse"),
          company_sy: Common.getWithExpiry("company_sy")
        }
        this.dataService.getProductavailibity(getitem12).subscribe((res: any) => {
          var availdata = res;
          if (this.addnewqtywithnewlogic == '1') {
            availdata[0].availablenew = (availdata[0].available + availdata[0].on_po) - availdata[0].backorder;
          }
          if (this.addtonotavail == 0 && (availdata[0].available == 0 || availdata[0].available == undefined) && product.drop_ship == false) {
            this.toastr.error("Product not available.", 'Cannot be added to cart!');
            return;
          }
          try {
            if (this.addtonotavail == 0 && product.TotQty > (parseFloat((this.addnewqtywithnewlogic == '1' ? availdata[0].availablenew : availdata[0].available))) && product.drop_ship == false) {
              this.toastr.error("you can not add quantity more than available quantity.");
              return;
            }
          } catch (ed) { }
          var gunit = unit.split(' ')[0];
          this.bulkPrice = [];
          this.bulkPrice.push({
            "customer": Common.getWithExpiry("CustID"),
            "item": product.itemname,
            // "unit": gunit.trim(),
            "quantity": product.quantity,
            "warehouse": this.warehouse,
            "rounding": this.PriceRound,
            "qty_unit": gunit.trim(),
            "company_sy": Common.getWithExpiry("company_sy")
          })
          this.cartService.getBulkPrice(this.bulkPrice).subscribe((res: any) => {
            var pricedata = res;
            if (pricedata != undefined && pricedata.length > 0) {
              if(this.iskyraden && pricedata[0].origin != 'CI' && pricedata[0].origin != 'SP'){
                product.PricePer = product.PricePer;
                product.list_price = product.PricePer;
              }
              else{
              product.list_price = parseFloat(pricedata[0].extension) / parseFloat(pricedata[0].quantity);
              product.PricePer = parseFloat(pricedata[0].extension) / parseFloat(pricedata[0].quantity);
              }
            }
            this.updatenewcart(product);
          });
        })
        // }
        // else{
        //   this.updatenewcart(product);
        // }
      }
    }

  }
}
