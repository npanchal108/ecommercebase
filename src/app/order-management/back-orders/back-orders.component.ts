import { Component, OnInit } from '@angular/core';
import { OrderManagementService } from '../../services/order-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Common } from '../../../app/model/common.model';
import { SEOService } from '../../services/seo.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-back-orders',
  templateUrl: './back-orders.component.html',
  styleUrls: ['./back-orders.component.scss']
})
export class BackOrdersComponent implements OnInit {

  orderList: any = [];
  page: number = 1;
  totalPage: number;
  sorttype: any = 1;
  IsShow: Boolean = true;
  logintype:any;
  iskyraden:any;
  wanterdatelable:any;
  constructor(private seoService: SEOService, private dataService: DataService, private router: Router, private orderService: OrderManagementService) {
    var geturl = Common.getWithExpiry("cpname");
    this.iskyraden=environment.iskyraden;
    this.wanterdatelable=environment.wanted_date;
    if(this.iskyraden){
      this.seoService.setPageTitle('Expected Shipment - ' + geturl);
      this.seoService.setkeywords('Expected Shipment - ' + geturl);
      this.seoService.setdescription('Expected Shipment - ' + geturl);
    }
    else{
    this.seoService.setPageTitle('Back Orders - ' + geturl);
    this.seoService.setkeywords('Back Orders - ' + geturl);
    this.seoService.setdescription('Back Orders - ' + geturl);
    }
    this.getlogintype();
    this.getPendingOrdersCount();
    this.getBackOrder(this.page);
  }
  getlogintype() {
    this.logintype = this.dataService.Getconfigbykey("logintype");
    if (this.logintype == null || this.logintype == undefined || this.logintype == '') {
    this.logintype = Common.getWithExpiry("logintype");
    }
    
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  ngOnInit() {
    this.gototop();

  }

  getBackOrder(pageno) {
    var usrid = null;
    if (Common.getWithExpiry("UserType") == '3' || this.logintype=='3') {
      usrid = Common.getWithExpiry("UserID");
    }
    this.orderService.getBackOrder(Common.getWithExpiry("CustID"), usrid, pageno, this.sorttype).subscribe((res:any) => {
      var result = res;
      this.orderList = [];
      for (var i = 0; i < result.length; i++) {
        var date = new Date(result[i].req_date);

        var reqDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

        this.orderList.push({
          "item": result[i].item,
          "descr": result[i].descr,
          "req_date": result[i].req_date,
          "blanket_order": result[i].blanket_order,
          "order": result[i].order,
          "cu_po": result[i].cu_po,
          "q_bo_d": result[i].q_bo_d,
          "promise_date":result[i].promise_date,
        });
      }
    })
    return pageno;
  }
  changeDropdown(sorttype) {
    this.sorttype=sorttype;
    this.getBackOrder(this.page);
  }

  navigatetoOrderView(Order) {
    this.router.navigate(['/order-management/order-view/' + Order + '/2/O']);
  }

  getPendingOrdersCount() {
    var usrid = null;
    if (Common.getWithExpiry("UserType") == '3' || this.logintype=='3') {
      usrid = Common.getWithExpiry("UserID");
    }
    this.orderService.getBackOrderCounts(Common.getWithExpiry("CustID"), usrid).subscribe((res:any) => {
      var getdata = res;
      this.totalPage = (res == null ? 0 : getdata.count);
      this.IsShow = (res == null ? false : (getdata.count > 9 ? true : false));
    });
  }

}
