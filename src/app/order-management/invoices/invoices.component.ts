import { Component, OnInit } from '@angular/core';
import { OrderManagementService } from '../../services/order-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Common } from '../../../app/model/common.model';
import { SEOService } from '../../services/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  ARTotal: any;
  lastpaydate: any;
  creditcheck: any;
  OpenOrder: any;

  orderList: any = [];
  page: number = 1;
  totalPage: number;
  sorttype: any = 1;
  IsShow: Boolean = true;
  ordertotal: number = 0;
  creditlimit: number = 0;
  totalAmt: number = 0;
  showPayment: boolean = false;
  selectedInvoice: any = [];
  paymentmode: any;
  showcreditlimit: any;
  IsARTotal:any;
  totalbalance:any;
  priceshowcust:any='1';
  SalesUserType:any;
  logintype:any;
  wanterdatelable:any;
  constructor(private seoService: SEOService, private dataService: DataService, private router: Router, private orderService: OrderManagementService) {
    this.wanterdatelable=environment.wanted_date;
    this.SalesUserType=Common.getWithExpiry("SalesUserType");
    
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Invoices - ' + geturl);
    this.seoService.setdescription('Invoices - ' + geturl);
    this.seoService.setkeywords('Invoices - ' + geturl);
    
    this.getlogintype();
    this.showpricetocustomers();
    this.GetIsARTotal();
    this.isshowCreditLimit();
    this.Getpaymentmode();
  }
  getlogintype() {
    this.logintype = this.dataService.Getconfigbykey("logintype");
    if (this.logintype == null || this.logintype == undefined || this.logintype == '') {
    this.logintype = Common.getWithExpiry("logintype");
    }
    
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
    this.gototop();
    this.orderService.Getcreditcheck(Common.getWithExpiry("CustID"), '', '', '').subscribe((res:any) => {
      this.creditcheck = res;
      this.ordertotal = (this.creditcheck == null ? 0 : this.creditcheck.orders_total);
      this.creditlimit = (this.creditcheck == null ? 0 : this.creditcheck.credit_limit);
      this.totalbalance= (this.creditcheck == null ? 0 : this.creditcheck.ar_total);
    });
    this.orderService.getARTotal(Common.getWithExpiry("CustID"), '', '', '', '').subscribe((res:any) => {
      this.ARTotal = res;
    });
    this.orderService.Getlastpaydate(Common.getWithExpiry("CustID")).subscribe((res:any) => {
      this.lastpaydate = res;
    });
    this.orderService.OpenOrderTotal(Common.getWithExpiry("CustID"), '', '', '').subscribe((res:any) => {
      this.OpenOrder = res;
    });
    this.GetOpenInvoicesCounts();
    this.GetOpenInvoices(this.page);
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
  Getpaymentmode() {
    this.paymentmode = Common.getWithExpiry("paymentmode");
    if (this.paymentmode == null || this.paymentmode == undefined) {
      this.orderService.InvoicePaymetnconfig().subscribe((res:any) => {
        this.paymentmode = res;
        Common.setWithExpiry("paymentmode", this.paymentmode);
      })
    }
  }

  navigatetoOrderView(Order, order2) {
    this.router.navigate(['/order-management/order-view/' + Order + "-" + order2 + '/3/O']);
  }


  GetOpenInvoices(pageno) {
    var usrid = null;
    if (Common.getWithExpiry("UserType") == '3' || this.logintype=='3') {
      usrid = Common.getWithExpiry("UserID");
    }
    this.orderService.GetOpenInvoices(Common.getWithExpiry("CustID"), usrid, pageno, this.sorttype).subscribe((res:any) => {
      var result = res;
      this.orderList = result;
    })
    return pageno;
  }
  changeDropdown(sorttype) {
    this.sorttype=sorttype;
    this.GetOpenInvoices(this.page);
  }


  GetOpenInvoicesCounts() {
    var usrid = null;
    if (Common.getWithExpiry("UserType") == '3' || this.logintype=='3') {
      usrid = Common.getWithExpiry("UserID");
    }
    this.orderService.GetOpenInvoicesCounts(Common.getWithExpiry("CustID"), usrid).subscribe((res:any) => {
      var getdata = res;
      this.totalPage = (res == null ? 0 : getdata.count);
      this.IsShow = (res == null ? false : (getdata.count > 9 ? true : false));
    });
  }

  chkChange(event, amount, order) {
    if (event.target.checked) {
      this.totalAmt += amount;
      this.selectedInvoice.push(order);
    }
    else {
      this.totalAmt -= amount;

      var index = 0;
      var isMatched = false;
      for (var i = 0; i < this.selectedInvoice.length; i++) {
        if (this.selectedInvoice[i].ar_id == order.ar_id) {
          index = i;
          isMatched = true;
          break;
        }
      }

      if (isMatched) {
        this.selectedInvoice.splice(index, 1);
      }
    }

    if (this.totalAmt > 0 && this.paymentmode == '1')
      this.showPayment = true;
    else
      this.showPayment = false;
  }

  payinvoice() {
    Common.setWithExpiry("SelectedInvoice", JSON.stringify(this.selectedInvoice));
    this.router.navigate(['order-management/invoice-payment', 0,0]);
  }
}
