import { Component, OnInit, Renderer2 } from '@angular/core';
import { Common } from '../../app/model/common.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
//import { Md5 } from 'ts-md5/dist/md5';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';
import { SEOService } from '../services/seo.service';
import { LoadingService } from '../services/loading.service';
// import * as $ from 'jquery';
import * as parser from 'parse-address'
//import * as passwordPolicy from 'password-policy'
// import { IpServiceService } from '../ip-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddressvalidationpopupComponent } from '../addressvalidationpopup/addressvalidationpopup.component';
import { GoogleTagManagerService } from 'angular-google-tag-manager';


@Component({
  selector: 'app-k2c-registration',
  templateUrl: './k2c-registration.component.html',
  styleUrls: ['./k2c-registration.component.scss']
})
export class k2cRegistrationComponent implements OnInit {
  hide = true;
  hide1 = true;
  user: any = {};
  countryList: any = [];
  stateList: any = [];
  isstateshow: any = true;
  cityList: any = [];
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
  iscustomeridValidation: boolean = false;
  // iscompanyphoneValidation: boolean = false;
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
  company: any = 0;
  addb2bfields: any = "0";
  RegistrationLable: any;
  ipAddress: string;
  addresspop: any;
  addressList: any[];
  selectedAddress: string;
  isPostalCodeValid: boolean = false;
  loginfraudmsg:any;
  isShowMsg1:boolean=false;
  newArray: any[] = [];Noteforcustomer:any="Please contact customer service at 800-448-0406 (option 4) if you need to submit a resale tax certificate.";
  constructor(public dialog: MatDialog, private router: Router,private gtmService: GoogleTagManagerService, private renderer: Renderer2, private loadingService: LoadingService, private seoService: SEOService, private dataService: DataService, private toastr: ToastrService, private registerService: RegistrationService) {
    
  }

