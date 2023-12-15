import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Common } from '../model/common.model';

@Injectable()
export class CheckoutService {

  constructor(private http: HttpClient) {
  }

  getShipingAddress(CustID, subuser) {
    var rmodel={
      customer:CustID,
      subuser:subuser,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/GetShipToList',rmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getBillingAddress(CustID) {
    var rmodel={
      customer:CustID,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/BillToList',rmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  Getallsystermscode(){
    return this.http.get(environment.APIUrl + '/ecommerce/Getallsystermscode', { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  Postpofile(imagemodel) {
    return this.http.post(environment.APIUrl + '/ecommerce/Postpofile',imagemodel);
  }

  getPaymentTerms(CustID) {
    var pmodel={
      customer:CustID,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/Get_Sy_Terms',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getShipFOB(CustID) {
    var ymodel={
      customer:CustID,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/Get_sy_shipvia',ymodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  public getIPAddress()  
  {  
    return this.http.get("http://api.ipify.org/?format=json");  
  }  
  createOrder(model) {
    model.company_sy=Common.getWithExpiry("company_sy");
    return this.http.post(environment.APIUrl + '/ecommerce/InsertOrder', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  orderfraudcheck(model) {
    
    return this.http.post(environment.APIUrl + '/ecommerce/orderfraudcheck', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  InsertalavarataxMethod(model) {
    model.company_sy=Common.getWithExpiry("company_sy");
    return this.http.post(environment.APIUrl + '/usermodule/InsertalavarataxMethod', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }


  reviewOrder(model) {
  
    var gethead={
      s_adr:model.head.s_adr.toString(),
      s_country_code:model.head.s_country_code,
      s_name:model.head.s_name,
      s_st:model.head.s_st,
      s_postal_code:model.head.s_postal_code,
      orderstatus:true,
      response:"review",
      ord_class:model.head.CardHolderName,
      customer:Common.getWithExpiry("CustID"),
      warehouse:Common.getWithExpiry("warehouse"),
      ship_id:model.head.ship_id,
      ship_via_code:model.head.ship_via_code,
      order_by:model.head.order_by,
      terms_code:model.head.terms_code,
      email:model.head.email,
      source_code:model.head.source_code,
      wanted_date:model.head.wanted_date,
      cu_po:model.head.cu_po,
      notes:model.head.notes,
      echo:true,
      complete:false,
      order:"",
      orderby_phone:model.head.orderby_phone,
      ship_via_acct:model.head.ship_via_acct,
      bill_phone:model.head.bill_phone,
      billPhone:model.head.bill_phone,
      bill_fax:model.head.bill_fax,
      billFax:model.head.bill_fax,
      bill_adr:model.head.bill_adr.toString(),
      billAdr:model.head.billAdr.toString(),
      o_tot_taxable_it:0,
      o_tot_tax_amt:0,
      o_tot_net_ar:0,
      CardNumber:model.head.CardNumber,
      CardNo:model.head.CardNumber,
      SecurityCode:model.head.SecurityCode,
      CardType:model.head.CardType,
      c_tot_code_1:model.head.c_tot_code_1,
      c_tot_code_amt_1:model.head.c_tot_code_amt_1,
      cancel_date:model.head.cancel_date,
      rec_type:model.head.job_rel,
      cell_phone:model.head.cell_phone,
      ship_cmpl:model.head.ship_cmpl,
      CardHolderName:model.head.CardHolderName,
      ExpirationMonth: model.head.ExpirationMonth,
      ExpirationYear: model.head.ExpirationYear,
      Frieght:"",
      weight:model.head.weight.toString(),


    }
    var Lines = [];
    for(var i=0;i<model.lines.length;i++){
      Lines.push({
        company_sy:Common.getWithExpiry("company_sy"),
        reference:i,
        item:model.lines[i].item,
        descr:JSON.stringify(model.lines[i].descr),
        quantity:model.lines[i].quantity,
        um_o:model.lines[i].um_o,
        order:"",
        productline:model.lines[i].productline,
        product_line:model.lines[i].product_line,
        price_per:model.lines[i].price_per,
        image:model.lines[i].image,
        price:model.lines[i].price,
        note:model.lines[i].Note,
        childitem:"",
      })
    } 

    var OrderView={
      company_sy:Common.getWithExpiry("company_sy"),
      notes:model.notes,
      echo:true,
      complete:false,
      lines:Lines,
      head:gethead,
    }
    
    return this.http.post(environment.APIUrl + '/ecommerce/ReviewOrder', OrderView, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  updateOrder(model) {
    model.company_sy=Common.getWithExpiry("company_sy");
    return this.http.post(environment.APIUrl + '/ecommerce/orderupdate', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  updateOrderLines(model) {
    model.company_sy=Common.getWithExpiry("company_sy");
    return this.http.post(environment.APIUrl + '/ecommerce/orderupdate', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  FinalizeOrder(order) {
    var omodel={
      order:order,
      type:'O',
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/Insertfinalize',omodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  FinalizeOrder1(order) {   
    return this.http.post(environment.APIUrl + '/ecommerce/InsertNewOrderMethod', order, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  FinalizeOrderRMA(order) {   
    return this.http.post(environment.APIUrl + '/ecommerce/InsertNewOrderMethodForRMA', order, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  DeleteTempOrder(orderno) {
    var omodel={
      order:orderno,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/DeleteTempOrder',omodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  addShippingAddress(model) {    
    return this.http.post(environment.APIUrl + '/UserModule/AddShippingAddress', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  updateShippingAddress(model) {    
    return this.http.post(environment.APIUrl + '/UserModule/UpdateShippingAddress', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  payment(model) {    
    return this.http.post(environment.APIUrl + '/Product/payment', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  addCard(model) {
    return this.http.post(environment.APIUrl + '/ecommerce/AddCard', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getCardDetails(customer, SubUserID,iscreditcard) {
    var umodel={
      customer:customer,
      SubUserID:SubUserID,
      company_sy:Common.getWithExpiry("company_sy"),
      iscreditcard:iscreditcard
    }
    return this.http.post(environment.APIUrl + '/ecommerce/GetCardDetails',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getSingleCard(Id) {
    return this.http.get(environment.APIUrl + '/ecommerce/GetSingleCardDetail?cardId=' + Id, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  DeleteCardbyID(Id) {
    return this.http.get(environment.APIUrl + '/UserModule/DeleteCardByID?Id=' + Id, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  GetOrderHeaderNotes(OrderID) {
    var company_sy=Common.getWithExpiry("company_sy");
    return this.http.get(environment.APIUrl + '/UserModule/GetOrderHeadNotes?OrderNo=' + OrderID + '&company_sy='+company_sy, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  CreatesystaemUser(customer) {
    var umodel={
      customer:customer,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/CreateSystemUser',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getPendingOrder(customer,SubUserID) {
    var umodel={
      customer:customer,
      SubUserID:SubUserID,
    }
    return this.http.post(environment.APIUrl + '/ecommerce/GetAllPendingOrders',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getPendingOrderReviewCount(customer,SubUserID) {
    var umodel={
      customer:customer,
      SubUserID:SubUserID,
    }
    return this.http.post(environment.APIUrl + '/ecommerce/PendingOrdersReviewCount',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getSingleOrder(orderid) {
    return this.http.get(environment.APIUrl + '/ecommerce/GetSinglePendingOrder?OrderID=' + orderid, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  invoicePayment(model) {
    return this.http.post(environment.APIUrl + '/Product/InvoicePayment', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  getShippingAddressById(ship_id,customer) {
    var umodel={
      ship_id:ship_id,
      customer:customer,
      company_sy:Common.getWithExpiry("company_cu")
    }
    return this.http.post(environment.APIUrl + '/UserModule/GetShippingAddressById',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  getCardById(id) {
    return this.http.get(environment.APIUrl + '/ecommerce/GetCardById?Id=' + id, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getDefaultValues(userId, userType,customer) {
    var umodel={
      userId:userId,
      userType:userType,
      customer:customer,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetCheckoutDefaultValues',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
}
