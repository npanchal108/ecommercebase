import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderManagementService } from '../../services/order-management.service';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { NG_VALIDATORS, FormControl, Validators } from '@angular/forms';
import { Common } from '../../model/common.model';
import { SEOService } from '../../services/seo.service';
// import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-HelpDesk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.scss']
})
export class HelpDeskComponent implements OnInit {  
totalPage:any;  
IsShow:any;
stat:string="0";
page:number = 1;
Helpdesklist:any;
menutype:any;
stateoption:any=[];
  constructor(private seoService: SEOService,private toastr: ToastrService,private cartService: CartService, private dataService: DataService, private orderService: OrderManagementService, private router: Router) { 
        var geturl =  Common.getWithExpiry("cpname");
      this.seoService.setPageTitle('Help Desk - '+geturl);
    this.seoService.setkeywords('Help Desk - '+geturl);
    this.seoService.setdescription('Help Desk - '+geturl);
    
        this.Gethelpdeskmenutype();
        this.Cleared();
        }
  ngOnInit() {   
    this.gototop();
  }
  gototop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;  
  }
  searched(){
    this.page=1;
  this.getPurchaseHistoryCount();  
  }
  Cleared(){
    this.page=1;
    this.stat="0";
  this.getPurchaseHistoryCount();  
  }
  Gethelpdeskmenutype(){
    this.menutype = Common.getWithExpiry("menutype");
    if (this.menutype == null || this.menutype == undefined || this.menutype == '') {
      this.dataService.Gethelpdeskmenutype().subscribe((res:any) => {
        this.menutype = res;
        if(this.menutype=='1'){
          this.stateoption.push({
            "lable":"Open",
            "value":"0"
          }) 
        }
        else if(this.menutype=='2'){
          this.stateoption.push({
            "lable":"Open",
            "value":"0"
          }) 
          this.stateoption.push({
            "lable":"Close",
            "value":"1"
          }) 
        }
        else if(this.menutype=='3'){
          this.stateoption.push({
            "lable":"Open",
            "value":"0"
          }) 
          this.stateoption.push({
            "lable":"Close",
            "value":"1"
          }) 
          this.stateoption.push({
            "lable":"Both",
            "value":"null"
          }) 
        }
        else{
          this.stateoption.push({
            "lable":"Open",
            "value":"0"
          }) 
          this.stateoption.push({
            "lable":"Close",
            "value":"1"
          }) 
          this.stateoption.push({
            "lable":"Both",
            "value":"null"
          }) 
        }  
        Common.setWithExpiry("menutype", this.menutype);    
      });
    }
    else{
      if(this.menutype=='1'){
        this.stateoption.push({
          "lable":"Open",
          "value":"0"
        }) 
      }
      else if(this.menutype=='2'){
        this.stateoption.push({
          "lable":"Open",
          "value":"0"
        }) 
        this.stateoption.push({
          "lable":"Close",
          "value":"1"
        }) 
      }
      else if(this.menutype=='3'){
        this.stateoption.push({
          "lable":"Open",
          "value":"0"
        }) 
        this.stateoption.push({
          "lable":"Close",
          "value":"1"
        }) 
        this.stateoption.push({
          "lable":"Both",
          "value":"null"
        }) 
      }
      else{
        this.stateoption.push({
          "lable":"Open",
          "value":"0"
        }) 
        this.stateoption.push({
          "lable":"Close",
          "value":"1"
        }) 
        this.stateoption.push({
          "lable":"Both",
          "value":"null"
        }) 
      }
    }
  }

  getPurchaseHistoryCount() {    
    this.orderService.GetHelpdeskDataCount(Common.getWithExpiry("CustID"),this.stat).subscribe((res:any) => {
      var getdata = res;
      this.totalPage = (res==null ? 0 : getdata.count);
      this.IsShow=(res==null ? false : (getdata.count > 20 ? true : false));
      this.getPurchaseHistory();
    });
  }
  getorderlistpage(page){
    this.page=page;
      this.getPurchaseHistory();
      return this.page;
  }

  getPurchaseHistory() {    
    this.orderService.GetHelpdeskData(Common.getWithExpiry("CustID"),this.stat, this.page).subscribe((res:any) => {
      this.Helpdesklist = res;
    })
  }
  






}
