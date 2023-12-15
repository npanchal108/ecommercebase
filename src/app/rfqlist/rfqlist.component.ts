import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';

import { Common } from '../../app/model/common.model';
import { DataService } from '../services/data.service';

import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { RoutingState } from '../services/routingState';
import { RegistrationService } from '../services/registration.service';
import { LoadingService } from '../services/loading.service';
// import * as $ from 'jquery';
import { SEOService } from '../services/seo.service';
import * as parser from 'parse-address'
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddressvalidationpopupComponent } from '../addressvalidationpopup/addressvalidationpopup.component';
import { ShipToAddressPopupComponent } from '../../../src/app/checkout/shiptoaddresspopup.component';
@Component({
  selector: 'app-rfqlist',
  templateUrl: './rfqlist.component.html',
  styleUrls: ['./rfqlist.component.scss']
})
export class RfqlistComponent implements OnInit {
  configforcartbyprofile: any;
  AddToCartAsPerProfileNo: any;
  AddToCartAsPerProfileArrayNo: any;
  isShowShipTo: string;
  shipProvince: any;
  billAdr: any;
  billAdd1: any;
  ship_to: any='0';
  orderno: any;
  cartTotal: any;
  isFormSubmitted: any;
  isShowFreefrom: boolean = false;
  AddNewItem: any;
  ismultipleum: any;
  isSubmitted: boolean = false;
  isShowContact: boolean = false;
  wishlist: any;
  shipId: string;
  shipName: string;
  shipAddr1: string;
  notes: any;
  Email: any;
  Contact: any;
  FastAddCart: any;
  dataSource:any;
  webtype: any;
  shipAddr2: string;
  shipCity: string;
  shipState: string;
  shipZIP: string;
  shipCountry: string;
  currentwishlist: any;
  currentproductlist: any;
  cartProducts: any;
  showShipAdd: boolean = false;
  isAddShip: boolean = false;
  shipText: any;
  showdiv: string;
  itemList: any;
  newitem: any;
  warehouse: any;
  Multiply: any;
  MinQty: any;
  MaxQty: any;
  IsMuscle: any;
  shipAdr: any;
  isContactRequired: boolean = false;
  isShowEmail: boolean = false;
  isEmailRequired: boolean = false;
  isShowNote: boolean = false;
  isNoteRequired: boolean = false;
  isShowItemNote: boolean = false;
  isprofiledesc: any;
  baseitemShow: any;
  UrlWithFreeForm: any;
  UrlWithDetails: any;
  show3D: any;
  countryList: any;
  stateList: any;
  isstateshow:any=true;
  shipping: any;
  getvalidation: any;
  isumdescr:any;
  postalvalidation: any;
  addr1val: any;
  addr2val: any;
  addr3val: any;
  addr4val: any;
  phoneval: any;
  cityno: any;
  Addressval: any;
  cityval: any;
  rfqid: any;
  Displaypriceinrfq: any;
  OrderNoteLable: any;
  TextUpperCase: any;
  umdescrlist:any;

  isaddressparse: string = '0';
  submitshow: any = true;
  DescrToShow: any;
  priceshowcust: any = '1';
  msgonrfq: any;
  logintype:any;
  itlable: any;
  addressList: any[];
  selectedAddress: string;
  isPostalCodeValid: boolean = false;
  newArray: any[] = [];
  iskrayden:any;
  private _routerSub = Subscription.EMPTY;
  constructor(public dialog: MatDialog,private http: HttpClient,private formBuilder: UntypedFormBuilder, el: ElementRef,private loadingService: LoadingService, private renderer: Renderer2, private seoService: SEOService, private registerService: RegistrationService, private routingState: RoutingState, private checkoutService: CheckoutService, private cartService: CartService, private toastr: ToastrService, private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    this._routerSub = this.router.events.pipe(
      
      filter(event => event instanceof NavigationStart))
      .subscribe((value) => {
        
        if (this.router.url == "/rfqlist") {
        
          this.SaveOrder()
        }
      });
      this.iskrayden=environment.iskyraden;

    this.logintype = this.dataService.Getconfigbykey('logintype');
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('RFQ List - ' + geturl);
    this.seoService.setkeywords('RFQ List - ' + geturl);
    this.seoService.setdescription('RFQ List - ' + geturl);
    this.warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
    this.newitem = this.route.snapshot.paramMap.get('item');
    this.rfqid = this.route.snapshot.paramMap.get('rfqid');
    this.getumdescrconfig();
    this.getitlableconfig();
    this.getDescrToShow();
    this.GetConfigformsgonrfq();
    this.showpricetocustomers();
    this.GetConfigForTextUpperCaseSetting();
    this.GetConfigForDisplaypriceinrfq();
    this.getIsMuscle();
    this.getMultiplyQtySetting();
    this.getOrderNoteLable();
    this.getMinQtySetting();
    this.getMaxQtySetting();
    this.GetconfigurationfroAddressParser();
    this.getItemNoteSetting();
    this.getisprofiledesc();
    this.getbaseitemShow();
    this.getUrlWithDetails();
    this.getUrlWithFreeForm();
    this.get3dsetting();
    this.GetConfigForAddToCartAsPerProfile();
    this.GetGetAddToCartAsPerProfileNo();
    this.GetAddToCartAsPerProfileArrayNo();
    if (this.rfqid != undefined && this.rfqid != null && this.rfqid != '') {
      this.dataService.GetUserwishlist(Common.getWithExpiry("CustID"), 2).subscribe((res: any) => {
        this.wishlist = res;
        this.navigatetowishdetails(this.rfqid);
      })
    }
    else if (this.newitem != null && this.newitem != '' && this.newitem != undefined) {
      var getyea = new Date();
      var name1 = getyea.toUTCString();
      this.dataService.Addwishlistheader(null, name1, Common.getWithExpiry("CustID"), null, 2).subscribe((res: any) => {
        var results = res;
        if (results > 0) {
          this.getwishlist();
          this.dataService.AddProducttowishlist(null, results, this.newitem, 1).subscribe((res: any) => {
            var results1 = res;
            if (results1) {
              this.newitem = '';
              //this.createnewlist(results);
              this.navigatetowishdetails(results);
            }
            else {
              this.toastr.error("Error Occured Please Try Again", 'Message!');
            }
          });
        }
      });
    }
    else {
      this.showdiv = '1';
    }
  }

