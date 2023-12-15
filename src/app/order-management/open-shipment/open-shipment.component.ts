import { Component, OnInit } from '@angular/core';
import { OrderManagementService } from '../../services/order-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Common } from '../../model/common.model';
import { SEOService } from '../../services/seo.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-pending-order',
  templateUrl: './open-shipment.component.html',
  styleUrls: ['./open-shipment.component.scss']
})
export class OpenShipmentComponent implements OnInit {
  priceshowcust: any = '1';
  orderList: any = [];
  
  page: number = 1;
  totalPage: number;
  IsShow: Boolean = true;
  sorttype: any = 1;
  webtype: string;
  isrfqshow: any;
  Displaypriceinrfq:any;
  logintype:any;
  wanterdatelable:any;
  constructor(private seoService: SEOService, private dataService: DataService, private router: Router, private orderService: OrderManagementService) {
    this.wanterdatelable=environment.wanted_date;
    this.getlogintype();
    this.getrfqconfig();
    this.getDisplaypriceinrfq();
    this.showpricetocustomers();
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Open Shipment - ' + geturl);
    this.seoService.setdescription('Open Shipment - ' + geturl);
    this.seoService.setkeywords('Open Shipment - ' + geturl);
    
  }
  getrfqconfig() {
    this.isrfqshow = this.dataService.Getconfigbykey("isrfqlist");
    if (this.isrfqshow == null || this.isrfqshow == undefined || this.isrfqshow == '') {
    this.isrfqshow = Common.getWithExpiry("isrfqlist");
    }
    if (this.isrfqshow == null || this.isrfqshow == undefined || this.isrfqshow == '') {
      this.dataService.Getrfqlistfeatureonoff().subscribe((res: any) => {
        this.isrfqshow = res;
        Common.setWithExpiry("isrfqlist", this.isrfqshow);
      });
    }
  }
  getlogintype() {
    this.logintype = this.dataService.Getconfigbykey("logintype");
    if (this.logintype == null || this.logintype == undefined || this.logintype == '') {
    this.logintype = Common.getWithExpiry("logintype");
    }
    
  }
  getDisplaypriceinrfq() {
    this.Displaypriceinrfq = this.dataService.Getconfigbykey("Displaypriceinrfq");
    if (this.Displaypriceinrfq == null || this.Displaypriceinrfq == undefined || this.Displaypriceinrfq == '') {
    this.Displaypriceinrfq = Common.getWithExpiry("Displaypriceinrfq");
    }
    if (this.Displaypriceinrfq == null || this.Displaypriceinrfq == undefined || this.Displaypriceinrfq == '') {
      this.dataService.GetConfigForDisplaypriceinrfq().subscribe((res: any) => {
        this.Displaypriceinrfq = res;
        Common.setWithExpiry("Displaypriceinrfq", this.Displaypriceinrfq);
      });
    }
    }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  ngOnInit() {
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
    this.getPendingOrdersCount();
    this.getPendingOrders(this.page);
    
  }
  navigatetoOrderView(Order, rec_type) {
    this.router.navigate(['/order-management/order-view/' + Order + '/1/' + rec_type]);
  }
  navigatetoOrderView1(Order, rec_type) {
    this.router.navigate(['/order-management/order-view/' + Order + '/2/' + rec_type]);
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

  getPendingOrders(pageno) {
    var usrid = null;
    if (Common.getWithExpiry("UserType") == '3' || this.logintype=='3') {
      usrid = Common.getWithExpiry("UserID");
    }
    this.orderService.GetOpenShipments(Common.getWithExpiry("CustID"), usrid, pageno, this.sorttype).subscribe((res: any) => {
      var result = res;
      this.orderList = [];
      for (var i = 0; i < result.length; i++) {
        var date = new Date(result[i].ord_date);
        this.orderList.push({
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
      //this.orderList = res;
    })
    return pageno;
  }

  changeDropdown(sorttype) {
    this.sorttype=sorttype;
    this.getPendingOrders(this.page);
  }
  getPendingOrdersCount() {
    var usrid = null;
    if (Common.getWithExpiry("UserType") == '3' || this.logintype=='3') {
      usrid = Common.getWithExpiry("UserID");
    }
    this.orderService.GetOpenShipmentsCounts(Common.getWithExpiry("CustID"), usrid).subscribe((res: any) => {
      var getdata = res;
      this.totalPage = (res == null ? 0 : getdata.count);
      this.IsShow = (res == null ? false : (getdata.count > 9 ? true : false));
    });
  }

}
