import { Component, OnInit, Renderer2 } from '@angular/core';
import { Common } from '../../app/model/common.model';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { Md5 } from 'ts-md5/dist/md5';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';
import { SEOService } from '../services/seo.service';
import { LoadingService } from '../services/loading.service';
// import * as $ from 'jquery';
import * as parser from 'parse-address'
import * as passwordPolicy from 'password-policy'
import { Router} from '@angular/router';
// import { IpServiceService } from '../ip-service.service';
@Component({
  selector: 'app-b2c-registration',
  templateUrl: './b2c-registration.component.html',
  styleUrls: ['./b2c-registration.component.scss']
})
export class B2cRegistrationComponent implements OnInit {
  hide=true;
  hide1=true;
  user: any = {};
  countryList: any = [];
  stateList: any = [];
  isstateshow:any=true;
  cityList: any = [];
  IsMultiCompanySetting: any;
  isShowForm: boolean;
  isShowMsg: boolean;
  confirmPass: boolean;
  showProvince: boolean;
  returnmsg: string;
  isStateValidation: boolean = false;
  isCityValidation: boolean = false;
  isCompanyValidation: boolean = false;
  isvalidateemail: boolean = true;
  isAddressValidation: boolean = false;
  isPhoneValidation: boolean = false;
  isEmailValidation: boolean = false;
  isFirstValidation: boolean = false;
  isLastValidation: boolean = false;
  isPostalCodeValidation: boolean = false;
  isEmailrCodeValidation: boolean = false;
  isPasswordCodeValidation: boolean = false;
  AllCompaniesList: any;
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
  passwordpolicy1: any;
  isaddressparse: string = '0';
  TextUpperCase: any;
  selectedcompany: any;
  company: any = 0;
  addb2bfields: any = "0";
  RegistrationLable: any;
  ipAddress: string;

