import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, debounceTime, distinctUntilChanged, filter, map, mergeMap, Observable, of, OperatorFunction, Subscription, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Common } from '../model/common.model';
import { CartService } from '../services/cart.service';
import { ContactService } from '../services/contact.service';
import { DataService } from '../services/data.service';
import { LoadingService } from '../services/loading.service';
import { MenuService } from '../services/menu.service';
//import { RoutingState } from '../services/routingState';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  formatter = (x: { itemname: string }) => x.itemname;
  formatter1 = (result: any) => result;
  products: any[] = [];
  numProducts: number = 0;
  cartTotal: number = 0;
  sessionId: string | undefined;
  isNotLoggedIn: boolean = true;
  txtSearch: any;
  webtype: string | undefined;
  user: string | undefined;  
  UserType: any;
  businesstype: string | undefined;
  webname: string | undefined;
  isactive: any;
  iswishshow: any;
  isrfqshow: any;
  headerlinks: any;
  titlenames: any;
  contactDtl: any = [];
  address: any = [];
  isheaderbanner:any;
  addess: string = '';
  isShowSalesLogin: any;
  isShowRegistration: boolean = false;
  IsMuscle: any;
  israteshowforcu: any;
  Secondcontact: any;
  logourl: any;
  itemname:any;
  keyword:any='name';
  headermsg: any;  
  UrlWithFreeForm: any;
  UrlWithDetails: any;
  priceshowcust: any;
  isDisableElem: boolean = false;
  newpermission: any;
  itemCounter: number = 0;
  PriceRound: any;
  isumdescr:any;
   //@HostListener('window:resize', ['$event'])
  innerWidth: any;
  logoimageurl: any;
  wishlistlable: any;
  Searchplaceholder: string = 'Search here...';
  //ipAddress: string;
  umdescrlist:any;
  Allconfigurationlist: any = [];
  autoCompleteData:any=[];
  asyncSelected: string | undefined;
  typeaheadLoading: boolean | undefined;
  typeaheadNoResults: boolean | undefined; 
  dataSource: any;
  selecteditem:any;
  flagtocheck:any=false;
  IsRMA:any;
  RMALable:any;
  clearsearch:any;
  isdescron:any='1';
  categoryList: any;
  brandList:any;
  parentMenu:any;
  childMenu:any;
  shcart:any;
  shuser:any;
  addcartpop:any;
  iskyraden:any;
  mobilemenu:any=0;
  private _routerSub = Subscription.EMPTY;
  menulable:any="Browse Categories";
  menulable1:any="Browse Products";
  searching: boolean=true;
  searchFailed: boolean=false;
  //showAutoComplete: boolean = true;
  constructor(private http: HttpClient,private renderer: Renderer2,private toastr: ToastrService, private seoService: SEOService,  private contactService: ContactService, private dataService: DataService, private menuService: MenuService, private cartService: CartService, private router: Router, private loadingService: LoadingService) {

    this._routerSub = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd))
      .subscribe((value: any) => {
        this.addcartpop='0';
      });
    var punchOutType = Common.getWithExpiry("PunchOutType");

    if (punchOutType == "Southern") {
      this.isDisableElem = true;
    }
    this.isheaderbanner=environment.isheaderbanner;
    this.iskyraden=environment.iskyraden;
    //this.GetpriceRoundingsetting();
    this.GetHeaderPageConfigurations();
    this.geheaderlinks();
    //this.getSearchplaceholder();
    //this.getUrlWithDetails();
    //this.GetConfigforwishlistlable();
    //this.showpricetocustomers();
    //this.Getlogoimageurl();
  //this.getcupermisiions();  

    //this.geHeaderMsg();
    //this.getlogourl();
    //this.getwishconfig();
    //this.getrfqconfig();
    //this.salesLoginSetting();
    //this.registrationSetting();
    //this.getIsMuscle();
    this.getcontactusSecondDetails();
    this.getAllCategory();
    this.GetBrands();
    //this.getalldevicenames();
  }


  search: OperatorFunction<any, readonly any[]> = (text$: Observable<any>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.searching = true),
    switchMap(term =>
      this.dataService.search(term).pipe(
        tap(() => this.searchFailed = false),
        catchError(() => {
          this.searchFailed = true;
          return of([]);
        }))
    ),
    tap(() => this.searching = false)
  );

  getFilterByParent(parent: any) {

    if(parent!=undefined && parent!=null && parent!='' && parent.indexOf("/")!=-1){
      parent=parent.split("/")[1];
    }
    var getlist = [];
    if(this.categoryList!=undefined && this.categoryList!=null && this.categoryList.length>0){
   
    for (var i = 0; i < this.categoryList.length; i++) {
      if (parent.toLowerCase() == this.categoryList[i].parent_node.toLowerCase()) {
        getlist.push(this.categoryList[i]);
      }
    }
  }
    return getlist;
  }
  openmenumobile(){
    this.mobilemenu=(this.mobilemenu==1?0:1);
  }
  openpopup(){
    if(this.addcartpop==undefined || this.addcartpop=='0'){
      this.addcartpop='1';
    }
    else{
      this.addcartpop='0';
    }
  }

  showhidecart(){
    if(this.shcart==undefined || this.shcart==0){
      this.shcart=1;
    }
    else{
      this.shcart=0;
    }
  }
  showhideuser(){
    if(this.shuser==undefined || this.shuser==0){
      this.shuser=1;
    }
    else{
      this.shuser=0;
    }
  }
  getAllCategory() {
    var Guestwarehouse = Common.getWithExpiry("Guestwarehouse");
    var wh = (Common.getWithExpiry("warehouse") == undefined ? Guestwarehouse : Common.getWithExpiry("warehouse"));
    try {
      if (Common.getWithExpiry("newcategoryList") != undefined) {
        this.categoryList = JSON.parse(Common.getWithExpiry("newcategoryList"));
      }
    } catch (ed) { }
    if (this.categoryList == null || this.categoryList == undefined || this.categoryList.length == 0) {
      this.menuService.getMenunewtheme(wh, '').subscribe((res: any) => {
        this.categoryList = res;
        Common.setWithExpiry("newcategoryList", JSON.stringify(this.categoryList));
        //this.common.setWithExpiry(this.cookname + "GetHeaderPageConfigurations", JSON.stringify(this.Allconfigurationlist));
        // for (var i = 0; i < this.categoryList.length; i++) {
        //       if (this.categoryList[i].ConfigKey == "categorylabel") {
        //         this.categorylabel = this.categoryList[i].ConfigValue;
        //       }
        //     }
      });
    }
  }
  GetBrands() {
    var Guestwarehouse = Common.getWithExpiry("Guestwarehouse");
    var wh = (Common.getWithExpiry("warehouse") == undefined ? Guestwarehouse : Common.getWithExpiry("warehouse"));
    var CustID = Common.getWithExpiry("CustID");
    if (Common.getWithExpiry('brandList'+CustID) != undefined) {
      try {
        var brandList = JSON.parse(Common.getWithExpiry('brandList')+CustID);
      } catch (ed) { }
    }
    if (brandList == null || brandList == undefined || brandList.length == 0) {
      this.dataService.GetBrandList(wh, CustID).subscribe((res: any) => {
        this.brandList = res;
        this.parentMenu=[];
        this.childMenu=[];
        Common.setWithExpiry('brandList'+CustID, JSON.stringify(this.brandList));
        for (let menu of this.brandList) {
          menu.setflag = false;
          if (menu.maj_class == '') {
            this.parentMenu.push(menu);
          }
          else {
            if (!this.parentMenu.some((x: { maj_class: any; }) => x.maj_class == menu.maj_class)) {
              this.parentMenu.push(menu);
              // }
              // else{

              this.childMenu.push(menu);
            }
            else {
              this.childMenu.push(menu);
            }
          }


        }
      });
    }
    else {
      this.brandList = brandList;
      this.parentMenu=[];
        this.childMenu=[];
      for (let menu of this.brandList) {
        menu.setflag = false;
        if (menu.maj_class == '') {
          this.parentMenu.push(menu);
        }
        else {
          if (!this.parentMenu.some((x: { maj_class: any; }) => x.maj_class == menu.maj_class)) {
            this.parentMenu.push(menu);
            //}
            //else{
            this.childMenu.push(menu);
          }
          else {
            this.childMenu.push(menu);
          }
        }
      }
    }
  }
  // getcupermisiions(){
  //   this.israteshowforcu = true;
  //   if (Common.getWithExpiry("UserType") == '3') {
  //     var permissions = Common.getWithExpiry("Permission").split(';');
  //     if (permissions.indexOf("SP") != -1) {
  //       this.israteshowforcu = true;
  //     }
  //     else {
  //       this.israteshowforcu = false;
  //     }
  //   }
  // }
  GetpriceRoundingsetting() {
    this.PriceRound = this.dataService.Getconfigbykey("PriceRound");
    if (this.PriceRound == null || this.PriceRound == undefined || this.PriceRound == '') {
      this.PriceRound = Common.getWithExpiry("PriceRound");
    }
    if (this.PriceRound == null || this.PriceRound == undefined || this.PriceRound == '') {
      this.dataService.GetpriceRoundingsetting().subscribe((res: any) => {
        this.PriceRound = res;
        Common.setWithExpiry("PriceRound", this.PriceRound);
      });
    }
  }


  getalldevicenames(){
    this.dataService.GetAllDevicenames().subscribe((res: any) => {
      var devicename = res;
      
    });
    this.dataService.GetAllDevicenames1().subscribe((res: any) => {
      var devicename = res;
      
    });

  }

  searchall(){
    this.dataSource =new Observable((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    }).pipe(mergeMap((token: any) => this.filterResults(token)));
  }

  filterResults(token: string) {
    var Guestwarehouse = Common.getWithExpiry("Guestwarehouse");
    var wh = (Common.getWithExpiry("warehouse") == undefined ? Guestwarehouse : Common.getWithExpiry("warehouse"));
    var pmodel = {
      word: token,
      PageNo: 1,
      PageSize: 10,
      warehouse: wh,
      type: 0,
      customer: Common.getWithExpiry("CustID"),
      company_sy: Common.getWithExpiry("company_sy")
    }
    // adjust the remote url.
    //const url = '${this.url}?searchTerm=token';
    return this.http.post(environment.APIUrl + '/Product/GetProductListBySearchforheader', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) })
      // if your backend does the filtering, just return the results.
      // oterwise we have to massage them a bit
      .pipe(map((results: any) => results.filter((res: any) => res.freeform.toLowerCase().indexOf(token.toLowerCase()) > -1)));
  }
  typeaheadOnSelect(event: { item: { itemname: string; links: any; }; }){
this.selecteditem=event.item;
this.router.navigate(['productdetail', event.item.itemname,event.item.links]);
//this.selecteditem=undefined;
if(this.clearsearch=='1'){
  this.asyncSelected='';
}else{
this.asyncSelected=event.item.itemname;
}
  }
  
  replaceAll(word: string, search: string | RegExp, replacement: any) {
    return word.replace(new RegExp(search, 'g'), replacement);
  };
  gotosouthern(){
    var geturl = Common.getWithExpiry("BuyerCookie");
    this.router.navigate(['/southerquote/' + geturl.toLowerCase()])
  }

  GetHeaderPageConfigurations() {

    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      try {
        this.Allconfigurationlist = JSON.parse(Common.getWithExpiry("Allconfigs"));
      } catch (ed) { }
    }
    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      this.dataService.GetAllConfiguration().subscribe((data: any) => {
        this.Allconfigurationlist = data;
        Common.setWithExpiry("Allconfigs", JSON.stringify(this.Allconfigurationlist));
        for (var i = 0; i < this.Allconfigurationlist.length; i++) {
          if (this.Allconfigurationlist[i].ConfigKey == "IsMuscle") {
            this.IsMuscle = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "SalesLogin") {
            this.isShowSalesLogin = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "Registration") {
            this.isShowRegistration = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
          }
          
          if (this.Allconfigurationlist[i].ConfigKey == "ShowPrices") {
            this.priceshowcust = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "iswishlist") {
            this.iswishshow = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "headermsg") {
            this.headermsg = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "logourl") {
            this.logourl = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "isrfqlist") {
            this.isrfqshow = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "websitetype") {
            this.webtype = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "businesstype") {
            this.businesstype = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "Searchplaceholder") {
            this.Searchplaceholder = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "wishlistlable") {
            this.wishlistlable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "UrlWithDetails") {
            this.UrlWithDetails = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "UrlWithFreeForm") {
            this.UrlWithFreeForm = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "logoimageurl") {
            this.logoimageurl = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "PriceRound") {
            this.PriceRound = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "IsRMA") {
            this.IsRMA = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "RMALable") {
            this.RMALable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "clearsearch") {
            this.clearsearch = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "NewPermission") {
            this.newpermission = this.Allconfigurationlist[i].ConfigValue;
            this.newpermissionsetting();
          }
        }
        this.getumdescrconfig();
      })
    }
    else {
      for (var i = 0; i < this.Allconfigurationlist.length; i++) {
        if (this.Allconfigurationlist[i].ConfigKey == "IsMuscle") {
          this.IsMuscle = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "SalesLogin") {
          this.isShowSalesLogin = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "Registration") {
          this.isShowRegistration = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
        }
        if (this.Allconfigurationlist[i].ConfigKey == "ShowPrices") {
          this.priceshowcust = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "iswishlist") {
          this.iswishshow = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "headermsg") {
          this.headermsg = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "logourl") {
          this.logourl = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "isrfqlist") {
          this.isrfqshow = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "websitetype") {
          this.webtype = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "businesstype") {
          this.businesstype = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "Searchplaceholder") {
          this.Searchplaceholder = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "wishlistlable") {
          this.wishlistlable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "UrlWithDetails") {
          this.UrlWithDetails = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "UrlWithFreeForm") {
          this.UrlWithFreeForm = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "logoimageurl") {
          this.logoimageurl = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "PriceRound") {
          this.PriceRound = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "IsRMA") {
          this.IsRMA = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "RMALable") {
          this.RMALable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "clearsearch") {
          this.clearsearch = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "NewPermission") {
          this.newpermission = this.Allconfigurationlist[i].ConfigValue;
          this.newpermissionsetting();
        }
      }
      this.getumdescrconfig();
    }
  }
  newpermissionsetting() {
    if (this.newpermission == "1") {
      if(Common.getWithExpiry("UserType") == '3'){
        var permis = JSON.parse(Common.getWithExpiry("ProfileLog"));
        this.israteshowforcu = permis[8];
      }
      else if( Common.getWithExpiry("SalesUserType")=='2'){
        var subuser = Common.getWithExpiry("subuser").toString();
        if(subuser!=undefined && subuser!=''){
          var permissions = Common.getWithExpiry("Permission").split(';');
          if (permissions.indexOf("SP") != -1) {
            this.israteshowforcu = true;
          }
          else {
            this.israteshowforcu = false;
          }  
        }
        else{
          this.israteshowforcu = true;  
        }
      }
      else{
        this.israteshowforcu = true;
      }      
    }
    else {
      if (Common.getWithExpiry("UserType") == '3') {
        var permissions = Common.getWithExpiry("Permission").split(';');
        if (permissions.indexOf("SP") != -1) {
          this.israteshowforcu = true;
        }
        else {
          this.israteshowforcu = false;
        }
      }
      else if( Common.getWithExpiry("SalesUserType")=='2'){
        var subuser = Common.getWithExpiry("subuser").toString();
        if(subuser!=undefined && subuser!=''){
          var permissions = Common.getWithExpiry("Permission").split(';');
          if (permissions.indexOf("SP") != -1) {
            this.israteshowforcu = true;
          }
          else {
            this.israteshowforcu = false;
          }  
        }
        else{
          this.israteshowforcu = true;  
        }
      }
      else {
        this.israteshowforcu = true;
      }
    }
  }
  getIsMuscle() {
    this.IsMuscle = Common.getWithExpiry("IsMuscle");
    if (this.IsMuscle == null || this.IsMuscle == undefined) {
      this.dataService.GetConfigForIsMuscle().subscribe((data: any) => {
        this.IsMuscle = data;
        Common.setWithExpiry("IsMuscle", this.IsMuscle);
      })
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
    } catch (ex) { }
    if (contactDtl == null || contactDtl == undefined || contactDtl == '') {
      this.contactService.getContact(Common.getWithExpiry("company_sy")).subscribe((res: any) => {
        this.contactDtl = res;
        Common.setWithExpiry("contactDtl", JSON.stringify(this.contactDtl));
        if (this.Secondcontact.cName == undefined || this.Secondcontact.cName == null || this.Secondcontact.cName == '') {
          Common.setWithExpiry("cpname", this.contactDtl.name);
          this.webname = this.contactDtl.name;
        }
        else {
          Common.setWithExpiry("cpname", this.Secondcontact.cName);
          this.webname = this.Secondcontact.cName;
        }
        Common.setWithExpiry("company_cu", this.contactDtl.company_cu);
        Common.setWithExpiry("company_it", this.contactDtl.company_it);
        Common.setWithExpiry("company_sy", this.contactDtl.company_sy);
        try {
          var getarr = this.contactDtl.adr.trim().replace('[', '').replace(']', '').split(',');
          for (var i = 0; i < getarr.length; i++) {
            var adrd = getarr[i].trim().replace('"', '').replace('"', '');
            adrd = adrd.trim();
            this.address.push(adrd);
            if (adrd != '') {
              this.addess = this.addess + ", " + adrd;
            }
          }
        } catch (ed) { }
        var geturl = Common.getWithExpiry("cpname");
        this.seoService.setauthormetatag(geturl + ' ' + this.address + ' ' + this.contactDtl.state + ' ' + this.contactDtl.postal_code + ' ' + this.contactDtl.country_code + ' ' + this.contactDtl.phone + ' ' + this.contactDtl.co_email + ' ' + this.contactDtl.co_web + ' ' + this.contactDtl.fax);

      })
    }
    else {
      this.contactDtl = contactDtl;
      if (this.Secondcontact.cName == undefined || this.Secondcontact.cName == null || this.Secondcontact.cName == '') {
        Common.setWithExpiry("cpname", this.contactDtl.name);
        this.webname = this.contactDtl.name;
      }
      else {
        Common.setWithExpiry("cpname", this.Secondcontact.cName);
        this.webname = this.Secondcontact.cName;
      }
      Common.setWithExpiry("company_cu", this.contactDtl.company_cu);
      Common.setWithExpiry("company_it", this.contactDtl.company_it);
      Common.setWithExpiry("company_sy", this.contactDtl.company_sy);
      var getarr = this.contactDtl.adr.trim().replace('[', '').replace(']', '').split(',');
      for (var i = 0; i < getarr.length; i++) {
        var adrd = getarr[i].trim().replace('"', '').replace('"', '');
        adrd = adrd.trim();
        this.address.push(adrd);
        if (adrd != '') {
          this.addess = this.addess + ", " + adrd;
        }
      }
      var geturl = Common.getWithExpiry("cpname");
      this.seoService.setauthormetatag(geturl + ' ' + this.address + ' ' + this.contactDtl.state + ' ' + this.contactDtl.postal_code + ' ' + this.contactDtl.country_code + ' ' + this.contactDtl.phone + ' ' + this.contactDtl.co_email + ' ' + this.contactDtl.co_web + ' ' + this.contactDtl.fax);
    }
  }


  salesLoginSetting() {
    this.isShowSalesLogin = this.dataService.Getconfigbykey("SalesLogin");
    if (this.isShowSalesLogin == undefined || this.isShowSalesLogin == null || this.isShowSalesLogin == '') {
      this.isShowSalesLogin = Common.getWithExpiry("isShowSalesLogin");
    }
    if (this.isShowSalesLogin == undefined || this.isShowSalesLogin == null || this.isShowSalesLogin == '') {
      this.dataService.SalesLoginSetting().subscribe((res: any) => {
        this.isShowSalesLogin = res;
        Common.setWithExpiry("isShowSalesLogin", this.isShowSalesLogin);
      });
    }
  }


  registrationSetting() {
    var RegistrationS = this.dataService.Getconfigbykey("Registration");
    if (RegistrationS == undefined || RegistrationS == null || RegistrationS == '') {
      RegistrationS = Common.getWithExpiry("RegistrationSetting");
    }
    if (RegistrationS == undefined || RegistrationS == null || RegistrationS == '') {
      this.dataService.RegistrationSetting().subscribe((data: any) => {
        var dd = data;
        Common.setWithExpiry("RegistrationSetting", dd);
        if (dd == "1") {
          this.isShowRegistration = true;
        }
        else {
          this.isShowRegistration = false;
        }
      });
    }
    else {
      if (RegistrationS == "1") {
        this.isShowRegistration = true;
      }
      else {
        this.isShowRegistration = false;
      }
    }
  }
  showpricetocustomers() {
    this.priceshowcust = this.dataService.Getconfigbykey("ShowPrices");
    if (this.priceshowcust == null || this.priceshowcust == undefined || this.priceshowcust == '') {
      this.priceshowcust = Common.getWithExpiry("priceshowcust");
    }
    if (this.priceshowcust == null || this.priceshowcust == undefined || this.priceshowcust == '') {
      this.dataService.showpricetocustomers().subscribe((data: any) => {
        this.priceshowcust = data;
        Common.setWithExpiry("priceshowcust", this.priceshowcust);
      })
    }
  }
  getwishconfig() {
    this.iswishshow = this.dataService.Getconfigbykey("iswishlist");
    if (this.iswishshow == null || this.iswishshow == undefined || this.iswishshow == '') {
      this.iswishshow = Common.getWithExpiry("iswishshow");
    }
    if (this.iswishshow == null || this.iswishshow == undefined || this.iswishshow == '') {
      this.dataService.Getwishlistfeatureonoff().subscribe((res: any) => {
        this.iswishshow = res;
        Common.setWithExpiry("iswishshow", this.iswishshow);
      });
    }
  }
  geHeaderMsg() {
    this.headermsg = this.dataService.Getconfigbykey("headermsg");
    if (this.headermsg == null || this.headermsg == undefined || this.headermsg == '') {
      this.headermsg = Common.getWithExpiry("headermsg");
    }
    if (this.headermsg == null || this.headermsg == undefined || this.headermsg == '') {
      this.dataService.getconfigfortheheadermsg().subscribe((res: any) => {
        this.headermsg = res;
        Common.setWithExpiry("headermsg", this.headermsg);
      });
    }
  }
  getlogourl() {
    this.logourl = this.dataService.Getconfigbykey("logourl");
    if (this.logourl == null || this.logourl == undefined || this.logourl == '') {
      this.logourl = Common.getWithExpiry("logourl");
    }
    if (this.logourl == null || this.logourl == undefined || this.logourl == '') {
      this.dataService.geturlforthelogo().subscribe((res: any) => {
        this.logourl = res;
        Common.setWithExpiry("logourl", this.logourl);
      });
    }
  }
  getrfqconfig() {
    this.isrfqshow = this.dataService.Getconfigbykey("isrfqlist");
    if (this.isrfqshow == null || this.isrfqshow == undefined || this.isrfqshow == '') {
      this.isrfqshow = Common.getWithExpiry("isrfqshow");
    }
    if (this.isrfqshow == null || this.isrfqshow == undefined || this.isrfqshow == '') {
      this.dataService.Getrfqlistfeatureonoff().subscribe((res: any) => {
        this.isrfqshow = res;
        Common.setWithExpiry("isrfqshow", this.isrfqshow);
      });
    }
  }
  geheaderlinks() {
    try {
      if (Common.getWithExpiry('headerlinks') != undefined) {
        var headerlinks = JSON.parse(Common.getWithExpiry('headerlinks'));
      }
    } catch (ed) { }
    if (headerlinks == null || headerlinks == undefined || headerlinks.length == 0) {

      this.dataService.Getheaderlinkslist().subscribe((res: any) => {
        this.headerlinks = res;
        Common.setWithExpiry('headerlinks', JSON.stringify(this.headerlinks));
      });
    }
    else {
      this.headerlinks = headerlinks;
    }
  }

  // getIP() {
  //   this.ip.getIPAddress().subscribe((res: any) => {
  //     this.ipAddress = res.ip;
  //   });
  // }
  setflagtoshow(menu: { flag: boolean; }){
    menu.flag=true;
  }
  setflagtohide(menu: { flag: boolean; }){
    menu.flag=false;
  }
  ngOnInit() {
    this.searchall();
    this.cartService.southernAdded$.subscribe((data: any) => {
      this.isDisableElem = data.result;
      if (Common.getWithExpiry("Name") != undefined) {
        this.isNotLoggedIn = false;
        this.user = Common.getWithExpiry("Name");
      }
    });

    
    // try
    // {
    // this.innerWidth = window.innerWidth;
    // }
    // catch(ex){}
    //this.getIP();

    this.UserType = (Common.getWithExpiry("SalesUserType") == undefined ? (Common.getWithExpiry("UserType") == undefined ? "1" : Common.getWithExpiry("UserType")) : Common.getWithExpiry("SalesUserType").toString());
    if (Common.getWithExpiry("UserID") != undefined || Common.getWithExpiry("SalesUserID") != undefined) {
      this.isNotLoggedIn = false;
      if (this.UserType == 4) {
        this.user = "Guest";
      }
      else {
        if (this.UserType == 2) {
          var getuser = Common.getWithExpiry("CustID")
          if (getuser != undefined && getuser != null) {
            this.user = Common.getWithExpiry("Name") + ' As ' + getuser;
          }
          else {
            this.user = Common.getWithExpiry("Name");
          }
        }
        else {
          this.user = Common.getWithExpiry("Name");
        }
      }
    }
    else {
      this.isNotLoggedIn = true;
    }




    this.sessionId = Common.getSessionId();
    if (Common.getWithExpiry("IsPunchOut") == "Yes") {
      this.cartService.deleteCartItemPunchOut(Common.getWithExpiry("CustID")).subscribe((res: any) => {
      });
    }
    else {
      this.getCartItems();
    }

    this.cartService.productAdded$.subscribe((data: any) => {
      this.getCartItems();
      
    });
    this.cartService.productAdded1$.subscribe((data: any) => {
      this.itemCounter++;
      
      if (this.itemCounter == data.data) {
        this.itemCounter = 0;
        var missingItems = Common.getWithExpiry("MissingItems");
        if (missingItems != undefined) {
          this.cartService.sendMissingProductEmail(missingItems).subscribe((res: any) => {
          });
        }

        //setTimeout(() => {                           //<<<---using ()=> syntax
          if (this.numProducts > 0) {
            this.router.navigate(['/viewcart']);
          }
          else {
            this.sendMessage('stop');
          }
        //}, 1000);

      }
    });

    

    this.cartService.productUpdatedLogin$.subscribe((data: any) => {
      this.isNotLoggedIn = false;
      
      if(this.products!=undefined && this.products!=null && this.products.length>0 && this.flagtocheck==false){
        this.flagtocheck=true;        
      for (var t=0;t<this.products.length;t++) {        
        var prs = this.products[t];
      prs.product.quantity=prs.quantity;
      prs.product.Quantity=prs.quantity;      
      this.deleteitemforsession(prs.product);
          this.Addnewproduct(prs.product,t,this.products.length);          
    }
    
  }
  else{
    this.getCartItems();
  }
      // this.cartService.updateCartForSession().subscribe(rr => {
      //   this.getCartItems();
      // })
      if (Common.getWithExpiry("IsPunchOut") == "Yes") {
        this.cartService.deleteCartItemPunchOut(Common.getWithExpiry("CustID")).subscribe((res: any) => {
        });
      }
      // else {
      //   this.cartService.updateCartForSession().subscribe(rr => {
      //     this.getCartItems();
      //   });
      // }

    });



    this.cartService.productUpdated$.subscribe((data: any) => {
      this.cartTotal = data.cartTotal;
      let total=0;
      for (var t=0;t<data.product.length;t++) {        
        total=Number(total)+data.product[t].Quantity;
      }
      this.numProducts = total;

    });
    this.cartService.customeradded$.subscribe((data: any) => {
      this.user = data;
      this.newpermissionsetting();
      //this.getcupermisiions();
    });
    // this.webtype = this.dataService.Getconfigbykey("websitetype");
    // if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
    //     this.webtype = Common.getWithExpiry("websitetype");
    // }
    // if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
    //     this.dataService.GetWebsiteType().subscribe((data: any) => {
    //         this.webtype = data;
    //         Common.setWithExpiry("websitetype", this.webtype);
    //     })
    // }

  }

  closemobilemenu1() {
    
  //   try
  //   {
  //   if (this.innerWidth <= 426) {
  //     const element = this.renderer.selectRootElement("#mobilemenu1");
  //     element.click();
  //   }
  // }  catch(ex)  {}
  
    // this.renderer.addClass(element,"collapsed");
    // const element1 = this.renderer.selectRootElement("#mc-horizontal-menu-collapse");
    // this.renderer.removeClass(element1,"collapse");
    // this.renderer.removeClass(element1,"in");
    // this.renderer.addClass(element1,"collapsed");

    //this.renderer.setStyle(element1,"height","0px");

  }

  sendMessage(message: string): void {
    this.loadingService.LoadingMessage(message);
  }

  register() {
    this.isactive = 'Register';
    // this.businesstype = this.dataService.Getconfigbykey("businesstype");
    // if (this.businesstype == null || this.businesstype == undefined || this.businesstype == '') {
    //   this.businesstype = Common.getWithExpiry("businesstype");
    // }
    // if (this.businesstype == null || this.businesstype == undefined || this.businesstype == '') {
    //   this.dataService.Getbusinesstype().subscribe((data1: any) => {
    //     this.businesstype = data1;
    //     Common.setWithExpiry("businesstype", this.businesstype);
    //     if (this.businesstype == "B2C") {
    //       this.router.navigate(['registration']);
    //     }
    //     else if (this.businesstype == "B2B") {
    //       this.router.navigate(['registration']);
    //     }
    //     else {
    //       this.router.navigate(['new-customer']);
    //     }
    //   })
    // }
    // else {
      if(!this.iskyraden){
    if (this.businesstype == "B2C") {
      this.router.navigate(['registration']);
    }
    else if (this.businesstype == "B2B") {
      this.router.navigate(['b2b-registration']);
    }
    else {
      this.router.navigate(['new-customer']);
    }
  }
  else{
    Common.setWithExpiry("carturl", this.router.url);  
    this.router.navigate(['create-account']);
  }
    //}
  }


  deleteProduct(product: { itemnumber: any; um: any; }) {

    var usrid = null
    if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
      usrid = Common.getWithExpiry("UserID");
    }
    else {
      usrid = Common.getWithExpiry("CustID");
    }
    this.cartService.deleteCartItem(product.itemnumber, product.um).subscribe((res: any) => {
      var getirl = window.location.href;
      this.getCartItems();
      if (getirl.indexOf('viewcart') != -1) {
        window.location.reload();
      }
    });
  }
  deleteitemforsession(item: { itemname: any; um: any; }){
    this.cartService.deleteCartItemForSession(item.itemname, item.um).subscribe((res: any) => {
    });
  }

  getCartItems() {
    var finalResult: any[] = [];
    var total = 0;
    var totalitem=0;
    if (Common.getWithExpiry("CustID") == undefined || Common.getWithExpiry("CustID") == null) {
      var usrid = null
      if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
        usrid = Common.getWithExpiry("UserID") + Common.getWithExpiry("CustID");
      }
      else {
        usrid = Common.getWithExpiry("CustID");
      }
      this.cartService.getCartItemByUserID().subscribe((res: any) => {
        var getdata = res;
        if (getdata != undefined && getdata != null && getdata.length > 0) {
          for (let pp of getdata) {
total = Number(total) + Number(pp.Price);
totalitem=Number(totalitem)+Number(pp.Quantity);
            finalResult.push({ "product": { "RowID": pp.RowID, "links": pp.links, "itemnumber": pp.itemnumber, "itemname": pp.itemname, "parsedPrice": pp.PricePer, "um": pp.MeasureUnit, "image": pp.image, "freeform": pp.freeform, "descr1": pp.itemdesc }, "quantity": pp.Quantity });
          }
          this.products = finalResult;
          this.numProducts = totalitem;

          this.cartTotal = total;
        }
        else {
          this.products = [];
          this.numProducts = 0;
          this.cartTotal = 0;
        }


      });
    }
    else {
      var usrid = null;
      if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
        usrid = Common.getWithExpiry("UserID") + Common.getWithExpiry("CustID");
      }
      else {
        usrid = Common.getWithExpiry("CustID");
      }
      this.cartService.getCartItemByUserID().subscribe((res: any) => {
        var getdata = res;
        if (getdata != undefined && getdata != null && getdata.length > 0) {
          for (let pp of getdata) {
            total = Number(total) + Number(pp.Price);
            totalitem=Number(totalitem)+Number(pp.Quantity);
            finalResult.push({ "product": { "RowID": pp.RowID, "links": pp.links, "itemnumber": pp.itemnumber, "itemname": pp.itemname, "parsedPrice": pp.PricePer, "um": pp.MeasureUnit, "image": pp.image, "freeform": pp.freeform, "descr1": pp.itemdesc }, "quantity": pp.Quantity });
          }
          this.products = finalResult;
          this.numProducts = totalitem;
          this.cartTotal = total;
        }
        else {
          this.products = [];
          this.numProducts = 0;
          this.cartTotal = 0;
        }

      });
    }
  }

  clikctorfq(){
    if(this.isNotLoggedIn==true){
      this.toastr.error("Please login to quote.");
      this.router.navigate(['/login']);
    }
  }

  logout() {
    var flag=1;
    if(Common.getWithExpiry("SalesUserID")==null){
      flag=1;
      }
      else{
        flag=2;
      }
    Common.removeWithExpiry("finalObj");
    Common.removeWithExpiry("warehouse");
    Common.removeWithExpiry("UserID");
    Common.removeWithExpiry("CustID");
    Common.removeWithExpiry("UserType");
    Common.removeWithExpiry("Permission");
    Common.removeWithExpiry("SalesUserID");
    Common.removeWithExpiry("SalesUserType");

    localStorage.clear();
    if(flag==1){
      this.router.navigate(['/login']);
      }
      else{
        this.router.navigate(['/sales-login']);
      }
    this.getContactDtl();
    this.isNotLoggedIn = true;
    this.getCartItems();
    //window.location.reload();

    this.ngOnInit();
    this.isactive = 'Login';

  }
  RemoveSpacesandSpeacialCharacters(str: string) {
    try {
      str = str.trim();
      var newString = str.replace(/[^A-Z0-9]+/ig, "-");
      return newString;
    }
    catch (ed) {

      return str;
    }
  }

  gotorfqpage() {
    if (this.router.url.toString().indexOf('rfqlist') != -1) {
      window.location.reload();
    }
    else {
      this.router.navigate(['/rfqlist']);
    }
  }
  getFilterByParentmenu(parent: any) {
    var getlist = [];
    for (var i = 0; i < this.headerlinks.length; i++) {
      if (parent == this.headerlinks[i].parent_seq) {
        getlist.push(this.headerlinks[i]);
      }
    }

    return getlist;
  }
  gotormapage() {
    if (this.router.url.toString().indexOf('rma') != -1) {
      window.location.reload();
    }
    else {
      this.router.navigate(['/rma']);
    }
  }

  
  getSearchplaceholder() {
    this.Searchplaceholder = this.dataService.Getconfigbykey("Searchplaceholder");
    if (this.Searchplaceholder == null || this.Searchplaceholder == undefined || this.Searchplaceholder == '') {
      this.Searchplaceholder = Common.getWithExpiry("Searchplaceholder");
    }
    if (this.Searchplaceholder == null || this.Searchplaceholder == undefined || this.Searchplaceholder == '') {
      this.dataService.ConfigforSearchplaceholder().subscribe((data: any) => {
        this.Searchplaceholder = data;
        Common.setWithExpiry("Searchplaceholder", this.Searchplaceholder);
      });
    }
  }
  GetConfigforwishlistlable() {
    this.wishlistlable = this.dataService.Getconfigbykey("wishlistlable");
    if (this.wishlistlable == null || this.wishlistlable == undefined || this.wishlistlable == '') {
      this.wishlistlable = Common.getWithExpiry("wishlistlable");
    }
    if (this.wishlistlable == null || this.wishlistlable == undefined || this.wishlistlable == '') {
      this.dataService.GetConfigforwishlistlable().subscribe((data: any) => {
        this.wishlistlable = data;
        Common.setWithExpiry("wishlistlable", this.wishlistlable);
      });
    }
  }

  getUrlWithDetails() {
    this.UrlWithDetails = this.dataService.Getconfigbykey("UrlWithDetails");
    if (this.UrlWithDetails == null || this.UrlWithDetails == undefined || this.UrlWithDetails == '') {
      this.UrlWithDetails = Common.getWithExpiry("UrlWithDetails");
    }
    if (this.UrlWithDetails == null || this.UrlWithDetails == undefined || this.UrlWithDetails == '') {
      this.dataService.GetUrlWithDetailssetting().subscribe((data: any) => {
        this.UrlWithDetails = data;
        if (this.UrlWithDetails == '1') {
          this.getUrlWithFreeForm();
        }
        Common.setWithExpiry("UrlWithDetails", this.UrlWithDetails);
      })
    }
    else {
      if (this.UrlWithDetails == '1') {
        this.getUrlWithFreeForm();
      }
    }
  }
  getUrlWithFreeForm() {
    this.UrlWithFreeForm = this.dataService.Getconfigbykey("UrlWithFreeForm");
    if (this.UrlWithFreeForm == null || this.UrlWithFreeForm == undefined || this.UrlWithFreeForm == '') {
      this.UrlWithFreeForm = Common.getWithExpiry("UrlWithFreeForm");
    }
    if (this.UrlWithFreeForm == null || this.UrlWithFreeForm == undefined || this.UrlWithFreeForm == '') {
      this.dataService.GetUrlWithFreeFormsetting().subscribe((data: any) => {
        this.UrlWithFreeForm = data;
        Common.setWithExpiry("UrlWithFreeForm", this.UrlWithFreeForm);
      })
    }
  }

  Getlogoimageurl() {
    this.logoimageurl = this.dataService.Getconfigbykey("logoimageurl");
    if (this.logoimageurl == null || this.logoimageurl == undefined || this.logoimageurl == '') {
      this.logoimageurl = Common.getWithExpiry("logoimageurl");
    }
    if (this.logoimageurl == null || this.logoimageurl == undefined || this.logoimageurl == '') {
      this.dataService.ConfigurationForLogoImageurl().subscribe((data: any) => {
        this.logoimageurl = data;
        Common.setWithExpiry("logoimageurl", this.logoimageurl);
      })
    }
  }

  searchProduct() {
    var selecctedsatags: never[] = [];
    Common.setWithExpiry("selecctedsatags", JSON.stringify(selecctedsatags));
    Common.setWithExpiry('selectedmaj_class', '');
    Common.setWithExpiry('selectedprod_line', '');
    Common.setWithExpiry('selectedtreenode', '');
    Common.setWithExpiry('selectedsearch', this.txtSearch);
    // var model = {
    //   "LogType": "Search",
    //   "Description": "",
    //   "SearchKeyword": this.txtSearch,
    //   "CustID":Common.getWithExpiry("CustID"),
    //   "UserId": Common.getWithExpiry("UserID"),
    //   "ClientIP": this.ipAddress
    // }

    // this.dataService.AddActivityLog(model).subscribe((res: any) => {
    // });
    this.router.navigate(['search', this.asyncSelected]);
    
    if(this.clearsearch=='1'){      
      this.asyncSelected='';
        this.txtSearch = '';
    }
    this.selecteditem=undefined;

  }

  SetActiveTab(tabname: any) {
    this.isactive = tabname;
  }

  catClick() {
    this.isactive = 'Categories';
    this.router.navigate(['categories']);
  }


  prodClick() {
    this.isactive = 'Products';
    this.router.navigate(['brands']);
  }


  conClick() {
    this.isactive = 'Contact';
    this.router.navigate(['contact']);
  }


  accClick() {
    this.isactive = 'Account';
    this.router.navigate(['dashboard']);
  }

  slogClick() {
    this.isactive = 'SLogin';
    this.router.navigate(['sales-login']);
  }

  logClick() {
    this.isactive = 'Login';
    //this.router.navigate(['login']);
    this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url } });      
  }

  keyDown(event: any) {
    //this.txtSearch=event;
    try{
    if (this.txtSearch != null && this.txtSearch != "undefined" && this.txtSearch != "") {
      this.getAutoCompleteProduct();
      try{
      const element = this.renderer.selectRootElement("#autoul");
      element.focus();
      }catch(ed){}
    }
    else {
      this.autoCompleteData = [];
      //this.showAutoComplete = false;
    }
  }catch(ed){}
  }
  onFocused(event: any){

  }




  getAutoCompleteProduct() {
    var Guestwarehouse = Common.getWithExpiry("Guestwarehouse");
    var wh = (Common.getWithExpiry("warehouse") == undefined ? Guestwarehouse : Common.getWithExpiry("warehouse"));
    
    this.dataService.GetProductListBySearchforheader(this.txtSearch, 1, 10, wh, 0, Common.getWithExpiry("CustID")).subscribe((res: any) => {
      
      this.autoCompleteData = res;
      //this.showAutoComplete = true;

      for (var i = 0; i < this.autoCompleteData.length; i++) {
        var dd = JSON.parse(this.autoCompleteData[i].description1);
        this.autoCompleteData[i].desc = dd[0];
        this.autoCompleteData[i].id=i;
        this.autoCompleteData[i].name = this.autoCompleteData[i].itemname+'-'+this.autoCompleteData[i].links +'-'+this.autoCompleteData[i].description1 +'-'+this.autoCompleteData[i].manufacturer +'-'+this.autoCompleteData[i].freeform;
      }

  
    });
  }
  getumdescrconfig() {
    this.umdescrlist = [];
    this.isumdescr = this.dataService.Getconfigbykey("SettingForUMDescription");
    if (this.isumdescr == null || this.isumdescr == undefined || this.isumdescr == '') {
      this.isumdescr = Common.getWithExpiry("isumdescr");
    }
    if (this.isumdescr == null || this.isumdescr == undefined || this.isumdescr == '') {
      this.dataService.SettingForUMDescription().subscribe((res: any) => {
        this.isumdescr = res;
        Common.setWithExpiry("isumdescr", this.isumdescr);
        if (this.isumdescr == '1') {
          try {
            if (Common.getWithExpiry("umdescrlist") != undefined) {
              var umdescrlist = JSON.parse(Common.getWithExpiry("umdescrlist"));
            }
          } catch (ed) { }
          if (umdescrlist == null || umdescrlist == undefined || umdescrlist.length == 0) {
            this.dataService.getunitdescription().subscribe((res: any) => {
              this.umdescrlist = res;
              Common.setWithExpiry("umdescrlist", JSON.stringify(this.umdescrlist));
            });
          }
          else {
            this.umdescrlist = umdescrlist;
          }
        }

      });
    }
    else {
      if (this.isumdescr == '1') {
        try {
          if (Common.getWithExpiry("umdescrlist") != undefined) {
            var umdescrlist = JSON.parse(Common.getWithExpiry("umdescrlist"));
          }
        } catch (ed) { }
        if (umdescrlist == null || umdescrlist == undefined || umdescrlist.length == 0) {
          this.dataService.getunitdescription().subscribe((res: any) => {
            this.umdescrlist = res;
            Common.setWithExpiry("umdescrlist", JSON.stringify(this.umdescrlist));
          });
        }
        else {
          this.umdescrlist = umdescrlist;
        }
      }
    }
    
  }
  getumdescbyumcode(umcode: string) {
    if (this.isumdescr == '1') {
      for (var i = 0; i < this.umdescrlist.length; i++) {
        if (this.umdescrlist[i].code.toLowerCase() == umcode.toLowerCase()) {
          return this.umdescrlist[i].descr;
        }
      }
    }
    else {
      return umcode;
    }
  }
  clearsearchtext(item:any){    
    this.txtSearch=item.itemname;
    this.keyword=item.itemname;
    this.asyncSelected=item.itemname;
    this.selecteditem=undefined;
    this.router.navigate(['productdetail', item.itemname,item.links]);
  }
  selectProduct(event:any) {    
    try{
    if(this.txtSearch!=undefined && this.txtSearch.itemname!=undefined && this.txtSearch.links!=undefined){                  
    this.router.navigate(['productdetail', this.txtSearch.itemname,this.txtSearch.links]);
    this.txtSearch=undefined;
    }
    else{
      this.searchProduct();      
    }
  }catch(ex){}
  }
  selectProductNew(event:any) {    
    try{
    if(this.selecteditem!=undefined && this.selecteditem!=undefined && this.selecteditem.links!=undefined){            
    //this.router.navigate(['productdetail', this.selecteditem.itemname,this.selecteditem.links]);
    //this.asyncSelected=this.selecteditem.itemname;
    this.selecteditem=undefined;
    }
    else{
      this.searchProduct();      
    }
  }catch(ex){}
  }



 Addnewproduct(item1:any,indexs:any,lastin:any){
  item1.quantity=item1.Quantity;
  item1.MeasureUnit=item1.um;
    var usrid = null;
    if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
      usrid = Common.getWithExpiry("UserID") + Common.getWithExpiry("CustID");
    }
    else {
      usrid = Common.getWithExpiry("CustID");
    }
    var getitem12 = {
      items: item1.itemname,
      warehouse: Common.getWithExpiry("warehouse"),
      company_sy: Common.getWithExpiry("company_sy")
    }
    //item1.list_price = 1;
    // this.dataService.getProductavailibity(getitem12).subscribe((res: any) => {
    //   var availdata = res;
      var bulkPrice = [];

      bulkPrice.push({
        "customer": Common.getWithExpiry("CustID"),
        "item": item1.itemname,
        "quantity": item1.quantity,
        "warehouse": Common.getWithExpiry("warehouse"),
        "rounding": this.PriceRound,
        "qty_unit": item1.MeasureUnit,
        "company_sy": Common.getWithExpiry("company_sy")
      })
      this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
        var pricedata = res;

        if(this.iskyraden && pricedata[0].origin != 'CI' && pricedata[0].origin != 'SP'){
          item1.list_price = item1.list_price;
        }
        else if (pricedata != undefined && pricedata.length > 0) {
          item1.list_price = parseFloat(pricedata[0].extension) / parseFloat(pricedata[0].quantity);
        }
        

        //item1.totqty = parseFloat(item1.Quantity) * parseFloat(item1.um_displayQty.toString());
        //item1.TotQty = item1.TotQty + parseFloat(item1.Quantity) * parseFloat(item1.um_displayQty.toString());
      
        
        this.cartService.addProductToCart( item1, item1.MeasureUnit).subscribe((res: any) => {
        if(indexs==(lastin-1)){
          this.getCartItems();
        }
          //this.cartService.cartBroadCaster(res);
        })
      })
    //});
    
 }
 ClearCart() {
  
  for (let prs of this.products) {
    this.cartService.deleteCartItemForSession(prs.itemnumber, prs.MeasureUnit).subscribe((res: any) => {
  //    this.getCartItems();
    //  this.cartService.cartBroadCaster(res);
    });
  }
} 

  // @HostListener('document:click', ['$event']) onDocumentClick(event) {
  //   this.showAutoComplete = false;
  // }
}
