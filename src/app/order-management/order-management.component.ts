import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
import { Router } from '../../../node_modules/@angular/router';
import { DataService } from '../services/data.service';
import { Common } from '../model/common.model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  isSubmitPermission: any = '0';
  isShowPendingOrders: any = '0';
  isShowopenshipment: any = '0';
  isShowBackOrders: any = '0';
  isShowexpectedshipment: any = '0';
  isShowOpenInvoice: any = '0';
  isShowOrderHistory: any = '0';
  isShowPurchaseHistory: any = '0';
  isShowCustomerProducts: any = '0';
  isShowHelpDesk: any = '0';
  sorttype: any;
  isShowPendingOrdersConf: any = '0';
  isShowopenshipmentConf: any = '0';
  isShowBackOrdersConf: any = '0';
  isShowexpectedshipmentConf: any = '0';
  isShowOpenInvoiceConf: any = '0';
  isShowOrderHistoryConf: any = '0';
  isShowPurchaseHistoryConf: any = '0';
  isShowCustomerProductsConf: any = '0';

  isactive: any;
  IsMuscle: any;
  puchasehistorylable: any;
  UserType: any;
  webtype: any;
  customerlable: any;
  isPunchOut: boolean;
  type:any;
  newPermission:any;
  backorderlable:any="Back Orders";
  expectedshipmentlable:any="Expected Shipment";
  iskyraden:any;
  constructor(private dataService: DataService, private router: Router) {
    this.gototop();
    this.iskyraden=environment.iskyraden;
    this.UserType = Common.getWithExpiry("UserType");
    this.type = Common.getWithExpiry("PunchOutType");
    this.getIsMuscle();
    this.getwebtype();
    
    this.GetCustomerProductLable();
    if (Common.getWithExpiry("IsPunchOut") == "Yes") {
      this.isPunchOut = true;
    }
    else {
      this.isPunchOut = false;
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
  GetPermissionConfig() {
    this.newPermission = Common.getWithExpiry("newPermission");
    if (this.newPermission == null || this.newPermission == undefined) {
      this.dataService.GetPermissionConfig().subscribe((data1: any) => {
        this.newPermission = data1;
        Common.setWithExpiry("newPermission", this.newPermission);
        if (this.newPermission == "1") {
          if (this.UserType == '3' || this.UserType == 3) {
            var permis = JSON.parse(Common.getWithExpiry("ProfileLog"));
            this.isShowPendingOrders = permis[3];
            this.isShowBackOrders = permis[4];
            this.isShowexpectedshipment = permis[4];
            this.isShowOpenInvoice = permis[5];
            this.isShowOrderHistory = permis[6];
            this.isShowPurchaseHistory = permis[7];
            this.isShowCustomerProducts = permis[11];
            this.isShowopenshipment = permis[12];
          }
         
        }
      })
    }
    else{
      if (this.newPermission == "1") {
        if (this.UserType == '3' || this.UserType == 3) {
          var permis = JSON.parse(Common.getWithExpiry("ProfileLog"));
          this.isShowPendingOrders = permis[3];
          this.isShowBackOrders = permis[4];
          this.isShowexpectedshipment = permis[4];
          this.isShowOpenInvoice = permis[5];
          this.isShowOrderHistory = permis[6];
          this.isShowPurchaseHistory = permis[7];
          this.isShowCustomerProducts = permis[11];
          this.isShowopenshipment = permis[12];
        }
       
      }
    }
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  changeDropdown() {
    if (this.sorttype == 1) {
      this.pendingOrderClick();
    }
    if (this.sorttype == 2 && !this.iskyraden) {
      this.BOClick();
    }
    if (this.sorttype == 2 && this.iskyraden) {
      this.ESClick();
    }
    if (this.sorttype == 3) {
      this.OIClick();
    }
    if (this.sorttype == 4) {
      this.OHClick();
    }
    if (this.sorttype == 5) {
      this.PHClick();
    }
    if (this.sorttype == 6) {
      this.CPClick();
    }
    if (this.sorttype == 7) {
      this.HDClick();
    }
    if (this.sorttype == 8) {
      this.openshipmentClick();
    }
  }
  getIsMuscle() {
    this.IsMuscle = Common.getWithExpiry("IsMuscle");
    if (this.IsMuscle == null || this.IsMuscle == undefined) {
      this.dataService.GetConfigForIsMuscle().subscribe((data: any) => {
        this.IsMuscle = data;
        Common.setWithExpiry("IsMuscle", this.IsMuscle);
        if (this.IsMuscle == '1' && this.UserType == '3') {
          this.puchasehistorylable = "QUICK ORDER";
        }
        else {
          this.puchasehistorylable = "PURCHASE HISTORY";
        }
      })
    }
    else {
      if (this.IsMuscle == '1' && this.UserType == '3') {
        this.puchasehistorylable = "QUICK ORDER";
      }
      else {
        this.puchasehistorylable = "PURCHASE HISTORY";
      }
    }
  }
  getwebtype() {
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

  ngOnInit() {
    this.getHelpDeskSetting();
    this.getPendingOrderSetting();
    this.getopenshipmentSetting();
    this.getBackOrderItemsSetting();
    this.getOpenInvoiceSetting();
    this.getOrderHistorySetting();
    this.getPurchaseHistorySetting();
    this.getContractListSetting();

    this.GetPermissionConfig();



    if (Common.getWithExpiry("UserType") == "3") {
      var permissions = [];
      permissions = Common.getWithExpiry("Permission").split(';');

      if (permissions.indexOf("OE") != -1) {
        this.isSubmitPermission = '1';
      }

      if (permissions.indexOf("PO") != -1) {
        this.isShowPendingOrders = '1';
      }
      if (permissions.indexOf("OS") != -1) {
        this.isShowopenshipment = '1';
      }

      if (permissions.indexOf("BO") != -1 && !this.iskyraden) {
        this.isShowBackOrders = '1';
      }
      if (permissions.indexOf("BO") != -1 && this.iskyraden) {
        this.isShowexpectedshipment = '1';
      }

      if (permissions.indexOf("UI") != -1) {
        this.isShowOpenInvoice = '1';
      }

      if (permissions.indexOf("OH") != -1) {
        this.isShowOrderHistory = '1';
      }

      if (permissions.indexOf("PH") != -1) {
        this.isShowPurchaseHistory = '1';
      }
      if (permissions.indexOf("CP") != -1) {
        this.isShowCustomerProducts = '1';
      }
    }
    else if( Common.getWithExpiry("SalesUserType")=='2'){
      var subuser = Common.getWithExpiry("subuser").toString();
      if(subuser!=undefined && subuser!=''){
        var permissions = [];
      permissions = Common.getWithExpiry("Permission").split(';');

      if (permissions.indexOf("OE") != -1) {
        this.isSubmitPermission = '1';
      }

      if (permissions.indexOf("PO") != -1) {
        this.isShowPendingOrders = '1';
      }
      if (permissions.indexOf("OS") != -1) {
        this.isShowopenshipment = '1';
      }

      if (permissions.indexOf("BO") != -1 && !this.iskyraden) {
        this.isShowBackOrders = '1';
      }
      if (permissions.indexOf("BO") != -1 && this.iskyraden) {
        this.isShowexpectedshipment = '1';
      }
      if (permissions.indexOf("UI") != -1) {
        this.isShowOpenInvoice = '1';
      }

      if (permissions.indexOf("OH") != -1) {
        this.isShowOrderHistory = '1';
      }

      if (permissions.indexOf("PH") != -1) {
        this.isShowPurchaseHistory = '1';
      }
      if (permissions.indexOf("CP") != -1) {
        this.isShowCustomerProducts = '1';
      }
      }
      else{
        this.isSubmitPermission = '1';
        this.isShowPendingOrders = '1';
        this.isShowopenshipment = '1';
        this.isShowBackOrders = '1';
        this.isShowexpectedshipment = '1';
        this.isShowOpenInvoice = '1';
        this.isShowOrderHistory = '1';
        this.isShowPurchaseHistory = '1';
        this.isShowCustomerProducts = '1';
      }
    }
    else {
      this.isSubmitPermission = '1';
      this.isShowPendingOrders = '1';
      this.isShowopenshipment = '1';
      this.isShowBackOrders = '1';
      this.isShowexpectedshipment = '1';
      this.isShowOpenInvoice = '1';
      this.isShowOrderHistory = '1';
      this.isShowPurchaseHistory = '1';
      this.isShowCustomerProducts = '1';
    }



    if (this.router.url.indexOf('pending-order') != -1) {
      this.pendingOrderClick();
      this.isactive = "po";
      this.sorttype = 1;
    }
    if (this.router.url.indexOf('open-shipment') != -1) {
      this.openshipmentClick();
      this.isactive = "os";
      this.sorttype = 8;
    }
    else if (this.router.url.indexOf('back-orders') != -1) {
      this.BOClick();
      this.isactive = "bo";
      this.sorttype = 2;
    }
    else if (this.router.url.indexOf('expected-shipment') != -1) {
      this.ESClick();
      this.isactive = "ES";
      this.sorttype = 2;
    }
    else if (this.router.url.indexOf('invoices') != -1) {
      this.OIClick();
      this.isactive = "oi";
      this.sorttype = 3;
    }
    else if (this.router.url.indexOf('order-history') != -1) {
      this.OHClick();
      this.isactive = "oh";
      this.sorttype = 4;
    }
    else if (this.router.url.indexOf('purchase-history') != -1) {
      this.PHClick();
      this.isactive = "ph";
      this.sorttype = 5;
    }
    else if (this.router.url.indexOf('Customer-Products') != -1) {
      this.CPClick();
      this.isactive = "cp";
      this.sorttype = 6;
    }
    else if (this.router.url.indexOf('HelpDesk') != -1) {
      this.HDClick();
      this.isactive = "HD";
      this.sorttype = 7;
    }
  }

  getPendingOrderSetting() {
    this.isShowPendingOrdersConf = Common.getWithExpiry("isShowPendingOrdersConf");
    if (this.isShowPendingOrdersConf == null || this.isShowPendingOrdersConf == undefined) {
      this.dataService.GetPendingOrderSetting().subscribe((data: any) => {
        this.isShowPendingOrdersConf = data;
        Common.setWithExpiry("isShowPendingOrdersConf", this.isShowPendingOrdersConf);
      })
    }
  }
  getopenshipmentSetting() {
    this.isShowopenshipmentConf = Common.getWithExpiry("isShowopenshipmentConf");
    if (this.isShowopenshipmentConf == null || this.isShowopenshipmentConf == undefined) {
      this.dataService.GetopenshipmentSetting().subscribe((data: any) => {
        this.isShowopenshipmentConf = data;
        Common.setWithExpiry("isShowopenshipmentConf", this.isShowopenshipmentConf);
      })
    }
  }
  getHelpDeskSetting() {
    this.isShowHelpDesk = Common.getWithExpiry("isShowHelpDesk");
    if (this.isShowHelpDesk == null || this.isShowHelpDesk == undefined) {
      this.dataService.GetHelpDesksetting().subscribe((data: any) => {
        this.isShowHelpDesk = data;
        Common.setWithExpiry("isShowHelpDesk", this.isShowHelpDesk);
      })
    }

  }

  getBackOrderItemsSetting() {
    this.isShowBackOrdersConf = Common.getWithExpiry("isShowBackOrdersConf");
    this.isShowexpectedshipmentConf=this.isShowBackOrdersConf ;
    if (this.isShowBackOrdersConf == null || this.isShowBackOrdersConf == undefined) {
      this.dataService.GetBackOrderItemsSetting().subscribe((data: any) => {
        this.isShowBackOrdersConf = data;
        Common.setWithExpiry("isShowBackOrdersConf", this.isShowBackOrdersConf);
        this.isShowexpectedshipmentConf=this.isShowBackOrdersConf;
      })
    }

  }

  getOpenInvoiceSetting() {
    this.isShowOpenInvoiceConf = Common.getWithExpiry("isShowOpenInvoiceConf");
    if (this.isShowOpenInvoiceConf == null || this.isShowOpenInvoiceConf == undefined) {
      this.dataService.GetOpenInvoiceSetting().subscribe((data: any) => {
        this.isShowOpenInvoiceConf = data;
        Common.setWithExpiry("isShowOpenInvoiceConf", this.isShowOpenInvoiceConf);
      })
    }
  }

  getOrderHistorySetting() {
    this.isShowOrderHistoryConf = Common.getWithExpiry("isShowOrderHistoryConf");
    if (this.isShowOrderHistoryConf == null || this.isShowOrderHistoryConf == undefined) {
      this.dataService.GetOrderHistorySetting().subscribe((data: any) => {
        this.isShowOrderHistoryConf = data;
        Common.setWithExpiry("isShowOrderHistoryConf", this.isShowOrderHistoryConf);
      })
    }
  }

  getPurchaseHistorySetting() {
    this.isShowPurchaseHistoryConf = Common.getWithExpiry("isShowPurchaseHistoryConf");
    if (this.isShowPurchaseHistoryConf == null || this.isShowPurchaseHistoryConf == undefined) {
      this.dataService.GetPurchaseHistorySetting().subscribe((data: any) => {
        this.isShowPurchaseHistoryConf = data;
        Common.setWithExpiry("isShowPurchaseHistoryConf", this.isShowPurchaseHistoryConf);
      })
    }
  }
  getContractListSetting() {
    this.isShowCustomerProductsConf = Common.getWithExpiry("isShowCustomerProductsConf");
    if (this.isShowCustomerProductsConf == null || this.isShowCustomerProductsConf == undefined) {
      this.dataService.GetContractListSetting().subscribe((data: any) => {
        this.isShowCustomerProductsConf = data;
        Common.setWithExpiry("isShowCustomerProductsConf", this.isShowCustomerProductsConf);
      })
    }
  }

  pendingOrderClick() {
    this.isactive = "po";
    this.sorttype = 1;
    this.router.navigate(['/order-management/pending-order']);
  }
  openshipmentClick() {
    this.isactive = "os";
    this.sorttype = 1;
    this.router.navigate(['/order-management/open-shipment']);
  }
  BOClick() {
    this.isactive = "bo";
    this.sorttype = 2;
    this.router.navigate(['/order-management/back-orders']);
  }
  ESClick() {
    this.isactive = "ES";
    this.sorttype = 2;
    this.router.navigate(['/order-management/expected-shipment']);
  }
  OIClick() {
    this.isactive = "oi";
    this.sorttype = 3;
    this.router.navigate(['/order-management/invoices']);
  }
  OHClick() {
    this.isactive = "oh";
    this.sorttype = 4;
    this.router.navigate(['/order-management/order-history']);
  }
  PHClick() {
    this.isactive = "ph";
    this.sorttype = 5;
    this.router.navigate(['/order-management/purchase-history']);
  }
  CPClick() {
    this.isactive = "cp";
    this.sorttype = 6;
    this.router.navigate(['/order-management/customer-products']);
  }
  HDClick() {
    this.isactive = "HD";
    this.sorttype = 7;
    this.router.navigate(['/order-management/HelpDesk']);
  }
}
