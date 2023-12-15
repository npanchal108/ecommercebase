import {  Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { CartService } from '../services/cart.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { DataService } from '../services/data.service';
import { Common } from '../../app/model/common.model';
import { ToastrService } from 'ngx-toastr';
import { SEOService } from '../services/seo.service';
import { LoadingService } from '../services/loading.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { environment } from 'src/environments/environment';
//declare function callforgatag(total,tax,orderno):any;
// import { IpServiceService } from '../ip-service.service';
// declare var $: any;
//declare let paypal: any;

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.scss']
})

export class ReviewOrderComponent implements OnInit {
  CreditCardSetting: any;
  billAdr: any = {};
  isSubmitted: Boolean = false;
  orderno: any;
  finalObj: any;
  head: any = {};
  shipAdr: any = [];
  shiptoadd: any;
  submitbuttondisable = false;
  shipAddr1: string;
  shipAddr2: string;
  shipCity: string;
  shipState: string;
  shipZIP: string;
  shipCountry: string;
  aftertotcodes: any = [];
  billAdd1: string;
  billAdd2: string;
  billCity: string;
  isumdescr: any;
  isError: boolean = false;
  itlable: any;
  subTotal: number = 0;
  frieght: number = 0;
  tax: number = 0;
  total: number = 0;
  tax_code: string;
  showBack: boolean;
  temporder: any;
  isShowWantedDate: string;
  isShowCanecelDate: string;
  isShowPONumber: string;
  isShowContact: string;
  isShowEmail: string;
  isShowShipVia: string;
  isShowAccount: string;
  isShowPayType: string;
  isShowNote: string;
  isShowItemNote: string;
  oe_tot_codes: any;
  umdescrlist: any;

  cityno: any;
  isprofiledesc: any;
  web_order_min_amount: any;
  checkoutmsg: any;
  reviewurlformodify: any;
  paymenttermdesc: any;
  shipviadesc: any;
  flagtosubmit: any = true;
  UrlWithFreeForm: any;
  UrlWithDetails: any;
  termsandcondition: any;
  urltermsandcondition: any;
  terms: boolean = false;
  termsrequired: any;
  GuestUserID: any;
  termslable: any;
  warehouse: any;
  SubmitTempOrder: any;
  UserType: any;
  OrderNoteLable: any;
  TextUpperCase: any;
  creditcardcode: any;
  Processwithzeroprice: any;
  ProcessTempOrder: any;
  priceshowcust: any;
  isPunchOut: boolean = false;
  Enter_by: any;
  Enter_by_Lable: any;
  Enter_by_Required: any;
  ipAddress: string;
  Guestwarehouse: any;
  PunchOutType: any;

  PunchOutRetURL: any;
  PunchOutDeliveryTo: any;
  PunchOutShipTo: any;
  catCode: any = [];

  southernBuyerCookie: any;
  southernSupplierPartID: any;
  southernDeliverTo: any;
  southernStreet: any;
  southernCity: any;
  southernState: any;
  southernPostalCode: any;
  southernCountry: any;
  southernFromId: any;
  southernToId: any;
  southernSenderId: any;
  southernUserAgent: any;

