import { ContentObserver } from '@angular/cdk/observers';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from '../services/checkout.service';
import { Common } from '../../app/model/common.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { AddressvalidationpopupComponent } from '../addressvalidationpopup/addressvalidationpopup.component';
import { LoadingService } from '../services/loading.service';
import { CartService } from '../services/cart.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-shiptoaddresspopup',
  templateUrl: './shiptoaddresspopup.component.html',
  styleUrls: ['./shiptoaddresspopup.component.css']
})
export class ShipToAddressPopupComponent implements OnInit {
  typeurl: any;
  shipping: any = {};
  countryList: any = [];
  stateList: any = [];
  isstateshow: any = true;
  isShowMsg: any;
  isError: any;
  shipid: string;
  seqNo: number;
  isDuplicate: boolean = false;
  cityno: any;
  getvalidation: any;
  postalvalidation: any;
  Addressval: any;
  cityval: any;
  addr1val: any;
  addr2val: any;
  addr3val: any;
  addr4val: any;
  phoneval: any;
  cityno1: any;
  isaddressparse: string = '0';
  TextUpperCase: any;
  addressList: any[];
  selectedAddress: string;
  isPostalCodeValid: boolean = false;
  newArray: any[] = [];
  iskrayden: any;
  resShipId: string;
  billingAddress: any;
  isChecked;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { billingAddress: string[],modifyShipId:string }, private registerService: RegistrationService, private cartService: CartService, private loadingService: LoadingService, private router: Router, public dialog: MatDialog, private dataService: DataService, private renderer: Renderer2, private checkoutService: CheckoutService, private toastr: ToastrService, private route: ActivatedRoute, public dialogRef: MatDialogRef<ShipToAddressPopupComponent>) {
    this.GetConfigForTextUpperCaseSetting();
  }

  ngOnInit() {
    this.billingAddress = this.data.billingAddress;
    this.shipid = this.data.modifyShipId;
    this.shipping.ShipID = this.shipid == "0" ? "" : this.shipid;
    this.shipid = this.shipping.ShipID;
    this.shipping.selectedState = "0";
    this.getCountry();
    this.getStates("US");
    this.getaddresscityno("US");
    this.isShowMsg = false;
    this.isError = false;
    console.log('this.shipId oninit====>',this.shipid);
    if (this.shipid != undefined && this.shipid != null && this.shipid != '' && this.shipid != "0") {
      this.getShippingAddress();
    }
  }
  GetconfigurationfroAddressParser() {
    this.isaddressparse = Common.getWithExpiry("isaddressparse");
    if (this.isaddressparse == null || this.isaddressparse == undefined || this.isaddressparse == '') {
      this.dataService.GetconfigurationfroAddressParser().subscribe((res: any) => {
        this.isaddressparse = res;
        Common.setWithExpiry("isaddressparse", this.isaddressparse);
      });
    }
  }
  GetConfigForTextUpperCaseSetting() {
    this.TextUpperCase = Common.getWithExpiry("TextUpperCase");
    if (this.TextUpperCase == null || this.TextUpperCase == undefined || this.TextUpperCase == '') {
      this.dataService.GetConfigForTextUpperCaseSetting().subscribe((res: any) => {
        this.TextUpperCase = res;
        Common.setWithExpiry("TextUpperCase", this.TextUpperCase);
      });
    }
  }
  CopyBillingAddress() {
    if (this.isChecked) {
      if (this.billingAddress.PostalCode != undefined && this.billingAddress.PostalCode != null && this.billingAddress.PostalCode != '') {
        this.isPostalCodeValid = true;
      }
      this.shipping.Name = this.billingAddress.CompanyName;
      this.shipping.atn = this.billingAddress.AttenstionName;
      this.shipping.Addr1 = this.billingAddress.Address1;
      this.shipping.Addr2 = this.billingAddress.Address2;
      this.shipping.selectedCountry = this.billingAddress.Country;
      this.shipping.selectedState = this.billingAddress.State;
      this.shipping.City = this.billingAddress.City;
      this.shipping.PostalCode = this.billingAddress.PostalCode;
      this.togglePostalCodeFlag();
      this.shipping.Phone = this.billingAddress.Phone;
      this.shipping.PhoneExt = this.billingAddress.PhoneExt;
      this.shipping.Fax = this.billingAddress.Fax;
    }
    else{
      if(this.shipid){
        this.getShippingAddress();
      }else{
        this.shipping.Name = ''; 
        this.shipping.atn ='';
        this.shipping.Addr1 ='';
        this.shipping.Addr2 ='';
        this.shipping.selectedCountry = "US";
        this.shipping.selectedState = '0';
        this.shipping.City = '';
        this.shipping.PostalCode = '';
        this.shipping.Phone = '';
        this.shipping.PhoneExt = '';
        this.shipping.Fax = '';
      }
    }
   
  }
  isValidPhone(phone) {
    var re1 = /^[0-9]*$/;
    return re1.test(String(phone).toLowerCase());
  }
  getShippingAddress() {
    this.checkoutService.getShippingAddressById(this.shipid, Common.getWithExpiry("CustID")).subscribe((res: any) => {
      var result = res;
      var addObj = JSON.parse(result.adr);
      this.shipping.selectedCountry = result.country_code;
      this.shipping.Name = result.name;
      this.shipping.atn = result.atn;
      this.shipping.Addr1 = addObj[0];
      this.shipping.Addr2 = addObj[1];
      //this.shipping.Addr3 = result.manifest_adr3;
      this.shipping.City = (addObj[2] + addObj[3]);
      this.shipping.selectedState = result.state;
      this.shipping.PostalCode = result.postal_code;
      this.shipping.PhoneExt = result.phone_ext;
      this.shipping.Phone = result.phone;
      this.shipping.Fax = result.fax;
      this.seqNo = result.C__seq;
      if(this.shipping.PostalCode){
        this.isPostalCodeValid = true;
      }
    });
  }
  togglePostalCodeFlag() {
    this.openAddressvalidationpopup();
    // if (this.iskrayden) {
    //   alert('123');
    //   this.isPostalCodeValid = false;
    //   this.openAddressvalidationpopup();
    // }
    // else {
    //   alert('456');
    //   this.isPostalCodeValid = true;
    // }
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  openAddressvalidationpopup(): void {
    this.sendMessage('start');
    // var model = {
    //   "addressLine1": "30 LOCUST AVE",
    //   "addressLine2": "",
    //   "countryCode": "US",
    //   "state": "CA",
    //   "postalCode": "94080",
    // }
    var model = {
      "addressLine1": this.shipping.Addr1,
      "addressLine2": this.shipping.Addr2,
      "countryCode": this.shipping.selectedCountry,
      "state": this.shipping.selectedState,
      "postalCode": this.shipping.PostalCode,
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
            this.shipping.Addr1 = result.addressLine1;
            this.shipping.Addr2 = result.addressLine2;
            this.shipping.PostalCode = result.postalCode;
            this.shipping.City = result.city;
          }
        });
      }
      else if (this.addressList.length == 1) {
        this.shipping.Addr1 = Array.isArray(this.addressList[0].AddressKeyFormat.AddressLine) ? this.addressList[0].AddressKeyFormat.AddressLine[0] : this.addressList[0].AddressKeyFormat.AddressLine,
          this.shipping.Addr2 = Array.isArray(this.addressList[0].AddressKeyFormat.AddressLine) && this.addressList[0].AddressKeyFormat.AddressLine.length > 1 ? this.addressList[0].AddressKeyFormat.AddressLine[1] : "",
          this.shipping.city = this.addressList[0].AddressKeyFormat.PoliticalDivision2;
        this.shipping.PostalCode = `${this.addressList[0].AddressKeyFormat.PostcodePrimaryLow}-${this.addressList[0].AddressKeyFormat.PostcodeExtendedLow}`;
        this.isPostalCodeValid = true;
      } else {
        this.isPostalCodeValid = false;
        this.toastr.error("invalid address or pincode are you sure want to submit this address", 'Message!');
        return;
      }
    })
  }
  onSubmit() {
    //if (!this.isPostalCodeValid) {
      //this.toastr.error("invalid address or pincode are you sure want to submit this address", 'Message!');
      //return;
    //} else {
      // if (this.shipping.ShipID == undefined || this.shipping.ShipID == null || this.shipping.ShipID == '') {
      //   this.toastr.error("Please Insert Ship ID", 'Message!');
      //   const element = this.renderer.selectRootElement("#shippingShipID");
      //   element.focus();
      //   return;
      // }
      if (this.shipping.Name == undefined || this.shipping.Name == null || this.shipping.Name == '') {
        this.toastr.error("Please Insert Company Name", 'Message!');
        const element = this.renderer.selectRootElement("#shippingName");
        element.focus();
        return;
      }
      // if (this.shipping.atn == undefined || this.shipping.atn == null || this.shipping.atn == '') {
      //   this.toastr.error("Please Insert Attention Name", 'Message!');
      //   const element = this.renderer.selectRootElement("#shippingatn");
      //   element.focus();
      //   return;
      // }
      if (this.shipping.Addr1 == undefined || this.shipping.Addr1 == null || this.shipping.Addr1 == '') {
        this.toastr.error("Please Insert Address 1", 'Message!');
        const element = this.renderer.selectRootElement("#Address1");
        element.focus();
        return;
      }
      if (this.shipping.City == undefined || this.shipping.City == null || this.shipping.City == '') {
        this.toastr.error("Please Insert city", 'Message!');
        const element = this.renderer.selectRootElement("#City");
        element.focus();
        return;
      }
      if (this.shipping.selectedState == undefined || this.shipping.selectedState == null || this.shipping.selectedState == '' || this.shipping.selectedState == '0') {
        this.toastr.error("Please Select State", 'Message!');
        document.getElementById("State").scrollIntoView();
        return;
      }
      if (this.shipping.PostalCode == undefined || this.shipping.PostalCode == null || this.shipping.PostalCode == '') {
        this.toastr.error("Please Insert Postal Code", 'Message!');
        const element = this.renderer.selectRootElement("#PostalCode");
        element.focus();
        return;
      }
      if(!this.isPostalCodeValid && this.shipping.PostalCode.length==5){
        this.shipping.PostalCode=this.shipping.PostalCode+"0000";
      }
      // if (this.shipping.Phone == undefined || this.shipping.Phone == null || this.shipping.Phone == '') {
      //   this.toastr.error("Please Insert Phone", 'Message!');
      //   const element = this.renderer.selectRootElement("#shippingPhone");
      //   element.focus();
      //   return;
      // }
      if (this.shipping.Phone != undefined && this.shipping.Phone != null && this.shipping.Phone != '' && !this.isValidPhone(this.shipping.Phone)) {
        this.toastr.error("Please insert valid phone number, no special characters or spaces allowed", 'Message!');
        const element = this.renderer.selectRootElement("#shippingPhone");
        element.focus();
        return;
      }
      if (this.shipping.ShipID != undefined && this.shipping.ShipID != null && this.shipping.ShipID.length > 10) {
        this.toastr.error("Ship id Max length is 10 characters only please reset ship id", 'Message!');
        const element = this.renderer.selectRootElement("#shippingShipID");
        element.focus();
        return;
      }

      var model = {
        "country_code": this.shipping.selectedCountry,
        "name": this.shipping.Name,
        "manifest_adr1": this.shipping.Addr1,
        "manifest_adr2": (this.shipping.Addr2==undefined ? '' : this.shipping.Addr2),
        "manifest_adr3": (this.cityno != 4 ? this.shipping.City : (this.cityno != '4' ? this.shipping.City : (this.cityno != '4.00' ? this.shipping.City : ''))),
        "manifest_adr4": (this.cityno == 4 ? this.shipping.City : (this.cityno == '4' ? this.shipping.City : (this.cityno == '4.00' ? this.shipping.City : ''))),
        "state": this.shipping.selectedState,
        "atn": this.shipping.atn,
        "postal_code": this.shipping.PostalCode,
        "phone_ext": this.shipping.PhoneExt,
        "phone": this.shipping.Phone,
        "fax": this.shipping.Fax,
        "customer": Common.getWithExpiry("CustID"),
        "adr": "[\"" + this.shipping.Addr1 + "\",\"" + this.shipping.Addr2 + "\",\"" + (this.cityno != 4 ? this.shipping.City : '') + "\",\"" + (this.cityno == 4 ? this.shipping.City : '') + "\",\"" + "\"]",
        "C__seq": this.seqNo,
        "ship_id": this.shipping.ShipID,
        "company_cu": Common.getWithExpiry("company_cu"),

      }

      if (this.TextUpperCase == '1') {
        try {
          model = this.ConvertKeysToUpperCase(model);
        } catch (ed) { }
      }

      if (this.shipid == "0" || this.shipid == undefined || this.shipid == null || this.shipid == '') {
        this.checkoutService.addShippingAddress(model).subscribe((res: any) => {
          if (res == "Duplicate")
            this.isDuplicate = true;
          else  {
              this.resShipId = res;
              this.closeDialog();
          }
        });
      }
      else {
        console.log("model2===>", model);
        this.checkoutService.updateShippingAddress(model).subscribe((res: any) => {
          this.resShipId = this.shipping.ShipID,
            this.closeDialog();
        });
      }
    //}
  }
  closeDialog() {
    this.dialogRef.close(this.resShipId);
  }
  getCountry() {
    this.registerService.getCountry().subscribe((res: any) => {
      this.countryList = res;
      this.shipping.selectedCountry = "US";
      this.getvalforform();
    })
  }
  getvalforform() {
    for (var i = 0; i < this.countryList.length; i++) {
      if (this.countryList[i].country_code == this.shipping.selectedCountry) {
        this.getvalidation = this.countryList[i];
        this.postalvalidation = this.getvalidation.fmt_postal.length;
        var addrval = JSON.parse(this.getvalidation.fmt_address);
        this.addr1val = addrval[0].replace('X(', '').replace(')', '');
        this.addr2val = addrval[1].replace('X(', '').replace(')', '');
        this.addr3val = addrval[2].replace('X(', '').replace(')', '');
        this.addr4val = addrval[3].replace('X(', '').replace(')', '');
        this.phoneval = this.getvalidation.fmt_phone.length;
        this.cityno1 = this.getvalidation.adr_no_city;
        if (this.cityno1 == 3 || this.cityno1 == '3' || this.cityno1 == '3.00') {
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
  getaddresscityno(country) {
    this.cartService.GetCountryaddressCityCode(country).subscribe((res: any) => {
      this.cityno = res;
    });
  }
  shipCountryChange() {
    this.getaddresscityno(this.shipping.selectedCountry);
    this.getvalforform();
    this.getStates(this.shipping.selectedCountry);
  }
  getStates(val) {
    this.registerService.getState(val).subscribe((res: any) => {
      this.stateList = res;
      if (this.stateList == undefined || this.stateList == null || this.stateList.length == 0) {
        this.shipping.selectedState = '';
        this.isstateshow = false;
      }
      else {
        this.isstateshow = true;
        this.shipping.selectedState = '0';
      }
    })
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
}
