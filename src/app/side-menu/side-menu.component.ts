import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Common } from '../model/common.model';
import { DataService } from '../services/data.service';
import { MenuService } from '../services/menu.service';
//import * as $ from 'jquery';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {
  selecctedsatags: any = [];
  menuList: any;
  parentMenu: any = [];
  childMenu: any = [];
  brandList: any = [];
  selectedvalue: any;
  flag: any;
  setopenview: any = '0';
  isShowCategory: boolean = true;
  webtype: string | undefined;
  Menucolor: string | undefined;
  isaccesswithlogin: any = '0';
  isLoggedIn: any;
  warehouse: any;
  categorylabel: any;
  productlabel: any;
  safilterslist: any;
  safilterslistparent: any;
  showsafilter: any='0';
  SaFilterLable: any;
  showsafilter1: any = '1';
  businesstype:any;
  minValue: number = 50;
  maxValue: number = 200;
  // options: Options = {
  //   floor: 0,
  //   ceil: 500,
  //   showTicks: true,
  //   draggableRange: true
  // };
  treeNodeValue:any;
  setopenviewcategory: any = '1';
   //@HostListener('window:resize', ['$event'])
  innerWidth:any;
  Allconfigurationlist:any=[];
  saonproductlistonly:any;
  private _routerSub = Subscription.EMPTY;
  iskyraden:any;
  constructor(private renderer: Renderer2,private dataService: DataService,  private menuService: MenuService, private router: Router) {
    try{
      this.innerWidth = window.innerWidth;
      }catch(ed){}
    this.iskyraden=environment.iskyraden;
      this.GetSidePageConfigurations();
    //this.GetSideMenuDefault();
    //this.GetSidesaMenuDefault();
    //this.GetconfigforShowSAFilters();
    
    //this.websitetype();
    //this.getbusinesstype();
    this._routerSub = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd))
      .subscribe((value: any) => {
        this.getData();
        this.ngOnInit();
        if ((Common.getWithExpiry("CustID") != "" && Common.getWithExpiry("CustID") != null) || (Common.getWithExpiry("SalesUserID") != "" && Common.getWithExpiry("SalesUserID"))) {
          this.warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
          this.isLoggedIn = true;
          this.gettreenode();
          //this.GetBrands();
        }
        else {
          //this.Accessannomyous();
          this.isLoggedIn = false;
          this.getGuestwarehouse();
        }
      });
      
  }

  GetSidePageConfigurations() {
   
    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      try{
      this.Allconfigurationlist =JSON.parse(Common.getWithExpiry("Allconfigs"));
      }catch(ed){}
    }
    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      this.dataService.GetAllConfiguration().subscribe((data: any) => {
        this.Allconfigurationlist = data;
        Common.setWithExpiry("Allconfigs",JSON.stringify(this.Allconfigurationlist));
        for(var i=0;i<this.Allconfigurationlist.length;i++){
          if(this.Allconfigurationlist[i].ConfigKey=="withoutloginBrowse"){
            this.isaccesswithlogin =this.Allconfigurationlist[i].ConfigValue;            
            if (this.isaccesswithlogin == '1') {
              this.getGuestwarehouse();
            }
          }
          if(this.Allconfigurationlist[i].ConfigKey=="websitetype"){
            this.webtype =this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="SideMenuDefault"){
            this.setopenviewcategory =this.Allconfigurationlist[i].ConfigValue;            
            this.getslidelaststate();
          }
          if(this.Allconfigurationlist[i].ConfigKey=="setdefaultsafiltersclose"){            
            this.setopenview =this.Allconfigurationlist[i].ConfigValue;            
            //Common.setWithExpiry("setopenview",this.setopenview);
            this.getsaopenvalues();
          }
          if(this.Allconfigurationlist[i].ConfigKey=="ShowSAFilters"){
            this.showsafilter =this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="SaFilterLable"){
            this.SaFilterLable =this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="TreeNode"){
            this.treeNodeValue =this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="businesstype"){
            this.businesstype =this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="categorylabel"){
            this.categorylabel =this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="productlabel"){
            this.productlabel =this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="saonproductlistonly"){
            this.saonproductlistonly =this.Allconfigurationlist[i].ConfigValue;            
          }          
        }
      })
    }
    else{
      for(var i=0;i<this.Allconfigurationlist.length;i++){
        if(this.Allconfigurationlist[i].ConfigKey=="withoutloginBrowse"){
          this.isaccesswithlogin =this.Allconfigurationlist[i].ConfigValue;            
          if (this.isaccesswithlogin == '1') {
            this.getGuestwarehouse();
          }
        }
        if(this.Allconfigurationlist[i].ConfigKey=="websitetype"){
          this.webtype =this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="SideMenuDefault"){
          this.setopenviewcategory =this.Allconfigurationlist[i].ConfigValue;            
          this.getslidelaststate();
        }
        if(this.Allconfigurationlist[i].ConfigKey=="setdefaultsafiltersclose"){          
          this.setopenview =this.Allconfigurationlist[i].ConfigValue;          
          //Common.setWithExpiry("setopenview",this.setopenview);    
          this.getsaopenvalues();
        }
        if(this.Allconfigurationlist[i].ConfigKey=="ShowSAFilters"){
          this.showsafilter =this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="SaFilterLable"){
          this.SaFilterLable =this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="TreeNode"){
          this.treeNodeValue =this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="businesstype"){
          this.businesstype =this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="categorylabel"){
          this.categorylabel =this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="productlabel"){
          this.productlabel =this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="saonproductlistonly"){
          this.saonproductlistonly =this.Allconfigurationlist[i].ConfigValue;            
        }
      }
    }
  }
  settreenodeforsa(menu: { setflag: boolean; treeNode: string; }) {
menu.setflag=true;
    Common.setWithExpiry('selectedmaj_class', '');
    Common.setWithExpiry('selectedprod_line', '');
    Common.setWithExpiry('selecctedsatags', '');
    Common.setWithExpiry('selectedsearch', '');
    Common.setWithExpiry('selectedtreenode',menu.treeNode);
  //   try{
  //   if(this.innerWidth<=426){
  //     //this.Sliding();
  //     this.setopenviewcategory=0;
  //   }
  // }catch(ed){}
  
  }
  setmenuoff(menu: { tree_node: { toString: () => string; }; setflag: boolean; setflag1: any; }){
    try{
      //this.GetforChilds(menu);
      //$("#menu1" + menu.tree_node.toString()).slideToggle("slow");
      menu.setflag=true;
      // if(menu.setflag1!=undefined && menu.setflag1){
      //   menu.setflag1=false;
      // }else{
      // menu.setflag1=true;
      // }

    if(this.innerWidth<=426){
      this.Sliding();
    }
  }catch(ed){}
  console.log('menu.setflag1',menu.setflag1);
  }
  

  getData() {
    
    if ((this.router.url.indexOf("/productlist/") > -1 || this.router.url.indexOf("/product") > -1
      || this.router.url.indexOf("/search") > -1
      || this.router.url.indexOf("/category") > -1 || this.router.url.indexOf("/categories") > -1)
      && this.router.url.indexOf("/productdetail") == -1) {
      this.showsafilter1 = '1';
      if (Common.getWithExpiry("selecctedsatags") != undefined) {
        try {
          this.selecctedsatags = JSON.parse(Common.getWithExpiry("selecctedsatags"));
        } catch (ex) { }
      }
      // if(this.selecctedsatags!=null && this.selecctedsatags!=undefined && this.selecctedsatags.length>0){            
        
      this.getsalablesfilters();
      //}
    }
    else {
      this.showsafilter1 = '0';
    }
    if (this.router.url.indexOf("/productlist/") == -1 && this.router.url.indexOf("/productdetail/") == -1) {
      this.removeallsafilters();
    }
  }
  getListTypeView() {
    this.setopenview = Common.getWithExpiry("setopenview");
    if (this.setopenview == null || this.setopenview == undefined) {
      this.setopenview = '0';
    }
    else{
      this.setopenview = '1';
    }
  }
  removeallsafilters() {
    this.selecctedsatags = [];
    Common.setWithExpiry("selecctedsatags", JSON.stringify(this.selecctedsatags));
  }

  removeallsatags(){
    this.selecctedsatags=[];
    Common.setWithExpiry("selecctedsatags", JSON.stringify(this.selecctedsatags));
    if (this.selecctedsatags.length > 0) {
      this.router.navigate(['/productlist', JSON.stringify(this.selecctedsatags)]);
    }
    else {
      if (this.isShowCategory) {
        var treenode = Common.getWithExpiry('selectedtreenode');
        if (treenode != undefined && treenode != null && treenode != '') {
          this.checkChildMenu(treenode);
        }
        else {
          this.router.navigate(['/categories']);
        }
      }
      else {
        var maj_class = Common.getWithExpiry('selectedmaj_class');
        var prod_line = Common.getWithExpiry('selectedprod_line');
        if (maj_class != undefined && maj_class != null && maj_class != '') {
          this.onBrandSelectLanding(maj_class);
        }
        else if (prod_line != undefined && prod_line != null && prod_line != '') {
          this.onBrandSelect(prod_line);
        }
        else {
          this.router.navigate(['/product']);
        }
      }
    }
    this.getsalablesfilters();
  }

  addremovesatags(code: any) {
  // try{
  //    if(this.innerWidth<=426){
  //     this.getsetopenview(this.setopenview);
  //   }
  // }catch(ed){}
    // var code = sa_fil.code+';'+sa_fil.sa_code;     
    if (this.selecctedsatags.indexOf(code) > -1) {
      var index = this.selecctedsatags.indexOf(code);
      this.selecctedsatags.splice(index, 1);
      this.getsalablesfilters();
    }
    else {
      this.selecctedsatags.push(code);
      this.getsalablesfilters();
    }
   
    Common.setWithExpiry("selecctedsatags", JSON.stringify(this.selecctedsatags));
    if (this.selecctedsatags.length > 0) {
      this.router.navigate(['/productlist', JSON.stringify(this.selecctedsatags)]);
    }
    else {
      if (this.isShowCategory) {
        var treenode = Common.getWithExpiry('selectedtreenode');
        if (treenode != undefined && treenode != null && treenode != '') {
          this.checkChildMenu(treenode);
        }
        else {
          this.router.navigate(['/categories']);
        }
      }
      else {
        var maj_class = Common.getWithExpiry('selectedmaj_class');
        var prod_line = Common.getWithExpiry('selectedprod_line');
        if (maj_class != undefined && maj_class != null && maj_class != '') {
          this.onBrandSelectLanding(maj_class);
        }
        else if (prod_line != undefined && prod_line != null && prod_line != '') {
          this.onBrandSelect(prod_line);
        }
        else {
          this.router.navigate(['/product']);
        }
      }
    }
    
  }
  // getsetopenviewcategory(listvi) {
  //   listvi = (listvi == '1' ? '0' : '1');
  //   this.setopenviewcategory = listvi;
  //   Common.setWithExpiry("setopenviewcategory", listvi);
  //   //$("#Filters").slideToggle("slow");
  // }


  getsaopenvalues(){
    var getck = Common.getWithExpiry("setopenview");
    if(getck!=undefined && getck!=null && getck!=''){
      this.setopenview =  getck;
    }
  }

  getsetopenview(listvi: string) {
    
    listvi = (listvi == '1' ? '0' : '1');
    this.setopenview = listvi;
    Common.setWithExpiry("setopenview", listvi);
    //$("#Filters").slideToggle("slow");
  }
  Accessannomyous() {
    this.isaccesswithlogin = this.dataService.Getconfigbykey("withoutloginBrowse");
    if (this.isaccesswithlogin == null || this.isaccesswithlogin == undefined || this.isaccesswithlogin == '') {
      this.isaccesswithlogin = Common.getWithExpiry("isaccesswithlogin");
    }
    if (this.isaccesswithlogin == null || this.isaccesswithlogin == undefined || this.isaccesswithlogin == '') {
      this.dataService.GetConfidForanonymoususersbrowsethesite().subscribe((res: any) => {
        this.isaccesswithlogin = res;
        Common.setWithExpiry("isaccesswithlogin", this.isaccesswithlogin);
        if (this.isaccesswithlogin == '1') {
          this.getGuestwarehouse();
        }
      });
    }
    else {
      if (this.isaccesswithlogin == '1') {
        this.getGuestwarehouse();
      }
    }
  }


  getGuestwarehouse() {
    this.warehouse = this.dataService.Getconfigbykey("Guestwarehouse");
    if (this.warehouse == null || this.warehouse == undefined || this.warehouse == '') {
      this.warehouse = Common.getWithExpiry("Guestwarehouse");
    }
    if (this.warehouse == null || this.warehouse == undefined || this.warehouse == '') {
      this.dataService.GetConfidForGuestwarehouse().subscribe((res: any) => {
        this.warehouse = res;
        Common.setWithExpiry("Guestwarehouse", this.warehouse);
        this.gettreenode();
      });
    }
    else {
      this.gettreenode();
    }

  }

  websitetype() {
    this.webtype = this.dataService.Getconfigbykey("websitetype");
    if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
      this.webtype = Common.getWithExpiry("websitetype");
    }
    if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
      this.dataService.GetWebsiteType().subscribe((data: any) => {
        this.webtype = data;
        Common.setWithExpiry("websitetype",(this.webtype==undefined ?'': this.webtype.toString()));
      })
    }
  }

  GetSideMenuDefault() {
    this.setopenviewcategory = this.dataService.Getconfigbykey("SideMenuDefault");
    if (this.setopenviewcategory == null || this.setopenviewcategory == undefined || this.setopenviewcategory == '') {
      this.setopenviewcategory = Common.getWithExpiry("setopenviewcategory");
    }
    if (this.setopenviewcategory == null || this.setopenviewcategory == undefined || this.setopenviewcategory == '') {
      this.dataService.ConfigforSideMenuDefault().subscribe((data: any) => {
        this.setopenviewcategory = data;
        Common.setWithExpiry("setopenviewcategory", this.setopenviewcategory);
      })
    }
  }
  GetSidesaMenuDefault() {
    this.setopenview = this.dataService.Getconfigbykey("setdefaultsafiltersclose");
    if (this.setopenview == null || this.setopenview == undefined || this.setopenview == '') {
      this.setopenview = Common.getWithExpiry("setopenview");
    }
    if (this.setopenview == null || this.setopenview == undefined || this.setopenview == '') {
      this.dataService.Getsetdefaultsafiltersclose().subscribe((data: any) => {
        this.setopenview = data;
        Common.setWithExpiry("setopenview", this.setopenview);
      })
    }
  }
  GetconfigforShowSAFilters() {
    this.showsafilter = this.dataService.Getconfigbykey("ShowSAFilters");
    if (this.showsafilter == null || this.showsafilter == undefined || this.showsafilter == '') {
      this.showsafilter = Common.getWithExpiry("showsafilter");
    }
    if (this.showsafilter == null || this.showsafilter == undefined || this.showsafilter == '') {
      this.dataService.GetconfigforShowSAFilters().subscribe((data: any) => {
        this.showsafilter = data;
        if (this.showsafilter == '1') {
          this.GetConfigurationforSaFilterLable();
        }
        Common.setWithExpiry("showsafilter", this.showsafilter);
      })
    }
    else {
      if (this.showsafilter == '1') {
        this.GetConfigurationforSaFilterLable();
      }
    }
  }
  GetConfigurationforSaFilterLable() {
    this.SaFilterLable = this.dataService.Getconfigbykey("SaFilterLable");
    if (this.SaFilterLable == null || this.SaFilterLable == undefined || this.SaFilterLable == '') {
      this.SaFilterLable = Common.getWithExpiry("SaFilterLable");
    }
    if (this.SaFilterLable == null || this.SaFilterLable == undefined || this.SaFilterLable == '') {
      this.dataService.GetConfigurationforSaFilterLable().subscribe((data: any) => {
        this.SaFilterLable = data;
        Common.setWithExpiry("SaFilterLable", this.SaFilterLable);
      })
    }
  }

  gettreenode() {
    // var treeNodeValue = this.dataService.Getconfigbykey("TreeNode");
    // if (treeNodeValue == null || treeNodeValue == undefined || treeNodeValue == '') {
    //   treeNodeValue = Common.getWithExpiry("TreeNode");
    // }
    // if (treeNodeValue == null || treeNodeValue == undefined || treeNodeValue == '') {
    //   this.dataService.GetTreeNodeValue().subscribe((data1: any) => {
    //     treeNodeValue = data1;
    //     Common.setWithExpiry("TreeNode", treeNodeValue);
    //     if (treeNodeValue != "1") {
    //       this.getproductlabel();
    //       this.isShowCategory = false;
    //       this.GetBrands();
    //       return;
    //     }
    //     else {
    //       this.getcategorylabel();
    //       this.isShowCategory = true;
    //       this.getCategories();
    //       return;
    //     }
    //   })
    // }
    // else {
      if (this.treeNodeValue != "1") {
        //this.getproductlabel();
        this.isShowCategory = false;
        this.GetBrands();
        return;
      }
      else {
        //this.getcategorylabel();
        this.isShowCategory = true;
        this.getCategories();
        return;
      }
    //}
  }
  getbusinesstype() {
    var getbtype = this.dataService.Getconfigbykey("businesstype");
    if (getbtype == null || getbtype == undefined || getbtype == '') {
      getbtype = Common.getWithExpiry("businesstype");
    }
    if (getbtype == null || getbtype == undefined || getbtype == '') {
      this.dataService.Getbusinesstype().subscribe((data1: any) => {
        var getdata1 = data1;
        Common.setWithExpiry("businesstype", getdata1);
      })
    }
  }
  getcategorylabel() {
    this.categorylabel = this.dataService.Getconfigbykey("categorylabel");
    if (this.categorylabel == null || this.categorylabel == undefined || this.categorylabel == '') {
      this.categorylabel = Common.getWithExpiry("categorylabel");
    }
    if (this.categorylabel == null || this.categorylabel == undefined || this.categorylabel == '') {
      this.dataService.GetConfigForsidecategorylabel().subscribe((data1: any) => {
        this.categorylabel = data1;
        Common.setWithExpiry("categorylabel", this.categorylabel);
      })
    }
  }
  getproductlabel() {
    this.productlabel = this.dataService.Getconfigbykey("productlabel");
    if (this.productlabel == null || this.productlabel == undefined || this.productlabel == '') {
      this.productlabel = Common.getWithExpiry("productlabel");
    }
    if (this.productlabel == null || this.productlabel == undefined || this.productlabel == '') {
      this.dataService.GetConfigForsideproductlabel().subscribe((data1: any) => {
        this.productlabel = data1;
        Common.setWithExpiry("productlabel", this.productlabel);
      })
    }
  }



  GetforChilds(gettreenode: any) {
var getcustomer=Common.getWithExpiry("CustID");
    if (gettreenode.parent > 0) {
      if (gettreenode.setflag == false) {
        gettreenode.setflag = true;
        if (Common.getWithExpiry("getMenuNew" + gettreenode.tree_node + this.warehouse+getcustomer) != undefined) {
          try {
            var menuList = JSON.parse(Common.getWithExpiry("getMenuNew" + gettreenode.tree_node + this.warehouse+getcustomer));
          } catch (ed) { }
        }
        if (menuList != undefined && menuList != null && menuList.length > 0) {
          this.setmenuoff(gettreenode);
          this.menuList = menuList;
          for (let menu of menuList) {
            //$("#menu" + menu.tree_node.toString()).slideToggle("slow");
            menu.setflag = false;
            
            this.childMenu.push(menu);
          }
        }
        else {
          this.menuService.getMenuNew(this.warehouse, gettreenode.tree_node,getcustomer).subscribe((res: any) => {
            this.menuList = res;
            if (this.menuList != undefined && this.menuList != null && this.menuList.length > 0) {
              this.setmenuoff(gettreenode);
            for (let menu of this.menuList) {
              //$("#menu" + menu.tree_node.toString()).slideToggle("slow");
              menu.setflag = false;
              this.childMenu.push(menu);
            }
            Common.setWithExpiry("getMenuNew" + gettreenode.tree_node + this.warehouse+getcustomer, JSON.stringify(this.menuList));
          }
          });
        }

      }
    }
  }
  GetforChildsbrands(gettreenode: { setflag: boolean; maj_class: any; }) {
    if (gettreenode.setflag == false) {
      gettreenode.setflag = true;
      for (let menu of this.childMenu) {
        if (menu.maj_class == gettreenode.maj_class) {
          menu.setflag = false;
          //this.childMenu.push(menu);
        }
      }
    }
  }
  togglemenubar(l: { toString: () => string; }) {

    //$("#Filt" + l.toString()).slideToggle("slow");

    // $('.single-categories > label').click(function(){
    //   if($(this).parent('.single-categories').hasClass('show')){
    //     $(this).next().slideUp(500);        
    //   }else{
    //     $('.dropdown-list').slideUp(500);
    //     $(this).next().slideDown(500);        
    //   }
    // })
  }

  getsalablesfilters() {
    if((this.saonproductlistonly=='1' && (this.router.url.indexOf("/productlist/") > -1 || this.router.url.indexOf("/category/") > -1 || this.router.url.indexOf("/products/") > -1)) || this.saonproductlistonly=='0'){
    if (this.showsafilter == '1' && this.showsafilter1 == '1') {
      var maj_class = Common.getWithExpiry('selectedmaj_class');
      var prod_line = Common.getWithExpiry('selectedprod_line');
      var treenode = Common.getWithExpiry('selectedtreenode');
      var words = Common.getWithExpiry('selectedsearch');
      var getsatags = JSON.stringify(this.selecctedsatags);
      if (getsatags != undefined && getsatags != null && getsatags != '') {
        getsatags = getsatags.replace('[', '').replace(']', '').replace(/"/ig, '').replace('"', '').replace('"', '');
        getsatags = getsatags.replace(/\\/ig, '"').replace(/\\/ig, '"').replace(/\\/ig, '"').replace(/\\/ig, '"').replace(/\\/ig, '"').replace(/\\/ig, '"');
      }
      this.safilterslistparent = [];
      this.safilterslist = [];
      if (Common.getWithExpiry('safilterslistparent' + maj_class + prod_line + treenode + getsatags + words) != undefined) {
        try {
          this.safilterslistparent = JSON.parse(Common.getWithExpiry('safilterslistparent' + maj_class + prod_line + treenode + getsatags + words));
        } catch (ed) { }
      }
      if (this.safilterslistparent == null || this.safilterslistparent == undefined || this.safilterslistparent.length == 0) {
        //this.sendMessage('start');
        this.menuService.getsafilters(maj_class, prod_line, treenode, JSON.stringify(this.selecctedsatags), words, this.warehouse, Common.getWithExpiry('CustID'), Common.getWithExpiry("company_sy")).subscribe((res: any) => {
          this.safilterslist = res;
          if(this.safilterslistparent==undefined){
            this.safilterslistparent=[];
          }
          //this.sendMessage('stop');
          for (let menu of this.safilterslist) {
            try {
              menu.code = menu.code + ';' + menu.sa_code;
              if (!this.safilterslistparent.some((x: { sa_lables: any; }) => x.sa_lables == menu.sa_lables)) {                
                let copy = Object.assign({}, menu);
                var getfil = this.safilterslist.filter((item: { sa_lables: any; }) => {
                    return item.sa_lables == menu.sa_lables;
               });  
               copy.mitemlist = getfil;
                this.safilterslistparent.push(copy);
                
              }
            } catch (ex) { 
            }
          }
          //Common.setWithExpiry('safilterslist' + maj_class + prod_line + treenode + getsatags, JSON.stringify(this.safilterslist));
          Common.setWithExpiry('safilterslistparent' + maj_class + prod_line + treenode + getsatags, JSON.stringify(this.safilterslistparent));
        })
      }
      else {
        //this.safilterslist = safilterslist;
        this.safilterslistparent = JSON.parse(Common.getWithExpiry('safilterslistparent' + maj_class + prod_line + treenode + getsatags + words));
        // for (let menu of this.safilterslist) {
        //   if (this.safilterslistparent!=undefined ||  this.safilterslistparent.length>0 || !this.safilterslistparent.some(x => x.sa_lables == menu.sa_lables)) {
        //     this.safilterslistparent.push(menu);
        //   }
        // }
      }
    }
  }
  }
  

  getCategories() {
    var getcustomer=Common.getWithExpiry("CustID");
    this.flag = true;
    this.selectedvalue = Common.getWithExpiry('treenode');
    if (Common.getWithExpiry('menuList'+getcustomer) != undefined) {
      try {
        var menuList = JSON.parse(Common.getWithExpiry('menuList'+getcustomer));
      } catch (ed) { }
    }
    if (menuList == null || menuList == undefined || menuList.length == 0) {
      
      this.menuService.getMenuNew(this.warehouse, '',getcustomer).subscribe((res: any) => {
        this.menuList = res;
        if (this.menuList != null && this.menuList != undefined && this.menuList.length > 0) {
        Common.setWithExpiry('menuList'+getcustomer, JSON.stringify(this.menuList));
        this.parentMenu=[];
        this.childMenu=[];
        for (let menu of this.menuList) {
          //$("#menu" + menu.tree_node.toString()).slideToggle("slow");
          menu.setflag = false;
          if (menu.parent_node == '') {
            this.parentMenu.push(menu);
          }
          else {
            this.childMenu.push(menu);
          }
        }
      }
      });
    }
    else {
      this.menuList = menuList;
      this.parentMenu=[];
        this.childMenu=[];
      for (let menu of this.menuList) {
        //$("#menu" + menu.tree_node.toString()).slideToggle("slow");
        menu.setflag = false;
        if (menu.parent_node == '') {
          this.parentMenu.push(menu);
        }
        else {
          this.childMenu.push(menu);
        }
      }
    }
  }
  checkmenuforchild(menu: { parent: number; }) {
    var ishavechild = false;
    if (menu.parent > 0) {
      ishavechild = true;
    }
    return ishavechild;
  }
  checkmenuforchildbrand(menu: any) {
    var ishavechild = false;
    for (let menu1 of this.childMenu) {
      if (menu1.maj_class == menu) {
        ishavechild = true;
      }
    }
    return ishavechild;
  }
  // sendMessage(message): void {
  //   this.loadingService.LoadingMessage(message);
  // }
  GetBrands() {
    this.flag = true;
    this.selectedvalue = Common.getWithExpiry('brdnode');
    var CustID = Common.getWithExpiry("CustID");
    if (Common.getWithExpiry('brandList'+CustID) != undefined) {
      try {
        var brandList = JSON.parse(Common.getWithExpiry('brandList')+CustID);
      } catch (ed) { }
    }
    if (brandList == null || brandList == undefined || brandList.length == 0) {
      this.dataService.GetBrandList(this.warehouse, CustID).subscribe((res: any) => {
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

  ngOnInit() {
      try{
    if(this.innerWidth<=426){
      this.setopenviewcategory=0;
      this.setopenview=0;
    }
  }catch(ed){}
  }
  ngOnDestroy() {
    this._routerSub.unsubscribe();
  }

  // fireEvent(id) {
  //   let elem: HTMLElement = document.getElementById(id) as HTMLElement;
  //   this.selectedvalue = id;
  //   Common.setWithExpiry(this.cookname+'treenode', id);
  //   this.flag = false;
  //   elem.click();
  // }
  SetClickEvents(id: string) {
    this.selectedvalue = id;
    Common.setWithExpiry('brdnode', id);
  }


  fireEvent(id:any, majclass:any) {
    if (this.isShowCategory) {
      let elem: HTMLElement = document.getElementById(id) as HTMLElement;
      this.selectedvalue = id;
      Common.setWithExpiry('treenode', id);
      this.flag = false;
      elem.click();
    }
    else {
      if (majclass != '') {
        let elem: HTMLElement = document.getElementById(id) as HTMLElement;
        this.flag = false;
        elem.click();
      }
      else {
        let elem: HTMLElement = document.getElementById(id) as HTMLElement;
        this.flag = false;
        elem.click();
      }
    }
  }

  onBrandSelect(prodLine:any) {
    //setTimeout(() => {
    //}, 1000);

    try {
      Common.setWithExpiry('selectedmaj_class', '');
      Common.setWithExpiry('selectedsearch', '');
      Common.setWithExpiry('selecctedsatags', '');
      Common.setWithExpiry('selectedprod_line', prodLine.product_line);
      Common.setWithExpiry('selectedtreenode', '');
      this.removeallsafilters();
      this.getsalablesfilters();
    } catch (ec) { }
    try{
    if(this.innerWidth<=426){
      this.Sliding();
    }
  }catch(ed){}
    this.router.navigate(['/products', prodLine.product_line.toLowerCase(),prodLine.PLDescr.toLowerCase()]);
  }

  slidingfilter() {
    //$("#Filters").slideToggle("slow");
  }

  getslidelaststate(){
    var getvalu=Common.getWithExpiry("setopenviewcategory");
    if(getvalu!=undefined && getvalu!=null && getvalu!=''){
      this.setopenviewcategory =  getvalu;
    }
  }

  Sliding() {

    this.setopenviewcategory = (this.setopenviewcategory == '1' ? "0" : "1");
    Common.setWithExpiry("setopenviewcategory", this.setopenviewcategory);
  }
  onBrandSelectLanding(majclass:any) {
    Common.setWithExpiry('selectedmaj_class', majclass.maj_class);
    Common.setWithExpiry('selectedsearch', '');
    Common.setWithExpiry('selectedprod_line', '');
    Common.setWithExpiry('selecctedsatags', '');
    Common.setWithExpiry('selectedtreenode', '');
    this.removeallsafilters();
    this.getsalablesfilters();
    try{
    if(this.innerWidth<=426){
      this.Sliding();
    }
  }catch(ed){}
    this.router.navigate(['/product', majclass.maj_class.toLowerCase(),majclass.MCDescr.toLowerCase()]);
  }

  checkChildMenu(treeNode:any) {

    Common.setWithExpiry('selectedmaj_class', '');
    Common.setWithExpiry('selectedsearch', '');
    Common.setWithExpiry('selectedprod_line', '');
    Common.setWithExpiry('selecctedsatags', '');
    Common.setWithExpiry('selectedtreenode', treeNode);
    //    var gethaschild = Common.getWithExpiry("hasChildMenu" + treeNode + this.warehouse);
    if (treeNode.parent > 0) {
      this.removeallsafilters();
      this.getsalablesfilters();
      this.router.navigate(['categories', treeNode.toLowerCase()]);
    }
    else {
      this.removeallsafilters();
      this.getsalablesfilters();
      this.router.navigate(['/category', treeNode.toLowerCase()]);
    }

  }
}
