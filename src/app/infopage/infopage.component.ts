import { Component, OnInit } from '@angular/core';
import { SEOService } from '../services/seo.service';
import { Common } from '../model/common.model';
import { DataService } from '../services/data.service';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-infopage',
  templateUrl: './infopage.component.html',
  styleUrls: ['./infopage.component.scss']
})
export class infopageComponent implements OnInit {
  pagedetails: any;
  private _routerSub = Subscription.EMPTY;
  
  constructor(private seoService: SEOService, private route: ActivatedRoute, private dataService: DataService,private router: Router) {
    
    //var geturl = window.location.href.toString().split('/#')[0];
    //this.seoService.setPageTitle('User Profile - ' + geturl);
    //this.seoService.setkeywords('User Profile - ' + geturl);
    //this.seoService.setdescription('User Profile - ' + geturl);
    this._routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url.indexOf("/info/") != -1 || this.router.url.indexOf("/blogs/") != -1 || this.router.url.indexOf("/services/") != -1 || this.router.url.indexOf("/our-lines/") != -1) {
          this.pagedetails = undefined;
          this.getpagedetails();
        }
      }); 
   
  }
  
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  ngOnInit() {
    this.getpagedetails();
  }
  
  getpagedetails(){
    var itemNo = this.route.snapshot.paramMap.get('id');
    if(itemNo!=undefined && itemNo!=null && itemNo!=''){
      
    if (this.pagedetails == null || this.pagedetails == undefined) {
      try{
              this.pagedetails =JSON.parse(Common.getWithExpiry("pagedetails"+itemNo));
      }catch(ex){}
    }
    if (this.pagedetails == null || this.pagedetails == undefined) {
      this.dataService.Getpagedatabyid(itemNo).subscribe((data: any) => {
        this.pagedetails = data;
        Common.setWithExpiry("pagedetails"+itemNo, this.pagedetails);
        this.seoService.setPageTitle(this.pagedetails.PageTitle);
        this.seoService.setkeywords(this.pagedetails.PageKeywords)
        this.seoService.setdescription(this.pagedetails.PageKeywords)
      });
    }
    else{
      this.seoService.setPageTitle(this.pagedetails.PageTitle);
        this.seoService.setkeywords(this.pagedetails.PageKeywords)
        this.seoService.setdescription(this.pagedetails.PageKeywords)
    }
  }
  else{
    var name = this.route.snapshot.paramMap.get('name');
    if (this.pagedetails == null || this.pagedetails == undefined) {
      try{
              this.pagedetails =JSON.parse(Common.getWithExpiry("pagedetails1"+name));
      }catch(ex){}
    }
    if (this.pagedetails == null || this.pagedetails == undefined) {
      this.dataService.Getpagedatabyname(name).subscribe((data: any) => {
        this.pagedetails = data;
        Common.setWithExpiry("pagedetails"+name, this.pagedetails);
        this.seoService.setPageTitle(this.pagedetails.PageTitle);
        this.seoService.setkeywords(this.pagedetails.PageKeywords)
        this.seoService.setdescription(this.pagedetails.PageKeywords)
      });
    }
    else{
      this.seoService.setPageTitle(this.pagedetails.PageTitle);
        this.seoService.setkeywords(this.pagedetails.PageKeywords)
        this.seoService.setdescription(this.pagedetails.PageKeywords)
    }
  }
  this.gototop();
  }
  
  

}
