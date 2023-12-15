import { Injectable } from '@angular/core';
// import { Product } from './shared/product.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Common, Guid } from '../model/common.model';
import { DataService } from './data.service';

import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { environment } from '../../environments/environment.development';
// import { PARAMETERS } from '@angular/core/src/util/decorators';


@Injectable()
export class CartService {

  pageno: any;
  pagesize: any;
  stype: any;
  itemname: any;
  backflag: any = '0';
  Position: any;
  products: any[] = []
  cartTotal: number = 0;
  private customer = new Subject<any>();
  private productAddedSource = new Subject<any>();
  private productAddedSource1 = new Subject<any>();
  private productUpdatedSource = new Subject<any>();
  private productUpdatedLoginSource = new Subject<any>();
  private southernPunchOutSource = new Subject<any>();
  southernAdded$ = this.southernPunchOutSource.asObservable();
  customeradded$ = this.customer.asObservable();
  productAdded$ = this.productAddedSource.asObservable();
  productAdded1$ = this.productAddedSource1.asObservable()
  productUpdated$ = this.productUpdatedSource.asObservable();
  productUpdatedLogin$ = this.productUpdatedLoginSource.asObservable();

  iscasafina:any;
  constructor(private http: HttpClient,private dataService: DataService,private gtmService: GoogleTagManagerService) {
    // Common = new Common();
    // this.cookname = Common.cookname;
    this.pageno = undefined;
    this.iscasafina=environment.iscasafina;

  }


  setpageno(pageno:any) {

    this.pageno = pageno;
  }
  getpageno() {

    return this.pageno;
  }
  setbackflag(backflag:any) {

    this.backflag = backflag;
  }
  getbackflag() {
    return this.backflag;
  }
  setitemname(item:any) {

    this.itemname = item;

  }
  getitemname() {

    return this.itemname;
  }

  setpagesizeno(pagesize:any) {
    this.pagesize = pagesize;

  }
  getpagesizeno() {

    return this.pagesize;
  }
  tagmanager(product:any) {
    try{
    var item = [];
    var total = product.list_price;
    console.log('product',product);
        item.push({ "item_id": product.itemnumber, "item_name": product.itemnumber, "item_brand": product.descr, "item_category": product.itemnumber, "item_category2": product.descr, "item_list_id": "", "item_list_name": product.itemnumber, "price": product.Price, "quantity": product.Quantity })
    
    var gtmTag = {
        event: 'add_to_cart',
        ecommerce: {
            currency: "USD",
            value: total,
            items: item
        }
    };
    console.log('gtmService',gtmTag);
    this.gtmService.pushTag(gtmTag);
}catch(ex:any){
    console.log(ex.toString());
}
}

  setstype(stype:any) {
    this.stype = stype;

  }
  getstype() {

    return this.stype;
  }
  setPosition(Position:any) {
    this.Position = Position;
  }
  getPosition() {
    return this.Position;
  }

