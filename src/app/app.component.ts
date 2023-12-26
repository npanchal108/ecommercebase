import { Component, HostListener, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { filter, Subscription } from 'rxjs';
import { Common } from './model/common.model';
import { Product } from './model/product.model';
import { CartService } from './services/cart.service';
import { ContactService } from './services/contact.service';
import { DataService } from './services/data.service';
import { LoadingService } from './services/loading.service';
import { SEOService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  contactDtl: any;
  HTTPActivity: boolean | undefined;
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'MM-dd-yyyy',
    defaultOpen: true
  }
  
  products: Product[] | undefined
  Secondcontact: any;
  mainFilter: any

  currentSorting: string | undefined
  isaccesswithlogin: any;
  sessionId: string | undefined;
title:any;
  @HostListener('window:popstate', ['$event'])
  onPopState() {
    if (this.router.url != '/product') {      
      
      var getpageno = Common.getWithExpiry("pageNo");      
      this.cartService.setbackflag('1');
      if(getpageno!=undefined && getpageno!=null){
      this.cartService.setpageno(getpageno);
      
      }
      var getitemname = Common.getWithExpiry("itemname");      
      if(getitemname!=undefined && getitemname!=null){
      this.cartService.setitemname(getitemname);
      }
      var pagesize = Common.getWithExpiry("pagesize");      
      if(pagesize!=undefined && pagesize!=null){
      this.cartService.setpagesizeno(pagesize);
      }
      var stype = Common.getWithExpiry("stype");      
      if(stype!=undefined && stype!=null){
      this.cartService.setstype(stype);
      }
      var Position = Common.getWithExpiry("Position");      
      if(Position!=undefined && Position!=null){
      this.cartService.setPosition(Position);
      }
    }
  }

  

  originalData: any = []
  route: string | undefined;
  
  public loading = false;
  subscription: Subscription;
  url: string | undefined;
  isLoggedIn:boolean=false;
  Allconfigurationlist:any=[];
  private _routerSub = Subscription.EMPTY;
  constructor(@Optional() @Inject(Request) private request: Request,
  @Optional() @Inject(Response) private response: Response,
  @Inject(PLATFORM_ID) private platformId: any,private gtmService: GoogleTagManagerService,private seoService: SEOService,private contactService: ContactService, private loadingService: LoadingService, private dataService: DataService, private cartService: CartService, private router: Router) {
    
    
    this._routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationStart))    
      .subscribe(() => {             
        
      });
    this._routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))    
      .subscribe(() => {       
        
        this.url = this.router.url; 
        try{
        //this.gtmService.addGtmToDom();
        }catch(ed){}
        this.getisaccesswithlogin();
        if (Common.getWithExpiry("CustID") != "" && Common.getWithExpiry("CustID") != null) {
          this.isLoggedIn = true;
        }
        
        //this.cartService.setpageno(undefined);
        if(this.router.url.indexOf('/productdetail/')==-1 && this.router.url.indexOf('/products/')==-1 && this.router.url.indexOf('/productlist/')==-1 && this.router.url.indexOf('/category/')==-1 && this.router.url.indexOf('/search/')==-1)
        {
          this.cartService.setpageno(undefined);          
        }        
        else{
          this.seoService.createLinkForCanonicalURL();
        }      
        this.url = this.router.url;
        if(this.router.url.indexOf('/search/')!=-1){
          this.seoService.setnoindextag();
        }
        
      });
    this.subscription = this.loadingService.getMessage().subscribe((message:any) => {
      if (message.text == 'start') {
          this.loading = true;
        }

      if (message.text == 'stop') {
        this.loading = false;
      }

    });
    
    
    router.events.subscribe(() => {
      if (this.router.url != '') {
        this.route = this.router.url;
      } else {
        this.route = 'Home'
      }
      if (this.route != '/product' && this.route != '/allcategory') {
        Common.removeWithExpiry('brdnode');
        Common.removeWithExpiry('treenode');
      }
    });
  }

  hideandshow(){
    if(this.isaccesswithlogin=='1'){
      if(this.router.url.indexOf('/home')!=-1 || this.router.url.indexOf('/checkout')!=-1 || this.router.url.indexOf('/review-order')!=-1 || this.router.url.indexOf('/viewcart')!=-1 || this.router.url.indexOf('/rfqlist')!=-1){
        this.isaccesswithlogin='0';
      }
      else{        
        this.isaccesswithlogin='0';
      }    
    }
  }

  getisaccesswithlogin(){
    this.isaccesswithlogin = this.dataService.Getconfigbykey("isaccesswithlogin");
    if (this.isaccesswithlogin == null || this.isaccesswithlogin == undefined || this.isaccesswithlogin == '') {
      this.isaccesswithlogin = Common.getWithExpiry("isaccesswithlogin");
    }
    if (this.isaccesswithlogin == null || this.isaccesswithlogin == undefined || this.isaccesswithlogin == '') {
      this.dataService.GetConfidForanonymoususersbrowsethesite().subscribe((res: any) => {
        this.isaccesswithlogin = res;
        Common.setWithExpiry("isaccesswithlogin", this.isaccesswithlogin);
        this.hideandshow();
      });
    }
    else{
      this.hideandshow();
    }
  }
  
  
  getcontactusSecondDetails() {
    try {
      if (Common.getWithExpiry("Secondcontact") != undefined) {
        var Secondcontact = JSON.parse(Common.getWithExpiry("Secondcontact"));
      }
    } catch (ed) { }
    if (Secondcontact == null || Secondcontact == undefined || Secondcontact.length == 0) {
      this.contactService.getContactSecondaryDetails().subscribe((res: any) => {
        this.Secondcontact = res;
        this.getContactDtl();
        Common.setWithExpiry("Secondcontact", JSON.stringify(this.Secondcontact));
      });
    }
    else {
      this.Secondcontact = Secondcontact;
      this.getContactDtl();
    }
  }
  getContactDtl() {
    try {
      if (Common.getWithExpiry("contactDtl") != undefined) {
        var contactDtl = JSON.parse(Common.getWithExpiry("contactDtl"));
      }
    } catch (ed) { }
    if (contactDtl == null || contactDtl == undefined || contactDtl == '') {
      this.contactService.getContact(null).subscribe((res: any) => {
        this.contactDtl = res;
        Common.setWithExpiry("contactDtl", this.contactDtl);
        if (this.Secondcontact.cName == undefined || this.Secondcontact.cName == null || this.Secondcontact.cName == '') {
          Common.setWithExpiry("cpname", this.contactDtl.name);
        }
        else {
          Common.setWithExpiry("cpname", this.Secondcontact.cName);
        }
        Common.setWithExpiry("company_cu", this.contactDtl.company_cu);
        Common.setWithExpiry("company_it", this.contactDtl.company_it);
        Common.setWithExpiry("company_sy", this.contactDtl.company_sy);

      })
    }
    else {
      this.contactDtl = contactDtl;
      if (this.Secondcontact.cName == undefined || this.Secondcontact.cName == null || this.Secondcontact.cName == '') {
        Common.setWithExpiry("cpname", this.contactDtl.name);
      }
      else {
        Common.setWithExpiry("cpname", this.Secondcontact.cName);
      }
      Common.setWithExpiry("company_cu", this.contactDtl.company_cu);
      Common.setWithExpiry("company_it", this.contactDtl.company_it);
      Common.setWithExpiry("company_sy", this.contactDtl.company_sy);
    }
  }
  
  ngOnInit() {

    
    

    
  }

  
}

