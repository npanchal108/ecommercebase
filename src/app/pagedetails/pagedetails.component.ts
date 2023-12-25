import { Component } from '@angular/core';
import { SEOService } from '../services/seo.service';
import { Common } from '../model/common.model';
import { DataService } from '../services/data.service';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-pagedetails',
  templateUrl: './pagedetails.component.html',
  styleUrls: ['./pagedetails.component.scss']
})
export class pagedetailsComponent  {
  pagedetails: any;
  private _routerSub = Subscription.EMPTY;
  ptype:any;
  postUrl: any;
  postTitle = '';
  postImage = '';
  dynamicpagelist: any;
  constructor(private seoService: SEOService, private route: ActivatedRoute, private dataService: DataService,private router: Router) {
    this.postUrl=this.route.url;
    //var geturl = window.location.href.toString().split('/#')[0];
    //this.seoService.setPageTitle('User Profile - ' + geturl);
    //this.seoService.setkeywords('User Profile - ' + geturl);
    //this.seoService.setdescription('User Profile - ' + geturl);
    this._routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.ptype='';
        if (this.router.url.indexOf("/services/") != -1) {
          this.ptype = 'services';
        }
        else if (this.router.url.indexOf("/info/") != -1) {
          this.ptype = 'info';
        }
        else if (this.router.url.indexOf("/blogs/") != -1) {
          this.ptype = 'blogs';
        }
        else if (this.router.url.indexOf("/our-lines/") != -1) {
          this.ptype = 'our-lines';
        }


        //if (this.router.url.indexOf("/services/") != -1 || this.router.url.indexOf("/info/") != -1 || this.router.url.indexOf("/blogs/") != -1 || this.router.url.indexOf("/our-lines/") != -1) {
          if(this.ptype!=undefined && this.ptype!=null && this.ptype!=''){
          this.pagedetails = undefined;
          this.getpagedetails();
          this.Getpagelistbytype();
          }
        //}
      }); 
   
  }
  getFacebookShareLink(pageTitle): string {
    var currentUrl ='';
    try{
      currentUrl=window.location.href;
    }catch(ed){}
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${currentUrl}/${pageTitle}`)}`;
    
  }
  getlinkedinShareLink(pageTitle): string {
    var currentUrl ='';
    try{
      currentUrl=window.location.href;
    }catch(ed){}
    return `https://www.linkedin.com/share?url=${currentUrl}/${pageTitle}`;
  
  }

  getInstaShareLink(pageTitle): string {
    var currentUrl ='';
    try{
      currentUrl= window.location.href;
    }catch(ed){}
    return `https://www.instagram.com/share?url=${currentUrl}/${pageTitle}`
  
  }

  getPinterestShareLink(pageTitle, image, description): string {
    var urlToShare ='';
    try{
      urlToShare =`${window.location.href}/${pageTitle}`;
    }catch(ed){}
    return `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      urlToShare
    )}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(
      description
    )}`;
  
  }
  

  getTwitterShareLink(pageTitle): string {
    var urlToShare='';
    try{
     urlToShare = `${window.location.href}/${pageTitle}`;
    }catch(ed){}
    const text = pageTitle; // Replace with your desired text
    return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      urlToShare
    )}&text=${encodeURIComponent(text)}`;
  }
  gototop() {
    try{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    }catch(ed){}
  }

  Getpagelistbytype() {
    this.dataService.GetPagelistbytype(1, 45, this.ptype).subscribe((data: any) => {
      this.dynamicpagelist = data.slice(0, 3);
    });
  }
  getpagedetails(){
  
    var name = this.route.snapshot.paramMap.get('name');
    if (this.pagedetails == null || this.pagedetails == undefined) {
      try{
              this.pagedetails =JSON.parse(Common.getWithExpiry("pagedetails2"+name+this.ptype));
      }catch(ex){}
    }
    if (this.pagedetails == null || this.pagedetails == undefined) {
      this.dataService.Getpagebytypeandname(name,this.ptype).subscribe((data: any) => {
        this.pagedetails = data;
        Common.setWithExpiry("pagedetails2"+name+this.ptype, this.pagedetails);
        this.seoService.setPageTitle(this.pagedetails.PageTitle);
        this.seoService.setkeywords(this.pagedetails.PageKeywords)
        this.seoService.setdescription(this.pagedetails.PageKeywords)
        this.postTitle = this.pagedetails.PageTitle;
        this.postImage = "https://store-nbg3x9zld3.mybigcommerce.com" + this.pagedetails.imageurl;
        let pageContent = {
          postTitle: this.pagedetails.PageTitle,
          postDescription: this.pagedetails.PageDescription,
          postImage: "https://store-nbg3x9zld3.mybigcommerce.com" + this.pagedetails.imageurl,
          postUrl: this.postUrl
        }
        this.seoService.resetTagsForSocialSharing();
        this.seoService.addTagsForSocialSharing(pageContent);
      });
    }
    else{
      this.seoService.setPageTitle(this.pagedetails.PageTitle);
        this.seoService.setkeywords(this.pagedetails.PageKeywords)
        this.seoService.setdescription(this.pagedetails.PageKeywords)
    }
  
  this.gototop();
  }
  
  

}