  southernOrderPostModel: any;
  @ViewChild('testForm') testFormElement;
  JobReleaselable:any;
  orderheademail: any;
  orderproductdetailmail: any;
  PrintOrderReview: any;
  getjsonobj: any;
  referer: any;
  alavartax: any;
  Misc_60: any = "";
  israteshowforcu: any;
  iskyraden:any;
  wanterdatelable:any;
  constructor(private renderer: Renderer2,private gtmService: GoogleTagManagerService, private seoService: SEOService, private loadingService: LoadingService, private toastr: ToastrService, private dataService: DataService, private checkoutService: CheckoutService, private cartService: CartService, private router: Router, private route: ActivatedRoute) {
    this.iskyraden=environment.iskyraden;
    this.wanterdatelable=environment.wanted_date;
    this.UserType = Common.getWithExpiry("UserType");
    this.warehouse = Common.getWithExpiry("warehouse");
    this.getIP();
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Review Order - ' + geturl);
    this.seoService.setkeywords('Review Order - ' + geturl);
    this.seoService.setdescription('Review Order - ' + geturl);
    this.Getalavartax();
    this.getumdescrconfig();
    this.getnewpermissionconfig();
    this.getitlableconfig();
    //this.GetEmailTemplateofOrderhead();
    //this.GetEmailTemplateofProductDetails();
    this.ConfigurationForPrintOrderReview();
    this.GetConfigurationforProcesswithzeroprice();
    this.GetConfigurationforProcessTempOrder();
    this.GetJobReleaselable();
    this.getcreditcardcode();
    this.getEnter_by();
    this.getGuestUserID();
    this.getGuestwarehouse();
    this.GetSubmitTempOrderConfig();
    this.getOrderNoteLable();
    this.getCreditCardSetting();
    this.GetConfigForTextUpperCaseSetting();
    this.showpricetocustomers();

    if (Common.getWithExpiry("IsPunchOut") == "Yes") {
      this.PunchOutType = Common.getWithExpiry("PunchOutType");
      this.isPunchOut = true;

      var punchOutCustID = Common.getWithExpiry("PunchOutCustID");
      var punchOutUserID = Common.getWithExpiry("PunchOutUserID");

      if (this.PunchOutType == "Southern") {
        var buyerCookie = Common.getWithExpiry("BuyerCookie");
        this.dataService.GetSouthernPunchOutSessionDetail(buyerCookie).subscribe((data: any) => {
          this.southernBuyerCookie = data.BuyerCookie;
          this.southernFromId = data.FromId;
          this.southernToId = data.ToId;
          this.southernSenderId = data.SenderId;
          this.southernUserAgent = data.UserAgent;
          this.southernCity = data.City;
          this.southernCountry = data.Country;
          this.southernDeliverTo = data.DeliverTo;
          this.southernPostalCode = data.PostalCode;
          this.PunchOutRetURL = data.ReturnURL;
          this.southernState = data.State;
          this.southernStreet = data.Street;
          this.southernSupplierPartID = data.SupplierPartID;

          //this.sendMessage('start');
          //setTimeout(() => {
          this.submitSouthernPunchOut();
          //this.sendMessage('stop');
          //}, 3000);

        });
      }
      else {
        this.dataService.GetPunchOutSessionDetail(punchOutCustID, punchOutUserID).subscribe((data: any) => {

          this.finalObj.head.ship_id = data.ShipTo;
          this.PunchOutShipTo = data.ShipTo;
          this.PunchOutDeliveryTo = data.DeliverTo;

          // while(data.jsonobject.search("#")){
          // data.jsonobject=data.jsonobject.replace("#", "");
          // }
          this.getjsonobj = JSON.parse(data.jsonobject);
          if (this.PunchOutType == "KINTER") {
            this.PunchOutRetURL = data.ReturnURL;
            var obname = this.getjsonobj.cXML.Request.PunchOutSetupRequest.ShipTo.Address.Name;
            var PostalAddress = this.getjsonobj.cXML.Request.PunchOutSetupRequest.ShipTo.Address.PostalAddress;
            this.PunchOutShipTo = obname["#text"] + ', ' + PostalAddress.Street[0] + ', ' + PostalAddress.Street[1]
              + ', ' + PostalAddress.City + ', ' + PostalAddress.State + ', ' + PostalAddress.Country["@isoCountryCode"]
              + ', ' + PostalAddress.PostalCode + ', ' + this.getjsonobj.cXML.Request.PunchOutSetupRequest.ShipTo.Address.Email["#text"];
            //this.sendMessage('start');
            //setTimeout(() => {
            this.submitkinterPunchOut();
            //this.sendMessage('stop');
            //}, 3000);
          }
          if (this.PunchOutType == "preiser") {
            this.PunchOutRetURL = data.ReturnURL.replace('amp;', '').replace('amp;', '').replace('amp;', '').replace('amp;', '');
            this.referer = this.getjsonobj.request.body.loginInfo.returnURL.replace('amp;', '').replace('amp;', '').replace('amp;', '').replace('amp;', '');
            //this.sendMessage('start');
            //setTimeout(() => {
            this.submitPreiserPunchOut();
            //this.sendMessage('stop');
            //}, 3000);
          }
        });
      }
    }
    else {
      this.isPunchOut = false;
    }
  }
  GetJobReleaselable() {
    this.JobReleaselable = this.dataService.Getconfigbykey("JobReleaselable");
    if (this.JobReleaselable == null || this.JobReleaselable == undefined || this.JobReleaselable == '') {
        this.JobReleaselable = Common.getWithExpiry("JobReleaselable");
    }
    if (this.JobReleaselable == null || this.JobReleaselable == undefined || this.JobReleaselable == '') {
        this.dataService.GetJobReleaselable().subscribe((res: any) => {
            this.JobReleaselable = res;
            Common.setWithExpiry("itlable", this.JobReleaselable);
        });
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
  finalizeOrderforrfq() {
      var lines = [];
      var ordExt = 'd' + Math.floor(100000 + Math.random() * 900000);
      for (var i = 0; i < this.finalObj.lines.length; i++) {
        var um = this.finalObj.lines[i].um_o.replace(/[\n\r]+/g, '');

        lines.push((this.TextUpperCase == '1' ?
          this.ConvertKeysToUpperCase({
            "order_ext": ordExt, //product.descr
            "customer": Common.getWithExpiry("CustID"),
            "warehouse": Common.getWithExpiry("warehouse"),
            "line": i+1,
            "item": this.finalObj.lines[i].item,
            "descr": this.finalObj.lines[i].descr1.toString(),
            "qty_ord": this.finalObj.lines[i].quantity,
            "unit_price": parseFloat(this.finalObj.lines[i].price_per),
            "um_o": this.finalObj.lines[i].um_o,
            "notes": this.finalObj.lines[i].Note,
          }) :
          {
            "order_ext": ordExt, //product.descr
            "customer": Common.getWithExpiry("CustID"),
            "warehouse": Common.getWithExpiry("warehouse"),
            "line": i+1,
            "item": this.finalObj.lines[i].item,
            "descr": this.finalObj.lines[i].descr1.toString(),
            "qty_ord": this.finalObj.lines[i].quantity,
            "unit_price": parseFloat(this.finalObj.lines[i].price_per),
            "um_o": this.finalObj.lines[i].um_o,
            "notes": this.finalObj.lines[i].Note,
          }));
      }

      var linesVM = {

        "table": "",
        "triggers": "",
        "Lines": lines
      }

      var wantedDate = new Date();

      var model = {
        "order_ext": ordExt, //this.finalObj.head.cu_po,
        "customer": Common.getWithExpiry("CustID"),
        "warehouse": Common.getWithExpiry("warehouse"),
        "rec_type": "Q",
        "ship_id": (this.finalObj.head.ship_id == "-1" ? null : this.finalObj.head.ship_id),
        "auth_amount": "",
        "pay_amount": "",
        "cu_po": ordExt,
        "wanted_date": (wantedDate.getMonth() + 1) + '/' + wantedDate.getDate() + '/' + wantedDate.getFullYear(),
        "cancel_date": "",
        "job_rel": "",
        "cell_phone": "",
        "ship_cmpl": "",
        "email_address": this.finalObj.head.email,
        "ship_via_code": "",
        "terms_code": "",
        "Cred_card": "",
        "Pay_code_card": "",
        "Cred_card_type": "",
        "Cred_card_exp": "",
        "Pay_code_exp": "",
        "Pay_code_sec": "",
        "ExpirationMonth": "",
        "ExpirationYear": "",
        "notes": this.finalObj.notes,
        "tot_code": "",
        "tot_code_amt": "",
        "tax_amount": "",
        "tax_code": "",
        "Misc_8": "",
        "Misc_9": "",
        "pay_code": "", //payment.cart,
        "pay_cd": "", //payment.cart,
        "pay_code_amount": "", //payment.transactions[0].amount.total, 
        "s_adr1": "",
        "s_adr2": "",
        "s_adr3": "",
        "s_adr4": "",
        "s_adr5": "",
        //"s_adr": "[\"" + (this.shipping.Addr1==undefined?"":this.shipping.Addr1) + "\",\"" + (this.shipping.Addr2==undefined?"":this.shipping.Addr2) + "\",\"" + (this.cityno==3? (this.shipping.City==undefined?"":this.shipping.City):'')+ "\",\"" + (this.cityno==4? (this.shipping.City==undefined?"":this.shipping.City):'') + "\",\"" + (this.shipping.Province==undefined?"":this.shipping.Province) + "\",\""  + "\"]",
        "s_country_code": "",
        "residential": "",
        "free_form_shipto": "",
        "s_name": "",
        "ship_atn": "",
        "s_st": "",
        "s_postal_code": "",
        "blind_ship": "no",
        "ship_via_acct": "",
        "orderby": this.finalObj.head.orderby_phone,
        "NewOrderlines": linesVM,
        "company_sy": Common.getWithExpiry("company_sy")
      }
      if (this.TextUpperCase == '1') {
        model = this.ConvertKeysToUpperCase(model);
      }
      this.checkoutService.FinalizeOrder1(model).subscribe((res: any) => {
        this.orderno = res;
        
        //this.toastr.success("Your Quote is submitted successfully. No:" + this.orderno)
      });
    
  }
  getnewpermissionconfig() {
    var NewPermission = this.dataService.Getconfigbykey("NewPermission");
    if (NewPermission == null || NewPermission == undefined || NewPermission == '') {
      NewPermission = Common.getWithExpiry("NewPermission");
    }
    if (NewPermission == null || NewPermission == undefined || NewPermission == '') {
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
          else{
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
          else {
            this.israteshowforcu = true;
          }
        }
      });
    }
    else {
      if (NewPermission == "1") {
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
        else{
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
        else {
          this.israteshowforcu = true;
        }
      }
    }
  }
  // getIP() {
  //   this.ip.getIPAddress().subscribe((res: any) => {
  //     this.ipAddress = res.ip;
  //   });
  // }
  getGuestwarehouse() {
    this.Guestwarehouse = Common.getWithExpiry("Guestwarehouse");
    if (this.Guestwarehouse == null || this.Guestwarehouse == undefined || this.Guestwarehouse == '') {
      this.dataService.GetConfidForGuestwarehouse().subscribe((res: any) => {
        this.Guestwarehouse = res;
        Common.setWithExpiry("Guestwarehouse", this.Guestwarehouse);
      });
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
  ConfigurationForPrintOrderReview() {
    this.PrintOrderReview = this.dataService.Getconfigbykey("PrintOrderReview");
    if (this.PrintOrderReview == null || this.PrintOrderReview == undefined || this.PrintOrderReview == '') {
      this.PrintOrderReview = Common.getWithExpiry("PrintOrderReview");
    }
    if (this.PrintOrderReview == null || this.PrintOrderReview == undefined || this.PrintOrderReview == '') {
      this.dataService.ConfigurationForPrintOrderReview().subscribe((res: any) => {
        this.PrintOrderReview = res;
        Common.setWithExpiry("PrintOrderReview", this.PrintOrderReview);
      });
    }

  }
  GetEmailTemplateofOrderhead() {
    this.orderheademail = Common.getWithExpiry("orderheademail");
    if (this.orderheademail == null || this.orderheademail == undefined || this.orderheademail == '') {
      this.dataService.GetEmailTemplateofOrderhead().subscribe((res: any) => {
        this.orderheademail = res;
        Common.setWithExpiry("orderheademail", this.orderheademail);
      });
    }
  }
  GetEmailTemplateofProductDetails() {
    this.orderproductdetailmail = Common.getWithExpiry("orderproductdetailmail");
    if (this.orderproductdetailmail == null || this.orderproductdetailmail == undefined || this.orderproductdetailmail == '') {
      this.dataService.GetEmailTemplateofProductDetails().subscribe((res: any) => {
        this.orderproductdetailmail = res;
        Common.setWithExpiry("orderproductdetailmail", this.orderproductdetailmail);
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
  getEnter_by() {
    this.Enter_by = this.dataService.Getconfigbykey("Enter_by");
    if (this.Enter_by == null || this.Enter_by == undefined || this.Enter_by == '') {
      this.Enter_by = Common.getWithExpiry("Enter_by");
    }
    else {
      if (this.Enter_by == '1') {
        this.getEnter_by_Lable();
        this.getEnter_by_Required();
      }
    }
    if (this.Enter_by == null || this.Enter_by == undefined || this.Enter_by == '') {
      this.dataService.GetconfigforEnter_by().subscribe((data: any) => {
        this.Enter_by = data;
        if (this.Enter_by == '1') {
          this.getEnter_by_Lable();
          this.getEnter_by_Required();
        }
        Common.setWithExpiry("Enter_by", this.Enter_by);
      });
    }
    else {
      if (this.Enter_by == '1') {
        this.getEnter_by_Lable();
        this.getEnter_by_Required();
      }
    }
  }
  getEnter_by_Lable() {
    this.Enter_by_Lable = this.dataService.Getconfigbykey("Enter_by_Lable");
    if (this.Enter_by_Lable == null || this.Enter_by_Lable == undefined || this.Enter_by_Lable == '') {
      this.Enter_by_Lable = Common.getWithExpiry("Enter_by_Lable");
    }
    if (this.Enter_by_Lable == null || this.Enter_by_Lable == undefined || this.Enter_by_Lable == '') {
      this.dataService.GetconfigforEnter_by_Lable().subscribe((data: any) => {
        this.Enter_by_Lable = data;
        Common.setWithExpiry("Enter_by_Lable", this.Enter_by_Lable);
      });
    }
  }
  getEnter_by_Required() {
    this.Enter_by_Required = this.dataService.Getconfigbykey("Enter_by_Required");
    if (this.Enter_by_Required == null || this.Enter_by_Required == undefined || this.Enter_by_Required == '') {
      this.Enter_by_Required = Common.getWithExpiry("Enter_by_Required");
    }
    if (this.Enter_by_Required == null || this.Enter_by_Required == undefined || this.Enter_by_Required == '') {
      this.dataService.GetconfigforEnter_by_Required().subscribe((data: any) => {
        this.Enter_by_Required = data;
        Common.setWithExpiry("Enter_by_Required", this.Enter_by_Required);
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
  GetConfigurationforProcessTempOrder() {
    this.ProcessTempOrder = this.dataService.Getconfigbykey("ProcessTempOrder");
    if (this.ProcessTempOrder == null || this.ProcessTempOrder == undefined || this.ProcessTempOrder == '') {
      this.ProcessTempOrder = Common.getWithExpiry("ProcessTempOrder");
    }
    if (this.ProcessTempOrder == null || this.ProcessTempOrder == undefined || this.ProcessTempOrder == '') {
      this.dataService.GetConfigurationforProcessTempOrder().subscribe((res: any) => {
        this.ProcessTempOrder = res;
        Common.setWithExpiry("ProcessTempOrder", this.ProcessTempOrder);
      });
    }
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  GetConfigForTextUpperCaseSetting() {
    this.TextUpperCase = this.dataService.Getconfigbykey("TextUpperCaseSetting");
    if (this.TextUpperCase == null || this.TextUpperCase == undefined || this.TextUpperCase == '') {
      this.TextUpperCase = Common.getWithExpiry("TextUpperCase");
    }
    if (this.TextUpperCase == null || this.TextUpperCase == undefined || this.TextUpperCase == '') {
      this.dataService.GetConfigForTextUpperCaseSetting().subscribe((res: any) => {
        this.TextUpperCase = res;
        Common.setWithExpiry("TextUpperCase", this.TextUpperCase);
      });
    }
  }
  getOrderNoteLable() {
    this.OrderNoteLable = this.dataService.Getconfigbykey("OrderNoteLable");
    if (this.OrderNoteLable == null || this.OrderNoteLable == undefined || this.OrderNoteLable == '') {
      this.OrderNoteLable = Common.getWithExpiry("OrderNoteLable");
    }
    if (this.OrderNoteLable == null || this.OrderNoteLable == undefined || this.OrderNoteLable == '') {
      this.dataService.GetConfigForOrderNoteLable().subscribe((res: any) => {
        this.OrderNoteLable = res;
        Common.setWithExpiry("OrderNoteLable", this.OrderNoteLable);
      });
    }
  }
  getCreditCardSetting() {
    this.CreditCardSetting = this.dataService.Getconfigbykey("CreditCard");
    if (this.CreditCardSetting == null || this.CreditCardSetting == undefined || this.CreditCardSetting == '') {
      this.CreditCardSetting = Common.getWithExpiry("CreditCardSetting");
    }
    if (this.CreditCardSetting == null || this.CreditCardSetting == undefined || this.CreditCardSetting == '') {
      this.dataService.GetCreditCardSetting().subscribe((data: any) => {
        this.CreditCardSetting = data;
        Common.setWithExpiry("CreditCardSetting", this.CreditCardSetting);
      });
    }
  }
  
tagmanager() {
  try{
  var item = [];
  
  for (var i = 0; i < this.finalObj.lines.length; i++) {
      item.push({ "item_id": this.finalObj.lines[i].itemname, "item_name": this.finalObj.lines[i].itemname, "item_brand": this.finalObj.lines[i].links, "item_category": this.finalObj.lines[i].prod_line, "item_category2": this.finalObj.lines[i].itemname, "item_list_id": "", "item_list_name": this.finalObj.lines[i].itemname, "price": this.finalObj.lines[i].price_per, "quantity": this.finalObj.lines[i].quantity })
  }
  var gtmTag = {
      event: 'purchase',
      ecommerce: {
          currency: "USD",
          transaction_id:this.orderno,
          value: this.total,
          tax:this.tax,
          shipping:(this.aftertotcodes.length>0? this.aftertotcodes[0].amt : "0"),
          items: item
      }
  };
  console.log('gtmService',gtmTag);
  this.gtmService.pushTag(gtmTag);
}catch(ex){
  console.log(ex.toString());
}
}

  ngOnInit() {
    //this.getIP();
    this.Getoe_tot_codes();
    this.getisprofiledesc();
    this.gototop();
    this.getconfigforcheckoutmsg();
    this.getconfigforurlfromreview();
    this.getUrlWithDetails();
    this.Gettermsandconditions();
    this.getWantedDateSetting();
    this.getCancelDateSetting();
    this.getPONumberSetting();
    this.getContactSetting();
    this.getEmailSetting();
    this.getShipViaSetting();
    this.getAccountSetting();
    this.getPayTypeSetting();
    this.getNoteSetting();
    this.getItemNoteSetting();
    this.getaddresscityno('US');
    this.GetMinOrdervalue();
    var param = this.route.snapshot.paramMap.get('type');

    if (param == 'review')
      this.showBack = true;
    else
      this.showBack = false;
    try {
      if (Common.getWithExpiry("finalObj") != undefined) {
        this.finalObj = JSON.parse(Common.getWithExpiry("finalObj"));
        if (Common.getWithExpiry("IsPunchOut") == "Yes") {
          for (var i = 0; i < this.finalObj.lines.length; i++) {
            this.getCatCode(this.finalObj.lines[i].item);
          }
        }
      }
      if (Common.getWithExpiry("addrObj") != undefined) {
        var billAdr = JSON.parse(Common.getWithExpiry("addrObj"));

      }
      if (Common.getWithExpiry("shippingAddress") != undefined) {
        var shipAdr = JSON.parse(Common.getWithExpiry("shippingAddress"));
      }
    } catch (ed) { }

    //If the following condition satisfy then it comes from review order user
    if (billAdr == undefined || shipAdr == undefined) {
      this.getBillingAddress();
    }
    else {
      this.billAdr = billAdr;
      this.shipAdr = shipAdr;
      this.populateData();
    }

  }

  getCatCode(item) {
    this.dataService.GetCategoryCode(item).subscribe((res: any) => {
      var aa = JSON.parse(res);
      this.catCode.push({ "itemNo": item, "catCode": aa[9] });
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
  GetSubmitTempOrderConfig() {
    this.SubmitTempOrder = this.dataService.Getconfigbykey("SubmitTempOrder");
    if (this.SubmitTempOrder == null || this.SubmitTempOrder == undefined || this.SubmitTempOrder == '') {
      this.SubmitTempOrder = Common.getWithExpiry("SubmitTempOrder");
    }
    if (this.SubmitTempOrder == null || this.SubmitTempOrder == undefined || this.SubmitTempOrder == '') {
      this.dataService.GetSubmitTempOrderConfig().subscribe((res: any) => {
        this.SubmitTempOrder = res;
        Common.setWithExpiry("SubmitTempOrder", this.SubmitTempOrder);
      });
    }
  }

  gotohome() {
    this.router.navigate(['/checkout']);
  }
  getconfigforcheckoutmsg() {
    this.checkoutmsg = this.dataService.Getconfigbykey("Checkoutmsg");
    if (this.checkoutmsg == null || this.checkoutmsg == undefined || this.checkoutmsg == '') {
      this.checkoutmsg = Common.getWithExpiry("checkoutmsg");
    }
    if (this.checkoutmsg == null || this.checkoutmsg == undefined || this.checkoutmsg == '') {
      this.dataService.getconfigforcheckoutmsg().subscribe((res: any) => {
        this.checkoutmsg = res;
        Common.setWithExpiry("checkoutmsg", this.checkoutmsg);
      });
    }
  }
  getconfigforurlfromreview() {
    this.reviewurlformodify = this.dataService.Getconfigbykey("urlfromreview");
    if (this.reviewurlformodify == null || this.reviewurlformodify == undefined || this.reviewurlformodify == '') {
      this.reviewurlformodify = Common.getWithExpiry("reviewurlformodify");
    }
    if (this.reviewurlformodify == null || this.reviewurlformodify == undefined || this.reviewurlformodify == '') {
      this.dataService.Getconfigurationforurlfromreview().subscribe((res: any) => {
        this.reviewurlformodify = res;
        Common.setWithExpiry("reviewurlformodify", this.reviewurlformodify);
      });
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
  getItemNoteSetting() {
    this.isShowItemNote = this.dataService.Getconfigbykey("ItemNote");
    if (this.isShowItemNote == null || this.isShowItemNote == undefined || this.isShowItemNote == '') {
      this.isShowItemNote = Common.getWithExpiry("isShowItemNote");
    }
    if (this.isShowItemNote == null || this.isShowItemNote == undefined || this.isShowItemNote == '') {
      this.dataService.GetItemNoteSetting().subscribe((res: any) => {
        this.isShowItemNote = res;
        Common.setWithExpiry("isShowItemNote", this.isShowItemNote);
      });
    }

  }
  getaddresscityno(country) {
    this.cartService.GetCountryaddressCityCode(country).subscribe((res: any) => {
      this.cityno = res;
    });
  }

  getWantedDateSetting() {
    this.isShowWantedDate = this.dataService.Getconfigbykey("WantedDate");
    if (this.isShowWantedDate == null || this.isShowWantedDate == undefined || this.isShowWantedDate == '') {
      this.isShowWantedDate = Common.getWithExpiry("isShowWantedDate");
    }
    if (this.isShowWantedDate == null || this.isShowWantedDate == undefined || this.isShowWantedDate == '') {
      this.dataService.GetWantedDateSetting().subscribe((res: any) => {
        this.isShowWantedDate = res;
        Common.setWithExpiry("isShowWantedDate", this.isShowWantedDate);
      });
    }
  }

  getCancelDateSetting() {
    this.isShowCanecelDate = this.dataService.Getconfigbykey("CancelDate");
    if (this.isShowCanecelDate == null || this.isShowCanecelDate == undefined || this.isShowCanecelDate == '') {
      this.isShowCanecelDate = Common.getWithExpiry("isShowCanecelDate");
    }
    if (this.isShowCanecelDate == null || this.isShowCanecelDate == undefined || this.isShowCanecelDate == '') {
      this.dataService.GetCancelDateSetting().subscribe((res: any) => {
        this.isShowCanecelDate = res;
        Common.setWithExpiry("isShowCanecelDate", this.isShowCanecelDate);
      });
    }

  }

  getPONumberSetting() {
    this.isShowPONumber = this.dataService.Getconfigbykey("PONumber");
    if (this.isShowPONumber == null || this.isShowPONumber == undefined || this.isShowPONumber == '') {
      this.isShowPONumber = Common.getWithExpiry("isShowPONumber");
    }

    if (this.isShowPONumber == null || this.isShowPONumber == undefined || this.isShowPONumber == '') {
      this.dataService.GetPONumberSetting().subscribe((res: any) => {
        this.isShowPONumber = res;
        Common.setWithExpiry("isShowPONumber", this.isShowPONumber);
      });
    }

  }

  getContactSetting() {
    this.isShowContact = this.dataService.Getconfigbykey("ContactName");
    if (this.isShowContact == null || this.isShowContact == undefined || this.isShowContact == '') {
      this.isShowContact = Common.getWithExpiry("isShowContact");
    }

    if (this.isShowContact == null || this.isShowContact == undefined || this.isShowContact == '') {
      this.dataService.GetContactNameSetting().subscribe((res: any) => {
        this.isShowContact = res;
        Common.setWithExpiry("isShowContact", this.isShowContact);
      });
    }

  }

  getEmailSetting() {
    this.isShowEmail = this.dataService.Getconfigbykey("EmailAddress");
    if (this.isShowEmail == null || this.isShowEmail == undefined || this.isShowEmail == '') {
      this.isShowEmail = Common.getWithExpiry("isShowEmail");
    }

    if (this.isShowEmail == null || this.isShowEmail == undefined || this.isShowEmail == '') {
      this.dataService.GetEmailAddressSetting().subscribe((res: any) => {
        this.isShowEmail = res;
        Common.setWithExpiry("isShowEmail", this.isShowEmail);
      });
    }
  }

  Getoe_tot_codes() {
    try {
      if (Common.getWithExpiry('oe_tot_codes') != undefined) {
        var oe_tot_codes = JSON.parse(Common.getWithExpiry('oe_tot_codes'));
      }
    } catch (ed) { }
    if (oe_tot_codes == null || oe_tot_codes == undefined) {
      this.dataService.GetAllTotcodes().subscribe((res: any) => {
        this.oe_tot_codes = res;
        Common.setWithExpiry('oe_tot_codes', JSON.stringify(this.oe_tot_codes));
      });
    }
    else {
      this.oe_tot_codes = oe_tot_codes;
    }

  }

  getShipViaSetting() {
    this.isShowShipVia = this.dataService.Getconfigbykey("ShipVia");
    if (this.isShowShipVia == null || this.isShowShipVia == undefined || this.isShowShipVia == '') {
      this.isShowShipVia = Common.getWithExpiry("isShowShipVia");
    }

    if (this.isShowShipVia == null || this.isShowShipVia == undefined || this.isShowShipVia == '') {
      this.dataService.GetShipViaSetting().subscribe((res: any) => {
        this.isShowShipVia = res;
        Common.setWithExpiry("isShowShipVia", this.isShowShipVia);
      });
    }

  }


  getAccountSetting() {
    this.isShowAccount = this.dataService.Getconfigbykey("ShippingAccount");
    if (this.isShowAccount == null || this.isShowAccount == undefined || this.isShowAccount == '') {
      this.isShowAccount = Common.getWithExpiry("isShowAccount");
    }

    if (this.isShowAccount == null || this.isShowAccount == undefined || this.isShowAccount == '') {
      this.dataService.GetShippingAccountSetting().subscribe((res: any) => {
        this.isShowAccount = res;
        Common.setWithExpiry("isShowAccount", this.isShowAccount);
      });
    }
  }


  getPayTypeSetting() {
    this.isShowPayType = this.dataService.Getconfigbykey("PayType");
    if (this.isShowPayType == null || this.isShowPayType == undefined || this.isShowPayType == '') {
      this.isShowPayType = Common.getWithExpiry("isShowPayType");
    }

    if (this.isShowPayType == null || this.isShowPayType == undefined || this.isShowPayType == '') {
      this.dataService.GetPayTypeSetting().subscribe((res: any) => {
        this.isShowPayType = res;
        Common.setWithExpiry("isShowPayType", this.isShowPayType);
      });
    }

  }


  getNoteSetting() {
    this.isShowNote = this.dataService.Getconfigbykey("Notes");
    if (this.isShowNote == null || this.isShowNote == undefined || this.isShowNote == '') {
      this.isShowNote = Common.getWithExpiry("isShowNote");
    }

    if (this.isShowNote == null || this.isShowNote == undefined || this.isShowNote == '') {
      this.dataService.GetNotesSetting().subscribe((res: any) => {
        this.isShowNote = res;
        Common.setWithExpiry("isShowNote", this.isShowNote);
      });
    }

  }


  populateData() {
    var userId = null;
    var userType = null;
    if (Common.getWithExpiry("CustID") != undefined && Common.getWithExpiry("CustID") != null && Common.getWithExpiry("CustID") != '') {
      userId = Common.getWithExpiry("CustID");
      userType = Common.getWithExpiry("UserType");
    }
    else {
      userId = this.GuestUserID;
      userType = '4';
    }
    if (userType != 4) {
      try {
        this.billAdd1 = this.billAdr.adr[0];
        this.billAdd2 = this.billAdr.adr[1];
        this.billCity = this.billAdr.adr[2] + this.billAdr.adr[3];
      } catch (ed) {

      }
    }
    else {

      this.billAdr = [];
      var getaddress = this.finalObj.head.bill_adr.replace('[', '').replace(']', '').split(',');

      this.billAdd1 = getaddress[0];
      if (getaddress[1] != undefined && getaddress[1] != null && getaddress[1] != '' && getaddress[1] != 'undefined') {
        this.billAdd2 = getaddress[1];
      }
      this.billCity = getaddress[2] + getaddress[3];
      this.billAdr.phone = this.finalObj.head.bill_phone;
      this.billAdr.name = this.finalObj.head.billname;
      this.billAdr.state = this.finalObj.head.billstate;
      this.billAdr.postal_code = this.finalObj.head.billPostalCode;
      this.billAdr.country_code = this.finalObj.head.billcountry;
      this.billAdr.fax = this.finalObj.head.billFax;
    }

    if (this.finalObj.head.paymentTypeList != undefined) {
      for (let prod of this.finalObj.head.paymentTypeList) {
        if (prod.terms_code == this.finalObj.head.terms_code) {
          this.paymenttermdesc = prod.descr;
        }
      }
    }

    if (this.isPunchOut) {
      this.paymenttermdesc = this.finalObj.head.terms_code;
    }

    if (this.finalObj.head.shipFOBList != undefined) {
      for (let fob of this.finalObj.head.shipFOBList) {
        if (fob.ship_via_code == this.finalObj.head.ship_via_code) {
          this.shipviadesc = fob.descr;
        }
      }
    }

    if (this.isPunchOut) {
      this.shipviadesc = this.finalObj.head.oe_head_ship_via_code;
    }

    if (this.finalObj.head.ship_id == "-1" || this.finalObj.head.ship_id == null || this.finalObj.head.ship_id == undefined || this.finalObj.head.ship_id == "") {

      if (this.PunchOutType == "Southern") {
        this.head.shipName = this.finalObj.southenShipName;
        this.head.shipphone = this.finalObj.southernShipPhone;
        this.head.shipfax = this.finalObj.southernShipFax;
        this.shipAddr1 = this.finalObj.southernShipAddress1;
        this.shipAddr2 = this.finalObj.southernShipAddress2;
        this.shipCity = this.finalObj.southernShipCity;
        this.shipState = this.finalObj.southernShipState;
        this.shipCountry = this.finalObj.southernShipCountry;
        this.shipZIP = this.finalObj.southernShipPostalCode;
      }
      else {
        this.finalObj.head.ship_id = undefined;
        if (this.finalObj.head.s_adr != undefined && this.finalObj.head.s_adr != null && this.finalObj.head.s_adr != '') {
          try {
            var add = JSON.parse(this.finalObj.head.s_adr);
            this.head.shipName = this.finalObj.head.s_name;
            this.head.shipAdr = this.finalObj.head.s_adr;
            this.head.shipphone = this.finalObj.head.s_phone;
            this.head.shipfax = "";
            this.shipAddr1 = add[0].trim();
            this.shipAddr2 = add[1].trim();
            this.shipCity = (add[2].trim() + add[3].trim());
            this.shipState = this.finalObj.head.s_st;
            this.shipCountry = this.finalObj.head.s_country_code;
            this.getaddresscityno(this.shipCountry);
            this.shipZIP = this.finalObj.head.s_postal_code;
          } catch (e) { }
        }
      }
    }
    else {

      if (this.finalObj.head.ship_id == "same") {
        this.shiptoadd = this.billAdr.adr;
        this.head.shipName = this.billAdr.name;
        this.head.shipphone = this.billAdr.phone;
        this.head.shipfax = this.billAdr.fax;
        if (this.UserType != 4) {
          this.head.shipAdr = this.billAdr.adr;
          this.shipAddr1 = this.billAdr.adr[0].trim();
          this.shipAddr2 = this.billAdr.adr[1].trim();
          this.shipCity = (this.billAdr.adr[2].trim() + this.billAdr.adr[3].trim());
          this.shipState = this.billAdr.state;
          this.shipCountry = this.billAdr.country_code;
        }
        else {
          this.head.shipAdr = "[" + this.billAdr.Addr1 + "," + this.billAdr.Addr2 + "," + (this.cityno == 3 ? +this.billAdr.City : '') + "," + (this.cityno == 4 ? +this.billAdr.City : '') + "]";
          this.shipAddr1 = this.billAdr.Addr1;
          this.shipAddr2 = this.billAdr.Addr2;
          this.shipCity = this.billAdr.City;
          this.shipState = this.billAdr.selectedState;
          this.shipCountry = this.billAdr.selectedcountry;
        }

        this.getaddresscityno(this.shipCountry);
        this.shipZIP = this.billAdr.postal_code;
      }
      else {
        try {
          if (Common.getWithExpiry("shippingAddress") != undefined) {
            this.shipAdr = JSON.parse(Common.getWithExpiry("shippingAddress"));
          }
        } catch (ed) { }

        for (var i = 0; i < this.shipAdr.length; i++) {
          if (this.shipAdr[i].ship_id == this.finalObj.head.ship_id) {
            this.shiptoadd = this.shipAdr[i];
            this.head.shipName = this.shipAdr[i].name;
            this.head.shipAdr = this.shipAdr[i].adr;
            this.head.shipphone = this.shipAdr[i].phone;
            this.head.shipfax = this.shipAdr[i].fax;
            this.shipAddr1 = this.shipAdr[i].adr[0].trim();
            this.shipAddr2 = this.shipAdr[i].adr[1].trim();
            this.shipCity = (this.shipAdr[i].adr[2].trim() + this.shipAdr[i].adr[3].trim());
            this.shipState = this.shipAdr[i].state;
            this.shipCountry = this.shipAdr[i].country_code;
            this.getaddresscityno(this.shipCountry);
            this.shipZIP = this.shipAdr[i].postal_code;
            //this.warehouse = this.shipAdr[i].warehouse;
            break;

          }
        }
      }
    }
    this.createTempOrder();
  }

  getBillingAddress() {
    this.checkoutService.getBillingAddress(Common.getWithExpiry("CustID")).subscribe((res: any) => {
      this.billAdr = res;
      if (this.billAdr != null) {
        try {
          this.billAdr.adr = JSON.parse(this.billAdr.adr);
          this.billAdd1 = this.billAdr.adr[0];
          this.billAdd2 = this.billAdr.adr[1];
          this.billCity = (this.billAdr.adr[2] + this.billAdr.adr[3]);
        } catch (ed) { }
      }

      this.getShipingAddress();

    });
  }

  getShipingAddress() {
    var usrid = null;
    if (Common.getWithExpiry("UserType") == '3') {
      usrid = Common.getWithExpiry("UserID");
    }
    if (this.PunchOutType == "preiser") {
      usrid = null;
    }
    this.checkoutService.getShipingAddress(Common.getWithExpiry("CustID"), usrid).subscribe((res: any) => {
      this.shipAdr = res;
      for (let ppl of this.shipAdr) {
        ppl.adr = JSON.parse(ppl.adr);
      }
      Common.setWithExpiry("shippingAddress", JSON.stringify(this.shipAdr));
      this.populateData();
    });
  }
  getIP() {
    // this.checkoutService.getIPAddress().subscribe((res: any) => {
    //   this.ipAddress = res.ip;
    // });
  }
  createTempOrder() {

    for (var i = 0; i < this.finalObj.lines.length; i++) {
      //Common.gotoproductdetails(this.finalObj.lines[i], this.UrlWithDetails, this.UrlWithFreeForm);
      var um = this.finalObj.lines[i].um_o.replace(/[\n\r]+/g, '');
      this.finalObj.lines[i].um_o = um.replace(/\s{2,10}/g, ' ');
      this.finalObj.lines[i].descr1 = this.finalObj.lines[i].descr;
      try {
        this.finalObj.lines[i].descr = JSON.stringify(this.finalObj.lines[i].descr).toString().replace(/[\n\r\"]+/g, '');
      } catch (ed) {
        this.finalObj.lines[i].descr = "";
      }
      if (this.Processwithzeroprice == '0') {
        if (this.finalObj.lines[i].price == 0) {
          this.flagtosubmit = false;
          this.toastr.error("One or Many Product dont have their price please contact for price");

        }
      }
    }



    if (this.finalObj.head.billAdr != null && this.finalObj.head.billAdr != undefined && this.finalObj.head.billAdr != '') {
      this.finalObj.head.billAdr = JSON.stringify(this.finalObj.head.billAdr);
    }
    if (this.finalObj.head.bill_adr != null && this.finalObj.head.bill_adr != undefined && this.finalObj.head.bill_adr != '') {
      this.finalObj.head.bill_adr = JSON.stringify(this.finalObj.head.bill_adr);
    }

    if (this.flagtosubmit == true) {
      if (this.isPunchOut) {
        this.ProcessTempOrder = '0';
      }
      if ((this.finalObj.lines.length >= 50 && this.SubmitTempOrder == '0') || this.ProcessTempOrder == '0') {
        var totalget = 0;
        for (var i = 0; i < this.finalObj.lines.length; i++) {
          totalget = totalget + (this.finalObj.lines[i].price_per * this.finalObj.lines[i].quantity);
        }
        var getsumot = 0;
        this.tax_code = "0";
        try {
          this.frieght = this.finalObj.head.Frieght == undefined ? 0 : this.finalObj.head.Frieght; // This needs to be changed.
          if (!this.frieght) {
            this.frieght = 0;
          }
        } catch (ed) { }
        this.tax = 0

        this.subTotal = totalget;// data.head.o_tot_gross == null ? 0 : data.head.o_tot_gross; //data.head.o_tot_net_ar == null? data.head.o_tot_gross :data.head.o_tot_net_ar;
        this.total = this.subTotal + (this.frieght == undefined ? 0 : this.frieght) + this.tax + getsumot;  // data.head.o_tot_net_ar == null ? data.head.o_tot_gross : data.head.o_tot_net_ar; //this.subTotal + this.frieght + this.tax // This needs to be changed.

      }
      else {


        try {
          if (this.finalObj.notes != undefined && this.finalObj.notes != null && this.finalObj.notes != '') {
            this.finalObj.notes = this.finalObj.notes.replace(/\r?\n|\r/g, ' ');
          }

          this.sendMessage('start');
          this.checkoutService.createOrder(this.finalObj).subscribe((res: any) => {
            this.sendMessage('stop');
            var data = res;
            var alavarlines: any = [];
            var alavarlines1: any = [];
            
            this.temporder = data;
            var totalget = 0;

            for (var i = 0; i < this.finalObj.lines.length; i++) {
              totalget = totalget + (this.finalObj.lines[i].price_per * this.finalObj.lines[i].quantity);
            }
            var getsumot = 0;
            if (data != undefined && data.head != undefined && data.head.c_tot_code != undefined && data.head.c_tot_code != null) {
              var gettos = data.head.c_tot_code;
              var getsaamt = data.head.c_tot_code_amt;
              this.aftertotcodes = [];
              for (var i = 0; i < gettos.length; i++) {
                for (var j = 0; j < this.oe_tot_codes.length; j++) {
                  if (gettos[i] == this.oe_tot_codes[j].code) {
                    this.aftertotcodes.push({ 'name': this.oe_tot_codes[j].name, 'amt': getsaamt[i] });
                    getsumot = getsumot + getsaamt[i];
                    if (getsaamt[i] > 0) {
                      let alitem = {
                        unit_price: getsaamt[i],
                        descr: this.oe_tot_codes[j].name,
                        qty_ord: 1,
                        item: this.oe_tot_codes[j].code,
                        childitem: "1"
                      }
                      alavarlines1.push(alitem);
                    }
                  }
                }
              }
            }
            //this.aftertotcodes=getallcodes;

            this.tax_code = "0";
            this.frieght = this.finalObj.head.Frieght == undefined ? 0 : this.finalObj.head.Frieght; // This needs to be changed.
            this.tax = 0
            if (data != undefined && data.head != undefined) {
              this.tax_code = data.head.tax_code == "NON" ? "0" : data.head.tax_code;
              this.tax = data.head.o_tot_tax_amt;

              // var model = {
              //   "LogType": "TempOrder",
              //   "Description": "Temp order created successfully.",
              //   "SearchKeyword": "",
              //   "CustID":Common.getWithExpiry("CustID"),
              //   "UserId": Common.getWithExpiry("UserID"),
              //   "ClientIP": this.ipAddress
              // }          
              // this.dataService.AddActivityLog(model).subscribe((res: any) => {

              // });
            }
            else {
              // var model = {
              //   "LogType": "TempOrder",
              //   "Description": data + " Model: " + JSON.stringify(this.finalObj),
              //   "SearchKeyword": "",
              //   "CustID":Common.getWithExpiry("CustID"),
              //   "UserId": Common.getWithExpiry("UserID"),
              //   "ClientIP": this.ipAddress
              // }          
              // this.dataService.AddActivityLog(model).subscribe((res: any) => {

              // });

            }
            this.subTotal = totalget;// data.head.o_tot_gross == null ? 0 : data.head.o_tot_gross; //data.head.o_tot_net_ar == null? data.head.o_tot_gross :data.head.o_tot_net_ar;
            this.total = this.subTotal + this.tax + getsumot;  // data.head.o_tot_net_ar == null ? data.head.o_tot_gross : data.head.o_tot_net_ar; //this.subTotal + this.frieght + this.tax // This needs to be changed.
            if (this.alavartax == '1') {

              var contactDtl: any;
              contactDtl = JSON.parse(Common.getWithExpiry("contactDtl"));
              contactDtl.adr = JSON.parse(contactDtl.adr);




              for (var i = 0; i < this.finalObj.lines.length; i++) {
                var item = {
                  unit_price: this.finalObj.lines[i].price_per * this.finalObj.lines[i].quantity,
                  descr: "",
                  qty_ord: this.finalObj.lines[i].quantity,
                  item: this.finalObj.lines[i].item,
                  childitem: "0"
                }
                alavarlines.push(item);
              }
              if (alavarlines1 != undefined && alavarlines != null && alavarlines.length > 0) {
                for (var i = 0; i < alavarlines1.length; i++) {
                  alavarlines.push(alavarlines1[i]);
                }
              }

              var lines = {
                "Lines": alavarlines,
              }
              var alavarobj = {
                "cu_po": res.order,
                "notes": this.ipAddress,
                "customer": Common.getWithExpiry("CustID"),
                "wanted_date": "",
                "adr1": contactDtl.adr[0],
                "adr2": contactDtl.adr[1],
                "adr3": contactDtl.adr[2],
                "adr4": contactDtl.adr[3],
                "state": contactDtl.state,
                "country": contactDtl.country_code,
                "postal_code": contactDtl.postal_code,
                "s_adr1": this.shipAddr1,
                "s_adr2": this.shipAddr2,
                "s_adr3": this.shipCity,
                "s_adr4": "",
                "s_st": this.shipState,
                "s_country_code": this.shipCountry,
                "s_postal_code": this.shipZIP,
                "NewOrderlines": lines
              }
              this.checkoutService.InsertalavarataxMethod(alavarobj).subscribe((res1: any) => {
                if (res1 != null && res1 != undefined) {
                  if (res1.totalTaxCalculated != undefined && res1.totalTaxCalculated > 0) {
                    //this.Misc_60="AvaTax Calculated - $"+res1.totalTaxCalculated;
                    this.Misc_60 = res1.totalTaxCalculated;
                    this.aftertotcodes.push({ 'name': 'TAX', 'amt': res1.totalTaxCalculated });
                    this.total = this.subTotal + this.tax + getsumot + res1.totalTaxCalculated;
                  }
                }
              });
            }

          });
        } catch (exx) {

          //this.sendMessage('stop');
        }
      }
    }
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

  }

  finalizeOrder() {
    var userId = null;
    var userType = null;
    if (Common.getWithExpiry("CustID") != undefined && Common.getWithExpiry("CustID") != null && Common.getWithExpiry("CustID") != '') {
      userId = Common.getWithExpiry("CustID");
      userType = Common.getWithExpiry("UserType");
    }
    else {
      userId = this.GuestUserID;
      userType = '4';
    }

    if (this.termsandcondition == '1' && this.terms == false && this.termsrequired == '1') {
      this.toastr.error("Please Accept Terms and Conditions");
      const element = this.renderer.selectRootElement("#termsandcondition");
      element.focus();
      return;
    }
    else if (this.flagtosubmit == false) {
      this.toastr.error("One or Many Product dont have their price please contact for price");
    }
    else if (this.total >= parseFloat(this.web_order_min_amount)) {

      var lines = [];
      var ordExt = 'd' + Math.floor(100000 + Math.random() * 900000);
      for (var i = 0; i < this.finalObj.lines.length; i++) {
        try {
          var um = this.finalObj.lines[i].um_o.replace(/[\n\r]+/g, '');
          //this.finalObj.lines[i].descr1=this.finalObj.lines[i].descr1.toString().replace(/[\n\r\"]+/g, '');
        } catch (ed) { }
        lines.push(this.TextUpperCase == '1' ? this.ConvertKeysToUpperCase({
          "order_ext": ordExt, //this.finalObj.head.cu_po,
          "customer": userId,
          "warehouse":(this.iskyraden ? (this.finalObj.lines[i].warehouse==undefined ? this.warehouse : this.finalObj.lines[i].warehouse) : (this.warehouse == undefined ? this.Guestwarehouse : this.warehouse)),
          "line": this.finalObj.lines[i].reference,
          "item": this.finalObj.lines[i].item,
          "descr": this.finalObj.lines[i].descr,
          "qty_ord": this.finalObj.lines[i].quantity,
          "unit_price": parseFloat(this.finalObj.lines[i].price) / parseFloat(this.finalObj.lines[i].quantity),
          "um_o": um.replace(/\s{2,10}/g, ' '),
          "notes": this.finalObj.lines[i].Note,
        }) : {
          "order_ext": ordExt, //this.finalObj.head.cu_po,
          "customer": userId,
          "warehouse":(this.iskyraden ? (this.finalObj.lines[i].warehouse==undefined ? this.warehouse : this.finalObj.lines[i].warehouse) : (this.warehouse == undefined ? this.Guestwarehouse : this.warehouse)),
          "line": this.finalObj.lines[i].reference,
          "item": this.finalObj.lines[i].item,
          "descr": this.finalObj.lines[i].descr,
          "qty_ord": this.finalObj.lines[i].quantity,
          "unit_price": parseFloat(this.finalObj.lines[i].price) / parseFloat(this.finalObj.lines[i].quantity),
          "um_o": um.replace(/\s{2,10}/g, ' '),
          "notes": this.finalObj.lines[i].Note,
        });
      }

      var linesVM = {
        "table": "",
        "triggers": "",
        "Lines": lines
      }
      var orderby = '';
      if (this.finalObj.head.orderby_phone != null && this.finalObj.head.orderby_phone != '') {
        orderby = this.finalObj.head.orderby_phone;
      }
      else {
        orderby = (Common.getWithExpiry("SalesCustID") == undefined ? Common.getWithExpiry("CustID") : Common.getWithExpiry("SalesCustID"));
      }

      // var cardType;
      // if (this.finalObj.head.CardType != undefined && this.finalObj.head.CardType != null && this.finalObj.head.CardType != '') {
      //   if (this.finalObj.head.CardType.toLowerCase() == "visa")
      //     cardType = "VI";
      //   else if (this.finalObj.head.CardType.toLowerCase() == "mastercard")
      //     cardType = "MC";
      //   else if (this.finalObj.head.CardType.toLowerCase() == "discover")
      //     cardType = "DI"
      //   else if (this.finalObj.head.CardType.toLowerCase() == "americanexpress")
      //     cardType = "AX";
      // }
      var model = {
        "order_ext": ordExt, //this.finalObj.head.cu_po,
        "customer": userId,
        "order": this.finalObj.head.order,
        "warehouse": (this.iskyraden ? this.finalObj.lines[0].warehouse: (this.warehouse == undefined ? this.Guestwarehouse : this.warehouse)),
        "rec_type": "o",
        "ship_id": this.finalObj.head.ship_id,
        "auth_amount": this.total,
        "pay_amount": this.total,
        "cu_po": (this.isShowPONumber == '1' ? this.finalObj.head.cu_po : ''),
        "wanted_date": (this.isShowWantedDate == '1' ? this.finalObj.head.wanted_date : ''),
        "cancel_date": (this.isShowCanecelDate == '1' ? this.finalObj.head.cancel_date : ''),
        "job_rel": (this.finalObj.head.job_rel == undefined ? "" : this.finalObj.head.job_rel),
        "cell_phone": this.finalObj.head.cell_phone,
        "enter_by": (this.finalObj.head.enter_by == undefined ? Common.getWithExpiry("UserID") : (this.finalObj.head.enter_by == "" ? Common.getWithExpiry("UserID") : this.finalObj.head.enter_by)),
        "ship_cmpl": (this.finalObj.head.ship_cmpl == undefined ? "" : this.finalObj.head.ship_cmpl),
        "email_address": (this.isShowEmail == '1' ? this.finalObj.head.email : ''),
        "ship_via_code": (this.isShowShipVia == '1' ? this.finalObj.head.ship_via_code : ''),
        "terms_code": (this.isShowPayType == '1' ? this.finalObj.head.terms_code : ''),
        "Cred_card": null,
        "Pay_code_card": null,
        "Cred_card_type": "",
        "Cred_card_exp": null,
        "Pay_code_exp": null,
        "Pay_code_sec": null,
        "ExpirationMonth": null,
        "ExpirationYear": null,
        "notes": (this.isShowNote == '1' ? (this.finalObj.notes == undefined ? "" : this.finalObj.notes) : ''),
        "tot_code": (this.temporder != undefined ? this.temporder.head.c_tot_code.toString() : ""),
        "tot_code_amt": (this.temporder != undefined ? this.temporder.head.c_tot_code_amt.toString() : ""),
        "tax_amount": this.tax.toString(),
        "tax_code": (this.temporder != undefined ? this.temporder.head.tax_code.toString() : ""),
        "Misc_8": this.subTotal.toString(),
        "Misc_9": this.total.toString(),
        "Misc_60": this.Misc_60.toString(),
        "pay_code": this.finalObj.head.CardType, //payment.cart,
        "pay_cd": this.finalObj.head.CardType, //payment.cart,
        "pay_code_amount": this.total, //payment.transactions[0].amount.total,
        "s_name": (this.finalObj.head.ship_id != undefined ? null : this.finalObj.head.s_name),
        "s_adr1": (this.finalObj.head.ship_id != undefined ? null : this.shipAddr1),
        "s_phone": (this.finalObj.head.ship_id != undefined ? null : this.head.shipphone),
        "s_adr2": (this.finalObj.head.ship_id != undefined ? null : this.shipAddr2),
        "s_adr3": (this.cityno != 4 ? (this.finalObj.head.ship_id != undefined ? null : this.shipCity) : null),
        "s_adr4": (this.cityno == 4 ? (this.finalObj.head.ship_id != undefined ? null : this.shipCity) : null),
        "s_st": (this.finalObj.head.ship_id != undefined ? null : this.shipState),
        "s_postal_code": (this.finalObj.head.ship_id != undefined ? null : this.shipZIP),
        "s_country_code": (this.finalObj.head.ship_id != undefined ? null : this.shipCountry),
        "residential": (this.finalObj.head.ship_id != undefined ? null : this.finalObj.head.residential),
        "free_form_shipto": this.finalObj.head.free_form_shipto,
        "ship_atn": (this.finalObj.head.ship_atn != undefined ? this.finalObj.head.ship_atn : null),
        "blind_ship": (this.finalObj.head.blind_ship == undefined ? "no" : (this.finalObj.head.blind_ship == '' ? "no" : this.finalObj.head.blind_ship)),
        "ship_via_acct": (this.isShowAccount == '1' ? this.finalObj.head.ship_via_acct : ''),
        "orderby": (this.isShowContact == '1' ? orderby : ''),
        "NewOrderlines": linesVM,
        "company_sy": Common.getWithExpiry("company_sy"),
        "pofile":this.finalObj.head.pofile
      }
      // if(this.TextUpperCase=='1'){
      //   try{
      //     model = this.ConvertKeysToUpperCase(model);

      //   }catch(ed){

      //   }
      // }

      this.sendMessage('start');
      try {
        this.submitbuttondisable = true;
        this.checkoutService.FinalizeOrder1((this.TextUpperCase == '1' ? this.ConvertKeysToUpperCase(model) : model)).subscribe((res: any) => {

          this.orderno = res;
          this.sendMessage('stop');
          if (this.orderno.indexOf("Order") != -1 && this.orderno.indexOf("EXCEPTION") == -1) {

            // var model = {
            //   "LogType": "SubmitOrder",
            //   "Description": "Order submitted successfully.",
            //   "SearchKeyword": "",
            //   "CustID":Common.getWithExpiry("CustID"),
            //   "UserId": Common.getWithExpiry("UserID"),
            //   "ClientIP": this.ipAddress
            // }        
            // this.dataService.AddActivityLog(model).subscribe((res: any) => {

            // });


            this.orderno = this.orderno.replace("Order:", "");
            this.isSubmitted = true;
            this.tagmanager();
            
            this.cartService.deleteCartByUserId().subscribe((res: any) => {
              this.cartService.cartBroadCaster(res);
              Common.removeWithExpiry("addrObj");
              Common.removeWithExpiry("itemObj");
              Common.removeWithExpiry("shippingAddress");
              Common.removeWithExpiry("finalObj");
            });
          }
          else {
            // var model = {
            //   "LogType": "SubmitOrder",
            //   "Description": "Error occurred while processing order.",
            //   "SearchKeyword": "",
            //   "CustID":Common.getWithExpiry("CustID"),
            //   "UserId": Common.getWithExpiry("UserID"),
            //   "ClientIP": this.ipAddress
            // }        
            // this.dataService.AddActivityLog(model).subscribe((res: any) => {

            // });
            this.isError = true;
          }
        });
      } catch (ex) {
        this.sendMessage('stop');
      }
    }
    else {
      this.toastr.error("Order Minimum Value Should Be $" + this.web_order_min_amount, 'Message!');
    }
    this.gototop();
  }


  print(): void {
    var geturl = window.location.href.toString();
    geturl = geturl.replace(this.router.url, '');

    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=1000px,width=1000px');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
        <title>Order Print</title>
          <link rel="stylesheet" href="`+ geturl + `/assets/css/bootstrap.min.css">    
  <link rel="stylesheet" href="`+ geturl + `/assets/css/bootstrap-select.min.css">    
  <link rel="stylesheet" href="`+ geturl + `/assets/css/main.css">  
  <link rel="stylesheet" href="`+ geturl + `/assets/css/blue.css">  
  <link rel="stylesheet" href="`+ geturl + `/assets/css/animate.min.css">
  <link rel="stylesheet" href="`+ geturl + `/assets/css/rateit.css">    
  <link rel="stylesheet" href="`+ geturl + `/assets/css/font-awesome.css">    
  <link href='`+ geturl + `/assets/css/font1.css' rel='stylesheet' type='text/css'>
  <link href='`+ geturl + `/assets/css/font2.css' rel='stylesheet' type='text/css'>
  <link href='`+ geturl + `/assets/css/font3.css' rel='stylesheet' type='text/css'>  
          <style>
          //........Customized style.......
          </style>
          <style type="text/css" media="print">
          body{zoom:-50%; margin: 0px !important; margin: 0px !important;}
          #firstdiv,#seconddiv{display:flex;}
          .col-md-6{position: relative;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px; width:50% !important;}
            .col-md-12{position: relative;
              min-height: 1px;
              padding-right: 0px !important;
              padding-left: 0px !important;}
            #itemtable{margin:0px !important;padding:0px !important;}
//body {width: 800px;height: 1000px;margin: -50% -50%;font-size: 20px !important;}
//table{font-size: 20px !important;}
//label{font-size: 20px !important;}
//h4{font-size: 20px !important;}
</style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    //popupWin.document.close();
  }

  ConvertKeysToUpperCase(obj) {
    try {
      var key, keys = Object.keys(obj);
      var n = keys.length;
      var newobj = {}
      while (n--) {
        key = keys[n];
        try {
          if (obj[key] != undefined && obj[key] != null) {
            newobj[key] = (typeof obj[key] == 'string' ? obj[key].toUpperCase() : obj[key]);
          }
          else {
            newobj[key] = obj[key];
          }
        } catch (ex) {
          newobj[key] = obj[key];


        }
      }
      return newobj;
    } catch (ex) {

      return obj;
    }
  };

  findandreplace(stringval) {
    try {
      stringval = stringval.trim();
      stringval = stringval.replace(new RegExp("\/", "g"), '');
      stringval = stringval.replace(new RegExp("#", "g"), '');
    } catch (ed) { }
    return stringval;
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
  Gettermsandconditions() {

    this.termsandcondition = this.dataService.Getconfigbykey("termsandconditions");
    if (this.termsandcondition == null || this.termsandcondition == undefined || this.termsandcondition == '') {
      this.termsandcondition = Common.getWithExpiry("termsandcondition");
    }

    if (this.termsandcondition == null || this.termsandcondition == undefined || this.termsandcondition == '') {
      this.dataService.Gettermsandconditions().subscribe((data: any) => {
        this.termsandcondition = data;
        if (this.termsandcondition == '1') {
          this.Geturloftermsandconditions();
          this.GettermsandconditionsLable();
          this.GettermsandconditionsRequired();
        }
        Common.setWithExpiry("termsandcondition", this.termsandcondition);
      })
    } else {
      if (this.termsandcondition == '1') {
        this.Geturloftermsandconditions();
        this.GettermsandconditionsLable();
        this.GettermsandconditionsRequired();
      }
    }
  }
  Geturloftermsandconditions() {
    this.urltermsandcondition = this.dataService.Getconfigbykey("urloftermsandconditions");
    if (this.urltermsandcondition == null || this.urltermsandcondition == undefined || this.urltermsandcondition == '') {
      this.urltermsandcondition = Common.getWithExpiry("urltermsandcondition");
    }
    if (this.urltermsandcondition == null || this.urltermsandcondition == undefined || this.urltermsandcondition == '') {
      this.dataService.Geturloftermsandconditions().subscribe((data: any) => {
        this.urltermsandcondition = data;
        Common.setWithExpiry("urltermsandcondition", this.urltermsandcondition);
      })
    }
  }
  GettermsandconditionsRequired() {
    this.termsrequired = this.dataService.Getconfigbykey("termsandconditionsRequired");
    if (this.termsrequired == null || this.termsrequired == undefined || this.termsrequired == '') {
      this.termsrequired = Common.getWithExpiry("termsrequired");
    }
    if (this.termsrequired == null || this.termsrequired == undefined || this.termsrequired == '') {
      this.dataService.GettermsandconditionsRequired().subscribe((data: any) => {
        this.termsrequired = data;
        Common.setWithExpiry("termsrequired", this.termsrequired);
      })
    }
  }
  GettermsandconditionsLable() {
    this.termsrequired = this.dataService.Getconfigbykey("termsandconditionsLable");
    if (this.termslable == null || this.termslable == undefined || this.termslable == '') {
      this.termslable = Common.getWithExpiry("termslable");
    }
    if (this.termslable == null || this.termslable == undefined || this.termslable == '') {
      this.dataService.GettermsandconditionsLable().subscribe((data: any) => {
        this.termslable = data;
        Common.setWithExpiry("termslable", this.termslable);
      })
    }
  }

  backToCheckOut() {
    //this.router.navigate(['checkout']);
    this.router.navigate([this.reviewurlformodify]);
  }

  backToPendingOrder() {
    this.router.navigate(['/order-management/pending-order']);
  }

  payment() {
    var userId = null;
    var userType = null;
    if (Common.getWithExpiry("CustID") != undefined && Common.getWithExpiry("CustID") != null && Common.getWithExpiry("CustID") != '') {
      userId = Common.getWithExpiry("CustID");
      userType = Common.getWithExpiry("UserType");
    }
    else {
      userId = this.GuestUserID;
      userType = '4';
    }
    
    if (this.termsandcondition == '1' && this.terms == false && this.termsrequired == '1') {
      this.toastr.error("Please Accept Terms and Conditions");
      const element = this.renderer.selectRootElement("#termsandcondition");
      element.focus();
      return;
    }
    else if (this.flagtosubmit == false) {
      this.toastr.error("One or Many Product dont have their price please contact for price");
      this.submitbuttondisable = false;
    }
    else if (this.total >= parseFloat(this.web_order_min_amount)) {

      var lines = [];
      try {
        if (Common.getWithExpiry("itemObj") != undefined) {
          var lineData = JSON.parse(Common.getWithExpiry("itemObj"));
        }
      } catch (ed) { }


      if (lineData == null) {
        lineData = this.finalObj.lines;
        for (var i = 0; i < lineData.length; i++) {
          lines.push({ "ItemId": i, "Name": lineData[i].item, "descr": lineData[i].descr, "Quantity": lineData[i].quantity, "UnitPrice": lineData[i].price_per });
        }
      }
      else {
        for (var i = 0; i < lineData.length; i++) {
          lines.push(
            (this.TextUpperCase == '1' ?
              this.ConvertKeysToUpperCase({ "ItemId": i, "Name": lineData[i].product.itemnumber, "descr": lineData[i].descr, "Quantity": lineData[i].quantity, "UnitPrice": lineData[i].product.parsedPrice }) :
              { "ItemId": i, "Name": lineData[i].product.itemnumber, "descr": lineData[i].descr, "Quantity": lineData[i].quantity, "UnitPrice": lineData[i].product.parsedPrice }
            ));
        }
      }

      var getname = this.finalObj.head.CardHolderName.split(' ');
      var lastname = '';
      for (var i = 1; i < getname.length; i++) {
        lastname = lastname + getname[i] + ' ';
      }
      var paymentModel = {
        "Amount": Math.round(this.total * 100) / 100,
        "CardNumber": this.finalObj.head.CardNumber,
        "ExpirationDate": this.finalObj.head.ExpirationDate,
        "CardCode": this.finalObj.head.SecurityCode,
        "FirstName": getname[0],
        "LastName": lastname.trim(),
        "Address": this.finalObj.head.cardDetailadr1 + " " + this.finalObj.head.cardDetailadr2,
        "City": this.finalObj.head.cardDetailcity,
        "PaymentItems": lines,
        "zip": this.finalObj.head.cardDetailzip,
        "State": this.finalObj.head.cardDetailselectedState,
        "country": this.finalObj.head.cardDetailselectedCountry,
        "ExpirationMonth": this.finalObj.head.ExpirationMonth,
        "ExpirationYear": this.finalObj.head.ExpirationYear,
        "CardType": this.finalObj.head.CardType,
        "ShippingCharge": Math.round(this.frieght * 100) / 100,
        "SubTotal": Math.round(this.subTotal * 100) / 100,
        "TAX": Math.round(this.tax * 100) / 100,
        "Total": Math.round(this.total * 100) / 100,
        "email": this.finalObj.head.cardDetailEmail,
        "profileid": this.finalObj.head.profileid,
        "company_sy": Common.getWithExpiry("company_sy")
      }

      /********** Payment Model End ***********/



      /*********** Order Model Start **********/
      var lines = [];

      //var ordExt = 'd' + Math.floor(100000 + Math.random() * 900000);

      for (var i = 0; i < this.finalObj.lines.length; i++) {

        var um = this.finalObj.lines[i].um_o.replace(/[\n\r]+/g, '');

        lines.push((this.TextUpperCase == '1' ? this.ConvertKeysToUpperCase({
          //"order_ext": ordExt, //this.finalObj.head.cu_po,
          "customer": userId,
          "warehouse":(this.iskyraden ? (this.finalObj.lines[i].warehouse==undefined? this.warehouse : this.finalObj.lines[i].warehouse) : (this.warehouse == undefined ? this.Guestwarehouse : this.warehouse)),
          "line": this.finalObj.lines[i].reference,
          "item": this.finalObj.lines[i].item,
          "descr": this.finalObj.lines[i].descr,
          "qty_ord": this.finalObj.lines[i].quantity,
          "unit_price": Math.round(parseFloat(this.finalObj.lines[i].price) / parseFloat(this.finalObj.lines[i].quantity) * 100) / 100,
          "um_o": um.replace(/\s{2,10}/g, ' '),
          "notes": this.finalObj.lines[i].Note
        }) : {
          //"order_ext": ordExt, //this.finalObj.head.cu_po,
          "customer": userId,
          "warehouse":(this.iskyraden ? (this.finalObj.lines[i].warehouse==undefined? this.warehouse : this.finalObj.lines[i].warehouse) : (this.warehouse == undefined ? this.Guestwarehouse : this.warehouse)),
          "line": this.finalObj.lines[i].reference,
          "item": this.finalObj.lines[i].item,
          "descr": this.finalObj.lines[i].descr,
          "qty_ord": this.finalObj.lines[i].quantity,
          "unit_price": Math.round(parseFloat(this.finalObj.lines[i].price) / parseFloat(this.finalObj.lines[i].quantity) * 100) / 100,
          "um_o": um.replace(/\s{2,10}/g, ' '),
          "notes": this.finalObj.lines[i].Note
        }));
      }

      var linesVM = {
        "table": "",
        "triggers": "",
        "Lines": lines
      }
      var orderby = '';
      if (this.finalObj.head.orderby_phone != null && this.finalObj.head.orderby_phone != '') {
        orderby = this.finalObj.head.orderby_phone;
      }
      else {
        orderby = (Common.getWithExpiry("SalesCustID") == undefined ? Common.getWithExpiry("CustID") : Common.getWithExpiry("SalesCustID"));
      }

      // var cardType;
      // if (this.finalObj.head.CardType != null) {
      //   if (this.finalObj.head.CardType.toLowerCase() == "visa")
      //     cardType = "VI";
      //   else if (this.finalObj.head.CardType.toLowerCase() == "mastercard")
      //     cardType = "MC";
      //   else if (this.finalObj.head.CardType.toLowerCase() == "discover")
      //     cardType = "DI"
      //   else if (this.finalObj.head.CardType.toLowerCase() == "americanexpress")
      //     cardType = "AX";
      // }

      var model = {
        "customer": userId,
        "name": this.billAdr.name,
        "adr1": this.billAdd1,
        "adr2": this.billAdd2,
        "adr3": this.billCity,
        "postal_code": this.billAdr.postal_code,
        "warehouse": (this.iskyraden ? this.finalObj.lines[0].warehouse: (this.warehouse == undefined ? this.Guestwarehouse : this.warehouse)),
        "rec_type": "o",
        "ship_id": this.finalObj.head.ship_id,
        "auth_amount": Math.round(this.total * 100) / 100,
        "pay_amount": Math.round(this.total * 100) / 100,
        "cu_po": (this.isShowPONumber == '1' ? this.finalObj.head.cu_po : ''),
        "wanted_date": (this.isShowWantedDate == '1' ? this.finalObj.head.wanted_date : ''),
        "cancel_date": (this.isShowCanecelDate == '1' ? this.finalObj.head.cancel_date : ''),
        "job_rel": this.finalObj.head.job_rel,
        "cell_phone": this.finalObj.head.cell_phone,
        "ship_cmpl": (this.finalObj.head.ship_cmpl == undefined ? "" : this.finalObj.head.ship_cmpl),
        "email_address": (this.isShowEmail == '1' ? this.finalObj.head.email : ''),
        "ship_via_code": (this.isShowShipVia == '1' ? this.finalObj.head.ship_via_code : ''),
        "terms_code": (this.isShowPayType == '1' ? this.finalObj.head.terms_code : ''),
        "Cred_card": this.finalObj.head.CardNumber,
        "Pay_code_card": (this.finalObj.head.CardNumber == undefined ? "" : this.finalObj.head.CardNumber),
        "Cred_card_type": this.finalObj.head.CardType,
        "Cred_card_exp": this.finalObj.head.ExpirationDate,
        "enter_by": (this.finalObj.head.enter_by == undefined ? Common.getWithExpiry("UserID") : (this.finalObj.head.enter_by == "" ? Common.getWithExpiry("UserID") : this.finalObj.head.enter_by)),
        "Pay_code_exp": this.finalObj.head.ExpirationDate,
        "Pay_code_sec": (this.finalObj.head.SecurityCode == undefined ? "" : this.finalObj.head.SecurityCode),
        "ExpirationMonth": this.finalObj.head.ExpirationMonth,
        "ExpirationYear": this.finalObj.head.ExpirationYear,
        "notes": (this.isShowNote == '1' ? (this.finalObj.notes == undefined ? "" : this.finalObj.notes) : ''),
        "tot_code": (this.temporder != undefined ? this.temporder.head.c_tot_code.toString() : ""),
        "tot_code_amt": (this.temporder != undefined ? this.temporder.head.c_tot_code_amt.toString() : ""),
        "tax_amount": this.tax.toString(),
        "tax_code": (this.temporder != undefined ? this.temporder.head.tax_code.toString() : ""),
        "Misc_8": this.subTotal.toString(),
        "Misc_9": this.total.toString(),
        "Misc_60": this.Misc_60.toString(),
        "pay_code": (this.finalObj.head.CardType == undefined ? "" : this.finalObj.head.CardType), //payment.cart,
        "pay_cd": (this.finalObj.head.CardType == undefined ? "" : this.finalObj.head.CardType), //payment.cart,
        "pay_code_amount": Math.round(this.total * 100) / 100, //payment.transactions[0].amount.total,
        "s_name": (this.finalObj.head.ship_id != undefined ? null : this.finalObj.head.s_name),
        "s_adr1": (this.finalObj.head.ship_id != undefined ? null : this.shipAddr1),
        "s_phone": (this.finalObj.head.ship_id != undefined ? null : this.head.shipphone),
        "s_adr2": (this.finalObj.head.ship_id != undefined ? null : this.shipAddr2),
        "s_adr3": (this.cityno != 4 ? (this.finalObj.head.ship_id != undefined ? null : this.shipCity) : null),
        "s_adr4": (this.cityno == 4 ? (this.finalObj.head.ship_id != undefined ? null : this.shipCity) : null),
        "s_st": (this.finalObj.head.ship_id != undefined ? null : this.shipState),
        "s_postal_code": (this.finalObj.head.ship_id != undefined ? null : this.shipZIP),
        "s_country_code": (this.finalObj.head.ship_id != undefined ? null : this.shipCountry),
        "residential": (this.finalObj.head.residential == undefined ? null : this.finalObj.head.residential),
        "free_form_shipto": this.finalObj.head.free_form_shipto,
        "ship_atn": (this.finalObj.head.ship_atn != undefined ? this.finalObj.head.ship_atn : null),
        "blind_ship": (this.finalObj.head.blind_ship == undefined ? "no" : (this.finalObj.head.blind_ship == '' ? "no" : this.finalObj.head.blind_ship)),
        "state": this.billAdr.state,
        "country": this.billAdr.country_code,
        "phone": this.billAdr.phone,
        "fax": this.billAdr.fax,
        "ship_via_acct": (this.isShowAccount == '1' ? this.finalObj.head.ship_via_acct : ''),
        "ShippingCharge": this.frieght,
        "order": this.finalObj.head.order,
        "orderby": (this.isShowContact == '1' ? orderby : ''),
        "NewOrderlines": linesVM,
        "company_sy": Common.getWithExpiry("company_sy"),
        "pofile": this.finalObj.head.pofile
      }
      /********** Order Model End ***********/

      var finalModel = {
        "paymentModel": (this.TextUpperCase == '1' ? this.ConvertKeysToUpperCase(paymentModel) : paymentModel),
        "newOrderViewModel": (this.TextUpperCase == '1' ? this.ConvertKeysToUpperCase(model) : model)
      }
      finalModel.paymentModel.CardCode = this.finalObj.head.SecurityCode;
      finalModel.paymentModel.CardNumber = this.finalObj.head.CardNumber;
      finalModel.newOrderViewModel.Pay_code_sec = (this.finalObj.head.SecurityCode == undefined ? "" : this.finalObj.head.SecurityCode);
      finalModel.newOrderViewModel.Cred_card = this.finalObj.head.CardNumber;
      finalModel.newOrderViewModel.Pay_code_card = (this.finalObj.head.CardNumber == undefined ? "" : this.finalObj.head.CardNumber);
      var getresult = "";

      this.sendMessage('start');
      try {
        this.submitbuttondisable = true;
        this.checkoutService.payment((this.TextUpperCase == '1' ? this.ConvertKeysToUpperCase(finalModel) : finalModel)).subscribe((res: any) => {

          var isError = false;
          var dd = res;
          this.sendMessage('stop');
          
          if (dd.Success == true || dd.Success == 'True' || dd.Success == 'true') {
            this.tagmanager();
            // var model = {
            //   "LogType": "SubmitOrder",
            //   "Description": "Order submitted successfully.",
            //   "SearchKeyword": "",
            //   "CustID":Common.getWithExpiry("CustID"),
            //   "UserId": Common.getWithExpiry("UserID"),
            //   "ClientIP": this.ipAddress
            // }

            // this.dataService.AddActivityLog(model).subscribe((res: any) => {

            // });

            isError = false;
            this.orderno = dd.TransactionId;
          }
          else {
            isError = true;
            if (dd.TransactionErrors != null && dd.TransactionErrors != '') {
              this.orderno = dd.TransactionErrors;
            } else {
              this.orderno = 'Error in Process please try again';
              this.submitbuttondisable = false;
            }

            // var model1 = {
            //   "LogType": "SubmitOrder",
            //   "Description": this.orderno,
            //   "SearchKeyword": "",
            //   "CustID":Common.getWithExpiry("CustID"),
            //   "UserId": Common.getWithExpiry("UserID"),
            //   "ClientIP": this.ipAddress
            // }

            // this.dataService.AddActivityLog(model1).subscribe((res: any) => {

            // });
          }

          if (!isError) {
            this.isSubmitted = true;
            
            this.cartService.deleteCartByUserId().subscribe((res: any) => {
              this.cartService.cartBroadCaster(res);
              Common.removeWithExpiry("addrObj");
              Common.removeWithExpiry("itemObj");
              Common.removeWithExpiry("shippingAddress");
              Common.removeWithExpiry("finalObj");
            });
          }
          else {
            this.isError = true;
          }
        });
      } catch (ex) {
        this.sendMessage('stop');
      }
    }
    else {
      this.toastr.error("Order Minimum Value Should Be " + this.web_order_min_amount, 'Message!');
      this.submitbuttondisable = false;
    }
    this.gototop();
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
    }
    else {
      return umcode;
    }
  }
  getcreditcardcode() {
    this.creditcardcode = this.dataService.Getconfigbykey("credicardtermcode");
    if (this.creditcardcode == null || this.creditcardcode == undefined || this.creditcardcode == '') {
      this.creditcardcode = Common.getWithExpiry("creditcardcode");
    }
    if (this.creditcardcode == null || this.creditcardcode == undefined || this.creditcardcode == '') {
      this.dataService.GetConfigtocredicardtermcode().subscribe((res: any) => {
        this.creditcardcode = res;
        Common.setWithExpiry("creditcardcode", this.creditcardcode);
      });
    }

  }
  Getalavartax() {
    this.alavartax = this.dataService.Getconfigbykey("alavartax");
    if (this.alavartax == null || this.alavartax == undefined || this.alavartax == '') {
      this.alavartax = Common.getWithExpiry("alavartax");
    }
    if (this.alavartax == null || this.alavartax == undefined || this.alavartax == '') {
      this.dataService.Getalavartax().subscribe((res: any) => {
        this.alavartax = res;
        Common.setWithExpiry("alavartax", this.alavartax);
      });
    }

  }

  submitPreiserPunchOut() {
    try {
      var data = "";
      
      
      for (var i = 0; i < this.finalObj.lines.length; i++) {
        var code = this.catCode.find(x => x.itemNo === this.finalObj.lines[i].item);
        data += "<orderLine>" +
          "<item lineType='GOODS' quantity='" + this.finalObj.lines[i].quantity + "'>" +
          "<itemNumber>" +
          "<supplierItemNumber>" +
          "<itemID>" + this.finalObj.lines[i].item + "</itemID>" +
          "<supplierReferenceNumber>" + this.finalObj.lines[i].reference + "</supplierReferenceNumber>" +
          "</supplierItemNumber>" +
          "</itemNumber>" +
          "<itemDescription>" + this.getstringfromarray(this.finalObj.lines[i].descr1) + "</itemDescription>" +
          "<unitOfMeasure>" +
          "<supplierUnitOfMeasure>" +
          "<supplierUOMType>" + this.finalObj.lines[i].um_o + "</supplierUOMType>" +
          "<supplierUOMQuantity/>" +
          "</supplierUnitOfMeasure>" +
          "</unitOfMeasure>" +
          "</item>" +
          "<category>" +
          "<categoryCode categoryCodeIdentifier='SUPPLIER'>" + code.catCode + "</categoryCode>" +
          "</category>" +
          "<price>" +
          "<currency>USD</currency>" +
          "<unitPrice>" + this.finalObj.lines[i].price_per + "</unitPrice>" +
          "</price>" +
          "<supplier>" +
          "<supplierTradingPartnerCode>" + this.dataService.Getconfigbykey("SupplierTradingPartnerCode") + "</supplierTradingPartnerCode>" +
          "<supplierName>" + this.dataService.Getconfigbykey("SupplierName") + "</supplierName>" +
          "</supplier>" +
          "</orderLine>";
      }


      this.southernOrderPostModel = "<?xml version = '1.0' encoding = 'UTF-8'?>" +
        "<response>" +
        "<header version='1.0'>" +
        "<return returnCode='S'/>" +
        "</header>" +
        "<body>" +
        "<OrderLinesDataElements>" +
        "<catalogTradingPartner>" + this.dataService.Getconfigbykey("CatalogTradingPartner") + "</catalogTradingPartner>" +
        data +
        "</OrderLinesDataElements>" +
        "</body>" +
        "</response>";
        
        
    } catch (c) { console.log(c.toString()) }
    
    //this.southernOrderPostModel=urlencoded(this.southernOrderPostModel);
    // for (var i = 0; i < this.finalObj.lines.length; i++) {
    //   var code = this.catCode.find(x => x.itemNo === this.finalObj.lines[i].item);
    //   data += "<orderLine>" +
    //     "<item lineType='GOODS' quantity='" + this.finalObj.lines[i].quantity + "'>" +
    //     "<itemNumber>" +
    //     "<supplierItemNumber>" +
    //     "<itemID>" + this.finalObj.lines[i].item + "</itemID>" +
    //     "<supplierReferenceNumber>" + this.finalObj.lines[i].reference + "" +
    //     "</supplierReferenceNumber>" +
    //     "</supplierItemNumber>" +
    //     "</itemNumber>" +
    //     "<itemDescription></itemDescription>" +
    //     "<unitOfMeasure>" +
    //     "<supplierUnitOfMeasure>" +
    //     "<supplierUOMType>" + this.finalObj.lines[i].um_o + "</supplierUOMType>" +
    //     "<supplierUOMQuantity />" +
    //     "</supplierUnitOfMeasure>" +
    //     "</unitOfMeasure>" +
    //     "</item>" +
    //     "<category>" +
    //     "<categoryCode categoryCodeIdentifier='SUPPLIER'>" + code.catCode + "</categoryCode>" +
    //     "</category>" +
    //     "<price>" +
    //     "<currency>USD</currency>" +
    //     "<unitPrice>" + this.finalObj.lines[i].price_per + "</unitPrice>" +
    //     "</price>" +
    //     "<supplier>" +
    //     "<supplierTradingPartnerCode>" + this.dataService.Getconfigbykey("SupplierTradingPartnerCode") + "" +
    //     "</supplierTradingPartnerCode>" +
    //     "<supplierName>" + this.dataService.Getconfigbykey("SupplierName") + "</supplierName>" +
    //     "</supplier>" +
    //     "</orderLine>";
    // }

    // this.southernOrderPostModel = "<?xml version = '1.0' encoding = 'UTF-8'?>" +
    //   "<response>" +
    //   "<header version='1.0'>" +
    //   "<return returnCode='S' />" +
    //   "</header>" +
    //   "<body>" +
    //   "<OrderLinesDataElements>" +
    //   "<catalogTradingPartner>" + this.dataService.Getconfigbykey("CatalogTradingPartner") + "</catalogTradingPartner>" + data + "</OrderLinesDataElements>" +
    //   "</body>" +
    //   "</response>";
    // this.dataService.PunchOutCheckOut(this.PunchOutRetURL, model).subscribe((res: any) => {
    // });
    //     var currentDate = new Date();
    //     for (var i = 0; i < this.finalObj.lines.length; i++) {
    //         var code = this.catCode.find(x => x.itemNo === this.finalObj.lines[i].item);
    //         data += "<ItemIn+quantity='1'><ItemID><SupplierPartID>"+this.finalObj.lines[i].item+"</SupplierPartID><SupplierPartAuxiliaryID>"+this.finalObj.lines[i].reference+"</SupplierPartAuxiliaryID></ItemID><ItemDetail><UnitPrice><Money+currency='USD'>"+this.finalObj.lines[i].price_per+"</Money></UnitPrice><Description+xml:lang='en'><![CDATA["+this.finalObj.lines[i].links+"]]></Description><UnitOfMeasure>"+this.finalObj.lines[i].um_o+"</UnitOfMeasure><Classification+domain='UNSPSC'>"+code.catCode+"</Classification></ItemDetail></ItemIn>"; 
    //     }

    // this.southernOrderPostModel ="<?xml+version='1.0'?>"+
    // "<!DOCTYPE+cXML+SYSTEM+'http://xml.cXML.org/schemas/cXML/1.2.020/cXML.dtd'>"+
    // "<cXML+xml:lang='en-US'+payloadID='"+this.getjsonobj.cXML["@payloadID"]+"'+timestamp='"+this.getjsonobj.cXML["@timestamp"]+"'>"+
    // "<Header><From><Credential+domain='"+this.getjsonobj.cXML.Header.From.Credential["@domain"]+"'><Identity>"+this.getjsonobj.cXML.Header.From.Credential.Identity+"</Identity></Credential></From><To><Credential+domain='"+this.getjsonobj.cXML.Header.To.Credential["@domain"]+"'><Identity>"+this.getjsonobj.cXML.Header.To.Credential.Identity+"</Identity></Credential></To><Sender><Credential+domain='"+this.getjsonobj.cXML.Header.Sender.Credential["@domain"]+"'><Identity>"+this.getjsonobj.cXML.Header.Sender.Credential.Identity+"</Identity></Credential><UserAgent>"+this.getjsonobj.cXML.Header.Sender.UserAgent+"</UserAgent></Sender></Header>"+
    // "<Message><PunchOutOrderMessage><BuyerCookie>"+this.getjsonobj.cXML.Request.PunchOutSetupRequest.BuyerCookie+"</BuyerCookie><PunchOutOrderMessageHeader+operationAllowed='edit'><Total><Money+currency='USD'>"+this.total+"</Money></Total></PunchOutOrderMessageHeader>"+
    // data +"</PunchOutOrderMessage></Message></cXML>";

  }

  getstringfromarray(stringarry) {
    var getstr = '';
    if (stringarry != undefined && stringarry != null && stringarry != '') {
      try {
        stringarry = JSON.parse(stringarry);
      } catch (ed) { }
      for (var i = 0; i < stringarry.length; i++) {
        getstr = getstr + stringarry[i] + ' ';
      }
    }
    return getstr;
  }

  submitkinterPunchOut() {
    var data = "";

    for (var i = 0; i < this.finalObj.lines.length; i++) {
      //var code = this.catCode.find(x => x.itemNo === this.finalObj.lines[i].item);
      data += "<ItemIn quantity='" + this.finalObj.lines[i].quantity + "'>" +
        "<ItemID>" +
        "<SupplierPartID>" + this.finalObj.lines[i].item + "</SupplierPartID>" +
        "</ItemID>" +
        "<ItemDetail>" +
        "<UnitPrice>" +
        "<Money currency='USD'>" + this.finalObj.lines[i].price_per + "</Money>" +
        "</UnitPrice>" +
        "<Description xml:lang='en-US'>" + this.getstringfromarray(this.finalObj.lines[i].descr1) + "</Description>" +
        "<UnitOfMeasure>" + this.finalObj.lines[i].um_o + "</UnitOfMeasure>" +
        "<Classification domain='UNSPSC'>" + this.finalObj.lines[i].dept + "</Classification>" +
        "<ManufacturerPartID>" + this.finalObj.lines[i].item + "</ManufacturerPartID>" +
        "<ManufacturerName xml:lang='en'>Kinter</ManufacturerName>" +
        "</ItemDetail>" +
        "</ItemIn>";
    }
    //getjsonobj.cXML.Request.PunchOutSetupRequest.ShipTo.Address.Name;
    this.southernOrderPostModel = "<?xml version='1.0' encoding='UTF-8'?>" +
      "<!DOCTYPE cXML SYSTEM 'http://xml.cxml.org/schemas/cXML/1.2.014/cXML.dtd'>" +
      "<cXML payloadID='" + this.getjsonobj.cXML["@payloadID"] + "' xml:lang='en-US' timestamp='" + this.getjsonobj.cXML["@timestamp"] + "' version='" + this.getjsonobj.cXML["@version"] + "'>" +
      "<Header>" +
      "<From>" +
      "<Credential domain='" + this.getjsonobj.cXML.Header.From.Credential["@domain"] + "'>" +
      "<Identity>" + this.getjsonobj.cXML.Header.From.Credential.Identity + "<Identity/>" +
      "</Credential>" +
      "</From>" +
      "<To>" +
      "<Credential domain='" + this.getjsonobj.cXML.Header.To.Credential["@domain"] + "'>" +
      "<Identity>" + this.getjsonobj.cXML.Header.To.Credential.Identity + "</Identity>" +
      "</Credential>" +
      "</To>" +
      "<Sender>" +
      "<Credential domain='" + this.getjsonobj.cXML.Header.Sender.Credential["@domain"] + "'>" +
      "<Identity>" + this.getjsonobj.cXML.Header.Sender.Credential.Identity + "</Identity>" +
      "<SharedSecret>" + this.getjsonobj.cXML.Header.Sender.Credential.SharedSecret + "</SharedSecret>" +
      "</Credential>" +
      "<UserAgent>" + this.getjsonobj.cXML.Header.Sender.UserAgent + "<UserAgent/>" +
      "</Sender>" +
      "</Header>" +
      "<Message deploymentMode='" + this.getjsonobj.cXML.Request["@deploymentMode"] + "'>" +
      "<PunchOutOrderMessage>" +
      "<BuyerCookie>" + this.getjsonobj.cXML.Request.PunchOutSetupRequest.BuyerCookie + "</BuyerCookie>" +
      "<PunchOutOrderMessageHeader operationAllowed='edit' quoteStatus='final'>" +
      "<Total>" +
      "<Money currency='USD'>" + this.total + "</Money>" +
      "</Total>" +
      "<Shipping>" +
      "<Money currency='USD'>" + this.frieght + "</Money>" +
      "<Description xml:lang='en-US'>Unknown</Description>" +
      "</Shipping>" +
      "<Tax>" +
      "<Money currency='USD'>" + this.tax + "</Money>" +
      "<Description xml:lang='en-US'>Unknown</Description>" +
      "</Tax>" +
      "</PunchOutOrderMessageHeader>" + data + "</PunchOutOrderMessage>" +
      "</Message>" +
      "</cXML>";
      

    // this.dataService.PunchOutCheckOut(this.PunchOutRetURL, model).subscribe((res: any) => {
    // });
  }

  tovalidxml(descr) {
    return descr.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  submitSouthernPunchOut() {

    var data = "";

    debugger;

    for (var i = 0; i < this.finalObj.lines.length; i++) {

      var des = this.finalObj.lines[i].descrnew;

      //if(des != "" && des != undefined && des != null)
      //{
      //des=encodeURIComponent(des);
      // des.replace("\"", "&quot;").replace("'","&apos;").replace("<","&lt;").replace(">","&gt;").replace("&","&amp;");
      //}

      data += "<ItemIn quantity='" + this.finalObj.lines[i].quantity + "'>" +
        "<ItemID>" +
        "<SupplierPartID>" + this.finalObj.lines[i].item + "</SupplierPartID>" +
        "<SupplierPartAuxiliaryID>" + Common.getWithExpiry("PunchOutQuoteNo") + "</SupplierPartAuxiliaryID>" +
        "</ItemID>" +
        "<ItemDetail>" +
        "<UnitPrice>" +
        "<Money currency='USD'>" + this.finalObj.lines[i].price_per + "</Money>" +
        "</UnitPrice>" +
        "<Description xml:lang='en'>" + this.tovalidxml(des) + "</Description>" +
        "<UnitOfMeasure>" + this.finalObj.lines[i].um_o + "</UnitOfMeasure>" +
        "<Classification domain='UNSPSC'>" + this.finalObj.lines[i].RowID + "</Classification>" +
        "<LeadTime>1</LeadTime>" +
        "</ItemDetail>" +
        "</ItemIn>";
    }

    var currentDate = new Date();

    this.southernOrderPostModel = "<!DOCTYPE cXML SYSTEM 'http://xml.cxml.org/schemas/cXML/1.2.035/cXML.dtd'>" +
      "<cXML payloadID='1547054530' timestamp='" + currentDate + "' xml:lang='en-US'>" +
      "<Header>" +
      "<From>" +
      "<Credential domain='NetworkID'>" +
      "<Identity>" + this.southernFromId + "</Identity>" +
      "</Credential>" +
      "</From>" +
      "<To>" +
      "<Credential domain='NetworkId'>" +
      "<Identity>" + this.southernToId + "</Identity>" +
      "</Credential>" +
      "</To>" +
      "<Sender>" +
      "<Credential domain='buyerquest.net'>" +
      "<Identity>" + this.southernSenderId + "</Identity>" +
      "</Credential>" +
      "<UserAgent>" + this.southernUserAgent + "</UserAgent>" +
      "</Sender>" +
      "</Header>" +
      "<Message>" +
      "<PunchOutOrderMessage>" +
      "<BuyerCookie>" + this.southernBuyerCookie + "</BuyerCookie>" +
      "<PunchOutOrderMessageHeader operationAllowed='create'>" +
      "<Total>" +
      "<Money currency='USD'>" + this.total + "</Money>" +
      "</Total>" +
      "</PunchOutOrderMessageHeader>" +
      data +
      "</PunchOutOrderMessage>" +
      "</Message>" +
      "</cXML>";

      
    // setTimeout(function(){
    //   this.testFormElement.nativeElement.submit();
    // }, 2000);
  }

  postForm() {
    //this.sendMessage('start');
    this.testFormElement.nativeElement.submit();
  }

  submitfinalordercall() {
    if (this.isPunchOut) {
      
      if (this.termsandcondition == '1' && this.terms == false && this.termsrequired == '1') {
        this.toastr.error("Please Accept Terms and Conditions");
        const element = this.renderer.selectRootElement("#termsandcondition");
        element.focus();
        return;
      }
      if (this.PunchOutType == "preiser") {
        //this.submitPreiserPunchOut()
        this.finalizeOrderforrfq();
        this.postForm();
      }
      if (this.PunchOutType == "KINTER") {
        this.postForm()
      }
      else if (this.PunchOutType == "Southern") {
        //this.submitSouthernPunchOut();
        this.postForm();
      }
    }
    else {
      if (this.creditcardcode.indexOf(this.finalObj.head.terms_code) != -1 && this.CreditCardSetting == '1') {
        this.payment();
      }
      else {
        this.finalizeOrder();
      }
    }
  }

  backToReview() {
    this.router.navigate(['/pending-order-review']);
  }
}
