import { Component, OnInit } from '@angular/core';

import { SEOService } from '../services/seo.service';
import { Common } from '../../app/model/common.model';
import { DataService } from '../services/data.service';
import { RegistrationService } from '../services/registration.service';
import { OrderManagementService } from '../services/order-management.service';
import { json } from 'express';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class userprofileComponent implements OnInit {
  custdetails: any;

  ARTotal: any;
  ordertotal: number = 0;
  creditlimit: number = 0;
  showcreditlimit: any;
  IsARTotal:any;
  totalbalance:any;
  priceshowcust:any='1';
  SalesUserType:any;
  logintype:any;
  shippingadr:any;
  constructor(private seoService: SEOService, private orderService: OrderManagementService, private registerService: RegistrationService, private dataService: DataService) {
    this.gototop();
    var geturl = window.location.href.toString().split('/#')[0];
    this.SalesUserType=Common.getWithExpiry("SalesUserType");
    this.seoService.setPageTitle('User Profile - ' + geturl);
    this.seoService.setkeywords('User Profile - ' + geturl);
    this.seoService.setdescription('User Profile - ' + geturl);
    
    this.GetIsARTotal();
    this.isshowCreditLimit();
    this.getCustomerDetails();
    this.getartotals();
    this.showpricetocustomers();
    
    this.logintype = this.dataService.Getconfigbykey('logintype');
    if(this.logintype=='3'){
      this.getshiipingaddress();
    }
  }
  getshiipingaddress(){
      this.orderService.GetShiptoaddressbyID(Common.getWithExpiry("CustID"),Common.getWithExpiry("UserID")).subscribe((data: any) => {
        this.shippingadr = data;        
        this.shippingadr.adr = JSON.parse(this.shippingadr.adr);
        
      })
  }
  showpricetocustomers() {
    this.priceshowcust=this.dataService.Getconfigbykey("ShowPrices");
    if (this.priceshowcust == undefined || this.priceshowcust == null || this.priceshowcust =='') {
    this.priceshowcust = Common.getWithExpiry("priceshowcust");
    }
    if (this.priceshowcust == undefined || this.priceshowcust == null || this.priceshowcust =='') {
      this.dataService.showpricetocustomers().subscribe((data: any) => {
        this.priceshowcust = data;
        Common.setWithExpiry("priceshowcust", this.priceshowcust);
      })
    }
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  ngOnInit() {
  }
  isshowCreditLimit() {
    this.showcreditlimit = Common.getWithExpiry("showcreditlimit");
    if (this.showcreditlimit == null || this.showcreditlimit == undefined) {
      this.dataService.GetConfigtoshowCreditLimit().subscribe((data:any) => {
        this.showcreditlimit = data;
        Common.setWithExpiry("showcreditlimit", this.showcreditlimit);
      })
    }
  }
  GetIsARTotal() {
    this.IsARTotal = Common.getWithExpiry("IsARTotal");
    if (this.IsARTotal == null || this.IsARTotal == undefined) {
      this.dataService.ConfigforIsARTotal().subscribe((data:any) => {
        this.IsARTotal = data;
        Common.setWithExpiry("IsARTotal", this.IsARTotal);
      })
    }
  }
  getartotals() {
    this.orderService.getARTotal(Common.getWithExpiry("CustID"), '', '', '', '').subscribe((res:any) => {
      this.ARTotal = res;
    });
    this.orderService.Getcreditcheck(Common.getWithExpiry("CustID"), '', '', '').subscribe((res:any) => {
      var creditcheck = res;
      this.ordertotal = (creditcheck == null ? 0 : creditcheck.orders_total);
      this.creditlimit = (creditcheck == null ? 0 : creditcheck.credit_limit);
      this.totalbalance= (creditcheck == null ? 0 : creditcheck.ar_total);
    });
  }

  getCustomerDetails() {
    try {
      if (Common.getWithExpiry("custdetails") != undefined) {
        var custdetails = JSON.parse(Common.getWithExpiry("custdetails"));
      }
    } catch (ed) { }
    if (custdetails == undefined || custdetails == null) {
      this.dataService.getacustomer(Common.getWithExpiry("CustID")).subscribe((res1:any) => {
        this.custdetails = res1;
        this.custdetails.adr = JSON.parse(this.custdetails.adr);
        Common.setWithExpiry("custdetails", JSON.stringify(this.custdetails));
      });
    }
    else {
      this.custdetails = custdetails;
    }
  }

}