  addProductToCart(product:any, sum:any) {
    var userid = null;
    var subuserid = null;
    if (Common.getWithExpiry("CustID") != undefined && Common.getWithExpiry("CustID") != null && Common.getWithExpiry("CustID") != '') {
      userid = Common.getWithExpiry("CustID");
      if(this.iscasafina){
        subuserid = Common.getWithExpiry("subuser");
      }
      else{
      subuserid = (Common.getWithExpiry("UserID")==undefined?Common.getWithExpiry("SalesUserID"):Common.getWithExpiry("UserID"));
      }
    }
    else {
      userid = this.getSessionId();
      subuserid = this.getSessionId();
    }
    if (product.list_price > 0) {

    }
    else {
      product.list_price = 0;
    }
    var cartModel = {
      "itemnumber": product.itemname,
      "Quantity": product.quantity,
      "MeasureUnit": sum,
      "Price": product.quantity * product.list_price,
      "UserId": userid,
      "SessionId": subuserid,
      "PricePer": product.list_price,
      "descr": product.descr,
      "company_sy": Common.getWithExpiry("company_sy")
    }
    
    try {
      this.tagmanager(cartModel); 
      if (Common.getWithExpiry(userid + subuserid + Common.getWithExpiry("company_sy")) != undefined) {
        var getlistofcard = JSON.parse(Common.getWithExpiry(userid + subuserid + Common.getWithExpiry("company_sy")));
      }
    } catch (ed) { }
    if (getlistofcard != undefined && getlistofcard != null && getlistofcard.length > 0) {
      getlistofcard.push(cartModel);
    }
    else {
      getlistofcard = [];
      getlistofcard.push(cartModel);
    }
    Common.setWithExpiry(userid + subuserid + Common.getWithExpiry("company_sy"), JSON.stringify(getlistofcard))
    return this.http.post(environment.APIUrl + '/Product/InsertCart', cartModel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
    //return JSON.stringify(true);
  }

  addProductToCartPunchOut(UserID:any, SubuserID: any, product:any, sum: any) {
    let userId = UserID;
    if (product.list_price > 0) {

    }
    else {
      product.list_price = 0;
    }

    var cartModel = {
      "itemnumber": product.itemname,
      "Quantity": product.quantity,
      "MeasureUnit": sum,
      "Price": product.quantity * product.list_price,
      "UserId": userId == undefined ? 0 : userId,
      "SessionId": SubuserID == undefined ? this.getSessionId() : SubuserID,
      "PricePer": product.list_price,
      "descr": product.descr,
      "company_sy": Common.getWithExpiry("company_sy")
    }
    try {
      if (Common.getWithExpiry(userId + SubuserID + Common.getWithExpiry("company_sy")) != undefined) {
        var getlistofcard = JSON.parse(Common.getWithExpiry(userId + SubuserID + Common.getWithExpiry("company_sy")));
      }
    } catch (ed) { }
    if (getlistofcard != undefined && getlistofcard != null && getlistofcard.length > 0) {
      getlistofcard.push(cartModel);
    }
    else {
      getlistofcard = [];
      getlistofcard.push(cartModel);
    }
    Common.setWithExpiry(userId + SubuserID + Common.getWithExpiry("company_sy"), JSON.stringify(getlistofcard))
    return this.http.post(environment.APIUrl + '/Product/InsertCartPunchOut', cartModel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
    //return JSON.stringify(true);
  }

  updateCart(product:any) {
    var userid = null;
    var subuserid = null;
    if (Common.getWithExpiry("CustID") != undefined && Common.getWithExpiry("CustID") != null && Common.getWithExpiry("CustID") != '') {
      userid = Common.getWithExpiry("CustID");
      if(this.iscasafina){
        subuserid = Common.getWithExpiry("subuser");
      }
      else{
      subuserid = (Common.getWithExpiry("UserID")==undefined?Common.getWithExpiry("SalesUserID"):Common.getWithExpiry("UserID"));
      }
    }
    else {
      userid = this.getSessionId();
      subuserid = this.getSessionId();
    }
    var cartModel = {
      "itemnumber": product.itemname,
      "Quantity": product.Quantity,
      "MeasureUnit": product.MeasureUnit,
      "Price": product.Quantity * product.PricePer,
      "UserId": userid,
      "SessionId": subuserid,
      "PricePer": product.PricePer,
      "Note": product.Note,
      "descr": product.descr,
      "unitMeasure": product.unitMeasure,
      "company_sy": Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/UpdateCart', cartModel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  updateCartSession() {
    var userid = null;
    var subuserid = null;
    if (Common.getWithExpiry("CustID") != undefined && Common.getWithExpiry("CustID") != null && Common.getWithExpiry("CustID") != '') {
      userid = Common.getWithExpiry("CustID");
      if(this.iscasafina){
        subuserid = Common.getWithExpiry("subuser");
      }
      else{
      subuserid = (Common.getWithExpiry("UserID")==undefined?Common.getWithExpiry("SalesUserID"):Common.getWithExpiry("UserID"));
      }
    }
    else {
      userid = this.getSessionId();
      subuserid = this.getSessionId();
    }
    var umodel = {
      userId: userid,
      sessionId: subuserid,
      "company_sy": Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/UpdateCartSession', umodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }




  getCartItemByUserID() {
    var userid = null;
    var subuserid = null;
    if (Common.getWithExpiry("CustID") != undefined && Common.getWithExpiry("CustID") != null && Common.getWithExpiry("CustID") != '') {
      userid = Common.getWithExpiry("CustID");
      if(this.iscasafina){
        subuserid = Common.getWithExpiry("subuser");
      }
      else{
      subuserid = (Common.getWithExpiry("UserID")==undefined?Common.getWithExpiry("SalesUserID"):Common.getWithExpiry("UserID"));
      }
    }
    else {
      userid = this.getSessionId();
      subuserid = this.getSessionId();
    }
    var umodel = {
      UserId: userid,
      SessionId: subuserid,
      company_sy: Common.getWithExpiry("company_sy")
    }
    //return this.http.post(environment.APIUrl + '/Product/GetCartItems', umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
    return this.http.post(environment.APIUrl + '/Product/GetCartItemsByUserId', umodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
    // }
    // else {
    //   var u1model = {
    //     UserId: userId,
    //     SessionId: SubuserID,
    //     company_sy: Common.getWithExpiry("company_sy")
    //   }
    //   return this.http.post(environment.APIUrl + '/Product/GetCartItemsByUserId', u1model);
    // }
    //return Common.getWithExpiry(UserID+SubuserID+Common.getWithExpiry("company_sy"));
  }
  cartBroadCaster(product: any) {
    this.productAddedSource.next({ products: product });
  }

  cartBroadCaster1(totalCount: any) {
    this.productAddedSource1.next({ data: totalCount });
  }

  customerBroadCaster(customer: any) {
    this.customer.next(customer);
  }

  southernPunchOutBroadcast(res: any) {
    this.southernPunchOutSource.next({ result: res });
  }

  CreatesystaemUser(customer: any) {
    var umodel = {
      customer: customer,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/CreateSystemUser', umodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  addtocartforsouthern(productlist: any) {    
    return this.http.post(environment.APIUrl + '/ecommerce/addtocartforsouthern', productlist, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  updateCartForSession() {
    let sessionId = this.getSessionId();
    var userid = Common.getWithExpiry("CustID");
    var subuserid=null;
    if(this.iscasafina){
      subuserid = Common.getWithExpiry("subuser");
    }
    else{
    subuserid = (Common.getWithExpiry("UserID")==undefined?Common.getWithExpiry("SalesUserID"):Common.getWithExpiry("UserID"));
    }
    var model = {
      SessionId: sessionId,
      UserId: userid,
      Subuserid: subuserid
    }
    return this.http.post(environment.APIUrl + '/Product/UpdateCartForSessionCart', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  cartBroadCasterLogin(UserID: any, SubuserID: any) {
    let userId = UserID;
    //let getusertype = UserType;
    // if(getusertype=="4"){
    //   userId=null;
    // }
    let sessionId = this.getSessionId();
    if (userId == null || userId == undefined) {
      this.productUpdatedLoginSource.next({ products: sessionId });
    }
    else {
      this.productUpdatedLoginSource.next({ products: userId, sessionId });
    }
  }

  getwarehouselistforitem(shipid: any,customer: any,item: any,qty: any,){
var model={
  shipid:shipid,
  customer:customer,
  item:item,
  qty:qty,
  company_sy:Common.getWithExpiry("company_sy")
}
return this.http.post(environment.APIUrl + '/Product/getwarehouselistforitem', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  deleteCartItem(itemNumber: any, um: any) {
    var userid = null;
    var subuserid = null;
    if (Common.getWithExpiry("CustID") != undefined && Common.getWithExpiry("CustID") != null && Common.getWithExpiry("CustID") != '') {
      userid = Common.getWithExpiry("CustID");
      if(this.iscasafina){
        subuserid = Common.getWithExpiry("subuser");
      }
      else{
      subuserid = (Common.getWithExpiry("UserID")==undefined?Common.getWithExpiry("SalesUserID"):Common.getWithExpiry("UserID"));
      }
    }
    else {
      userid = this.getSessionId();
      subuserid = this.getSessionId();
    }

    var delcart1 = {
      userId: userid,
      sessionId: subuserid,
      itemNumber: itemNumber,
      um: um,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/DeleteCartItemByUserId', delcart1, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });

  }
  deleteCartItemForSession(itemNumber: any, um: any) {
    var userid = null;
    var subuserid = null;
    userid = this.getSessionId();
    subuserid = this.getSessionId();
    var delcart1 = {
      userId: userid,
      sessionId: subuserid,
      itemNumber: itemNumber,
      um: um,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/DeleteCartItemByUserId', delcart1, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });

  }

  deleteCartItemPunchOut(UserID: any) {
    let userId = UserID;

    var delcart1 = {
      userId: userId,
      sessionId: "",
      itemNumber: "",
      um: "",
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/DeleteCartItemPunchOut', delcart1, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getSessionId() {
    var getsessionid = Common.getWithExpiry("session");
    if (getsessionid != undefined && getsessionid != null && getsessionid!= '') {
      return getsessionid;
    }
    else {
      var id = Guid.newGuid();
      Common.setWithExpiry("session", id.toString());
      return id.toString();
    }


    // var nav = window.navigator;
    // var screen = window.screen;
    // var guid = nav.mimeTypes.length.toString();
    // guid += nav.userAgent.replace(/\D+/g, '');
    // guid += nav.plugins.length;
    // guid += screen.height || '';
    // guid += screen.width || '';
    // guid += screen.pixelDepth || '';
    // return guid;
    //return "";
  }


  getProductPrice(UserID: any, item: any, quantity: any) {
    var gmodel = {
      item: item,
      customer: UserID,
      quantity: quantity,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/GetPrice', gmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getProductImage(item: any) {
    var pmodel = {
      item: item,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/GetImage', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getBulkPrice(model: string | any[]) {    
    if(Common.getWithExpiry("UserType") == '5'){
      for(var i =0;i<model.length;i++){
        model[i].customer=this.dataService.Getconfigbykey("GuestUserID")
      }
    }
    return this.http.post(environment.APIUrl + '/ecommerce/BulkPrice', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }


  deleteCartByUserId() {
    var userid = null;
    var subuserid = null;
    if (Common.getWithExpiry("CustID") != undefined && Common.getWithExpiry("CustID") != null && Common.getWithExpiry("CustID") != '') {
      userid = Common.getWithExpiry("CustID");
      if(this.iscasafina){
        subuserid = Common.getWithExpiry("subuser");
      }
      else{
      subuserid = (Common.getWithExpiry("UserID")==undefined?Common.getWithExpiry("SalesUserID"):Common.getWithExpiry("UserID"));
      }
    }
    else {
      userid = this.getSessionId();
      subuserid = this.getSessionId();
    }
    var umodel = {
      userId: userid,
      sessionId: subuserid,
    }
    return this.http.post(environment.APIUrl + '/Product/DeleteCartItem', umodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getShipRate(model: any) {

    return this.http.post(environment.APIUrl + '/Product/GetShipRate', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetErrordatabase() {
    return this.http.get('http://portal.distone.com/distonedemoApi/ecommerce/DataMigration');
  }
  getUPSShipRate(model: any) {
    return this.http.post(environment.APIUrl + '/ecommerce/UPSReturnsMultipleRates', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetAllShipServicesRates(model: any) {
    return this.http.post(environment.APIUrl + '/ecommerce/GetAllshipservicesRates', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getFedexShipRate(model: any) {
    return this.http.post(environment.APIUrl + '/ecommerce/FedExReturnsRates', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getUSPSShipRate(model: any) {
    return this.http.post(environment.APIUrl + '/ecommerce/USPSReturnsMultipleRates', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetCountryaddressCityCode(Country: any) {
    var rmodel = {
      Country: Country,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/GetCountryaddressCityCode', rmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  sendMissingProductEmail(model: any) {
    return this.http.post(environment.APIUrl + '/ecommerce/SendMissingItemEmail', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
}