  searchallnew(token) {
    this.dataSource = this.filterResults(token);
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  togglePostalCodeFlag() {
    if(this.iskrayden){
    this.isPostalCodeValid = false;
    this.openAddressvalidationpopup();
    }
    else{
      this.isPostalCodeValid = true;
    }
  }
  async openShippingAddressPopup(addModifyFlag): Promise<void> {
    await this.getBillingAddress();
    //console.log('===>this.billAdr',this.billAdr);
    let billingAddress = {
        CompanyName : this.billAdr.name,
        AttenstionName : this.billAdr.atn,
        Address1 : this.billAdr.adr[0],
        Address2 : this.billAdr.adr[1],
        Country : this.billAdr.country_code.trim(),
        State : this.billAdr.state.trim(),
        City : this.billAdr.adr[3],
        PostalCode : this.billAdr.postal_code,
        Phone : this.billAdr.phone,
        PhoneExt : this.billAdr.phone_ext,
        Fax : this.billAdr.fax
    }
   
    let modifyShipId = addModifyFlag == "modify" ? this.shipId : '0';
    console.log('modifyShipId====>>',modifyShipId);
    const dialogRef = this.dialog.open(ShipToAddressPopupComponent, {
        data: { billingAddress: billingAddress,modifyShipId :  modifyShipId},
        width: '800px',
        // height:'0px'
    });

    dialogRef.afterClosed().subscribe(async(result) => {
        if (result) {
          console.log('result===>',result)
          await this.getShipingAddress(result);
          this.shipAddressChange(result);
        }
      });
  }
  
  openAddressvalidationpopup(): void {
    this.sendMessage('start');
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
          console.log('result',result)
           this.isPostalCodeValid = true;
           this.shipping.Addr1 = result.addressLine1;
           this.shipping.Addr2 = result.addressLine2;
           this.shipping.PostalCode = result.postalCode;
           this.shipping.City = result.city;
          }
        });
      }
      else if (this.addressList.length == 1) {
        console.log('this.addressList',this.addressList);
        this.shipping.Addr1 = Array.isArray(this.addressList[0].AddressKeyFormat.AddressLine) ? this.addressList[0].AddressKeyFormat.AddressLine[0] : this.addressList[0].AddressKeyFormat.AddressLine,
        this.shipping.Addr2 = Array.isArray(this.addressList[0].AddressKeyFormat.AddressLine) && this.addressList[0].AddressKeyFormat.AddressLine.length > 1 ? this.addressList[0].AddressKeyFormat.AddressLine[1] : "",
        this.shipping.City = this.addressList[0].AddressKeyFormat.PoliticalDivision2;
        this.shipping.PostalCode = `${this.addressList[0].AddressKeyFormat.PostcodePrimaryLow}-${this.addressList[0].AddressKeyFormat.PostcodeExtendedLow}`;
        this.isPostalCodeValid = true;
      } else {
        this.isPostalCodeValid = false;
        this.toastr.error("Enter Valid Postalcode", 'Message!');
        return;
      }
    })
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
  onplus(pro) {
    if (pro.quantity > 0) {
      pro.quantity = pro.quantity + 1;
    }
    else {
      pro.quantity = 1;
    }
  }

  onminus(pro) {
    if (pro.quantity > 0) {
      pro.quantity = pro.quantity - 1;
    }
    else {
      pro.quantity = 0;
    }
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
      .map((results: any[]) => results.filter(res => res.freeform.toLowerCase().indexOf(token.toLowerCase()) > -1));
  }
  typeaheadOnSelect(event) {
    if (event.item != undefined && event.item != null) {
      this.newitem = event.item.itemname;
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
  ngOnDestroy() {
    this._routerSub.unsubscribe();
  }
  addreparser() {
    if (this.shipping.addressparser == undefined || this.shipping.addressparser == null || this.shipping.addressparser == '') {
      this.toastr.error("Please enter address first");
    }
    else {

      var parsed = parser.parseLocation(this.shipping.addressparser);
      this.shipping.Addr1 = (parsed.number == undefined ? "" : parsed.number) + ' ' + (parsed.prefix == undefined ? "" : parsed.prefix) + ' ' + (parsed.street == undefined ? "" : parsed.street) + ' ' + (parsed.type == undefined ? "" : parsed.type);
      this.shipping.selectedState = parsed.state.toUpperCase();
      this.shipping.City = parsed.city;
      this.shipping.PostalCode = parsed.zip;
      // $("#Address1").val((parsed.number == undefined ? "" : parsed.number) + ' ' + (parsed.prefix == undefined ? "" : parsed.prefix) + ' ' + (parsed.street == undefined ? "" : parsed.street) + ' ' + (parsed.type == undefined ? "" : parsed.type));
      // $("#City").val(parsed.city);
      // $("#State").val(parsed.state);
      // $("#PostalCode").val(parsed.zip);
    }
  }
  getCountry() {
    this.registerService.getCountry().subscribe((res: any) => {
      this.countryList = res;
      this.shipping.selectedCountry = "US";
      this.getvalforform();
    })
  }
  getDescrToShow() {
    this.DescrToShow = Common.getWithExpiry("DescrToShow");
    if (this.DescrToShow == null || this.DescrToShow == undefined) {
      this.dataService.GetDescrToShow().subscribe((data: any) => {
        this.DescrToShow = data;
        Common.setWithExpiry("DescrToShow", this.DescrToShow);
      });
    }
  }
  GetConfigformsgonrfq() {
    this.msgonrfq = Common.getWithExpiry("msgonrfq");
    if (this.msgonrfq == null || this.msgonrfq == undefined) {
      this.dataService.GetConfigformsgonrfq().subscribe((data: any) => {
        this.msgonrfq = data;
        Common.setWithExpiry("msgonrfq", this.msgonrfq);
      });
    }
  }
  Clicktoedit(product, i) {
    product.canEditCode = true;
    // window.setTimeout(() => {
      const element = this.renderer.selectRootElement("#Product" + i.toString());
      element.focus();
    // s
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
  getOrderNoteLable() {
    this.OrderNoteLable = Common.getWithExpiry("OrderNoteLable");
    if (this.OrderNoteLable == null || this.OrderNoteLable == undefined || this.OrderNoteLable == '') {
      this.dataService.GetConfigForOrderNoteLable().subscribe((res: any) => {
        this.OrderNoteLable = res;
        Common.setWithExpiry("OrderNoteLable", this.OrderNoteLable);
      });
    }
  }
  GetConfigForAddToCartAsPerProfile() {
    this.configforcartbyprofile = Common.getWithExpiry("configforcartbyprofile");
    if (this.configforcartbyprofile == null || this.configforcartbyprofile == undefined || this.configforcartbyprofile == '') {
      this.dataService.GetConfigForAddToCartAsPerProfile().subscribe((res: any) => {
        this.configforcartbyprofile = res;
        Common.setWithExpiry("configforcartbyprofile", this.configforcartbyprofile);
      });
    }
  }
  GetConfigForDisplaypriceinrfq() {
    this.Displaypriceinrfq = Common.getWithExpiry("Displaypriceinrfq");
    if (this.Displaypriceinrfq == null || this.Displaypriceinrfq == undefined || this.Displaypriceinrfq == '') {
      this.dataService.GetConfigForDisplaypriceinrfq().subscribe((res: any) => {
        this.Displaypriceinrfq = res;
        Common.setWithExpiry("Displaypriceinrfq", this.Displaypriceinrfq);
      });
    }
  }
  GetGetAddToCartAsPerProfileNo() {
    this.AddToCartAsPerProfileNo = Common.getWithExpiry("AddToCartAsPerProfileNo");
    if (this.AddToCartAsPerProfileNo == null || this.AddToCartAsPerProfileNo == undefined || this.AddToCartAsPerProfileNo == '') {
      this.dataService.GetAddToCartAsPerProfileNo().subscribe((res: any) => {
        this.AddToCartAsPerProfileNo = res;
        Common.setWithExpiry("AddToCartAsPerProfileNo", this.AddToCartAsPerProfileNo);
      });
    }
  }
  GetAddToCartAsPerProfileArrayNo() {
    this.AddToCartAsPerProfileArrayNo = Common.getWithExpiry("AddToCartAsPerProfileArrayNo");
    if (this.AddToCartAsPerProfileArrayNo == null || this.AddToCartAsPerProfileArrayNo == undefined || this.AddToCartAsPerProfileArrayNo == '') {
      this.dataService.GetAddToCartAsPerProfileArrayNo().subscribe((res: any) => {
        this.AddToCartAsPerProfileArrayNo = res;
        Common.setWithExpiry("AddToCartAsPerProfileArrayNo", this.AddToCartAsPerProfileArrayNo);
      });
    }
  }
  getShipToSetting() {
    this.isShowShipTo = Common.getWithExpiry("isShowShipTo");
    if (this.isShowShipTo == null || this.isShowShipTo == undefined || this.isShowShipTo == '') {
      this.dataService.GetShipToSetting().subscribe((data: any) => {
        this.isShowShipTo = data;
        Common.setWithExpiry("isShowShipTo", this.isShowShipTo);
      });
    }
  }

  getStates(val) {
    this.registerService.getState(val).subscribe((res: any) => {
      this.stateList = res;
      if(this.stateList==undefined || this.stateList==null || this.stateList.length==0){
        this.shipping.selectedState='';
        this.isstateshow=false;
      }
      else{
        this.isstateshow=true;
        this.shipping.selectedState='0';
      }
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
  get3dsetting() {
    this.show3D = Common.getWithExpiry("show3D");
    if (this.show3D == null || this.show3D == undefined || this.show3D == '') {
      this.dataService.Get3DSetting().subscribe((res: any) => {
        this.show3D = res;
        Common.setWithExpiry("show3D", this.show3D);
      });
    }
  }
  getisprofiledesc() {
    this.isprofiledesc = Common.getWithExpiry("isprofiledesc");
    if (this.isprofiledesc == null || this.isprofiledesc == undefined || this.isprofiledesc == '') {
      this.dataService.GetConfigforisprofiledesc().subscribe((res: any) => {
        this.isprofiledesc = res;
        Common.setWithExpiry("isprofiledesc", this.isprofiledesc);
      });
    }
  }
  getbaseitemShow() {
    this.baseitemShow = Common.getWithExpiry("baseitemShow");
    if (this.baseitemShow == null || this.baseitemShow == undefined) {
      this.dataService.Getthebaseitemconfiguration().subscribe((data: any) => {
        this.baseitemShow = data;
        Common.setWithExpiry("baseitemShow", this.baseitemShow);
      })
    }
  }
  getContactRequired() {
    var ContactRequired = Common.getWithExpiry("ContactRequired");
    if (ContactRequired == null || ContactRequired == undefined) {
      this.dataService.GetContactRequired().subscribe((data: any) => {
        var dd = data;
        Common.setWithExpiry("ContactRequired", dd);
        if (dd == "1") {
          this.isContactRequired = true;
        }
        else {
          this.isContactRequired = false;
        }
      });
    } else {
      if (ContactRequired == "1") {
        this.isContactRequired = true;
      }
      else {
        this.isContactRequired = false;
      }
    }
  }
  addNote(product) {
    product.canEditCode = false;
    product.Note = product.Note;
  }
  getItemNoteSetting() {
    var ItemNoteSetting = Common.getWithExpiry("ItemNoteSetting");
    if (ItemNoteSetting == null || ItemNoteSetting == undefined) {
      this.dataService.GetItemNoteSetting().subscribe((data: any) => {
        var dd = data;
        Common.setWithExpiry("ItemNoteSetting", dd);
        if (dd == "1") {
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
  getNoteRequired() {
    var NoteRequired = Common.getWithExpiry("NoteRequired");
    if (NoteRequired == null || NoteRequired == undefined) {
      this.dataService.GetNoteRequired().subscribe((data: any) => {
        var dd = data;
        Common.setWithExpiry("NoteRequired", dd);
        if (dd == "1") {
          this.isNoteRequired = true;
        }
        else {
          this.isNoteRequired = false;
        }
      })
    } else {
      if (NoteRequired == "1") {
        this.isNoteRequired = true;
      }
      else {
        this.isNoteRequired = false;
      }
    }
  }
  getNoteSetting() {
    var NotesSetting = Common.getWithExpiry("NotesSetting");
    if (NotesSetting == null || NotesSetting == undefined) {
      this.dataService.GetNotesSetting().subscribe((data: any) => {
        var dd = data;
        Common.setWithExpiry("NotesSetting", dd);
        if (dd == "1") {
          this.isShowNote = true;
        }
        else {
          this.isShowNote = false;
        }
      });
    } else {
      if (NotesSetting == "1") {
        this.isShowNote = true;
      }
      else {
        this.isShowNote = false;
      }
    }
  }
  SaveOrder() {
    var rfqmodel = {
      "ship_to": this.ship_to,
      "Contact": this.Contact,
      "Email": this.Email,
      "notes": this.notes,
      "Residential":(this.ship_to==='-1'?this.shipping.Residential:''),
      "ShipName":(this.ship_to==='-1'?this.shipping.ShipName:''),
      "ShipAttn":(this.ship_to==='-1'?this.shipping.ShipAttn:''),
      "Addr1":(this.ship_to==='-1'?this.shipping.Addr1:''),
      "Addr2":(this.ship_to==='-1'?this.shipping.Addr2:''),
      "selectedCountry":(this.ship_to==='-1'?this.shipping.selectedCountry:''),
      "selectedState":(this.ship_to==='-1'?this.shipping.selectedState:''),
      "City":(this.ship_to==='-1'?this.shipping.City:''),
      "Province":(this.ship_to==='-1'?this.shipping.Province:''),
      "PostalCode":(this.ship_to==='-1'?this.shipping.PostalCode:''),
      
    }
    Common.setWithExpiry("rfqmodel", JSON.stringify(rfqmodel));
  }
  selectsavedorder() {
    try {
      if (Common.getWithExpiry("rfqmodel") != undefined) {
        var getsaved = JSON.parse(Common.getWithExpiry("rfqmodel"))
      }
      if (getsaved != undefined && getsaved != null) {
        this.ship_to = getsaved.ship_to;
        this.Contact = getsaved.Contact;
        this.Email = getsaved.Email;
        this.notes = getsaved.notes;
        if(getsaved.ship_to==='-1'){
          this.shipping.Residential=getsaved.Residential;
          this.shipping.ShipName=getsaved.ShipName;
          this.shipping.ShipAttn=getsaved.ShipAttn;
          this.shipping.Addr1=getsaved.Addr1;
          this.shipping.Addr2=getsaved.Addr2;
          this.shipping.selectedCountry=getsaved.selectedCountry;
          this.shipping.selectedState=getsaved.selectedState;
          this.shipping.City=getsaved.City;
          this.shipping.Province=getsaved.Province;
          this.shipping.PostalCode=getsaved.PostalCode;
          this.shipAddressChange('-1')
        }
      }
    } catch (ed) { }
  }
  getEmailRequired() {
    var EmailRequired = Common.getWithExpiry("EmailRequired");
    if (EmailRequired == null || EmailRequired == undefined) {
      this.dataService.GetEmailRequired().subscribe((data: any) => {
        var dd = data;
        Common.setWithExpiry("EmailRequired", dd);
        if (dd == "1") {
          this.isEmailRequired = true;
        }
        else {
          this.isEmailRequired = false;
        }
      });
    } else {
      if (EmailRequired == "1") {
        this.isEmailRequired = true;
      }
      else {
        this.isEmailRequired = false;
      }
    }
  }
  getEmailSetting() {
    var EmailAddressSetting = Common.getWithExpiry("EmailAddressSetting");
    if (EmailAddressSetting == null || EmailAddressSetting == undefined) {
      this.dataService.GetEmailAddressSetting().subscribe((data: any) => {
        var dd = data;
        Common.setWithExpiry("EmailAddressSetting", dd);
        if (dd == "1") {
          this.isShowEmail = true;
        }
        else {
          this.isShowEmail = false;
        }
      });
    } else {
      if (EmailAddressSetting == "1") {
        this.isShowEmail = true;
      }
      else {
        this.isShowEmail = false;
      }
    }
  }
  getContactSetting() {
    var ContactNameSetting = Common.getWithExpiry("ContactNameSetting");
    if (ContactNameSetting == null || ContactNameSetting == undefined) {
      this.dataService.GetContactNameSetting().subscribe((data: any) => {
        var dd = data;
        Common.setWithExpiry("ContactNameSetting", dd);
        if (dd == "1") {
          this.isShowContact = true;
        }
        else {
          this.isShowContact = false;
        }
      });
    } else {
      if (ContactNameSetting == "1") {
        this.isShowContact = true;
      }
      else {
        this.isShowContact = false;
      }

    }
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  ngOnInit() {
    this.gototop();
    if (Common.getWithExpiry("CustID") == undefined || Common.getWithExpiry("CustID") == '' || Common.getWithExpiry("CustID") == null) {
      this.router.navigate(['login']);
    }
    else {
      this.getwishlist();
    }
  }
  getmultipleum() {
    this.ismultipleum = Common.getWithExpiry("ismultipleum");
    if (this.ismultipleum == null || this.ismultipleum == undefined || this.ismultipleum == '') {
      this.dataService.Allowmultipleum().subscribe((res: any) => {
        this.ismultipleum = res;
        Common.setWithExpiry("ismultipleum", this.ismultipleum);
      });
    }
  }
  getIsMuscle() {
    this.IsMuscle = Common.getWithExpiry("IsMuscle");
    if (this.IsMuscle == null || this.IsMuscle == undefined) {
      this.dataService.GetConfigForIsMuscle().subscribe((data: any) => {
        this.IsMuscle = data;
        Common.setWithExpiry("IsMuscle", this.IsMuscle);
        if (this.IsMuscle == '1') {
          this.GetCartmethodformuscle();
        }
      })
    }
    else {
      if (this.IsMuscle == '1') {
        this.GetCartmethodformuscle();
      }
    }
  }
  itemstoavails: any;
  productlistforQuickorder: any;
  productlistforQuickorder1: any;
  GetCartmethodformuscle() {
    this.productlistforQuickorder1 = [];
    this.dataService.GetProductListForQuickOrder().subscribe((res: any) => {
      this.productlistforQuickorder = res;
      var bulkPrice = [];
      for (let img of this.productlistforQuickorder) {
        try {

          Common.Setdescriptionforitem(img, this.DescrToShow);
          //   var dept1 = [];
          //   try {
          //     dept1 = JSON.parse(img.descr);
          //   } catch (ex) {

          //     img.descr = img.descr.replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';');
          //     img.descr = img.descr.replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '')
          //       .replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '');
          //     dept1 = img.descr.replace('[', '').replace(']', '').split(';');
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
          //   img.description1 = des2;
          //   img.desrc1 = des1;

        } catch (ex) { }

        var um = img.um.trim().replace('[', '').replace(']', '').split(',');

        var getindex = 0;
        var cnt = 0;
        for (var i = 0; i < um.length; i++) {
          um[i] = um[i].trim();
          um[i] = um[i].replace('"', '').replace('"', '');
          if (um[i] != '') {
            if (um[i] == img.um_display) {
              getindex = (cnt - 1);
            }
            cnt = cnt + 1;
          }
        }

        var umqty = img.um_qty.trim().replace('[', '').replace(']', '').split(',');

        try {
          img.qty = umqty[(getindex)];
        } catch (ed) { img.qty = 1; }
        if (img.qty == undefined || img.qty == 0) {
          img.qty = 1;
        }

        this.itemstoavails = this.itemstoavails + img.item1 + ',';
        bulkPrice.push({
          "customer": Common.getWithExpiry("CustID"),
          "item": img.item1,
          "unit": img.um_display.trim(),
          "quantity": 1,
          "warehouse": Common.getWithExpiry("warehouse"),
          "company_sy": Common.getWithExpiry("company_sy")
        })
      }
      if (bulkPrice != null && bulkPrice != undefined && bulkPrice.length > 0) {
        this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
          var data = res;
          for (var i = 0; i < this.productlistforQuickorder.length; i++) {
            for (var j = 0; j < data.length; j++) {
              if (this.productlistforQuickorder[i].item1 == data[j].item) {
                this.productlistforQuickorder[i].price = data[j].price;
                this.productlistforQuickorder1.push(this.productlistforQuickorder[i]);
              }
            }
          }

        });
      }
    });
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
  getMultiplyQtySetting() {
    this.Multiply = Common.getWithExpiry("Multiply");
    if (this.Multiply == null || this.Multiply == undefined) {
      this.dataService.MultiplySetting().subscribe((data: any) => {
        this.Multiply = data;
        Common.setWithExpiry("Multiply", this.Multiply);
      });
    }
  }
  getMinQtySetting() {
    var MinQtySetting = Common.getWithExpiry("MinQtySetting");
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
    var MaxQtySetting = Common.getWithExpiry("MaxQtySetting");
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
  getShipingAddress(defaultval = null) {
    this.ship_to = '0'
    return new Promise((resolve,rej) => {
      var usrid = null;
      if (Common.getWithExpiry("UserType") == '3') {
        usrid = Common.getWithExpiry("UserID");
      }
      this.checkoutService.getShipingAddress(Common.getWithExpiry("CustID"), usrid).subscribe((res: any) => {
        this.shipAdr = res;
  
        for (let ppl of this.shipAdr) {
          var aa = JSON.parse(ppl.adr);
          var s = '';
          for (var i = 0; i < aa.length; i++) {
            if (aa[i] != '') {
              s += aa[i] + ", ";
            }
          }
          ppl.aaa = s.substring(0, s.length - 2);
          ppl.adr = JSON.parse(ppl.adr);
        }
  
        if(defaultval) this.ship_to = defaultval;
        Common.setWithExpiry("shippingAddress", JSON.stringify(this.shipAdr));
        if(this.logintype=='3'){
          this.ship_to=Common.getWithExpiry("UserID");
          this.shipAddressChange(this.ship_to);
        }
        resolve(true);
      });
    })
  }


  getBillingAddress() {
    return new Promise((resolve,rej) => {
      this.checkoutService.getBillingAddress(Common.getWithExpiry("CustID")).subscribe((res: any) => {
        this.billAdr = res;
        if (this.billAdr != null) {
          try {
            this.billAdr.adr = JSON.parse(this.billAdr.adr);
          } catch (ed) { }
          this.billAdd1 = '';
  
          for (var i = 0; i < this.billAdr.adr.length; i++) {
            if (this.billAdr.adr[i] != null && this.billAdr.adr[i] != ' ' && this.billAdr.adr[i].length > 0) {
              this.billAdd1 = this.billAdd1 + " " + this.billAdr.adr[i];
            }
          }
        }
        Common.setWithExpiry("addrObj", JSON.stringify(this.billAdr));
        resolve(true);
      });
    })
  }

  shipAddressChange(val) {

    if (val == 0) {
      this.showShipAdd = false;
      this.shipText = "Add";
      this.isAddShip = false;
    }
    else if (val == "-1") {
      this.isAddShip = true;
      this.showShipAdd = false;
    }
    else if (val == "same") {
      this.showShipAdd = true;
      this.isAddShip = false;
      this.shipId = "same";
      this.shipName = this.billAdr.name;
      this.shipAddr1 = this.billAdr.adr[0].trim();
      this.shipAddr2 = this.billAdr.adr[1].trim();
      this.shipState = this.billAdr.state.trim();
      this.shipCountry = this.billAdr.country_code.trim();
      this.shipZIP = this.billAdr.postal_code;
      var getshipadr = this.billAdr;
      if (this.billAdr.adr.length > 0) {
        var getaddrs = this.billAdr.adr;
        var gettacadr = '';
        for (var i = 0; i < getaddrs.length; i++) {
          if (getaddrs[i] != null && this.shipAdr[i] != ' ' && getaddrs[i].length > 0) {
            gettacadr = gettacadr + " " + getaddrs[i];
          }
        }
        this.shipAddr1 = getaddrs[0].trim() + ',' + getaddrs[1].trim();
        this.shipCity = getaddrs[2].trim() + getaddrs[3].trim();
      }

    }
    else {
      this.isAddShip = false;
      this.shipText = "Modify";
      this.showShipAdd = true;
      for (var i = 0; i < this.shipAdr.length; i++) {
        if (this.shipAdr[i].ship_id == val) {
          this.shipId = this.shipAdr[i].ship_id;
          this.shipName = this.shipAdr[i].name;
          this.shipAddr1 = this.shipAdr[i].adr[0].trim();
          this.shipAddr2 = this.shipAdr[i].adr[1].trim();
          this.shipState = this.shipAdr[i].state.trim();
          this.shipCountry = this.shipAdr[i].country_code.trim();
          this.shipZIP = this.shipAdr[i].postal_code;
          var getshipadr = this.shipAdr[i];
          if (this.shipAdr[i].adr.length > 0) {
            var getaddrs = this.shipAdr[i].adr;
            var gettacadr = '';
            for (var i = 0; i < getaddrs.length; i++) {
              if (getaddrs[i] != null && this.shipAdr[i] != ' ' && getaddrs[i].length > 0) {
                gettacadr = gettacadr + " " + getaddrs[i];
              }
            }
            this.shipAddr1 = getaddrs[0].trim() + ',' + getaddrs[1].trim();
            this.shipCity = getaddrs[2].trim() + getaddrs[3].trim();
          }

          break;
        }
      }
    }

  }

  goback() {
    this.showdiv = '1';
    this.ngOnInit();
  }

  getwishlist() {
    this.dataService.GetUserwishlist(Common.getWithExpiry("CustID"), 2).subscribe((res: any) => {
      this.wishlist = res;
    });
  }
  onbluerevent(item) {
    if (item.quantity > 0) {
      this.itemList.push(item);
    }
  }
  onKeydown(event, item, i) {
    if (event.key === "Enter" && item.quantity > 0) {
      this.Addtocart(item, i);
    }
  }
  Addtocart(getitem, i) {
    try {
      if (getitem.quantity != undefined) {
        if (getitem.quantity > 0) {
          var usrid = null;
          if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
            usrid = Common.getWithExpiry("UserID");
          }
          else {
            usrid = Common.getWithExpiry("CustID");
          }
          this.cartService.getCartItemByUserID().subscribe((res: any) => {
            this.cartProducts = res;
            var getum = '1';
            this.dataService.getProductDetailName(getitem.itemname, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
              var item1 = res;
              if ((item1 != null && item1.IsGrouped == false) || (item1 != null && item1.IsGrouped == true && this.baseitemShow == '1')) {
                item1.quantity = getitem.quantity;
                var getunits = JSON.parse(item1.um);
                var getum_qty = JSON.parse(item1.umqty);
                for (var i = 0; i < getunits.length; i++) {
                  if (item1.um_display == getunits[i]) {
                    getum = getum_qty[i - 1];
                  }
                }
              }
              else {
                this.toastr.error(item1.itemname + " is not available", 'Message!');
                i = i + 1;
                //$("#" + i).focus();
              }

              var getitem12 = {
                items: item1.itemname,
                warehouse: Common.getWithExpiry("warehouse"),
                company_sy: Common.getWithExpiry("company_sy")
              }
              var getproduct = null;
              for (let cprod of this.cartProducts) {
                if (cprod.itemname == getitem.itemname) {
                  getproduct = cprod;
                }
              }
              this.dataService.getProductavailibity(getitem12).subscribe((res: any) => {
                var availdata = res;
                // if(availdata[0].available > 0){
                var bulkPrice = [];
                // getitem.units = getitem.units.replace('"','').replace('"','');
                bulkPrice.push({
                  "customer": Common.getWithExpiry("CustID"),
                  "item": item1.itemname,
                  "unit": item1.um_display,
                  "quantity": item1.quantity,
                  "warehouse": Common.getWithExpiry("warehouse"),
                  "company_sy": Common.getWithExpiry("company_sy")
                })
                if (getproduct == undefined || getproduct == null) {
                  getproduct = item1;
                }
                this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
                  var data = res;
                  if(this.iskrayden && data[0].origin != 'CI' && data[0].origin != 'SP'){
                    item1.list_price = item1.list_price;
                  }
                  else{
                  item1.list_price = data[0].price;
                  }
                  //item1.itemname = item1.itemname;
                  var usrid = null;
                  getum = (getum == undefined ? '1' : getum);
                  item1.totqty = parseFloat(item1.quantity) * parseFloat(getum);
                  if (getproduct != null) {
                    var getum2 = JSON.parse(getproduct.um);
                    var getum1 = JSON.parse(getproduct.umqty);
                    for (var i = 0; i < getum2.length; i++) {
                      if (i == 0 && getum2[i] != '') {
                        getproduct.firstum = getum2[i];
                        getproduct.firstumqty = (getum1[i - 1] == undefined ? 1 : getum1[i - 1]);
                      }
                      if (i == 0 && getum2[i] == getproduct.MeasureUnit) {
                        getproduct.Qty = (getproduct.Quantity * 1);
                      }
                      else if (getum2[i] == getproduct.MeasureUnit) {
                        getproduct.Qty = (getproduct.Quantity * getum1[i - 1]);
                      }
                    }
                  }

                  if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
                    usrid = Common.getWithExpiry("UserID");
                  }
                  else {
                    usrid = Common.getWithExpiry("CustID");
                  }
                  if (availdata[0].available > 0) {
                    this.cartService.addProductToCart(item1, item1.um_display).subscribe((res: any) => {
                      this.cartService.cartBroadCaster(res);
                      getitem.quantity = "";
                      this.toastr.success(item1.quantity + " " + this.getumdescbyumcode(item1.um_display) + " of item " + item1.itemname + " has been added to your cart.", 'Success!');
                    })

                  }
                  else {
                    this.toastr.info(item1.quantity + " " + this.getumdescbyumcode(item1.um_display) + " of item " + item1.itemname + " has been added to your cart." + " is not available", 'Message!');
                  }
                  i = i + 1;
                  //$("#" + i).focus();
                  //}
                })
              });
            });
          });
        }
        else {
          this.toastr.error("Invalid Quantity", 'Message!');
          //$("#" + i).focus();
        }

      }

    } catch (exception) {
      this.toastr.error("Cannot be added to cart", 'Product not available!');
      i = i + 1;
      //$("#" + i).focus();
    }
  }

  GetwishlistProductByID(wishlistId) {
    this.dataService.GetwishlistProductByID(wishlistId, Common.getWithExpiry("CustID")).subscribe((res: any) => {
      this.currentproductlist = res;
      this.cartTotal = 0;
      for (let oo of this.currentproductlist) {
        if (oo.item.indexOf('~') != -1) {
          var name = oo.item.split('~');
          oo.item = name[0];
          oo.itemBase = name[1];
        }
        oo.quantity=oo.Qty;
        this.dataService.getProductDetailbyItemName(oo.item, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
          var item1 = res;

          oo.umqty = item1.umqty;
          oo.um = item1.um;
          oo.web_um_alws = item1.web_um_alws;
          oo.unitMeasure = item1.web_um_display;
          oo.um_display = item1.um_display;
          oo.freeform = item1.freeform;
          oo.itemdesc = item1.itemdesc;
          oo.descr = item1.itemdesc;
          oo.links=item1.links;
          oo.list_price=item1.list_price;
          oo.max=item1.max;
          oo.qty_warn=item1.qty_warn;
          oo.min=item1.min;
          Common.Setdescriptionforitem(oo, this.DescrToShow);
          var umArr = oo.umqty.replace('[', '').replace(']', '').split(',');
          var index = 0;
          var units = oo.um.trim().replace('[', '').replace(']', '').split(',');
          for (var i = 0; i < units.length; i++) {
            units[i] = units[i].trim();
            var existingUnit = units[i].replace('"', '').replace('"', '');
            var un = 'each';
            if (existingUnit.toLowerCase() == "ea" || existingUnit.toLowerCase() == "each") {
              index = i;
              break;
            }
          }
          //Common.gotoproductdetails(oo, this.UrlWithDetails, this.UrlWithFreeForm);
          var units = JSON.parse(oo.um);
          var umArr = JSON.parse(oo.umqty);
          var getallows = JSON.parse(oo.web_um_alws);
          
          // var desrc = JSON.parse(item1.itemdesc);
          // var desrc1 = '';
          // var descrt12 = [];
          // if (oo.itemBase == undefined || oo.itemBase == '') {
          //   for (let newdesrc of desrc) {
          //     if (newdesrc != '') {
          //       desrc1 = desrc1 + '' + (newdesrc.toString().replace('.', '').replace('-', '').trim());
          //       descrt12.push(newdesrc.toString().replace('.', '').replace('-', '').trim());
          //     }
          //   }
          // }
          // descrt12.push(oo.itemBase);
          // oo.desclist = descrt12;
          // oo.descr1 = oo.itemBase + ' ' + desrc1;
          var umList = [];
          var getindex = 0;
          var umList1 = [];
          if (this.ismultipleum == '1') {
            for (var i = 0; i < units.length; i++) {
              if (units[i] == oo.um_display) {
                getindex = i;
                if(getindex==0){
                  oo.um_displayQty=1;
                }
                else{
                  oo.um_displayQty=umArr[i - 1];
                }
              }
              if (i == 0 && units[i] != '' && getallows[i]==true) {
                umList.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (1)', 'Price': '' });
                umList1.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (1)', 'Price': '' });
                if (oo.MeasureUnit == umList[0].Label) {
                  oo.totqty = umList[0].umqty * oo.quantity;
                }

              }
              else if (units[i] != '' && getallows[i]==true) {
                umList.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (' + umArr[i - 1] + ')', 'Price': '' });
                umList1.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (' + umArr[i - 1] + ')', 'Price': '' });

                if (oo.MeasureUnit == umList[0].Label) {
                  oo.totqty = umList[0].umqty * oo.quantity;
                }

              }
            }
          }
          else {

            for (var i = 0; i < units.length; i++) {
              if (units[i] != '' && units[i] == oo.um_display) {
                if (i == 0 && getallows[i]==true) {

                  umList.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (1)', 'Price': '' });
                  umList1.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (1)', 'Price': '' });

                }
                else if(getallows[i]==true){
                  umList.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (' + umArr[i - 1] + ')', 'Price': '' });
                  umList1.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (' + umArr[i - 1] + ')', 'Price': '' });

                }
              }
            }
          }
          oo.unitlist = umList;


          var bulkPrice = [];
          bulkPrice.push({
            "customer": Common.getWithExpiry("CustID"),
            "item": item1.itemname,
            "unit": item1.um_display,
            "quantity": 1,
            "warehouse": this.warehouse,
            "company_sy": Common.getWithExpiry("company_sy")
          })
          this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
            var data = res;
            if (item1 != null) {
              oo.RowID = item1.itemnumber,
                oo.image = item1.image;
              oo.prodlinename = item1.prodlinename;
              oo.itemname = item1.itemname;
              //oo.quantity = 1;
              oo.UM = item1.um_display;
              if(data[0].price>0){
              oo.Price = data[0].price;
              }
              else{
                oo.Price = oo.list_price;
              }
              oo.TotalPrice = oo.Price * oo.quantity;
              this.cartTotal = this.cartTotal + oo.TotalPrice;
            }
          });
        });
      }
    });
  }
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
  getUrlWithDetails() {
    this.UrlWithDetails = Common.getWithExpiry("UrlWithDetails");
    if (this.UrlWithDetails == null || this.UrlWithDetails == undefined) {
      this.dataService.GetUrlWithDetailssetting().subscribe((data: any) => {
        this.UrlWithDetails = data;
        Common.setWithExpiry("UrlWithDetails", this.UrlWithDetails);
      })
    }
  }
  getUrlWithFreeForm() {
    this.UrlWithFreeForm = Common.getWithExpiry("UrlWithFreeForm");
    if (this.UrlWithFreeForm == null || this.UrlWithFreeForm == undefined) {
      this.dataService.GetUrlWithFreeFormsetting().subscribe((data: any) => {
        this.UrlWithFreeForm = data;
        Common.setWithExpiry("UrlWithFreeForm", this.UrlWithFreeForm);
      })
    }
  }
  createAnewUser() {
    if (Common.getWithExpiry("UserType") == '5') {
      this.cartService.CreatesystaemUser(Common.getWithExpiry("CustID")).subscribe((res: any) => {
        var getflag = res;

      });
    }
  }

  DeletewishlistByID(wishlistId) {
    this.dataService.Deletewishlistbyusername(wishlistId).subscribe((res: any) => {
      var results = res;
      if (results) {
        this.goback();
      }
      else {
        this.toastr.error("Error Occured Please Try Again", 'Message!');
      }
    });
  }
  AddNewItem1() {
    this.dataService.getProductDetailNameForXref(this.newitem, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
      var item1 = res;
      if (item1 != null && item1 != undefined) {
        item1.item = item1.itemname;
        item1.umqty = item1.umqty;
        item1.um = item1.um;
        item1.web_um_alws = item1.web_um_alws;
        item1.unitMeasure = item1.web_um_display;
        item1.um_display = item1.um_display;
        item1.freeform = item1.freeform;
        item1.itemdesc = item1.itemdesc;
        item1.descr = item1.itemdesc;
        Common.Setdescriptionforitem(item1, this.DescrToShow);
        var umArr = item1.umqty.replace('[', '').replace(']', '').split(',');
        var index = 0;
        var units = item1.um.trim().replace('[', '').replace(']', '').split(',');
        for (var i = 0; i < units.length; i++) {
          units[i] = units[i].trim();
          var existingUnit = units[i].replace('"', '').replace('"', '');
          var un = 'each';
          if (existingUnit.toLowerCase() == "ea" || existingUnit.toLowerCase() == "each") {
            index = i;
            break;
          }
        }
        var units = JSON.parse(item1.um);
        var umArr = JSON.parse(item1.umqty);
        var getallows = JSON.parse(item1.web_um_alws);
        // var desrc = JSON.parse(item1.itemdesc);
        // var desrc1 = '';
        // var descrt12 = [];
        // for (let newdesrc of desrc) {
        //   if (newdesrc != '') {
        //     desrc1 = desrc1 + '' + (newdesrc.toString().replace('.', '').replace('-', '').trim());
        //     descrt12.push(newdesrc.toString().replace('.', '').replace('-', '').trim());
        //   }
        // }

        // item1.desclist = descrt12;
        // item1.descr1 = desrc1;
        var umList = [];
        var getindex = 0;
        var umList1 = [];
        if (this.ismultipleum == '1') {
          for (var i = 0; i < units.length; i++) {
            if (units[i] == item1.um_display) {
              getindex = i;
              if(getindex==0){
                item1.um_displayQty=1;
              }
              else{
                item1.um_displayQty=umArr[i - 1];
              }
            }
            if (i == 0 && units[i] != '') {
              umList.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (1)', 'Price': '' });
              umList1.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (1)', 'Price': '' });
              if (item1.MeasureUnit == umList[0].Label) {
                item1.totqty = umList[0].umqty * item1.quantity;
              }
            }
            else if (units[i] != '') {
              umList.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (' + umArr[i - 1] + ')', 'Price': '' });
              umList1.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (' + umArr[i - 1] + ')', 'Price': '' });
              if (item1.MeasureUnit == umList[0].Label) {
                item1.totqty = umList[0].umqty * item1.quantity;
              }
            }
          }
        }
        else {
          for (var i = 0; i < units.length; i++) {
            if (units[i] != '' && units[i] == item1.um_display) {
              if (i == 0) {
                item1.um_displayQty=1;
                umList.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (1)', 'Price': '' });
                umList1.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (1)', 'Price': '' });
              }
              else {
                item1.um_displayQty=umArr[i - 1];
                umList.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (' + umArr[i - 1] + ')', 'Price': '' });
                umList1.push({ 'Label': units[i], 'LabelText': this.getumdescbyumcode(units[i]) + ' (' + umArr[i - 1] + ')', 'Price': '' });
              }
            }
          }
        }

        item1.unitlist = umList;
        //Common.gotoproductdetails(item1, this.UrlWithDetails, this.UrlWithFreeForm);
        var profile1 = JSON.parse(item1.profile1);
        if ((profile1[1] != "" && this.show3D == '1') && (profile1[2] == 'YES' || profile1[2] == 'yes')) {
          item1.IsBaseProduct = true;
        }
        else {
          item1.IsBaseProduct = false;
        }
      }
      if ((item1 != null && item1.IsGrouped == false && item1.IsBaseProduct == false) || (item1 != null && item1.IsGrouped == true && this.baseitemShow == '1')) {
        // var itemdescrd = '';
        // var getitemdesc = JSON.parse(item1.itemdesc);
        // var getdescr = [];
        // for (let oo of getitemdesc) {
        //   if (oo != undefined && oo != null && oo != '') {
        //     itemdescrd = itemdescrd + oo + ', ';
        //     getdescr.push(oo);
        //   }
        // }
        if (item1.qty_warn != undefined && item1.qty_warn != "0" && this.Multiply == '1') {
          item1.quantity = item1.qty_warn / item1.um_displayQty;
            this.toastr.error("item will be added in multiple of " + item1.quantity + ' of ' + this.getumdescbyumcode(item1.um_display));
          // if ((item1.quantity * parseFloat(item1.um_displayQty.toString())) % item1.qty_warn != 0) {
          //   this.toastr.error("Please enter item in multiple of " + parseInt(item1.qty_warn) / parseInt(item1.um_displayQty) + ' of ' + this.getumdescbyumcode(item1.um_display));
          //   return;
          // }
        }
        if (item1.min != undefined && item1.min != "0" && item1.quantity < item1.min && this.MinQty) {
          this.toastr.error("Minimum quantity should be " + item1.min + ' of ' + this.getumdescbyumcode(item1.firstum));
          return;
        }

        if (item1.max != undefined && item1.max != "0" && item1.quantity > item1.max && this.MaxQty) {
          this.toastr.error("Maximum quantity should be " + item1.max + ' of ' + this.getumdescbyumcode(item1.firstum));
          return;
        }
        
       
        var bulkPrice = [];
        bulkPrice.push({
          "customer": Common.getWithExpiry("CustID"),
          "item": item1.itemname,
          "unit": item1.um_display,
          "quantity": item1.quantity,
          "warehouse": this.warehouse,
          "company_sy": Common.getWithExpiry("company_sy")
        })
        this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
          var data = res;
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
          // if ((this.configforcartbyprofile == '1' && profilefor != undefined && profilefor != null && (profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1] == 'NO' || profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1] == 'no')) && ((data[0].origin != 'CI'))) {
          //   this.toastr.error("Product is Not Available");
          //   return;
          // }
          else {
            this.currentproductlist.push({
              "RowID": item1.itemnumber,
              "image": item1.image,
              "prodlinename": item1.prodlinename,
              "itemname": item1.itemname,
              "quantity": item1.quantity,
              "UM": item1.um_display,
              "Price": data[0].price,
              "TotalPrice": data[0].price * 1,
              "WishlistID": this.currentwishlist.WishlistID,
              "WishlistitemID": this.currentproductlist.length + 1,
              "desc": item1.descrstring,
              "unitMeasure": item1.um_display,
              "unitlist": item1.unitlist,
              "desclist": item1.descrarray,
              "freeform": item1.freeform,
              "links": item1.links,
              "descrarray": item1.descrarray,
              "descrstring": item1.descrstring,
            })
            this.onUnitChange();
          }
        })
        this.AddProducttowishlist(null, this.currentwishlist.WishlistID, this.newitem, item1.quantity);

      }
      else {
        this.toastr.error("Invalid Item", 'Message!');
      }
    });
  }

  sortBy(prop: string) {
    try{
    return this.currentproductlist.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    }catch(ed){}
  }

addremoveqty(item){
//this.sendMessage('start');
if (item.min != undefined && item.min != "0" && item.quantity < item.min && this.MinQty) {
  this.toastr.error("Minimum quantity should be " + item.min + ' of ' + this.getumdescbyumcode(item.firstum));
  this.GetwishlistProductByID(this.currentwishlist.WishlistID);
  return;
}

 if (item.max != undefined && item.max != "0" && item.quantity > item.max && this.MaxQty) {
  this.toastr.error("Maximum quantity should be " + item.max + ' of ' + this.getumdescbyumcode(item.firstum));
  this.GetwishlistProductByID(this.currentwishlist.WishlistID);
  return;
}
 if (item.qty_warn != undefined && item.qty_warn != "0" && this.Multiply == '1') {
  if ((item.quantity * parseFloat(item.um_displayQty.toString())) % item.qty_warn != 0) {
    this.toastr.error("Please enter item in multiple of " + parseInt(item.qty_warn) / parseInt(item.um_displayQty) + ' of ' + this.getumdescbyumcode(item.um_display));
    this.GetwishlistProductByID(this.currentwishlist.WishlistID);
    return;
  }
}
//else{
  this.dataService.DeleteProducttowishlist(item.WishlistitemID).subscribe((res: any) => {
    var results = res;
    if (results) {

      this.dataService.AddProducttowishlist(null, this.currentwishlist.WishlistID, item.itemname, item.quantity).subscribe((res: any) => {
        var results = res;
        //this.sendMessage('stop');
        if (results) {
          this.GetwishlistProductByID(this.currentwishlist.WishlistID);
          //this.onUnitChange();
          //this.navigatetowishdetails(this.currentwishlist.WishlistID);
        }
      });


  //    this.AddProducttowishlist(null, this.currentwishlist.WishlistID, item.itemname, item.quantity);
  
    }
  });

//}
  //this.DeleteProducttowishlist(this.currentwishlist.WishlistID,item.itemname);
  
}


  onUnitChange() {
    this.cartTotal = 0;

    for (let oo of this.currentproductlist) {
      if (oo.quantity == 0 || oo.quantity < 0 || oo.quantity == undefined) {
        this.toastr.error("Invalid Quantity", 'Message!');
        oo.quantity = 1;
        oo.TotalPrice = oo.Price * oo.quantity;
        this.cartTotal = this.cartTotal + oo.TotalPrice;
      }
      else if (oo.min != undefined && oo.min != "0" && oo.quantity < oo.min && this.MinQty) {
        this.toastr.error("Minimum quantity should be " + oo.min + ' of ' + this.getumdescbyumcode(oo.firstum));
        return;
      }
      else if (oo.max != undefined && oo.max != "0" && oo.quantity > oo.max && this.MaxQty) {
        this.toastr.error("Maximum quantity should be " + oo.max + ' of ' + this.getumdescbyumcode(oo.firstum));
        return;
      }
      if (oo.qty_warn != undefined && oo.qty_warn != "0" && this.Multiply == '1') {
        if ((oo.quantity * parseFloat(oo.um_displayQty.toString())) % oo.qty_warn != 0) {
          this.toastr.error("Please enter item in multiple of " + parseInt(oo.qty_warn) / parseInt(oo.um_displayQty) + ' of ' + this.getumdescbyumcode(oo.um_display));
          return;
        }
      }
      else {
        oo.TotalPrice = oo.Price * oo.quantity;
        this.cartTotal = this.cartTotal + oo.TotalPrice;
      }
    }
  }

  AddProducttowishlist(WishlistitemID, WishlistID, item, Qty) {
    this.dataService.AddProducttowishlist(WishlistitemID, WishlistID, item, Qty).subscribe((res: any) => {
      var results = res;
      if (results) {
        this.newitem = '';
        this.createnewlist(WishlistID);
      }
      else {
        this.toastr.error("Error Occured Please Try Again", 'Message!');
      }
    });
  }
  Clicktoeditwishlist(currentwishlist) {
    currentwishlist.canEditCode = true;
    // window.setTimeout(() => {
      const element = this.renderer.selectRootElement("#WishlistName");
      element.focus();
    // });
  }

  Addwishlistheader(WishlistName) {
    if (WishlistName == undefined || WishlistName == undefined || WishlistName == null || WishlistName == '') {
      this.toastr.error("Enter the wish list name", 'Message!');
    }
    else {
      this.currentwishlist.WishlistName = WishlistName;
      this.currentwishlist.canEditCode = false;
      this.dataService.Addwishlistheader(this.currentwishlist.WishlistID, this.currentwishlist.WishlistName, Common.getWithExpiry("CustID"), null, 2).subscribe((res: any) => {
        var results = res;
        if (results == 0) {
          this.toastr.error("Error Occured Please Try Again", 'Message!');
        }
        else {
          this.toastr.success("Updated Successfully", 'Message!');
        }
      });
    }
  }

  addToCartMultiple() {
    for (var i = 0; i < this.itemList.length; i++) {
      this.Addtocart(this.itemList[i], i);
    }
    this.itemList = [];
    //$(".text-input").val('');
  }

  createnewlist(WishlistID) {
    if (WishlistID > 0) {
      this.showdiv = '2';
      this.Getcurrentwishlist(WishlistID);
      this.GetwishlistProductByID(WishlistID);
    }
    else {
      var getyea = new Date();
      var name1 = getyea.toUTCString();
      this.dataService.Addwishlistheader(null, name1, Common.getWithExpiry("CustID"), null, 2).subscribe((res: any) => {
        var results = res;
        if (results > 0) {
          this.dataService.GetUserwishlist(Common.getWithExpiry("CustID"), 2).subscribe((res: any) => {
            this.wishlist = res;
            this.navigatetowishdetails(results);
          });
        }
      });
    }
  }
  navigatetowishdetails(WishlistID) {
    this.showdiv = '2';
    this.itemList = [];
    this.GetDefaultValues();
    this.getBillingAddress();
    this.getShipToSetting();
    this.getCountry();
    this.getmultipleum();
    this.getFreeFormSetting();
    this.Getcurrentwishlist(WishlistID);
    this.GetwishlistProductByID(WishlistID);
    this.getShipingAddress();
    this.getContactSetting();
    this.getContactRequired();
    this.getEmailSetting();
    this.getEmailRequired()
    this.getNoteSetting();
    this.getNoteRequired();
    this.createAnewUser();
    this.selectsavedorder();
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
    this.dataService.GetConfigForFastAddCart().subscribe((acart: any) => {
      this.FastAddCart = acart;
    });
  }
  Getcurrentwishlist(WishlistID) {
    for (let wish1 of this.wishlist) {
      if (wish1.WishlistID == WishlistID) {
        this.currentwishlist = wish1;
      }
    }
    this.shipping = {
      "selectedCountry": "US",
    }
    this.getStates("US");
    //this.shipping.selectedCountry = "US";
  }
  GetDefaultValues() {
    try {
        var userid = null;
        var subuserid = null;
        var userType = null;
        if (Common.getWithExpiry("CustID") != undefined && Common.getWithExpiry("CustID") != null && Common.getWithExpiry("CustID") != '') {
            userid = Common.getWithExpiry("CustID");
            subuserid = Common.getWithExpiry("UserID");
            userType = Common.getWithExpiry("UserType");
        }
        
        this.sendMessage('start')
        this.checkoutService.getDefaultValues(subuserid, userType, userid).subscribe((data: any) => {
            var defaultvalues = data;
            this.Contact=defaultvalues.name;
            this.Email=defaultvalues.email_address;
            if(defaultvalues.ship_id!=undefined && defaultvalues.ship_id!=null && defaultvalues.ship_id.length>0){
                  this.ship_to=defaultvalues.ship_id;
            }
            this.sendMessage('stop')
            
        });
    } catch (ed) { }
}
  getaddresscityno(country) {
    this.cartService.GetCountryaddressCityCode(country).subscribe((res: any) => {
      this.cityno = res;
    });
  }
  shipCountryChange() {
    this.getaddresscityno(this.shipping.selectedCountry);
    this.getStates(this.shipping.selectedCountry);
    if (this.shipping.selectedCountry != "US") {
      this.shipProvince = true;
    }
    else {
      this.shipProvince = false;
    }

    this.getvalforform();

  }

  ClearCart() {
    this.sendMessage('start');
    this.dataService.DeleteAllProducttowishlist(this.currentwishlist.WishlistID).subscribe((res: any) => {
      this.sendMessage('stop');
      var results = res;
      if (results) {
        //this.createnewlist(WishlistID);
        this.toastr.success("Quote list is cleared...")
        this.navigatetowishdetails(this.currentwishlist.WishlistID);
      }
      else {
        this.toastr.error("Error Occured Please Try Again", 'Message!');
      }
    });
  }

  DeleteProducttowishlist(WishlistID, wishlistproductid) {
    this.sendMessage('start');
    this.dataService.DeleteProducttowishlist(wishlistproductid).subscribe((res: any) => {
      this.sendMessage('stop');
      var results = res;
      if (results) {
        //this.createnewlist(WishlistID);
        this.navigatetowishdetails(WishlistID);
      }
      else {
        this.toastr.error("Error Occured Please Try Again", 'Message!');
      }
    });
  }
  onCreateShipTo(id) {
    this.router.navigate(["/shipping-address/0/" + id]);
  }
  getFreeFormSetting() {
    var FreeFormSetting = Common.getWithExpiry("FreeFormSetting");
    if (FreeFormSetting == null || FreeFormSetting == undefined || FreeFormSetting == '') {
      this.dataService.GetFreeFormSetting().subscribe((data: any) => {
        FreeFormSetting = data;
        if (FreeFormSetting == "1") {
          this.isShowFreefrom = true;
        }
        else {
          this.isShowFreefrom = false;
        }
      });
    }
    else {
      if (FreeFormSetting == "1") {
        this.isShowFreefrom = true;
      }
      else {
        this.isShowFreefrom = false;
      }
    }
  }
  finalizeOrder() {
    if (this.ship_to == undefined || this.ship_to == null || this.ship_to == '' || this.ship_to == '0') {
      this.toastr.error("Please select ship to address");
      document.getElementById("ship_to").scrollIntoView();
      return;
    }
    if (this.ship_to == '-1' && (this.shipping.ShipName == undefined || this.shipping.ShipName == null || this.shipping.ShipName == '')) {
      this.toastr.error("Please insert Ship Name", 'Message!');
      const element = this.renderer.selectRootElement("#shippingShipName");
      element.focus();
      return;
    }
    if (this.ship_to == '-1' && (this.shipping.ShipAttn == undefined || this.shipping.ShipAttn == null || this.shipping.ShipAttn == '')) {
      this.toastr.error("Please insert Ship Attn", 'Message!');
      const element = this.renderer.selectRootElement("#shippingShipAttn");
      element.focus();
      return;
    }
    if (this.ship_to == '-1' && (this.shipping.Addr1 == undefined || this.shipping.Addr1 == null || this.shipping.Addr1 == '')) {
      this.toastr.error("Please insert Address 1", 'Message!');
      const element = this.renderer.selectRootElement("#shippingAddr1");
      element.focus();
      return;
    }
    if (this.ship_to == '-1' && (this.shipping.selectedState == undefined || this.shipping.selectedState == null || this.shipping.selectedState == '' || this.shipping.selectedState == '0')) {
      this.toastr.error("Please Select State", 'Message!');
      document.getElementById("State").scrollIntoView();
      return;
    }
    if (this.ship_to == '-1' && (this.shipping.City == undefined || this.shipping.City == null || this.shipping.City == '')) {
      this.toastr.error("Please insert City", 'Message!');
      const element = this.renderer.selectRootElement("#City");
      element.focus();
      return;
    }
    if (this.ship_to == '-1' && (this.shipping.PostalCode == undefined || this.shipping.PostalCode == null || this.shipping.PostalCode == '')) {
      this.toastr.error("Please insert Postal Code", 'Message!');
      const element = this.renderer.selectRootElement("#shippingPostalCode");
      element.focus();
      return;
    }
    else if ((this.Contact == undefined || this.Contact == null || this.Contact == '') && (this.isContactRequired == true)) {
      this.toastr.error("Please Insert Contact");
      const element = this.renderer.selectRootElement("#contactPerson");
      element.focus();
      return;
    }
    else if ((this.Email == undefined || this.Email == null || this.Email == '') && (this.isEmailRequired == true)) {
      this.toastr.error("Please Insert Email");
      const element = this.renderer.selectRootElement("#emailAddress");
      element.focus();
      return;
    }
    else if ((this.notes == undefined || this.notes == null || this.notes == '') && (this.isNoteRequired == true)) {
      this.toastr.error("Please Insert Note");
      const element = this.renderer.selectRootElement("#orderNote");
      element.focus();
      return;
    }
    else {
      var lines = [];
      var ordExt = 'd' + Math.floor(100000 + Math.random() * 900000);
      for (var i = 0; i < this.currentproductlist.length; i++) {
        var um = this.currentproductlist[i].UM.replace(/[\n\r]+/g, '');

        lines.push((this.TextUpperCase == '1' ?
          this.ConvertKeysToUpperCase({
            "order_ext": ordExt, //product.descr
            "customer": Common.getWithExpiry("CustID"),
            "warehouse": Common.getWithExpiry("warehouse"),
            "line": i,
            "item": this.currentproductlist[i].itemname,
            "descr": this.currentproductlist[i].descrarray.toString(),
            "qty_ord": this.currentproductlist[i].quantity,
            "unit_price": parseFloat(this.currentproductlist[i].Price),
            "um_o": this.currentproductlist[i].unitMeasure,
            "notes": this.currentproductlist[i].Note,
          }) :
          {
            "order_ext": ordExt, //product.descr
            "customer": Common.getWithExpiry("CustID"),
            "warehouse": Common.getWithExpiry("warehouse"),
            "line": i,
            "item": this.currentproductlist[i].itemname,
            "descr": this.currentproductlist[i].descrarray.toString(),
            "qty_ord": this.currentproductlist[i].quantity,
            "unit_price": parseFloat(this.currentproductlist[i].Price),
            "um_o": this.currentproductlist[i].unitMeasure,
            "notes": this.currentproductlist[i].Note,
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
        "ship_id": (this.ship_to == "-1" ? null : this.ship_to),
        "auth_amount": "",
        "pay_amount": "",
        "cu_po":(this.iskrayden==true ? "QUOTE" : ""),
        "wanted_date": (wantedDate.getMonth() + 1) + '/' + wantedDate.getDate() + '/' + wantedDate.getFullYear(),
        "cancel_date": "",
        "job_rel": "",
        "cell_phone": "",
        "ship_cmpl": "",
        "email_address": this.Email,
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
        "notes": this.notes,
        "tot_code": "",
        "tot_code_amt": "",
        "tax_amount": "",
        "tax_code": "",
        "Misc_8": "",
        "Misc_9": "",
        "pay_code": "", //payment.cart,
        "pay_cd": "", //payment.cart,
        "pay_code_amount": "", //payment.transactions[0].amount.total, 
        "s_adr1": (this.shipping.Addr1 == undefined ? "" : this.shipping.Addr1),
        "s_adr2": (this.shipping.Addr2 == undefined ? "" : this.shipping.Addr2),
        "s_adr3": (this.cityno == 3 ? (this.shipping.City == undefined ? "" : this.shipping.City) : ''),
        "s_adr4": (this.cityno == 4 ? (this.shipping.City == undefined ? "" : this.shipping.City) : ''),
        "s_adr5": (this.shipping.Province == undefined ? "" : this.shipping.Province),
        //"s_adr": "[\"" + (this.shipping.Addr1==undefined?"":this.shipping.Addr1) + "\",\"" + (this.shipping.Addr2==undefined?"":this.shipping.Addr2) + "\",\"" + (this.cityno==3? (this.shipping.City==undefined?"":this.shipping.City):'')+ "\",\"" + (this.cityno==4? (this.shipping.City==undefined?"":this.shipping.City):'') + "\",\"" + (this.shipping.Province==undefined?"":this.shipping.Province) + "\",\""  + "\"]",
        "s_country_code": this.shipping.selectedCountry,
        "residential": this.shipping.Residential,
        "free_form_shipto": this.isAddShip,
        "s_name": this.shipping.ShipName,
        "ship_atn": this.shipping.ShipAttn,
        "s_st": this.shipping.selectedState,
        "s_postal_code": this.shipping.PostalCode,
        "blind_ship": "no",
        "ship_via_acct": "",
        "orderby": this.Contact,
        "NewOrderlines": linesVM,
        "company_sy": Common.getWithExpiry("company_sy")
      }
      if (this.TextUpperCase == '1') {
        model = this.ConvertKeysToUpperCase(model);
      }
      this.submitshow = false;
      this.sendMessage('start');
      this.checkoutService.FinalizeOrder1(model).subscribe((res: any) => {
      this.sendMessage('stop');
        this.orderno = res;
        this.toastr.success("Your Quote is submitted successfully. No:" + this.orderno)
        this.isSubmitted = true;
        this.DeletewishlistByID(this.currentwishlist.WishlistID);
        this.router.navigate(["/order-management/pending-order"]);
      });
    }
  }
}