  constructor(private renderer: Renderer2,private router: Router, private loadingService: LoadingService, private seoService: SEOService, private dataService: DataService, private toastr: ToastrService, private registerService: RegistrationService) {
    this.company = (Common.getWithExpiry("company_sy") == null ? 0 : Common.getWithExpiry("company_sy"));

    this.gototop();
    this.Getcaptchavalue();
    this.GetConfigurationforaddb2bfields()
    this.GetConfigurationforPasswordPolicy();
    this.GetConfigtoRegistrationLable();
    this.GetconfigurationfroAddressParser();
    this.Accessannomyous();
    this.GetIsMultiCompanySetting();
    this.GetConfigForTextUpperCaseSetting();
    this.user.selectedState='0';
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

  companychange(company) {
    if (company != undefined && company != null && company != '0') {
      this.dataService.GetSysCompanyDetails(company).subscribe((data: any) => {
        this.selectedcompany = data;
        localStorage.clear();
        if (this.selectedcompany != undefined && this.selectedcompany != null) {
          Common.setWithExpiry("company_cu", this.selectedcompany.company_cu);
          Common.setWithExpiry("company_it", this.selectedcompany.company_it);
          Common.setWithExpiry("company_sy", this.selectedcompany.company_sy);
        }
        window.location.reload();

      })
    }
    else {
      this.toastr.warning("Please select Company");
    }
  }
  GetIsMultiCompanySetting() {
    this.IsMultiCompanySetting = this.dataService.Getconfigbykey("IsMultiCompany");
    if (this.IsMultiCompanySetting == undefined || this.IsMultiCompanySetting == null || this.IsMultiCompanySetting == '') {
      this.IsMultiCompanySetting = Common.getWithExpiry("IsMultiCompanySetting");
    }
    if (this.IsMultiCompanySetting == undefined || this.IsMultiCompanySetting == null || this.IsMultiCompanySetting == '') {
      this.dataService.IsMultiCompanySetting().subscribe((data: any) => {
        this.IsMultiCompanySetting = data;
        Common.setWithExpiry("IsMultiCompanySetting", this.IsMultiCompanySetting);
        if (this.IsMultiCompanySetting == '1') {
          this.GetAllCompaniesList();
        }
      })
    }
    if (this.IsMultiCompanySetting == '1') {
      this.GetAllCompaniesList();
    }
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  GetAllCompaniesList() {
    try {
      if (Common.getWithExpiry("AllCompaniesList") != undefined) {
        var AllCompaniesList = JSON.parse(Common.getWithExpiry("AllCompaniesList"));
      }
    } catch (ed) { }
    if (AllCompaniesList == null || AllCompaniesList == undefined || AllCompaniesList.length == 0) {
      this.dataService.GetAllCompaniesList().subscribe((data: any) => {
        this.AllCompaniesList = data;
        Common.setWithExpiry("AllCompaniesList", JSON.stringify(this.AllCompaniesList));
      })
    }
    else {
      this.AllCompaniesList = AllCompaniesList;
    }

  }

  GetconfigurationfroAddressParser() {
    this.isaddressparse = this.dataService.Getconfigbykey("AddressParser");
    if (this.isaddressparse == null || this.isaddressparse == undefined || this.isaddressparse == '') {
      this.isaddressparse = Common.getWithExpiry("isaddressparse");
    }
    if (this.isaddressparse == null || this.isaddressparse == undefined || this.isaddressparse == '') {
      this.dataService.GetconfigurationfroAddressParser().subscribe((res: any) => {
        this.isaddressparse = res;
        Common.setWithExpiry("isaddressparse", this.isaddressparse);
      });
    }
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
  GetConfigurationforaddb2bfields() {
    this.addb2bfields = this.dataService.Getconfigbykey("addb2bfields");
    if (this.addb2bfields == null || this.addb2bfields == undefined || this.addb2bfields == '') {
      this.addb2bfields = Common.getWithExpiry("addb2bfields");
    }
    if (this.addb2bfields == null || this.addb2bfields == undefined || this.addb2bfields == '') {
      this.dataService.GetConfigurationforaddb2bfields().subscribe((res: any) => {
        this.addb2bfields = res;
        Common.setWithExpiry("addb2bfields", this.addb2bfields);
      });
    }
  }
  GetConfigtoRegistrationLable() {
    this.RegistrationLable = this.dataService.Getconfigbykey("RegistrationLable");
    if (this.RegistrationLable == null || this.RegistrationLable == undefined || this.RegistrationLable == '') {
      this.RegistrationLable = Common.getWithExpiry("RegistrationLable");
    }
    if (this.RegistrationLable == null || this.RegistrationLable == undefined || this.RegistrationLable == '') {
      this.dataService.GetConfigtoRegistrationLable().subscribe((res: any) => {
        this.RegistrationLable = res;
        Common.setWithExpiry("RegistrationLable", this.RegistrationLable);
      });
    }
  }
  GetConfigurationforPasswordPolicy() {
    this.passwordpolicy1 = this.dataService.Getconfigbykey("PasswordPolicy");
    if (this.passwordpolicy1 == null || this.passwordpolicy1 == undefined || this.passwordpolicy1 == '') {
      this.passwordpolicy1 = Common.getWithExpiry("passwordpolicy");
    }
    if (this.passwordpolicy1 == null || this.passwordpolicy1 == undefined || this.passwordpolicy1 == '') {
      this.dataService.GetConfigurationforPasswordPolicy().subscribe((res: any) => {
        this.passwordpolicy1 = res;
        Common.setWithExpiry("passwordpolicy", this.passwordpolicy1);
      });
    }
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
      });
    }
  }

  ngOnInit() {
    if (Common.getWithExpiry("CustID") != undefined || Common.getWithExpiry("SalesUserID") != undefined) {
        this.router.navigate(['/dashboard']);
      
    }
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
    this.showprovince = this.dataService.Getconfigbykey("provinceregistration");
    if (this.showprovince == null || this.showprovince == undefined || this.showprovince == '') {
      this.showprovince = Common.getWithExpiry("showprovince");
    }
    if (this.showprovince == null || this.showprovince == undefined || this.showprovince == '') {
      this.registerService.GetconfigurationforshowprovinceinRegistration().subscribe((res: any) => {
        this.showprovince = res;
        Common.setWithExpiry("showprovince", this.showprovince);
      });
    }
  }

