import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Common } from '../model/common.model';
import { CartService } from '../services/cart.service';
import { DataService } from '../services/data.service';
import { OrderManagementService } from '../services/order-management.service';

@Component({
  selector: 'app-southern-quotes',
  templateUrl: './southern-quotes.component.html',
  styleUrls: ['./southern-quotes.component.scss']
})
export class SouthernQuotesComponent implements OnInit {
  dataSource: any;
  model: any = "0";
  dataSource1: any;
  calmodel: any = "0";
  processingOrderList: any = [];
  sorttype: any = 1;
  quoteNo: any;
  shipaddress: any;
  shipName: any;
  postal_code: any;
  state: any;
  country_code: any;
  showResult: boolean = false;
  isError: boolean = false;
  buyerCookie: any;
  company_cu: any;
  company_sy: any;
  IsShow: Boolean = true;
  totalPage: number;
  page: number = 1;
  searchAllQuote:any;

  constructor(private renderer: Renderer2, private orderService: OrderManagementService, private cartService:CartService, private router: Router, private dataService: DataService, private route: ActivatedRoute) {
    this.buyerCookie = this.route.snapshot.paramMap.get('buyercookie');
    this.company_cu = Common.getWithExpiry("company_cu");
    this.company_sy = Common.getWithExpiry("company_sy");
    this.validateUser();
  }

  ngOnInit(): void {
    this.GetTerritoryAccounts();
  }

  validateUser() {
    this.dataService.GetSouthernPunchOutSessionDetail(this.buyerCookie).subscribe((data: any) => {
      if (data == null) {
        this.router.navigate(['/login']);
      }
      else {
        
        this.cartService.southernPunchOutBroadcast(true);

        Common.setWithExpiry("IsPunchOut", "Yes");
        Common.setWithExpiry("PunchOutType", "Southern");
        Common.setWithExpiry("BuyerCookie", this.buyerCookie);
      }
    });
  }

  GetTerritoryAccounts() {
    this.orderService.GetTerritoryAccounts().subscribe((res: any) => {
      var data = [];
      var data1 = [];

      for (var i = 0; i < res.length; i++) {
        if (res[i].Type == "1") {
          data.push(res[i]);
        }
        else if (res[i].Type == "2") {
          data1.push(res[i]);
        }
      }

      
      this.dataSource = data;
      this.dataSource1 = data1;
    });
  }

  getProcessingOrders(pageno) {
    var usrid = null;
    var custid = null;

    if (Common.getWithExpiry("UserType") == '3') {
      usrid = Common.getWithExpiry("UserID");
    }

    
    if (this.searchAllQuote == "Yes") {
      this.quoteNo = "";
    }

    if (this.model == "0") {
      custid = this.calmodel;
    }
    else {
      custid = this.model;
    }

    this.orderService.getSouthernQuotes(custid, usrid, pageno, this.sorttype, this.quoteNo).subscribe((res: any) => {
      
      if (res != null && res != undefined && res.length > 0) {

        this.shipaddress = res[0].adr;
        this.shipName = res[0].name;
        this.postal_code = res[0].postal_code;
        this.state = res[0].state;
        this.country_code = res[0].country_code;

        var result = res;
        this.processingOrderList = [];

        if (result.length > 0) {
          this.showResult = true;
          this.isError = false;
        }
        else {
          this.showResult = false;
          this.isError = true;
        }

        for (var i = 0; i < result.length; i++) {
          this.processingOrderList.push({
            "ord_date": result[i].ord_date,
            "wanted_date": result[i].wanted_date,
            "name": result[i].name,
            "order": result[i].order,
            "ord_ext": result[i].ord_ext,
            "cu_po": result[i].cu_po,
            "tot_code_amt": result[i].tot_code_amt,
            "o_tot_gross": result[i].o_tot_gross,
            "customer": result[i].customer,
            "rec_type": result[i].rec_type
          });
        }

        
      }
      else {
        this.isError = true;
        this.showResult = false;
      }
    });
    return pageno;
  }

  getProcessingOrdersCount(pageno) {
    var usrid = null;
    var custid = null;

    if (Common.getWithExpiry("UserType") == '3') {
      usrid = Common.getWithExpiry("UserID");
    }

    
    if (this.searchAllQuote == "Yes") {
      this.quoteNo = "";
    }

    if (this.model == "0") {
      custid = this.calmodel;
    }
    else {
      custid = this.model;
    }

    this.orderService.getSouthernQuotesCount(custid, usrid, pageno, this.sorttype, this.quoteNo).subscribe((res: any) => {
      var getdata = res;
      this.totalPage = (res == null ? 0 : getdata.length);
      this.IsShow = (res == null ? false : (getdata.length > 9 ? true : false));
    });
  }

  searchQuote() {
    this.searchAllQuote = "No";
    this.getProcessingOrdersCount(this.page);
    this.getProcessingOrders(this.page);
  }

  searchAllQuotes() {
    this.searchAllQuote = "Yes";
    this.getProcessingOrdersCount(this.page);
    this.getProcessingOrders(this.page);
  }

  navigatetoOrderView(Order, rec_type) {
    this.router.navigate(['/order-management/order-view/' + Order + '/1/' + rec_type]);
  }

  navigatetoOrderView1(Order, rec_type, customer) {
    this.dataService.GetWarehouse(customer, this.company_cu, this.company_sy).subscribe((data: any) => {
      
      Common.setWithExpiry("warehouse", data.Warehouse);
      Common.setWithExpiry("Name", data.CustomerName);
      Common.setWithExpiry("UserID", this.buyerCookie);
      Common.setWithExpiry("CustID", customer);
      Common.setWithExpiry("UserType", "1");
      this.cartService.southernPunchOutBroadcast(true);
      this.dataService.DeleteSouthernCart(customer, this.buyerCookie).subscribe((cartdata: any) => {
        Common.setWithExpiry("PunchOutQuoteNo", Order);
        this.router.navigate(['/order-management/order-view/' + Order + '/2/' + rec_type]);
      });
    });
  }

  FLChange() {
    if (this.calmodel != "0") {
      this.calmodel = "0";
    }
  }

  CLChange() {
    if (this.model != "0") {
      this.model = "0";
    }
  }

}
