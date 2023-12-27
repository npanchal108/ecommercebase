import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { DataService } from '../../services/data.service';
import { Common } from '../../../app/model/common.model';
import { ToastrService } from 'ngx-toastr';
import { SEOService } from '../../services/seo.service';
import { UntypedFormBuilder } from '@angular/forms';

import { OrderManagementService } from '../../services/order-management.service';
import { LoadingService } from '../../services/loading.service';

// import * as $ from 'jquery';
@Component({
  selector: 'app-invoice-payment',
  templateUrl: './invoice-payment.component.html',
  styleUrls: ['./invoice-payment.component.scss']
})
export class InvoicePaymentComponent implements OnInit {

  cardList: any = [];
  head: any = {};
  totalAmount: number;
  totalAmount1: number;
  submitted: boolean = false;
  refNo: string;
  isSuccess: boolean = false;
  getyearlist: any = [];
  isstateshow: any = true;
  cardNo: string;
  code: string;
  cardText: string = "Add";
  cardid: number;
  iscardfreeform: any = true;
  countryList: any = [];
  cardtypelist: any;
  stateList: any = [];
  invoiceModel: any = [];
  issubmit: any = true;
  istotalAmount: any = false;
  ispaypartial: any;//='1';
  achininvoice: any;
  //customerdetails:any;
  constructor(private formBuilder: UntypedFormBuilder, private loadingService: LoadingService, private orderService: OrderManagementService, el: ElementRef, private renderer: Renderer2, private seoService: SEOService, private toastr: ToastrService, private dataService: DataService, private checkoutService: CheckoutService, private route: ActivatedRoute,
    private registerService: RegistrationService, private router: Router) {
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Invoice Payment - ' + geturl);
    this.seoService.setkeywords('Invoice Payment - ' + geturl);
    this.seoService.setdescription('Invoice Payment - ' + geturl);
    this.Getinvoicepartialpayment();
    this.Getachininvoice();
    this.getCardtypelist();
    this.gototop();
    for (var i = 0; i <= 10; i++) {
      var getyea = new Date();
      var years = getyea.getFullYear() + i;
      this.getyearlist.push(years);
      this.getStates("US");
    }
    this.getCountry();
    this.head.CardNo = 0;
    //this.getcustomer();
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  getCardtypelist() {
    try {
        if (Common.getWithExpiry("cardtypelist") != undefined && Common.getWithExpiry("cardtypelist") != null) {
            var cardtypelist = JSON.parse(Common.getWithExpiry("cardtypelist"));
        }
    } catch (ed) { }
    if (cardtypelist == null || cardtypelist == undefined || cardtypelist.length == 0) {
        this.dataService.getCardtypelist().subscribe((res: any) => {
            this.cardtypelist = res;
            Common.setWithExpiry("cardtypelist", JSON.stringify(this.cardtypelist));
        });
    }
    else {
        this.cardtypelist = cardtypelist;
    }
}
  getCountry() {
    this.registerService.getCountry().subscribe((res: any) => {
      this.countryList = res;
      this.head.cardDetailselectedCountry = "US";
    })
  }
  Getinvoicepartialpayment() {
    this.ispaypartial = this.dataService.Getconfigbykey("invoicepartialpayment");
    if (this.ispaypartial == null || this.ispaypartial == undefined || this.ispaypartial == '') {
      this.ispaypartial = Common.getWithExpiry("invoicepartialpayment");
    }
    if (this.ispaypartial == null || this.ispaypartial == undefined || this.ispaypartial == '') {
      this.dataService.Getinvoicepartialpayment().subscribe((data: any) => {
        this.ispaypartial = data;
        Common.setWithExpiry("invoicepartialpayment", this.ispaypartial);
      })
    }
  }
  Getachininvoice() {
    this.achininvoice = this.dataService.Getconfigbykey("achininvoice");
    if (this.achininvoice == null || this.achininvoice == undefined || this.achininvoice == '') {
      this.achininvoice = Common.getWithExpiry("achincheckout");
    }
    if (this.achininvoice == null || this.achininvoice == undefined || this.achininvoice == '') {
      this.dataService.Getachininvoice().subscribe((data: any) => {
        this.achininvoice = data;
        Common.setWithExpiry("achininvoice", this.achininvoice);
        if(this.achininvoice=='2' || this.achininvoice=='3'){
          this.head.type="2"
          this.getCardDetails(false);
        }
        else if(this.achininvoice=='0'){
          this.head.type="1"
          this.getCardDetails(true);
        }
        
      })
    }
    else{
      if(this.achininvoice=='1'){
        this.head.type="2"
        this.getCardDetails(false);
      }
      else{
        this.head.type="1"
        this.getCardDetails(true);
      }
    }
  }
  onCountryChange(val) {
    // for (var i = 0; i < this.countryList.length; i++) {
    //   if (this.countryList[i].country_descr == val) {
    this.getStates(val);
    //this.getvalforform();
    //  break;
    //}
    //}
  }

  getStates(val) {
    this.registerService.getState(val).subscribe((res: any) => {
      this.stateList = res;
      if (this.stateList == undefined || this.stateList == null || this.stateList.length == 0) {
        this.head.cardDetailselectedState = "";
        this.isstateshow = false;
      }
      else {
        this.isstateshow = true;
        this.head.cardDetailselectedState = "0";
      }
    })
  }

  ngOnInit() {
    
    var orderno = this.route.snapshot.paramMap.get('orderno');
    var seqno = this.route.snapshot.paramMap.get('seq');
    if (orderno != undefined && orderno != null && orderno != '' && orderno != '0') {
      this.orderService.GetOpenInvoicesByInvoiceID(Common.getWithExpiry("CustID"), orderno, seqno).subscribe((res: any) => {
        var result = res;
        this.invoiceModel = [];
        this.totalAmount = 0;
        this.totalAmount1 = 0;
        for (var i = 0; i < result.length; i++) {
          Common.setWithExpiry("SelectedInvoice", JSON.stringify(result));
          this.invoiceModel.push({
            "OrderNo": result[i].ar_id,
            "SeqNo": this.pad_with_zeroes(result[i].invc_seq, 4),
            "Amount": result[i].opn_balance,
            "PayAmount": result[i].opn_balance,
            "cu_po": selectedInvoice[i].cu_po,
            "ord_ext": selectedInvoice[i].ord_ext,
            "item_date": selectedInvoice[i].item_date,
            "due_date": result[i].due_date,
          });
          this.totalAmount = this.totalAmount + result[i].opn_balance;
          this.totalAmount1 = this.totalAmount1 + result[i].opn_balance;
        }
        if (this.totalAmount == 0) {
          this.issubmit = false;
          this.toastr.error("Payment amount is zero try again later..")
        }
        else {
          this.issubmit = true;
        }
      })
    }
    else {
      var selectedInvoice = null;
      try {
        if (Common.getWithExpiry("SelectedInvoice") != undefined) {
          selectedInvoice = JSON.parse(Common.getWithExpiry("SelectedInvoice"));
        }
      } catch (ed) { }
      this.invoiceModel = [];
      this.totalAmount = 0;
      this.totalAmount1 = 0;
      //console.log('selectedInvoice', selectedInvoice);
      for (var i = 0; i < selectedInvoice.length; i++) {
        this.invoiceModel.push({
          "OrderNo": selectedInvoice[i].ar_id,
          "SeqNo": this.pad_with_zeroes(selectedInvoice[i].invc_seq, 4),
          "Amount": selectedInvoice[i].opn_balance,
          "PayAmount": selectedInvoice[i].opn_balance,
          "cu_po": selectedInvoice[i].cu_po,
          "ord_ext": selectedInvoice[i].ord_ext,
          "item_date": selectedInvoice[i].item_date,
          "due_date": selectedInvoice[i].due_date,
        });
        this.totalAmount = this.totalAmount + selectedInvoice[i].opn_balance;
        this.totalAmount1 = this.totalAmount1 + selectedInvoice[i].opn_balance;
      }
      if (this.totalAmount == 0) {
        this.issubmit = false;
        this.toastr.error("Payment amount is zero try again later..")
      }
      else {
        this.issubmit = true;
      }
    }


    //this.totalAmount = +this.route.snapshot.paramMap.get('amount');
  }
  // getcustomer(){
  //   this.dataService.getacustomer(Common.getWithExpiry("CustID")).subscribe((res:any) =>{
  //     this.customerdetails=res;
  //   })
  // }
  isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  addNote(product) {
    product.canEditCode = false;
    if (product.PayAmount >= product.Amount) {
      this.totalAmount = 0;
      for (var i = 0; i < this.invoiceModel.length; i++) {
        this.totalAmount = this.totalAmount + this.invoiceModel[i].Amount;
      }
    }
    else {
      product.Amount = product.PayAmount;
      this.toastr.info("You can't pay amount more then due amount");
    }
  }

  Clicktoedit(product, n) {
    product.canEditCode = true;

    // window.setTimeout(() => {
    const element = this.renderer.selectRootElement("#Product" + n.toString());
    element.focus();
    //});
  }
  getCardDetails(iscreditcard) {
    var usrid = null;
    if (Common.getWithExpiry("UserType") == '3') {
      usrid = Common.getWithExpiry("UserID");
    }
    else {
      usrid = Common.getWithExpiry("CustID");
    }
    this.checkoutService.getCardDetails(Common.getWithExpiry("CustID"), usrid,iscreditcard).subscribe((res: any) => {
      var result = [];
      result = res;
      for (var i = 0; i < result.length; i++) {
        var cardNumber = '';
        if (result[i].profileid == undefined || result[i].profileid == null || result[i].profileid == '') {
          cardNumber = this.registerService.decrypted('8080808080808080', result[i].CardNumber);
        }
        else {
          cardNumber = result[i].CardNumber;
        }
        var securityCode = this.registerService.decrypted('8080808080808080', result[i].SecurityCode)
        this.cardList.push({
          "CardNumber": cardNumber,
          "CardType": result[i].CardType,
          "Customer": result[i].Customer,
          "ExpirationMonth": result[i].ExpirationMonth,
          "ExpirationYear": result[i].ExpirationYear,
          "FirstName": result[i].FirstName,
          "Id": result[i].Id,
          "LastName": result[i].LastName,
          "SecurityCode": securityCode,
          "CardName": result[i].FirstName + " - " + (iscreditcard==true? result[i].CardType + " - ":"")  + cardNumber.substr(cardNumber.length - 4),
          "adr1": result[i].adr1,
          "adr2": result[i].adr2,
          "city": result[i].city,
          "country": result[i].country,
          "state": result[i].state,
          "zip": result[i].zip,
          "Email": result[i].Email,
          "profileid": result[i].profileid,
        })
      }
      this.head.CardNo = 0;
      // if (JSON.parse(Common.getWithExpiry("finalObj")) != null) {
      //   var data = JSON.parse(Common.getWithExpiry("finalObj"));
      //   this.head.CardNo = data.head.CardNo;
      //   this.cardChanged(this.head.CardNo);
      // }
    });
  }

  onCardAdd() {
    this.cardid = this.cardid == undefined ? 0 : this.cardid;
    
    this.router.navigate(["/addyourcard/" + this.cardid + "/invoice/" + this.totalAmount + '/'+this.head.type]);
  }
  setcardvalues() {
    if (this.head.CardNumber != undefined && this.head.CardNumber != '' && this.iscardfreeform == false) {
      var getcardnumber = this.head.CardNumber.toString();
      if (this.head.profileid == undefined || this.head.profileid == null || this.head.profileid == '') {
        this.cardNo = this.registerService.encrypted('8080808080808080', getcardnumber);
      }
      else {
        this.cardNo = getcardnumber;
      }

    }
    if (this.head.SecurityCode != undefined && this.head.SecurityCode != '' && this.iscardfreeform == false) {
      var scode = this.head.SecurityCode.toString();
      this.code = this.registerService.encrypted('8080808080808080', scode);

    }
  }
  cardpayment(event){
    this.cardList=[];
    if(event=="1"){
      this.getCardDetails(true);
    }
    else if(event=="2"){
      this.getCardDetails(false);
    }
    else{
      this.toastr.error("Please Select The Payment Type", 'Message!');
    }
  }

  cardChanged(event) {
    if (event == "0") {
      this.cardText = "Add";
      this.iscardfreeform = true;
      this.cardid = null;
      this.head.CardHoldersName = '';
      this.head.CreditCardType = "";
      this.head.CardNumber = '';
      this.head.SecurityCode = '';
      this.head.ExpirationMonth = '';
      this.head.ExpirationYear = '';
      this.head.cardDetailadr1 = '';
      this.head.cardDetailadr2 = '';
      this.head.cardDetailselectedCountry = '';
      this.head.cardDetailselectedState = '';
      this.head.cardDetailcity = '';
      this.head.cardDetailzip = '';
      this.head.cardDetailEmail = '';
      this.head.profileid = '';
    }
    else if (event == "-1") {
      this.iscardfreeform = false;


      this.cardid = null;
      this.head.CardHoldersName = '';
      this.head.CreditCardType = "";
      this.head.CardNumber = '';
      this.head.SecurityCode = '';
      this.head.ExpirationMonth = '';
      this.head.ExpirationYear = '';
      this.head.cardDetailadr1 = '';
      this.head.cardDetailadr2 = '';
      this.head.cardDetailselectedCountry = '';
      this.head.cardDetailselectedState = '';
      this.head.cardDetailcity = '';
      this.head.cardDetailzip = '';
      this.head.cardDetailEmail = '';
      this.head.profileid = '';
    }
    else {
      this.cardText = "Modify";
      this.iscardfreeform = true;
      this.cardid = event;
      if (this.cardid != 0 && this.cardid != null && this.cardid != undefined) {
        this.checkoutService.getSingleCard(this.cardid).subscribe((res: any) => {
          var data = res;
          if (data != null && data != undefined && data.CardNumber != undefined && data.CardNumber != '') {
            this.cardNo = '';
            var getcardno = '';
            if (data.profileid == undefined || data.profileid == null || data.profileid == '') {
              this.cardNo = data.CardNumber;// this.registerService.decrypted('8080808080808080', data.CardNumber);
              getcardno = this.registerService.decrypted('8080808080808080', data.CardNumber);
            }
            else {
              this.cardNo = data.CardNumber;// this.registerService.decrypted('8080808080808080', data.CardNumber);
              getcardno = data.CardNumber;
            }
            this.code = data.SecurityCode;//this.registerService.decrypted('8080808080808080', data.SecurityCode);
            this.head.CardHoldersName = data.FirstName + " " + data.LastName;
            this.head.CreditCardType = data.CardType;
            this.head.CardNumber = "**** **** **** " + getcardno.substr(getcardno.length - 4, 4);
            this.head.ExpirationMonth = data.ExpirationMonth;
            this.head.ExpirationYear = data.ExpirationYear;
            if(data.iscreditcard){
            this.head.SecurityCode = "***";
            }
            else{
              this.head.SecurityCode = data.SecurityCode;
            }
            this.head.cardDetailadr1 = data.adr1;
            this.head.cardDetailadr2 = data.adr2;
            this.head.cardDetailselectedCountry = data.country;
            this.head.cardDetailselectedState = data.state;
            this.head.cardDetailcity = data.city;
            this.head.cardDetailzip = data.zip;
            this.head.cardDetailEmail = data.Email;
            this.head.profileid = data.profileid;
          }
        });
      }
    }
  }


  // cardChanged(event) {
  //   if (event == "0") {
  //     this.cardText = "Add";
  //   }
  //   else {
  //     this.cardText = "Modify";
  //   }
  //   this.cardid = event;
  //   this.checkoutService.getSingleCard(event).subscribe((res:any) => {
  //     var data = res;
  //     this.cardNo = this.registerService.decrypted('8080808080808080', data.CardNumber);
  //     this.code = this.registerService.decrypted('8080808080808080', data.SecurityCode);
  //     this.head.CardHoldersName = data.FirstName + " " + data.LastName;
  //     this.head.CreditCardType = data.CardType;
  //     this.head.CardNumber = "**** **** **** " + this.cardNo.substr(this.cardNo.length - 4, 4);
  //     this.head.ExpirationMonth = data.ExpirationMonth;
  //     this.head.ExpirationYear = data.ExpirationYear;
  //     this.head.SecurityCode = "***";
  //     this.head.adr1= data.adr1,
  //     this.head.adr2= data.adr2,
  //     this.head.city= data.city,
  //     this.head.country = data.country,
  //     this.head.state = data.state,
  //     this.head.zip = data.zip,
  //     this.head.Email = data.Email
  //   });
  // }

  isValidCard(card) {
    var re = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    return re.test(String(card).toLowerCase());
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  payment() {

    if (this.head.CardNo == undefined || this.head.CardNo == 0 || this.head.CardNo == null) {
      this.toastr.error("Please Select The Credit Card", 'Message!');
      return;
    }
    if ((this.head.CardHoldersName == undefined || this.head.CardHoldersName == 0) && this.iscardfreeform == false) {
      this.toastr.error("Please Insert Card Holder Name", 'Message!');
      return;
    }
    if ((this.head.CreditCardType == undefined || this.head.CreditCardType == 0) && this.iscardfreeform == false) {
      this.toastr.error("Please Select Card Type", 'Message!');
      return;
    }
    if ((this.head.CardNumber == undefined || this.head.CardNumber == 0) && this.iscardfreeform == false) {
      this.toastr.error("Please Insert Card Number", 'Message!');
      return;
    }
    if (this.isValidCard(this.head.CardNumber) == false && this.iscardfreeform == false) {
      this.toastr.error("Please Insert Valid Card Number", 'Message!');
      return;
    }
    if ((this.head.ExpirationMonth == undefined || this.head.ExpirationMonth == 0) && this.iscardfreeform == false) {
      this.toastr.error("Please Select Month", 'Message!');
      return;
    }
    if ((this.head.ExpirationYear == undefined || this.head.ExpirationYear == 0) && this.iscardfreeform == false) {
      this.toastr.error("Please Select Year", 'Message!');
      return;
    }
    if ((this.head.SecurityCode == undefined || this.head.SecurityCode == 0) && this.iscardfreeform == false) {
      this.toastr.error("Please Insert Security Cord", 'Message!');
      return;
    }
    if ((this.head.cardDetailadr1 == undefined || this.head.cardDetailadr1 == '') && this.iscardfreeform == false) {
      this.toastr.error("Please Insert Address 1", 'Message!');
      return;
    }
    if ((this.head.cardDetailselectedCountry == undefined || this.head.cardDetailselectedCountry == '') && this.iscardfreeform == false) {
      this.toastr.error("Please Select Country", 'Message!');
      return;
    }
    if ((this.head.cardDetailselectedState == undefined || this.head.cardDetailselectedState == '') && this.iscardfreeform == false) {
      this.toastr.error("Please Select State", 'Message!');
      return;
    }
    if (this.totalAmount > this.totalAmount1) {
      this.toastr.error("You can't exceed total amount of invoices", 'Message!');
      const element = this.renderer.selectRootElement("#totalAmount");
      element.focus();
      return;
    }
    if ((this.head.cardDetailcity == undefined || this.head.cardDetailcity == '') && this.iscardfreeform == false) {
      this.toastr.error("Please Insert City", 'Message!');
      return;
    }
    if ((this.head.cardDetailzip == undefined || this.head.cardDetailzip == '') && this.iscardfreeform == false) {
      this.toastr.error("Please Insert Zip", 'Message!');
      return;
    }
    if ((this.head.cardDetailEmail == undefined || this.head.cardDetailEmail == '') && this.iscardfreeform == false) {
      this.toastr.error("Please Insert Email", 'Message!');
      return;
    }
    if (this.iscardfreeform == false && this.isValidEmail(this.head.cardDetailEmail) == false) {
      this.toastr.error("Please Insert Valid Email", 'Message!');
      //$("#CreaditEmail").focus();
      const element = this.renderer.selectRootElement("#CreaditEmail");
      element.focus();
      return;
    }
    if (this.iscardfreeform) {
      this.setcardvalues();
    }


    var paymentModel = {
      "Amount": this.totalAmount,
      "CardNumber": this.cardNo,
      "ExpirationDate": this.head.ExpirationDate,
      "CardCode": this.code,
      "ExpirationMonth": this.head.ExpirationMonth,
      "ExpirationYear": this.head.ExpirationYear,
      "CardType": this.head.CreditCardType,
      "Total": this.totalAmount,
      "PaymentDetail": this.invoiceModel,
      "Customer": Common.getWithExpiry("CustID"),
      "FirstName": this.head.CardHoldersName,
      "adr1": this.head.cardDetailadr1,
      "adr2": this.head.cardDetailadr2,
      "city": this.head.cardDetailcity,
      "state": this.head.cardDetailselectedState,
      "country": this.head.cardDetailselectedCountry,
      "zip": this.head.cardDetailzip,
      "email": this.head.cardDetailEmail,
      "profileid": this.head.profileid,
      "company_sy": Common.getWithExpiry("company_sy")
    }
    this.sendMessage('start');
    this.checkoutService.invoicePayment(paymentModel).subscribe((res: any) => {
      this.sendMessage('stop');
      // if (res.text().includes("<br>")) {
      //   var rr = res.text().split("<br>")[3].split(",")[3].split(':')[1];
      //   var dd = JSON.parse(res.text().split("<br>")[3].replace("Json Response:",""));

      var dd = res;
      if (dd.Success == true || dd.Success == 'True' || dd.Success == 'true') {
        this.isSuccess = true;
        this.refNo = dd.TransactionId;
      }
      else {
        this.isSuccess = false;
        if (dd.TransactionErrors != null && dd.TransactionErrors != '') {
          this.refNo = dd.TransactionErrors;
        }
        else {
          this.refNo = 'Error in Process please try again';
        }
      }
      // }
      // else
      // {

      // }
      this.submitted = true;
    });
  }

  pad_with_zeroes(number, length) {
    var my_string = '' + number;
    while (my_string.length < length) {
      my_string = '0' + my_string;
    }
    return my_string;
  }
}