  addreparser() {
    if (this.user.addressparser == undefined || this.user.addressparser == null || this.user.addressparser == '') {
      this.toastr.error("Please enter address first");
      const element = this.renderer.selectRootElement("#addressparser");
      element.focus();
    }
    else {

      var parsed = parser.parseLocation(this.user.addressparser);
      this.user.Address1 = (parsed.number == undefined ? "" : parsed.number) + ' ' + (parsed.prefix == undefined ? "" : parsed.prefix) + ' ' + (parsed.street == undefined ? "" : parsed.street) + ' ' + (parsed.type == undefined ? "" : parsed.type);
      this.user.City = parsed.city;
      this.user.selectedState = parsed.state.toUpperCase();
      this.user.PostalCode = parsed.zip;
      // $("#Address1").val((parsed.number==undefined?"":parsed.number)+' '+(parsed.prefix==undefined?"":parsed.prefix)+' '+(parsed.street==undefined?"":parsed.street) +' '+(parsed.type==undefined?"":parsed.type));
      // $("#City").val(parsed.city);
      // $("#State").val(parsed.state);
      // $("#PostalCode").val(parsed.zip);
    }
  }

  Getcaptchavalue() {
    this.iscaptcha = this.dataService.Getconfigbykey("CaptchaInRegistration");
    if (this.iscaptcha == null || this.iscaptcha == undefined || this.iscaptcha == '') {
      this.iscaptcha = Common.getWithExpiry("iscaptchar");
    }
    if (this.iscaptcha == null || this.iscaptcha == undefined || this.iscaptcha == '') {
      this.dataService.GetConfidForcaptchaRegistration().subscribe((data: any) => {
        this.iscaptcha = data;
        Common.setWithExpiry("iscaptchar", this.iscaptcha);
      })
    }
  }
  resolved(captchaResponse: string) {
    this.captcha1 = captchaResponse;
    if (this.captcha1 != null && this.iscaptcha == '1') {
      this.isError = false;
    }
  }
  OnSubmit(form: NgForm) {

    var isValidation = false;
    this.isStateValidation = false;
    this.isEmailValidation = false;
    this.isFirstValidation = false;
    this.isLastValidation = false;
    this.isStateValidation = false;
    this.isCityValidation = false;
    this.isCompanyValidation = false;
    this.isPostalCodeValidation = false;
    this.isAddressValidation = false;
    this.isPhoneValidation = false;
    this.isEmailrCodeValidation = false;
    this.isEmailValidation = false;
    this.confirmPass = false;
    
    if (this.user.FirstName == "" || this.user.FirstName == undefined) {
      this.isFirstValidation = true;
      isValidation = true;      
      const element = this.renderer.selectRootElement("#userFirstName");
      element.focus();
      return;
    }
    if (this.user.LastName == "" || this.user.LastName == undefined) {
      this.isLastValidation = true;
      isValidation = true;
      const element = this.renderer.selectRootElement("#userLastName");
      element.focus();
      return;
    }
    if (this.user.Company == "" || this.user.Company == undefined) {
      this.isCompanyValidation = true;
      isValidation = true;
      const element = this.renderer.selectRootElement("#userCompany");
      element.focus();
      return;
    }
    if (this.user.Address1 != undefined && this.user.Address1.length > this.addr1val) {
      isValidation = true;
      this.toastr.error("Address1 max length is " + this.addr1val, 'Message!');
      const element = this.renderer.selectRootElement("#Address1");
      element.focus();
      return;
    }
    if (this.user.Address1 == "" || this.user.Address1 == undefined) {
      this.isAddressValidation = true;
      isValidation = true;
      const element = this.renderer.selectRootElement("#Address1");
      element.focus();
      return;
    }
    if (this.user.Address2 != undefined && this.user.Address2.length > this.addr2val) {
      isValidation = true;
      this.toastr.error("Address2 max length is " + this.addr2val, 'Message!');
      const element = this.renderer.selectRootElement("#Address2");
      element.focus();
      return;
    }
    if (this.user.City == "" || this.user.City == undefined) {
      this.isCityValidation = true;
      isValidation = true;
      const element = this.renderer.selectRootElement("#City");
      element.focus();
      return;
    }
    if (this.user.City != undefined && this.user.City.length > this.addr3val) {
      isValidation = true;
      this.toastr.error("City max length is " + this.addr3val, 'Message!');
      const element = this.renderer.selectRootElement("#City");
      element.focus();
      return;
    }
    if (this.user.selectedState == "" || this.user.selectedState == undefined || this.user.selectedState==0) {
      this.isStateValidation = true;
      isValidation = true;
      document.getElementById("State").scrollIntoView();      
      return;
    }
    if (this.user.PostalCode == "" || this.user.PostalCode == undefined) {
      this.isPostalCodeValidation = true;
      isValidation = true;
      const element = this.renderer.selectRootElement("#PostalCode");
      element.focus();
      return;
    }
    if (this.user.PostalCode != undefined && this.user.PostalCode.length > this.postalvalidation) {
      isValidation = true;
      this.toastr.error("Postal Code max length is " + this.postalvalidation, 'Message!');
      const element = this.renderer.selectRootElement("#PostalCode");
      element.focus();
      return;
    }
    
    if (this.user.Phone == "" || this.user.Phone == undefined) {
      this.isPhoneValidation = true;
      isValidation = true;
      const element = this.renderer.selectRootElement("#userPhone");
      element.focus();
      return;
    }
    if (this.user.Phone != undefined && this.user.Phone.length > this.phoneval) {
      isValidation = true;
      this.toastr.error("Phone max length is " + this.phoneval, 'Message!');
      const element = this.renderer.selectRootElement("#userPhone");
      element.focus();
      return;
    }
    if (this.user.Phone != undefined && this.user.Phone != null && this.user.Phone != '' && !this.isValidPhone(this.user.Phone)) {
      isValidation = true;
      this.toastr.error("Please insert valid phone number, no special characters or spaces allowed", 'Message!');
      const element = this.renderer.selectRootElement("#userPhone");
      element.focus();
      return;
    }
    if (this.user.EmailAddress == "" || this.user.EmailAddress == undefined) {
      this.isEmailrCodeValidation = true;
      isValidation = true;
      const element = this.renderer.selectRootElement("#userEmailAddress");
      element.focus();
      return;
    }
    if (this.isValidEmail(this.user.EmailAddress) == false) {
      this.isEmailValidation = true;
      isValidation = true;
      const element = this.renderer.selectRootElement("#userEmailAddress");
      element.focus();
      return;
    }
    if (this.user.Password == "" || this.user.Password == undefined) {
      this.isPasswordCodeValidation=true;
      isValidation = true;
      const element = this.renderer.selectRootElement("#userPassword");
      element.focus();
      return;
    }
    
    if (this.user.Password != this.user.ConfirmPassword) {
      this.confirmPass = true;
      isValidation = true;
      const element = this.renderer.selectRootElement("#userConfirmPassword");
      element.focus();
      return;
    }
    if (this.captcha1 == null && this.iscaptcha == '1') {
      this.Errormsg = 'Please Click on Captcha CheckBox';
      this.isError = true;
      isValidation = true;
      return;
    }
    if (this.passwordpolicy1 == '1') {
      if (passwordPolicy.hasLowerCase(this.user.Password) == false) {
        isValidation = true;
        this.toastr.error("Password should contain One Lower Case Character", 'Message!');
        const element = this.renderer.selectRootElement("#userPassword");
        element.focus();
        return;
      }
      if (passwordPolicy.hasUpperCase(this.user.Password) == false) {
        isValidation = true;
        this.toastr.error("Password should contain One Upper Case Character", 'Message!');
        const element = this.renderer.selectRootElement("#userPassword");
        element.focus();
        return;
      }
      if (passwordPolicy.hasNumber(this.user.Password) == false) {
        isValidation = true;
        this.toastr.error("Password should contain One Numeric value", 'Message!');
        const element = this.renderer.selectRootElement("#userPassword");
        element.focus();
        return;
      }
      if (passwordPolicy.hasSpecialCharacter(this.user.Password) == false) {
        isValidation = true;
        this.toastr.error("Password should contain One Special Character", 'Message!');
        const element = this.renderer.selectRootElement("#userPassword");
        element.focus();
        return;
      }
      if (this.user.Password.length < 8 || this.user.Password.length > 20) {
        isValidation = true;
        this.toastr.error("Password Length should not be less then 8 and greater then 20 characters", 'Message!');
        const element = this.renderer.selectRootElement("#userPassword");
        element.focus();
        return;
      }
    }

    if (isValidation) {
      return;
    }





    this.confirmPass = false;
    this.isvalidateemail = false;

    var address = "";
    if (this.cityno == 3 || this.cityno == '3') {

      address = address + this.user.Address1 + ';';
      if (this.user.Address2 != undefined && this.user.Address2 != null && this.user.Address2 != '') {
        address = address + this.user.Address2 + ';';
      }
      else {
        address = address + ';';
      }
      address = address + this.user.City + ';';
      address = address + (this.user.Province == undefined ? "" : this.user.Province) + ';';
      address = address + ';';
      address = address + ';';
    }
    else {

      address = address + this.user.Address1 + ';';
      if (this.user.Address2 != undefined && this.user.Address2 != null && this.user.Address2 != '') {
        address = address + this.user.Address2 + ';';
      }
      else {
        address = address + ';';
      }
      address = address + ';';
      address = address + this.user.City + ';';
      address = address + (this.user.Province == undefined ? "" : this.user.Province) + ';';
      address = address + ';';

    }

    var registerModel = {
      "atn_first_name": this.user.FirstName,
      "atn_last_name": this.user.LastName,
      "atn_suffix": this.user.Suffix,
      "name": this.user.Company,
      "adr": address,
      //"City": this.user.selectedCity,
      "state": this.user.selectedState,
      //"Province": this.user.Province,
      "postal_code": this.user.PostalCode,
      "country_code": this.user.selectedCountry,
      "residential": this.user.Residential == true ? 1 : 0,
      "phone": this.user.Phone,
      "phone_ext": this.user.PhoneExt,
      "fax": this.user.Fax,
      "email_address": this.user.EmailAddress,
      "web_passwd": this.user.Password,
      "tax_id": this.user.tax_id,
      "IsRetailer": this.user.IsRetailer,
      "Signature": this.user.Signature,
      //"new_pwd": Md5.hashStr(this.user.Password),
      "registerType": "b2c",
      "company_cu": Common.getWithExpiry("company_cu"),
    }
    if (this.TextUpperCase == '1') {
      try {
        registerModel = this.ConvertKeysToUpperCase(registerModel);
      } catch (ex) { }
    }
    registerModel.web_passwd = this.user.Password;
    this.sendMessage('start');
    try {
      this.registerService.Register(registerModel).subscribe((res: any) => {
        var getmsg = res;
        this.sendMessage('stop');
        this.returnmsg = getmsg.toString();
        if (this.returnmsg == "0") {

          // var model = {
          //   "LogType": "B2CRegistration",
          //   "Description": "Error occured please try again. Model: "+ JSON.stringify(registerModel),
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
          this.returnmsg = "Registration Successful. Your username is " + this.returnmsg;

          // var model = {
          //   "LogType": "B2CRegistration",
          //   "Description": "Registration Successful.",
          //   "SearchKeyword": "",
          //   "CustID":Common.getWithExpiry("CustID"),
          //   "UserId": Common.getWithExpiry("UserID"),
          //   "ClientIP": this.ipAddress
          // }
      
          // this.dataService.AddActivityLog(model).subscribe((res1: any) => {
          
          // });

          this.returnmsg = "Registration Successful. Your username is " + this.returnmsg;
          this.isShowMsg = true;
          this.isShowForm = false;
        }
      })
    } catch (ex) {
      this.sendMessage('stop');
    }
  }
  isValidPhone(phone) {
    var re1 = /^[0-9]*$/;
    return re1.test(String(phone).toLowerCase());
    // var re = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    // var re2 = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    // if (re.test(String(phone).toLowerCase()) || re1.test(String(phone).toLowerCase()) || re2.test(String(phone).toLowerCase())) {
    //     return true;
    // }
    // else {
    //     return false;
    // }
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

  checkemail() {
    if (this.user.EmailAddress != undefined && this.user.EmailAddress != '' && this.user.EmailAddress.length > 0) {
      this.registerService.CheckEmail(this.user.EmailAddress).subscribe((res: any) => {
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
      if(this.stateList==undefined || this.stateList==null || this.stateList.length==0){
        this.user.selectedState='';
        this.isstateshow=false;
      }
      else{
        this.isstateshow=true;
        this.user.selectedState='0';
      }
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
