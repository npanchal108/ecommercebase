import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Common, Guid } from '../model/common.model';
import { CheckoutService } from '../services/checkout.service';
import { RoutingState } from '../services/routingState';
import { CartService } from '../services/cart.service';
import * as arraySort from 'array-sort'
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from '../services/registration.service';
import { ContactService } from '../services/contact.service';

// import { DatepickerOptions } from 'ng2-datepicker';
import { SEOService } from '../services/seo.service';
import { LoadingService } from '../services/loading.service';
// import * as $ from 'jquery';

import * as parser from 'parse-address'
import { NavigationEnd, Router } from '@angular/router';
import { UntypedFormBuilder, NgForm } from '@angular/forms';
//import * as moment from 'moment';
import { IDatePickerConfig } from 'ng2-date-picker';
import { DEF_CONF } from '../model/consts';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
//import { AddressvalidationpopupComponent } from '../addressvalidationpopup/addressvalidationpopup.component';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
//import { ShipToAddressPopupComponent } from './shiptoaddresspopup.component';
//import { CreditCardAddrsPopupComponent } from './creditcardaddrspopup.component';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
    CreditCardSetting: any;
    getyearlist: any = [];
    billAdr: any;
    shiptoadd: any;
    shipAdr: any = [];
    paymentType: any = [];
    shipFOB: any = [];
    head: any = {};
    cartProducts: any;
    cartTotal: number = 0;
    contactDtl: any;
    cityno: any;
    iscardfreeform: any = true;
    GuestUserID: any;
    showPayment: boolean = false;
    cardList: any = [];
    showShipAdd: boolean = false;
    isSubmitPermission: boolean = false;
    isReviewPermission: boolean = false;
    umdescrlist: any;
    isSubmitted: boolean = false;
    isshipviaaccountrequired: boolean = false;
    creditcardcode: any;
    shipId: string;
    shipName: string;
    ShipAttn: string;
    shipAddr1: string;
    shipAddr2: string;
    shipCity: string;
    shipState: string;
    shipZIP: string;
    shipCountry: string;
    billAdd1: string;
    billAdd2: string;
    billCity: string;
    priceshow: any;

    PriceRound: any;
    isbillingincard: boolean = false;
    isFormSubmitted: boolean;
    totalWeight: number = 0;
    frieght: number = 0;
    totalAmount: any = 0;
    webtype: any;
    IsLoginShow: any = '1';
    cardid: number;
    cardNo: string;
    code: string;
    shipText: string = "Add";
    cardText: string = "Add";
    cardstateList: any;
    iscardstateshow: any = true;
    shipMethod: number = 0;
    isShowShipTo: string;
    isShowWantedDate: string;
    isShowCanecelDate: string;
    isShowJobRelease: string;
    isShowPONumber: string;
    withloginprice: any;
    withloginpricelist: any;
    isLoggedIn: boolean = false;
    isShowContact: string;
    isShowEmail: string;
    isShowShipVia: string;
    isShowAccount: string;
    cardcountryList: any;
    isShowPayType: string;
    isShowNote: string;
    isShowPhone: string;
    isShowShipComplete: string;
    shipping: any = {};
    countryList: any = [];
    billcountryList: any = [];
    stateList: any = [];
    isstateshow: any = true;
    billstateList: any = [];
    billstateshow: any = true;
    frieghtcode: any;
    isAddShip: boolean = false;
    isPORequired: any;
    isWantedDateRequired: string;
    isCancelDateRequired: string;
    isJobReleaseRequired: string;
    isPhoneRequired: string;
    isShipCompleteRequired: string;
    isContactRequired: string;
    isEmailRequired: string;
    isPayTypeRequired: string;
    isShipViaRequired: string;
    isNoteRequired: string;
    isWantedVal: boolean = false;
    isCancelVal: boolean = false;
    isJobReleaseVal: boolean = false;
    isPhoneVal: boolean = false;
    isShipComVal: boolean = false;
    isContactVal: boolean = false;
    isenter_byVal: boolean = false;
    isEmailVal: boolean = false;
    isPayTypeVal: boolean = false;
    isShipViaVal: boolean = false;
    isNoteVal: boolean = false;
    isShowFreefrom: string;
    IsMuscle: any;
    isShowItemNote: any;
    shipProvince: boolean = false;
    customerdetails: any;
    israteshowforcu: any;
    isprofiledesc: any;
    web_order_min_amount: any;
    checkoutmsg: any;
    flagtosubmit: any = true;
    addr1val: any;
    addr2val: any;
    addr3val: any;
    addr4val: any;
    phoneval: any;
    cityno1: any;
    Addressval: any;
    cityval: any;
    getvalidation: any;
    postalvalidation: any;
    UrlWithFreeForm: any;
    UrlWithDetails: any;
    isumdescr: any;
    UserType: any;
    isaddressparse: string = '0';
    OrderNoteLable: any;
    cardtypelist: any;
    bulkPrice: any = [];
    Processwithzeroprice: any;
    priceshowcust: any;
    setdefaultRESIDENTIAL: any;
    DescrToShow: any;
    modifyshipto: any;
    ship_attn_required: any;
    blind_ship: any;
    blind_ship_defaultCheck: any;
    Enter_by: any;
    Guestwarehouse: any;
    warehouse: any;
    sameasbill: any = false;
    Enter_by_Lable: any;
    Enter_by_Required: any;
    Enter_by_Default: any;
    sameship: any;
    listprice: any;
    defvalues: any;
    logintype: any;
    ismultipleum: any;
    annavail: any;
    annastock: any;
    withoutloginavaillist: any;
    withloginavailshow: any;
    withloginavaillist: any;
    withloginavailqty: any;
    Multiplewarehouseforavaibility: any;
    addtonotavail: any;
    itemstoavails: string = '';
    IsDisablePayment: boolean = false;
    itlable: any;
    addnewqtywithnewlogic: any;
    JobReleaselable: any;
    config: IDatePickerConfig = {
        ...DEF_CONF,
        format: 'MM/DD/YYYY'
    };
    private _routerSub = Subscription.EMPTY;
    drop_ship: any;
    iskyraden: any;
    creditcardlimit: any = 10000;
    AMBIENTHAZARDOUSmarkup: any = 50;
    AMBIENTHAZARDOUSmarkup1: any = 150;
    COLDHAZARDOUSmarkup: any = 150;
    FROZENHAZARDOUSmarkup: any = 150;
    airsetting: any = 1;
    kraydenwarehouse: any = [];
    kraydenwhqty: any = [];
    addressList: any[];
    selectedAddress: string;
    isPostalCodeValid: boolean = false;
    newArray: any[] = [];
    SelectedFile: File = null;
    filename: any;
    isorderfraudcheck: boolean = true;
    IsShipment: boolean = false;
    orderfraudmsg: any;
    iscasafina:any;
    wanterdatelable:any;
    constructor(public dialog: MatDialog, private gtmService: GoogleTagManagerService, private formBuilder: UntypedFormBuilder, el: ElementRef, private renderer: Renderer2, private contactService: ContactService, private seoService: SEOService, private loadingService: LoadingService, private routingState: RoutingState, private toastr: ToastrService, private dataService: DataService, private checkoutService: CheckoutService, private cartService: CartService, private router: Router,
        private registerService: RegistrationService) {
        this.iskyraden = environment.iskyraden;
        this.iscasafina=environment.iscasafina;
        this.wanterdatelable=environment.wanted_date;
        this._routerSub = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd))
            .subscribe((value) => {
                if (this.router.url != "/checkout" && this.routingState.getPreviousUrl() == "/checkout" && this.router.url != "/login") {
                    this.SaveOrder()
                }
                
            });
        for (var i = 0; i <= 10; i++) {
            var getyea = new Date();
            var years = getyea.getFullYear() + i;
            this.getyearlist.push(years);
        }
        this.logintype = this.dataService.Getconfigbykey('logintype');
        this.UserType = Common.getWithExpiry("UserType");
        if (this.UserType == 4) {
            //this.billAdr.selectedcountry = "US";
            this.getbillCountry();
        }
        if (Common.getWithExpiry("CustID") == undefined || Common.getWithExpiry("CustID") == null || Common.getWithExpiry("CustID") == '') {
            this.head = [];

            this.billAdr = [];
            this.UserType = 4;
            this.isShowFreefrom = '1';
            this.getGuestUserID();
            this.getGuestwarehouse();
            this.getbillCountry();
            this.getitlableconfig();
            //this.getcardCountry();
            //this.getcardStates("US");
            this.getbillStates("US");
            this.head.ship_to = "-1";
            this.head.shipnote = '';
            this.shipAddressChange("-1");
            this.head.CardNo = "-1";
            this.cardChanged(this.head.CardNo);



        }
        else {
            this.isLoggedIn = true;
            this.getwithloginprice();
            this.warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
        }
        this.israteshowforcu = true;
        var geturl = Common.getWithExpiry("cpname");
        this.seoService.setPageTitle('Checkout - ' + geturl);
        this.seoService.setkeywords('Checkout - ' + geturl);
        this.seoService.setdescription('Checkout - ' + geturl);
        this.GetJobReleaselable()
        this.Getorderfraudmsg();
        this.getumdescrconfig();
        this.getcreditcardlimit();
        this.GetConfigForsameship();
        this.getShipingAddress();
        this.getDescrToShow();
        this.getEnter_by_Default();
        this.getEnter_by();
        this.GetConfigformodifyshipto();
        this.Getship_attn_required();
        this.Getblind_ship();
        this.GetsetdefaultRESIDENTIAL();
        this.GetConfigurationforProcesswithzeroprice();
        this.getContactDtl();
        this.getBillingAddress();
        this.getOrderNoteLable();
        this.getisprofiledesc();
        this.cofigurtiondfordrop_ship();
        this.GetMinOrdervalue();
        this.GetconfigurationfroAddressParser();
        this.getCreditCardSetting();
        this.getconfigforcheckoutmsg();
        this.getUrlWithDetails();
        this.showpricetocustomers();
        this.getnewpermissionconfig();
        this.getmultipleum();
        this.GetpriceRoundingsetting();
        this.getpriceshow();
        this.Getconfigurationfrieghtcode();
        this.getaddtonotavail();
        this.getannavail();
        this.GetMultiplewarehouseforavaibility();
        this.getwithloginavailshow();
        this.getIsDisablePayment();
        this.GetDefaultValues();
        this.Getaddnewqtywithnewlogic();
    }



    tagmanager() {
        try{
        var item = [];
        var total = this.getfinaltotal();
        for (var i = 0; i < this.cartProducts.length; i++) {
            item.push({ "item_id": this.cartProducts[i].itemname, "item_name": this.cartProducts[i].itemname, "item_brand": this.cartProducts[i].links, "item_category": this.cartProducts[i].prod_line, "item_category2": this.cartProducts[i].itemname, "item_list_id": "", "item_list_name": this.cartProducts[i].itemname, "price": this.cartProducts[i].PricePer, "quantity": this.cartProducts[i].Quantity })
        }
        var gtmTag = {
            event: 'begin_checkout',
            ecommerce: {
                currency: "USD",
                value: total,
                items: item
            }
        };
        console.log('gtmService',gtmTag);
        this.gtmService.pushTag(gtmTag);
    }catch(ex){
        console.log(ex.toString());
    }
    }


    add_payment_info() {
        try{
        var item = [];
        var total = this.getfinaltotal();
        for (var i = 0; i < this.cartProducts.length; i++) {
            item.push({ "item_id": this.cartProducts[i].itemname, "item_name": this.cartProducts[i].itemname, "item_brand": this.cartProducts[i].links, "item_category": this.cartProducts[i].prod_line, "item_category2": this.cartProducts[i].itemname, "item_list_id": "", "item_list_name": this.cartProducts[i].itemname, "price": this.cartProducts[i].PricePer, "quantity": this.cartProducts[i].Quantity })
        }
        var gtmTag = {
            event: 'add_payment_info',
            ecommerce: {
                currency: "USD",
                value: total,
                payment_type: "Credit Card",
                items: item
            }
        };
        console.log('gtmService',gtmTag);
        this.gtmService.pushTag(gtmTag);
    }catch(ex){
        console.log(ex.toString());
    }
    }
    select_payment_info() {
        
        try{
        var item = [];
        var total = this.getfinaltotal();
        for (var i = 0; i < this.cartProducts.length; i++) {
            item.push({ "item_id": this.cartProducts[i].itemname, "item_name": this.cartProducts[i].itemname, "item_brand": this.cartProducts[i].links, "item_category": this.cartProducts[i].prod_line, "item_category2": this.cartProducts[i].itemname, "item_list_id": "", "item_list_name": this.cartProducts[i].itemname, "price": this.cartProducts[i].PricePer, "quantity": this.cartProducts[i].Quantity })
        }
        var gtmTag = {
            event: 'select_payment_info',
            ecommerce: {
                currency: "USD",
                value: total,
                payment_type: "Credit Card",
                items: item
            }
        };
        console.log('gtmService',gtmTag);
        this.gtmService.pushTag(gtmTag);
    }catch(ex){
        console.log(ex.toString());
    }

    }

    add_shipping_info() {
        try{
        var item = [];
        var total = this.getfinaltotal();
        for (var i = 0; i < this.cartProducts.length; i++) {
            item.push({ "item_id": this.cartProducts[i].itemname, "item_name": this.cartProducts[i].itemname, "item_brand": this.cartProducts[i].links, "item_category": this.cartProducts[i].prod_line, "item_category2": this.cartProducts[i].itemname, "item_list_id": "", "item_list_name": this.cartProducts[i].itemname, "price": this.cartProducts[i].PricePer, "quantity": this.cartProducts[i].Quantity })
        }
        var gtmTag = {
            event: 'add_shipping_info',
            ecommerce: {
                currency: "USD",
                value: total,
                shipping_tier: this.head.ShipFOB,
                items: item
            }
        };
        console.log('gtmService',gtmTag);
        this.gtmService.pushTag(gtmTag);
    }catch(ex){
        console.log(ex.toString());
    }
    }
    select_shipping_info() {
        
        try{
        var item = [];
        var total = this.getfinaltotal();
        for (var i = 0; i < this.cartProducts.length; i++) {
            item.push({ "item_id": this.cartProducts[i].itemname, "item_name": this.cartProducts[i].itemname, "item_brand": this.cartProducts[i].links, "item_category": this.cartProducts[i].prod_line, "item_category2": this.cartProducts[i].itemname, "item_list_id": "", "item_list_name": this.cartProducts[i].itemname, "price": this.cartProducts[i].PricePer, "quantity": this.cartProducts[i].Quantity })
        }
        var gtmTag = {
            event: 'select_shipping_info',
            ecommerce: {
                currency: "USD",
                value: total,
                shipping_tier: this.head.ShipFOB,
                items: item
            }
        };
        console.log('gtmService',gtmTag);
        this.gtmService.pushTag(gtmTag);
    }catch(ex){
        console.log(ex.toString());
    }

    }

    // public loadScript() {
    //     let body = <HTMLDivElement>document.body;
    //     //const element = this.renderer.selectRootElement("pt_hpf_form");
    //     let script = document.createElement('script');
    //     script.innerHTML = "";
    //     script.src = 'assets/js/protectnew.js';
    //     script.async = false;
    //     script.defer = false;
    //     body.appendChild(script);
    //   }
    togglePostalCodeFlag() {
        if (this.iskyraden) {
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
                // const dialogRef = this.dialog.open(AddressvalidationpopupComponent, {
                //     data: { userList: this.newArray },
                //     width: '600px',
                // });

                // dialogRef.afterClosed().subscribe(result => {
                //     if (result) {
                //         this.isPostalCodeValid = true;
                //         this.shipping.Addr1 = result.addressLine1;
                //         this.shipping.Addr2 = result.addressLine2;
                //         this.shipping.PostalCode = result.postalCode;
                //         this.shipping.City = result.city;
                //     }
                // });
            }
            else if (this.addressList.length == 1) {
                this.shipping.Addr1 = Array.isArray(this.addressList[0].AddressKeyFormat.AddressLine) ? this.addressList[0].AddressKeyFormat.AddressLine[0] : this.addressList[0].AddressKeyFormat.AddressLine,
                    this.shipping.Addr2 = Array.isArray(this.addressList[0].AddressKeyFormat.AddressLine) && this.addressList[0].AddressKeyFormat.AddressLine.length > 1 ? this.addressList[0].AddressKeyFormat.AddressLine[1] : "",
                    this.shipping.city = this.addressList[0].AddressKeyFormat.PoliticalDivision2;
                this.shipping.PostalCode = `${this.addressList[0].AddressKeyFormat.PostcodePrimaryLow}-${this.addressList[0].AddressKeyFormat.PostcodeExtendedLow}`;
                this.isPostalCodeValid = true;
            } else {
                this.isPostalCodeValid = false;
                this.toastr.error("Enter Valid Postalcode", 'Message!');
                return;
            }
        })
    }
    openCreditAddressPopup(): void {
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
        this.cardid = this.cardid == undefined ? 0 : this.cardid;
        // const dialogRef = this.dialog.open(CreditCardAddrsPopupComponent, {
        //     data: { billingAddress: billingAddress,cardId :  this.cardid,cType:'1'},
        //     width: '800px'
        // });

        // dialogRef.afterClosed().subscribe(async(result) => {
        //     if (result) {
        //         this.cardList = [];
        //         this.add_payment_info();
        //         await this.getCardDetails(true);
        //         this.head.CardNo = result;
        //         this.cardChanged(result);
        //     }
        // });
    }
    openShippingAddressPopup(addModifyFlag): void {
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
        // const dialogRef = this.dialog.open(ShipToAddressPopupComponent, {
        //     data: { billingAddress: billingAddress,modifyShipId :  modifyShipId},
        //     width: '800px',
        //     // height:'0px'
        // });

        // dialogRef.afterClosed().subscribe(async(result) => {
        //     if (result) {
        //       await this.getShipingAddress(result);
        //       this.shipAddressChange(result);
        //       this.add_shipping_info();
        //     }
        //   });
    }
    Getaddnewqtywithnewlogic() {
        this.addnewqtywithnewlogic = this.dataService.Getconfigbykey("addnewqtywithnewlogic");
        if (this.addnewqtywithnewlogic == null || this.addnewqtywithnewlogic == undefined || this.addnewqtywithnewlogic == '') {
            this.addnewqtywithnewlogic = Common.getWithExpiry("addnewqtywithnewlogic");
        }
        if (this.addnewqtywithnewlogic == null || this.addnewqtywithnewlogic == undefined || this.addnewqtywithnewlogic == '') {
            this.dataService.Getaddnewqtywithnewlogic().subscribe((data: any) => {
                this.addnewqtywithnewlogic = data;
                Common.setWithExpiry("addnewqtywithnewlogic", this.addnewqtywithnewlogic);

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
    getcreditcardlimit() {
        this.creditcardlimit = this.dataService.Getconfigbykey("creditcardlimit");
        if (this.creditcardlimit == null || this.creditcardlimit == undefined || this.creditcardlimit == '') {
            this.creditcardlimit = Common.getWithExpiry("creditcardlimit");
        }
        if (this.creditcardlimit == null || this.creditcardlimit == undefined || this.creditcardlimit == '') {
            this.creditcardlimit = 10000;
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
                Common.setWithExpiry("JobReleaselable", this.JobReleaselable);
            });
        }
    }
    Getorderfraudmsg() {
        this.orderfraudmsg = this.dataService.Getconfigbykey("orderfraudmsg");
        if (this.orderfraudmsg == null || this.orderfraudmsg == undefined || this.orderfraudmsg == '') {
            this.orderfraudmsg = Common.getWithExpiry("orderfraudmsg");
        }
        if (this.orderfraudmsg == null || this.orderfraudmsg == undefined || this.orderfraudmsg == '') {
            this.dataService.Getorderfraudmsg().subscribe((res: any) => {
                this.orderfraudmsg = res;
                Common.setWithExpiry("orderfraudmsg", this.orderfraudmsg);
            });
        }
    }
    getaddtonotavail() {
        this.addtonotavail = this.dataService.Getconfigbykey("addifunavail");
        if (this.addtonotavail == null || this.addtonotavail == undefined || this.addtonotavail == '') {
            this.addtonotavail = Common.getWithExpiry("addifunavail");
        }
        if (this.addtonotavail == null || this.addtonotavail == undefined || this.addtonotavail == '') {
            this.dataService.GetConfigForisaddifunavail().subscribe((res: any) => {
                this.addtonotavail = res;
                Common.setWithExpiry("addifunavail", this.addtonotavail);
            });
        }
    }
    getwithloginavailshow() {
        this.withloginavailshow = this.dataService.Getconfigbykey("withloginavailshow");
        if (this.withloginavailshow == null || this.withloginavailshow == undefined || this.withloginavailshow == '') {
            this.withloginavailshow = Common.getWithExpiry("withloginavailshow");
        }
        if (this.withloginavailshow == null || this.withloginavailshow == undefined || this.withloginavailshow == '') {
            this.dataService.withloginavailshow().subscribe((res: any) => {
                this.withloginavailshow = res;
                Common.setWithExpiry("withloginavailshow", this.withloginavailshow);
                if (this.withloginavailshow == '1') {
                    this.getwithloginavaillist();
                    this.getwithloginavailqty();
                }
            });
        }
        else {
            if (this.withloginavailshow == '1') {
                this.getwithloginavaillist();
                this.getwithloginavailqty();
            }
        }
    }
    cofigurtiondfordrop_ship() {
        this.drop_ship = this.dataService.Getconfigbykey("drop_ship");
        if (this.drop_ship == null || this.drop_ship == undefined || this.drop_ship == '') {
            this.drop_ship = Common.getWithExpiry("drop_ship");
        }
        if (this.drop_ship == null || this.drop_ship == undefined) {
            this.dataService.cofigurtiondfordrop_ship().subscribe((data: any) => {
                this.drop_ship = data;
                Common.setWithExpiry("drop_ship", this.drop_ship);
            })
        }

    }
    getwithloginavaillist() {
        this.withloginavaillist = this.dataService.Getconfigbykey("withloginavaillist");
        if (this.withloginavaillist == null || this.withloginavaillist == undefined || this.withloginavaillist == '') {
            this.withloginavaillist = Common.getWithExpiry("withloginavaillist");
        }
        if (this.withloginavaillist == null || this.withloginavaillist == undefined || this.withloginavaillist == '') {
            this.dataService.withloginavaillist().subscribe((res: any) => {
                this.withloginavaillist = res;
                Common.setWithExpiry("withloginavaillist", this.withloginavaillist);
            });
        }
    }
    getwithloginavailqty() {
        this.withloginavailqty = this.dataService.Getconfigbykey("withloginavailqty");
        if (this.withloginavailqty == null || this.withloginavailqty == undefined || this.withloginavailqty == '') {
            this.withloginavailqty = Common.getWithExpiry("withloginavailqty");
        }
        if (this.withloginavailqty == null || this.withloginavailqty == undefined || this.withloginavailqty == '') {
            this.dataService.withloginavailqty().subscribe((res: any) => {
                this.withloginavailqty = res;
                Common.setWithExpiry("withloginavailqty", this.withloginavailqty);
            });
        }
    }
    GetMultiplewarehouseforavaibility() {
        this.Multiplewarehouseforavaibility = this.dataService.Getconfigbykey("Multiplewarehouseforavaibility");
        if (this.Multiplewarehouseforavaibility == null || this.Multiplewarehouseforavaibility == undefined || this.Multiplewarehouseforavaibility == '') {
            this.Multiplewarehouseforavaibility = Common.getWithExpiry("Multiplewarehouseforavaibility");
        }
        if (this.Multiplewarehouseforavaibility == null || this.Multiplewarehouseforavaibility == undefined || this.Multiplewarehouseforavaibility == '') {
            this.dataService.GetMultiplewarehouseforavaibility().subscribe((data: any) => {
                this.Multiplewarehouseforavaibility = data;
                Common.setWithExpiry("Multiplewarehouseforavaibility", this.Multiplewarehouseforavaibility);
            });
        }
    }
    getannavail() {
        this.annavail = this.dataService.Getconfigbykey("withoutloginavailshow");
        if (this.annavail == null || this.annavail == undefined || this.annavail == '') {
            this.annavail = Common.getWithExpiry("annavail");
        }
        if (this.annavail == null || this.annavail == undefined || this.annavail == '') {
            this.dataService.anonymoususersavailable().subscribe((res: any) => {
                this.annavail = res;
                Common.setWithExpiry("annavail", this.annavail);
                if (this.annavail == '1') {
                    this.getannastock();
                    this.getwithoutloginavaillist();
                }

            });
        }
        else {
            if (this.annavail == '1') {
                this.getannastock();
                this.getwithoutloginavaillist();
            }
        }
    }
    getannastock() {
        this.annastock = this.dataService.Getconfigbykey("withoutloginavailqty");
        if (this.annastock == null || this.annastock == undefined || this.annastock == '') {
            this.annastock = Common.getWithExpiry("annastock");
        }
        if (this.annastock == null || this.annastock == undefined || this.annastock == '') {
            this.dataService.anonymoususersIsstock().subscribe((res: any) => {
                this.annastock = res;
                Common.setWithExpiry("annastock", this.annastock);
            });
        }
    }
    getwithoutloginavaillist() {
        this.withoutloginavaillist = this.dataService.Getconfigbykey("withoutloginavaillist");
        if (this.withoutloginavaillist == null || this.withoutloginavaillist == undefined || this.withoutloginavaillist == '') {
            this.withoutloginavaillist = Common.getWithExpiry("withoutloginavaillist");
        }
        if (this.withoutloginavaillist == null || this.withoutloginavaillist == undefined || this.withoutloginavaillist == '') {
            this.dataService.withoutloginavaillist().subscribe((res: any) => {
                this.withoutloginavaillist = res;
                Common.setWithExpiry("withoutloginavaillist", this.withoutloginavaillist);
            });
        }
    }
    getpriceshow() {
        this.priceshow = this.dataService.Getconfigbykey("withoutloginpriceshow");
        if (this.priceshow == null || this.priceshow == undefined || this.priceshow == '') {
            this.priceshow = Common.getWithExpiry("priceshow");
        }
        if (this.priceshow == null || this.priceshow == undefined || this.priceshow == '') {
            this.dataService.GetConfidForanonymoususersPriceshow().subscribe((res: any) => {
                this.priceshow = res;
                Common.setWithExpiry("priceshow", this.priceshow);
                if (this.priceshow == '1') {
                    this.getlistprice();
                }

            });
        }
        else {
            if (this.priceshow == '1') {
                this.getlistprice();
            }
        }
    }
    getlistprice() {
        this.listprice = this.dataService.Getconfigbykey("withoutloginpricelist");
        if (this.listprice == null || this.listprice == undefined || this.listprice == '') {
            this.listprice = Common.getWithExpiry("listprice");
        }
        if (this.listprice == null || this.listprice == undefined || this.listprice == '') {
            this.dataService.GetConfidForlistprice().subscribe((res: any) => {
                this.listprice = res;
                Common.setWithExpiry("listprice", this.listprice);
            });
        }
    }
    GetpriceRoundingsetting() {
        this.PriceRound = this.dataService.Getconfigbykey("PriceRound");
        if (this.PriceRound == null || this.PriceRound == undefined || this.PriceRound == '') {
            this.PriceRound = Common.getWithExpiry("PriceRound");
        }
        if (this.PriceRound == null || this.PriceRound == undefined || this.PriceRound == '') {
            this.dataService.GetpriceRoundingsetting().subscribe((res: any) => {
                this.PriceRound = res;
                Common.setWithExpiry("PriceRound", this.PriceRound);
            });
        }
    }
    getwithloginprice() {
        this.withloginprice = this.dataService.Getconfigbykey("withloginprice");
        if (this.withloginprice == null || this.withloginprice == undefined || this.withloginprice == '') {
            this.withloginprice = Common.getWithExpiry("withloginprice");
        }
        if (this.withloginprice == null || this.withloginprice == undefined || this.withloginprice == '') {
            this.dataService.withloginprice().subscribe((res: any) => {
                this.withloginprice = res;
                Common.setWithExpiry("withloginprice", this.withloginprice);
                if (this.withloginprice == '1') {
                    this.getwithloginpricelist();
                }
            });
        }
        else {
            if (this.withloginprice == '1') {
                this.getwithloginpricelist();
            }
        }
    }
    getwithloginpricelist() {
        this.withloginpricelist = this.dataService.Getconfigbykey("withloginpricelist");
        if (this.withloginpricelist == null || this.withloginpricelist == undefined || this.withloginpricelist == '') {
            this.withloginpricelist = Common.getWithExpiry("withloginpricelist");
        }
        if (this.withloginpricelist == null || this.withloginpricelist == undefined || this.withloginpricelist == '') {
            this.dataService.withloginpricelist().subscribe((res: any) => {
                this.withloginpricelist = res;
                Common.setWithExpiry("withloginpricelist", this.withloginpricelist);
            });
        }
    }

    getmultipleum() {
        this.ismultipleum = this.dataService.Getconfigbykey("ismultium");
        if (this.ismultipleum == null || this.ismultipleum == undefined || this.ismultipleum == '') {
            this.ismultipleum = Common.getWithExpiry("ismultipleum");
        }
        if (this.ismultipleum == null || this.ismultipleum == undefined || this.ismultipleum == '') {
            this.dataService.Allowmultipleum().subscribe((res: any) => {
                this.ismultipleum = res;
                Common.setWithExpiry("ismultipleum", this.ismultipleum);
            });
        }
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
                    else if (Common.getWithExpiry("SalesUserType") == '2') {
                        var subuser = Common.getWithExpiry("subuser").toString();
                        if (subuser != undefined && subuser != '') {
                            var permissions = Common.getWithExpiry("Permission").split(';');
                            if (permissions.indexOf("SP") != -1) {
                                this.israteshowforcu = true;
                            }
                            else {
                                this.israteshowforcu = false;
                            }
                        }
                        else {
                            this.israteshowforcu = true;
                        }
                    }
                    else {
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
                    else if (Common.getWithExpiry("SalesUserType") == '2') {
                        var subuser = Common.getWithExpiry("subuser").toString();
                        if (subuser != undefined && subuser != '') {
                            var permissions = Common.getWithExpiry("Permission").split(';');
                            if (permissions.indexOf("SP") != -1) {
                                this.israteshowforcu = true;
                            }
                            else {
                                this.israteshowforcu = false;
                            }
                        }
                        else {
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
                else if (Common.getWithExpiry("SalesUserType") == '2') {
                    var subuser = Common.getWithExpiry("subuser").toString();
                    if (subuser != undefined && subuser != '') {
                        var permissions = Common.getWithExpiry("Permission").split(';');
                        if (permissions.indexOf("SP") != -1) {
                            this.israteshowforcu = true;
                        }
                        else {
                            this.israteshowforcu = false;
                        }
                    }
                    else {
                        this.israteshowforcu = true;
                    }
                }
                else {
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
                else if (Common.getWithExpiry("SalesUserType") == '2') {
                    var subuser = Common.getWithExpiry("subuser").toString();
                    if (subuser != undefined && subuser != '') {
                        var permissions = Common.getWithExpiry("Permission").split(';');
                        if (permissions.indexOf("SP") != -1) {
                            this.israteshowforcu = true;
                        }
                        else {
                            this.israteshowforcu = false;
                        }
                    }
                    else {
                        this.israteshowforcu = true;
                    }
                }
                else {
                    this.israteshowforcu = true;
                }
            }
        }
    }


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
        this.Processwithzeroprice = this.dataService.Getconfigbykey("beforepricelableinproductlist");
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


    sameasbillinginfo() {

        if (this.sameasbill) {
            this.shipping.ShipName = this.billAdr.name;
            this.shipping.ShipAttn = this.billAdr.name;
            this.shipping.phone = this.billAdr.phone;
            this.shipping.Addr1 = this.billAdr.Addr1;
            this.shipping.Addr2 = this.billAdr.Addr2;
            this.shipping.selectedCountry = this.billAdr.selectedcountry;
            this.shipping.selectedState = this.billAdr.selectedState;
            this.shipping.City = this.billAdr.City;
            this.shipping.PostalCode = this.billAdr.PostalCode;
        }
        else {
            this.shipping.ShipName = "";
            this.shipping.ShipAttn = "";
            this.shipping.phone = "";
            this.shipping.Addr1 = "";
            this.shipping.Addr2 = "";
            this.shipping.selectedCountry = "US";
            this.shipping.selectedState = "";
            this.shipping.City = "";
            this.shipping.PostalCode = "";
        }
        this.calculateShipRate();
    }


    ngOnDestroy() {
        this._routerSub.unsubscribe();
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
    getDescrToShow() {
        this.DescrToShow = this.dataService.Getconfigbykey("DescrToShow");
        if (this.DescrToShow == null || this.DescrToShow == undefined || this.DescrToShow == '') {
            this.DescrToShow = Common.getWithExpiry("DescrToShow");
        }
        if (this.DescrToShow == null || this.DescrToShow == undefined || this.DescrToShow == '') {
            this.dataService.GetDescrToShow().subscribe((data: any) => {
                this.DescrToShow = data;
                Common.setWithExpiry("DescrToShow", this.DescrToShow);
            });
        }
    }
    GetConfigForsameship() {
        this.sameship = this.dataService.Getconfigbykey("sameship");
        if (this.sameship == null || this.sameship == undefined || this.sameship == '') {
            this.sameship = Common.getWithExpiry("sameship");
        }
        if (this.sameship == null || this.sameship == undefined || this.sameship == '') {
            this.dataService.GetConfigForsameship().subscribe((data: any) => {
                this.sameship = data;
                Common.setWithExpiry("sameship", this.sameship);
            });
        }
    }
    Getconfigurationfrieghtcode() {
        this.frieghtcode = this.dataService.Getconfigbykey("frieghtcode");
        if (this.frieghtcode == null || this.frieghtcode == undefined || this.frieghtcode == '') {
            this.frieghtcode = Common.getWithExpiry("frieghtcode");
        }
        if (this.frieghtcode == null || this.frieghtcode == undefined || this.frieghtcode == '') {
            this.dataService.Getconfigurationfrieghtcode().subscribe((data: any) => {
                this.frieghtcode = data;
                Common.setWithExpiry("frieghtcode", this.frieghtcode);
            });
        }
    }
    getEnter_by_Default() {
        this.Enter_by_Default = this.dataService.Getconfigbykey("Enter_by_Default");
        if (this.Enter_by_Default == null || this.Enter_by_Default == undefined || this.Enter_by_Default == '') {
            this.Enter_by_Default = Common.getWithExpiry("Enter_by_Default");
        }
        else {
            this.head.enter_by = this.Enter_by_Default;
        }
        if (this.Enter_by_Default == null || this.Enter_by_Default == undefined || this.Enter_by_Default == '') {
            this.dataService.GetEnter_by_Default().subscribe((data: any) => {
                this.Enter_by_Default = data;
                Common.setWithExpiry("Enter_by_Default", this.Enter_by_Default);
                this.head.enter_by = this.Enter_by_Default;
            });
        }
        else {
            this.head.enter_by = this.Enter_by_Default;
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
    getIsDisablePayment() {
        var IsDisablePayment = this.dataService.Getconfigbykey("IsDisablePayment");
        if (IsDisablePayment == null || IsDisablePayment == undefined || IsDisablePayment == '') {
            IsDisablePayment = Common.getWithExpiry("IsDisablePayment");
        }
        else {
            this.IsDisablePayment = (IsDisablePayment == '1' ? true : false);
        }
        if (IsDisablePayment == null || IsDisablePayment == undefined || IsDisablePayment == '') {
            this.dataService.GetconfigurationforIsDisablePayment().subscribe((data: any) => {
                IsDisablePayment = data;
                this.IsDisablePayment = (IsDisablePayment == '1' ? true : false);
                Common.setWithExpiry("IsDisablePayment", this.IsDisablePayment.toString());

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
    Getship_attn_required() {
        this.ship_attn_required = this.dataService.Getconfigbykey("ship_attn_required");
        if (this.ship_attn_required == null || this.ship_attn_required == undefined || this.ship_attn_required == '') {
            this.ship_attn_required = Common.getWithExpiry("ship_attn_required");
        }
        if (this.ship_attn_required == null || this.ship_attn_required == undefined || this.ship_attn_required == '') {
            this.dataService.Getship_attn_required().subscribe((data: any) => {
                this.ship_attn_required = data;
                Common.setWithExpiry("ship_attn_required", this.ship_attn_required);
            });
        }
    }
    Getblind_ship() {
        this.blind_ship = this.dataService.Getconfigbykey("blind_ship");
        if (this.blind_ship == null || this.blind_ship == undefined || this.blind_ship == '') {
            this.blind_ship = Common.getWithExpiry("blind_ship");
        }
        if (this.blind_ship == null || this.blind_ship == undefined || this.blind_ship == '') {
            this.dataService.Getblind_ship().subscribe((data: any) => {
                this.blind_ship = data;
                Common.setWithExpiry("blind_ship", this.blind_ship);
                if (this.blind_ship == '1') {
                    this.Getblind_ship_defaultCheck();
                }
            });
        }
        else {
            if (this.blind_ship == '1') {
                this.Getblind_ship_defaultCheck();
            }
        }
    }
    Getblind_ship_defaultCheck() {
        this.blind_ship_defaultCheck = this.dataService.Getconfigbykey("blind_ship_defaultCheck");
        if (this.blind_ship_defaultCheck == null || this.blind_ship_defaultCheck == undefined || this.blind_ship_defaultCheck == '') {
            this.blind_ship_defaultCheck = Common.getWithExpiry("blind_ship_defaultCheck");
        }
        else {
            if (this.blind_ship_defaultCheck == '1') {
                this.shipping.blind_ship = true;
            }
            else {
                this.shipping.blind_ship = false;
            }
        }
        if (this.blind_ship_defaultCheck == null || this.blind_ship_defaultCheck == undefined || this.blind_ship_defaultCheck == '') {
            this.dataService.Getblind_ship_defaultCheck().subscribe((data: any) => {
                this.blind_ship_defaultCheck = data;
                Common.setWithExpiry("blind_ship_defaultCheck", this.blind_ship_defaultCheck);
                if (this.blind_ship_defaultCheck == '1') {
                    this.shipping.blind_ship = true;
                }
                else {
                    this.shipping.blind_ship = false;
                }
            });
        }
        else {
            if (this.blind_ship_defaultCheck == '1') {
                this.shipping.blind_ship = true;
            }
            else {
                this.shipping.blind_ship = false;
            }
        }
    }
    GetsetdefaultRESIDENTIAL() {
        this.setdefaultRESIDENTIAL = this.dataService.Getconfigbykey("setdefaultRESIDENTIAL");
        if (this.setdefaultRESIDENTIAL == null || this.setdefaultRESIDENTIAL == undefined || this.setdefaultRESIDENTIAL == '') {
            this.setdefaultRESIDENTIAL = Common.getWithExpiry("setdefaultRESIDENTIAL");
        }
        if (this.setdefaultRESIDENTIAL == null || this.setdefaultRESIDENTIAL == undefined || this.setdefaultRESIDENTIAL == '') {
            this.dataService.GetsetdefaultRESIDENTIAL().subscribe((res: any) => {
                this.setdefaultRESIDENTIAL = res;
                Common.setWithExpiry("setdefaultRESIDENTIAL", this.setdefaultRESIDENTIAL);
                if (this.setdefaultRESIDENTIAL == '1') {
                    this.shipping.Residential = true;
                }
            });
        }
        else {
            if (this.setdefaultRESIDENTIAL == '1') {
                this.shipping.Residential = true;
            }
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
    sendMessage(message): void {
        this.loadingService.LoadingMessage(message);
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
                if (this.cityno1 == 3 || this.cityno1 == '3') {
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
    gototop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
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
    findandreplace(stringval) {
        try {
            stringval = stringval.trim();
            stringval = stringval.replace(new RegExp("\/", "g"), '');
            stringval = stringval.replace(new RegExp("#", "g"), '');
        } catch (ed) { }
        return stringval;
    }
    isValidCard(card) {
        var re = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        return re.test(String(card).toLowerCase());
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
    addreparser() {
        if (this.head.cardaddressparser == undefined || this.head.cardaddressparser == null || this.head.cardaddressparser == '') {
            this.toastr.error("Please enter address first");
        }
        else {
            var parsed = parser.parseLocation(this.head.cardaddressparser);
            this.head.cardDetailadr1 = (parsed.number == undefined ? "" : parsed.number) + ' ' + (parsed.prefix == undefined ? "" : parsed.prefix) + ' ' + (parsed.street == undefined ? "" : parsed.street) + ' ' + (parsed.type == undefined ? "" : parsed.type);
            this.head.cardDetailcity = parsed.city;
            this.head.cardDetailselectedState = parsed.state.toUpperCase();
            this.head.cardDetailzip = parsed.zip;
            // $("#cardAddress1").val((parsed.number == undefined ? "" : parsed.number) + ' ' + (parsed.prefix == undefined ? "" : parsed.prefix) + ' ' + (parsed.street == undefined ? "" : parsed.street) + ' ' + (parsed.type == undefined ? "" : parsed.type));
            // $("#cardCity").val(parsed.city);
            // $("#cardState").val(parsed.state);
            // $("#cardZip").val(parsed.zip);
        }
    }
    shippingaddreparser() {
        if (this.shipping.addressparser == undefined || this.shipping.addressparser == null || this.shipping.addressparser == '') {
            this.toastr.error("Please enter address first");
        }
        else {
            var parsed = parser.parseLocation(this.shipping.addressparser);
            this.shipping.Addr1 = (parsed.number == undefined ? "" : parsed.number) + ' ' + (parsed.prefix == undefined ? "" : parsed.prefix) + ' ' + (parsed.street == undefined ? "" : parsed.street) + ' ' + (parsed.type == undefined ? "" : parsed.type);
            this.shipping.City = parsed.city;
            this.shipping.selectedState = parsed.state.toUpperCase();
            this.shipping.PostalCode = parsed.zip;
            // $("#shippingAddr1").val((parsed.number == undefined ? "" : parsed.number) + ' ' + (parsed.prefix == undefined ? "" : parsed.prefix) + ' ' + (parsed.street == undefined ? "" : parsed.street) + ' ' + (parsed.type == undefined ? "" : parsed.type));
            // $("#shippingCity").val(parsed.city);
            // $("#shippingState").val(parsed.state);
            // $("#shippingPostalCode").val(parsed.zip);            
        }
    }
    billAdraddreparser() {
        if (this.billAdr.addressparser == undefined || this.billAdr.addressparser == null || this.billAdr.addressparser == '') {
            this.toastr.error("Please enter address first");
        }
        else {
            var parsed = parser.parseLocation(this.billAdr.addressparser);
            this.billAdr.Addr1 = (parsed.number == undefined ? "" : parsed.number) + ' ' + (parsed.prefix == undefined ? "" : parsed.prefix) + ' ' + (parsed.street == undefined ? "" : parsed.street) + ' ' + (parsed.type == undefined ? "" : parsed.type);
            this.billAdr.City = parsed.city;
            this.billAdr.selectedState = parsed.state.toUpperCase();
            this.billAdr.PostalCode = parsed.zip;
            // $("#billAdrAddress1").val((parsed.number == undefined ? "" : parsed.number) + ' ' + (parsed.prefix == undefined ? "" : parsed.prefix) + ' ' + (parsed.street == undefined ? "" : parsed.street) + ' ' + (parsed.type == undefined ? "" : parsed.type));
            // $("#billAdrCity").val(parsed.city);
            // $("#billAdrState").val(parsed.state);
            // $("#billAdrPostalCode").val(parsed.zip);

        }
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
    SetCardAddress() {
        if (this.isbillingincard) {
            if (this.UserType != 4) {
                this.head.cardDetailadr1 = this.billAdr.adr[0];
                this.head.cardDetailadr2 = this.billAdr.adr[1];
                this.head.cardDetailselectedCountry = this.billAdr.country_code;
                this.head.cardDetailselectedState = this.billAdr.state;
                if (this.cityno == 4) {
                    this.head.cardDetailcity = this.billAdr.adr[3];
                }
                else {
                    this.head.cardDetailcity = this.billAdr.adr[2];
                }
                this.head.cardDetailzip = this.billAdr.postal_code;
                this.head.cardDetailEmail = this.billAdr.email_address;
                this.head.profileid = '';
            }
            else {
                this.head.cardDetailadr1 = this.billAdr.Addr1;
                this.head.cardDetailadr2 = this.billAdr.Addr2;
                this.head.cardDetailselectedCountry = this.billAdr.selectedcountry;
                this.head.cardDetailselectedState = this.billAdr.selectedState;
                this.head.cardDetailcity = this.billAdr.City;
                this.head.cardDetailzip = this.billAdr.PostalCode;
                this.head.cardDetailEmail = this.billAdr.email_address;
                this.head.profileid = '';
            }
        }
        else {
            this.head.cardDetailadr1 = '';
            this.head.cardDetailadr2 = '';
            this.head.cardDetailselectedCountry = 'US';
            this.head.cardDetailselectedState = '';
            this.head.cardDetailcity = '';
            this.head.cardDetailzip = '';
            this.head.cardDetailEmail = '';
            this.head.profileid = '';
        }
    }
    GetSubmitTempOrderConfig() {
        var SubmitTempOrder = this.dataService.Getconfigbykey("SubmitTempOrder");
        if (SubmitTempOrder == null || SubmitTempOrder == undefined || SubmitTempOrder == '') {
            SubmitTempOrder = Common.getWithExpiry("SubmitTempOrder");
        }
        if (SubmitTempOrder == null || SubmitTempOrder == undefined || SubmitTempOrder == '') {
            this.dataService.GetSubmitTempOrderConfig().subscribe((res: any) => {
                SubmitTempOrder = res;
                Common.setWithExpiry("SubmitTempOrder", SubmitTempOrder);
            });
        }
    }
    ngOnInit() {
        this.cardText = 'Add';
        this.webtype = this.dataService.Getconfigbykey("websitetype");
        if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
            this.webtype = Common.getWithExpiry("WebsiteType");
        }
        this.shipping.selectedState = "0";
        if (this.UserType == 4) {
            this.billAdr.selectedState = "0";
        }


        this.getCartItems();
        this.getCountry();
        this.getStates("US");
        this.getbillStates("US");
        this.getaddresscityno("US");
        this.getIsMuscle();
        this.GetSubmitTempOrderConfig();
        this.getShipToSetting();
        this.getWantedDateSetting();
        this.getCancelDateSetting();
        this.getPONumberSetting();
        this.getContactSetting();
        this.getEmailSetting();
        this.getShipViaSetting();
        this.getAccountSetting();
        this.getPayTypeSetting();
        this.getNoteSetting();
        this.getShipCompleteSetting();
        this.getPhoneSetting();
        this.getJobReleaseSetting();
        this.getFreeFormSetting();
        this.getItemNoteSetting();
        this.gototop();
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
        if (Common.getWithExpiry("UserType") == "3") {
            this.dataService.GetPermissionConfig().subscribe((res: any) => {
                if (res == "1") {
                    var permis = JSON.parse(Common.getWithExpiry("ProfileLog"));
                    if (permis[9] == true) {
                        this.isSubmitPermission = true;
                        this.isReviewPermission = false;
                    }
                    else {
                        this.isSubmitPermission = false;
                        this.isReviewPermission = true;
                    }
                }
                else {
                    var permissions = [];
                    permissions = Common.getWithExpiry("Permission").split(';');
                    if (permissions.indexOf("OE") != -1) {
                        this.isSubmitPermission = true;
                        this.isReviewPermission = false;
                    }
                    if (permissions.indexOf("OR") != -1 && !this.isSubmitPermission) {
                        this.isSubmitPermission = false;
                        this.isReviewPermission = true;
                    }
                }
            });
        }
        else if (Common.getWithExpiry("SalesUserType") == '2') {
            var subuser = Common.getWithExpiry("subuser").toString();
            if (subuser != undefined && subuser != '') {
                var permissions = Common.getWithExpiry("Permission").split(';');
                if (permissions.indexOf("OE") != -1) {
                    this.isSubmitPermission = true;
                    this.isReviewPermission = false;
                }
                if (permissions.indexOf("OR") != -1 && !this.isSubmitPermission) {
                    this.isSubmitPermission = false;
                    this.isReviewPermission = true;
                }
            }
            else {
                this.isSubmitPermission = true;
                this.isReviewPermission = false;
            }
        }
        else {
            this.isSubmitPermission = true;
            this.isReviewPermission = false;
        }

        //this.head.WantedDate = moment();
        //this.head.CancelDate = moment();
        this.getShipFOB();
        this.getPaymentType();
        
        //this.GetDefaultValues();  
        if (Common.getWithExpiry("finalObj") != undefined && Common.getWithExpiry("finalObj") != null) {
            var data = JSON.parse(Common.getWithExpiry("finalObj"));
            if (this.UserType != 4) {
                this.head.ship_to = (data.head.ship_id == undefined ? "0" : (data.head.ship_id == "" ? "0" : (data.head.ship_id == null ? "0" : data.head.ship_id)));
                this.shipAddressChange(this.head.ship_to);
            }
            else {
                this.head.ship_to = "-1";
            }
            this.head.JobRelease = data.head.job_rel;
            this.head.Phone = data.head.cell_phone;
            this.head.ShipComplete = data.head.ship_cmpl;
            this.isbillingincard = data.head.isbillingincard;
            this.head.PO = data.head.cu_po;
            this.head.Contact = data.head.orderby_phone;
            this.head.Email = data.head.email;
            this.head.Account = data.head.ship_via_acct;
            if (data.notes != undefined && data.notes != null && data.notes.length > 0) {
                this.head.notes = (this.iskyraden == true ? data.notes.split('|')[0] : data.notes);
                this.head.shipnote = (this.iskyraden == true ? data.notes.split('|')[1] : "");
            }
            this.shipping.Residential = data.head.residential;
            this.shipping.ShipName = data.head.s_name;
            this.shipping.ShipAttn = data.head.ship_atn;
            this.shipping.phone = data.head.s_phone;
            this.shipping.blind_ship = (data.head.blind_ship == undefined ? "no" : data.head.blind_ship);
            if (data.head.s_adr != undefined && data.head.s_adr != null) {
                var ss_adr = JSON.parse(data.head.s_adr);

                this.shipping.Addr1 = ss_adr[0];
                this.shipping.Addr2 = (ss_adr[1] == undefined ? "" : ss_adr[1]);

                this.shipping.City = ss_adr[2];
            }
            this.shipping.selectedState = data.head.s_st;
            this.shipping.PostalCode = data.head.s_postal_code;
            this.filename = data.head.pofile;
            if (this.head.ship_to == "0") {
                this.shipText = "Add";
            }
            else {
                this.shipText = "Modify";
            }
        }
        else {
            if (this.UserType != 4) {
                this.head.ship_to = "0";
            }
            else {
                this.head.ship_to = "-1";
            }
        }
        // setTimeout(() => {
        //     this.setdefaultvalues();
        // }, 1500);
        
    }
    getIsMuscle() {
        this.IsMuscle = this.dataService.Getconfigbykey("IsMuscle");
        if (this.IsMuscle == null || this.IsMuscle == undefined || this.IsMuscle == '') {
            this.IsMuscle = Common.getWithExpiry("IsMuscle");
        }
        if (this.IsMuscle == null || this.IsMuscle == undefined || this.IsMuscle == '') {
            this.dataService.GetConfigForIsMuscle().subscribe((data: any) => {
                this.IsMuscle = data;
                Common.setWithExpiry("IsMuscle", this.IsMuscle);
            })
        }
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
            else {
                userid = this.GuestUserID;
                subuserid = '4';
            }
            this.sendMessage('start')
            this.checkoutService.getDefaultValues(subuserid, userType, userid).subscribe((data: any) => {
                this.defvalues = data;
                this.sendMessage('stop')
                this.setdefaultvalues();
            });
        } catch (ed) { }
    }



    setdefaultvalues() {
        if (this.defvalues != undefined && this.defvalues != null) {
            if ((this.head.Phone == undefined || this.head.Phone == null || this.head.Phone == '') && (this.defvalues.phone != undefined && this.defvalues.phone != null && this.defvalues.phone != '')) {
                this.head.Phone = this.defvalues.phone;
            }
            if ((this.head.Account == undefined || this.head.Account == null || this.head.Account == '') && !this.iskyraden && (this.defvalues.ship_via_acct != undefined && this.defvalues.ship_via_acct != null && this.defvalues.ship_via_acct != '')) {
                this.head.Account = this.defvalues.ship_via_acct;
            }
            if ((this.head.ShipFOB == undefined || this.head.ShipFOB == null || this.head.ShipFOB == '' || this.head.ShipFOB == '0') && !this.iskyraden && (this.defvalues.ship_via_code != undefined && this.defvalues.ship_via_code != null && this.defvalues.ship_via_code != '')) {
                this.head.ShipFOB = this.defvalues.ship_via_code;
                this.onShipViaChange(this.head.ShipFOB)
            }
            if ((this.head.Contact == undefined || this.head.Contact == null || this.head.Contact == '') && (this.defvalues.name != undefined && this.defvalues.name != null && this.defvalues.name != '')) {
                this.head.Contact = this.defvalues.name;
            }

            if ((this.head.PaymentType == undefined || this.head.PaymentType == null || this.head.PaymentType == '' || this.head.PaymentType == '???') && (this.defvalues.terms_code != undefined && this.defvalues.terms_code != null && this.defvalues.terms_code != '')) {
                this.head.PaymentType = this.defvalues.terms_code;
                this.onPaymentChange(this.head.PaymentType);
            }
            if ((this.head.Email == undefined || this.head.Email == null || this.head.Email == '') && (this.defvalues.email_address != undefined && this.defvalues.email_address != null && this.defvalues.email_address != '')) {
                try {
                    var getvaue = this.defvalues.email_address.replace(' ', '').replace(' ', '').replace(' ', '');
                    this.head.Email = getvaue;
                } catch (ec) { }
            }
        }
    }




    Clicktoedit(product, i) {
        product.canEditCode = true;
        //window.setTimeout(() => {
        const element = this.renderer.selectRootElement("#Product" + i.toString());
        element.focus();
        //});
    }

    getbillCountry() {
        this.registerService.getCountry().subscribe((res: any) => {
            this.billcountryList = res;
            this.billAdr.selectedcountry = "US";
        })
    }

    getCountry() {
        this.registerService.getCountry().subscribe((res: any) => {
            this.countryList = res;
            this.shipping.selectedCountry = "US";
            this.getvalforform();
        })
    }
    getcardCountry() {
        this.registerService.getCountry().subscribe((res: any) => {
            this.cardcountryList = res;
            //this.head.cardDetailselectedCountry = "US";
            this.getvalforform();
        })
    }
    getbillStates(val) {
        this.registerService.getState(val).subscribe((res: any) => {
            this.billstateList = res;
            if (this.billstateList == undefined || this.billstateList == null || this.billstateList.length == 0) {
                this.billAdr.selectedState = '';
                this.billstateshow = false;
            }
            else {
                this.billstateshow = true;
                try {
                    this.billAdr.selectedState = '0';
                } catch (ed) { }
            }
        })
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
    getcardStates(val) {
        this.registerService.getState(val).subscribe((res: any) => {
            this.cardstateList = res;
            if (this.cardstateList == undefined || this.cardstateList == null || this.cardstateList.length == 0) {
                this.head.cardDetailselectedState = '';
                this.iscardstateshow = false;
            }
            else {
                this.iscardstateshow = true;
                this.head.cardDetailselectedState = '0';
            }
        })
    }


    getWantedDateSetting() {
        this.isShowWantedDate = this.dataService.Getconfigbykey("WantedDate");
        if (this.isShowWantedDate == null || this.isShowWantedDate == undefined || this.isShowWantedDate == '') {
            this.isShowWantedDate = Common.getWithExpiry("isShowWantedDate");
        }
        if (this.isShowWantedDate == null || this.isShowWantedDate == undefined || this.isShowWantedDate == '') {
            this.dataService.GetWantedDateSetting().subscribe((data: any) => {
                this.isShowWantedDate = data;
                if (this.isShowWantedDate == '1') {
                    this.getWantedDateRequired();
                }
                Common.setWithExpiry("isShowWantedDate", this.isShowWantedDate);
            });
        }
        else {
            if (this.isShowWantedDate == '1') {
                this.getWantedDateRequired();
            }
        }
    }

    getCancelDateSetting() {
        this.isShowCanecelDate = this.dataService.Getconfigbykey("CancelDate");
        if (this.isShowCanecelDate == null || this.isShowCanecelDate == undefined || this.isShowCanecelDate == '') {
            this.isShowCanecelDate = Common.getWithExpiry("isShowCanecelDate");
        }
        if (this.isShowCanecelDate == null || this.isShowCanecelDate == undefined || this.isShowCanecelDate == '') {
            this.dataService.GetCancelDateSetting().subscribe((data: any) => {
                this.isShowCanecelDate = data;
                if (this.isShowCanecelDate == '1') {
                    this.getCancelDateRequired();
                }
                Common.setWithExpiry("isShowCanecelDate", this.isShowCanecelDate);
            });
        }
        else {
            if (this.isShowCanecelDate == '1') {
                this.getCancelDateRequired();
            }
        }

    }

    getJobReleaseSetting() {
        this.isShowJobRelease = this.dataService.Getconfigbykey("JobRelease");
        if (this.isShowJobRelease == null || this.isShowJobRelease == undefined || this.isShowJobRelease == '') {
            this.isShowJobRelease = Common.getWithExpiry("isShowJobRelease");
        }
        if (this.isShowJobRelease == null || this.isShowJobRelease == undefined || this.isShowJobRelease == '') {
            this.dataService.GetJobReleaseSetting().subscribe((data: any) => {
                this.isShowJobRelease = data;
                if (this.isShowJobRelease == '1') {
                    this.getJobReleaseRequired();
                }
                Common.setWithExpiry("isShowJobRelease", this.isShowJobRelease);
            });
        }
        else {
            if (this.isShowJobRelease == '1') {
                this.getJobReleaseRequired();
            }
        }
    }
    getPONumberSetting() {
        this.isShowPONumber = this.dataService.Getconfigbykey("PONumber");
        if (this.isShowPONumber == null || this.isShowPONumber == undefined || this.isShowPONumber == '') {
            this.isShowPONumber = Common.getWithExpiry("isShowPONumber");
        }
        if (this.isShowPONumber == null || this.isShowPONumber == undefined || this.isShowPONumber == '') {
            this.dataService.GetPONumberSetting().subscribe((data: any) => {
                this.isShowPONumber = data;
                if (this.isShowPONumber == '1') {
                    this.Getporequired();
                }
                Common.setWithExpiry("isShowPONumber", this.isShowPONumber);
            });
        }
        else {
            if (this.isShowPONumber == '1') {
                this.Getporequired();
            }
        }
    }
    Getporequired() {
        this.isPORequired = this.dataService.Getconfigbykey("PORequired");
        if (this.isPORequired == null || this.isPORequired == undefined || this.isPORequired == '') {
            this.isPORequired = Common.getWithExpiry("isPORequired");
        }
        if (this.isPORequired == null || this.isPORequired == undefined || this.isPORequired == '') {
            this.dataService.GetPORequired().subscribe((data: any) => {
                this.isPORequired = data;
                Common.setWithExpiry("isPORequired", this.isPORequired);
            });
        }

    }



    getContactSetting() {
        this.isShowContact = this.dataService.Getconfigbykey("ContactName");
        if (this.isShowContact == null || this.isShowContact == undefined || this.isShowContact == '') {
            this.isShowContact = Common.getWithExpiry("isShowContact");
        }
        if (this.isShowContact == null || this.isShowContact == undefined || this.isShowContact == '') {
            this.dataService.GetContactNameSetting().subscribe((data: any) => {
                this.isShowContact = data;
                if (this.isShowContact == '1') {
                    this.getContactRequired();
                }
                Common.setWithExpiry("isShowContact", this.isShowContact);
            });
        }
        else {
            if (this.isShowContact == '1') {
                this.getContactRequired();
            }
        }
    }

    getEmailSetting() {
        this.isShowEmail = this.dataService.Getconfigbykey("EmailAddress");
        if (this.isShowEmail == null || this.isShowEmail == undefined || this.isShowEmail == '') {
            this.isShowEmail = Common.getWithExpiry("isShowEmail");
        }
        if (this.isShowEmail == null || this.isShowEmail == undefined || this.isShowEmail == '') {
            this.dataService.GetEmailAddressSetting().subscribe((data: any) => {
                this.isShowEmail = data;
                if (this.isShowEmail == '1') {
                    this.getEmailRequired();
                }
                Common.setWithExpiry("isShowEmail", this.isShowEmail);
            });
        }
        else {
            if (this.isShowEmail == '1') {
                this.getEmailRequired();
            }
        }

    }


    getShipViaSetting() {
        this.isShowShipVia = this.dataService.Getconfigbykey("ShipVia");
        if (this.isShowShipVia == null || this.isShowShipVia == undefined || this.isShowShipVia == '') {
            this.isShowShipVia = Common.getWithExpiry("isShowShipVia");
        }
        if (this.isShowShipVia == null || this.isShowShipVia == undefined || this.isShowShipVia == '') {
            this.dataService.GetShipViaSetting().subscribe((data: any) => {
                this.isShowShipVia = data;
                if (this.isShowShipVia == '1') {
                    this.getShipViaRequired();
                }
                Common.setWithExpiry("isShowShipVia", this.isShowShipVia);
            });
        }
        else {
            if (this.isShowShipVia == '1') {
                this.getShipViaRequired();
            }
        }

    }


    getAccountSetting() {
        this.isShowAccount = this.dataService.Getconfigbykey("ShippingAccount");
        if (this.isShowAccount == null || this.isShowAccount == undefined || this.isShowAccount == '') {
            this.isShowAccount = Common.getWithExpiry("isShowAccount");
        }
        if (this.isShowAccount == null || this.isShowAccount == undefined || this.isShowAccount == '') {
            this.dataService.GetShippingAccountSetting().subscribe((data: any) => {
                this.isShowAccount = data;
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
            this.dataService.GetPayTypeSetting().subscribe((data: any) => {
                this.isShowPayType = data;
                if (this.isShowPayType == '1') {
                    this.getPayTypeRequired();
                }
                Common.setWithExpiry("isShowPayType", this.isShowPayType);
            });
        }
        else {
            if (this.isShowPayType == '1') {
                this.getPayTypeRequired();
            }
        }
    }


    getNoteSetting() {
        this.isShowNote = this.dataService.Getconfigbykey("Notes");
        if (this.isShowNote == null || this.isShowNote == undefined || this.isShowNote == '') {
            this.isShowNote = Common.getWithExpiry("isShowNote");
        }
        if (this.isShowNote == null || this.isShowNote == undefined || this.isShowNote == '') {
            this.dataService.GetNotesSetting().subscribe((data: any) => {
                this.isShowNote = data;
                if (this.isShowNote == '1') {
                    this.getNoteRequired();
                }
                Common.setWithExpiry("isShowNote", this.isShowNote);
            });
        }
        else {
            if (this.isShowNote == '1') {
                this.getNoteRequired();
            }
        }

    }

    getPhoneSetting() {
        this.isShowPhone = this.dataService.Getconfigbykey("PhoneNumber");
        if (this.isShowPhone == null || this.isShowPhone == undefined || this.isShowPhone == '') {
            this.isShowPhone = Common.getWithExpiry("isShowPhone");
        }
        if (this.isShowPhone == null || this.isShowPhone == undefined || this.isShowPhone == '') {
            this.dataService.GetPhoneSetting().subscribe((data: any) => {
                this.isShowPhone = data;
                if (this.isShowPhone == '1') {
                    this.getPhoneRequired();
                }
                Common.setWithExpiry("isShowPhone", this.isShowPhone);
            });
        }
        else {
            if (this.isShowPhone == '1') {
                this.getPhoneRequired();
            }
        }
    }

    getShipCompleteSetting() {
        this.isShowShipComplete = this.dataService.Getconfigbykey("ShipComplete");
        if (this.isShowShipComplete == null || this.isShowShipComplete == undefined || this.isShowShipComplete == '') {
            this.isShowShipComplete = Common.getWithExpiry("isShowShipComplete");
        }
        if (this.isShowShipComplete == null || this.isShowShipComplete == undefined || this.isShowShipComplete == '') {
            this.dataService.GetShipCompleteSetting().subscribe((data: any) => {
                this.isShowShipComplete = data;
                if (this.isShowShipComplete == '1') {
                    this.getShipCompleteRequired();
                }
                Common.setWithExpiry("isShowShipComplete", this.isShowShipComplete);
            });
        }
        else {
            if (this.isShowShipComplete == '1') {
                this.getShipCompleteRequired();
            }
        }
    }

    getShipToSetting() {
        this.isShowShipTo = this.dataService.Getconfigbykey("AddShipTo");
        if (this.isShowShipTo == null || this.isShowShipTo == undefined || this.isShowShipTo == '') {
            this.isShowShipTo = Common.getWithExpiry("isShowShipTo");
        }
        if (this.isShowShipTo == null || this.isShowShipTo == undefined || this.isShowShipTo == '') {
            this.dataService.GetShipToSetting().subscribe((data: any) => {
                this.isShowShipTo = data;
                Common.setWithExpiry("isShowShipTo", this.isShowShipTo);
            });
        }

    }
    GetConfigformodifyshipto() {
        this.modifyshipto = this.dataService.Getconfigbykey("modifyshipto");
        if (this.modifyshipto == null || this.modifyshipto == undefined || this.modifyshipto == '') {
            this.modifyshipto = Common.getWithExpiry("modifyshipto");
        }
        if (this.modifyshipto == null || this.modifyshipto == undefined || this.modifyshipto == '') {
            this.dataService.GetConfigformodifyshipto().subscribe((data: any) => {
                this.modifyshipto = data;
                Common.setWithExpiry("modifyshipto", this.modifyshipto);
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
                if (this.CreditCardSetting == '1') {
                    this.getcreditcardcode();
                    this.getCardtypelist();
                    this.getCardDetails(true);
                }
                Common.setWithExpiry("CreditCardSetting", this.CreditCardSetting);

            });
        }
        else {
            if (this.CreditCardSetting == '1') {
                this.getcreditcardcode();
                this.getCardtypelist();
                this.getCardDetails(true);
            }
        }
    }


    getWantedDateRequired() {
        this.isWantedDateRequired = this.dataService.Getconfigbykey("WantedDateRequired");
        if (this.isWantedDateRequired == null || this.isWantedDateRequired == undefined || this.isWantedDateRequired == '') {
            this.isWantedDateRequired = Common.getWithExpiry("isWantedDateRequired");
        }
        if (this.isWantedDateRequired == null || this.isWantedDateRequired == undefined || this.isWantedDateRequired == '') {
            this.dataService.GetWantedDateRequired().subscribe((data: any) => {
                this.isWantedDateRequired = data;
                Common.setWithExpiry("isWantedDateRequired", this.isWantedDateRequired);
            });
        }

    }

    getCancelDateRequired() {
        this.isCancelDateRequired = this.dataService.Getconfigbykey("CancelDateRequired");
        if (this.isCancelDateRequired == null || this.isCancelDateRequired == undefined || this.isCancelDateRequired == '') {
            this.isCancelDateRequired = Common.getWithExpiry("isCancelDateRequired");
        }
        if (this.isCancelDateRequired == null || this.isCancelDateRequired == undefined || this.isCancelDateRequired == '') {
            this.dataService.GetCancelDateRequired().subscribe((data: any) => {
                this.isCancelDateRequired = data;
                Common.setWithExpiry("isCancelDateRequired", this.isCancelDateRequired);
            });
        }

    }

    getJobReleaseRequired() {
        this.isJobReleaseRequired = this.dataService.Getconfigbykey("JobReleaseRequired");
        if (this.isJobReleaseRequired == null || this.isJobReleaseRequired == undefined || this.isJobReleaseRequired == '') {
            this.isJobReleaseRequired = Common.getWithExpiry("isJobReleaseRequired");
        }
        if (this.isJobReleaseRequired == null || this.isJobReleaseRequired == undefined || this.isJobReleaseRequired == '') {
            this.dataService.GetJobReleaseRequired().subscribe((data: any) => {
                this.isJobReleaseRequired = data;
                Common.setWithExpiry("isJobReleaseRequired", this.isJobReleaseRequired);
            });
        }

    }

    getPhoneRequired() {
        this.isPhoneRequired = this.dataService.Getconfigbykey("PhoneRequired");
        if (this.isPhoneRequired == null || this.isPhoneRequired == undefined || this.isPhoneRequired == '') {
            this.isPhoneRequired = Common.getWithExpiry("isPhoneRequired");
        }
        if (this.isPhoneRequired == null || this.isPhoneRequired == undefined || this.isPhoneRequired == '') {
            this.dataService.GetPhoneRequired().subscribe((data: any) => {
                this.isPhoneRequired = data;
                Common.setWithExpiry("isPhoneRequired", this.isPhoneRequired);
            });
        }
    }

    getShipCompleteRequired() {
        this.isShipCompleteRequired = this.dataService.Getconfigbykey("ShipCompleteRequired");
        if (this.isShipCompleteRequired == null || this.isShipCompleteRequired == undefined || this.isShipCompleteRequired == '') {
            this.isShipCompleteRequired = Common.getWithExpiry("isShipCompleteRequired");
        }
        if (this.isShipCompleteRequired == null || this.isShipCompleteRequired == undefined || this.isShipCompleteRequired == '') {
            this.dataService.GetShipCompleteRequired().subscribe((data: any) => {
                this.isShipCompleteRequired = data;
                if (this.isShipCompleteRequired == '1') {
                    this.head.ShipComplete = true;
                }
                Common.setWithExpiry("isShipCompleteRequired", this.isShipCompleteRequired);
            });
        }
        else {
            if (this.isShipCompleteRequired == '1') {
                this.head.ShipComplete = true;
            }
        }
    }

    getContactRequired() {
        this.isContactRequired = this.dataService.Getconfigbykey("ContactRequired");
        if (this.isContactRequired == null || this.isContactRequired == undefined || this.isContactRequired == '') {
            this.isContactRequired = Common.getWithExpiry("isContactRequired");
        }
        if (this.isContactRequired == null || this.isContactRequired == undefined || this.isContactRequired == '') {
            this.dataService.GetContactRequired().subscribe((data: any) => {
                this.isContactRequired = data;
                Common.setWithExpiry("isContactRequired", this.isContactRequired);
            });
        }

    }

    getEmailRequired() {
        this.isEmailRequired = this.dataService.Getconfigbykey("EmailRequired");
        if (this.isEmailRequired == null || this.isEmailRequired == undefined || this.isEmailRequired == '') {
            this.isEmailRequired = Common.getWithExpiry("isEmailRequired");
        }
        if (this.isEmailRequired == null || this.isEmailRequired == undefined || this.isEmailRequired == '') {
            this.dataService.GetEmailRequired().subscribe((data: any) => {
                this.isEmailRequired = data;
                Common.setWithExpiry("isEmailRequired", this.isEmailRequired);
            });
        }
    }


    getPayTypeRequired() {
        this.isPayTypeRequired = this.dataService.Getconfigbykey("PayTypeRequired");
        if (this.isPayTypeRequired == null || this.isPayTypeRequired == undefined || this.isPayTypeRequired == '') {
            this.isPayTypeRequired = Common.getWithExpiry("isPayTypeRequired");
        }
        if (this.isPayTypeRequired == null || this.isPayTypeRequired == undefined || this.isPayTypeRequired == '') {
            this.dataService.GetPayTypeRequired().subscribe((data: any) => {
                this.isPayTypeRequired = data;
                Common.setWithExpiry("isPayTypeRequired", this.isPayTypeRequired);
            });
        }

    }

    getShipViaRequired() {
        this.isShipViaRequired = this.dataService.Getconfigbykey("ShipViaRequired");
        if (this.isShipViaRequired == null || this.isShipViaRequired == undefined || this.isShipViaRequired == '') {
            this.isShipViaRequired = Common.getWithExpiry("isShipViaRequired");
        }
        if (this.isShipViaRequired == null || this.isShipViaRequired == undefined || this.isShipViaRequired == '') {
            this.dataService.GetShipViaRequired().subscribe((data: any) => {
                this.isShipViaRequired = data;
                Common.setWithExpiry("isShipViaRequired", this.isShipViaRequired);
            });
        }
    }

    getNoteRequired() {
        this.isNoteRequired = this.dataService.Getconfigbykey("NoteRequired");
        if (this.isNoteRequired == null || this.isNoteRequired == undefined || this.isNoteRequired == '') {
            this.isNoteRequired = Common.getWithExpiry("isNoteRequired");
        }
        if (this.isNoteRequired == null || this.isNoteRequired == undefined || this.isNoteRequired == '') {
            this.dataService.GetNoteRequired().subscribe((data: any) => {
                this.isNoteRequired = data;
                Common.setWithExpiry("isNoteRequired", this.isNoteRequired);
            });
        }

    }

    // getUPSRateSetting() {
    //     this.isUPSRate = Common.getWithExpiry("isUPSRate");
    //     if (this.isUPSRate == null || this.isUPSRate == undefined || this.isUPSRate == '') {
    //         this.dataService.GetUPSRateSetting().subscribe((data:any) => {
    //             this.isUPSRate = data;
    //             Common.setWithExpiry("isUPSRate", this.isUPSRate);
    //         });
    //     }

    // }

    // GetaCustomer() {
    //     this.dataService.getacustomer(Common.getWithExpiry("CustID")).subscribe((data: any) => {
    //         this.customerdetails=data;            
    //         if(Common.getWithExpiry("UserType")=='1'){
    //         this.head.Contact=(this.customerdetails.atn==''? Common.getWithExpiry("UserID") : this.customerdetails.atn);
    //         }
    //         else
    //         {
    //             this.head.Contact=Common.getWithExpiry("UserID");
    //         }

    //         this.head.ShipFOB=this.customerdetails.ship_via_code;

    //     });
    // }


    // getUSPSRateSetting() {
    //     this.isUSPSRate = Common.getWithExpiry("isUSPSRate");
    //     if (this.isUSPSRate == null || this.isUSPSRate == undefined || this.isUSPSRate == '') {
    //         this.dataService.GetUSPSRateSetting().subscribe((data:any) => {
    //             this.isUSPSRate = data;
    //             Common.setWithExpiry("isUSPSRate", this.isUSPSRate);
    //         });
    //     }

    // }

    // getFedExRateSetting() {
    //     this.isFedExRate = Common.getWithExpiry("isFedExRate");
    //     if (this.isFedExRate == null || this.isFedExRate == undefined || this.isFedExRate == '') {
    //         this.dataService.GetFedExRateSetting().subscribe((data:any) => {
    //             this.isFedExRate = data;
    //             Common.setWithExpiry("isFedExRate", this.isFedExRate);
    //         });
    //     }

    // }


    getFreeFormSetting() {
        this.isShowFreefrom = this.dataService.Getconfigbykey("FreeShippingForm");
        if (this.isShowFreefrom == null || this.isShowFreefrom == undefined || this.isShowFreefrom == '') {
            this.isShowFreefrom = Common.getWithExpiry("FreeShippingForm");
        }
        if (this.isShowFreefrom == null || this.isShowFreefrom == undefined || this.isShowFreefrom == '') {
            this.dataService.GetFreeFormSetting().subscribe((data: any) => {
                this.isShowFreefrom = data;
                Common.setWithExpiry("FreeShippingForm", this.isShowFreefrom);
            });
        }

    }

    getItemNoteSetting() {
        this.isShowItemNote = this.dataService.Getconfigbykey("ItemNote");
        if (this.isShowItemNote == null || this.isShowItemNote == undefined || this.isShowItemNote == '') {
            this.isShowItemNote = Common.getWithExpiry("isShowItemNote");
        }
        if (this.isShowItemNote == null || this.isShowItemNote == undefined || this.isShowItemNote == '') {
            this.dataService.GetItemNoteSetting().subscribe((data: any) => {
                this.isShowItemNote = data;
                Common.setWithExpiry("isShowItemNote", this.isShowItemNote);
            });
        }

    }

    getCardDetails(iscreditcard) {
        return new Promise((resolve,rej) => { 
            var usrid = null;
            if (Common.getWithExpiry("UserType") == '3' || this.logintype == '3') {
                usrid = Common.getWithExpiry("UserID");
            }
            else {
                usrid = Common.getWithExpiry("CustID");
            }
            this.sendMessage('start');
            this.checkoutService.getCardDetails(Common.getWithExpiry("CustID"), usrid, iscreditcard).subscribe((res: any) => {
                var result = [];
                this.sendMessage('stop');
                result = res;

                for (var i = 0; i < result.length; i++) {
                    var cardNumber = '';
                    var securityCode = '';
                    if (result[i].profileid == undefined || result[i].profileid == null || result[i].profileid == '') {
                        cardNumber = this.registerService.decrypted('8080808080808080', result[i].CardNumber);
                        securityCode = this.registerService.decrypted('8080808080808080', result[i].SecurityCode)
                    }
                    else {
                        cardNumber = result[i].CardNumber;
                        securityCode = this.registerService.decrypted('8080808080808080', result[i].SecurityCode)
                    }

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
                        "CardName": result[i].FirstName + " - " + result[i].CardType + " - " + cardNumber.substr(cardNumber.length - 4)
                    })
                }

                //this.head.CardNo = 0;

                if (Common.getWithExpiry("finalObj") != undefined && Common.getWithExpiry("finalObj") != null) {
                    var data = JSON.parse(Common.getWithExpiry("finalObj"));
                    this.head.CardNo = 0;
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].Id == data.head.CardNo || data.head.CardNo == "-1") {
                            this.head.CardNo = data.head.CardNo;
                            this.cardChanged(this.head.CardNo);
                            break;
                        }
                    }
                }
                resolve(true);
            });
        })
    }

    cardChanged(event) {
        this.getcardCountry();
        this.getcardStates("US");
        if (event == "0") {
            this.cardText = "Add";
            this.iscardfreeform = true;
            this.cardid = null;
            this.head.CardHoldersName = '';
            this.head.CreditCardType = "0";
            this.head.CardNumber = '';
            this.head.SecurityCode = '';
            this.head.ExpirationMonth = '';
            this.head.ExpirationYear = '';
            this.head.cardDetailadr1 = '';
            this.head.cardDetailadr2 = '';
            this.head.cardDetailselectedCountry = 'US';
            this.head.cardDetailselectedState = '';
            this.head.cardDetailcity = '';
            this.head.cardDetailzip = '';
            this.head.cardDetailEmail = '';
            this.head.profileid = '';

        }
        else if (event == "-1") {
            this.iscardfreeform = false;
            this.isbillingincard = false;
            if (Common.getWithExpiry("finalObj") != undefined && Common.getWithExpiry("finalObj") != null) {
                var data = JSON.parse(Common.getWithExpiry("finalObj"));
                if (data.head.CardNo == "-1") {
                    this.head.CardHoldersName = data.head.CardHolderName;
                    this.head.CreditCardType = data.head.CardType;
                    this.head.ExpirationMonth = data.head.ExpirationMonth;
                    this.isbillingincard = data.head.isbillingincard;
                    this.head.ExpirationYear = data.head.ExpirationYear;
                    this.head.cardDetailadr1 = data.head.cardDetailadr1;
                    this.head.cardDetailadr2 = data.head.cardDetailadr2;
                    this.head.cardDetailselectedCountry = data.head.cardDetailselectedCountry;
                    this.head.cardDetailselectedState = data.head.cardDetailselectedState;
                    this.head.cardDetailcity = data.head.cardDetailcity;
                    this.head.cardDetailzip = data.head.cardDetailzip;
                    this.head.cardDetailEmail = data.head.cardDetailEmail;
                    this.head.profileid = '';
                }
                else {
                    this.cardid = null;
                    this.head.CardHoldersName = '';
                    this.head.CreditCardType = "0";
                    this.head.CardNumber = '';
                    this.head.SecurityCode = '';
                    this.head.ExpirationMonth = '';
                    this.head.ExpirationYear = '';
                    this.head.cardDetailadr1 = '';
                    this.head.cardDetailadr2 = '';
                    this.head.cardDetailselectedCountry = 'US';
                    this.head.cardDetailselectedState = '';
                    this.head.cardDetailcity = '';
                    this.head.cardDetailzip = '';
                    this.head.cardDetailEmail = '';
                    this.head.profileid = '';
                }
                //     this.head.CardNumber='';
                // this.head.SecurityCode='';
            }
            else {
                this.cardid = null;
                this.head.CardHoldersName = '';
                this.head.CreditCardType = "0";
                this.head.CardNumber = '';
                this.head.SecurityCode = '';
                this.head.ExpirationMonth = '';
                this.head.ExpirationYear = '';
                this.head.cardDetailadr1 = '';
                this.head.cardDetailadr2 = '';
                this.head.cardDetailselectedCountry = 'US';
                this.head.cardDetailselectedState = '';
                this.head.cardDetailcity = '';
                this.head.cardDetailzip = '';
                this.head.cardDetailEmail = '';
                this.head.profileid = '';
            }
        }
        else {
            this.cardText = "Modify";
            this.iscardfreeform = true;
            this.cardid = event;
            if (this.cardid != 0 && this.cardid != null && this.cardid != undefined) {
                this.checkoutService.getSingleCard(this.cardid).subscribe((res: any) => {
                    var data = res;
                    if (data != null && data != undefined && data.CardNumber != undefined && data.CardNumber != '') {
                        this.cardNo = data.CardNumber;// this.registerService.decrypted('8080808080808080', data.CardNumber);
                        if (data.profileid == undefined || data.profileid == null || data.profileid == '') {
                            var getcardno = this.registerService.decrypted('8080808080808080', data.CardNumber);
                            this.head.CardNumber = "**** **** **** " + getcardno.substr(getcardno.length - 4, 4);
                        }
                        else {
                            this.head.CardNumber = data.CardNumber;
                        }
                        this.code = data.SecurityCode;//this.registerService.decrypted('8080808080808080', data.SecurityCode);
                        this.head.CardHoldersName = data.FirstName + " " + data.LastName;
                        this.head.CreditCardType = data.CardType;

                        this.head.ExpirationMonth = data.ExpirationMonth;
                        this.head.ExpirationYear = data.ExpirationYear;
                        this.head.SecurityCode = "***";
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
        //console.log('cardText===>',this.cardText);
    }

    getShipingAddress(defaultval = null) {
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
                        if (aa[i] != '' && aa[i] != undefined && aa[i] != 'undefined') {
                            s += aa[i] + ", ";
                        }
                    }
                    ppl.aaa = s.substring(0, s.length - 2);
                    ppl.adr = JSON.parse(ppl.adr);
                }
    
                if (Common.getWithExpiry("finalObj") != undefined && Common.getWithExpiry("finalObj") != null) {
                    var data = JSON.parse(Common.getWithExpiry("finalObj"));
                    if (this.UserType != 4) {
                        this.head.ship_to = (data.head.ship_id == undefined ? "0" : (data.head.ship_id == "" ? "0" : (data.head.ship_id == null ? "0" : data.head.ship_id)));
                    }
                    else {
                        this.head.ship_to = "-1";
                    }
                    //this.totalWeight = data.head.weight;
                    this.shipAddressChange(this.head.ship_to);
                }
    
                else {
                    if (this.logintype == '3') {
                        var custom = Common.getWithExpiry("UserID");
    
                        this.head.ship_to = custom;
                        this.shipAddressChange(custom);
                    }
                    else if (this.UserType != 4) {
                        this.head.ship_to = "0";
                    }
                    else {
                        this.head.ship_to = "-1";
                    }
                }
                if(defaultval) this.head.ship_to = defaultval
                if(this.shipAdr!=undefined && this.shipAdr!=null && this.shipAdr.length==1 && (this.head.ship_to==undefined || this.head.ship_to==null || this.head.ship_to!='')){
                    this.head.ship_to=this.shipAdr[0].ship_id;
                    this.shipAddressChange(this.head.ship_to);
                }
                resolve(true);
            });
        })
        
    }

    getBillingAddress() {
        var custom = Common.getWithExpiry("CustID");
        if (Common.getWithExpiry("addrObj" + custom) != undefined && Common.getWithExpiry("addrObj" + custom) != null) {
            var billAdr = JSON.parse(Common.getWithExpiry("addrObj" + custom));
        }
        if (billAdr == undefined || billAdr == null || billAdr.adr == undefined || billAdr.adr == null) {
            this.checkoutService.getBillingAddress(Common.getWithExpiry("CustID")).subscribe((res: any) => {
                var getddd = res;

                if (getddd != undefined && getddd != null && getddd.adr != undefined) {
                    this.billAdr = getddd;
                }
                if (this.billAdr != undefined && this.billAdr != null && this.billAdr.adr != undefined) {
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
                var custom = Common.getWithExpiry("CustID");
                Common.setWithExpiry("addrObj" + custom, JSON.stringify(this.billAdr));
            });
        }
        else {
            this.billAdr = billAdr;
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
    }
    onFileSelected(event) {
        this.SelectedFile = <File>event.target.files[0];
        if (this.SelectedFile != undefined && this.SelectedFile != null) {
            this.postfileonserver();
        }

    }

    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    postfileonserver() {
        const fd = new FormData();
        var fname = this.newGuid();

        if (this.SelectedFile != undefined && this.SelectedFile != null) {
            this.filename = fname + this.SelectedFile.name;
            fd.append('FileName', this.filename);
            fd.append('file', this.SelectedFile, this.filename);
        }

        this.checkoutService.Postpofile(fd).subscribe((data: any) => {
            this.toastr.success(data.Message);
        });
    }


    getPaymentType() {

        this.checkoutService.getPaymentTerms(Common.getWithExpiry("CustID")).subscribe((res: any) => {
            this.paymentType = res;           
            if (Common.getWithExpiry("finalObj") != undefined && Common.getWithExpiry("finalObj") != null) {
                var data = JSON.parse(Common.getWithExpiry("finalObj"));
                if (data.head.terms_code != null && data.head.terms_code != undefined && data.head.terms_code != '') {
                    this.head.PaymentType = data.head.terms_code;
                    this.onPaymentChange(this.head.PaymentType);
                }
                if (this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1) {
                    this.showPayment = true;

                }
                else {
                    this.showPayment = false;
                }
            }
            else {
                if (this.head.PaymentType == null && this.head.PaymentType == undefined && this.head.PaymentType == '' && this.head.PaymentType == '???') {
                    this.head.PaymentType = this.paymentType[0].terms_code;
                    this.onPaymentChange(this.head.PaymentType);
                }
                if (this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1) {
                    this.showPayment = true;

                }
                else {
                    this.showPayment = false;
                }
            }
            //this.onPaymentChange(this.head.PaymentType);
        });
        //this.onPaymentChange(this.head.PaymentType);
    }
    gettotalcart() {
        this.cartTotal = 0;
        if (this.cartProducts != null && this.cartProducts != undefined && this.cartProducts.length > 0) {
            for (let pp of this.cartProducts) {
                this.cartTotal = this.cartTotal + (pp.PricePer * pp.Quantity);
            }
        }
        return this.cartTotal;
    }


    getfinaltotal() {
        try {
            this.totalAmount = parseFloat(this.cartTotal.toString()) + (this.frieght == undefined ? 0 : (this.frieght == null ? 0 : parseFloat(this.frieght.toString())));
            this.totalAmount = (Math.round(this.totalAmount * 100) / 100).toFixed(2);
            return this.totalAmount;
        } catch (ex) {
            console.log('error', ex);
        }
    }
    getfinaltotalqty() {
        var qty = 0;
        for (let pp of this.cartProducts) {
            qty = qty + pp.Quantity;
        }
        return qty;
    }

    getShipFOB() {
        this.checkoutService.getShipFOB(Common.getWithExpiry("CustID")).subscribe((res: any) => {
            //this.shipFOB = res;
            this.shipFOB = [];
            var shipFOB = res;
            var getremover = [];
            for (let pp of shipFOB) {
                pp.whfrieght = [];
                pp.frieghtvalue = undefined;

                if (this.iskyraden && this.airsetting == 0 && pp.sertype.indexOf("Air") == -1 && pp.sertype.indexOf("Overnight") == -1) {
                    this.shipFOB.push(pp);
                }
                if (this.iskyraden && this.airsetting == 2 && (pp.sertype.indexOf("Air") != -1 || pp.sertype.indexOf("Overnight") != -1)) {
                    this.shipFOB.push(pp);
                }
                if (this.airsetting == 1) {
                    this.shipFOB.push(pp);
                }


            }




            if (Common.getWithExpiry("finalObj") != undefined && Common.getWithExpiry("finalObj") != null) {
                var data = JSON.parse(Common.getWithExpiry("finalObj"));
                if (data.head.ship_via_code != null && data.head.ship_via_code != undefined && data.head.ship_via_code != '') {
                    this.head.ShipFOB = data.head.ship_via_code;
                }
                if (data.head.Frieght != null && data.head.Frieght != undefined && data.head.Frieght != '') {
                    this.frieght = data.head.Frieght;
                }

                this.totalAmount = this.cartTotal + this.frieght;
            }
            else {
                this.head.ShipFOB = "0";
            }

        });

    }




    getCartItems() {
        var finalResult = [];
        var total = 0;
        var usrid = null;
        this.itemstoavails = '';
        if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
            usrid = Common.getWithExpiry("UserID") + Common.getWithExpiry("CustID");
        }
        else {
            usrid = Common.getWithExpiry("CustID");
        }
        this.sendMessage('start');
        try {
            this.cartService.getCartItemByUserID().subscribe((res: any) => {
                this.sendMessage('stop');
                this.cartProducts = res;
                this.tagmanager();
                var total = 0;
                this.totalWeight =0;
                for (let pp of this.cartProducts) {
                    //Common.gotoproductdetails(pp, this.UrlWithDetails, this.UrlWithFreeForm);
                    pp.descr = pp.itemdesc;
                    this.itemstoavails = this.itemstoavails + pp.itemname + ',';
                    Common.Setdescriptionforitem(pp, this.DescrToShow)
                    pp.profile2 = JSON.parse(pp.profile2);

                    if (!this.iskyraden) {
                        if (pp.weight != undefined && pp.weight != null && pp.weight != '') {
                            this.totalWeight = this.totalWeight + (parseFloat(pp.weight) * parseInt(pp.Quantity));
                        }
                    }
                    else {
                        if (pp.profile2[10] != undefined && pp.profile2[10] != null && pp.profile2[10] != '') {
                            console.log('pp.profile2[10]',pp.profile2[10]);
                            console.log('pp.profile2[11]',pp.profile2[11]);
                            this.totalWeight = this.totalWeight + (parseFloat(pp.profile2[10]) * parseInt(pp.Quantity));
                            if (pp.profile2[11].indexOf("AMBIENT,HAZARDOUS") != -1) {
                                this.airsetting = 0;
                                //console.log('this.airsetting', this.airsetting);
                            }
                            if (pp.profile2[11].indexOf("COLD") != -1 || pp.profile2[11].indexOf("COLD,HAZARDOUS") != -1 || pp.profile2[11].indexOf("FROZEN") != -1 || pp.profile2[11].indexOf("FROZEN,HAZARDOUS") != -1) {

                                this.airsetting = 2;
                                //console.log('this.airsetting', this.airsetting);
                                if (pp.profile2[11].indexOf("COLD") != -1 || pp.profile2[11].indexOf("COLD,HAZARDOUS") != -1) {
                                    let boxno = Math.ceil(parseFloat(((parseFloat(pp.profile2[10]) * parseInt(pp.Quantity)) / 60).toString()));
                                    if (boxno != undefined && boxno != null && boxno > 0) {
                                        this.totalWeight = this.totalWeight + (boxno * 20)
                                    }
                                }
                                if (pp.profile2[11].indexOf("FROZEN") != -1 || pp.profile2[11].indexOf("FROZEN,HAZARDOUS") != -1) {

                                    let boxno = Math.ceil(parseFloat(((parseFloat(pp.profile2[10]) * parseInt(pp.Quantity)) / 60).toString()));
                                    if (boxno != undefined && boxno != null && boxno > 0) {
                                        this.totalWeight = this.totalWeight + (boxno * 30)
                                    }
                                }
                            }
                            if(this.totalWeight>150 && pp.profile2[11].indexOf("AMBIENT") != -1 && this.cartProducts.length==1){
                                this.airsetting = 0;
                            }
                            if (parseFloat(pp.profile2[10]) >= 150 && pp.profile2[11].indexOf("COLD") != -1 && pp.profile2[11].indexOf("FROZEN") != -1 && this.cartProducts.length > 1) {
                                this.toastr.error("Please create separate order for this")
                                this.flagtosubmit = false;
                            }
                        }
                    }



                    total = Number(total) + Number(pp.Price);
                    var umArr = pp.umqty.replace('[', '').replace(']', '').split(',');
                    var index = 0;
                    var units = pp.um.trim().replace('[', '').replace(']', '').split(',');
                    for (var i = 0; i < units.length; i++) {
                        units[i] = units[i].trim();
                        var existingUnit = units[i].replace('"', '').replace('"', '');
                        var un = 'each';
                        if (existingUnit.toLowerCase() == "ea" || existingUnit.toLowerCase() == "each") {
                            index = i;
                            break;
                        }
                    }

                    var units = JSON.parse(pp.um);
                    var umArr = JSON.parse(pp.umqty);
                    var getallows = JSON.parse(pp.web_um_alws);

                    var umList = [];
                    var getindex = 0;
                    var umList1 = [];
                    if (this.ismultipleum == '1') {
                        for (var i = 0; i < units.length; i++) {
                            if (units[i] == pp.um_display) {
                                getindex = i;
                            }
                            if (i == 0 && units[i] != '' && getallows[i] == true) {
                                if (this.isLoggedIn && this.withloginprice == '1' && this.withloginpricelist != '1') {
                                    this.bulkPrice.push({
                                        "customer": Common.getWithExpiry("CustID"),
                                        "item": pp.itemname,
                                        "quantity": pp.Quantity,
                                        "warehouse": this.warehouse,
                                        "rounding": this.PriceRound,
                                        "qty_unit": units[i].trim(),
                                        "company_sy": Common.getWithExpiry("company_sy")
                                    })
                                }
                                else if (!this.isLoggedIn && this.priceshow == '1' && this.listprice != '1') {
                                    this.bulkPrice.push({
                                        "customer": this.GuestUserID,
                                        "item": pp.itemname,
                                        // "unit": units[i].trim(),
                                        "quantity": pp.Quantity,
                                        "warehouse": this.Guestwarehouse,
                                        "rounding": this.PriceRound,
                                        "qty_unit": units[i].trim(),
                                        "company_sy": Common.getWithExpiry("company_sy")
                                    })
                                }

                            }
                            else if (units[i] != '' && getallows[i] == true) {
                                if (this.isLoggedIn && this.withloginprice == '1' && this.withloginpricelist != '1') {
                                    this.bulkPrice.push({
                                        "customer": Common.getWithExpiry("CustID"),
                                        "item": pp.itemname,
                                        // "unit": units[i].trim(),
                                        "quantity": pp.Quantity,
                                        "warehouse": this.warehouse,
                                        "rounding": this.PriceRound,
                                        "qty_unit": units[i].trim(),
                                        "company_sy": Common.getWithExpiry("company_sy")
                                    })
                                }
                                else if (!this.isLoggedIn && this.priceshow == '1' && this.listprice != '1') {
                                    this.bulkPrice.push({
                                        "customer": this.GuestUserID,
                                        "item": pp.itemname,
                                        // "unit": units[i].trim(),
                                        "quantity": pp.Quantity,
                                        "warehouse": this.Guestwarehouse,
                                        "rounding": this.PriceRound,
                                        "qty_unit": units[i].trim(),
                                        "company_sy": Common.getWithExpiry("company_sy")
                                    })
                                }
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < units.length; i++) {
                            if (units[i] != '' && units[i] == pp.um_display) {
                                if (i == 0) {
                                    if (this.isLoggedIn && this.withloginprice == '1' && this.withloginpricelist != '1') {
                                        this.bulkPrice.push({
                                            "customer": Common.getWithExpiry("CustID"),
                                            "item": pp.itemname,
                                            "quantity": pp.Quantity,
                                            "warehouse": this.warehouse,
                                            "rounding": this.PriceRound,
                                            "qty_unit": units[i].trim(),
                                            "company_sy": Common.getWithExpiry("company_sy")
                                        })
                                    }
                                    else if (!this.isLoggedIn && this.priceshow == '1' && this.listprice != '1') {
                                        this.bulkPrice.push({
                                            "customer": this.GuestUserID,
                                            "item": pp.itemname,
                                            "quantity": pp.Quantity,
                                            "warehouse": this.Guestwarehouse,
                                            "rounding": this.PriceRound,
                                            "qty_unit": units[i].trim(),
                                            "company_sy": Common.getWithExpiry("company_sy")
                                        })
                                    }
                                }
                                else {
                                    if (this.isLoggedIn && this.withloginprice == '1' && this.withloginpricelist != '1') {
                                        this.bulkPrice.push({
                                            "customer": Common.getWithExpiry("CustID"),
                                            "item": pp.itemname,
                                            "quantity": pp.Quantity,
                                            "warehouse": this.warehouse,
                                            "rounding": this.PriceRound,
                                            "qty_unit": units[i].trim(),
                                            "company_sy": Common.getWithExpiry("company_sy")
                                        })
                                    }
                                    else if (!this.isLoggedIn && this.priceshow == '1' && this.listprice != '1') {
                                        this.bulkPrice.push({
                                            "customer": this.GuestUserID,
                                            "item": pp.itemname,
                                            "quantity": pp.Quantity,
                                            "warehouse": this.Guestwarehouse,
                                            "rounding": this.PriceRound,
                                            "qty_unit": units[i].trim(),
                                            "company_sy": Common.getWithExpiry("company_sy")
                                        })
                                    }
                                    if (umList != null && umList != undefined && umList.length > 0 && pp.MeasureUnit == umList[0].Label) {
                                        pp.totqty = umList[0].umqty * pp.Quantity;
                                    }
                                }
                            }
                        }
                    }
                    pp.unitlist = umList;

                }
                if (this.isLoggedIn || this.annavail == '1') {
                    var getitem: any;
                    var warehous = "";
                    if (this.Multiplewarehouseforavaibility != undefined && this.Multiplewarehouseforavaibility != null && this.Multiplewarehouseforavaibility != '') {
                        warehous = this.Multiplewarehouseforavaibility;
                    }
                    else {
                        warehous = Common.getWithExpiry("warehouse");
                    }

                    if (this.isLoggedIn && this.withloginavailshow == '1' && this.withloginavaillist != 1) {
                        getitem = {
                            items: this.itemstoavails,
                            warehouse: warehous,
                            company_sy: Common.getWithExpiry("company_sy"),
                        }
                    }
                    else {
                        var warehous = "";
                        if (this.Multiplewarehouseforavaibility != undefined && this.Multiplewarehouseforavaibility != null && this.Multiplewarehouseforavaibility != '') {
                            warehous = this.Multiplewarehouseforavaibility;
                        }
                        else {
                            warehous = this.Guestwarehouse;
                        }
                        if (!this.isLoggedIn && this.annavail == '1' && this.withoutloginavaillist != '1') {
                            getitem = {
                                items: this.itemstoavails,
                                warehouse: warehous,
                                company_sy: Common.getWithExpiry("company_sy")
                            }
                        }
                    }

                    if (getitem != null && getitem != undefined && !this.iskyraden) {
                        this.dataService.getProductavailibity(getitem).subscribe((res: any) => {
                            var availdata = res;
                            for (var i = 0; i < this.cartProducts.length; i++) {
                                this.cartProducts[i].isavails = false;
                                this.cartProducts[i].productavails = [];
                                this.cartProducts[i].warehouse = '';
                                this.cartProducts[i].available = 0;
                                if (availdata != null && availdata != undefined) {
                                    for (var j = 0; j < availdata.length; j++) {
                                        if (this.cartProducts[i].itemname == availdata[j].item) {
                                            this.cartProducts[i].productavails.push(availdata[j]);
                                            this.cartProducts[i].warehouse = (this.cartProducts[i].warehouse != '' ? this.cartProducts[i].warehouse + ', ' + availdata[j].warehouse : availdata[j].warehouse);
                                            this.cartProducts[i].available = this.cartProducts[i].available + availdata[j].available;
                                            if (this.addnewqtywithnewlogic == '1') {
                                                this.cartProducts[i].availablenew = (availdata[j].available + availdata[j].on_po) - availdata[j].backorder;
                                                if (this.cartProducts[i].availablenew > 0) {
                                                    this.cartProducts[i].isavails = true;
                                                }
                                            }
                                            if (availdata[j].available > 0) {
                                                this.cartProducts[i].isavails = true;
                                                this.cartProducts[i].available1 = availdata[j].available;
                                            }
                                            else {
                                                this.cartProducts[i].isavails = false;
                                                this.cartProducts[i].available1 = 0;
                                                if (this.addtonotavail == 0 && this.cartProducts[i].drop_ship == false && (this.addnewqtywithnewlogic == '1' ? this.cartProducts[i].availablenew : this.cartProducts[i].available1) == 0) {
                                                    this.toastr.error("Please remove out of stock item " + this.cartProducts[i].itemname + " to check out");
                                                    this.flagtosubmit = false;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        })
                    }
                }
                this.cartTotal = total;
                this.getpriceforall();
            });
        } catch (ex) {
            this.sendMessage('stop');
        }
    }
    getpriceforall() {
        if (this.bulkPrice != null && this.bulkPrice != undefined && this.bulkPrice.length > 0) {
            this.cartService.getBulkPrice(this.bulkPrice).subscribe((res: any) => {
                var data = res;
                if (data != undefined && data != null && data.length > 0) {
                    this.cartTotal = 0;
                    for (var i = 0; i < this.cartProducts.length; i++) {
                        for (var j = 0; j < data.length; j++) {
                            if (this.cartProducts[i].itemname == data[j].item && this.cartProducts[i].unitMeasure == data[j].qty_unit) {
                                if (this.cartProducts[i].itemname == data[j].item && this.cartProducts[i].unitMeasure == data[j].qty_unit) {
                                    if (this.iskyraden && data[j].origin != 'CI' && data[j].origin != 'SP') {
                                        this.cartProducts[i].PricePer = this.cartProducts[i].PricePer;
                                        this.cartProducts[i].Price = (parseFloat(this.cartProducts[i].PricePer) * this.cartProducts[i].Quantity);
                                    }
                                    else {
                                        this.cartProducts[i].PricePer = parseFloat(data[j].extension) / parseFloat(data[j].quantity);
                                        this.cartProducts[i].Price = (parseFloat(data[j].extension) / parseFloat(data[j].quantity) * this.cartProducts[i].Quantity);
                                    }
                                    this.cartTotal = this.cartTotal + this.cartProducts[i].Price;
                                }
                            }
                        }
                    }
                }
            });
        }
        else {

        }
    }


    addNote(product) {
        product.canEditCode = false;
        this.cartService.updateCart(product).subscribe((res: any) => {
            this.cartService.cartBroadCaster(res);
        })
    }


    SaveOrder() {

        // var wantedDate = new Date(this.head.WantedDate);
        // var cancelDate = new Date(this.head.CancelDate);
        // var wantedDate =this.head.WantedDate.toDate();
        // var cancelDate =this.head.CancelDate.toDate();
        // var dateFormat = (wantedDate.getMonth() + 1) + '/' + wantedDate.getDate() + '/' + wantedDate.getFullYear();
        // var cancelFormat = (cancelDate.getMonth() + 1) + '/' + cancelDate.getDate() + '/' + cancelDate.getFullYear();
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

        var headLN = {
            "billPhone": this.billAdr.phone,
            "billEmail": this.billAdr.email_address,
            "billcountry": this.billAdr.selectedcountry,
            "billstate": this.billAdr.selectedState,
            "billPostalCode": this.billAdr.PostalCode,
            "billFax": this.billAdr.fax,
            "billname": this.billAdr.name,
            "billAdr": (this.UserType != 4 ? this.billAdr.adr : "[" + this.billAdr.Addr1 + "," + this.billAdr.Addr2 + "," + (this.cityno == 3 ? this.billAdr.City : '') + "," + (this.cityno == 4 ? this.billAdr.City : '') + "]"),
            "bill_adr": (this.UserType != 4 ? JSON.stringify(this.billAdr.adr) : "[" + this.billAdr.Addr1 + "," + this.billAdr.Addr2 + "," + (this.cityno == 3 ? this.billAdr.City : '') + "," + (this.cityno == 4 ? this.billAdr.City : '') + "]"),
            "ship_id": (this.head.ship_to == "-1" ? null : this.head.ship_to),
            "wanted_date": this.head.WantedDate, //new Date(this.head.WantedDate),
            "cancel_date": this.head.CancelDate,
            "job_rel": this.head.JobRelease,
            "cell_phone": this.head.Phone,
            "ship_cmpl": this.head.ShipComplete,
            "cu_po": this.head.PO,
            "orderby_phone": this.head.Contact,
            "enter_by": this.head.enter_by,
            "email": this.head.Email,
            "terms_code": this.head.PaymentType,
            "ship_via_code": (this.head.ShipFOB=="0"?"":this.head.ShipFOB),
            "ship_via_acct": this.head.Account,
            "CardNumber": this.cardNo,
            "ExpirationDate": this.head.ExpirationMonth + this.head.ExpirationYear,
            "ExpirationMonth": this.head.ExpirationMonth,
            "ExpirationYear": this.head.ExpirationYear,
            "CardHolderName": this.head.CardHoldersName,
            "CardType": this.head.CreditCardType,
            "SecurityCode": this.code,
            "notes": (this.head.notes == undefined ? "" : this.head.notes) + (this.head.shipnote == undefined ? "" : "|" + " Carrier Name: " + this.head.shipnote),
            "CardNo": this.head.CardNo,
            "Frieght": this.frieght,
            "kraydenwhqty": this.kraydenwhqty,
            "weight": this.totalWeight,
            "c_tot_code_1": this.frieghtcode,
            "c_tot_code_amt_1": this.frieght,
            "customer": userId,
            "rec_type": "O",
            "ord_class": "",
            "warehouse": (Common.getWithExpiry("warehouse") == undefined ? this.Guestwarehouse : Common.getWithExpiry("warehouse")),
            "order_by": userId,
            "source_code": "web",
            "s_adr": "[\"" + (this.shipping.Addr1 == undefined ? "" : this.shipping.Addr1) + "\",\"" + (this.shipping.Addr2 == undefined ? "" : this.shipping.Addr2) + "\",\"" + (this.cityno == 3 ? (this.shipping.City == undefined ? "" : this.shipping.City) : '') + "\",\"" + (this.cityno == 4 ? (this.shipping.City == undefined ? "" : this.shipping.City) : '') + "\",\"" + (this.shipping.Province == undefined ? "" : this.shipping.Province) + "\",\"" + "\"]",
            "s_country_code": this.shipping.selectedCountry,
            "residential": this.shipping.Residential,
            "free_form_shipto": this.isAddShip,
            "s_name": this.shipping.ShipName,
            "ship_atn": this.shipping.ShipAttn,
            "s_phone": this.shipping.s_phone,
            "blind_ship": (this.shipping.blind_ship == undefined ? "no" : this.shipping.blind_ship),
            "s_st": this.shipping.selectedState,
            "s_postal_code": this.shipping.PostalCode,
            "paymentTypeList": this.paymentType,
            "shipFOBList": this.shipFOB,
            "cardDetailadr1": this.head.cardDetailadr1,
            "cardDetailadr2": this.head.cardDetailadr2,
            "cardDetailselectedCountry": this.head.cardDetailselectedCountry,
            "cardDetailselectedState": this.head.cardDetailselectedState,
            "cardDetailcity": this.head.cardDetailcity,
            "cardDetailzip": this.head.cardDetailzip,
            "cardDetailEmail": this.head.cardDetailEmail,
            "profileid": this.head.profileid,
            "isbillingincard": this.isbillingincard,
            "cardid": this.cardid,
            "pofile": this.filename
        };
        var Line = [];
        if (this.cartProducts != null && this.cartProducts != undefined && this.cartProducts.length > 0) {

            for (let prod of this.cartProducts) {
                Line.push({
                    "reference": 1,
                    "item": prod.itemnumber,
                    "image": prod.image,
                    "quantity": prod.Quantity,
                    "descr": prod.descrarray,
                    "um_o": prod.unitMeasure,
                    "Note": prod.Note,
                    "price": prod.Price,
                    "warehouse": (this.iskyraden ? prod.warehouse : (Common.getWithExpiry("warehouse") == undefined ? this.Guestwarehouse : Common.getWithExpiry("warehouse"))),
                    "price_per": prod.PricePer,
                    "product_line": prod.ProductLine,
                    "RowID": prod.RowID,
                    "freeform": prod.freeform,
                });
            }
        }

        var finalObj = {
            "head": headLN,
            "lines": Line,
            "notes": (this.head.notes == undefined ? "" : this.head.notes) + (this.head.shipnote == undefined ? "" : "|" + " Carrier Name: " + this.head.shipnote),
            "echo": true,
            "complete": false,
        }

        Common.setWithExpiry("finalObj", JSON.stringify(finalObj));
    }



    setcardvalues() {
        if (this.head.CardNumber != undefined && this.head.CardNumber != '' && this.iscardfreeform == false) {
            var getcardnumber = this.head.CardNumber.toString();
            this.cardNo = this.registerService.encrypted('8080808080808080', getcardnumber);

        }
        if (this.head.SecurityCode != undefined && this.head.SecurityCode != '' && this.iscardfreeform == false) {
            var scode = this.head.SecurityCode.toString();
            this.code = this.registerService.encrypted('8080808080808080', scode);

        }
    }


    SpecialCharacters(stringnew) {
        if (stringnew != undefined && stringnew != null && stringnew != '') {
            stringnew = stringnew.replace(/[^a-zA-Z1-9 ]/g, "")
        }
        return stringnew;
    }

    isValidEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var retflag = true;
        if (email.indexOf(',') != -1 || email.indexOf(';') != -1) {
            if (email.indexOf(',') > -1) {
                var getemails = email.split(',');
                for (let oo of getemails) {
                    retflag = re.test(String(oo).toLowerCase());
                    if (!retflag) {
                        break;
                    }
                }
            }
            else {
                var getemails = email.split(';');
                for (let oo of getemails) {
                    retflag = re.test(String(oo).toLowerCase());
                    if (!retflag) {
                        break;
                    }
                }
            }
        }
        else {
            retflag = re.test(String(email).toLowerCase());
        }
        return retflag;
    }
    isValidPhone(phone) {
        var re1 = /^[0-9]*$/;
        //var re = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
        //var re2 = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
        //if (re.test(String(phone).toLowerCase()) || re1.test(String(phone).toLowerCase()) || re2.test(String(phone).toLowerCase())) {
        //    return true;
        //}
        //else {
        //    return false;
        // }
        return re1.test(String(phone).toLowerCase());
        //return true;
    }

    orderfraudcheck() {
        this.sendMessage("start");
        var gmodel = {
            "last_name": this.billAdr.name,
            "first_name": this.billAdr.name,
            "bill_addr": this.billAdr.adr[0] + " " + this.billAdr.adr[1],
            "bill_city": this.billAdr.adr[2] + this.billAdr.adr[3],
            "bill_state": this.billAdr.state,
            "bill_country": this.billAdr.country_code,
            "bill_zip_code": this.billAdr.postal_code,
            "ship_last_name": (this.head.ship_to == "same" ? this.billAdr.name : this.ShipAttn),
            "ship_first_name": (this.head.ship_to == "same" ? this.billAdr.name : this.ShipAttn),
            "ship_addr": (this.head.ship_to == "same" ? this.billAdr.adr[0] + " " + this.billAdr.adr[1] : this.shipAddr1 + " " + this.shipAddr2),
            "ship_city": (this.head.ship_to == "same" ? this.billAdr.adr[2] + this.billAdr.adr[3] : this.shipCity),
            "ship_state": (this.head.ship_to == "same" ? this.billAdr.state : this.shipState),
            "ship_country": (this.head.ship_to == "same" ? this.billAdr.country_code : this.shipCountry),
            "ship_zip_code": (this.head.ship_to == "same" ? this.billAdr.postal_code : this.shipZIP),
            "user_phone": this.head.Phone,
            "email": this.head.Email,
            "amount": this.getfinaltotal(),
            "quantity": this.getfinaltotalqty(),

        }
        this.checkoutService.orderfraudcheck(gmodel).subscribe((res: any) => {
            this.sendMessage("stop");
            if (!res) {
                this.toastr.error(this.orderfraudmsg, 'Message!');
                this.router.navigate(['/viewcart']);
            }
        });
    }

    createOrder(form: NgForm, isReviewOrder) {
        // if(this.termsandcondition=='1' && this.terms==false && this.termsrequired=='1'){
        //     this.toastr.error("Please Select Terms and Conditions");
        //     return;
        //   }
       
        if (this.iskyraden && this.head.ShipFOB == "MISC" && (this.head.shipnote == undefined || this.head.shipnote == null || this.head.shipnote == '')) {
            this.toastr.error("Please Insert Carrier Name", 'Message!');
            const element = this.renderer.selectRootElement("#shipnote");
            element.focus();
            return;
        }

        if (this.UserType == 4 && (this.billAdr.name == undefined || this.billAdr.name == null || this.billAdr.name == '')) {
            this.toastr.error("Please Insert Billing Address Name", 'Message!');
            const element = this.renderer.selectRootElement("#billAdrname");
            element.focus();
            return;
        }
        if (this.UserType == 4 && (this.billAdr.phone == undefined || this.billAdr.phone == null || this.billAdr.phone == '')) {
            this.toastr.error("Please Insert Billing Phone", 'Message!');
            const element = this.renderer.selectRootElement("#billAdrphone");
            element.focus();
            return;
        }
        if (this.UserType == 4 && (this.billAdr.email_address == undefined || this.billAdr.email_address == null || this.billAdr.email_address == '')) {
            this.toastr.error("Please Insert Billing Email", 'Message!');
            const element = this.renderer.selectRootElement("#billAdremail_address");
            element.focus();
            return;
        }
        if (this.UserType == 4 && this.isValidEmail(this.billAdr.email_address) == false) {
            this.toastr.error("Please Insert Valid Billing Email", 'Message!');
            const element = this.renderer.selectRootElement("#billAdremail_address");
            element.focus();
            return;
        }
        if (this.UserType == 4 && (this.billAdr.Addr1 == undefined || this.billAdr.Addr1 == null || this.billAdr.Addr1 == '')) {
            this.toastr.error("Please Insert Billing Address 1", 'Message!');
            const element = this.renderer.selectRootElement("#billAdrAddress1");
            element.focus();
            return;
        }
        if (this.UserType == 4 && (this.billAdr.selectedState == undefined || this.billAdr.selectedState == null || this.billAdr.selectedState == '' || this.billAdr.selectedState == '0')) {
            this.toastr.error("Please Insert Billing State", 'Message!');
            // const element = this.renderer.selectRootElement("#billAdrState");
            // element.focus();
            document.getElementById('billAdrState').scrollIntoView();
            return;
        }
        if (this.UserType == 4 && (this.billAdr.City == undefined || this.billAdr.City == null || this.billAdr.City == '')) {
            this.toastr.error("Please Insert Billing City", 'Message!');
            const element = this.renderer.selectRootElement("#billAdrCity");
            element.focus();
            return;
        }
        if (this.UserType == 4 && (this.billAdr.PostalCode == undefined || this.billAdr.PostalCode == null || this.billAdr.PostalCode == '')) {
            this.toastr.error("Please Insert Billing Postal Code", 'Message!');
            const element = this.renderer.selectRootElement("#billAdrPostalCode");
            element.focus();
            return;
        }
        if(this.iskyraden && this.IsShipment==false){
            this.toastr.error("Error calculating shipping rates, please try clicking Review and Submit again.", 'Message!');
            this.shipAddressChange(this.head.ship_to);
            return;
        }

        if (this.head.ship_to == 0) {
            this.isFormSubmitted = true;
            if (this.head.ship_to == 0) {
                this.toastr.error("Please select ship to Address", 'Message!');
                document.getElementById('headship_to').scrollIntoView();
            }
            else if (this.head.Contact == '' || this.head.Contact == undefined || this.head.Contact == null) {
                this.toastr.error("Please insert contact", 'Message!');
                const element = this.renderer.selectRootElement("#headContact");
                element.focus();
            }
            else if (this.head.Email == '' || this.head.Email == undefined || this.head.Email == null) {
                this.toastr.error("Please insert Email", 'Message!');
                const element = this.renderer.selectRootElement("#headEmail");
                element.focus();
            }
            else if (this.head.Email != undefined && this.head.Email != '' && !this.isValidEmail(this.head.Email)) {
                this.toastr.error("Please insert valid Email", 'Message!');
                const element = this.renderer.selectRootElement("#headEmail");
                element.focus();
            }
            return;
        }

        if (this.head.ship_to == '-1' && (this.shipping.ShipName == undefined || this.shipping.ShipName == null || this.shipping.ShipName == '')) {
            this.toastr.error("Please insert Ship Name", 'Message!');
            const element = this.renderer.selectRootElement("#shippingShipName");
            element.focus();
            return;
        }
        if (this.head.ship_to == '-1' && this.ship_attn_required == '1' && (this.shipping.ShipAttn == undefined || this.shipping.ShipAttn == null || this.shipping.ShipAttn == '')) {
            this.toastr.error("Please insert Ship Attn", 'Message!');
            const element = this.renderer.selectRootElement("#shippingShipAttn");
            element.focus();
            return;
        }
        if (this.head.ship_to == '-1' && (this.shipping.phone == undefined || this.shipping.phone == null || this.shipping.phone == '')) {
            this.toastr.error("Please insert Ship phone", 'Message!');
            const element = this.renderer.selectRootElement("#shippingShipphone");
            element.focus();
            return;
        }
        if (this.head.ship_to == '-1' && (this.shipping.Addr1 == undefined || this.shipping.Addr1 == null || this.shipping.Addr1 == '')) {
            this.toastr.error("Please insert Address 1", 'Message!');
            const element = this.renderer.selectRootElement("#shippingAddr1");
            element.focus();
            return;
        }
        if (this.head.ship_to == '-1' && (this.shipping.selectedState == undefined || this.shipping.selectedState == null || this.shipping.selectedState == '' || this.shipping.selectedState == '0')) {
            this.toastr.error("Please Select State", 'Message!');
            document.getElementById("shippingselectedState").scrollIntoView();
            return;
        }
        if (this.head.ship_to == '-1' && (this.shipping.City == undefined || this.shipping.City == null || this.shipping.City == '')) {
            this.toastr.error("Please insert City", 'Message!');
            const element = this.renderer.selectRootElement("#shippingCity");
            element.focus();
            return;
        }
        if (this.head.ship_to == '-1' && (this.shipping.PostalCode == undefined || this.shipping.PostalCode == null || this.shipping.PostalCode == '')) {
            this.toastr.error("Please insert Postal Code", 'Message!');
            const element = this.renderer.selectRootElement("#shippingPostalCode");
            element.focus();
            return;
        }
        if (this.isWantedDateRequired == '1' && (this.head.WantedDate == "" || this.head.WantedDate == undefined)) {
            this.toastr.error("Please insert "+this.wanterdatelable, 'Message!');
            this.isWantedVal = true;
            const element = this.renderer.selectRootElement("#headWantedDate");
            element.focus();
            return;
        }
        else {
            this.isWantedVal = false;
        }
        if (this.isCancelDateRequired == '1' && (this.head.CancelDate == "" || this.head.CancelDate == undefined)) {
            this.toastr.error("Please insert cancel date", 'Message!');
            this.isCancelVal = true;
            const element = this.renderer.selectRootElement("#headCancelDate");
            element.focus();
            return;
        }
        else {
            this.isCancelVal = false;
        }
        if (this.isJobReleaseRequired == '1' && (this.head.JobRelease == "" || this.head.JobRelease == undefined)) {
            this.toastr.error("Please insert " + this.JobReleaselable, 'Message!');
            this.isJobReleaseVal = true;
            const element = this.renderer.selectRootElement("#headJobRelease");
            element.focus();
            return;
        }
        else {
            this.isJobReleaseVal = false;
        }
        if (this.isPhoneRequired == '1' && (this.head.Phone == "" || this.head.Phone == undefined)) {
            this.toastr.error("Please insert phone number", 'Message!');
            this.isPhoneVal = true;
            const element = this.renderer.selectRootElement("#headPhone");
            element.focus();
            return;
        }
        else {
            this.isPhoneVal = false;
        }
        if (this.head.Phone != undefined && this.head.Phone != '' && !this.isValidPhone(this.head.Phone)) {
            this.toastr.error("Please insert valid phone number, no special characters or spaces allowed", 'Message!');
            const element = this.renderer.selectRootElement("#headPhone");
            element.focus();
            return;
        }

        if (this.isShipCompleteRequired == '1' && (!this.head.ShipComplete)) {
            this.toastr.error("Please select ship complete", 'Message!');
            this.isShipComVal = true;
            const element = this.renderer.selectRootElement("#headShipComplete");
            element.focus();
            return;
        }
        else {
            this.isShipComVal = false;
        }
        if ((this.head.PO == "" || this.head.PO == undefined || this.head.PO == null) && this.isPORequired == '1') {
            this.toastr.error("Please insert PO number", 'Message!');
            const element = this.renderer.selectRootElement("#poNumber");
            element.focus();
            return;
        }
        // else {
        //     this.isPORequired = '0';
        // }
        if ((this.SelectedFile == undefined || this.SelectedFile == null) && this.iskyraden && this.head.PaymentType != this.creditcardcode) {
            this.toastr.error("Please upload file", 'Message!');
            const element = this.renderer.selectRootElement("#pofile");
            element.focus();
            return;
        }
        //else{

        //}
        if (this.isContactRequired == '1' && (this.head.Contact == "" || this.head.Contact == undefined)) {
            this.toastr.error("Please insert contact name", 'Message!');
            this.isContactVal = true;
            const element = this.renderer.selectRootElement("#headContact");
            element.focus();
            return;
        }
        else {
            this.isContactVal = false;
        }
        if (this.Enter_by_Required == '1' && (this.head.enter_by == "" || this.head.enter_by == undefined)) {
            this.toastr.error("Please insert " + this.Enter_by_Lable, 'Message!');
            this.isenter_byVal = true;
            const element = this.renderer.selectRootElement("#headenter_by");
            element.focus();
            return;
        }
        else {
            this.isenter_byVal = false;
        }

        if (this.isEmailRequired == '1' && (this.head.Email == "" || this.head.Email == undefined)) {
            this.toastr.error("Please insert email address", 'Message!');
            this.isEmailVal = true;
            const element = this.renderer.selectRootElement("#headEmail");
            element.focus();
            return;
        }
        else if (this.head.Email != undefined && this.head.Email != '' && !this.isValidEmail(this.head.Email)) {
            this.toastr.error("Please insert valid email address", 'Message!');
            const element = this.renderer.selectRootElement("#headEmail");
            element.focus();
            return;
        }
        else {
            this.isEmailVal = false;
        }

        if (this.isPayTypeRequired == '1' && (this.head.PaymentType == "" || this.head.PaymentType == undefined)) {
            this.toastr.error("Please insert pay type", 'Message!');
            this.isPayTypeVal = true;
            document.getElementById("headPaymentType").scrollIntoView();
            return;
        }
        else {
            this.isPayTypeVal = false;
        }

        if (this.isShipViaRequired == '1' && this.head.ShipFOB == "0" && this.isShowShipVia == '1') {
            this.toastr.error("Please select ship via", 'Message!');
            this.isShipViaVal = true;
            document.getElementById("headShipFOB").scrollIntoView();
            return;
        }
        else {
            this.isShipViaVal = false;
        }
        if (this.isshipviaaccountrequired == true && this.isShowAccount == '1' && (this.head.Account == undefined || this.head.Account == null || this.head.Account == '')) {
            this.toastr.error("Please insert Shipping Account", 'Message!');
            const element = this.renderer.selectRootElement("#shippingAccount");
            element.focus();
            return;
        }

        if (this.isNoteRequired == '1' && (this.head.notes == "" || this.head.notes == undefined)) {
            this.toastr.error("Please insert note", 'Message!');
            this.isNoteVal = true;
            const element = this.renderer.selectRootElement("#headnotes");
            element.focus();
            return;
        }
        else {
            this.isNoteVal = false;
        }

        if (this.head.PaymentType == "???") {
            this.toastr.error("Please Select The Payment Type", 'Message!');
            document.getElementById("headPaymentType").scrollIntoView();
            return;
        }
        if (this.flagtosubmit == false && this.Processwithzeroprice == '0') {
            this.toastr.error("One or Many Product dont have their price please contact for price");
            return;
        }
        if ((this.totalAmount < parseFloat(this.web_order_min_amount) && !isReviewOrder)) {
            this.toastr.error("Order Minimum Value Should Be $" + this.web_order_min_amount, 'Message!');
            return;
        }
        if ((this.head.CardNo == undefined || this.head.CardNo == 0) && this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.CreditCardSetting == '1') {
            this.toastr.error("Please Select The Credit Card", 'Message!');
            document.getElementById("headCardNo").scrollIntoView();
            return;
        }
        if ((this.head.CardHoldersName == undefined || this.head.CardHoldersName == 0 || this.head.CardHoldersName == '') && this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.iscardfreeform == false && this.CreditCardSetting == '1') {
            this.toastr.error("Please Insert Card Holder Name", 'Message!');
            const element = this.renderer.selectRootElement("#CardHoldersName");
            element.focus();
            document.getElementById("CardHoldersName").scrollIntoView();
            return;
        }
        if ((this.head.CreditCardType == undefined || this.head.CreditCardType == 0) && this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.iscardfreeform == false && this.CreditCardSetting == '1') {
            this.toastr.error("Please Select Card Type", 'Message!');
            const element = this.renderer.selectRootElement("#CreditCardType");
            element.focus();
            document.getElementById("CreditCardType").scrollIntoView();
            return;
        }
        if ((this.head.CardNumber == undefined || this.head.CardNumber == 0) && this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.iscardfreeform == false && this.CreditCardSetting == '1') {
            this.toastr.error("Please Insert Card Number", 'Message!');
            const element = this.renderer.selectRootElement("#CardNumber");
            element.focus();
            return;
        }

        if (this.isValidCard(this.head.CardNumber) == false && this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.iscardfreeform == false && this.CreditCardSetting == '1') {
            this.toastr.error("Please Insert Valid Card Number", 'Message!');
            const element = this.renderer.selectRootElement("#CardNumber");
            element.focus();
            return;
        }
        if ((this.head.ExpirationMonth == undefined || this.head.ExpirationMonth == 0) && this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.iscardfreeform == false && this.CreditCardSetting == '1') {
            this.toastr.error("Please Select Month", 'Message!');
            document.getElementById("ExpirationMonth").scrollIntoView();
            return;
        }
        if ((this.head.ExpirationYear == undefined || this.head.ExpirationYear == 0) && this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.iscardfreeform == false && this.CreditCardSetting == '1') {
            this.toastr.error("Please Select Year", 'Message!');
            document.getElementById("ExpirationYear").scrollIntoView();
            return;
        }
        if ((this.head.SecurityCode == undefined || this.head.SecurityCode == 0) && this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.iscardfreeform == false && this.CreditCardSetting == '1') {
            this.toastr.error("Please Insert Security Code.", 'Message!');
            const element = this.renderer.selectRootElement("#SecurityCode");
            element.focus();
            return;
        }
        if ((this.head.cardDetailadr1 == undefined || this.head.cardDetailadr1 == '') && this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.iscardfreeform == false && this.CreditCardSetting == '1') {
            this.toastr.error("Please Insert Address 1", 'Message!');
            const element = this.renderer.selectRootElement("#cardAddress1");
            element.focus();
            return;
        }
        if ((this.head.cardDetailselectedCountry == undefined || this.head.cardDetailselectedCountry == '' || this.head.cardDetailselectedCountry == '0') && this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.iscardfreeform == false && this.CreditCardSetting == '1') {
            this.toastr.error("Please Select Country", 'Message!');
            document.getElementById("headcardDetailselectedCountry").scrollIntoView();
            return;
        }
        if ((this.head.cardDetailselectedState == undefined || this.head.cardDetailselectedState == '' || this.head.cardDetailselectedState == '0') && this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.iscardfreeform == false && this.CreditCardSetting == '1') {
            this.toastr.error("Please Select State", 'Message!');
            const element = this.renderer.selectRootElement("#headcardDetailselectedState");
            element.focus();
            return;
        }
        if ((this.head.cardDetailcity == undefined || this.head.cardDetailcity == '') && this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.iscardfreeform == false && this.CreditCardSetting == '1') {
            this.toastr.error("Please Insert City", 'Message!');
            const element = this.renderer.selectRootElement("#headcardDetailcity");
            element.focus();
            return;
        }
        if ((this.head.cardDetailzip == undefined || this.head.cardDetailzip == '') && this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.iscardfreeform == false && this.CreditCardSetting == '1') {
            this.toastr.error("Please Insert Zip", 'Message!');
            const element = this.renderer.selectRootElement("#headcardDetailzip");
            element.focus();
            return;
        }
        if ((this.head.cardDetailEmail == undefined || this.head.cardDetailEmail == '') && this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.iscardfreeform == false && this.CreditCardSetting == '1') {
            this.toastr.error("Please Insert Email", 'Message!');
            const element = this.renderer.selectRootElement("#headcardDetailEmail");
            element.focus();
            return;
        }
        if (this.creditcardcode != undefined && this.creditcardcode != null && this.creditcardcode.indexOf(this.head.PaymentType) != -1 && this.iscardfreeform == false && this.isValidEmail(this.head.cardDetailEmail) == false && this.CreditCardSetting == '1') {
            this.toastr.error("Please Insert Valid Email", 'Message!');
            const element = this.renderer.selectRootElement("#headcardDetailEmail");
            element.focus();
            return;
        }
        if (this.getfinaltotal() >= this.creditcardlimit && this.iskyraden && this.creditcardcode.indexOf(this.head.PaymentType) != -1) {
            this.toastr.error("you can not place order over $10,000  please contact support to order over $10,000", 'Message!');
            return;
        }
        if (this.iskyraden && this.head.shipFOB == "MISC" && this.head.shipnote == '') {
            this.toastr.error("Please Insert Ship Note", 'Message!');
            const element = this.renderer.selectRootElement("#shipnote");
            element.focus();
            return;

        }

        if (this.isorderfraudcheck) {
            this.orderfraudcheck();
        }







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
        Common.setWithExpiry("addrObj" + userId, JSON.stringify(this.billAdr));

        // var wantedDate = new Date(this.head.WantedDate);
        // var cancelDate = new Date(this.head.CancelDate);
        // var wantedDate =this.head.WantedDate.toDate();
        // var cancelDate =this.head.CancelDate.toDate();
        // var dateFormat = (wantedDate.getMonth() + 1) + '/' + wantedDate.getDate() + '/' + wantedDate.getFullYear();
        // var cancelFormat = (cancelDate.getMonth() + 1) + '/' + cancelDate.getDate() + '/' + cancelDate.getFullYear();
        var headLN = {
            "billPhone": this.billAdr.phone,
            "billEmail": this.billAdr.email_address,
            "billcountry": this.billAdr.selectedcountry,
            "billstate": this.billAdr.selectedState,
            "billPostalCode": this.billAdr.PostalCode,
            "billFax": this.billAdr.fax,
            "billname": this.billAdr.name,
            "billAdr": (this.UserType != 4 ? this.billAdr.adr : "[" + this.billAdr.Addr1 + "," + this.billAdr.Addr2 + "," + (this.cityno == 3 ? this.billAdr.City : '') + "," + (this.cityno == 4 ? this.billAdr.City : '') + "]"),
            "bill_adr": (this.UserType != 4 ? JSON.stringify(this.billAdr.adr) : "[" + this.billAdr.Addr1 + "," + this.billAdr.Addr2 + "," + (this.cityno == 3 ? this.billAdr.City : '') + "," + (this.cityno == 4 ? this.billAdr.City : '') + "]"),
            "ship_id": (this.head.ship_to == "-1" ? null : this.head.ship_to),
            "wanted_date": this.head.WantedDate, //new Date(this.head.WantedDate),
            "cancel_date": this.head.CancelDate,
            "job_rel": this.head.JobRelease,
            "cell_phone": this.head.Phone,
            "ship_cmpl": this.head.ShipComplete,
            "cu_po": this.head.PO,
            "orderby_phone": this.head.Contact,
            "enter_by": this.head.enter_by,
            "email": this.head.Email,
            "terms_code": this.head.PaymentType,
            "ship_via_code": (this.head.ShipFOB=="0"?"":this.head.ShipFOB),
            "ship_via_acct": this.head.Account,
            "CardNumber": (this.cardNo == undefined ? this.head.CardNumber : this.cardNo),
            "ExpirationDate": this.head.ExpirationMonth + this.head.ExpirationYear,
            "ExpirationMonth": this.head.ExpirationMonth,
            "ExpirationYear": this.head.ExpirationYear,
            "CardHolderName": this.head.CardHoldersName,
            "CardType": this.head.CreditCardType,
            "SecurityCode": (this.code == undefined ? this.head.SecurityCode : this.code),
            "notes": (this.head.notes == undefined ? "" : this.head.notes) + (this.head.shipnote == undefined ? "" : "|" + " Carrier Name: " + this.head.shipnote),
            "CardNo": this.head.CardNo,
            "Frieght": this.frieght,
            "kraydenwhqty": this.kraydenwhqty,
            "c_tot_code_1": this.frieghtcode,
            "c_tot_code_amt_1": this.frieght,
            "weight": this.totalWeight,
            "customer": userId,
            "rec_type": "O",
            "warehouse": (Common.getWithExpiry("warehouse") == undefined ? this.Guestwarehouse : Common.getWithExpiry("warehouse")),
            "order_by": userId,
            "source_code": "web",
            "s_adr": "[\"" + (this.shipping.Addr1 == undefined ? "" : this.shipping.Addr1) + "\",\"" + (this.shipping.Addr2 == undefined ? "" : this.shipping.Addr2) + "\",\"" + (this.cityno == 3 ? (this.shipping.City == undefined ? "" : this.shipping.City) : '') + "\",\"" + (this.cityno == 4 ? (this.shipping.City == undefined ? "" : this.shipping.City) : '') + "\",\"" + (this.shipping.Province == undefined ? "" : this.shipping.Province) + "\",\"" + "\"]",
            "s_country_code": this.shipping.selectedCountry,
            "residential": this.shipping.Residential,
            "free_form_shipto": this.isAddShip,
            "s_name": this.shipping.ShipName,
            "ship_atn": this.shipping.ShipAttn,
            "s_phone": this.shipping.phone,
            "blind_ship": (this.shipping.blind_ship == undefined ? "no" : this.shipping.blind_ship),
            "s_st": this.shipping.selectedState,
            "s_postal_code": this.shipping.PostalCode,
            "paymentTypeList": this.paymentType,
            "shipFOBList": this.shipFOB,
            "cardDetailadr1": this.head.cardDetailadr1,
            "cardDetailadr2": this.head.cardDetailadr2,
            "cardDetailselectedCountry": this.head.cardDetailselectedCountry,
            "cardDetailselectedState": this.head.cardDetailselectedState,
            "cardDetailcity": this.head.cardDetailcity,
            "cardDetailzip": this.head.cardDetailzip,
            "cardDetailEmail": this.head.cardDetailEmail,
            "profileid": this.head.profileid,
            "isbillingincard": this.isbillingincard,
            "cardid": this.cardid,
            "company_sy": Common.getWithExpiry("company_sy"),
            "orderid": 0,
            "orderstatus": true,
            "response": "",
            "echo": true,
            "complete": false,
            "order": "",
            "bill_phone": this.head.Phone,
            "bill_fax": this.billAdr.fax,
            "o_tot_taxable_it": 0,
            "o_tot_tax_amt": 0,
            "o_tot_net_ar": 0,
            "pofile": this.filename
        };

        var Line = [];
        var j = 0;
        for (let prod of this.cartProducts) {
            j = j + 1;
            Line.push({
                "reference": j,
                "item": prod.itemnumber,
                "image": prod.image,
                "quantity": prod.Quantity,
                "descr": prod.descrarray,
                "um_o": prod.unitMeasure,
                "Note": prod.Note,
                "price": prod.Price,
                "warehouse": (this.iskyraden ? (prod.warehouse == undefined ? Common.getWithExpiry("warehouse") : prod.warehouse) : (Common.getWithExpiry("warehouse") == undefined ? this.Guestwarehouse : Common.getWithExpiry("warehouse"))),
                "price_per": prod.PricePer,
                "product_line": prod.ProductLine,
                "productline": prod.ProductLine,
                "RowID": prod.RowID,
                "freeform": prod.freeform,
                "company_sy": Common.getWithExpiry("company_sy"),
                "order": "",
                "childitem": prod.itemnumber

            });
        }

        var finalObj = {
            "head": headLN,
            "lines": Line,
            "notes": (this.head.notes == undefined ? "" : this.head.notes) + (this.head.shipnote == undefined ? "" : "|" + " Carrier Name: " + this.head.shipnote),
            "echo": true,
            "complete": false,
            "company_sy": Common.getWithExpiry("company_sy")
        }

        Common.setWithExpiry("finalObj", JSON.stringify(finalObj));


        if (isReviewOrder) {
            this.sendMessage('start');
            try {
                this.gototop();
                this.checkoutService.reviewOrder(finalObj).subscribe((res: any) => {
                    this.isSubmitted = true;
                    this.sendMessage('stop');

                    this.cartService.deleteCartByUserId().subscribe((res: any) => {
                        this.cartService.cartBroadCaster(res);
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
                        Common.removeWithExpiry("addrObj" + userId);
                        Common.removeWithExpiry("itemObj");
                        Common.removeWithExpiry("finalObj");

                    });
                });
            } catch (ex) {
                this.sendMessage('stop');
            }
        }

        if ((this.totalAmount >= parseFloat(this.web_order_min_amount) && !isReviewOrder)) {
            this.router.navigate(['review-order']);
        }
        else if (this.totalAmount < parseFloat(this.web_order_min_amount)) {
            this.toastr.error("Order Minimum Value Should Be $" + this.web_order_min_amount, 'Message!');
        }
    }
    deleteProduct(product) {
        var usrid = null
        if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
            usrid = Common.getWithExpiry("UserID");
        }
        else {
            usrid = Common.getWithExpiry("CustID");
        }
        this.cartService.deleteCartItem(product.itemnumber, product.unitMeasure).subscribe((res: any) => {
            this.getCartItems();
            this.cartService.cartBroadCaster(res);
        });
    }
    onPaymentChange(val) {
        
        this.head.CardNo = "0";
        if (val != undefined && val != '' && val != null) {
            this.select_payment_info();
            if (this.CreditCardSetting == '1' && this.creditcardcode.indexOf(val) != -1) {
                this.showPayment = true;
                if (this.cardList != undefined && this.cardList != null && this.cardList.length == 1 && (this.head.CardNo == undefined || this.head.CardNo == null || this.head.CardNo == '0')) {
                    this.head.CardNo = this.cardList[0].Id;
                    this.cardChanged(this.head.CardNo)
                }

            }
            else {
                this.showPayment = false;
            }
        }
        if (this.iskyraden) {
            
            this.isPORequired = "0";
            for (var i = 0; i < this.paymentType.length; i++) {

                if (this.paymentType[i].terms_code == val && this.paymentType[i].descr.indexOf("NET") != -1) {
                    this.isPORequired = "1";
                }

            }
        }


        
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
            this.select_shipping_info();
        }
        else if (val == "same") {
            this.select_shipping_info();
            this.showShipAdd = true;
            this.isAddShip = false;
            this.shipId = "same";
            this.shipName = this.billAdr.name;
            this.ShipAttn = this.billAdr.name;

            if (this.UserType != 4) {
                this.shipCountry = this.billAdr.country_code.trim();
                this.shipZIP = this.billAdr.postal_code;
                this.shipAddr1 = this.billAdr.adr[0].trim();
                this.shipAddr2 = this.billAdr.adr[1].trim();
                this.shipState = this.billAdr.state.trim();
                var getshipadr = this.billAdr;
                if (this.billAdr.adr.length > 0) {
                    var getaddrs = this.billAdr.adr;
                    var gettacadr = '';
                    for (var i = 0; i < getaddrs.length; i++) {
                        if (getaddrs[i] != null && this.shipAdr[i] != ' ' && getaddrs[i].length > 0) {
                            gettacadr = gettacadr + " " + getaddrs[i];
                        }
                    }
                    //this.shipAddr1 = getaddrs[0].trim() + ',' + getaddrs[1].trim();
                    this.shipCity = getaddrs[2].trim() + getaddrs[3].trim();
                }
            } else {
                this.shipCountry = this.billAdr.selectedcountry;
                this.shipZIP = this.billAdr.postal_code;
                this.shipAddr1 = this.billAdr.Addr1;
                this.shipAddr2 = this.billAdr.Addr2;
                this.shipState = this.billAdr.selectedState;
                this.shipCity = this.billAdr.City;
            }
            this.calculateShipRate();
        }
        else {
            this.select_shipping_info();
            this.isAddShip = false;
            this.shipText = "Modify";
            this.showShipAdd = true;
            for (var i = 0; i < this.shipAdr.length; i++) {
                if (this.shipAdr[i].ship_id == val) {
                    
                    this.shipId = this.shipAdr[i].ship_id;
                    this.shipName = this.shipAdr[i].name;
                    this.ShipAttn = this.shipAdr[i].atn;
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
                    if (this.iskyraden) {
                        var ind = 0;
                        var otherproduct = [];
                        this.kraydenwarehouse = [];
                        if (this.cartProducts != undefined && this.cartProducts != null && this.cartProducts.length > 0) {
                            for (let sitem of this.cartProducts) {
                                
                                this.cartService.getwarehouselistforitem(this.shipId, Common.getWithExpiry("CustID"), sitem.itemname, sitem.Quantity).subscribe((res: any) => {
                                    ind = ind + 1;
                                    var getwarehouse = res;
                                    if (getwarehouse != undefined && getwarehouse.length > 0) {


                                        if (getwarehouse.length == 1) {
                                            sitem.warehouse = getwarehouse[0].warehouse;
                                            this.kraydenwarehouse.push(getwarehouse[0].whdetails);
                                        }
                                        else {
                                            for (var i = 0; i < getwarehouse.length; i++) {
                                                this.kraydenwarehouse.push(getwarehouse[i].whdetails);
                                                if (i == 0) {
                                                    sitem.warehouse = getwarehouse[i].warehouse;
                                                    sitem.Quantity = getwarehouse[i].qty;
                                                }
                                                else {
                                                    const copysitem = Object.assign({}, sitem)
                                                    copysitem.warehouse = getwarehouse[i].warehouse;
                                                    copysitem.Quantity = getwarehouse[i].qty;
                                                    copysitem.CartID = copysitem.CartID + 1;
                                                    copysitem.note = i.toString();
                                                    otherproduct.push(copysitem);

                                                }
                                            }
                                        }
                                    }
                                    if (ind == this.cartProducts.length) {
                                         console.log('ind',ind);
                                         console.log('this.cartProducts.length',this.cartProducts.length);
                                        //alert("Please Select Warehouse");
                                        for (let sitem of otherproduct) {
                                            const copysitem = Object.assign({}, sitem)
                                            this.cartProducts.push(copysitem);
                                        }
                                        this.calculateShipRate();
                                    }
                                });

                                if (otherproduct != undefined && otherproduct.length > 0) {

                                    //this.cartProducts.concat(otherproduct);


                                }
                            }
                        }
                    }
                    else {
                        this.calculateShipRate();
                    }
                    break;
                }
            }
        }

    }
    getContactDtl() {
        try {
            if (Common.getWithExpiry("contactDtl") != undefined && Common.getWithExpiry("contactDtl") != null) {
                var contactDtl = JSON.parse(Common.getWithExpiry("contactDtl"));
            }
        } catch (ed) { }
        if (contactDtl == undefined || contactDtl == null) {
            this.contactService.getContact(Common.getWithExpiry("company_sy")).subscribe((res: any) => {
                this.contactDtl = res;
                Common.setWithExpiry("contactDtl", JSON.stringify(this.contactDtl));
                this.contactDtl.adr = JSON.parse(this.contactDtl.adr);
            })
        }
        else {
            this.contactDtl = contactDtl;
            this.contactDtl.adr = JSON.parse(this.contactDtl.adr);
        }
    }

    calculateShipRate() {
        if (!this.iskyraden && (this.webtype == '5' || this.webtype == '6') && (this.contactDtl != undefined && this.contactDtl != null)) {
            var model = {
                "sf_contactname": this.contactDtl.name,
                "sf_companyname": this.contactDtl.name,
                "sf_street1": this.contactDtl.adr[0],
                "sf_country": this.contactDtl.country_code,
                "sf_postalcode": this.contactDtl.postal_code,
                "sf_city": this.contactDtl.adr[2] + this.contactDtl.adr[3],
                "sf_phone": this.contactDtl.phone,
                "sf_street2": this.contactDtl.adr[1],
                "sf_state": this.contactDtl.state,
                "sf_email": this.contactDtl.co_email,
                "sf_fax": this.contactDtl.fax,
                "st_contactname": (this.shipName == undefined ? this.shipping.ShipName : (this.shipName == '' ? this.shipping.ShipName : this.shipName)),
                "st_street1": (this.shipAddr1 == undefined ? this.shipping.Addr1 : (this.shipAddr1 == '' ? this.shipping.Addr1 : this.shipAddr1)),
                "st_city": (this.shipCity == undefined ? this.shipping.City : (this.shipCity == '' ? this.shipping.City : this.shipCity)),
                "st_postalcode": (this.shipZIP == undefined ? this.shipping.PostalCode : (this.shipZIP == '' ? this.shipping.PostalCode : this.shipZIP)),
                "st_state": (this.shipState == undefined ? this.shipping.selectedState : (this.shipState == '' ? this.shipping.selectedState : this.shipState)),
                "st_country": this.shipCountry == "USA" ? "US" : (this.shipCountry == undefined ? this.shipping.selectedCountry : (this.shipCountry == '' ? this.shipping.selectedCountry : this.shipCountry)),
                "weight_value": this.totalWeight
            }
            this.sendMessage("start");
            this.cartService.GetAllShipServicesRates(model).subscribe((res: any) => {
                var result = res;
                this.IsShipment=true;
                this.sendMessage("stop");
                if (result != undefined && result != null && result.length > 0) {
                    for (let sitem of this.shipFOB) {
                        //sitem.frieghtvalue = undefined;
                        for (let item of result) {
                            if (item.ProviderCode == sitem.service_type) {
                                sitem.descr = sitem.descr;
                                // + " (" + item.TotalCharges + ")";
                                sitem.frieghtvalue = item.TotalCharges;

                                if (sitem.markup > 0) {
                                    if (sitem.mtype == 1) {
                                        sitem.frieghtvalue = (parseFloat(sitem.frieghtvalue) + (parseFloat(sitem.frieghtvalue) * sitem.markup) / 100).toString();
                                    }
                                    else {
                                        sitem.frieghtvalue = parseFloat(sitem.frieghtvalue) + parseFloat(sitem.markup);
                                    }
                                }
                                if (this.iskyraden) {
                                    for (let pitem of this.cartProducts) {
                                        if (pitem.profile2[11] == "AMBIENT,HAZARDOUS" && sitem.sertype.indexOf("Ground") != -1) {
                                            //let box = parseFloat(pitem.profile2[10]) / 60
                                            let box = Math.ceil(parseFloat((parseFloat(pitem.profile2[10]) / 60).toString()));
                                            if (box > 0) {
                                                sitem.frieghtvalue = parseFloat(sitem.frieghtvalue) + (box * this.AMBIENTHAZARDOUSmarkup);
                                            }
                                        }
                                        if (pitem.profile2[11] == "AMBIENT,HAZARDOUS" && sitem.sertype.indexOf("LTL") != -1) {
                                            //let box = parseFloat(pitem.profile2[10]) / 2000
                                            let box = Math.ceil(parseFloat((parseFloat(pitem.profile2[10]) / 2000).toString()));
                                            if (box > 0) {
                                                sitem.frieghtvalue = parseFloat(sitem.frieghtvalue) + (box * this.AMBIENTHAZARDOUSmarkup1);
                                            }
                                        }
                                        if (pitem.profile2[11] == "COLD,HAZARDOUS" && sitem.sertype.indexOf("Air") != -1) {
                                            //let box = parseFloat(pitem.profile2[10]) / 60
                                            let box = Math.ceil(parseFloat((parseFloat(pitem.profile2[10]) / 60).toString()));
                                            if (box > 0) {
                                                sitem.frieghtvalue = parseFloat(sitem.frieghtvalue) + (box * this.COLDHAZARDOUSmarkup);
                                            }
                                        }
                                        if (pitem.profile2[11] == "FROZEN,HAZARDOUS" && sitem.sertype.indexOf("Air") != -1) {
                                            //let box = parseFloat(pitem.profile2[10]) / 60
                                            let box = Math.ceil(parseFloat((parseFloat(pitem.profile2[10]) / 60).toString()));
                                            if (box > 0) {
                                                sitem.frieghtvalue = parseFloat(sitem.frieghtvalue) + (box * this.FROZENHAZARDOUSmarkup);
                                            }
                                        }
                                    }
                                }
                                sitem.frieghtvalue = (Math.round(sitem.frieghtvalue * 100) / 100).toFixed(2);
                            }
                        }
                    }
                }
                else {
                    for (let sitem of this.shipFOB) {
                        sitem.frieghtvalue = undefined;
                    }
                }

                if (this.head.ShipFOB != undefined && this.head.ShipFOB != '' && this.head.ShipFOB != '0') {
                    this.onShipViaChange(this.head.ShipFOB);
                }

                this.shipFOB = arraySort(this.shipFOB, ['frieghtvalue']);
            })




        }
        else {
            if (this.kraydenwarehouse != undefined && this.kraydenwarehouse.length > 0) {

                const distinctThings = this.kraydenwarehouse.filter(
                    (thing, i, arr) => arr.findIndex(t => t.warehouse1 === thing.warehouse1) === i
                );
                        console.log('distinctThings',distinctThings);
                // this.kraydenwarehouse = this.kraydenwarehouse
                //     .map(item => item.warehouse1)
                //     .filter((value, index, self) => self.indexOf(value) === index);
                let cnt = 0;
                for (let kitem of distinctThings) {
                    cnt = cnt + 1;
                    try{
                    kitem.adr = JSON.parse(kitem.adr);
                    }catch(ed){}
                    var model = {
                        "sf_contactname": kitem.name,
                        "sf_companyname": kitem.name,
                        "sf_street1": kitem.adr[0],
                        "sf_country": kitem.country_code,
                        "sf_postalcode": kitem.postal_code,
                        "sf_city": kitem.adr[2] + kitem.adr[3],
                        "sf_phone": kitem.phone,
                        "sf_street2": kitem.adr[1],
                        "sf_state": kitem.state,
                        "sf_email": kitem.email_address,
                        "sf_fax": kitem.fax,
                        "st_contactname": (this.shipName == undefined ? this.shipping.ShipName : (this.shipName == '' ? this.shipping.ShipName : this.shipName)),
                        "st_street1": (this.shipAddr1 == undefined ? this.shipping.Addr1 : (this.shipAddr1 == '' ? this.shipping.Addr1 : this.shipAddr1)),
                        "st_city": (this.shipCity == undefined ? this.shipping.City : (this.shipCity == '' ? this.shipping.City : this.shipCity)),
                        "st_postalcode": (this.shipZIP == undefined ? this.shipping.PostalCode : (this.shipZIP == '' ? this.shipping.PostalCode : this.shipZIP)),
                        "st_state": (this.shipState == undefined ? this.shipping.selectedState : (this.shipState == '' ? this.shipping.selectedState : this.shipState)),
                        "st_country": this.shipCountry == "USA" ? "US" : (this.shipCountry == undefined ? this.shipping.selectedCountry : (this.shipCountry == '' ? this.shipping.selectedCountry : this.shipCountry)),
                        "weight_value": this.totalWeight
                    }
                    this.sendMessage("start");
                    this.cartService.GetAllShipServicesRates(model).subscribe((res: any) => {
                        var result = res;
                        this.IsShipment=true;
                        this.sendMessage("stop");
                        if (result != undefined && result != null && result.length > 0) {
                            for (let sitem of this.shipFOB) {

                                //sitem.frieghtvalue = undefined;
                                for (let item of result) {
                                    if (item.ProviderCode == sitem.service_type) {

                                        try {
                                            if (cnt == 1) {
                                                sitem.frieghtvalue = undefined;
                                            }
                                            sitem.descr = sitem.descr;
                                            // + " (" + item.TotalCharges + ")";
                                            //sitem.frieghtvalue =sitem.frieghtvalue+ item.TotalCharges;

                                            if (sitem.markup > 0) {
                                                if (sitem.mtype == 1) {
                                                    item.TotalCharges = (parseFloat(item.TotalCharges) + ((parseFloat(item.TotalCharges) * sitem.markup) / 100)).toString();
                                                }
                                                else {
                                                    item.TotalCharges = parseFloat(item.TotalCharges) + (parseFloat(item.TotalCharges) + parseFloat(sitem.markup));
                                                }
                                            }
                                            if (this.iskyraden) {
                                                for (let pitem of this.cartProducts) {
                                                    if (pitem.profile2[11] == "AMBIENT,HAZARDOUS" && sitem.sertype.indexOf("Ground") != -1) {
                                                        //let box = parseFloat(pitem.profile2[10]) / 60
                                                        let box = Math.ceil(parseFloat(((parseFloat(pitem.profile2[10]) * parseInt(pitem.Quantity)) / 60).toString()));
                                                        if (box > 0) {
                                                            item.TotalCharges = parseFloat(item.TotalCharges) + (box * this.AMBIENTHAZARDOUSmarkup);
                                                        }
                                                    }
                                                    if (pitem.profile2[11] == "AMBIENT,HAZARDOUS" && sitem.sertype.indexOf("LTL") != -1) {
                                                        //let box = parseFloat(pitem.profile2[10]) / 2000
                                                        let box = Math.ceil(parseFloat(((parseFloat(pitem.profile2[10]) * parseInt(pitem.Quantity)) / 2000).toString()));
                                                        if (box > 0) {
                                                            item.TotalCharges = parseFloat(item.TotalCharges) + (box * this.AMBIENTHAZARDOUSmarkup1);
                                                        }
                                                    }
                                                    if (pitem.profile2[11] == "COLD,HAZARDOUS" && sitem.sertype.indexOf("Air") != -1) {
                                                        //let box = parseFloat(pitem.profile2[10]) / 60
                                                        let box = Math.ceil(parseFloat(((parseFloat(pitem.profile2[10]) * parseInt(pitem.Quantity)) / 60).toString()));
                                                        if (box > 0) {
                                                            item.TotalCharges = parseFloat(item.TotalCharges) + (box * this.COLDHAZARDOUSmarkup);
                                                        }
                                                    }
                                                    if (pitem.profile2[11] == "FROZEN,HAZARDOUS" && sitem.sertype.indexOf("Air") != -1) {
                                                        //let box = parseFloat(pitem.profile2[10]) / 60
                                                        let box = Math.ceil(parseFloat(((parseFloat(pitem.profile2[10]) * parseInt(pitem.Quantity)) / 60).toString()));
                                                        if (box > 0) {
                                                            item.TotalCharges = parseFloat(item.TotalCharges) + (box * this.FROZENHAZARDOUSmarkup);
                                                        }
                                                    }
                                                }
                                            }

                                            if (item.TotalCharges != undefined && item.TotalCharges > 0) {
                                                var fcode = {
                                                    wh: kitem.warehouse1,
                                                    TotalCharges: item.TotalCharges
                                                }
                                                sitem.whfrieght.push(fcode);
                                                const distinctwhfrieght = sitem.whfrieght.filter(
                                                    (thing, i, arr) => arr.findIndex(t => t.wh === thing.wh) === i
                                                );
                                                sitem.whfrieght=distinctwhfrieght;
                                                console.log('distinctwhfrieght',distinctwhfrieght);
                                            }
                                            sitem.frieghtvalue = parseFloat((sitem.frieghtvalue == undefined ? 0 : sitem.frieghtvalue)) + parseFloat(item.TotalCharges);
                                            sitem.frieghtvalue = (Math.round(sitem.frieghtvalue * 100) / 100).toFixed(2);
                                        } catch (ed) {
                                            console.log('ed', ed);
                                        }
                                    }
                                }
                            }
                            
                        }
                        else {
                            for (let sitem of this.shipFOB) {
                                sitem.frieghtvalue = undefined;
                            }
                        }

                        if (this.head.ShipFOB != undefined && this.head.ShipFOB != '' && this.head.ShipFOB != '0') {
                            this.onShipViaChange(this.head.ShipFOB);
                        }
                        this.shipFOB = this.shipFOB.filter(t=>t.frieghtvalue > 0 || t.web_descr.indexOf("Account") != -1 );
                        this.shipFOB = arraySort(this.shipFOB, ['frieghtvalue']);
                    })
                }
            }
        }
    }






    onShipViaChange(event) {

        this.frieght = 0;
        for (let item of this.shipFOB) {
            if (event == item.ship_via_code) {
                this.frieght = (item.frieghtvalue == undefined ? 0 : item.frieghtvalue);
                if (this.iskyraden) {
                    if (this.iskyraden && item.billing_opt != undefined && item.billing_opt != null && (item.billing_opt == 'Recipient' || item.billing_opt == 'Receiver') && this.isShowAccount == '1') {
                        this.isshipviaaccountrequired = true;
                        this.isShowAccount = '1';
                    }
                    else {
                        this.isshipviaaccountrequired = false;
                        this.isShowAccount = '1';
                    }
                    if(this.frieght>0){
                        this.isshipviaaccountrequired = false;
                        this.isShowAccount = '0';
                    }
                    
                    this.kraydenwhqty = item.whfrieght;
                }


            }
        }
        // if (event == "UPS3")
        //     this.frieght = this.ups_3_day_select;
        // else if (event == "FED2")
        //     this.frieght = this.fedex_2day;
        // else if (event == "FEDX")
        //     this.frieght = this.fedex_firstday;
        // else if (event == "UPAS")
        //     this.frieght = this.ups_next_day_air_saver;
        // else if (event == "UPRG")
        //     this.frieght = this.ups_ground;
        // else if (event == "UPRR")
        //     this.frieght = this.ups_next_day;
        // else if (event == "UPSG")
        //     this.frieght = this.ups_ground;
        // else
        //     this.frieght = 0;

        //this.totalAmount = this.cartTotal + this.frieght;
        this.getfinaltotal();

    }
    onCreateShipTo() {

        // var wantedDate = new Date(this.head.WantedDate);
        // var cancelDate = new Date(this.head.CancelDate);
        // var wantedDate =this.head.WantedDate.toDate();
        // var cancelDate =this.head.CancelDate.toDate();
        // var dateFormat = (wantedDate.getMonth() + 1) + '/' + wantedDate.getDate() + '/' + wantedDate.getFullYear();
        // var dateFormat1 = (cancelDate.getMonth() + 1) + '/' + cancelDate.getDate() + '/' + cancelDate.getFullYear();
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
        var headLN = {
            "billPhone": this.billAdr.phone,
            "billEmail": this.billAdr.email_address,
            "billcountry": this.billAdr.selectedcountry,
            "billstate": this.billAdr.selectedState,
            "billPostalCode": this.billAdr.PostalCode,
            "billFax": this.billAdr.fax,
            "billname": this.billAdr.name,
            "billAdr": (this.UserType != 4 ? this.billAdr.adr : "[" + this.billAdr.Addr1 + "," + this.billAdr.Addr2 + "," + (this.cityno == 3 ? this.billAdr.City : '') + "," + (this.cityno == 4 ? this.billAdr.City : '') + "]"),
            "bill_adr": (this.UserType != 4 ? JSON.stringify(this.billAdr.adr) : "[" + this.billAdr.Addr1 + "," + this.billAdr.Addr2 + "," + (this.cityno == 3 ? this.billAdr.City : '') + "," + (this.cityno == 4 ? this.billAdr.City : '') + "]"),
            "ship_id": (this.head.ship_to == "-1" ? null : this.head.ship_to),
            "wanted_date": this.head.WantedDate, //new Date(this.head.WantedDate),
            "cancel_date": this.head.CancelDate,
            "job_rel": this.head.JobRelease,
            "cell_phone": this.head.Phone,
            "ship_cmpl": this.head.ShipComplete,
            "cu_po": this.head.PO,
            "orderby_phone": this.head.Contact,
            "enter_by": this.head.enter_by,
            "email": this.head.Email,
            "terms_code": this.head.PaymentType,
            "ship_via_code": (this.head.ShipFOB=="0"?"":this.head.ShipFOB),
            "ship_via_acct": this.head.Account,
            //"CardNumber": this.head.CardNumber,
            "CardNumber": this.cardNo,
            "ExpirationDate": this.head.ExpirationMonth + this.head.ExpirationYear,
            "ExpirationMonth": this.head.ExpirationMonth,
            "ExpirationYear": this.head.ExpirationYear,
            "CardHolderName": this.head.CardHoldersName,
            "CardType": this.head.CreditCardType,
            //"SecurityCode": this.head.SecurityCode,
            "SecurityCode": this.code,
            "notes": (this.head.notes == undefined ? "" : this.head.notes) + (this.head.shipnote == undefined ? "" : "|" + " Carrier Name: " + this.head.shipnote),
            "CardNo": this.head.CardNo,
            "Frieght": this.frieght,
            "kraydenwhqty": this.kraydenwhqty,
            "weight": this.totalWeight,
            "c_tot_code_1": this.frieghtcode,
            "c_tot_code_amt_1": this.frieght,
            //Following field are needed to create temp order
            "customer": userId,
            "rec_type": "O",
            "ord_class": "",
            "warehouse": (Common.getWithExpiry("warehouse") == undefined ? this.Guestwarehouse : Common.getWithExpiry("warehouse")),
            "order_by": userId,
            "residential": this.shipping.Residential,
            "source_code": "web",
            "blind_ship": (this.shipping.blind_ship == undefined ? "no" : this.shipping.blind_ship),
            "s_name": this.shipping.ShipName,
            "ship_atn": this.shipping.ShipAttn,
            "s_phone": this.shipping.phone,
            "paymentTypeList": this.paymentType,
            "shipFOBList": this.shipFOB,
            "cardDetailadr1": this.head.cardDetailadr1,
            "cardDetailadr2": this.head.cardDetailadr2,
            "cardDetailselectedCountry": this.head.cardDetailselectedCountry,
            "cardDetailselectedState": this.head.cardDetailselectedState,
            "cardDetailcity": this.head.cardDetailcity,
            "cardDetailzip": this.head.cardDetailzip,
            "cardDetailEmail": this.head.cardDetailEmail,
            "profileid": this.head.profileid,
            "isbillingincard": this.isbillingincard,
            "cardid": this.cardid,
            "pofile": this.filename
        };

        var Line = [];

        for (let prod of this.cartProducts) {
            Line.push({
                "reference": 1,
                "item": prod.itemnumber,
                "image": prod.image,
                "quantity": prod.Quantity,
                "descr": prod.descr,
                "um_o": prod.unitMeasure,
                "Note": prod.Note,
                "warehouse": (this.iskyraden ? (prod.warehouse == undefined ? Common.getWithExpiry("warehouse") : prod.warehouse) : (Common.getWithExpiry("warehouse") == undefined ? this.Guestwarehouse : Common.getWithExpiry("warehouse"))),
                "price": prod.Price,
                "price_per": prod.PricePer,
                "product_line": prod.ProductLine,
                "freeform": prod.freeform,
            });
        }

        var finalObj = {
            "head": headLN,
            "lines": Line,
            "notes": (this.head.notes == undefined ? "" : this.head.notes) + (this.head.shipnote == undefined ? "" : "|" + " Carrier Name: " + this.head.shipnote),
            "echo": true,
            "complete": false,
        }

        Common.setWithExpiry("finalObj", JSON.stringify(finalObj));

        //this.router.navigate(["/shipping-address/" + this.head.ship_to]);
        if (this.head.ship_to != undefined && this.head.ship_to != null && this.head.ship_to != '0') {
            this.router.navigate(["/shipping-address/" + this.head.ship_to + "/checkout"]);
        }
        else {
            this.router.navigate(["/shipping-address/0/checkout"]);
        }

    }
   
    onCardAdd() {

        // var wantedDate = new Date(this.head.WantedDate);
        // var cancelDate = new Date(this.head.cancelDate);
        // var wantedDate =this.head.WantedDate.toDate();
        // var cancelDate =this.head.CancelDate.toDate();
        // var dateFormat = (wantedDate.getMonth() + 1) + '/' + wantedDate.getDate() + '/' + wantedDate.getFullYear();
        // var dateFormat1 = (cancelDate.getMonth() + 1) + '/' + cancelDate.getDate() + '/' + cancelDate.getFullYear();
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
        var headLN = {
            "billPhone": this.billAdr.phone,
            "billEmail": this.billAdr.email_address,
            "billcountry": this.billAdr.selectedcountry,
            "billstate": this.billAdr.selectedState,
            "billPostalCode": this.billAdr.PostalCode,
            "billFax": this.billAdr.fax,
            "billname": this.billAdr.name,
            "billAdr": (this.UserType != 4 ? this.billAdr.adr : "[" + this.billAdr.Addr1 + "," + this.billAdr.Addr2 + "," + (this.cityno == 3 ? this.billAdr.City : '') + "," + (this.cityno == 4 ? this.billAdr.City : '') + "]"),
            "bill_adr": (this.UserType != 4 ? JSON.stringify(this.billAdr.adr) : "[" + this.billAdr.Addr1 + "," + this.billAdr.Addr2 + "," + (this.cityno == 3 ? this.billAdr.City : '') + "," + (this.cityno == 4 ? this.billAdr.City : '') + "]"),
            "ship_id": (this.head.ship_to == "-1" ? null : this.head.ship_to),
            "wanted_date": this.head.WantedDate, //new Date(this.head.WantedDate),
            "cancel_date": this.head.cancelDate,
            "job_rel": this.head.JobRelease,
            "cell_phone": this.head.Phone,
            "ship_cmpl": this.head.ShipComplete,
            "cu_po": this.head.PO,
            "orderby_phone": this.head.Contact,
            "enter_by": this.head.enter_by,
            "email": this.head.Email,
            "terms_code": this.head.PaymentType,
            "ship_via_code": (this.head.ShipFOB=="0"?"":this.head.ShipFOB),
            "ship_via_acct": this.head.Account,
            //"CardNumber": this.head.CardNumber,
            "CardNumber": this.cardNo,
            "ExpirationDate": this.head.ExpirationMonth + this.head.ExpirationYear,
            "ExpirationMonth": this.head.ExpirationMonth,
            "ExpirationYear": this.head.ExpirationYear,
            "CardHolderName": this.head.CardHoldersName,
            "CardType": this.head.CreditCardType,
            //"SecurityCode": this.head.SecurityCode,
            "SecurityCode": this.code,
            "notes": (this.head.notes == undefined ? "" : this.head.notes) + (this.head.shipnote == undefined ? "" : "|" + " Carrier Name: " + this.head.shipnote),
            "CardNo": this.head.CardNo,
            "Frieght": this.frieght,
            "kraydenwhqty": this.kraydenwhqty,
            "weight": this.totalWeight,
            "c_tot_code_1": this.frieghtcode,
            "c_tot_code_amt_1": this.frieght,
            //Following field are needed to create temp order
            "customer": userId,
            "rec_type": "O",
            "ord_class": "",
            "warehouse": (Common.getWithExpiry("warehouse") == undefined ? this.Guestwarehouse : Common.getWithExpiry("warehouse")),
            "order_by": userId,
            "residential": this.shipping.Residential,
            "source_code": "web",
            "blind_ship": (this.shipping.blind_ship == undefined ? "no" : this.shipping.blind_ship),
            "s_name": this.shipping.ShipName,
            "ship_atn": this.shipping.ShipAttn,
            "s_phone": this.shipping.phone,
            "paymentTypeList": this.paymentType,
            "shipFOBList": this.shipFOB,
            "cardDetailadr1": this.head.cardDetailadr1,
            "cardDetailadr2": this.head.cardDetailadr2,
            "cardDetailselectedCountry": this.head.cardDetailselectedCountry,
            "cardDetailselectedState": this.head.cardDetailselectedState,
            "cardDetailcity": this.head.cardDetailcity,
            "cardDetailzip": this.head.cardDetailzip,
            "cardDetailEmail": this.head.cardDetailEmail,
            "profileid": this.head.profileid,
            "isbillingincard": this.isbillingincard,
            "cardid": this.cardid,
            "pofile": this.filename
        };

        var Line = [];
        if (this.cartProducts != null && this.cartProducts != undefined && this.cartProducts.length > 0) {
            for (let prod of this.cartProducts) {
                Line.push({
                    "reference": 1,
                    "item": prod.itemnumber,
                    "image": prod.image,
                    "quantity": prod.Quantity,
                    "descr": prod.descr,
                    "um_o": prod.unitMeasure,
                    "warehouse": (this.iskyraden ? (prod.warehouse == undefined ? Common.getWithExpiry("warehouse") : prod.warehouse) : (Common.getWithExpiry("warehouse") == undefined ? this.Guestwarehouse : Common.getWithExpiry("warehouse"))),
                    "Note": prod.Note,
                    "price": prod.Price,
                    "price_per": prod.PricePer,
                    "product_line": prod.ProductLine,
                    "freeform": prod.freeform,
                });
            }
        }

        var finalObj = {
            "head": headLN,
            "lines": Line,
            "notes": (this.head.notes == undefined ? "" : this.head.notes) + (this.head.shipnote == undefined ? "" : "|" + " Carrier Name: " + this.head.shipnote),
            "echo": true,
            "complete": false,
        }

        Common.setWithExpiry("finalObj", JSON.stringify(finalObj));

        this.cardid = this.cardid == undefined ? 0 : this.cardid;
        this.router.navigate(["/addyourcard/" + this.cardid + "/checkout/" + this.totalAmount + '/1']);
    }
    getaddresscityno(country) {
        this.cartService.GetCountryaddressCityCode(country).subscribe((res: any) => {
            this.cityno = res;
        });
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
        this.calculateShipRate();
    }
}

