import { Component, OnInit } from '@angular/core';
import { OrderManagementService } from '../../services/order-management.service';
import { parse } from 'querystring';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Common } from '../../../app/model/common.model';
// import { DatepickerOptions } from 'ng2-datepicker';
import { SEOService } from '../../services/seo.service';
import { DEF_CONF } from 'src/app/model/consts';
import { IDatePickerConfig } from 'ng2-date-picker';
import * as moment from 'moment';
import { LoadingService } from 'src/app/services/loading.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  searchModel: any = {};
  orderList: any = [];
  Order: any;
  pono: any;
  itemnum: any;
  sdate: any;
  edate: any;
  page: number = 1;
  totalPage: number;
  sorttype: any = 1;
  //Duration: number = 30;
  IsShow: Boolean = true;
  priceshowcust:any='1';
  config: IDatePickerConfig = {
    ...DEF_CONF,
    format: 'MMM-DD-YYYY'
  };    
  logintype:any;
  wanterdatelable:any;
  constructor(private loadingService: LoadingService,private seoService: SEOService, private dataService: DataService, private router: Router, private orderService: OrderManagementService) {
    this.edate =moment(new Date());
    this.sdate =moment(new Date()).add(-1, 'years');
    this.wanterdatelable=environment.wanted_date;

    //this.edate = 
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Order History - ' + geturl);
    this.seoService.setkeywords('Order History - ' + geturl);
    this.seoService.setdescription('Order History - ' + geturl);
    
    this.getlogintype();
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
    //this.edate= Date();
    this.showpricetocustomers();
    //this.getPendingOrdersCount();
    this.getOrderHistory(this.page);
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
  getOrderHistory(page) {
    this.page = page;
    if (this.Order == '' || this.Order == 'undefined' || this.Order == undefined) {
      this.Order = '';
    }
    if (this.pono == '' || this.pono == 'undefined' || this.pono == undefined) {
      this.pono = '';
    }
    if (this.itemnum == '' || this.itemnum == 'undefined' || this.itemnum == undefined) {
      this.itemnum = '';
    }
    var getdates = '';
    if (this.sdate == undefined || this.sdate == null) {
      var getedate = new Date();
      //getdates=getedate.getDate() + '-'+(getedate.getMonth()+1)+'-'+getedate.getFullYear();
      getdates = (getedate.getMonth() + 1) + '-' + getedate.getDate() + '-' + getedate.getFullYear();
    }
    else {
      //var eedate = new Date(this.edate);
      //getdates=this.edate.getDate() + '-'+(this.edate.getMonth()+1 )+'-'+this.edate.getFullYear(); 
      //getdates = (this.edate.getMonth() + 1) + '-' + this.edate.getDate() + '-' + this.edate.getFullYear();
      getdates =this.sdate;
    }

    var usrid = null;
    if (Common.getWithExpiry("UserType") == '3' || this.logintype=='3') {
      usrid = Common.getWithExpiry("UserID");
    }
    if(Common.getWithExpiry("customerp")=='1'){
      usrid=null;
    }
    var duration =this.calculateDiff();
    this.sendMessage('start');
    this.orderService.getOrderHistory(Common.getWithExpiry("CustID"), usrid, '', '', '', duration, getdates, this.page, this.sorttype).subscribe((res:any) => {
      this.orderList = res;
      this.sendMessage('stop');
    })
    return page;
  }
  navigatetoOrderView(Order, order2) {
    this.router.navigate(['/order-management/order-view/' + Order + '-' + order2 + '/3/O']);
  }
  changeDropdown(sorttype) {
    this.sorttype=sorttype;
    this.getOrderHistory(this.page);
  }

  ClearAll() {
    this.sorttype = 1;
    this.page = 1;
    this.Order = null;
    this.pono = null;
    this.itemnum = null;
    this.sdate = moment();
    this.edate = moment();
    //this.Duration = 30;
    this.IsShow = true;
    this.getOrderHistory(this.page);

  }

  SearchOrderHistory() {
    this.IsShow = false;
    this.page = 0;
    if (this.Order == '' || this.Order == 'undefined' || this.Order == undefined) {
      this.Order = '';
    }
    if (this.pono == '' || this.pono == 'undefined' || this.pono == undefined) {
      this.pono = '';
    }
    if (this.itemnum == '' || this.itemnum == 'undefined' || this.itemnum == undefined) {
      this.itemnum = '';
    }
    var getdates = '';

    if (this.sdate == undefined || this.sdate == null) {
      var getedate = new Date();
      getdates = (getedate.getMonth() + 1) + '-' + getedate.getDate() + '-' + getedate.getFullYear();
    }
    else {
      // var getedate = new Date(this.edate);
      // getdates = (getedate.getMonth() + 1) + '-' + getedate.getDate() + '-' + getedate.getFullYear();
      getdates =this.sdate;
    }

    var usrid = null;
    if (Common.getWithExpiry("UserType") == '3' || this.logintype=='3') {
      usrid = Common.getWithExpiry("UserID");
    }
    if(Common.getWithExpiry("customerp")=='1'){
      usrid=null;
    }
    //this.getPendingOrdersCount();
    var duration =this.calculateDiff();
    this.sendMessage('start');
    this.orderService.getOrderHistory(Common.getWithExpiry("CustID"), usrid, this.Order, this.pono, this.itemnum,duration , getdates, this.page, this.sorttype).subscribe((res:any) => {
      this.orderList = res;
      this.sendMessage('stop');
    })
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  getpagewiselist(pageno){
    this.page=pageno;
    var usrid = null;
    if (Common.getWithExpiry("UserType") == '3' || this.logintype=='3') {
      usrid = Common.getWithExpiry("UserID");
    }
    var getdates = '';
    if (this.edate == undefined || this.edate == null) {
      var getedate = new Date();
      getdates = (getedate.getMonth() + 1) + '-' + getedate.getDate() + '-' + getedate.getFullYear();
    }
    else {
      // var getedate = new Date(this.edate);
      // getdates = (getedate.getMonth() + 1) + '-' + getedate.getDate() + '-' + getedate.getFullYear();
      getdates =this.edate;
    }
    if(Common.getWithExpiry("customerp")=='1'){
      usrid=null;
    }
    var duration =this.calculateDiff();
    this.sendMessage('start');
    this.orderService.getOrderHistory(Common.getWithExpiry("CustID"), usrid, this.Order, this.pono, this.itemnum,duration, getdates, pageno, this.sorttype).subscribe((res:any) => {
      this.orderList = res;
      this.sendMessage('stop');
    })

  }

  calculateDiff(){
    let currentDate = new Date(this.edate);
    let dateSent= new Date(this.sdate);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
}
  getPendingOrdersCount() {
    var usrid = null;
    if (Common.getWithExpiry("UserType") == '3' || this.logintype=='3') {
      usrid = Common.getWithExpiry("UserID");
    }
    if (this.Order == '' || this.Order == 'undefined' || this.Order == undefined) {
      this.Order = '';
    }
    if (this.pono == '' || this.pono == 'undefined' || this.pono == undefined) {
      this.pono = '';
    }
    if (this.itemnum == '' || this.itemnum == 'undefined' || this.itemnum == undefined) {
      this.itemnum = '';
    }
    var getdates = '';
    if (this.edate == undefined || this.edate == null) {
      var getedate = new Date();
      getdates = (getedate.getMonth() + 1) + '-' + getedate.getDate() + '-' + getedate.getFullYear();
    }
    else {
      var getedate = new Date(this.edate);
      getdates = (getedate.getMonth() + 1) + '-' + getedate.getDate() + '-' + getedate.getFullYear();
    }

    // this.orderService.getOrderHistoryCounts(Common.getWithExpiry("CustID"), usrid, getdates, this.Order, this.pono, this.Duration).subscribe((res:any) => {
    //   var getdata = res;
    //   this.totalPage = (res == null ? 0 : getdata.count);
    //   this.IsShow = (res == null ? false : (getdata.count > 9 ? true : false));
    // });
  }
}
