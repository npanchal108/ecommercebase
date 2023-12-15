import { Component, OnInit, Renderer2,Inject } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { RegistrationService } from '../services/registration.service';
import { DataService } from '../services/data.service';
import { Common } from '../model/common.model';
import { ToastrService } from 'ngx-toastr';
import { SEOService } from '../services/seo.service';
import { LoadingService } from '../services/loading.service';
// import * as $ from 'jquery';
import * as parser from 'parse-address'
import { json } from 'express';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialog } from '@angular/material/dialog';
import { AddressvalidationpopupComponent } from '../addressvalidationpopup/addressvalidationpopup.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-creditcardaddrspopup',
  templateUrl: './creditcardaddrspopup.component.html',
  styleUrls: ['./creditcardaddrspopup.component.css']
})

export class CreditCardAddrsPopupComponent implements OnInit {
  isAdded: boolean = false;
  cardDetail: any = {};
  getyearlist: any = [];
  id: string;
  msg: string;
  resCardId:number = 0;

  type: string;
  ctype: string;
  countryList: any = [];
  stateList: any = [];
  isstateshow: any = true;
  getvalidation: any;
  postalvalidation: any;
  Addressval: any;
  cityval: any;
  addr1val: any;
  addr2val: any;
  addr3val: any;
  addr4val: any;
  phoneval: any;
  cityno: any;
  isaddressparse: string = '0';
  TextUpperCase: any;
  cardtypelist: any;
  Allconfigurationlist: any;
  addressList: any[];
  selectedAddress: string;
  isPostalCodeValid: boolean = false;
  newArray: any[] = [];
  iskrayden: any;
  billingAddress: any;
  isChecked;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { billingAddress: string[],cardId:string,cType: string},public dialog: MatDialog, private loadingService: LoadingService, private renderer: Renderer2, private seoService: SEOService, private toastr: ToastrService, private dataService: DataService, private checkoutService: CheckoutService, public dialogRef: MatDialogRef<CreditCardAddrsPopupComponent>,
    private registerService: RegistrationService) {
    this.iskrayden = environment.iskyraden;
    this.gototop();
    this.GetAllConfigurations();
    this.getCountry();
    this.getStates("US");
    this.getCardtypelist();
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Add your Card Details - ' + geturl);
    this.seoService.setkeywords('Add your Card Details - ' + geturl);
    this.seoService.setdescription('Add your Card Details - ' + geturl);
    this.cardDetail.selectedState = "0";
  }
  ngOnInit() {
    this.billingAddress = this.data.billingAddress;
    this.id = this.data.cardId;
    this.type = this.data.cardId;
    this.ctype =  this.data.cType;
    for (var i = 0; i <= 10; i++) {
      var getyea = new Date();
      var years = getyea.getFullYear() + i;
      this.getyearlist.push(years);
    }

    if (this.id != "0") {
      this.getCardById();
    }
  }
  togglePostalCodeFlag() {
    if (this.iskrayden) {
      this.isPostalCodeValid = false;
      this.openAddressvalidationpopup();
    }
    else {
      this.isPostalCodeValid = true;
    }
  }
  openAddressvalidationpopup(): void {
    this.sendMessage('start');
    var model = {
      "addressLine1": this.cardDetail.adr1,
      "addressLine2": this.cardDetail.adr2,
      "countryCode": this.cardDetail.selectedCountry,
      "state": this.cardDetail.selectedState,
      "postalCode": this.cardDetail.zip,
    }
    this.dataService.GetValidStreetAddress(model).subscribe((data: any) => {
      this.addressList = data;
      this.sendMessage('stop');

      if (this.addressList && this.addressList.length > 1) {
        this.addressList.forEach(item => {
          let temp = {
            AddressLine1: Array.isArray(item.AddressKeyFormat.AddressLine) ? item.AddressKeyFormat.AddressLine[0] : item.AddressKeyFormat.AddressLine,
            AddressLine2: Array.isArray(item.AddressKeyFormat.AddressLine) && item.AddressKeyFormat.AddressLine.length > 1 ? item.AddressKeyFormat.AddressLine[1] : "",
            Country: item.AddressKeyFormat.CountryCode,
            State: item.AddressKeyFormat.PoliticalDivision1,
            City: item.AddressKeyFormat.PoliticalDivision2,
            PostalCode: item.AddressKeyFormat.PostcodePrimaryLow + '-' + item.AddressKeyFormat.PostcodeExtendedLow,
          }
          this.newArray.push(temp);
        });
        const dialogRef = this.dialog.open(AddressvalidationpopupComponent, {
          data: { userList: this.newArray },
          width: '600px',
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('result', result)
            this.isPostalCodeValid = true;
            this.cardDetail.adr1 = result.addressLine1;
            this.cardDetail.adr2 = result.addressLine2;
            this.cardDetail.zip = result.postalCode;
            this.cardDetail.city = result.city;
          }
        });
      }
      else if (this.addressList.length == 1) {
        console.log('this.addressList', this.addressList);
        this.cardDetail.adr1 = Array.isArray(this.addressList[0].AddressKeyFormat.AddressLine) ? this.addressList[0].AddressKeyFormat.AddressLine[0] : this.addressList[0].AddressKeyFormat.AddressLine,
          this.cardDetail.adr2 = Array.isArray(this.addressList[0].AddressKeyFormat.AddressLine) && this.addressList[0].AddressKeyFormat.AddressLine.length > 1 ? this.addressList[0].AddressKeyFormat.AddressLine[1] : "",
          this.cardDetail.city = this.addressList[0].AddressKeyFormat.PoliticalDivision2;
        this.cardDetail.zip = `${this.addressList[0].AddressKeyFormat.PostcodePrimaryLow}-${this.addressList[0].AddressKeyFormat.PostcodeExtendedLow}`;
        this.isPostalCodeValid = true;
      } else {
        this.isPostalCodeValid = false;
        this.toastr.error("invalid address or pincode are you sure want to submit this address", 'Message!');
        return;
      }
    })
  }
  GetAllConfigurations() {

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
          if (this.Allconfigurationlist[i].ConfigKey == "AddressParser") {
            this.isaddressparse = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "TextUpperCaseSetting") {
            this.TextUpperCase = this.Allconfigurationlist[i].ConfigValue;
          }
        }
      })
    }
    else {
      for (var i = 0; i < this.Allconfigurationlist.length; i++) {
        if (this.Allconfigurationlist[i].ConfigKey == "AddressParser") {
          this.isaddressparse = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "TextUpperCaseSetting") {
          this.TextUpperCase = this.Allconfigurationlist[i].ConfigValue;
        }
      }
    }
  }
  getCardtypelist() {
    try {
      if (Common.getWithExpiry("cardtypelist") != undefined) {
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

  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  addreparser() {
    if (this.cardDetail.addressparser == undefined || this.cardDetail.addressparser == null || this.cardDetail.addressparser == '') {
      this.toastr.error("Please enter address first");
      const element = this.renderer.selectRootElement("#addressparser");
      element.focus();
    }
    else {

      var parsed = parser.parseLocation(this.cardDetail.addressparser);
      this.cardDetail.adr1 = (parsed.number == undefined ? "" : parsed.number) + ' ' + (parsed.prefix == undefined ? "" : parsed.prefix) + ' ' + (parsed.street == undefined ? "" : parsed.street) + ' ' + (parsed.type == undefined ? "" : parsed.type);
      this.cardDetail.selectedState = parsed.state.toUpperCase();
      this.cardDetail.city = parsed.city;
      this.cardDetail.zip = parsed.zip;
    }
  }
  getvalforform() {
    for (var i = 0; i < this.countryList.length; i++) {
      if (this.countryList[i].country_code == this.cardDetail.selectedCountry) {
        this.getvalidation = this.countryList[i];
        this.postalvalidation = this.getvalidation.fmt_postal.length;
        try {
          var addrval = JSON.parse(this.getvalidation.fmt_address);
        } catch (ed) { }
        this.addr1val = addrval[0].replace('X(', '').replace(')', '');
        this.addr2val = addrval[1].replace('X(', '').replace(')', '');
        this.addr3val = addrval[2].replace('X(', '').replace(')', '');
        this.addr4val = addrval[3].replace('X(', '').replace(')', '');
        this.phoneval = this.getvalidation.fmt_phone.length;
        this.cityno = this.getvalidation.adr_no_city;
        if (this.cityno == 3 || this.cityno == '3') {
          this.Addressval = parseInt(this.addr1val) + parseInt(this.addr2val);
          this.cityval = this.addr3val;
        }
        else {
          this.Addressval = parseInt(this.addr1val) + parseInt(this.addr2val) + parseInt(this.addr3val);
          this.cityval = this.addr4val;
        }
      }
    }
  }
  getCountry() {
    this.registerService.getCountry().subscribe((res: any) => {
      this.countryList = res;
      this.cardDetail.selectedCountry = "US";
      this.getvalforform();
    })
  }

  getcountrychangesvalue() {
    this.getStates(this.cardDetail.selectedCountry);
  }

  getStates(val) {
    this.registerService.getState(val).subscribe((res: any) => {
      this.stateList = res;
      if (this.stateList == undefined || this.stateList == null || this.stateList.length == 0) {
        this.cardDetail.selectedState = "";
        this.isstateshow = false;
      }
      else {
        this.isstateshow = true;
        this.cardDetail.selectedState = "0";
      }
    })
  }
  isValidCard(card) {
    var re = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    return re.test(String(card).toLowerCase());
  }
  isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  onCountryChange(val) {
    this.getStates(val);
    this.getvalforform();
  }

  addCard() {
    if (this.cardDetail.FirstName == undefined || this.cardDetail.FirstName == null || this.cardDetail.FirstName == '') {
      this.toastr.error("Please Insert First Name", 'Message!');
      const element = this.renderer.selectRootElement("#FirstName");
      element.focus();
      return;
    }
    else if (this.cardDetail.LastName == undefined || this.cardDetail.LastName == null || this.cardDetail.LastName == '') {
      this.toastr.error("Please Insert Last Name", 'Message!');
      const element = this.renderer.selectRootElement("#LastName");
      element.focus();
      return;
    }
    else if ((this.cardDetail.CardType == undefined || this.cardDetail.CardType == null || this.cardDetail.CardType == '') && this.ctype == '1') {
      this.toastr.error("Please Select Card Type", 'Message!');
      document.getElementById("CardType").scrollIntoView();
      return;
    }
    else if (this.cardDetail.CardNumber == undefined || this.cardDetail.CardNumber == null || this.cardDetail.CardNumber == '') {
      if (this.ctype == '1') {
        this.toastr.error("Please Insert Card Number", 'Message!');
      }
      else {
        this.toastr.error("Please Insert Account Number", 'Message!');        
      }
      const element = this.renderer.selectRootElement("#CardNumber");
      element.focus();
      return;
    }
    else if (this.isValidCard(this.cardDetail.CardNumber) == false && this.ctype == '1') {
      this.toastr.error("Please Valid Card Number", 'Message!');
      const element = this.renderer.selectRootElement("#CardNumber");
      element.focus();
      return;
    }
    else if ((this.cardDetail.ExpirationMonth == undefined || this.cardDetail.ExpirationMonth == null || this.cardDetail.ExpirationMonth == '') && this.ctype == '1') {
      this.toastr.error("Please Select Expiration Month", 'Message!');
      document.getElementById("ExpirationMonth").scrollIntoView();
      return;
    }
    else if ((this.cardDetail.ExpirationYear == undefined || this.cardDetail.ExpirationYear == null || this.cardDetail.ExpirationYear == '') && this.ctype == '1') {
      this.toastr.error("Please Select Expiration Year", 'Message!');
      document.getElementById("ExpirationYear").scrollIntoView();
      return;
    }
    else if (this.cardDetail.SecurityCode == undefined || this.cardDetail.SecurityCode == null || this.cardDetail.SecurityCode == '') {
      if (this.ctype == '1') {
        this.toastr.error("Please Insert Security Code", 'Message!');
      }
      else {
        this.toastr.error("Please Insert Routing Code", 'Message!');
      }
      const element = this.renderer.selectRootElement("#SecurityCode");
      element.focus();
      return;

    }
    else if (this.cardDetail.adr1 == undefined || this.cardDetail.adr1 == null || this.cardDetail.adr1 == '') {
      this.toastr.error("Please Insert Address 1", 'Message!');
      const element = this.renderer.selectRootElement("#Address1");
      element.focus();
      return;
    }
    else if (this.cardDetail.selectedState == undefined || this.cardDetail.selectedState == null || this.cardDetail.selectedState == '' || this.cardDetail.selectedState == "0" || this.cardDetail.selectedState == 0) {
      this.toastr.error("Please Select State", 'Message!');
      document.getElementById("State").scrollIntoView();
      return;
    }
    else if (this.cardDetail.city == undefined || this.cardDetail.city == null || this.cardDetail.city == '') {
      this.toastr.error("Please Insert City", 'Message!');
      const element = this.renderer.selectRootElement("#City");
      element.focus();
      return;
    }
    else if (this.cardDetail.zip == undefined || this.cardDetail.zip == null || this.cardDetail.zip == '') {
      this.toastr.error("Please Insert Zip", 'Message!');
      const element = this.renderer.selectRootElement("#PostalCode");
      element.focus();
      return;
    }
    else if (this.cardDetail.Email == undefined || this.cardDetail.Email == null || this.cardDetail.Email == '') {
      this.toastr.error("Please Insert Email", 'Message!');
      const element = this.renderer.selectRootElement("#Email");
      element.focus();
      return;
    }
    else if (this.isValidEmail(this.cardDetail.Email) == false) {
      this.toastr.error("Please Insert Valid Email", 'Message!');
      const element = this.renderer.selectRootElement("#Email");
      element.focus();
      return;
    }
    else if (this.cardDetail.adr1 != undefined && this.cardDetail.adr1.length > this.addr1val) {
      this.toastr.error("Max length of Address 1 is " + this.addr1val, 'Message!');
      const element = this.renderer.selectRootElement("#Address1");
      element.focus();
      return;
    }
    else if (this.cardDetail.adr2 != undefined && this.cardDetail.adr2.length > this.addr2val) {
      this.toastr.error("Max length of Address 2 is " + this.addr2val, 'Message!');
      const element = this.renderer.selectRootElement("#Address2");
      element.focus();
      return;
    }
    else if (this.cardDetail.city.length > this.cityval) {
      this.toastr.error("Max length of City is " + this.cityval, 'Message!');
      const element = this.renderer.selectRootElement("#City");
      element.focus();
      return;
    }
    else {
      var cardNumber = this.registerService.encrypted('8080808080808080', this.cardDetail.CardNumber);
      var securityCode = this.registerService.encrypted('8080808080808080', this.cardDetail.SecurityCode);
      var usrid = null;
      if (Common.getWithExpiry("UserType") == '3') {
        usrid = Common.getWithExpiry("UserID");
      }
      else {
        usrid = Common.getWithExpiry("CustID");
      }
      if(this.cardDetail.zip.length==5){
        this.cardDetail.zip=this.cardDetail.zip+"0000";
      }
      console.log('this.ctype', this.ctype);
      var model = {
        "Id": this.id,
        "FirstName": this.cardDetail.FirstName,
        "LastName": this.cardDetail.LastName,
        "CardType": this.cardDetail.CardType,
        "CardNumber": cardNumber,
        "ExpirationMonth": this.cardDetail.ExpirationMonth,
        "ExpirationYear": this.cardDetail.ExpirationYear,
        "SecurityCode": securityCode,
        "Customer": Common.getWithExpiry("CustID"),
        "SubUserID": usrid,
        "adr1": this.cardDetail.adr1,
        "adr2": this.cardDetail.adr2,
        "city": this.cardDetail.city,
        "state": this.cardDetail.selectedState,
        "country": this.cardDetail.selectedCountry,
        "zip": this.cardDetail.zip,
        "Email": this.cardDetail.Email,
        "profileid": this.cardDetail.profileid,
        "iscreditcard": (this.ctype == '1' ? true : false),
      }
      if (this.TextUpperCase == '1') {
        try {
          model = this.ConvertKeysToUpperCase(model);
        } catch (ef) { }
      }
      model.CardNumber = cardNumber;
      model.SecurityCode = securityCode;
      this.sendMessage('start');
      this.checkoutService.addCard(model).subscribe((res: any) => {
        this.sendMessage('stop');
        if (res.status == true) {
          this.isAdded = true;
          this.cardDetail = {};
          this.msg = "Card details has been saved.";
          this.resCardId = res.cardId;
          this.toastr.success("Card details has been saved.", 'Message!');
          this.closeDialog();
        }
        else {
          this.toastr.error(res.msg);
          this.resCardId = 0;
          this.closeDialog();
        }
      });
    }
  }
  closeDialog() {
    this.dialogRef.close(this.resCardId);
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
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

  DeleteCard() {
    this.sendMessage('start');
    this.checkoutService.DeleteCardbyID(this.id).subscribe((res: any) => {
      var data = res;
      this.sendMessage('stop');
      if (data == true) {
        this.toastr.success("Card Deleted Successfully....", 'Message!');
        this.cardDetail = [];
        this.closeDialog();
      }
      else {
        this.toastr.error("Please Try Again....", 'Message!');
      }
    });
  }
  clearcvv() {
    this.cardDetail.SecurityCode = '';
  }
  CopyBillingAddress() {
    if (this.isChecked) {
      if (this.billingAddress.PostalCode != undefined && this.billingAddress.PostalCode != null && this.billingAddress.PostalCode != '') {
        this.isPostalCodeValid = true;
      }
      this.cardDetail.adr1 = this.billingAddress.Address1;
      this.cardDetail.adr2 = this.billingAddress.Address2;
      this.cardDetail.selectedCountry = this.billingAddress.Country;
      this.cardDetail.selectedState = this.billingAddress.State;
      this.cardDetail.city = this.billingAddress.City;
      this.cardDetail.zip = this.billingAddress.PostalCode;
      this.togglePostalCodeFlag();
    }
    else{
      if(this.id){
        this.getCardById();
      }else{
        this.cardDetail.adr1 = '';
        this.cardDetail.adr2 = '';
        this.cardDetail.selectedCountry = "US";
        this.cardDetail.selectedState = "0";
        this.cardDetail.city = '';
        this.cardDetail.zip = '';
      }
    }
  }
  getCardById() {
    this.checkoutService.getCardById(this.id).subscribe((res: any) => {
      var result = res;
      var cardNumber = this.registerService.decrypted('8080808080808080', result.CardNumber);
      var securityCode = this.registerService.decrypted('8080808080808080', result.SecurityCode);
      this.cardDetail.FirstName = result.FirstName;
      this.cardDetail.LastName = result.LastName;
      this.cardDetail.CardType = result.CardType;
      this.cardDetail.CardNumber = cardNumber;
      this.cardDetail.oldcardno = "**** **** **** " + cardNumber.substr(cardNumber.length - 4, 4);
      this.cardDetail.ExpirationMonth = result.ExpirationMonth;
      this.cardDetail.ExpirationYear = result.ExpirationYear;
      this.cardDetail.SecurityCode = securityCode;
      this.cardDetail.zip = result.zip;
      this.cardDetail.city = result.city;
      this.cardDetail.selectedState = result.state;
      this.cardDetail.selectedCountry = result.country;
      this.cardDetail.adr2 = result.adr2;
      this.cardDetail.adr1 = result.adr1;
      this.cardDetail.Email = result.Email;
      this.cardDetail.profileid = result.profileid;
      this.cardDetail.SubUserID = result.SubUserID;
    });
  }
}