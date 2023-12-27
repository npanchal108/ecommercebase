import { Component, OnInit, Renderer2 } from '@angular/core';
import { Common } from '../../app/model/common.model';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';

import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';
import { SEOService } from '../services/seo.service';
import { LoadingService } from '../services/loading.service';
// import * as $ from 'jquery';
import * as parser from 'parse-address'
// import { IpServiceService } from '../ip-service.service';
@Component({
  selector: 'app-b2b-registration',
  templateUrl: './b2b-registration.component.html',
  styleUrls: ['./b2b-registration.component.scss']
})
export class B2bRegistrationComponent implements OnInit {

  user: any = {};
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  registrationcontrols: any;
  isShowForm: boolean;
  isShowMsg: boolean;
  confirmPass: boolean;
  showProvince: boolean;
  returnmsg: string;
  isStateValidation: boolean = false;
  isCityValidation: boolean = false;
  isvalidateemail: boolean = true;
  isAddressValidation: boolean = false;
  isPhoneValidation: boolean = false;
  isEmailValidation: boolean = false;
  isFirstValidation: boolean = false;
  isLastValidation: boolean = false;
  isPostalCodeValidation: boolean = false;
  isEmailrCodeValidation: boolean = false;
  isPasswordCodeValidation: boolean = false;

  showprovince: any;
  iscaptcha: any;
  captcha1: string = null;
  isError: boolean = false;
  Errormsg: string = '';
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
  isaccesswithlogin: any;
  isaddressparse: string = '0';
  TextUpperCase: any;
  RegistrationLable: any;
  ipAddress: string;

  constructor(private renderer: Renderer2,private loadingService: LoadingService, private seoService: SEOService, private dataService: DataService, private toastr: ToastrService, private registerService: RegistrationService) {
    this.gototop();
    this.Getcaptchavalue();
    this.getRegistrationControls();
    this.GetConfigtoRegistrationLable();
    this.GetconfigurationfroAddressParser();
    this.Accessannomyous();
    this.GetConfigForTextUpperCaseSetting();
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Registration - ' + geturl);
    this.seoService.setkeywords('Registration - ' + geturl);    
    this.seoService.setdescription('Registration - ' + geturl);    
  }

  // getIP() {
  //   this.ip.getIPAddress().subscribe((res: any) => {
  //     this.ipAddress = res.ip;
  //   });
  // }

