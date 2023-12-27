import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Common } from '../model/common.model';

@Injectable()
export class OrderManagementService {

  constructor(private http: HttpClient) {
  }

  GetHelpdeskData(customer,stat, PageNo) {
    var company_sy=Common.getWithExpiry("company_sy");
    return this.http.get(environment.APIUrl + '/UserModule/GetHelpdeskData?customer='+customer+'&PageNo='+PageNo+'&company_sy='+company_sy+'&stat='+stat, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  
  GetHelpdeskDataCount(customer,stat) {
    var company_sy=Common.getWithExpiry("company_sy");
    return this.http.get(environment.APIUrl + '/UserModule/GetHelpdeskDataCount?customer='+customer+'&company_sy='+company_sy+'&stat='+stat, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }


  getPendingOrders(customer,SubUserID, pageno, SortType) {
    var pmodel={
      customer:customer,
      SubUserID:SubUserID,
      PageNo: pageno,
      orderby:SortType,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/PendingOrders',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  GetOpenShipments(customer,SubUserID, pageno, SortType) {
    var pmodel={
      customer:customer,
      SubUserID:SubUserID,
      PageNo: pageno,
      orderby:SortType,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/GetOpenShipments',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getProcessingOrders(customer,SubUserID, pageno, SortType) {
    var pmodel={
      customer:customer,
      SubUserID:SubUserID,
      PageNo:pageno,
      orderby:SortType,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/ProcessingOrders',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getPendingOrdersCount(customer,SubUserID) {
    var pmodel={
      customer:customer,
      SubUserID:SubUserID,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/PendingOrdersCounts',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  GetOpenShipmentsCounts(customer,SubUserID) {
    var pmodel={
      customer:customer,
      SubUserID:SubUserID,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/GetOpenShipmentsCounts',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  GetloginCustomerInfo(CustID) {
    var umodel={
      customer:CustID,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/GetCustomer',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  orderView(order,rec_type) {
    var omodel={
      order:order,
      rec_type:rec_type,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/OrderView',omodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  InvoiceView(CustID,order) {
    var omodel={
      customer:CustID,
      order:order,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/InvoiceView',omodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  ProcessingOrderView(CustID,order) {
    var pmodel={
      customer:CustID,
      order:order,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/ProcessingOrderView',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  ProcessingOrderView1(CustID,order) {
    var pmodel={
      customer:CustID,
      order:order,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/ProcessingOrderView1',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  GetShiptoaddressbyID(CustID,id) {
    var pmodel={
      id:id,
      customer:CustID,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/GetShiptoaddressbyID',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getBackOrder(customer,SubUserID, pageno, sorttype) {
    var mmodel={
      customer:customer,
      SubUserID:SubUserID,
      PageNo:pageno,
      orderby:sorttype,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/BackOrderItems',mmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getBackOrderCounts(customer,SubUserID) {
    var umodel={
      customer:customer,
      SubUserID:SubUserID,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/BackOrderItemsCounts',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  GetOpenInvoices(customer,SubUserID, Pageno, sorttype) {
    var pmodel={
      customer:customer,
      SubUserID:SubUserID,
      PageNo:Pageno,
      orderby: sorttype,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/OpenInvoice',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  GetOpenInvoicesByInvoiceID(customer,ar_id,invc_seq) {
    var pmodel={
      customer:customer,
      ar_id:ar_id,
      invc_seq:invc_seq,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/OpenInvoicebyOrderID',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  GetOpenInvoicesCounts(customer,SubUserID) {
    var cmodel={
      customer:customer,
      SubUserID:SubUserID,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/OpenInvoiceCounts',cmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getOrderHistory(customer,SubUserID, Order, pono, itemnum, duration, edate, pageno, orderby) {
    var pmodel={
      customer:customer,
      SubUserID:SubUserID,
      order:Order,
      pono: pono,
      orderby:orderby,
      PageNo:pageno,
      startdate:edate,
      duration:duration,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/OrderHistory',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  getOrderHistoryCounts(customer,SubUserID, edate,Order,pono,duration) {
    var cmodel={
      customer:customer,
      SubUserID:SubUserID,
      order:Order,
      pono: pono,      
      startdate:edate,
      duration:duration,
      company_sy:Common.getWithExpiry("company_sy")
    }

    return this.http.post(environment.APIUrl + '/ecommerce/OrderHistoryCounts',cmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getPurchaseHistory(customer, fromyear, toyear, frommonth, tomonth,pageno,stype,item) {
    var dmodel={
      From_sum_year:fromyear,
      To_sum_year:toyear,
      From_sum_month:frommonth,
      To_sum_month:tomonth,
      customer:customer,
      PageNo:pageno,
      SortType:stype,
      company_sy:Common.getWithExpiry("company_sy"),
      item:item
    }
    return this.http.post(environment.APIUrl + '/ecommerce/PurchaseHistory',dmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  GetCustomerProduct(customer, pageno,item) {    
    var company_sy=Common.getWithExpiry("company_sy");
    return this.http.get(environment.APIUrl + '/ecommerce/GetCustomerProduct?Customer='+customer+'&PageNo='+pageno+'&company_sy='+company_sy+'&item='+item, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  GetCustomerProductCounts(customer,item) {    
    var company_sy=Common.getWithExpiry("company_sy");
    return this.http.get(environment.APIUrl + '/ecommerce/GetCustomerProductCounts?Customer='+customer+'&company_sy='+company_sy+'&item='+item, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  getPurchaseHistoryCount(customer, fromyear, toyear, frommonth, tomonth,item) {
    var dmodel={
      From_sum_year:fromyear,
      To_sum_year:toyear,
      From_sum_month:frommonth,
      To_sum_month:tomonth,
      customer:customer,      
      company_sy:Common.getWithExpiry("company_sy"),
      item:item
    }
    return this.http.post(environment.APIUrl + '/ecommerce/PurchaseHistoryCount',dmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  getARTotal(customer, customer_po, all_companies, age_date, currency_code) {
    var pmodel={
      customer:customer,
      customer_po:customer_po,
      all_companies:all_companies,
      age_date:age_date,
      currency_code:currency_code,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/ARTotal',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  Getlastpaydate(customer) {
    var cmodel={
      customer:customer,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/lastpaydate',cmodel);
  }
  Getcreditcheck(customer, customer_po, credit_check, currency_code) {
    var dmodel={
      customer:customer,
      customer_po:customer_po,
      credit_check:credit_check, 
      currency_code:currency_code,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/creditcheck',dmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  OpenOrderTotal(customer, customer_po, credit_check, currency_code) {
    var umodel={
      customer:customer,
      customer_po:customer_po,
      credit_check:credit_check,
      currency_code:currency_code,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/OpenOrderTotal',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  GetPrintData(type, record, seq) {
    var pmodel={
      type:type,
      record:record,
      seq:seq,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetDataForPrint',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  GetTrackingNo(order) {
    var omodel={
      orderid:order,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetTrackingNumber',omodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  GetTrackingNoForPendingOrder(order) {
    var omodel={
      orderid:order,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetTrackingNumberForPendingOrders',omodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  InvoicePaymetnconfig() {
    return this.http.get(environment.APIUrl + '/Product/GetConfidForInvoicepayment', { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  getSouthernQuotes(customer,SubUserID, pageno, SortType, quoteNo) {
    var pmodel={
      pono: quoteNo,
      customer:customer,
      SubUserID:SubUserID,
      PageNo:pageno,
      orderby:SortType,
      "rec_type": "Q",
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/SouthernQuotes',pmodel);
  }

  getSouthernQuotesCount(customer,SubUserID, pageno, SortType, quoteNo) {
    var pmodel={
      pono: quoteNo,
      customer:customer,
      SubUserID:SubUserID,
      PageNo:pageno,
      orderby:SortType,
      "rec_type": "Q",
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/SouthernQuotesCounts',pmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  GetTerritoryAccounts() {
    return this.http.get(environment.APIUrl + '/Product/GetTerritoryAccount', { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
}