  togglePostalCodeFlag() {
    this.isPostalCodeValid = false;
    this.openAddressvalidationpopup();
  }
  openAddressvalidationpopup(): void {
    this.sendMessage('start');
    var model = {
          "addressLine1": this.user.Address1,
          "addressLine2": this.user.Address2,
          "countryCode": this.user.selectedCountry,
          "state": this.user.selectedState,
          "postalCode": this.user.PostalCode,
          "city": this.user.City,
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
           this.isPostalCodeValid = true;
           this.user.Address1 = result.addressLine1;
           this.user.Address2 = result.addressLine2;
           this.user.PostalCode = result.postalCode;
           this.user.City = result.city;
          }
        });
      }
      else if (this.addressList.length == 1) {
        this.user.Address1 = Array.isArray(this.addressList[0].AddressKeyFormat.AddressLine) ? this.addressList[0].AddressKeyFormat.AddressLine[0] : this.addressList[0].AddressKeyFormat.AddressLine,
        this.user.Address2 = Array.isArray(this.addressList[0].AddressKeyFormat.AddressLine) && this.addressList[0].AddressKeyFormat.AddressLine.length > 1 ? this.addressList[0].AddressKeyFormat.AddressLine[1] : "",
        this.user.city = this.addressList[0].AddressKeyFormat.PoliticalDivision2;
        this.user.PostalCode = `${this.addressList[0].AddressKeyFormat.PostcodePrimaryLow}-${this.addressList[0].AddressKeyFormat.PostcodeExtendedLow}`;
        this.isPostalCodeValid = true;
      } else {
        this.isPostalCodeValid = false;
        this.isPostalCodeValidation = true;
        this.toastr.error("invalid address or pincode are you sure want to submit this address", 'Message!');
        return;
      }
    })
  }

  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
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
    else{

    //this.getIP();
    this.company = (Common.getWithExpiry("company_sy") == null ? 0 : Common.getWithExpiry("company_sy"));
    this.gototop();
    this.getloginfraudmsg();
    this.Getcaptchavalue();
    this.GetConfigurationforPasswordPolicy();
    this.GetConfigtoRegistrationLable();
    this.GetconfigurationfroAddressParser();
    this.Accessannomyous();
    this.GetConfigForTextUpperCaseSetting();
    this.user.selectedState = '0';
    this.user.iscustomer = false;
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Registration - ' + geturl);
    this.seoService.setkeywords('Registration - ' + geturl);
    this.seoService.setdescription('Registration - ' + geturl);
    this.showProvince = true;
    this.confirmPass = false;
    this.isShowForm = true;
    this.isShowMsg = false;
    this.isShowMsg1 = false;

    this.user.selectedCity = "0";
    this.user.selectedState = "0";
    this.getCountry();
    this.getStates("US");
    }
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

  getloginfraudmsg() {
    this.loginfraudmsg = this.dataService.Getconfigbykey("loginfraudmsg");
    if (this.loginfraudmsg == null || this.loginfraudmsg == undefined || this.loginfraudmsg == '') {
      this.loginfraudmsg = Common.getWithExpiry("loginfraudmsg");
    }
    if (this.loginfraudmsg == null || this.loginfraudmsg == undefined || this.loginfraudmsg == '') {
      this.dataService.Getloginfraudmsg().subscribe((data: any) => {
        this.loginfraudmsg = data;
        Common.setWithExpiry("loginfraudmsg", this.loginfraudmsg);
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
    //if (!this.isPostalCodeValid) {
      //this.isPostalCodeValidation = true;
      //const element = this.renderer.selectRootElement("#PostalCode");
      //this.toastr.error("Enter Valid Postalcode", 'Message!');
      //element.focus();
      //return;
    //} else {
      // alert('good to go');
      // return;
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
      this.iscustomeridValidation = false;
      // this.iscompanyphoneValidation = false;
      if (this.user.iscustomer) {
        if (this.user.customerid == "" || this.user.customerid == undefined) {
          this.iscustomeridValidation = true;
          isValidation = true;
          this.toastr.error("Enter Customer ID", 'Message!');
          const element = this.renderer.selectRootElement("#customerid");

          element.focus();
          return;
        }

      }


      if (this.user.FirstName == "" || this.user.FirstName == undefined) {
        this.isFirstValidation = true;
        isValidation = true;
        const element = this.renderer.selectRootElement("#userFirstName");
        this.toastr.error("Enter First Name", 'Message!');
        element.focus();
        return;
      }
      if (this.user.LastName == "" || this.user.LastName == undefined) {
        this.isLastValidation = true;
        isValidation = true;
        const element = this.renderer.selectRootElement("#userLastName");
        this.toastr.error("Enter Last Name", 'Message!');
        element.focus();
        return;
      }
      if (this.user.Password == "" || this.user.Password == undefined) {
        this.isPasswordCodeValidation = true;
        isValidation = true;
        const element = this.renderer.selectRootElement("#userPassword");
        this.toastr.error("Enter Password", 'Message!');
        element.focus();
        return;
      }

      if (this.user.Password != this.user.ConfirmPassword) {
        this.confirmPass = true;
        isValidation = true;
        const element = this.renderer.selectRootElement("#userConfirmPassword");
        this.toastr.error("Enter confirm password", 'Message!');
        element.focus();
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
      if (this.user.EmailAddress == "" || this.user.EmailAddress == undefined) {
        this.isEmailrCodeValidation = true;
        isValidation = true;
        const element = this.renderer.selectRootElement("#userEmailAddress");
        this.toastr.error("Enter Email", 'Message!');
        element.focus();
        return;
      }
      if (this.isValidEmail(this.user.EmailAddress) == false) {
        this.isEmailValidation = true;
        isValidation = true;
        const element = this.renderer.selectRootElement("#userEmailAddress");
        this.toastr.error("Enter valid Email", 'Message!');
        element.focus();
        return;
      }
      if (this.user.Phone == "" || this.user.Phone == undefined) {
        this.isPhoneValidation = true;
        isValidation = true;
        const element = this.renderer.selectRootElement("#userPhone");
        this.toastr.error("Enter Phone", 'Message!');
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
      if (this.user.Company == "" || this.user.Company == undefined) {
        this.isCompanyValidation = true;
        isValidation = true;
        const element = this.renderer.selectRootElement("#userCompany");
        this.toastr.error("Enter Company", 'Message!');
        element.focus();
        return;
      }
      if (this.user.PostalCode == "" || this.user.PostalCode == undefined) {
        this.isPostalCodeValidation = true;
        isValidation = true;
        const element = this.renderer.selectRootElement("#PostalCode");
        this.toastr.error("Enter Postalcode", 'Message!');
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
      if (this.user.City == "" || this.user.City == undefined) {
        this.isCityValidation = true;
        isValidation = true;
        const element = this.renderer.selectRootElement("#City");
        this.toastr.error("Enter City", 'Message!');
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
      if (this.user.selectedState == "" || this.user.selectedState == undefined || this.user.selectedState == 0) {
        this.isStateValidation = true;
        isValidation = true;
        document.getElementById("State").scrollIntoView();
        this.toastr.error("select State", 'Message!');
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
        this.toastr.error("Enter Address1", 'Message!');
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
      if(!this.isPostalCodeValid && this.user.PostalCode.length==5){
        this.user.PostalCode=this.user.PostalCode+"0000";
      }
      // if (this.user.companyphone == "" || this.user.companyphone == undefined) {
      //   this.iscompanyphoneValidation = true;
      //   isValidation = true;
      //   const element = this.renderer.selectRootElement("#companyphone");
      //   this.toastr.error("Enter Company Phone", 'Message!');
      //   element.focus();
      //   return;
      // }






      if (this.captcha1 == null && this.iscaptcha == '1') {
        this.Errormsg = 'Please Click on Captcha CheckBox';
        this.isError = true;
        isValidation = true;
        return;
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
      if (this.user.customerid != undefined && this.user.customerid != '') {
        //address=   "[\"" + this.user.Address1 + "\",\"" + (this.user.Address2==undefined?"":(this.user.Address2==null?"":this.user.Address2)) + "\",\"" + (this.cityno != 4 ? this.user.City : '') + "\",\"" + (this.cityno == 4 ? this.user.City : '') + "\",\"" + "\",\"" + "\"]";
        ////this.user.Password = this.registerService.encrypted('8080808080808080', this.user.Password);
      }
      var registerModel = {
        "adr": address,
        "FirstName": this.user.FirstName,
        "LastName": this.user.LastName,
        "iscustomer": this.user.iscustomer,
        "customerid": this.user.customerid,
        "Password": this.user.Password,
        "EmailAddress": this.user.EmailAddress,
        "Phone": this.user.Phone,
        "Company": this.user.Company,
        "country": this.user.selectedCountry,
        "PostalCode": this.user.PostalCode,
        "City": this.user.City,
        "state": this.user.selectedState,
        "Address1": this.user.Address1,
        "Address2": this.user.Address2,
        // "companyphone":this.user.companyphone,      
        "company_cu": Common.getWithExpiry("company_cu"),
      }
      if (this.TextUpperCase == '1') {
        try {
          registerModel = this.ConvertKeysToUpperCase(registerModel);
        } catch (ex) { }
      }
      //registerModel.web_passwd = this.user.Password;
      this.sendMessage('start');
      try {
        this.registerService.kraydenRegister(registerModel).subscribe((res: any) => {
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
            this.returnmsg = "Registration Successful. Please login with your email";

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
            this.googletagforcheckout();
            this.returnmsg = "Registration Successful. Please login with your email";
            this.isShowMsg = true;
            this.isShowMsg1 = true;
            this.isShowForm = true;
            this.router.navigate(['/login',this.user.EmailAddress,0,this.user.Password]);
          }
        })
      } catch (ex) {
        this.sendMessage('stop');
      }
    //}
  }
  checkcustomer() {
    if (this.user.customerid != undefined && this.user.customerid != null && this.user.customerid != '') {
      this.dataService.GetloginCustomerInfo(this.user.customerid).subscribe((res: any) => {
        if (res != undefined && res.length > 0) {
          if (res[0].Active) {
            this.user.Company = res[0].name;
            this.user.selectedCountry = res[0].country_code;
            this.user.PostalCode = res[0].postal_code;
            this.user.City = res[0].manifest_adr3;
            this.user.selectedState = res[0].state;
            this.user.Address1 = res[0].manifest_adr1;
            this.user.Address2 = res[0].manifest_adr2;
            this.user.companyphone = res[0].phone;
          }
          else {
            this.user.customerid = '';
            this.toastr.error('Customer Account Inactive!  Please contact the Customer Account Specialists at 1-800-448-0406 option 4.')
          }
        }
        else {
          this.user.customerid = '';
          this.toastr.error('Customer does not exist please insert valid customer id')
          //console.log('Customer does not Exists');
        }
      });
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
      this.registerService.CheckEmailkrayden(this.user.EmailAddress, this.user.customerid).subscribe((res: any) => {
        var getmsg = res;
        if (getmsg != true) {
          //console.log('getmsg',getmsg);
          if(getmsg[0].key1!=undefined && getmsg[0].key1!=null && getmsg[0].key1!=''){
            //var profile= JSON.parse(getmsg[0].profile_log);
            //console.log('profile[0]',profile[0]);
            if(getmsg[0].profile_log[0]=="true" || getmsg[0].profile_log[0]==true){
              this.returnmsg = "This contact user Already Registered with customer ID " + getmsg[0].key1;
              this.toastr.error("This contact user Already Registered with customer ID " + getmsg[0].key1)
              this.isShowMsg = true;
              this.isShowMsg1 = true;
              this.isShowForm = true;
              this.isvalidateemail = false;
            }
            else{
              this.returnmsg = "Contact User Account Inactive! Please contact the Customer Account Specialists at 1-800-448-0406 option 4.";
              this.toastr.error('Contact User Account Inactive! Please contact the Customer Account Specialists at 1-800-448-0406 option 4.')
              this.isShowMsg = true;
              this.isShowForm = true;
              this.isvalidateemail = false;
            }
          }
          else{
            if(getmsg[0].active=='true' || getmsg[0].active==true){
              this.returnmsg = "Your email is associated with Customer "+getmsg[0].customer+".Please select 'Are you an existing Krayden Customer?' on the registration form.Enter Customer "+getmsg[0].customer+"  and complete the registration form to enable your login.";
              this.toastr.error("Your email is associated with Customer "+getmsg[0].customer+".Please select 'Are you an existing Krayden Customer?' on the registration form.Enter Customer "+getmsg[0].customer+"  and complete the registration form to enable your login.")
              this.isShowMsg = true;
              this.isShowForm = true;
              this.isvalidateemail = false;
            }
            else{
              this.returnmsg = "Customer Account Inactive!  Please contact the Customer Account Specialists at 1-800-448-0406 option 4";
              this.toastr.error('Customer Account Inactive!  Please contact the Customer Account Specialists at 1-800-448-0406 option 4')
              this.isShowMsg = true;
              this.isShowForm = true;
              this.isvalidateemail = false;
            }
          }

          //this.toastr.error("This user Already Registered with customer ID "+getmsg);
          
        }
        else {
          this.isvalidateemail = true;
          this.registerService.checkemailinseon(this.user.EmailAddress).subscribe((res: any) => {
            var getmsg = res;
            if (getmsg.data.fraud_score > 80) {
              this.returnmsg = this.loginfraudmsg;
              this.isShowMsg = true;
              this.isShowForm = true;
              this.isvalidateemail = false;
            }
            else {
              this.isvalidateemail = true;
              this.isShowMsg = false;
              this.isShowMsg1 = false;
            }
          })
        }
      });
    }
    else{
      this.isShowMsg = false;
              this.isShowMsg1 = false;
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
      if (this.stateList == undefined || this.stateList == null || this.stateList.length == 0) {
        this.user.selectedState = '';
        this.isstateshow = false;
      }
      else {
        this.isstateshow = true;
        this.user.selectedState = '0';
      }
    })
  }


  googletagforcheckout(){
    try{

      const gtmTag = {
        event: 'signup',
        user_id: this.user.EmailAddress
                };
              console.log('gtmTag',gtmTag);
                this.gtmService.pushTag(gtmTag);
      
    }catch(e){
      console.log('googletagforcheckout',e.toString());
    }
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