  GetConfigForTextUpperCaseSetting() {
    this.TextUpperCase =this.dataService.Getconfigbykey("TextUpperCaseSetting");
    if (this.TextUpperCase == null || this.TextUpperCase == undefined || this.TextUpperCase == '') {
      try{
            this.TextUpperCase = localStorage.getItem("TextUpperCase");
      }catch(ed){}
    }
    if (this.TextUpperCase == null || this.TextUpperCase == undefined || this.TextUpperCase == '') {
      this.dataService.GetConfigForTextUpperCaseSetting().subscribe((res: any) => {
        this.TextUpperCase = res;
        try{
        localStorage.setItem("TextUpperCase", this.TextUpperCase);
      }catch(ed){}
      });
    }
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  ngOnInit() {
    //this.getIP();
    this.showProvince = true;
    this.confirmPass = false;
    this.isShowForm = true;
    this.isShowMsg = false;

    this.user.selectedCity = "0";
    this.user.selectedState = "0";
    this.getCountry();
    this.getStates("US");

  }

  getCountry() {
    this.registerService.getCountry().subscribe((res: any) => {
      this.countryList = res;
      this.user.selectedCountry = "US";
      this.getvalforform();
    })
  }
  getRegistrationControls() {
    try {
      if (localStorage.getItem("registrationcontrols") != undefined) {
        var registrationcontrols = JSON.parse(Common.getWithExpiry("registrationcontrols"));
      }
    } catch (ed) { }
    if (registrationcontrols == null || registrationcontrols == undefined || registrationcontrols.length == 0) {
      this.registerService.getRegistrationControls().subscribe((res: any) => {
        this.registrationcontrols = res;
        for (var i = 0; i < this.registrationcontrols.length; i++) {
          this.registrationcontrols[i].optionlist = undefined;
          if (this.registrationcontrols[i].controltype == 'dropdown' && this.registrationcontrols[i].dropdowntype == 'Other') {
            this.registrationcontrols[i].optionlist = this.registrationcontrols[i].dropdowndetails.split(',');
          }
        }
        try{
        localStorage.setItem("registrationcontrols", JSON.stringify(this.registrationcontrols));
      }catch(ed){}
      })
    }
    else {
      this.registrationcontrols = registrationcontrols;
    }
  }
  Accessannomyous() {
    this.isaccesswithlogin=this.dataService.Getconfigbykey("withoutloginBrowse");
    if (this.isaccesswithlogin == null || this.isaccesswithlogin == undefined || this.isaccesswithlogin == '') {
      try{
    this.isaccesswithlogin = localStorage.getItem("isaccesswithlogin");
  }catch(ed){}
    }
    if (this.isaccesswithlogin == null || this.isaccesswithlogin == undefined || this.isaccesswithlogin == '') {
      this.dataService.GetConfidForanonymoususersbrowsethesite().subscribe((res: any) => {
        this.isaccesswithlogin = res;
        try{
        localStorage.setItem("isaccesswithlogin", this.isaccesswithlogin);
      }catch(ed){}
      });
    }
  }
  GetConfigtoRegistrationLable() {
    this.RegistrationLable =this.dataService.Getconfigbykey("RegistrationLable");
    if (this.RegistrationLable == null || this.RegistrationLable == undefined || this.RegistrationLable == '') {
      try{
    this.RegistrationLable = localStorage.getItem("RegistrationLable");
  }catch(ed){}
    }
    if (this.RegistrationLable == null || this.RegistrationLable == undefined || this.RegistrationLable == '') {
      this.dataService.GetConfigtoRegistrationLable().subscribe((res: any) => {
        this.RegistrationLable = res;
        try{
        localStorage.setItem("RegistrationLable", this.RegistrationLable);
      }catch(ed){}
      });
    }
  }
  GetconfigurationfroAddressParser() {
    this.isaddressparse =this.dataService.Getconfigbykey("AddressParser");
    if (this.isaddressparse == null || this.isaddressparse == undefined || this.isaddressparse == '') {
      try{
    this.isaddressparse = localStorage.getItem("isaddressparse");
  }catch(ed){}
    }
    if (this.isaddressparse == null || this.isaddressparse == undefined || this.isaddressparse == '') {
      this.dataService.GetconfigurationfroAddressParser().subscribe((res: any) => {
        this.isaddressparse = res;
        try{
        localStorage.setItem("isaddressparse", this.isaddressparse);
      }catch(ed){}
      });
    }
  }

  getvalforform() {
    for (var i = 0; i < this.countryList.length; i++) {
      if (this.countryList[i].country_code == this.user.selectedCountry) {
        this.getvalidation = this.countryList[i];
        this.postalvalidation = this.getvalidation.fmt_postal.length;
        var addrval = JSON.parse(this.getvalidation.fmt_address);
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

  isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  getisprofiledesc() {
    this.showprovince =this.dataService.Getconfigbykey("provinceregistration");
    if (this.showprovince == null || this.showprovince == undefined || this.showprovince == '') {
      try{
    this.showprovince = localStorage.getItem("showprovince");
  }catch(ed){}
    }
    if (this.showprovince == null || this.showprovince == undefined || this.showprovince == '') {
      this.registerService.GetconfigurationforshowprovinceinRegistration().subscribe((res: any) => {
        this.showprovince = res;
        try{
        localStorage.setItem("showprovince", this.showprovince);
      }catch(ed){}
      });
    }
  }
  addreparser() {
    if (this.user.addressparser == undefined || this.user.addressparser == null || this.user.addressparser == '') {
      this.toastr.error("Please enter address first");
    }
    else {      
      var parsed = parser.parseLocation(this.user.addressparser);
      for (var i = 0; i < this.registrationcontrols.length; i++) {
        if(this.registrationcontrols[i].controlname=='Address 1'){
          this.registrationcontrols[i].DefaultValues=(parsed.number == undefined ? "" : parsed.number) + ' ' + (parsed.prefix == undefined ? "" : parsed.prefix) + ' ' + (parsed.street == undefined ? "" : parsed.street) + ' ' + (parsed.type == undefined ? "" : parsed.type);
        }
        if(this.registrationcontrols[i].controlname=='City'){
          this.registrationcontrols[i].DefaultValues=parsed.city;
        }
        if(this.registrationcontrols[i].controlname=='State'){
          this.registrationcontrols[i].DefaultValues=parsed.state.toUpperCase();
        }
        if(this.registrationcontrols[i].controlname=='Postal Code'){
          this.registrationcontrols[i].DefaultValues=parsed.zip;
        }
      }
      // $("#Address1").val((parsed.number == undefined ? "" : parsed.number) + ' ' + (parsed.prefix == undefined ? "" : parsed.prefix) + ' ' + (parsed.street == undefined ? "" : parsed.street) + ' ' + (parsed.type == undefined ? "" : parsed.type));
      // $("#City").val(parsed.city);
      // $("#State").val(parsed.state);
      // $("#PostalCode").val(parsed.zip);
    }
  }
  Getcaptchavalue() {
    this.iscaptcha =this.dataService.Getconfigbykey("CaptchaInRegistration");
    if (this.iscaptcha == undefined || this.iscaptcha == null || this.iscaptcha =='') {
      try{
    this.iscaptcha = localStorage.getItem("iscaptchar");
  }catch(ed){}
    }
    if (this.iscaptcha == undefined || this.iscaptcha == null || this.iscaptcha =='') {
      this.dataService.GetConfidForcaptchaRegistration().subscribe((data: any) => {
        this.iscaptcha = data;
        try{
        localStorage.setItem("iscaptchar", this.iscaptcha);
      }catch(ed){}
      })
    }
  }
  resolved(captchaResponse: string) {
    this.captcha1 = captchaResponse;
    if (this.captcha1 != null && this.iscaptcha == '1') {
      this.isError = false;
    }
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  

  OnSubmit(form: NgForm) {
    var isValidation = false;
    if (this.captcha1 == null && this.iscaptcha == '1') {
      this.Errormsg = 'Please Click on Captcha CheckBox';
      this.isError = true;
      isValidation = true;
    }
    for (var i = 0; i < this.registrationcontrols.length; i++) {
      if (this.registrationcontrols[i].isrequired && (this.registrationcontrols[i].DefaultValues == undefined
        || this.registrationcontrols[i].DefaultValues == null || this.registrationcontrols[i].DefaultValues == '')) {
        this.toastr.error("Please insert " + this.registrationcontrols[i].controlname, 'Message!');
        isValidation = true;
        if(this.registrationcontrols[i].controltype=='dropdown'){
          document.getElementById("con"+this.registrationcontrols[i].controlid).scrollIntoView();
        }
        else{
          const element = this.renderer.selectRootElement("#con"+this.registrationcontrols[i].controlid);
          element.focus();
        }
        return;
      }

      
      if (this.registrationcontrols[i].isemail == true &&
        this.registrationcontrols[i].DefaultValues != undefined
        && this.registrationcontrols[i].DefaultValues != null && this.registrationcontrols[i].DefaultValues != ''
        && this.isValidEmail(this.registrationcontrols[i].DefaultValues) == false) {
        this.toastr.error("Please insert Valid " + this.registrationcontrols[i].controlname, 'Message!');
        isValidation = true;
        if(this.registrationcontrols[i].controltype=='dropdown'){
          document.getElementById("con"+this.registrationcontrols[i].controlid).scrollIntoView();
        }
        else{
          const element = this.renderer.selectRootElement("#con"+this.registrationcontrols[i].controlid);
          element.focus();
        }
        return;
      }
      if (this.registrationcontrols[i].isemail == true &&
        this.registrationcontrols[i].DefaultValues != undefined
        && this.registrationcontrols[i].DefaultValues != null && this.registrationcontrols[i].DefaultValues != ''
        && this.isValidEmail(this.registrationcontrols[i].DefaultValues) == true) {
            this.checkemail(this.registrationcontrols[i].DefaultValues);
        }

    }
    if (isValidation == false) {
      this.sendMessage('start');
      try {
        this.registerService.BusinesstoBusinessRegistration(this.registrationcontrols).subscribe((res: any) => {
          var getmsg = res;
          this.sendMessage('stop');
          this.returnmsg = getmsg.toString();
          if (this.returnmsg == "0") {

            // var model = {
            //   "LogType": "B2BRegistration",
            //   "Description": "Error occured please try again. Model: "+ JSON.parse(this.registrationcontrols),
            //   "SearchKeyword": "",
            //   "CustID":Common.getWithExpiry("CustID"),
            //   "UserId": Common.getWithExpiry("UserID"),
            //   "ClientIP": this.ipAddress
            // }
        
            // this.dataService.AddActivityLog(model).subscribe((res1: any) => {
            
            // });
    
            this.toastr.error("Error occured please try again", 'Message!');
            this.isvalidateemail = true;
          }
          else {

            // var model = {
            //   "LogType": "B2BRegistration",
            //   "Description": "Registration Successful.",
            //   "SearchKeyword": "",
            //   "CustID":Common.getWithExpiry("CustID"),
            //   "UserId": Common.getWithExpiry("UserID"),
            //   "ClientIP": this.ipAddress
            // }
        
            // this.dataService.AddActivityLog(model).subscribe((res1: any) => {
            
            // });

            this.returnmsg = "Registration Successful. We will contact you soon.";
            this.isShowMsg = true;
            this.isShowForm = false;
          }
        })
      } catch (ed) {
        this.sendMessage('stop');
      }
    }

    // var isValidation = false;
    // this.isStateValidation=false;
    // this.isEmailValidation=false;
    // this.isFirstValidation = false;
    // this.isLastValidation = false;
    // this.isStateValidation = false;
    // this.isCityValidation = false;
    // this.isPostalCodeValidation = false;
    // this.isAddressValidation = false;
    // this.isPhoneValidation = false;
    // this.isEmailrCodeValidation = false;
    // this.isEmailValidation = false;
    // this.confirmPass=false;
    // if(this.user.FirstName==undefined || this.user.FirstName==null && this.user.FirstName==''){
    //   isValidation = true;
    //   this.toastr.error("Please insert First Name ", 'Error!');
    //   return;
    // }
    // if(this.user.LastName==undefined || this.user.LastName==null && this.user.LastName==''){
    //   isValidation = true;
    //   this.toastr.error("Please insert Last Name ", 'Error!');
    //   return;
    // }
    // if(this.user.Company==undefined || this.user.Company==null && this.user.Company==''){
    //   isValidation = true;
    //   this.toastr.error("Please insert Company Name ", 'Error!');
    //   return;
    // }
    // if(this.user.Address1==undefined || this.user.Address1==null && this.user.Address1==''){
    //   isValidation = true;
    //   this.toastr.error("Please insert Address 1", 'Error!');
    //   return;
    // }
    // if(this.user.City==undefined || this.user.City==null && this.user.City==''){
    //   isValidation = true;
    //   this.toastr.error("Please insert City ", 'Error!');
    //   return;
    // }
    // if(this.user.selectedState==undefined || this.user.selectedState==null && this.user.selectedState==''){
    //   isValidation = true;
    //   this.toastr.error("Please Select State ", 'Error!');
    //   return;
    // }
    // if(this.user.PostalCode==undefined || this.user.PostalCode==null && this.user.PostalCode==''){
    //   isValidation = true;
    //   this.toastr.error("Please insert Postal Code ", 'Error!');
    //   return;
    // }
    // if(this.user.Phone==undefined || this.user.Phone==null && this.user.Phone==''){
    //   isValidation = true;
    //   this.toastr.error("Please insert Phone ", 'Error!');
    //   return;
    // }
    // if(this.user.EmailAddress==undefined || this.user.EmailAddress==null && this.user.EmailAddress==''){
    //   isValidation = true;
    //   this.toastr.error("Please insert EmailAddress", 'Error!');
    //   return;
    // }
    // if(this.user.Address1!=undefined && this.user.Address1.length > this.addr1val){
    //   isValidation = true;
    //   this.toastr.error("Address 1 max length is "+this.addr1val, 'Error!');
    // }
    // if(this.user.Address2!=undefined && this.user.Address2.length > this.addr2val){
    //   isValidation = true;
    //   this.toastr.error("Address 2 max length is "+this.addr2val, 'Error!');
    // }
    // if(this.user.City!=undefined && this.user.City.length > this.addr3val){
    //   isValidation = true;
    //   this.toastr.error("City max length is "+this.addr3val, 'Error!');
    // }
    // if(this.user.PostalCode!=undefined && this.user.PostalCode.length > this.postalvalidation){
    //   isValidation = true;
    //   this.toastr.error("Postal Code max length is "+this.postalvalidation, 'Error!');
    // }
    // if(this.user.Phone!=undefined && this.user.Phone.length > this.phoneval){
    //   isValidation = true;
    //   this.toastr.error("Phone max length is "+this.phoneval, 'Error!');
    // }
    // if(this.captcha1==null && this.iscaptcha=='1'){
    //   this.Errormsg='Please Click on Captcha CheckBox';
    //   this.isError=true;      
    //   isValidation = true;
    // }
    // if (this.user.FirstName == "" || this.user.FirstName == undefined) {
    //   this.isFirstValidation = true;
    //   isValidation = true;
    // }
    // if (this.user.LastName == "" || this.user.LastName == undefined) {
    //   this.isLastValidation = true;
    //   isValidation = true;
    // }
    // if (this.user.selectedState == "0") {
    //   this.isStateValidation = true;
    //   isValidation = true;
    // }
    // if (this.user.City == "" || this.user.City == undefined) {
    //   this.isCityValidation = true;
    //   isValidation = true;
    // }
    // if (this.user.PostalCode == "" || this.user.PostalCode == undefined) {
    //   this.isPostalCodeValidation = true;
    //   isValidation = true;
    // }
    // if (this.user.Address1 == "" || this.user.Address1 == undefined) {
    //   this.isAddressValidation = true;
    //   isValidation = true;
    // }
    // if (this.user.Phone == "" || this.user.Phone == undefined) {
    //   this.isPhoneValidation = true;
    //   isValidation = true;
    // }
    // if (this.user.EmailAddress == "" || this.user.EmailAddress == undefined) {
    //   this.isEmailrCodeValidation = true;
    //   isValidation = true;
    // }
    // if(this.isValidEmail(this.user.EmailAddress)==false){
    //   this.isEmailValidation = true;
    //   isValidation = true;
    // }

    // if (isValidation){      
    //   return;
    // }
    // this.confirmPass = false;
    // this.isvalidateemail=false;

    // var address="";
    // if(this.cityno==3 || this.cityno=='3'){      
    //   address=address+this.user.Address1+ ';';
    //   if(this.user.Address2!=undefined && this.user.Address2!=null && this.user.Address2!=''){
    //   address=address+this.user.Address2+  ';';
    // }
    // else
    // {
    //   address=address+  ';';
    // }
    //   address=address+this.user.City+';';
    //   address=address+(this.user.Province==undefined?"":this.user.Province)+';';
    //   address=address+';';
    //   address=address+';';
    // } 
    // else{      
    //   address=address+this.user.Address1 + ';';
    //   if(this.user.Address2!=undefined && this.user.Address2!=null && this.user.Address2!=''){
    //     address=address+this.user.Address2+  ';';
    //   }
    //   else
    //   {
    //     address=address+  ';';
    //   }
    //   address=address+ ';';
    //   address=address+this.user.City+';';
    //   address=address+(this.user.Province==undefined?"":this.user.Province)+';';
    //   address=address+';';      
    // }

    // var registerModel = {
    //   "atn_first_name": this.user.FirstName,
    //   "atn_last_name": this.user.LastName,
    //   "atn_suffix": this.user.Suffix,
    //   "name": this.user.Company,
    //   "adr": address,
    //   "state": this.user.selectedState,
    //   "postal_code": this.user.PostalCode,
    //   "country_code": this.user.selectedCountry,
    //   "IsRetailer": this.user.Residential == true ? 1 : 0,
    //   "phone": this.user.Phone,
    //   "phone_ext": this.user.PhoneExt,
    //   "fax": this.user.Fax,
    //   "email_address": this.user.EmailAddress,
    //   "tax_code": this.user.Password,
    //   "Signature": this.user.ConfirmPassword,
    //   "registerType": "b2b"
    // }
    // if(this.TextUpperCase=='1'){
    //   try{
    //   registerModel = this.ConvertKeysToUpperCase(registerModel);
    //   }catch(ed){}
    // }
    // this.registerService.Register(registerModel).subscribe((res:any) => {      
    //   var getmsg = res;
    //   this.returnmsg = getmsg.toString();
    //   if (this.returnmsg == "0") {        
    //     this.toastr.error("Error occured please try again", 'Error!');
    //     this.isvalidateemail=true;
    //   }
    //   else {
    //     this.returnmsg="Registration Successful.";
    //     this.isShowMsg = true;
    //     this.isShowForm = false;
    //   }
    // })
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

  checkemail(EmailAddress) {
  
      this.registerService.CheckEmail(EmailAddress).subscribe((res: any) => {
        var getmsg = res;
        if (getmsg != true) {
          //this.toastr.error("This user Already Registered with customer ID "+getmsg);
          this.returnmsg = "This user Already Registered with customer ID " + getmsg;
          this.isShowMsg = true;
          this.isShowForm = false;
          this.isvalidateemail = false;
        }
        else {
          this.isvalidateemail = true;
        }
      });
    
  }

  onCountryChange(val) {
    if (val == "US") {
      this.showProvince = true;
      this.getStates(val);
    }
    else {
      this.showProvince = false;
      this.getStates(val);
    }
    this.getvalforform();
  }

  getStates(val) {
    this.registerService.getState(val).subscribe((res: any) => {
      this.stateList = res;
    })
  }

  onStateChange(val) {
    this.getCities(val);
  }

  getCities(val) {
    this.registerService.getCity(val).subscribe((res: any) => {
      this.cityList = res;
    })
  }
}
