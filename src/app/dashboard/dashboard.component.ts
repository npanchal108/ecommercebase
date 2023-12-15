import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { DataService } from '../services/data.service';
import { RegistrationService } from '../services/registration.service';
import { Common } from '../../app/model/common.model';
import { SEOService } from '../services/seo.service';
import { CartService } from '../services/cart.service';
import { LoadingService } from '../services/loading.service';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  webtype: string | undefined;
  isSubmitPermission: boolean = false;
  isShowPendingOrders: boolean = false;
  isShowopenshipment: boolean = false;
  isShowBackOrders: boolean = false;
  isShowOpenInvoice: boolean = false;
  isShowOrderHistory: boolean = false;
  isShowPurchaseHistory: boolean = false;
  isShowContractList: boolean = false;
  isShowuserSupport:boolean=false;
  isShowPendingOrdersConf: boolean = false;
  isShowopenshipmentConf: boolean = false;
  isShowBackOrdersConf: boolean = false;
  isShowOpenInvoiceConf: boolean = false;
  isShowOrderHistoryConf: boolean = false;
  isShowPurchaseHistoryConf: boolean = false;
  isShowHelpDeskConf: boolean = false;
  isShowContractListConf: boolean = false;
  config: any = {
    displayKey: "textad", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select User', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search User', // label thats displayed in search input,

    // searchOnKey: 'textad' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  UserType: any;
  customerlist: any = [];
  customer: any;
  custdetails: any;
  loginRes: any = {};
  isshowmenu: any;
  contactDetails: any;
  profileinfo: any;
  ismulti: any;
  iswishshow: any;
  isrfqshow: any;
  IsMuscle: any;
  puchasehistorylable: any;
  isShowCategory: any;
  categorylabel: any;
  productlabel: any;
  ismanager: any;
  customerlable: any;
  dropdownSettings1: any = {
    singleSelection: true,
    idField: 'customer1',
    textField: 'textad',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
    isDisabled: false
  };
  wishlistlable: any;
  newPermission: any;
  Allconfigurationlist: any = [];
  dashboardlinks: any;
  IsRMA: any;
  RMALable: any;
  bannerindashboard:any='1';
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true };
  homebannerList:any;
  salesmansubuser:any;
  subuser:any;
  iskrayden:any;
  backorderlable:any="Expected Shipment";
  constructor(private loadingService: LoadingService, private cartService: CartService, private seoService: SEOService, private registerService: RegistrationService, private router: Router, private dataService: DataService) {
    this.GetDashboardPageConfigurations();
    this.getdashboardlinks();
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Dashboard - ' + geturl);
    this.seoService.setkeywords('Dashboard - ' + geturl);
    this.seoService.setdescription('Dashboard - ' + geturl);
    this.iskrayden=environment.iskyraden;
    if(this.iskrayden){
      this.backorderlable="Expected Shipment";
    }
    else{
      this.backorderlable="Back Orders";
    }
try{
    this.subuser = Common.getWithExpiry("subuser").toString();
}catch(ed){}
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'customer1',
      textField: 'textad',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      isDisabled: false
    };
    //this.GetCustomerProductLable();
    //this.GetConfigforwishlistlable();
    //this.getwishconfig();
    //this.gettreenode();
    //this.getPendingOrderSetting();
    //this.getBackOrderItemsSetting();
    //this.getOpenInvoiceSetting();
    //this.getOrderHistorySetting();
    //this.getPurchaseHistorySetting();
    //this.getContractListSetting();
    //this.GetHelpDesksetting();
    //this.getIsMuscle();
    //this.multiuser();
    //this.getrfqconfig();

  }
  sendMessage(message:any): void {
    this.loadingService.LoadingMessage(message);
  }
  getdashboardlinks() {
    try {
      if (Common.getWithExpiry('dashboardlinks') != undefined) {
        var dashboardlinks = JSON.parse(Common.getWithExpiry('dashboardlinks'));
      }
    } catch (ed) { }
    if (dashboardlinks == null || dashboardlinks == undefined || dashboardlinks.length == 0) {
      this.dataService.Getdashboardlinkslist().subscribe((res: any) => {
        this.dashboardlinks = res;
        Common.setWithExpiry('dashboardlinks', JSON.stringify(this.dashboardlinks));
      });
    }
    else {
      this.dashboardlinks = dashboardlinks;
    }
  }
  GetDashboardPageConfigurations() {

    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      try {
        this.Allconfigurationlist = JSON.parse(Common.getWithExpiry("Allconfigs"));
      } catch (ed) { }
    }
    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      this.dataService.GetAllConfiguration().subscribe((data: any) => {
        this.Allconfigurationlist = data;
        Common.setWithExpiry("Allconfigs", JSON.stringify(this.Allconfigurationlist));
        for (var i = 0; i < this.Allconfigurationlist.length; i++) {

          if (this.Allconfigurationlist[i].ConfigKey == "CustomerProductLable") {
            this.customerlable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "salesmansubuser") {
            this.salesmansubuser = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "NewPermission") {
            this.newPermission = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "TreeNode") {
            this.isShowCategory = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "wishlistlable") {
            this.wishlistlable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "categorylabel") {
            this.categorylabel = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "productlabel") {
            this.productlabel = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "IsMuscle") {
            this.IsMuscle = this.Allconfigurationlist[i].ConfigValue;
            if (this.IsMuscle == '1' && this.UserType == '3') {
              this.puchasehistorylable = "Quick Order";
            }
            else {
              this.puchasehistorylable = "Purchase History";
            }
          }
          if (this.Allconfigurationlist[i].ConfigKey == "multiuser") {
            this.ismulti = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "iswishlist") {
            this.iswishshow = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "isrfqlist") {
            this.isrfqshow = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "websitetype") {
            this.webtype = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "PendingOrders") {
            this.isShowPendingOrdersConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
          }
          if (this.Allconfigurationlist[i].ConfigKey == "OpenShipment") {
            this.isShowopenshipmentConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
          }
          if (this.Allconfigurationlist[i].ConfigKey == "BackOrderItems") {
            this.isShowBackOrdersConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
          }
          if (this.Allconfigurationlist[i].ConfigKey == "OpenInvoice") {
            this.isShowOpenInvoiceConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
          }
          if (this.Allconfigurationlist[i].ConfigKey == "OrderHistory") {
            this.isShowOrderHistoryConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
          }
          if (this.Allconfigurationlist[i].ConfigKey == "PurchaseHistory") {
            this.isShowPurchaseHistoryConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
          }
          if (this.Allconfigurationlist[i].ConfigKey == "ContractList") {
            this.isShowContractListConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
          }
          if (this.Allconfigurationlist[i].ConfigKey == "HelpDesk") {
            this.isShowHelpDeskConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
          }
          if (this.Allconfigurationlist[i].ConfigKey == "IsRMA") {
            this.IsRMA = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "RMALable") {
            this.RMALable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "bannerindashboard") {
            this.bannerindashboard = this.Allconfigurationlist[i].ConfigValue;
            if(this.bannerindashboard=='1'){
              this.bannerImage();
            }
          }

        }
      })
    }
    else {
      for (var i = 0; i < this.Allconfigurationlist.length; i++) {

        if (this.Allconfigurationlist[i].ConfigKey == "CustomerProductLable") {
          this.customerlable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "salesmansubuser") {
          this.salesmansubuser = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "NewPermission") {
          this.newPermission = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "TreeNode") {
          this.isShowCategory = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "wishlistlable") {
          this.wishlistlable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "categorylabel") {
          this.categorylabel = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "productlabel") {
          this.productlabel = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "IsMuscle") {
          this.IsMuscle = this.Allconfigurationlist[i].ConfigValue;
          if (this.IsMuscle == '1' && this.UserType == '3') {
            this.puchasehistorylable = "Quick Order";
          }
          else {
            this.puchasehistorylable = "Purchase History";
          }
        }
        if (this.Allconfigurationlist[i].ConfigKey == "multiuser") {
          this.ismulti = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "iswishlist") {
          this.iswishshow = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "isrfqlist") {
          this.isrfqshow = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "websitetype") {
          this.webtype = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "PendingOrders") {
          this.isShowPendingOrdersConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
        }
        if (this.Allconfigurationlist[i].ConfigKey == "OpenShipment") {
          this.isShowopenshipmentConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
        }
        if (this.Allconfigurationlist[i].ConfigKey == "BackOrderItems") {
          this.isShowBackOrdersConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
        }
        if (this.Allconfigurationlist[i].ConfigKey == "OpenInvoice") {
          this.isShowOpenInvoiceConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
        }
        if (this.Allconfigurationlist[i].ConfigKey == "OrderHistory") {
          this.isShowOrderHistoryConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
        }
        if (this.Allconfigurationlist[i].ConfigKey == "PurchaseHistory") {
          this.isShowPurchaseHistoryConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
        }
        if (this.Allconfigurationlist[i].ConfigKey == "ContractList") {
          this.isShowContractListConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
        }
        if (this.Allconfigurationlist[i].ConfigKey == "HelpDesk") {
          this.isShowHelpDeskConf = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
        }
        if (this.Allconfigurationlist[i].ConfigKey == "IsRMA") {
          this.IsRMA = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "RMALable") {
          this.RMALable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "bannerindashboard") {
          this.bannerindashboard = this.Allconfigurationlist[i].ConfigValue;
          if(this.bannerindashboard=='1'){
            this.bannerImage();
          }
        }
      }
    }
  }
  bannerImage() {   
    this.dataService.getHomeBanner().subscribe((res: any) => {
      this.homebannerList = res;
    });   
  }

  gettreenode() {
    this.isShowCategory = Common.getWithExpiry("TreeNode");
    if (this.isShowCategory == null || this.isShowCategory == undefined || this.isShowCategory == 'undefined') {
      this.dataService.GetTreeNodeValue().subscribe((data1: any) => {
        this.isShowCategory = data1;
        Common.setWithExpiry("TreeNode", this.isShowCategory);
        if (this.isShowCategory != "1") {
          this.getproductlabel();
        }
        else {
          this.getcategorylabel();
        }
      })
    }
    else {
      if (this.isShowCategory != "1") {
        this.getproductlabel();
      }
      else {
        this.getcategorylabel();
      }
    }
  }
  getcategorylabel() {
    this.categorylabel = Common.getWithExpiry("categorylabel");
    if (this.categorylabel == null || this.categorylabel == undefined) {
      this.dataService.GetConfigForsidecategorylabel().subscribe((data1: any) => {
        this.categorylabel = data1;
        Common.setWithExpiry("categorylabel", this.categorylabel);
      })
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
  GetCustomerProductLable() {
    this.customerlable = Common.getWithExpiry("customerlable");
    if (this.customerlable == null || this.customerlable == undefined) {
      this.dataService.GetCustomerProductLable().subscribe((data1: any) => {
        this.customerlable = data1;
        Common.setWithExpiry("customerlable", this.customerlable);
      })
    }
  }
  getproductlabel() {
    this.productlabel = Common.getWithExpiry("productlabel");
    if (this.productlabel == null || this.productlabel == undefined) {
      this.dataService.GetConfigForsideproductlabel().subscribe((data1: any) => {
        this.productlabel = data1;
        Common.setWithExpiry("productlabel", this.productlabel);
      })
    }
  }
  getIsMuscle() {
    this.IsMuscle = Common.getWithExpiry("IsMuscle");
    if (this.IsMuscle == null || this.IsMuscle == undefined) {
      this.dataService.GetConfigForIsMuscle().subscribe((data: any) => {
        this.IsMuscle = data;
        Common.setWithExpiry("IsMuscle", this.IsMuscle);
        if (this.IsMuscle == '1' && this.UserType == '3') {
          this.puchasehistorylable = "Quick Order";
        }
        else {
          this.puchasehistorylable = "Purchase History";
        }
      })
    }
    else {
      if (this.IsMuscle == '1' && this.UserType == '3') {
        this.puchasehistorylable = "Quick Order";
      }
      else {
        this.puchasehistorylable = "Purchase History";
      }
    }
  }
  multiuser() {
    this.ismulti = Common.getWithExpiry("ismulti");
    if (this.ismulti == null || this.ismulti == undefined) {
      this.dataService.Allowmultiuser().subscribe((data: any) => {
        this.ismulti = data;
        Common.setWithExpiry("ismulti", this.ismulti);
      })
    }
  }
  getwishconfig() {
    this.iswishshow = Common.getWithExpiry("this.iswishshow");
    if (this.iswishshow == null || this.iswishshow == undefined) {
      this.dataService.Getwishlistfeatureonoff().subscribe((res: any) => {
        this.iswishshow = res;
        Common.setWithExpiry("this.iswishshow", this.iswishshow);
      });
    }
  }
  getrfqconfig() {
    this.isrfqshow = Common.getWithExpiry("isrfqshow");
    if (this.isrfqshow == null || this.isrfqshow == undefined || this.isrfqshow == '') {
      this.dataService.Getrfqlistfeatureonoff().subscribe((res: any) => {
        this.isrfqshow = res;
        Common.setWithExpiry("isrfqshow", this.isrfqshow);
      });
    }
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  ngOnInit() {
    this.gototop();

    if (this.newPermission == "1") {
      // var profUserType = Common.getWithExpiry("UserType");
      // if (profUserType == "customer" || profUserType == "sales") {
      this.UserType = (Common.getWithExpiry("SalesUserType") == null ? (Common.getWithExpiry("UserType") == null ? "1" : Common.getWithExpiry("UserType")) : Common.getWithExpiry("SalesUserType"));
      if (this.UserType == '3' || this.UserType == 3) {
        var permis = JSON.parse(Common.getWithExpiry("ProfileLog"));
        this.ismanager = permis[1];
      }
      else {
        this.ismanager = true;
      }
      // }
      // else {
      //   var permis = JSON.parse(Common.getWithExpiry("ProfileLog"));
      //   this.ismanager = permis[1];
      // }
    }
    else {
      this.UserType = (Common.getWithExpiry("SalesUserType") == null ? (Common.getWithExpiry("UserType") == null ? "1" : Common.getWithExpiry("UserType")) : Common.getWithExpiry("SalesUserType"));
      if (this.UserType == '3' || this.UserType == 3) {
        this.ismanager = Common.getWithExpiry("IsManager")
      }
    }
    // this.webtype = this.dataService.Getconfigbykey("websitetype");
    //     if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
    //         this.webtype = Common.getWithExpiry("websitetype");
    //     }
    //     if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
    //         this.dataService.GetWebsiteType().subscribe((data: any) => {
    //             this.webtype = data;
    //             Common.setWithExpiry("websitetype", this.webtype);
    //         })
    //     }


    this.isshowmenu = Common.getWithExpiry("CustID");
    this.UserType = (Common.getWithExpiry("SalesUserType") == null ? (Common.getWithExpiry("UserType") == null ? "1" : Common.getWithExpiry("UserType")) : Common.getWithExpiry("SalesUserType"));
    if (this.UserType == "2") {
      var salesman = Common.getWithExpiry("SalesUserID").toString();
      var subuser = Common.getWithExpiry("subuser").toString();
      try {
        this.customerlist = JSON.parse(Common.getWithExpiry("customerlist" + salesman));
      } catch (ed) { }
      if (this.customerlist == undefined || this.customerlist == null || this.customerlist.length == 0) {
        this.sendMessage('start');
        this.dataService.getcustomerbysalesman(salesman,subuser).subscribe((res: any) => {
          this.sendMessage('stop');
          this.customer = Common.getWithExpiry("CustID");
          this.customerlist = res;

          for (var i = 0; i < this.customerlist.length; i++) {
            this.customerlist[i].textad = this.customerlist[i].customer1 + '-' + this.customerlist[i].name;
            if(this.customerlist[i].un_sale){
              this.customerChange(this.customerlist[i]);
            }
          }
          
          if (this.customer != undefined && this.customer != null && this.customer != '') {
            this.registerService.GetContactsForProfile(this.customer).subscribe((res1: any) => {
              this.contactDetails = res1;
              this.registerService.GetProfileDetails(this.customer).subscribe((res2: any) => {
                this.profileinfo = res2;
              })
            })

            for (var i = 0; i < this.customerlist.length; i++) {
              if (this.customer != undefined && this.customer != null && this.customer != '') {
              if (this.customerlist[i].customer1 == this.customer) {
                this.custdetails = this.customerlist[i];
                var getadr = this.custdetails.adr.trim().replace('[', '').replace(']', '').split(',');
                var newadr = '';
                for (var j = 0; j < getadr.length; j++) {
                  getadr[j] = getadr[j].trim().replace('"', '').replace('"', '');
                  if (getadr[j] != '') {
                    newadr = newadr + "  " + getadr[j];
                  }
                }
                this.custdetails.adr = newadr;
                //this.customer=this.custdetails.customer;
                break;
              }
            }
          
          else{
            if(this.customerlist[i].un_sale){
              this.customerChange(this.customerlist[i]);
            }
          }
        }
        if(this.customerlist.length==1){
          this.customerChange(this.customerlist[0]);
        }
          }
          Common.setWithExpiry("customerlist" + salesman, JSON.stringify(this.customerlist));
        });
      }
      else {
        this.customer = Common.getWithExpiry("CustID");
        // for (var i = 0; i < this.customerlist.length; i++) {
        //   this.customerlist[i].textad = this.customerlist[i].customer1 + '-' + this.customerlist[i].name;
        // }
        if (this.customer != undefined && this.customer != null && this.customer != '') {
          this.registerService.GetContactsForProfile(this.customer).subscribe((res1: any) => {
            this.contactDetails = res1;
            this.registerService.GetProfileDetails(this.customer).subscribe((res2: any) => {
              this.profileinfo = res2;
            })
          })
          
          for (var i = 0; i < this.customerlist.length; i++) {
            if (this.customer != undefined && this.customer != null && this.customer != '') {
            if (this.customerlist[i].customer1 == this.customer) {
              this.custdetails = this.customerlist[i];
              var getadr = this.custdetails.adr.trim().replace('[', '').replace(']', '').split(',');
              var newadr = '';
              for (var j = 0; j < getadr.length; j++) {
                getadr[j] = getadr[j].trim().replace('"', '').replace('"', '');
                if (getadr[j] != '') {
                  newadr = newadr + "  " + getadr[j];
                }
              }
              this.custdetails.adr = newadr;
              break;
            }
          }
          else{
            if(this.customerlist[i].un_sale){
              this.customerChange(this.customerlist[i]);
            }
          }
          }
          if(this.customerlist.length==1){
            this.customerChange(this.customerlist[0]);
          }
        }
      }


      if(subuser!=undefined && subuser!=''){
        var permissions = [];
        permissions = Common.getWithExpiry("Permission").split(';');

        if (permissions.indexOf("OE") != -1) {
          this.isSubmitPermission = true;
        }
        if (permissions.indexOf("PO") != -1) {
          this.isShowPendingOrders = true;
        }
        if (permissions.indexOf("OS") != -1) {
          this.isShowopenshipment = true;
        }
        if (permissions.indexOf("BO") != -1) {
          this.isShowBackOrders = true;
        }
        if (permissions.indexOf("UI") != -1) {
          this.isShowOpenInvoice = true;
        }
        if (permissions.indexOf("OH") != -1) {
          this.isShowOrderHistory = true;
        }
        if (permissions.indexOf("PH") != -1) {
          this.isShowPurchaseHistory = true;
        }
        if (permissions.indexOf("CP") != -1) {
          this.isShowContractList = true;
        }
        if (permissions.indexOf("US") != -1) {
          this.isShowuserSupport = true;
        }
      }
      else{
      this.isSubmitPermission = true;
      this.isShowPendingOrders = true;
      this.isShowopenshipment = true;
      this.isShowBackOrders = true;
      this.isShowOpenInvoice = true;
      this.isShowOrderHistory = true;
      this.isShowPurchaseHistory = true;
      this.isShowContractList = true;
      this.isShowuserSupport=true;
      }
      //this.customerlist = this.dataService.getcustomerbysalesman(salesman);
    }
    else if (Common.getWithExpiry("UserType") == "3") {
      this.isSubmitPermission = false;
      this.isShowPendingOrders = false;
      this.isShowopenshipment = false;
      this.isShowBackOrders = false;
      this.isShowOpenInvoice = false;
      this.isShowOrderHistory = false;
      this.isShowPurchaseHistory = false;
      this.isShowContractList = false;
      this.isShowuserSupport=false;

      if(this.iskrayden){
        var email =  Common.getWithExpiry("useremail");
        try {
          this.customerlist = JSON.parse(Common.getWithExpiry("customerlist1" + email));
        } catch (ed) { }
        if (this.customerlist == undefined || this.customerlist == null || this.customerlist.length == 0) {
          this.sendMessage('start');
          this.dataService.GetcustomerListbysubuseremail(email).subscribe((res: any) => {
            this.sendMessage('stop');
            this.customer = Common.getWithExpiry("CustID");
            this.customerlist = res;
  
            for (var i = 0; i < this.customerlist.length; i++) {
              this.customerlist[i].textad = this.customerlist[i].customer1 + '-' + this.customerlist[i].name;
              if(this.customerlist[i].un_sale){
                this.customerChange(this.customerlist[i]);
              }
            }
  
            if (this.customer != undefined && this.customer != null && this.customer != '') {
              this.registerService.GetContactsForProfile(this.customer).subscribe((res1: any) => {
                this.contactDetails = res1;
                this.registerService.GetProfileDetails(this.customer).subscribe((res2: any) => {
                  this.profileinfo = res2;
                })
              })
  
              for (var i = 0; i < this.customerlist.length; i++) {
                if (this.customer != undefined && this.customer != null && this.customer != '') {
                if (this.customerlist[i].customer1 == this.customer) {
                  this.custdetails = this.customerlist[i];
                  var getadr = this.custdetails.adr.trim().replace('[', '').replace(']', '').split(',');
                  var newadr = '';
                  for (var j = 0; j < getadr.length; j++) {
                    getadr[j] = getadr[j].trim().replace('"', '').replace('"', '');
                    if (getadr[j] != '') {
                      newadr = newadr + "  " + getadr[j];
                    }
                  }
                  this.custdetails.adr = newadr;
                  //this.customer=this.custdetails.customer;
                  break;
                }
              }
            
            else{
              if(this.customerlist[i].un_sale){
                this.customerChange(this.customerlist[i]);
              }
            }
          }
            }
            Common.setWithExpiry("customerlist" + salesman, JSON.stringify(this.customerlist));
          });
        }
        else {
          this.customer = Common.getWithExpiry("CustID");
          // for (var i = 0; i < this.customerlist.length; i++) {
          //   this.customerlist[i].textad = this.customerlist[i].customer1 + '-' + this.customerlist[i].name;
          // }
          if (this.customer != undefined && this.customer != null && this.customer != '') {
            this.registerService.GetContactsForProfile(this.customer).subscribe((res1: any) => {
              this.contactDetails = res1;
              this.registerService.GetProfileDetails(this.customer).subscribe((res2: any) => {
                this.profileinfo = res2;
              })
            })
  
            for (var i = 0; i < this.customerlist.length; i++) {
              if (this.customer != undefined && this.customer != null && this.customer != '') {
              if (this.customerlist[i].customer1 == this.customer) {
                this.custdetails = this.customerlist[i];
                var getadr = this.custdetails.adr.trim().replace('[', '').replace(']', '').split(',');
                var newadr = '';
                for (var j = 0; j < getadr.length; j++) {
                  getadr[j] = getadr[j].trim().replace('"', '').replace('"', '');
                  if (getadr[j] != '') {
                    newadr = newadr + "  " + getadr[j];
                  }
                }
                this.custdetails.adr = newadr;
                break;
              }
            }
            else{
              if(this.customerlist[i].un_sale){
                this.customerChange(this.customerlist[i]);
              }
            }
            }
  
          }
        }
      }


      if (this.newPermission == "1") {
        //var profUserType = Common.getWithExpiry("ProfileLog");
        //if (profUserType == "customer" || profUserType == "sales") {
        // this.isSubmitPermission = true;
        // this.isShowPendingOrders = true;
        // this.isShowopenshipment = true;
        // this.isShowBackOrders = true;
        // this.isShowOpenInvoice = true;
        // this.isShowOrderHistory = true;
        // this.isShowPurchaseHistory = true;
        // this.isShowContractList = true;
        //}
        //else {
        var permis = JSON.parse(Common.getWithExpiry("ProfileLog"));
        
        this.isShowPendingOrders = permis[3];
        this.isShowBackOrders = permis[4];
        this.isShowOpenInvoice = permis[5];
        this.isShowOrderHistory = permis[6];
        this.isShowPurchaseHistory = permis[7];
        this.isSubmitPermission = permis[9];
        this.isShowContractList = permis[11];
        this.isShowopenshipment = permis[12];
        this.isShowuserSupport = permis[13];
        

        //}
      }
      else {
        var permissions = [];
        permissions = Common.getWithExpiry("Permission").split(';');

        if (permissions.indexOf("OE") != -1) {
          this.isSubmitPermission = true;
        }
        if (permissions.indexOf("PO") != -1) {
          this.isShowPendingOrders = true;
        }
        if (permissions.indexOf("OS") != -1) {
          this.isShowopenshipment = true;
        }
        if (permissions.indexOf("BO") != -1) {
          this.isShowBackOrders = true;
        }
        if (permissions.indexOf("UI") != -1) {
          this.isShowOpenInvoice = true;
        }
        if (permissions.indexOf("OH") != -1) {
          this.isShowOrderHistory = true;
        }
        if (permissions.indexOf("PH") != -1) {
          this.isShowPurchaseHistory = true;
        }
        if (permissions.indexOf("CP") != -1) {
          this.isShowContractList = true;
        }
        if (permissions.indexOf("US") != -1) {
          this.isShowuserSupport = true;
        }
      }

    }
    else {
      this.isSubmitPermission = true;
      this.isShowPendingOrders = true;
      this.isShowopenshipment = true;
      this.isShowBackOrders = true;
      this.isShowOpenInvoice = true;
      this.isShowOrderHistory = true;
      this.isShowPurchaseHistory = true;
      this.isShowContractList = true;
      this.isShowuserSupport = true;
    }
  }

  getPendingOrderSetting() {
    var PendingOrderSetting = Common.getWithExpiry("PendingOrderSetting");
    if (PendingOrderSetting == null || PendingOrderSetting == undefined) {
      this.dataService.GetPendingOrderSetting().subscribe((data: any) => {
        PendingOrderSetting = data;
        Common.setWithExpiry("PendingOrderSetting", PendingOrderSetting);
        if (PendingOrderSetting == "1") {
          this.isShowPendingOrdersConf = true;
        }
        else {
          this.isShowPendingOrdersConf = false;
        }
      });
    }
    else {
      if (PendingOrderSetting == "1") {
        this.isShowPendingOrdersConf = true;
      }
      else {
        this.isShowPendingOrdersConf = false;
      }
    }
  }

  getBackOrderItemsSetting() {
    var BackOrderItemsSetting = Common.getWithExpiry("BackOrderItemsSetting");
    if (BackOrderItemsSetting == null || BackOrderItemsSetting == undefined) {
      this.dataService.GetBackOrderItemsSetting().subscribe((data: any) => {
        BackOrderItemsSetting = data;
        Common.setWithExpiry("BackOrderItemsSetting", BackOrderItemsSetting)
        if (BackOrderItemsSetting == "1") {
          this.isShowBackOrdersConf = true;
        }
        else {
          this.isShowBackOrdersConf = false;
        }
      });
    }
    else {
      if (BackOrderItemsSetting == "1") {
        this.isShowBackOrdersConf = true;
      }
      else {
        this.isShowBackOrdersConf = false;
      }
    }
  }

  getOpenInvoiceSetting() {
    var OpenInvoiceSetting = Common.getWithExpiry("OpenInvoiceSetting");
    if (OpenInvoiceSetting == null || OpenInvoiceSetting == undefined) {
      this.dataService.GetOpenInvoiceSetting().subscribe((data: any) => {
        OpenInvoiceSetting = data;
        Common.setWithExpiry("OpenInvoiceSetting", OpenInvoiceSetting)
        if (OpenInvoiceSetting == "1") {
          this.isShowOpenInvoiceConf = true;
        }
        else {
          this.isShowOpenInvoiceConf = false;
        }
      });
    } else {
      if (OpenInvoiceSetting == "1") {
        this.isShowOpenInvoiceConf = true;
      }
      else {
        this.isShowOpenInvoiceConf = false;
      }
    }
  }

  getOrderHistorySetting() {
    var OrderHistorySetting = Common.getWithExpiry("OrderHistorySetting");
    if (OrderHistorySetting == null || OrderHistorySetting == undefined) {
      this.dataService.GetOrderHistorySetting().subscribe((data: any) => {
        OrderHistorySetting = data;
        Common.setWithExpiry("OrderHistorySetting", OrderHistorySetting)
        if (OrderHistorySetting == "1") {
          this.isShowOrderHistoryConf = true;
        }
        else {
          this.isShowOrderHistoryConf = false;
        }
      });
    }
    else {
      if (OrderHistorySetting == "1") {
        this.isShowOrderHistoryConf = true;
      }
      else {
        this.isShowOrderHistoryConf = false;
      }
    }
  }

  getPurchaseHistorySetting() {
    var PurchaseHistorySetting = Common.getWithExpiry("PurchaseHistorySetting");
    if (PurchaseHistorySetting == null || PurchaseHistorySetting == undefined) {
      this.dataService.GetPurchaseHistorySetting().subscribe((data: any) => {
        PurchaseHistorySetting = data;
        Common.setWithExpiry("PurchaseHistorySetting", PurchaseHistorySetting)
        if (PurchaseHistorySetting == "1") {
          this.isShowPurchaseHistoryConf = true;
        }
        else {
          this.isShowPurchaseHistoryConf = false;
        }
      });
    }
    else {
      if (PurchaseHistorySetting == "1") {
        this.isShowPurchaseHistoryConf = true;
      }
      else {
        this.isShowPurchaseHistoryConf = false;
      }
    }
  }
  GetHelpDesksetting() {
    var HelpDesksetting = Common.getWithExpiry("HelpDesksetting");
    if (HelpDesksetting == null || HelpDesksetting == undefined) {
      this.dataService.GetHelpDesksetting().subscribe((data: any) => {
        HelpDesksetting = data;
        Common.setWithExpiry("HelpDesksetting", HelpDesksetting);
        if (HelpDesksetting == "1") {
          this.isShowHelpDeskConf = true;
        }
        else {
          this.isShowHelpDeskConf = false;
        }
      });
    } else {
      if (HelpDesksetting == "1") {
        this.isShowHelpDeskConf = true;
      }
      else {
        this.isShowHelpDeskConf = false;
      }
    }
  }
  getContractListSetting() {
    var ContractListSetting = Common.getWithExpiry("ContractListSetting");
    if (ContractListSetting == null || ContractListSetting == undefined) {
      this.dataService.GetContractListSetting().subscribe((data: any) => {
        ContractListSetting = data;
        Common.setWithExpiry("ContractListSetting", ContractListSetting);
        if (ContractListSetting == "1") {
          this.isShowContractListConf = true;
        }
        else {
          this.isShowContractListConf = false;
        }
      });
    } else {
      if (ContractListSetting == "1") {
        this.isShowContractListConf = true;
      }
      else {
        this.isShowContractListConf = false;
      }
    }
  }
  gotowish() {
    this.router.navigate(['wishlist']);
  }
  gotorfq() {
    this.router.navigate(['rfqlist']);
  }
  gotorma() {
    this.router.navigate(['rma']);
  }
  redirectCategory() {
    this.router.navigate(['categories']);
  }
  customerChange(cust:any) {
    // var getcustomer = null;
    // for (var i = 0; i < this.customerlist.length; i++) {
    //   if (this.customerlist[i].customer1 == cust.customer1) {
    //     getcustomer = this.customerlist[i];
    //     this.custdetails = this.customerlist[i];
    //     break;
    //   }
    // }
    // if (getcustomer != null) {
    //   try{
    //   var getadr = this.custdetails.adr.trim().replace('[', '').replace(']', '').split(',');
    //   var newadr = '';
    //   for (var j = 0; j < getadr.length; j++) {
    //     getadr[j] = getadr[j].trim().replace('"', '').replace('"', '');
    //     if (getadr[j] != '') {
    //       newadr = newadr + getadr[j];
    //     }
    //   }
    //   this.custdetails.adr = newadr;
    // }catch(ed){

    // }
    var model = {
      "custID": cust.customer1,
      "Username": "",
      "Password": cust.web_passwd,
      "LoginType": true
    }
    this.registerService.Login(model).subscribe((res: any) => {
      this.loginRes = res;
      if (this.loginRes.Status == "Success") {
        this.registerService.GetContactsForProfile(this.loginRes.UserID).subscribe((res1: any) => {
          this.contactDetails = res1;
          this.registerService.GetProfileDetails(this.loginRes.UserID).subscribe((res2: any) => {
            this.profileinfo = res2;
            Common.setWithExpiry("warehouse", this.loginRes.UserFullName);
            Common.setWithExpiry("CustID", this.loginRes.UserID);
            //Common.setWithExpiry("UserID", this.loginRes.AuthenticationToken);
            //Common.setWithExpiry("UserType", this.loginRes.RedirectUrl);
            //Common.setWithExpiry("Permission", this.loginRes.TokenExpiryMinutes);
            this.cartService.customerBroadCaster(this.loginRes.ValidateTokenExpiretime);
            this.cartService.cartBroadCasterLogin(Common.getWithExpiry("CustID"), Common.getWithExpiry("UserID"));
            //window.location.reload();
          })
        })
      }
    })
  }

  gotouser() {
    if (Common.getWithExpiry("UserType") == '5') {
      this.cartService.CreatesystaemUser(Common.getWithExpiry("CustID")).subscribe((res: any) => {
      });
    }
    this.router.navigate(['user']);
  }
  gotoSubuserAccounts(){
    this.router.navigate(['subusers']);
  }
  gotouserprofile() {
    this.router.navigate(['userprofile']);
  }

  Changepwd() {
    this.router.navigate(['changepwd']);
  }

  pendingOrder() {
    this.router.navigate(['order-management/pending-order']);
  }
  openshipments() {
    this.router.navigate(['order-management/open-shipment']);
  }
  gotocart() {
    this.router.navigate(['viewcart']);
  }

  gotoProduct() {
    this.router.navigate(['product']);
  }
  gotoAdvancesearch() {
    this.router.navigate(['advancesearch']);
  }

  backorders() {
    if(this.iskrayden){
      this.router.navigate(['order-management/expected-shipment']);
    }
    else{
    this.router.navigate(['order-management/back-orders']);
    }
  }
  backorders1() {
    if(this.iskrayden){
      this.router.navigate(['order-management/expected-shipment']);
    }
    else{
    this.router.navigate(['order-management/back-orders']);
    }
  }
  Helpdeskclick() {
    this.router.navigate(['order-management/HelpDesk']);
  }
  invoices() {
    this.router.navigate(['order-management/invoices']);
  }
  orderhistory() {
    this.router.navigate(['order-management/order-history']);
  }
  purchasehistory() {
    this.router.navigate(['order-management/purchase-history']);
  }
  ContractList() {
    this.router.navigate(['order-management/customer-products']);
  }
  reviewOrder() {
    this.router.navigate(['/pending-order-review']);
  }
}
