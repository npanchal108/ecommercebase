import { Component, OnInit, Renderer2 } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Common } from '../../app/model/common.model';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../services/loading.service';
// import * as $ from 'jquery';
import { SEOService } from '../services/seo.service';
//import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import * as arraySort from 'array-sort'
import { MenuService } from '../services/menu.service';


import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { environment } from '../../environments/environment';

@Component({

  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})



export class ProductComponent implements OnInit {
  configforcartbyprofile: any;
  AddToCartAsPerProfileNo: any;
  AddToCartAsPerProfileArrayNo: any;
  Multiply: any;
  productdetailsforlist: any;
  pptype: any;
  productList: any=[];
  productList1: any=[];
  //productList2: any=[];
  productName: string;
  category: string;
  MinQty: boolean = false;
  MaxQty: boolean = false;
  searchText: string;
  isLoggedIn: boolean = false;
  isEmpty: boolean = false;
  itemstoavails: string = '';
  // warehouse: string = '';
  page: number = 1;
  LNpage: number = 1;
  totalLinePage: any;
  pageNo: number = 1;
  pricemsgwithoutlogin: any;
  salablelist: any;
  webtype: any;
  qtymsgwithoutlogin: any;
  titleheader: any;
  titleheader1: any = [];
  ddd: any = [];
  pagesize: any;
  isfeature: boolean = false;
  multiplewarehouseinone: any;
  AddZero: any;
  Asearch: any;
  listprice: any;
  priceshow: any;
  userwishlist: any = [];
  userrfqlist: any = [];
  currentitem: any;
  iswish: boolean = false;
  isrfq: boolean = false;
  iswishshow: any;
  isrfqshow: any;
  showstock: any;
  decimalpoints: any;
  isLowToHigh: boolean = false;
  isHighToLow: boolean = false;
  isATOZ: boolean = false;
  isZTOA: boolean = false;
  isumdescr: any;
  isListView: boolean = false;
  isGridView: boolean = false;
  isaccesswithlogin: any;
  GuestUserID: any;
  Guestwarehouse: any;
  annavail: any;
  annastock: any;
  addtonotavail: any;
  qtymsg: any;
  pricemsg: any;
  withoutloginavaillist: any;
  Position: string;
  withloginprice: any;
  withloginpricelist: any;
  withloginavailshow: any;
  withloginavaillist: any;
  withloginavailqty: any;
  isDimensions: any;
  isprofiledesc: any;
  profilenoforitemdesc: any;
  arraynoforitemdesc: number;
  sy_prof_label: any;
  IsMuscle: any;
  Productlineshow: any;
  treesort: any;
  umdescrlist: any;
  newitemdays: any;
  stype: any = 0;
  itlable: any;
  isWishthere: any;
  isrfqthere: any;
  israteshowforcu: any;
  iscartthere: any;
  cartProducts: any;
  PriceRound: any;
  Sequencelable: any;
  showups: any;
  baseitemShow: any;
  UrlWithFreeForm: any;
  UrlWithDetails: any;
  show3D: any;
  Lable1: any;
  Lable2: any;
  Lable3: any;
  Lable4: any;
  TableView: any;
  ListTypeView: any;
  SortingSetting: string = undefined;
  PriceOrLable: any;
  ProfilePriceLable: any;
  DimensionLable: string = 'Dimensions';
  stocklable: any;
  vendorinproductlist: any;
  drop_ship: any;
  drop_shiplable: any;
  LowestPriceFirst: any;
  highestPriceFirst: any;
  ItemAtoZ: any;
  ItemZtoA: any;
  LowestQtyFirst: any;
  highestQtyFirst: any;
  descrAtoZ: any;
  descrZtoA: any;
  QuantitySort: any;
  DescrSort: any;
  sa13sort: any;
  sa13sortasc: any;
  sa13sortdesc: any;
  newpageno: number;
  priceshowcust: any;
  IsRetailPrice: any;
  RetailPriceLabel: any;
  IsProfileShow: any;
  ProfileNo: any;
  ProfileIndex: any;
  ProfileLable: any;
  ListPriceShow: any;
  DescrToShow: any;
  manufacturerproductlist: any;
  beforepricelableinproductlist: any;
  umafterpriceinproductlist: any;
  DisplayListPriceInProductListwithoutLogin: any;
  DisplayListPriceLable: any = 'List Price';
  DisplayListPriceInProductListwithLogin: any;
  Multiplewarehouseforavaibility: any;
  avg_lead_time: any;
  avg_lead_time_lable: any;
  avg_lead_time_value: any;
  wishlistlable: any;
  newestfirstsort: any;
  newestfirstsortlabel: any;
  Allconfigurationlist: any = [];
  newpermission: any;
  newItemDate: any;
  GuestLogin: any;
  warehousenamesetting: any;
  warehousenames: any;
  logintype: any;
  inprocesslist: any;
  avaibilitylable: any;
  maxlable: any;
  minlable: any;
  unavail: boolean;
  qtyonlist: any = '1'
  addnewqtywithnewlogic: any;
  displaynewavails: any;
  displaynewavailslable: any;

  safilterslist: any;
  safilterslistparent: any;
  showsafilter: any='1';
  SaFilterLable: any;
  showsafilter1: any = '1';
  selecctedsatags: any = [];
  saonproductlistonly:any='1';
  setopenview: any = '0';
  whlable1:any;
  whlable2:any;
  whlable3:any;
  iskrayden:any;
  constructor(private renderer: Renderer2,private gtmService: GoogleTagManagerService, private menuService: MenuService, private loadingService: LoadingService, location: PlatformLocation, private seoService: SEOService, private toastr: ToastrService, private dataService: DataService, private route: ActivatedRoute, private cartService: CartService, private router: Router) {

    if (Common.getWithExpiry('unavail') != undefined && Common.getWithExpiry('unavail') != null && Common.getWithExpiry('unavail') != '') {
      this.unavail = (Common.getWithExpiry('unavail') == 'true' ? true : (Common.getWithExpiry('unavail') == true ? true : false));
    }
    else {
      this.unavail = false;
    }
    this.getlogintype();
    this.GetProductPageConfigurations();
    //this.GetNewItemDate();
    //this.getPagingSetting();
    this.loadScript();
    this.iskrayden=environment.iskyraden;
    //this.Getnewestfirstsort();
    //this.Getavg_lead_time();
    //this.GetConfigforwishlistlable();    
    //this.getSequenceconfig();
    //this.cofigurtiondforQuantitySort();
    //this.cofigurtiondforsa13sort();
    //this.cofigurtiondforDescrSort();
    //this.cofigurtiondforItemZtoA();
    //this.cofigurtiondforItemAtoZ();
    //this.cofigurtiondforhighestPriceFirst();
    //this.cofigurtiondforLowestPriceFirst();
    //this.getSortingSetting();
    //this.getDescrToShow();
    //this.GetMultiplewarehouseforavaibility();
    //this.getDisplayListPriceInProductListwithLogin();
    //this.getDisplayListPriceInProductListwithoutLogin();
    //this.getumafterpriceinproductlist();
    //this.getmanufacturerproductlist();
    //this.getbeforepricelableinproductlist();
    //this.getListPriceShow();
    //this.getIsProfileShow();
    //this.getTableView();
    //this.getIsRetailPrice();
    //this.showpricetocustomers();
    //this.cofigurtiondfordrop_ship();
    //this.configforstocklable();
    //this.configforvendorinproductlist();
    //this.GetConfigurationforPriceOrLable();
    //this.GetConfigurationforProfilePriceLable();
    //this.getwebsitetype();
    this.getData();
    this.Getsalable();
    //this.getitlableconfig();
    //this.GetpriceRoundingsetting();
    //this.getconfigurationforups();
    //this.getbaseitemShow();
    //this.getUrlWithDetails();
    this.israteshowforcu = true;
    // this.dataService.GetPermissionConfig().subscribe((res: any) => {
    // });
    //this.getisprofiledesc();
    //this.getIsMuscle();
    //this.GetConfigfordecimalpoints();
    //this.GetConfigFortreesort();
    if (Common.getWithExpiry("CustID") != "" && Common.getWithExpiry("CustID") != null) {
      this.isLoggedIn = true;
      //this.getiswishthere();
      //this.getisrfqthere();
      //this.getiscartthere();
      //this.getwishconfig();
      //this.getrfqconfig();
      this.getwishlist();
      this.getRfqlist();
      //this.getwithloginprice();
      //this.getwithloginavailshow();      
      //this.getqtymsg();
      //this.getpricemsg();
      //  this.GetConfigForAddToCartAsPerProfile();
      this.getfirstpagelist();
    }
    else {
      this.isLoggedIn = false;
      //this.Accessannomyous();
      //this.getqtymsgwithoutlogin();
      //this.getpricemsgwithoutlogin();
    }
    //this.getProductlineshow();
    //this.getMinQtySetting();
    //this.getMaxQtySetting();
    //this.getDimensions();
    //this.getAddZero();
    //this.getaddtonotavail();
    //this.getStockconfig();
    //this.getMultiplyQtySetting();
    //this.getProductlineshow();
    //this.get3dsetting();
    //this.getListTypeView();
    //     location.onPopState(() => {
    //       setTimeout(() => {
    //         this.cartService.setpageno(Common.getWithExpiry("pageNo"));
    //       }, 1)
    //     });
  }
  getlogintype() {
    this.logintype = this.dataService.Getconfigbykey("logintype");
    if (this.logintype == null || this.logintype == undefined || this.logintype == '') {
      this.logintype = Common.getWithExpiry("logintype");
    }

  }
  addqty(order){
    if(order.quantity==undefined){
      order.quantity=1;
    }
    else if(order.quantity>=0){
      order.quantity=order.quantity+1;
    }
    else{
      order.quantity=0;
    }
  }
  minusqty(order){
    if(order.quantity==undefined){
      order.quantity=1;
    }
    else if(order.quantity>0){
      order.quantity=order.quantity-1;
    }
    else{
      order.quantity=0;
    }
  }



  getData() {
    // || this.router.url.indexOf("/search") > -1
    if ((this.router.url.indexOf("/productlist/") > -1 || this.router.url.indexOf("/product") > -1
      
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
  getsalablesfilters() {
    // if((this.saonproductlistonly=='1' && (this.router.url.indexOf("/productlist/") > -1 || this.router.url.indexOf("/category/") > -1 || this.router.url.indexOf("/products/") > -1)) || this.saonproductlistonly=='0'){
    // if (this.showsafilter == '1' && this.showsafilter1 == '1') {
      var maj_class = Common.getWithExpiry('selectedmaj_class');
      var prod_line = Common.getWithExpiry('selectedprod_line');
      var treenode =this.route.snapshot.paramMap.get('category');
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
        var warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
        this.menuService.getsafilters(maj_class, prod_line, treenode, JSON.stringify(this.selecctedsatags), words, warehouse, Common.getWithExpiry('CustID'), Common.getWithExpiry("company_sy")).subscribe((res: any) => {
          this.safilterslist = res;
          if(this.safilterslistparent==undefined){
            this.safilterslistparent=[];
          }
          //this.sendMessage('stop');
          for (let menu of this.safilterslist) {
            try {
              menu.code = menu.code + ';' + menu.sa_code;
              if (!this.safilterslistparent.some(x => x.sa_lables == menu.sa_lables)) {                
                let copy = Object.assign({}, menu);
                var getfil = this.safilterslist.filter(item => {
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
  //   }
  // }
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
    
  }
  getsetopenview(listvi) {
    
    listvi = (listvi == '1' ? '0' : '1');
    this.setopenview = listvi;
    Common.setWithExpiry("setopenview", listvi);
    //$("#Filters").slideToggle("slow");
  }


  addremovesatags(code) {
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
    //if (this.selecctedsatags.length > 0) {
     // this.router.navigate(['/productlist', JSON.stringify(this.selecctedsatags)]);

    //}
    this.bindProducts(this.pageNo);
    
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
  getumdescbyumcode(umcode) {
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
  getwarehousenamebycode(wareh) {
    if (this.warehousenamesetting == '1') {
      for (var i = 0; i < this.warehousenames.length; i++) {
        if (this.warehousenames[i].code == wareh) {
          return this.warehousenames[i].descr;
        }
      }
    }
    else {
      return wareh;
    }
  }

  GetNewItemDate() {
    this.newItemDate = this.dataService.Getconfigbykey("NewItemDate");
    if (this.newItemDate == null || this.newItemDate == undefined || this.newItemDate == '') {
      this.newItemDate = Common.getWithExpiry("NewItemDate");
    }
    if (this.newItemDate == null || this.newItemDate == undefined || this.newItemDate == '') {
      this.dataService.GetConfigforNewItem().subscribe((data: any) => {
        this.newItemDate = data;
        Common.setWithExpiry("NewItemDate", this.newItemDate);
      });

    }
  }
  Getwarehousenamesetting() {
    this.warehousenamesetting = this.dataService.Getconfigbykey("warehousenamesetting");
    if (this.warehousenamesetting == null || this.warehousenamesetting == undefined || this.warehousenamesetting == '') {
      this.warehousenamesetting = Common.getWithExpiry("warehousenamesetting");
    }
    if (this.warehousenamesetting == null || this.warehousenamesetting == undefined || this.warehousenamesetting == '') {
      this.dataService.GetConfigforNewItem().subscribe((data: any) => {
        this.warehousenamesetting = data;
        Common.setWithExpiry("warehousenamesetting", this.warehousenamesetting);
        if (this.warehousenamesetting == '1') {
          this.Getwarehousenames();
        }
      });

    }
    else {
      if (this.warehousenamesetting == '1') {
        this.Getwarehousenames();
      }
    }
  }
  Getwarehousenames() {

    this.warehousenames = Common.getWithExpiry("warehousenames");

    if (this.warehousenames == null || this.warehousenames == undefined || this.warehousenames == '') {
      this.dataService.Getwarehousenames().subscribe((data: any) => {
        this.warehousenames = data;
        Common.setWithExpiry("warehousenames", this.warehousenames);
      });

    }
  }

  GetProductPageConfigurations() {

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
          if (this.Allconfigurationlist[i].ConfigKey == "PagingSetting") {
            this.pagesize = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "GuestLogin") {
            this.GuestLogin = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "newestfirstsort") {
            this.newestfirstsort = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "newestfirstsortlabel") {
            this.newestfirstsortlabel = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "avg_lead_time") {
            this.avg_lead_time = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "avg_lead_time_lable") {
            this.avg_lead_time_lable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "avg_lead_time_value") {
            this.avg_lead_time_value = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "wishlistlable") {
            this.wishlistlable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "Sequencelable") {
            this.Sequencelable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "QuantitySort") {
            this.QuantitySort = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "LowestQtyFirst") {
            this.LowestQtyFirst = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "highestQtyFirst") {
            this.highestQtyFirst = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "sa13sort") {
            this.sa13sort = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "sa13sortasc") {
            this.sa13sortasc = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "sa13sortdesc") {
            this.sa13sortdesc = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "DescrSort") {
            this.DescrSort = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "descrZtoA") {
            this.descrZtoA = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "descrAtoZ") {
            this.descrAtoZ = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "ItemZtoA") {
            this.ItemZtoA = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "ItemAtoZ") {
            this.ItemAtoZ = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "highestPriceFirst") {
            this.highestPriceFirst = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "LowestPriceFirst") {
            this.LowestPriceFirst = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "DescrToShow") {
            this.DescrToShow = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "Multiplewarehouseforavaibility") {
            this.Multiplewarehouseforavaibility = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "multiplewarehouseinone") {
            this.multiplewarehouseinone = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "DisplayListPriceInProductListwithLogin") {
            this.DisplayListPriceInProductListwithLogin = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "DisplayListPriceLable") {
            this.DisplayListPriceLable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "DisplayListPriceInProductListwithoutLogin") {
            this.DisplayListPriceInProductListwithoutLogin = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "DisplayListPriceLable") {
            this.DisplayListPriceLable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "umafterpriceinproductlist") {
            this.umafterpriceinproductlist = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "manufacturerproductlist") {
            this.manufacturerproductlist = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "beforepricelableinproductlist") {
            this.beforepricelableinproductlist = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "PricePerEach") {
            this.ListPriceShow = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "IsProfileShow") {
            this.IsProfileShow = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "ProfileNo") {
            this.ProfileNo = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "ProfileIndex") {
            this.ProfileIndex = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "ProfileLable") {
            this.ProfileLable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "TableView") {
            this.TableView = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "IsRetailPrice") {
            this.IsRetailPrice = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "RetailPriceLabel") {
            this.RetailPriceLabel = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "ShowPrices") {
            this.priceshowcust = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "drop_ship") {
            this.drop_ship = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "drop_shiplable") {
            this.drop_shiplable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "stocklable") {
            this.stocklable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "vendorinproductlist") {
            this.vendorinproductlist = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "PriceOrLable") {
            this.PriceOrLable = this.Allconfigurationlist[i].ConfigValue;
          }

          if (this.Allconfigurationlist[i].ConfigKey == "ProfilePriceLable") {
            this.ProfilePriceLable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "websitetype") {
            this.webtype = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "ItemLable") {
            this.itlable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "PriceRound") {
            this.PriceRound = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "UPSshow") {
            this.showups = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "baseitemShow") {
            this.baseitemShow = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "UrlWithDetails") {
            this.UrlWithDetails = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "UrlWithFreeForm") {
            this.UrlWithFreeForm = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "NewPermission") {
            this.newpermission = this.Allconfigurationlist[i].ConfigValue;
            this.newpermissionsetting();
          }
          if (this.Allconfigurationlist[i].ConfigKey == "isprofiledesc") {
            this.isprofiledesc = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "IsMuscle") {
            this.IsMuscle = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "decimalpoints") {
            this.decimalpoints = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "treesequence") {
            this.treesort = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "wishshowinhover") {
            this.isWishthere = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "RFQshowinhover") {
            this.isrfqthere = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "Addtocartinhover") {
            this.iscartthere = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "iswishlist") {
            this.iswishshow = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "isrfqlist") {
            this.isrfqshow = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withloginprice") {
            this.withloginprice = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withloginpricelist") {
            this.withloginpricelist = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "SortingSetting") {
            this.SortingSetting = this.Allconfigurationlist[i].ConfigValue;
            //this.newsortingfun();
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withloginavailshow") {
            this.withloginavailshow = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withloginavailshow") {
            this.withloginavailshow = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withloginavaillist") {
            this.withloginavaillist = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withloginavailqty") {
            this.withloginavailqty = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "qtymsg") {
            this.qtymsg = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "pricemsg") {
            this.pricemsg = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "AddToCartAsPerProfile") {
            this.configforcartbyprofile = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "AddToCartAsPerProfileNo") {
            this.AddToCartAsPerProfileNo = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "AddToCartAsPerProfileArrayNo") {
            this.AddToCartAsPerProfileArrayNo = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withoutloginBrowse") {
            this.isaccesswithlogin = this.Allconfigurationlist[i].ConfigValue;
            if (this.isaccesswithlogin == '0' && (Common.getWithExpiry("CustID") == "" || Common.getWithExpiry("CustID") == null || Common.getWithExpiry("CustID") == undefined)) {
              this.router.navigate(['login']);
            }
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withoutloginavailshow") {
            this.annavail = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withoutloginavailqty") {
            this.annastock = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withoutloginavaillist") {
            this.withoutloginavaillist = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "GuestUserID") {
            this.GuestUserID = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withoutloginpriceshow") {
            this.priceshow = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withoutloginpricelist") {
            this.listprice = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "qtymsgwithoutlogin") {
            this.qtymsgwithoutlogin = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "pricemsgwithoutlogin") {
            this.pricemsgwithoutlogin = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "MinQty") {
            this.MinQty = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
          }
          if (this.Allconfigurationlist[i].ConfigKey == "MaxQty") {
            this.MaxQty = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
          }
          if (this.Allconfigurationlist[i].ConfigKey == "Dimensions") {
            this.isDimensions = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "AddZeroValue") {
            this.AddZero = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "addifunavail") {
            this.addtonotavail = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withoutloginavailqty") {
            this.showstock = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "Multiply") {
            this.Multiply = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "prodlineindetail") {
            this.Productlineshow = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "Show3D") {
            this.show3D = this.Allconfigurationlist[i].ConfigValue;
          }
          
          if (this.Allconfigurationlist[i].ConfigKey == "ViewTypeInProductListPage") {
            if(Common.getWithExpiry("ListTypeView")==undefined){
            this.ListTypeView = this.Allconfigurationlist[i].ConfigValue;
            }
            else{
              this.ListTypeView =Common.getWithExpiry("ListTypeView");
            }
          }
          
          if (this.Allconfigurationlist[i].ConfigKey == "NewItemDate") {
            this.newItemDate = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "newitemdays") {
            this.newitemdays = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "avaibilitylable") {
            this.avaibilitylable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "maxlable") {
            this.maxlable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "minlable") {
            this.minlable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "addnewqtywithnewlogic") {
            this.addnewqtywithnewlogic = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "displaynewavails") {
            this.displaynewavails = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "displaynewavailslable") {
            this.displaynewavailslable = this.Allconfigurationlist[i].ConfigValue;
          }
          if(this.Allconfigurationlist[i].ConfigKey=="SaFilterLable"){
            this.SaFilterLable =this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="whlable1"){
            this.whlable1 =this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="whlable2"){
            this.whlable2 =this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="whlable3"){
            this.whlable3 =this.Allconfigurationlist[i].ConfigValue;            
          }
          
        }
        this.getumdescrconfig();
        this.Getwarehousenamesetting();
        this.newsortingfun();
      })
    }
    else {

      for (var i = 0; i < this.Allconfigurationlist.length; i++) {
        if (this.Allconfigurationlist[i].ConfigKey == "PagingSetting") {
          this.pagesize = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "GuestLogin") {
          this.GuestLogin = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "newestfirstsort") {
          this.newestfirstsort = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "newestfirstsortlabel") {
          this.newestfirstsortlabel = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "avg_lead_time") {
          this.avg_lead_time = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "avg_lead_time_lable") {
          this.avg_lead_time_lable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "avg_lead_time_value") {
          this.avg_lead_time_value = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "wishlistlable") {
          this.wishlistlable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "Sequencelable") {
          this.Sequencelable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "QuantitySort") {
          this.QuantitySort = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "LowestQtyFirst") {
          this.LowestQtyFirst = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "highestQtyFirst") {
          this.highestQtyFirst = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "sa13sort") {
          this.sa13sort = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "sa13sortasc") {
          this.sa13sortasc = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "sa13sortdesc") {
          this.sa13sortdesc = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "DescrSort") {
          this.DescrSort = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "descrZtoA") {
          this.descrZtoA = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "descrAtoZ") {
          this.descrAtoZ = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "ItemZtoA") {
          this.ItemZtoA = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "ItemAtoZ") {
          this.ItemAtoZ = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "highestPriceFirst") {
          this.highestPriceFirst = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "LowestPriceFirst") {
          this.LowestPriceFirst = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "SortingSetting") {
          this.SortingSetting = this.Allconfigurationlist[i].ConfigValue;

        }
        if (this.Allconfigurationlist[i].ConfigKey == "DescrToShow") {
          this.DescrToShow = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "Multiplewarehouseforavaibility") {
          this.Multiplewarehouseforavaibility = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "multiplewarehouseinone") {
          this.multiplewarehouseinone = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "DisplayListPriceInProductListwithLogin") {
          this.DisplayListPriceInProductListwithLogin = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "DisplayListPriceLable") {
          this.DisplayListPriceLable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "DisplayListPriceInProductListwithoutLogin") {
          this.DisplayListPriceInProductListwithoutLogin = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "DisplayListPriceLable") {
          this.DisplayListPriceLable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "umafterpriceinproductlist") {
          this.umafterpriceinproductlist = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "manufacturerproductlist") {
          this.manufacturerproductlist = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "beforepricelableinproductlist") {
          this.beforepricelableinproductlist = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "PricePerEach") {
          this.ListPriceShow = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "IsProfileShow") {
          this.IsProfileShow = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "ProfileNo") {
          this.ProfileNo = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "ProfileIndex") {
          this.ProfileIndex = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "ProfileLable") {
          this.ProfileLable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "TableView") {
          this.TableView = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "IsRetailPrice") {
          this.IsRetailPrice = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "RetailPriceLabel") {
          this.RetailPriceLabel = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "ShowPrices") {
          this.priceshowcust = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "drop_ship") {
          this.drop_ship = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "drop_shiplable") {
          this.drop_shiplable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "stocklable") {
          this.stocklable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "vendorinproductlist") {
          this.vendorinproductlist = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "PriceOrLable") {
          this.PriceOrLable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "ProfilePriceLable") {
          this.ProfilePriceLable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "websitetype") {
          this.webtype = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "ItemLable") {
          this.itlable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "PriceRound") {
          this.PriceRound = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "UPSshow") {
          this.showups = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "baseitemShow") {
          this.baseitemShow = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "UrlWithDetails") {
          this.UrlWithDetails = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "UrlWithFreeForm") {
          this.UrlWithFreeForm = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "NewPermission") {
          this.newpermission = this.Allconfigurationlist[i].ConfigValue;
          this.newpermissionsetting();
        }
        if (this.Allconfigurationlist[i].ConfigKey == "isprofiledesc") {
          this.isprofiledesc = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "IsMuscle") {
          this.IsMuscle = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "decimalpoints") {
          this.decimalpoints = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "treesequence") {
          this.treesort = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "wishshowinhover") {
          this.isWishthere = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "RFQshowinhover") {
          this.isrfqthere = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "Addtocartinhover") {
          this.iscartthere = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "iswishlist") {
          this.iswishshow = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "isrfqlist") {
          this.isrfqshow = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withloginprice") {
          this.withloginprice = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withloginpricelist") {
          this.withloginpricelist = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withloginavailshow") {
          this.withloginavailshow = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withloginavailshow") {
          this.withloginavailshow = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withloginavaillist") {
          this.withloginavaillist = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withloginavailqty") {
          this.withloginavailqty = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "qtymsg") {
          this.qtymsg = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "pricemsg") {
          this.pricemsg = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "AddToCartAsPerProfile") {
          this.configforcartbyprofile = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "AddToCartAsPerProfileNo") {
          this.AddToCartAsPerProfileNo = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "AddToCartAsPerProfileArrayNo") {
          this.AddToCartAsPerProfileArrayNo = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withoutloginBrowse") {
          this.isaccesswithlogin = this.Allconfigurationlist[i].ConfigValue;
          if (this.isaccesswithlogin == '0' && (Common.getWithExpiry("CustID") == "" || Common.getWithExpiry("CustID") == null || Common.getWithExpiry("CustID") == undefined)) {
            this.router.navigate(['login']);
          }
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withoutloginavailshow") {
          this.annavail = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withoutloginavailqty") {
          this.annastock = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withoutloginavaillist") {
          this.withoutloginavaillist = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "GuestUserID") {
          this.GuestUserID = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withoutloginpriceshow") {
          this.priceshow = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withoutloginpricelist") {
          this.listprice = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "qtymsgwithoutlogin") {
          this.qtymsgwithoutlogin = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "pricemsgwithoutlogin") {
          this.pricemsgwithoutlogin = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "MinQty") {
          this.MinQty = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
        }
        if (this.Allconfigurationlist[i].ConfigKey == "MaxQty") {
          this.MaxQty = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
        }
        if (this.Allconfigurationlist[i].ConfigKey == "Dimensions") {
          this.isDimensions = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "AddZeroValue") {
          this.AddZero = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "addifunavail") {
          this.addtonotavail = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withoutloginavailqty") {
          this.showstock = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "Multiply") {
          this.Multiply = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "prodlineindetail") {
          this.Productlineshow = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "Show3D") {
          this.show3D = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "ViewTypeInProductListPage") {
          if(Common.getWithExpiry("ListTypeView")==undefined){
          this.ListTypeView = this.Allconfigurationlist[i].ConfigValue;
          }
          else{
            this.ListTypeView =Common.getWithExpiry("ListTypeView");
          }
        }
        if (this.Allconfigurationlist[i].ConfigKey == "NewItemDate") {
          this.newItemDate = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "newitemdays") {
          this.newitemdays = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "avaibilitylable") {
          this.avaibilitylable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "maxlable") {
          this.maxlable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "minlable") {
          this.minlable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "addnewqtywithnewlogic") {
          this.addnewqtywithnewlogic = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "displaynewavails") {
          this.displaynewavails = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "displaynewavailslable") {
          this.displaynewavailslable = this.Allconfigurationlist[i].ConfigValue;
        }
        if(this.Allconfigurationlist[i].ConfigKey=="SaFilterLable"){
          this.SaFilterLable =this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="whlable1"){
          this.whlable1 =this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="whlable2"){
          this.whlable2 =this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="whlable3"){
          this.whlable3 =this.Allconfigurationlist[i].ConfigValue;            
        }
        
      }

      this.getumdescrconfig();
      this.Getwarehousenamesetting();
      this.newsortingfun();
    }
  }
  cofigurtiondforLowestPriceFirst() {
    this.LowestPriceFirst = this.dataService.Getconfigbykey("LowestPriceFirst");
    if (this.LowestPriceFirst == null || this.LowestPriceFirst == undefined || this.LowestPriceFirst == '') {
      this.LowestPriceFirst = Common.getWithExpiry("LowestPriceFirst");
    }
    if (this.LowestPriceFirst == null || this.LowestPriceFirst == undefined || this.LowestPriceFirst == '') {
      this.dataService.cofigurtiondforLowestPriceFirst().subscribe((data: any) => {
        this.LowestPriceFirst = data;
        Common.setWithExpiry("LowestPriceFirst", this.LowestPriceFirst);
      })
    }
  }


  tagmanager() {
    try{
    var item = [];
    
    for (var i = 0; i < this.productList1.length; i++) {
        item.push({ "item_id": this.productList1[i].itemname, "item_name": this.productList1[i].itemname, "item_brand": this.productList1[i].links, "item_category": this.productList1[i].prod_line, "item_category2": this.productList1[i].descr, "item_list_id": "", "item_list_name": this.productList1[i].itemname, "price": this.productList1[i].list_price, "quantity": "0" })
    }
    var gtmTag = {
        event: 'view_item_list',
        ecommerce: {
            items: item
        }
    };
    console.log('gtmService',gtmTag);
    this.gtmService.pushTag(gtmTag);
}catch(ex){
    console.log(ex.toString());
}
}

  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  Getavg_lead_time() {
    this.avg_lead_time = this.dataService.Getconfigbykey("avg_lead_time");
    if (this.avg_lead_time == null || this.avg_lead_time == undefined || this.avg_lead_time == '') {
      this.avg_lead_time = Common.getWithExpiry("avg_lead_time");
    }
    else {
      if (this.avg_lead_time == '1') {
        this.Getavg_lead_time_lable();
        this.Getavg_lead_time_value();
      }
    }
    if (this.avg_lead_time == null || this.avg_lead_time == undefined || this.avg_lead_time == '') {
      this.dataService.Getavg_lead_time().subscribe((data: any) => {
        this.avg_lead_time = data;
        Common.setWithExpiry("avg_lead_time", this.avg_lead_time);
        if (this.avg_lead_time == '1') {
          this.Getavg_lead_time_lable();
          this.Getavg_lead_time_value();
        }
      })
    }
    else {
      if (this.avg_lead_time == '1') {
        this.Getavg_lead_time_lable();
        this.Getavg_lead_time_value();
      }
    }
  }
  Getavg_lead_time_lable() {
    this.avg_lead_time_lable = this.dataService.Getconfigbykey("avg_lead_time_lable");
    if (this.avg_lead_time_lable == null || this.avg_lead_time_lable == undefined || this.avg_lead_time_lable == '') {
      this.avg_lead_time_lable = Common.getWithExpiry("avg_lead_time_lable");
    }
    if (this.avg_lead_time_lable == null || this.avg_lead_time_lable == undefined || this.avg_lead_time_lable == '') {
      this.dataService.Getavg_lead_time_lable().subscribe((data: any) => {
        this.avg_lead_time_lable = data;
        Common.setWithExpiry("avg_lead_time_lable", this.avg_lead_time_lable);
      })
    }
  }
  Getnewestfirstsort() {
    this.newestfirstsort = this.dataService.Getconfigbykey("newestfirstsort");
    if (this.newestfirstsort == null || this.newestfirstsort == undefined || this.newestfirstsort == '') {
      this.newestfirstsort = Common.getWithExpiry("newestfirstsort");
    }
    else {
      if (this.newestfirstsort == '1') {
        this.Getconfigurationfornewestfirstsortlabel();
      }
    }
    if (this.newestfirstsort == null || this.newestfirstsort == undefined || this.newestfirstsort == '') {
      this.dataService.Getconfigurationfornewestfirstsort().subscribe((data: any) => {
        this.newestfirstsort = data;
        Common.setWithExpiry("newestfirstsort", this.newestfirstsort);
        if (this.newestfirstsort == '1') {
          this.Getconfigurationfornewestfirstsortlabel();
        }
      })
    }
    else {
      if (this.newestfirstsort == '1') {
        this.Getconfigurationfornewestfirstsortlabel();
      }
    }
  }
  Getconfigurationfornewestfirstsortlabel() {
    this.newestfirstsortlabel = this.dataService.Getconfigbykey("newestfirstsortlabel");
    if (this.newestfirstsortlabel == null || this.newestfirstsortlabel == undefined || this.newestfirstsortlabel == '') {
      this.newestfirstsortlabel = Common.getWithExpiry("newestfirstsortlabel");
    }
    if (this.newestfirstsortlabel == null || this.newestfirstsortlabel == undefined || this.newestfirstsortlabel == '') {
      this.dataService.Getconfigurationfornewestfirstsortlabel().subscribe((data: any) => {
        this.newestfirstsortlabel = data;
        Common.setWithExpiry("newestfirstsortlabel", this.newestfirstsortlabel);
      })
    }
  }
  Getavg_lead_time_value() {
    this.avg_lead_time_value = this.dataService.Getconfigbykey("avg_lead_time_value");
    if (this.avg_lead_time_value == null || this.avg_lead_time_value == undefined || this.avg_lead_time_value == '') {
      this.avg_lead_time_value = Common.getWithExpiry("avg_lead_time_value");
    }
    if (this.avg_lead_time_value == null || this.avg_lead_time_value == undefined || this.avg_lead_time_value == '') {
      this.dataService.Getavg_lead_time_value().subscribe((data: any) => {
        this.avg_lead_time_value = data;
        Common.setWithExpiry("avg_lead_time_value", this.avg_lead_time_value);
      })
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
  cofigurtiondforsa13sort() {
    this.sa13sort = this.dataService.Getconfigbykey("sa13sort");
    if (this.sa13sort == null || this.sa13sort == undefined || this.sa13sort == '') {
      this.sa13sort = Common.getWithExpiry("sa13sort");
    }
    if (this.sa13sort == null || this.sa13sort == undefined || this.sa13sort == '') {
      this.dataService.GetConfigurationforsa13sort().subscribe((data: any) => {
        this.sa13sort = data;
        Common.setWithExpiry("sa13sort", this.sa13sort);
        if (this.sa13sort == '1') {
          this.GetConfigurationforsa13sortasc();
          this.GetConfigurationforsa13sortdesc();
        }
      })
    }
    else {
      if (this.sa13sort == '1') {
        this.GetConfigurationforsa13sortasc();
        this.GetConfigurationforsa13sortdesc();
      }
    }
  }
  GetConfigurationforsa13sortasc() {
    this.sa13sortasc = this.dataService.Getconfigbykey("sa13sortasc");
    if (this.sa13sortasc == null || this.sa13sortasc == undefined || this.sa13sortasc == '') {
      this.sa13sortasc = Common.getWithExpiry("sa13sortasc");
    }
    if (this.sa13sortasc == null || this.sa13sortasc == undefined || this.sa13sortasc == '') {
      this.dataService.GetConfigurationforsa13sortasc().subscribe((data: any) => {
        this.sa13sortasc = data;
        Common.setWithExpiry("sa13sortasc", this.sa13sortasc);
      })
    }
  }
  GetConfigurationforsa13sortdesc() {
    this.sa13sortdesc = this.dataService.Getconfigbykey("sa13sortdesc");
    if (this.sa13sortdesc == null || this.sa13sortdesc == undefined || this.sa13sortdesc == '') {
      this.sa13sortdesc = Common.getWithExpiry("sa13sortdesc");
    }
    if (this.sa13sortdesc == null || this.sa13sortdesc == undefined || this.sa13sortdesc == '') {
      this.dataService.GetConfigurationforsa13sortdesc().subscribe((data: any) => {
        this.sa13sortdesc = data;
        Common.setWithExpiry("sa13sortdesc", this.sa13sortdesc);
      })
    }
  }
  cofigurtiondforhighestPriceFirst() {
    this.highestPriceFirst = this.dataService.Getconfigbykey("highestPriceFirst");
    if (this.highestPriceFirst == null || this.highestPriceFirst == undefined || this.highestPriceFirst == '') {
      this.highestPriceFirst = Common.getWithExpiry("highestPriceFirst");
    }
    if (this.highestPriceFirst == null || this.highestPriceFirst == undefined || this.highestPriceFirst == '') {
      this.dataService.cofigurtiondforhighestPriceFirst().subscribe((data: any) => {
        this.highestPriceFirst = data;
        Common.setWithExpiry("highestPriceFirst", this.highestPriceFirst);
      })
    }
  }
  cofigurtiondforItemAtoZ() {
    this.ItemAtoZ = this.dataService.Getconfigbykey("ItemAtoZ");
    if (this.ItemAtoZ == null || this.ItemAtoZ == undefined || this.ItemAtoZ == '') {
      this.ItemAtoZ = Common.getWithExpiry("ItemAtoZ");
    }
    if (this.ItemAtoZ == null || this.ItemAtoZ == undefined || this.ItemAtoZ == '') {
      this.dataService.cofigurtiondforItemAtoZ().subscribe((data: any) => {
        this.ItemAtoZ = data;
        Common.setWithExpiry("ItemAtoZ", this.ItemAtoZ);
      })
    }
  }
  cofigurtiondforItemZtoA() {
    this.ItemZtoA = this.dataService.Getconfigbykey("ItemZtoA");
    if (this.ItemZtoA == null || this.ItemZtoA == undefined || this.ItemZtoA == '') {
      this.ItemZtoA = Common.getWithExpiry("ItemZtoA");
    }
    if (this.ItemZtoA == null || this.ItemZtoA == undefined || this.ItemZtoA == '') {
      this.dataService.cofigurtiondforItemZtoA().subscribe((data: any) => {
        this.ItemZtoA = data;
        Common.setWithExpiry("ItemZtoA", this.ItemZtoA);
      })
    }
  }
  cofigurtiondforLowestQtyFirst() {
    this.LowestQtyFirst = this.dataService.Getconfigbykey("LowestQtyFirst");
    if (this.LowestQtyFirst == null || this.LowestQtyFirst == undefined || this.LowestQtyFirst == '') {
      this.LowestQtyFirst = Common.getWithExpiry("LowestQtyFirst");
    }
    if (this.LowestQtyFirst == null || this.LowestQtyFirst == undefined || this.LowestQtyFirst == '') {
      this.dataService.cofigurtiondforLowestQtyFirst().subscribe((data: any) => {
        this.LowestQtyFirst = data;
        Common.setWithExpiry("LowestQtyFirst", this.LowestQtyFirst);
      })
    }
  }
  cofigurtiondforhighestQtyFirst() {
    this.highestQtyFirst = this.dataService.Getconfigbykey("highestQtyFirst");
    if (this.highestQtyFirst == null || this.highestQtyFirst == undefined || this.highestQtyFirst == '') {
      this.highestQtyFirst = Common.getWithExpiry("highestQtyFirst");
    }
    if (this.highestQtyFirst == null || this.highestQtyFirst == undefined || this.highestQtyFirst == '') {
      this.dataService.cofigurtiondforhighestQtyFirst().subscribe((data: any) => {
        this.highestQtyFirst = data;
        Common.setWithExpiry("highestQtyFirst", this.highestQtyFirst);
      })
    }
  }
  cofigurtiondfordescrAtoZ() {
    this.descrAtoZ = this.dataService.Getconfigbykey("descrAtoZ");
    if (this.descrAtoZ == null || this.descrAtoZ == undefined || this.descrAtoZ == '') {
      this.descrAtoZ = Common.getWithExpiry("descrAtoZ");
    }
    if (this.descrAtoZ == null || this.descrAtoZ == undefined || this.descrAtoZ == '') {
      this.dataService.cofigurtiondfordescrAtoZ().subscribe((data: any) => {
        this.descrAtoZ = data;
        Common.setWithExpiry("descrAtoZ", this.descrAtoZ);
      })
    }
  }
  cofigurtiondfordescrZtoA() {
    this.descrZtoA = this.dataService.Getconfigbykey("descrZtoA");
    if (this.descrZtoA == null || this.descrZtoA == undefined || this.descrZtoA == '') {
      this.descrZtoA = Common.getWithExpiry("descrZtoA");
    }
    if (this.descrZtoA == null || this.descrZtoA == undefined || this.descrZtoA == '') {
      this.dataService.cofigurtiondfordescrZtoA().subscribe((data: any) => {
        this.descrZtoA = data;
        Common.setWithExpiry("descrZtoA", this.descrZtoA);
      })
    }
  }
  cofigurtiondforQuantitySort() {
    this.QuantitySort = this.dataService.Getconfigbykey("QuantitySort");
    if (this.QuantitySort == null || this.QuantitySort == undefined || this.QuantitySort == '') {
      this.QuantitySort = Common.getWithExpiry("QuantitySort");
    }
    if (this.QuantitySort == null || this.QuantitySort == undefined || this.QuantitySort == '') {
      this.dataService.cofigurtiondforQuantitySort().subscribe((data: any) => {
        this.QuantitySort = data;
        Common.setWithExpiry("QuantitySort", this.QuantitySort);
        if (this.QuantitySort == '1') {
          this.cofigurtiondforLowestQtyFirst();
          this.cofigurtiondforhighestQtyFirst();
        }
      })
    }
    else {
      if (this.QuantitySort == '1') {
        this.cofigurtiondforLowestQtyFirst();
        this.cofigurtiondforhighestQtyFirst();
      }
    }
  }
  cofigurtiondforDescrSort() {
    this.DescrSort = this.dataService.Getconfigbykey("DescrSort");
    if (this.DescrSort == null || this.DescrSort == undefined || this.DescrSort == '') {
      this.DescrSort = Common.getWithExpiry("DescrSort");
    }
    if (this.DescrSort == null || this.DescrSort == undefined || this.DescrSort == '') {
      this.dataService.cofigurtiondforDescrSort().subscribe((data: any) => {
        this.DescrSort = data;
        Common.setWithExpiry("DescrSort", this.DescrSort);
        if (this.DescrSort == '1') {
          this.cofigurtiondfordescrAtoZ();
          this.cofigurtiondfordescrZtoA();
        }
      })
    }
    else {
      if (this.DescrSort == '1') {
        this.cofigurtiondfordescrAtoZ();
        this.cofigurtiondfordescrZtoA();
      }
    }
  }
  Getsalable() {
    try {
      if (Common.getWithExpiry("salablelist") != undefined) {
        var salablelist = JSON.parse(Common.getWithExpiry("salablelist"));
      }
    } catch (ex) { }
    if (salablelist == null || salablelist == undefined || salablelist.length == 0) {
      this.dataService.Getgetsalablesettings().subscribe((data: any) => {
        this.salablelist = data;
        Common.setWithExpiry("salablelist", JSON.stringify(this.salablelist));
      })
    }
    else {
      this.salablelist = salablelist;
    }
  }
  getwebsitetype() {
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
  }
  cofigurtiondfordrop_ship() {
    this.drop_ship = this.dataService.Getconfigbykey("drop_ship");
    if (this.drop_ship == null || this.drop_ship == undefined || this.drop_ship == '') {
      this.drop_ship = Common.getWithExpiry("drop_ship");
    }
    if (this.drop_ship == null || this.drop_ship == undefined || this.drop_ship == '') {
      this.dataService.cofigurtiondfordrop_ship().subscribe((data: any) => {
        this.drop_ship = data;
        if (this.drop_ship == '1') {
          this.cofigurtiondfordrop_shiplable();
        }
        Common.setWithExpiry("drop_ship", this.drop_ship);
      })
    }
    else {
      if (this.drop_ship == '1') {
        this.cofigurtiondfordrop_shiplable();
      }
    }
  }
  cofigurtiondfordrop_shiplable() {
    this.drop_shiplable = this.dataService.Getconfigbykey("drop_shiplable");
    if (this.drop_shiplable == null || this.drop_shiplable == undefined || this.drop_shiplable == '') {
      this.drop_shiplable = Common.getWithExpiry("drop_shiplable");
    }
    if (this.drop_shiplable == null || this.drop_shiplable == undefined || this.drop_shiplable == '') {
      this.dataService.cofigurtiondfordrop_shiplable().subscribe((data: any) => {
        this.drop_shiplable = data;
        Common.setWithExpiry("drop_shiplable", this.drop_shiplable);
      })
    }
  }
  getTableView() {
    this.TableView = this.dataService.Getconfigbykey("TableView");
    if (this.TableView == null || this.TableView == undefined || this.TableView == '') {
      this.TableView = Common.getWithExpiry("TableView");
    }
    if (this.TableView == null || this.TableView == undefined || this.TableView == '') {
      this.dataService.GetConfigurationforTableView().subscribe((data: any) => {
        this.TableView = data;
        Common.setWithExpiry("TableView", this.TableView);
      })
    }
  }
  getIsRetailPrice() {
    this.IsRetailPrice = this.dataService.Getconfigbykey("IsRetailPrice");
    if (this.IsRetailPrice == null || this.IsRetailPrice == undefined || this.IsRetailPrice == '') {
      this.IsRetailPrice = Common.getWithExpiry("IsRetailPrice");
    }
    if (this.IsRetailPrice == null || this.IsRetailPrice == undefined || this.IsRetailPrice == '') {
      this.dataService.getRetailPriceConfg().subscribe((data: any) => {
        this.IsRetailPrice = data;
        Common.setWithExpiry("IsRetailPrice", this.IsRetailPrice);
        if (this.IsRetailPrice == '1') {
          this.getRetailPriceLabel();
        }
      })
    }
    else {
      if (this.IsRetailPrice == '1') {
        this.getRetailPriceLabel();
      }
    }
  }
  getRetailPriceLabel() {
    this.RetailPriceLabel = this.dataService.Getconfigbykey("RetailPriceLabel");
    if (this.RetailPriceLabel == null || this.RetailPriceLabel == undefined || this.RetailPriceLabel == '') {
      this.RetailPriceLabel = Common.getWithExpiry("RetailPriceLabel");
    }
    if (this.RetailPriceLabel == null || this.RetailPriceLabel == undefined || this.RetailPriceLabel == '') {
      this.dataService.getRetailPriceLabel().subscribe((data: any) => {
        this.RetailPriceLabel = data;
        Common.setWithExpiry("RetailPriceLabel", this.RetailPriceLabel);
      })
    }
  }

  getListPriceShow() {
    this.ListPriceShow = this.dataService.Getconfigbykey("PricePerEach");
    if (this.ListPriceShow == null || this.ListPriceShow == undefined || this.ListPriceShow == '') {
      this.ListPriceShow = Common.getWithExpiry("ListPriceShow");
    }
    if (this.ListPriceShow == null || this.ListPriceShow == undefined || this.ListPriceShow == '') {
      this.dataService.GetListPriceShow().subscribe((data: any) => {
        this.ListPriceShow = data;
        Common.setWithExpiry("ListPriceShow", this.ListPriceShow);
      });
    }
  }
  getDescrToShow() {
    this.DescrToShow = this.dataService.Getconfigbykey("DescrToShow");
    if (this.DescrToShow == null || this.DescrToShow == undefined || this.DescrToShow == '') {
      this.DescrToShow = Common.getWithExpiry("DescrToShow");
    }
    if (this.DescrToShow == null || this.DescrToShow == undefined || this.DescrToShow == '') {
      this.dataService.GetDescrToShow().subscribe((data: any) => {
        this.DescrToShow = data;
        Common.setWithExpiry("DescrToShow", this.DescrToShow);
      });
    }
  }
  getmanufacturerproductlist() {
    this.manufacturerproductlist = this.dataService.Getconfigbykey("manufacturerproductlist");
    if (this.manufacturerproductlist == null || this.manufacturerproductlist == undefined || this.manufacturerproductlist == '') {
      this.manufacturerproductlist = Common.getWithExpiry("manufacturerproductlist");
    }
    if (this.manufacturerproductlist == null || this.manufacturerproductlist == undefined || this.manufacturerproductlist == '') {
      this.dataService.Getmanufacturerproductlist().subscribe((data: any) => {
        this.manufacturerproductlist = data;
        Common.setWithExpiry("manufacturerproductlist", this.manufacturerproductlist);
      });
    }
  }
  GetMultiplewarehouseforavaibility() {
    this.Multiplewarehouseforavaibility = this.dataService.Getconfigbykey("Multiplewarehouseforavaibility");
    if (this.Multiplewarehouseforavaibility == null || this.Multiplewarehouseforavaibility == undefined || this.Multiplewarehouseforavaibility == '') {
      this.Multiplewarehouseforavaibility = Common.getWithExpiry("Multiplewarehouseforavaibility");
    }
    if (this.Multiplewarehouseforavaibility == null || this.Multiplewarehouseforavaibility == undefined || this.Multiplewarehouseforavaibility == '') {
      this.dataService.GetMultiplewarehouseforavaibility().subscribe((data: any) => {
        this.Multiplewarehouseforavaibility = data;
        Common.setWithExpiry("Multiplewarehouseforavaibility", this.Multiplewarehouseforavaibility);
      });
    }
  }
  getumafterpriceinproductlist() {
    this.umafterpriceinproductlist = this.dataService.Getconfigbykey("umafterpriceinproductlist");
    if (this.umafterpriceinproductlist == null || this.umafterpriceinproductlist == undefined || this.umafterpriceinproductlist == '') {
      this.umafterpriceinproductlist = Common.getWithExpiry("umafterpriceinproductlist");
    }
    if (this.umafterpriceinproductlist == null || this.umafterpriceinproductlist == undefined || this.umafterpriceinproductlist == '') {
      this.dataService.Getumafterpriceinproductlist().subscribe((data: any) => {
        this.umafterpriceinproductlist = data;
        Common.setWithExpiry("umafterpriceinproductlist", this.umafterpriceinproductlist);
      });
    }
  }
  getDisplayListPriceInProductListwithoutLogin() {
    this.DisplayListPriceInProductListwithoutLogin = this.dataService.Getconfigbykey("DisplayListPriceInProductListwithoutLogin");
    if (this.DisplayListPriceInProductListwithoutLogin == null || this.DisplayListPriceInProductListwithoutLogin == undefined || this.DisplayListPriceInProductListwithoutLogin == '') {
      this.DisplayListPriceInProductListwithoutLogin = Common.getWithExpiry("DisplayListPriceInProductListwithoutLogin");
    }
    if (this.DisplayListPriceInProductListwithoutLogin == null || this.DisplayListPriceInProductListwithoutLogin == undefined || this.DisplayListPriceInProductListwithoutLogin == '') {
      this.dataService.GetDisplayListPriceInProductListwithoutLogin().subscribe((data: any) => {
        this.DisplayListPriceInProductListwithoutLogin = data;
        Common.setWithExpiry("DisplayListPriceInProductListwithoutLogin", this.DisplayListPriceInProductListwithoutLogin);
        if (this.DisplayListPriceInProductListwithoutLogin == '1') {
          this.GetDisplayListPriceLable();
        }
      });
    }
    else {
      if (this.DisplayListPriceInProductListwithoutLogin == '1') {
        this.GetDisplayListPriceLable();
      }
    }
  }
  getDisplayListPriceInProductListwithLogin() {
    this.DisplayListPriceInProductListwithLogin = this.dataService.Getconfigbykey("DisplayListPriceInProductListwithLogin");
    if (this.DisplayListPriceInProductListwithLogin == null || this.DisplayListPriceInProductListwithLogin == undefined || this.DisplayListPriceInProductListwithLogin == '') {
      this.DisplayListPriceInProductListwithLogin = Common.getWithExpiry("DisplayListPriceInProductListwithLogin");
    }
    if (this.DisplayListPriceInProductListwithLogin == null || this.DisplayListPriceInProductListwithLogin == undefined || this.DisplayListPriceInProductListwithLogin == '') {
      this.dataService.GetDisplayListPriceInProductListwithLogin().subscribe((data: any) => {
        this.DisplayListPriceInProductListwithLogin = data;
        Common.setWithExpiry("DisplayListPriceInProductListwithLogin", this.DisplayListPriceInProductListwithLogin);
        if (this.DisplayListPriceInProductListwithLogin == '1') {
          this.GetDisplayListPriceLable();
        }
      });
    }
    else {
      if (this.DisplayListPriceInProductListwithLogin == '1') {
        this.GetDisplayListPriceLable();
      }
    }
  }
  GetDisplayListPriceLable() {
    this.DisplayListPriceLable = this.dataService.Getconfigbykey("DisplayListPriceLable");
    if (this.DisplayListPriceLable == null || this.DisplayListPriceLable == undefined || this.DisplayListPriceLable == '') {
      this.DisplayListPriceLable = Common.getWithExpiry("DisplayListPriceLable");
    }
    if (this.DisplayListPriceLable == null || this.DisplayListPriceLable == undefined || this.DisplayListPriceLable == '') {
      this.dataService.GetDisplayListPriceLable().subscribe((data: any) => {
        this.DisplayListPriceLable = data;
        Common.setWithExpiry("DisplayListPriceLable", this.DisplayListPriceLable);
      })
    }
  }
  getbeforepricelableinproductlist() {
    this.beforepricelableinproductlist = this.dataService.Getconfigbykey("beforepricelableinproductlist");
    if (this.beforepricelableinproductlist == null || this.beforepricelableinproductlist == undefined || this.beforepricelableinproductlist == '') {
      this.beforepricelableinproductlist = Common.getWithExpiry("beforepricelableinproductlist");
    }
    if (this.beforepricelableinproductlist == null || this.beforepricelableinproductlist == undefined || this.beforepricelableinproductlist == '') {
      this.dataService.Getbeforepricelableinproductlist().subscribe((data: any) => {
        this.beforepricelableinproductlist = data;
        Common.setWithExpiry("beforepricelableinproductlist", this.beforepricelableinproductlist);
      });
    }
  }

  getIsProfileShow() {
    this.IsProfileShow = this.dataService.Getconfigbykey("IsProfileShow");
    if (this.IsProfileShow == null || this.IsProfileShow == undefined || this.IsProfileShow == '') {
      this.IsProfileShow = Common.getWithExpiry("IsProfileShow");
    }
    if (this.IsProfileShow == null || this.IsProfileShow == undefined || this.IsProfileShow == '') {
      this.dataService.ConfigforIsProfileShow().subscribe((data: any) => {
        this.IsProfileShow = data;
        Common.setWithExpiry("IsProfileShow", this.IsProfileShow);
        if (this.IsProfileShow == '1') {
          this.ConfigforProfileNo();
          this.ConfigforProfileIndex();
          this.ConfigforProfileLable();
        }
      })
    }
    else {
      if (this.IsProfileShow == '1') {
        this.ConfigforProfileNo();
        this.ConfigforProfileIndex();
        this.ConfigforProfileLable();
      }
    }
  }
  ConfigforProfileNo() {
    this.ProfileNo = this.dataService.Getconfigbykey("ProfileNo");
    if (this.ProfileNo == null || this.ProfileNo == undefined || this.ProfileNo == '') {
      this.ProfileNo = Common.getWithExpiry("ProfileNo");
    }
    if (this.ProfileNo == null || this.ProfileNo == undefined || this.ProfileNo == '') {
      this.dataService.ConfigforProfileNo().subscribe((data: any) => {
        this.ProfileNo = data;
        Common.setWithExpiry("ProfileNo", this.ProfileNo);
      })
    }
  }
  ConfigforProfileIndex() {
    this.ProfileIndex = this.dataService.Getconfigbykey("ProfileIndex");
    if (this.ProfileIndex == null || this.ProfileIndex == undefined || this.ProfileIndex == '') {
      this.ProfileIndex = Common.getWithExpiry("ProfileIndex");
    }
    if (this.ProfileIndex == null || this.ProfileIndex == undefined || this.ProfileIndex == '') {
      this.dataService.ConfigforProfileIndex().subscribe((data: any) => {
        this.ProfileIndex = data;
        Common.setWithExpiry("ProfileIndex", this.ProfileIndex);
      })
    }
  }

  ConfigforProfileLable() {
    this.ProfileLable = this.dataService.Getconfigbykey("ProfileLable");
    if (this.ProfileLable == null || this.ProfileLable == undefined || this.ProfileLable == '') {
      this.ProfileLable = Common.getWithExpiry("ProfileLable");
    }
    if (this.ProfileLable == null || this.ProfileLable == undefined || this.ProfileLable == '') {
      this.dataService.ConfigforProfileLable().subscribe((data: any) => {
        this.ProfileLable = data;
        Common.setWithExpiry("ProfileLable", this.ProfileLable);
      })
    }
  }

  GetConfigurationforPriceOrLable() {
    this.PriceOrLable = this.dataService.Getconfigbykey("PriceOrLable");
    if (this.PriceOrLable == null || this.PriceOrLable == undefined || this.PriceOrLable == '') {
      this.PriceOrLable = Common.getWithExpiry("PriceOrLable");
    }
    if (this.PriceOrLable == null || this.PriceOrLable == undefined || this.PriceOrLable == '') {
      this.dataService.GetConfigurationforPriceOrLable().subscribe((data: any) => {
        this.PriceOrLable = data;
        Common.setWithExpiry("PriceOrLable", this.PriceOrLable);
      })
    }
  }
  configforstocklable() {
    this.stocklable = this.dataService.Getconfigbykey("stocklable");
    if (this.stocklable == null || this.stocklable == undefined || this.stocklable == '') {
      this.stocklable = Common.getWithExpiry("stocklable");
    }
    if (this.stocklable == null || this.stocklable == undefined || this.stocklable == '') {
      this.dataService.configforstocklable().subscribe((data: any) => {
        this.stocklable = data;
        Common.setWithExpiry("stocklable", this.stocklable);
      })
    }
  }
  configforvendorinproductlist() {
    this.vendorinproductlist = this.dataService.Getconfigbykey("vendorinproductlist");
    if (this.vendorinproductlist == null || this.vendorinproductlist == undefined || this.vendorinproductlist == '') {
      this.vendorinproductlist = Common.getWithExpiry("vendorinproductlist");
    }
    if (this.vendorinproductlist == null || this.vendorinproductlist == undefined || this.vendorinproductlist == '') {
      this.dataService.configforvendorinproductlist().subscribe((data: any) => {
        this.vendorinproductlist = data;
        Common.setWithExpiry("vendorinproductlist", this.vendorinproductlist);
      })
    }
  }
  GetConfigurationforProfilePriceLable() {
    this.ProfilePriceLable = this.dataService.Getconfigbykey("ProfilePriceLable");
    if (this.ProfilePriceLable == null || this.ProfilePriceLable == undefined || this.ProfilePriceLable == '') {
      this.ProfilePriceLable = Common.getWithExpiry("ProfilePriceLable");
    }
    if (this.ProfilePriceLable == null || this.ProfilePriceLable == undefined || this.ProfilePriceLable == '') {
      this.dataService.GetConfigurationforProfilePriceLable().subscribe((data: any) => {
        this.ProfilePriceLable = data;
        Common.setWithExpiry("ProfilePriceLable", this.ProfilePriceLable);
      })
    }
  }
  getListTypeView() {
    // this.ListTypeView =this.dataService.Getconfigbykey("ViewTypeInProductListPage");
    // if (this.ListTypeView == null || this.ListTypeView == undefined || this.ListTypeView =='') {
    this.ListTypeView = Common.getWithExpiry("ListTypeView");
    //}
    if (this.ListTypeView == null || this.ListTypeView == undefined || this.ListTypeView == '') {
      this.dataService.GetConfigurationforViewTypeInProductListPage().subscribe((data: any) => {
        this.ListTypeView = data;
        if (this.ListTypeView == '1') {
          // setTimeout(function () {
          //   $("#grd").click();
          // }, 5000);
        }
        else if (this.ListTypeView == '2') {
          // setTimeout(function () {
          //   $("#lst").click();
          // }, 5000);
        }
        else if (this.ListTypeView == '3') {
          // setTimeout(function () {
          //   $("#tbl1").click();
          // }, 5000);
        }
        else {
          // setTimeout(function () {
          //   $("#grd").click();
          // }, 5000);
        }
        Common.setWithExpiry("ListTypeView", this.ListTypeView);
      })
    }
    else {
      if (this.ListTypeView == '1') {
        // setTimeout(function () {
        //   $("#grd").click();
        // }, 5000);
      }
      else if (this.ListTypeView == '2') {
        // setTimeout(function () {
        //   $("#lst").click();
        // }, 5000);
      }
      else if (this.ListTypeView == '3') {
        // setTimeout(function () {
        //   $("#tbl1").click();
        // }, 5000);
      }
      else {
        // setTimeout(function () {
        //   $("#grd").click();
        // }, 5000);
      }
    }
  }
  GetConfigForAddToCartAsPerProfile() {
    this.configforcartbyprofile = this.dataService.Getconfigbykey("AddToCartAsPerProfile");
    if (this.configforcartbyprofile == null || this.configforcartbyprofile == undefined || this.configforcartbyprofile == '') {
      this.configforcartbyprofile = Common.getWithExpiry("configforcartbyprofile");
    }
    if (this.configforcartbyprofile == null || this.configforcartbyprofile == undefined || this.configforcartbyprofile == '') {
      this.dataService.GetConfigForAddToCartAsPerProfile().subscribe((res: any) => {
        this.configforcartbyprofile = res;
        if (this.configforcartbyprofile == '1') {
          this.GetGetAddToCartAsPerProfileNo();
          this.GetAddToCartAsPerProfileArrayNo();
        }
        Common.setWithExpiry("configforcartbyprofile", this.configforcartbyprofile);
      });
    }
    else {
      if (this.configforcartbyprofile == '1') {
        this.GetGetAddToCartAsPerProfileNo();
        this.GetAddToCartAsPerProfileArrayNo();
      }
    }
  }
  GetGetAddToCartAsPerProfileNo() {
    this.AddToCartAsPerProfileNo = this.dataService.Getconfigbykey("AddToCartAsPerProfileNo");
    if (this.AddToCartAsPerProfileNo == null || this.AddToCartAsPerProfileNo == undefined || this.AddToCartAsPerProfileNo == '') {
      this.AddToCartAsPerProfileNo = Common.getWithExpiry("AddToCartAsPerProfileNo");
    }
    if (this.AddToCartAsPerProfileNo == null || this.AddToCartAsPerProfileNo == undefined || this.AddToCartAsPerProfileNo == '') {
      this.dataService.GetAddToCartAsPerProfileNo().subscribe((res: any) => {
        this.AddToCartAsPerProfileNo = res;
        Common.setWithExpiry("AddToCartAsPerProfileNo", this.AddToCartAsPerProfileNo);
      });
    }
  }
  GetAddToCartAsPerProfileArrayNo() {
    this.AddToCartAsPerProfileArrayNo = this.dataService.Getconfigbykey("AddToCartAsPerProfileArrayNo");
    if (this.AddToCartAsPerProfileArrayNo == null || this.AddToCartAsPerProfileArrayNo == undefined || this.AddToCartAsPerProfileArrayNo == '') {
      this.AddToCartAsPerProfileArrayNo = Common.getWithExpiry("AddToCartAsPerProfileArrayNo");
    }
    if (this.AddToCartAsPerProfileArrayNo == null || this.AddToCartAsPerProfileArrayNo == undefined || this.AddToCartAsPerProfileArrayNo == '') {
      this.dataService.GetAddToCartAsPerProfileArrayNo().subscribe((res: any) => {
        this.AddToCartAsPerProfileArrayNo = res;
        Common.setWithExpiry("AddToCartAsPerProfileArrayNo", this.AddToCartAsPerProfileArrayNo);
      });
    }
  }
  getMinQtySetting() {
    var MinQtySetting = this.dataService.Getconfigbykey("MinQty");
    if (MinQtySetting == null || MinQtySetting == undefined || MinQtySetting == '') {
      MinQtySetting = Common.getWithExpiry("MinQtySetting");
    }
    if (MinQtySetting == null || MinQtySetting == undefined || MinQtySetting == '') {
      this.dataService.MinQtySetting().subscribe((data: any) => {
        var dd = data;
        Common.setWithExpiry("MinQtySetting", dd);
        if (dd == "1") {
          this.MinQty = true;
        }
        else {
          this.MinQty = false;
        }
      });
    }
    else {
      if (MinQtySetting == "1") {
        this.MinQty = true;
      }
      else {
        this.MinQty = false;
      }
    }
  }
  getMaxQtySetting() {
    var MaxQtySetting = this.dataService.Getconfigbykey("MaxQty");
    if (MaxQtySetting == null || MaxQtySetting == undefined || MaxQtySetting == '') {
      MaxQtySetting = Common.getWithExpiry("MaxQtySetting");
    }
    if (MaxQtySetting == null || MaxQtySetting == undefined || MaxQtySetting == '') {
      this.dataService.MaxQtySetting().subscribe((data: any) => {
        var dd = data;
        Common.setWithExpiry("MaxQtySetting", dd);
        if (dd == "1") {
          this.MaxQty = true;
        }
        else {
          this.MaxQty = false;
        }
      });
    }
    else {
      if (MaxQtySetting == "1") {
        this.MaxQty = true;
      }
      else {
        this.MaxQty = false;
      }
    }
  }
  get3dsetting() {
    this.show3D = this.dataService.Getconfigbykey("Show3D");
    if (this.show3D == null || this.show3D == undefined || this.show3D == '') {
      this.show3D = Common.getWithExpiry("show3D");
    }
    if (this.show3D == null || this.show3D == undefined || this.show3D == '') {
      this.dataService.Get3DSetting().subscribe((res: any) => {
        this.show3D = res;
        Common.setWithExpiry("show3D", this.show3D);
      });
    }
  }
  getconfigurationforups() {
    this.showups = this.dataService.Getconfigbykey("UPSshow");
    if (this.showups == null || this.showups == undefined || this.showups == '') {
      this.showups = Common.getWithExpiry("showups");
    }
    if (this.showups == null || this.showups == undefined || this.showups == '') {
      this.dataService.Getconfigurationfroups().subscribe((res: any) => {
        this.showups = res;
        Common.setWithExpiry("showups", this.showups);
      });
    }
  }
  getIsMuscle() {
    this.IsMuscle = this.dataService.Getconfigbykey("IsMuscle");
    if (this.IsMuscle == null || this.IsMuscle == undefined || this.IsMuscle == '') {
      this.IsMuscle = Common.getWithExpiry("IsMuscle");
    }
    if (this.IsMuscle == null || this.IsMuscle == undefined || this.IsMuscle == '') {
      this.dataService.GetConfigForIsMuscle().subscribe((data: any) => {
        this.IsMuscle = data;
        Common.setWithExpiry("IsMuscle", this.IsMuscle);
      })
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
  getbaseitemShow() {
    this.baseitemShow = this.dataService.Getconfigbykey("baseitemShow");
    if (this.baseitemShow == null || this.baseitemShow == undefined || this.baseitemShow == '') {
      this.baseitemShow = Common.getWithExpiry("baseitemShow");
    }
    if (this.baseitemShow == null || this.baseitemShow == undefined || this.baseitemShow == '') {
      this.dataService.Getthebaseitemconfiguration().subscribe((data: any) => {
        this.baseitemShow = data;
        Common.setWithExpiry("baseitemShow", this.baseitemShow);
      })
    }
  }
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
  getProductlineshow() {
    this.Productlineshow = this.dataService.Getconfigbykey("prodlineindetail");
    if (this.Productlineshow == null || this.Productlineshow == undefined || this.Productlineshow == '') {
      this.Productlineshow = Common.getWithExpiry("Productlineshow");
    }
    if (this.Productlineshow == null || this.Productlineshow == undefined || this.Productlineshow == '') {
      this.dataService.GetConfigForProductlineshow().subscribe((data: any) => {
        this.Productlineshow = data;
        Common.setWithExpiry("Productlineshow", this.Productlineshow);
      })
    }
  }
  GetConfigFortreesort() {
    this.treesort = this.dataService.Getconfigbykey("treesequence");
    if (this.treesort == null || this.treesort == undefined || this.treesort == '') {
      this.treesort = Common.getWithExpiry("treesort");
    }
    if (this.treesort == null || this.treesort == undefined || this.treesort == '') {
      this.dataService.GetConfigFortreesort().subscribe((data: any) => {
        this.treesort = data;
        Common.setWithExpiry("treesort", this.treesort);
      })
    }
  }


  getInprocesstoforlist() {
    this.dataService.GetItemInProcesstolist(this.inprocesslist).subscribe((data: any) => {
      var getdatac = data;
      if (getdatac != undefined && getdatac != null && getdatac.length > 0) {
        for (let index = 0; index < this.productList1.length; index++) {
          this.productList1[index].inprocess = 0;
          for (let j = 0; j < getdatac.length; j++) {
            if (this.productList1[index].itemname == getdatac[j].item) {
              this.productList1[index].inprocess = this.productList1[index].inprocess + getdatac[j].q_comm_d;
            }

          }
        }
      }
    });
  }


  GetInprocessto(product) {
    var customer = Common.getWithExpiry("CustID");
    var sshipid = Common.getWithExpiry("UserID");
    product.inprocess = 0;

    this.dataService.GetItemInProcessto(product.itemname, sshipid, customer).subscribe((data: any) => {
      var getdatac = data;
      if (getdatac != null && getdatac != undefined && getdatac.length > 0) {
        for (let index = 0; index < getdatac.length; index++) {
          product.inprocess = product.inprocess + getdatac[index].q_comm_d;
        }
      }
      else {
        this.toastr.error("Data Not Found...");
      }
    })

  }


  getMultiplyQtySetting() {
    this.Multiply = this.dataService.Getconfigbykey("Multiply");
    if (this.Multiply == null || this.Multiply == undefined || this.Multiply == '') {
      this.Multiply = Common.getWithExpiry("Multiply");
    }
    if (this.Multiply == null || this.Multiply == undefined || this.Multiply == '') {
      this.dataService.MultiplySetting().subscribe((data: any) => {
        this.Multiply = data;
        Common.setWithExpiry("Multiply", this.Multiply);
      });
    }
  }
  copyMessage(val: string) {
    try{
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success("Copied to Clipboard")
    }catch(ed){}
  }
  getfirstpagelist() {
    this.route.params.subscribe(params => {
      this.productdetailsforlist = null;
      this.titleheader1 = null;
      this.productName = this.route.snapshot.paramMap.get('productName');
      //      var satanga = this.route.snapshot.paramMap.get('satanga');
      this.category = this.route.snapshot.paramMap.get('category');
      this.searchText = this.route.snapshot.paramMap.get('searchtext');
      this.Asearch = this.route.snapshot.paramMap.get('asearch');
      var satanga = Common.getWithExpiry('selecctedsatags');
      if ((this.productName == undefined || this.productName == null || this.productName == '') && (this.category == undefined || this.category == null || this.category == '')) {
        this.productName = Common.getWithExpiry('selectedprod_line');
      }
      if ((this.productName == undefined || this.productName == null || this.productName == '') && (this.category == undefined || this.category == null || this.category == '')) {
        this.category = Common.getWithExpiry('selectedtreenode');
      }
//      else 
      //if (this.category == undefined || this.category == null || this.category == '') 
     // {
      //  if (this.category == undefined || this.category == null || this.category == '') {
        //this.category = Common.getWithExpiry('selectedtreenode');
       // }

      //}
      
      var selectedmaj_class = Common.getWithExpiry('selectedmaj_class');
      var selectedprod_line = Common.getWithExpiry('selectedprod_line');
      var selectedtreenode = Common.getWithExpiry('selectedtreenode');

      if (this.category != undefined && this.category != null && this.category != '') {
        this.pptype = 1;
        this.dataService.getproductdetailforlist('1', this.category).subscribe((res: any) => {
          this.productdetailsforlist = res;
          this.seoService.createLinkForCanonicalURLforproduct(encodeURIComponent(this.productdetailsforlist[0].tree_node) + '/' + this.productdetailsforlist[0].name.replace(/[^A-Z0-9]/ig, "-").replace(/---/g, '-').replace(/--/g, '-'));
          this.seoService.setPageTitle(this.productdetailsforlist[0].title_tag);
          this.seoService.setkeywords(this.productdetailsforlist[0].meta);
          this.seoService.setdescription(this.productdetailsforlist[0].seodescr);
        });
      }
      else if (this.productName != undefined && this.productName != null && this.productName != '') {
        this.pptype = 2;
        this.dataService.getproductdetailforlist('2', this.productName).subscribe((res: any) => {
          this.productdetailsforlist = res;
          
          this.seoService.createLinkForCanonicalURLforproduct(encodeURIComponent(this.productdetailsforlist[0].product_line) + '/' + this.productdetailsforlist[0].descr.replace(/[^A-Z0-9]/ig, "-").replace(/---/g, '-').replace(/--/g, '-'));
          this.seoService.setPageTitle(this.productdetailsforlist[0].title_tag);
          this.seoService.setkeywords(this.productdetailsforlist[0].meta);
          this.seoService.setdescription(this.productdetailsforlist[0].seodescr);
        });
      }
      else if (selectedmaj_class != undefined && selectedmaj_class != null && selectedmaj_class != '') {
        this.pptype = 3;
        this.dataService.getproductdetailforlist('3', selectedmaj_class).subscribe((res: any) => {
          this.productdetailsforlist = res;
        });
      }

      // if(satanga != undefined && satanga !=null && satanga !='' && satanga.length>0){
      // satanga=satanga.replace('[','').replace(']','').replace(/"/ig,'');
      // }      

      if (this.Asearch != undefined && this.Asearch != null && this.Asearch != '') {
        this.getProductListByAdvance();
        var geturl = Common.getWithExpiry("cpname");
        geturl = "ADVANCED SEARCH" + ' - ' + geturl;
        this.seoService.setPageTitle(geturl);

      }
      else if (this.searchText != undefined && this.searchText != null && this.searchText != '') {
        this.pageNo = 1;
        this.getProductListBySearchCount(this.searchText);
        this.titleheader = this.searchText;
        var geturl = Common.getWithExpiry("cpname");
        geturl = this.titleheader + ' - ' + geturl;
        this.seoService.setPageTitle(geturl);
        this.seoService.setnoindextag();

        this.searchText = '';
      }
      else if (((this.productName != undefined && this.productName != null && this.productName != '') || (satanga != undefined && satanga != null && satanga != '' && satanga.length > 2)) && (this.category == undefined || this.category == '')) {
        this.pageNo = 1;
        this.getProductListToDisplayCount('', this.productName, satanga);
        this.titleheader = this.productName;
        this.Getcategoriespath(this.productName, 1)
      }
      else if (((this.category != undefined && this.category != null && this.category != '') || (satanga != undefined && satanga != null && satanga != '' && satanga.length > 2)) && (this.productName == undefined || this.productName == '')) {
        this.pageNo = 1;

        this.getProductListToDisplayCount(this.category, '', satanga);
        this.titleheader = this.category;
        this.Getcategoriespath(this.category, 2)
      }

      else {
        this.pageNo = 1;
        this.getProductListBySearchCount(this.searchText);
        this.titleheader = this.searchText;
        var geturl = Common.getWithExpiry("cpname");
        geturl = this.titleheader + ' - ' + geturl;
        if (this.productdetailsforlist == undefined || this.productdetailsforlist == null || this.productdetailsforlist.length == 0 || this.productdetailsforlist[0].title_tag == undefined || this.productdetailsforlist[0].title_tag == null || this.productdetailsforlist[0].title_tag == '') {
          this.seoService.setPageTitle(geturl);
        }

        this.searchText = '';
        this.titleheader = "Product";
      }
    });
  }


  getwithloginprice() {
    this.withloginprice = this.dataService.Getconfigbykey("withloginprice");
    if (this.withloginprice == null || this.withloginprice == undefined || this.withloginprice == '') {
      this.withloginprice = Common.getWithExpiry("withloginprice");
    }
    if (this.withloginprice == null || this.withloginprice == undefined || this.withloginprice == '') {
      this.dataService.withloginprice().subscribe((res: any) => {
        this.withloginprice = res;
        Common.setWithExpiry("withloginprice", this.withloginprice);
        if (this.withloginprice == '1') {
          this.getwithloginpricelist();
        }
      });
    }
    else {
      if (this.withloginprice == '1') {
        this.getwithloginpricelist();
      }
    }
  }
  getwithloginpricelist() {
    this.withloginpricelist = this.dataService.Getconfigbykey("withloginpricelist");
    if (this.withloginpricelist == null || this.withloginpricelist == undefined || this.withloginpricelist == '') {
      this.withloginpricelist = Common.getWithExpiry("withloginpricelist");
    }
    if (this.withloginpricelist == null || this.withloginpricelist == undefined || this.withloginpricelist == '') {
      this.dataService.withloginpricelist().subscribe((res: any) => {
        this.withloginpricelist = res;
        Common.setWithExpiry("withloginpricelist", this.withloginpricelist);
      });
    }
  }
  GetConfigfordecimalpoints() {
    this.decimalpoints = this.dataService.Getconfigbykey("decimalpoints");
    if (this.decimalpoints == null || this.decimalpoints == undefined || this.decimalpoints == '') {
      this.decimalpoints = Common.getWithExpiry("decimalpoints");
    }
    if (this.decimalpoints == null || this.decimalpoints == undefined || this.decimalpoints == '') {
      this.dataService.GetConfigfordecimalpoints().subscribe((res: any) => {
        this.decimalpoints = res;
        Common.setWithExpiry("decimalpoints", this.decimalpoints);
      });
    }
  }
  getwithloginavailshow() {
    this.withloginavailshow = this.dataService.Getconfigbykey("withloginavailshow");
    if (this.withloginavailshow == null || this.withloginavailshow == undefined || this.withloginavailshow == '') {
      this.withloginavailshow = Common.getWithExpiry("withloginavailshow");
    }
    if (this.withloginavailshow == null || this.withloginavailshow == undefined || this.withloginavailshow == '') {
      this.dataService.withloginavailshow().subscribe((res: any) => {
        this.withloginavailshow = res;
        Common.setWithExpiry("withloginavailshow", this.withloginavailshow);
        if (this.withloginavailshow == '1') {
          this.getwithloginavaillist();
          this.getwithloginavailqty();
        }
      });
    }
    else {
      if (this.withloginavailshow == '1') {
        this.getwithloginavaillist();
        this.getwithloginavailqty();
      }
    }
  }
  getwithloginavaillist() {
    this.withloginavaillist = this.dataService.Getconfigbykey("withloginavaillist");
    if (this.withloginavaillist == null || this.withloginavaillist == undefined || this.withloginavaillist == '') {
      this.withloginavaillist = Common.getWithExpiry("withloginavaillist");
    }
    if (this.withloginavaillist == null || this.withloginavaillist == undefined || this.withloginavaillist == '') {
      this.dataService.withloginavaillist().subscribe((res: any) => {
        this.withloginavaillist = res;
        Common.setWithExpiry("withloginavaillist", this.withloginavaillist);
      });
    }
  }
  getwithloginavailqty() {
    this.withloginavailqty = this.dataService.Getconfigbykey("withloginavailqty");
    if (this.withloginavailqty == null || this.withloginavailqty == undefined || this.withloginavailqty == '') {
      this.withloginavailqty = Common.getWithExpiry("withloginavailqty");
    }
    if (this.withloginavailqty == null || this.withloginavailqty == undefined || this.withloginavailqty == '') {
      this.dataService.withloginavailqty().subscribe((res: any) => {
        this.withloginavailqty = res;
        Common.setWithExpiry("withloginavailqty", this.withloginavailqty);
      });
    }
  }
  getpriceshow() {
    this.priceshow = this.dataService.Getconfigbykey("withoutloginpriceshow");
    if (this.priceshow == null || this.priceshow == undefined || this.priceshow == '') {
      this.priceshow = Common.getWithExpiry("priceshow");
    }
    if (this.priceshow == null || this.priceshow == undefined || this.priceshow == '') {
      this.dataService.GetConfidForanonymoususersPriceshow().subscribe((res: any) => {
        this.priceshow = res;
        Common.setWithExpiry("priceshow", this.priceshow);
        if (this.priceshow == '1') {
          this.getlistprice();
        }

      });
    }
    else {
      if (this.priceshow == '1') {
        this.getlistprice();
      }
    }
  }
  getlistprice() {
    this.listprice = this.dataService.Getconfigbykey("withoutloginpricelist");
    if (this.listprice == null || this.listprice == undefined || this.listprice == '') {
      this.listprice = Common.getWithExpiry("listprice");
    }
    if (this.listprice == null || this.listprice == undefined || this.listprice == '') {
      this.dataService.GetConfidForlistprice().subscribe((res: any) => {
        this.listprice = res;
        Common.setWithExpiry("listprice", this.listprice);
      });
    }
  }

  getannastock() {
    this.annastock = this.dataService.Getconfigbykey("withoutloginavailqty");
    if (this.annastock == null || this.annastock == undefined || this.annastock == '') {
      this.annastock = Common.getWithExpiry("annastock");
    }
    if (this.annastock == null || this.annastock == undefined || this.annastock == '') {
      this.dataService.anonymoususersIsstock().subscribe((res: any) => {
        this.annastock = res;
        Common.setWithExpiry("annastock", this.annastock);
      });
    }
  }
  getwithoutloginavaillist() {
    this.withoutloginavaillist = this.dataService.Getconfigbykey("withoutloginavaillist");
    if (this.withoutloginavaillist == null || this.withoutloginavaillist == undefined || this.withoutloginavaillist == '') {
      this.withoutloginavaillist = Common.getWithExpiry("withoutloginavaillist");
    }
    if (this.withoutloginavaillist == null || this.withoutloginavaillist == undefined || this.withoutloginavaillist == '') {
      this.dataService.withoutloginavaillist().subscribe((res: any) => {
        this.withoutloginavaillist = res;
        Common.setWithExpiry("withoutloginavaillist", this.withoutloginavaillist);
      });
    }
  }
  getAddZero() {
    this.AddZero = this.dataService.Getconfigbykey("AddZeroValue");
    if (this.AddZero == null || this.AddZero == undefined || this.AddZero == '') {
      this.AddZero = Common.getWithExpiry("AddZero");
    }
    if (this.AddZero == null || this.AddZero == undefined || this.AddZero == '') {
      this.dataService.GetConfigForZeroPrice().subscribe((res: any) => {
        this.AddZero = res;
        Common.setWithExpiry("AddZero", this.AddZero);
      });
    }
  }
  getannavail() {
    this.annavail = this.dataService.Getconfigbykey("withoutloginavailshow");
    if (this.annavail == null || this.annavail == undefined || this.annavail == '') {
      this.annavail = Common.getWithExpiry("annavail");
    }
    if (this.annavail == null || this.annavail == undefined || this.annavail == '') {
      this.dataService.anonymoususersavailable().subscribe((res: any) => {
        this.annavail = res;
        Common.setWithExpiry("annavail", this.annavail);
        if (this.annavail == '1') {
          this.getannastock();
          this.getwithoutloginavaillist();
        }

      });
    }
    else {
      if (this.annavail == '1') {
        this.getannastock();
        this.getwithoutloginavaillist();
      }
    }
  }


  openproductpageinnewwindow(product) {
    //[routerLink]="['/productdetail', product.itemname,product.links]"
    this.Setitemname(product.itemname);
    //this.router.navigate(['/productdetail', product.itemname,product.links]);
    const angularRoute = this.router.url;
    const url = window.location.href;
    const domainAndApp = url.replace(angularRoute, '');
    var link = domainAndApp + '/productdetail/' + encodeURIComponent(product.itemname);
    this.router.navigate([]).then(result => { window.open(link, '_blank'); });
    // const angularRoute = this.router.url;
    // const url = window.location.href;

    // const domainAndApp = url.replace(angularRoute, '');
    // window.open(domainAndApp + '/productdetail/' + encodeURIComponent(product.itemname) + '/' + encodeURIComponent(product.links), '_blank');

    // this.router.
    // window.open(product.links, '_blank');
  }


  catclick(treeNode, name) {
    var getstrs1 = treeNode.split(',');
    if (getstrs1[0] == "category") {
      Common.setWithExpiry('selectedmaj_class', '');
      Common.setWithExpiry('selectedprod_line', getstrs1[1]);
      Common.setWithExpiry('selectedtreenode', '');
      Common.setWithExpiry('selectedsearch', '');
      //this.router.navigate(['/product', getstrs1[1].toLowerCase()]);
    }
    else if (getstrs1[0] == "Products") {
      //this.router.navigate(['/product']);
    }
    else {
      Common.setWithExpiry('selectedmaj_class', '');
      Common.setWithExpiry('selectedprod_line', '');
      Common.setWithExpiry('selectedtreenode', treeNode);
      Common.setWithExpiry('selectedsearch', '');
      //this.router.navigate(['/categories', treeNode.toLowerCase()]);
    }
  }
  closewishbox() {
    this.iswish = false;
    //$('body').removeClass('popup-open');
  }
  closerfqbox() {
    this.isrfq = false;
    //$('body').removeClass('popup-open');
  }
  createnewlist() {
    this.router.navigate(['/wishlist', this.currentitem.itemname.toLowerCase()]);
    //$('body').removeClass('popup-open');
  }
  createnewrfqlist() {
    this.router.navigate(['/rfqlist', this.currentitem.itemname.toLowerCase(),'']);
    //$('body').removeClass('popup-open');
  }

  AddtowishList(WishlistID) {
    this.currentitem.quantity = 1;
    if (this.currentitem.qty_warn != 0 && this.Multiply == '1') {
      this.currentitem.quantity = this.currentitem.qty_warn / this.currentitem.um_displayQty;
      this.toastr.error("item will be added in multiple of " + this.currentitem.quantity + ' of ' + this.getumdescbyumcode(this.currentitem.um_display));
    }
    if (this.currentitem.min != undefined && this.currentitem.min != "0" && this.currentitem.quantity < this.currentitem.min && this.MinQty) {
      this.currentitem.quantity = this.currentitem.min;
      this.toastr.error("Minimum quantity should be " + this.currentitem.min + ' of ' + this.getumdescbyumcode(this.currentitem.um_display));
      //return;
    }

    if (this.currentitem.max != undefined && this.currentitem.max != "0" && this.currentitem.quantity > this.currentitem.max && this.MaxQty) {
      this.toastr.error("Maximum quantity should be " + this.currentitem.max + ' of ' + this.getumdescbyumcode(this.currentitem.um_display));
      return;
    }
    this.dataService.AddProducttowishlist(null, WishlistID, this.currentitem.itemname, this.currentitem.quantity).subscribe((res: any) => {
      var results = res;
      if (results) {
        this.toastr.success("Product Added to " + this.wishlistlable, 'Message!');
      }
      else {
        this.toastr.error("Product Already Exist", 'Message!');
      }
    });

  }
  AddtonewrfqList(WishlistID) {
    this.currentitem.quantity = 1;
    if (this.currentitem.qty_warn != 0 && this.Multiply == '1') {
      this.currentitem.quantity = this.currentitem.qty_warn / this.currentitem.um_displayQty;
      this.toastr.error("item will be added in multiple of " + this.currentitem.quantity + ' of ' + this.getumdescbyumcode(this.currentitem.um_display));
    }
    if (this.currentitem.min != undefined && this.currentitem.min != "0" && this.currentitem.quantity < this.currentitem.min && this.MinQty) {
      this.currentitem.quantity = this.currentitem.min;
      this.toastr.error("Minimum quantity should be " + this.currentitem.min + ' of ' + this.getumdescbyumcode(this.currentitem.um_display));
      //return;
    }

    if (this.currentitem.max != undefined && this.currentitem.max != "0" && this.currentitem.quantity > this.currentitem.max && this.MaxQty) {
      this.toastr.error("Maximum quantity should be " + this.currentitem.max + ' of ' + this.getumdescbyumcode(this.currentitem.um_display));
      return;
    }
    this.dataService.AddProducttowishlist(null, WishlistID, this.currentitem.itemname, this.currentitem.quantity).subscribe((res: any) => {
      var results = res;
      if (results) {
        this.toastr.success("Product Added to your quote", 'Message!');
      }
      else {
        this.toastr.error("Product Already Exist", 'Message!');
      }
    });

  }
  AddtoList(product) {

    this.currentitem = product;
    this.iswish = true;
    //$('body').addClass('popup-open');
  }
  openpopup(){
    this.isrfq = false;
  }
  AddtorfqList(product) {
    if(this.isLoggedIn){
    this.currentitem = product;
    this.isrfq = true;
    }
    else{
      this.toastr.error("Login to Add to RFQ List")
      this.router.navigate(['/login']);
    }
    //$('body').addClass('popup-open');
  }
  getwishlist() {
    this.dataService.GetUserwishlist(Common.getWithExpiry("CustID"), 1).subscribe((res: any) => {
      this.userwishlist = res;
    });
  }
  getRfqlist() {
    this.dataService.GetUserwishlist(Common.getWithExpiry("CustID"), 2).subscribe((res: any) => {
      this.userrfqlist = res;
    });
  }
  getqtymsg() {
    this.qtymsg = Common.getWithExpiry("qtymsg");
    if (this.qtymsg == null || this.qtymsg == undefined || this.qtymsg == '') {
      this.dataService.msgdisplayforavaibility().subscribe((res: any) => {
        this.qtymsg = res;
        Common.setWithExpiry("qtymsg", this.qtymsg);
      });
    }
  }
  getDimensions() {
    this.isDimensions = this.dataService.Getconfigbykey("Dimensions");
    if (this.isDimensions == null || this.isDimensions == undefined || this.isDimensions == '') {
      this.isDimensions = Common.getWithExpiry("isDimensions");
    }
    if (this.isDimensions == null || this.isDimensions == undefined || this.isDimensions == '') {
      this.dataService.GetConfigForDimensions().subscribe((res: any) => {
        this.isDimensions = res;
        Common.setWithExpiry("isDimensions", this.isDimensions);
      });
    }
  }
  getpricemsg() {
    this.pricemsg = this.dataService.Getconfigbykey("pricemsg");
    if (this.pricemsg == null || this.pricemsg == undefined || this.pricemsg == '') {
      this.pricemsg = Common.getWithExpiry("pricemsg");
    }
    if (this.pricemsg == null || this.pricemsg == undefined || this.pricemsg == '') {
      this.dataService.msgdisplayforprice().subscribe((res: any) => {
        this.pricemsg = res;
        Common.setWithExpiry("pricemsg", this.pricemsg);
      });
    }
  }
  getqtymsgwithoutlogin() {
    this.qtymsgwithoutlogin = this.dataService.Getconfigbykey("qtymsgwithoutlogin");
    if (this.qtymsgwithoutlogin == null || this.qtymsgwithoutlogin == undefined || this.qtymsgwithoutlogin == '') {
      this.qtymsgwithoutlogin = Common.getWithExpiry("qtymsgwithoutlogin");
    }
    if (this.qtymsgwithoutlogin == null || this.qtymsgwithoutlogin == undefined || this.qtymsgwithoutlogin == '') {
      this.dataService.qtymsgwithoutlogin().subscribe((res: any) => {
        this.qtymsgwithoutlogin = res;
        Common.setWithExpiry("qtymsgwithoutlogin", this.qtymsgwithoutlogin);
      });
    }
  }
  getpricemsgwithoutlogin() {
    this.pricemsgwithoutlogin = this.dataService.Getconfigbykey("pricemsgwithoutlogin");
    if (this.pricemsgwithoutlogin == null || this.pricemsgwithoutlogin == undefined || this.pricemsgwithoutlogin == '') {
      this.pricemsgwithoutlogin = Common.getWithExpiry("pricemsgwithoutlogin");
    }
    if (this.pricemsgwithoutlogin == null || this.pricemsgwithoutlogin == undefined || this.pricemsgwithoutlogin == '') {
      this.dataService.pricemsgwithoutlogin().subscribe((res: any) => {
        this.pricemsgwithoutlogin = res;
        Common.setWithExpiry("pricemsgwithoutlogin", this.pricemsgwithoutlogin);
      });
    }
  }
  getaddtonotavail() {
    this.addtonotavail = this.dataService.Getconfigbykey("addifunavail");
    if (this.addtonotavail == null || this.addtonotavail == undefined || this.addtonotavail == '') {
      this.addtonotavail = Common.getWithExpiry("addtonotavail");
    }
    if (this.addtonotavail == null || this.addtonotavail == undefined || this.addtonotavail == '') {
      this.dataService.GetConfigForisaddifunavail().subscribe((res: any) => {
        this.addtonotavail = res;
        Common.setWithExpiry("addtonotavail", this.addtonotavail);
      });
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
  getitlableconfig() {
    this.itlable = this.dataService.Getconfigbykey("ItemLable");
    if (this.itlable == null || this.itlable == undefined || this.itlable == '') {
      this.itlable = Common.getWithExpiry("itlable");
    }
    if (this.itlable == null || this.itlable == undefined || this.itlable == '') {
      this.dataService.Getconfigforitemlable().subscribe((res: any) => {
        this.itlable = res;
        Common.setWithExpiry("itlable", this.itlable);
      });
    }
  }
  getSequenceconfig() {
    this.Sequencelable = this.dataService.Getconfigbykey("Sequencelable");
    if (this.Sequencelable == null || this.Sequencelable == undefined || this.Sequencelable == '') {
      this.Sequencelable = Common.getWithExpiry("Sequencelable");
    }
    if (this.Sequencelable == null || this.Sequencelable == undefined || this.Sequencelable == '') {
      this.dataService.GetconfigforSequencelable().subscribe((res: any) => {
        this.Sequencelable = res;
        Common.setWithExpiry("Sequencelable", this.Sequencelable);
      });
    }
  }
  getiswishthere() {
    this.isWishthere = this.dataService.Getconfigbykey("wishshowinhover");
    if (this.isWishthere == null || this.isWishthere == undefined || this.isWishthere == '') {
      this.isWishthere = Common.getWithExpiry("isWishthere");
    }
    if (this.isWishthere == null || this.isWishthere == undefined || this.isWishthere == '') {
      this.dataService.showandhidewishinlist().subscribe((res: any) => {
        this.isWishthere = res;
        Common.setWithExpiry("isWishthere", this.isWishthere);
      });
    }
  }
  getiscartthere() {
    this.iscartthere = this.dataService.Getconfigbykey("Addtocartinhover");
    if (this.iscartthere == null || this.iscartthere == undefined || this.iscartthere == '') {
      this.iscartthere = Common.getWithExpiry("iscartthere");
    }
    if (this.iscartthere == null || this.iscartthere == undefined || this.iscartthere == '') {
      this.dataService.showandhidecartinlist().subscribe((res: any) => {
        this.iscartthere = res;
        Common.setWithExpiry("iscartthere", this.iscartthere);
      });
    }
  }
  getisrfqthere() {
    this.isrfqthere = this.dataService.Getconfigbykey("showandhiderfqinlist");
    if (this.isrfqthere == null || this.isrfqthere == undefined || this.isrfqthere == '') {
      this.isrfqthere = Common.getWithExpiry("isrfqthere");
    }
    if (this.isrfqthere == null || this.isrfqthere == undefined || this.isrfqthere == '') {
      this.dataService.showandhiderfqinlist().subscribe((res: any) => {
        this.isrfqthere = res;
        Common.setWithExpiry("isrfqthere", this.isrfqthere);
      });
    }
  }
  getsy_prof_label() {
    this.sy_prof_label = Common.getWithExpiry("sy_prof_label");
    if (this.sy_prof_label == undefined || this.sy_prof_label == null || this.sy_prof_label.length == 0) {
      this.dataService.Getsy_prof_label().subscribe((res: any) => {
        this.sy_prof_label = res;
        Common.setWithExpiry("sy_prof_label", this.sy_prof_label);
      });
    }
  }
  getisprofiledesc() {
    this.isprofiledesc = this.dataService.Getconfigbykey("isprofiledesc");
    if (this.isprofiledesc == null || this.isprofiledesc == undefined || this.isprofiledesc == '') {
      this.isprofiledesc = Common.getWithExpiry("isprofiledesc");
    }
    if (this.isprofiledesc == null || this.isprofiledesc == undefined || this.isprofiledesc == '') {
      this.dataService.GetConfigforisprofiledesc().subscribe((res: any) => {
        this.isprofiledesc = res;
        Common.setWithExpiry("isprofiledesc", this.isprofiledesc);
      });
    }

  }
  getprofilenoforitemdesc() {
    this.profilenoforitemdesc = this.dataService.Getconfigbykey("profilenoforitemdesc");
    if (this.profilenoforitemdesc == null || this.profilenoforitemdesc == undefined || this.profilenoforitemdesc == '') {
      this.profilenoforitemdesc = Common.getWithExpiry("profilenoforitemdesc");
    }
    if (this.profilenoforitemdesc == null || this.profilenoforitemdesc == undefined || this.profilenoforitemdesc == '') {
      this.dataService.GetConfigforprofilenoforitemdesc().subscribe((res: any) => {
        this.profilenoforitemdesc = res;
        Common.setWithExpiry("profilenoforitemdesc", this.profilenoforitemdesc);
      });
    }
  }
  getarraynoforitemdesc() {
    var arraynoforitemdesc = this.dataService.Getconfigbykey("arraynoforitemdesc");
    if (arraynoforitemdesc == null || arraynoforitemdesc == undefined || arraynoforitemdesc == '') {
      arraynoforitemdesc = Common.getWithExpiry("arraynoforitemdesc");
    }
    if (arraynoforitemdesc == null || arraynoforitemdesc == undefined || arraynoforitemdesc == '') {
      this.dataService.GetConfigforarraynoforitemdesc().subscribe((res: any) => {
        this.arraynoforitemdesc = parseInt(res.json());
        Common.setWithExpiry("arraynoforitemdesc", this.arraynoforitemdesc.toString());
      });
    }
    else {
      this.arraynoforitemdesc = parseInt(arraynoforitemdesc);
    }
  }
  getGuestUserID() {
    this.GuestUserID = this.dataService.Getconfigbykey("GuestUserID");
    if (this.GuestUserID == null || this.GuestUserID == undefined || this.GuestUserID == '') {
      this.GuestUserID = Common.getWithExpiry("GuestUserID");
    }
    if (this.GuestUserID == null || this.GuestUserID == undefined || this.GuestUserID == '') {
      this.dataService.GetConfidForGuestUserID().subscribe((res: any) => {
        this.GuestUserID = res;
        Common.setWithExpiry("GuestUserID", this.GuestUserID);
      });
    }
  }
  getGuestwarehouse() {
    this.Guestwarehouse = Common.getWithExpiry("Guestwarehouse");
    if (this.Guestwarehouse == null || this.Guestwarehouse == undefined || this.Guestwarehouse == '') {
      this.dataService.GetConfidForGuestwarehouse().subscribe((res: any) => {
        this.Guestwarehouse = res;
        Common.setWithExpiry("Guestwarehouse", this.Guestwarehouse);
        this.getfirstpagelist();
      });
    }
    else {
      this.getfirstpagelist();
    }
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
        if (this.isaccesswithlogin == '0') {
          this.router.navigate(['login']);
        }
        else {
          this.getannavail();
          this.getGuestUserID();
          this.getGuestwarehouse();
          this.getpriceshow();
        }
      });
    }
    else {
      if (this.isaccesswithlogin == '0') {
        this.router.navigate(['login']);
      }
      else {
        this.getannavail();
        this.getGuestUserID();
        this.getGuestwarehouse();
        this.getpriceshow();
      }
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
  getStockconfig() {
    this.showstock = this.dataService.Getconfigbykey("withoutloginavailqty");
    if (this.showstock == null || this.showstock == undefined || this.showstock == '') {
      this.showstock = Common.getWithExpiry("showstock");
    }
    if (this.showstock == null || this.showstock == undefined || this.showstock == '') {
      this.dataService.GetConfigForStockShow().subscribe((res: any) => {
        this.showstock = res;
        Common.setWithExpiry("showstock", this.showstock);
      });
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

  newsortingfun() {

    if (this.SortingSetting == "1") {
      this.lowestFirst();
    }
    else if (this.SortingSetting == "2") {
      this.highestFirst();
    }
    else if (this.SortingSetting == "3") {
      //this.AtoZ();
      this.stype = 0;
      this.Position = this.ItemAtoZ;
    }
    else if (this.SortingSetting == "4") {
      this.stype = 1;
      this.Position = this.ItemZtoA;
      //this.ZtoA();
    }
    else if (this.SortingSetting == "5") {
      this.Position = this.DimensionLable;
      this.stype = 17;
      //this.SortByDimensions();
    }
    else if (this.SortingSetting == "6") {
      //this.streesort();
      this.stype = 2;
      this.Position = this.Sequencelable;
    }
    else if (this.SortingSetting == "7") {
      //this.Quantitysortltoh();
      this.stype = 11;
      this.Position = this.LowestQtyFirst;
    }
    else if (this.SortingSetting == "8") {
      //this.Quantitysorthtol();
      this.stype = 12;
      this.Position = this.highestQtyFirst;
    }
    else if (this.SortingSetting == "9") {
      this.stype = 13;
      this.Position = this.descrAtoZ;
      //this.DescrSortsortltoh();
    }
    else if (this.SortingSetting == "10") {
      //this.DescrSortsorthtol();
      this.stype = 14;
      this.Position = this.descrZtoA;
    }
    else if (this.SortingSetting == "11") {
      //this.sa13sortascsorting();
      this.stype = 15;
      this.Position = this.sa13sortasc;
    }
    else if (this.SortingSetting == "12") {
      //this.sa13sortdescsorting();
      this.stype = 16;
      this.Position = this.sa13sortdesc;
    }
    else if (this.SortingSetting == "13") {
      //this.sa13sortdescsorting();
      this.stype = 18;
      this.Position = this.newestfirstsortlabel;
    }
  }

  ngOnInit() {
    // $('.dropdown-menu li a').click(function () {
    //   $("#btnSorting:first-child").text($(this).text());
    //   $("#btnSorting:first-child").val($(this).text());
    // });
    this.gototop();
    if (this.isLoggedIn == false) {
      if (this.isaccesswithlogin == '0') {
        this.router.navigate(['login']);
      }
      else {
        this.getfirstpagelist();
      }
    }

  }
  gotoproduct(product) {

    try {
      //setTimeout(() => {
      document.getElementById(product).scrollIntoView();
      //}, 2000);


      // var element = this.renderer.selectRootElement("#" + product);
      // element.scrollIntoView();
      // let el = document.getElementById("#" +product);
      // el.scrollTop = el.scrollHeight;
    } catch (ed) {

    }
  }

  gototop() {
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
  }


  getSortingSetting() {
    this.SortingSetting = this.dataService.Getconfigbykey("SortingSetting");
    if (this.SortingSetting == null || this.SortingSetting == undefined || this.SortingSetting == '') {
      this.SortingSetting = Common.getWithExpiry("SortingSetting");
    }
    if (this.SortingSetting == null || this.SortingSetting == undefined || this.SortingSetting == '') {
      this.dataService.GetSortingSetting().subscribe((data: any) => {
        this.SortingSetting = data;
        if (this.SortingSetting == "1") {
          this.lowestFirst();
        }
        else if (this.SortingSetting == "2") {
          this.highestFirst();
        }
        else if (this.SortingSetting == "3") {
          //this.AtoZ();
          this.stype = 0;
          this.Position = this.ItemAtoZ;
        }
        else if (this.SortingSetting == "4") {
          this.stype = 1;
          this.Position = this.ItemZtoA;
          //this.ZtoA();
        }
        else if (this.SortingSetting == "5") {
          this.Position = this.DimensionLable;
          this.stype = 17;
          //this.SortByDimensions();
        }
        else if (this.SortingSetting == "6") {
          //this.streesort();
          this.stype = 2;
          this.Position = this.Sequencelable;
        }
        else if (this.SortingSetting == "7") {
          //this.Quantitysortltoh();
          this.stype = 11;
          this.Position = this.LowestQtyFirst;
        }
        else if (this.SortingSetting == "8") {
          //this.Quantitysorthtol();
          this.stype = 12;
          this.Position = this.highestQtyFirst;
        }
        else if (this.SortingSetting == "9") {
          this.stype = 13;
          this.Position = this.descrAtoZ;
          //this.DescrSortsortltoh();
        }
        else if (this.SortingSetting == "10") {
          //this.DescrSortsorthtol();
          this.stype = 14;
          this.Position = this.descrZtoA;
        }
        else if (this.SortingSetting == "11") {
          //this.sa13sortascsorting();
          this.stype = 15;
          this.Position = this.sa13sortasc;
        }
        else if (this.SortingSetting == "12") {
          //this.sa13sortdescsorting();
          this.stype = 16;
          this.Position = this.sa13sortdesc;
        }
        else if (this.SortingSetting == "13") {
          //this.sa13sortdescsorting();
          this.stype = 18;
          this.Position = this.newestfirstsortlabel;
        }
      });
    }
    else {
      if (this.SortingSetting == "1") {
        this.lowestFirst();
      }
      else if (this.SortingSetting == "2") {
        this.highestFirst();
      }
      else if (this.SortingSetting == "3") {
        //this.AtoZ();
        this.stype = 0;
        this.Position = this.ItemAtoZ;
      }
      else if (this.SortingSetting == "4") {
        this.stype = 1;
        this.Position = this.ItemZtoA;
        //this.ZtoA();
      }
      else if (this.SortingSetting == "5") {
        this.Position = this.DimensionLable;
        this.stype = 17;
        //this.SortByDimensions();
      }
      else if (this.SortingSetting == "6") {
        //this.streesort();
        this.stype = 2;
        this.Position = this.Sequencelable;
      }
      else if (this.SortingSetting == "7") {
        //this.Quantitysortltoh();
        this.stype = 11;
        this.Position = this.LowestQtyFirst;
      }
      else if (this.SortingSetting == "8") {
        //this.Quantitysorthtol();
        this.stype = 12;
        this.Position = this.highestQtyFirst;
      }
      else if (this.SortingSetting == "9") {
        //this.DescrSortsortltoh();
        this.stype = 13;
        this.Position = this.descrAtoZ;
      }
      else if (this.SortingSetting == "10") {
        //this.DescrSortsorthtol();
        this.stype = 14;
        this.Position = this.descrZtoA;
      }
      else if (this.SortingSetting == "11") {
        //this.sa13sortascsorting();
        this.stype = 15;
        this.Position = this.sa13sortasc;
      }
      else if (this.SortingSetting == "12") {
        //this.sa13sortdescsorting();
        this.stype = 16;
        this.Position = this.sa13sortdesc;
      }
      else if (this.SortingSetting == "13") {
        //this.sa13sortdescsorting();
        this.stype = 18;
        this.Position = this.newestfirstsortlabel;
      }
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
  getPagingSetting() {
    this.pagesize = this.dataService.Getconfigbykey("PagingSetting");
    if (this.pagesize == null || this.pagesize == undefined || this.pagesize == '') {
      this.pagesize = Common.getWithExpiry("pagesize");
    }
    if (this.pagesize == null || this.pagesize == undefined || this.pagesize == '') {
      this.dataService.GetPagingSetting().subscribe((res: any) => {
        this.pagesize = res;
        Common.setWithExpiry("pagesize", this.pagesize);
      });
    }
  }
  setlistview(listvi) {
    this.ListTypeView=listvi;
    Common.setWithExpiry("ListTypeView", listvi);
  }



  Getcategoriespath(param, stype) {
    try {
      if (Common.getWithExpiry('titleheader' + param + '2') != undefined) {
        var titleheader = JSON.parse(Common.getWithExpiry('titleheader' + param + '2'));
      }
    } catch (ed) { }
    if (titleheader == null || titleheader == undefined || titleheader.length == 0) {
      this.dataService.Getcategoriespath(param, stype).subscribe((res: any) => {
        this.titleheader1 = res;
        var geturl = Common.getWithExpiry("cpname");
        for (var i = 0; i < this.titleheader1.length; i++) {
          geturl = this.titleheader1[i].name + ' - ' + geturl;
        }
        if (this.productdetailsforlist == undefined || this.productdetailsforlist == null || this.productdetailsforlist.length == 0 || this.productdetailsforlist[0].title_tag == undefined || this.productdetailsforlist[0].title_tag == null || this.productdetailsforlist[0].title_tag == '') {
          this.seoService.setPageTitle(geturl);
        }

      });
    }
    else {
      this.titleheader1 = titleheader;
      var geturl = Common.getWithExpiry("cpname");
      for (var i = 0; i < this.titleheader1.length; i++) {
        geturl = this.titleheader1[i].name + ' - ' + geturl;
      }
      if (this.productdetailsforlist == undefined || this.productdetailsforlist == null || this.productdetailsforlist.length == 0 || this.productdetailsforlist[0].title_tag == undefined || this.productdetailsforlist[0].title_tag == null || this.productdetailsforlist[0].title_tag == '') {
        this.seoService.setPageTitle(geturl);
      }

    }
  }
  getProductListToDisplayCount(tree_node, BrandProduct, satagsdetails) {

    var wh = (Common.getWithExpiry("warehouse") == undefined ? this.Guestwarehouse : Common.getWithExpiry("warehouse"));
    if (satagsdetails == undefined || satagsdetails == null || satagsdetails == '') {
      satagsdetails = "[]";
    }

    this.dataService.getProductListToDisplayCountNew(tree_node, BrandProduct, wh, satagsdetails, this.unavail).subscribe((res: any) => {
      this.totalLinePage = res;

    });
    this.bindProducts(this.pageNo);

  }

  getBrandProductListCount(productName) {
    var wh = (Common.getWithExpiry("warehouse") == undefined ? this.Guestwarehouse : Common.getWithExpiry("warehouse"));
    this.sendMessage('start');
    this.dataService.getBrandProductListCount(productName, wh).subscribe((res: any) => {
      this.totalLinePage = res;
      this.sendMessage('stop');
      this.bindProducts(this.pageNo);
    });

  }


  getProductListBySearchCount(productName) {
    var wh = (Common.getWithExpiry("warehouse") == undefined ? this.Guestwarehouse : Common.getWithExpiry("warehouse"));
    var getsatags = Common.getWithExpiry("selecctedsatags");
    this.sendMessage('start');
    this.dataService.getProductListBySearchCount(productName, wh, Common.getWithExpiry("CustID"), this.unavail,null).subscribe((res: any) => {
      this.totalLinePage = res;
      this.sendMessage('stop');
      this.bindProducts(this.pageNo);
    });

  }

  getProductListByAdvance() {
    try {
      if (Common.getWithExpiry("searchad") != undefined) {
        var getvari = JSON.parse(Common.getWithExpiry("searchad"));
      }
      var getsatags = Common.getWithExpiry("selecctedsatags");
    } catch (ed) { }
    var serach = {
      keywords: getvari.keywords,
      keytype: getvari.keytype,
      itemnumbers: getvari.itemnumbers,
      productLines: getvari.productLines,
      treeLines: getvari.treeLines,
      otype: getvari.otype,
      customer: Common.getWithExpiry("CustID"),
     
    }
    this.sendMessage('start');
    this.dataService.GetProductAdvanceSearchCount(serach).subscribe((res: any) => {
      this.totalLinePage = res;
      this.sendMessage('stop');
      this.bindProducts(this.pageNo);
    });

  }

  GetNewPageSize() {
    Common.setWithExpiry("pagesize", this.pagesize);
    this.bindProducts(this.pageNo);
  }
  GetNewPageSizeNew(pagesize) {
    this.pagesize = pagesize;
    Common.setWithExpiry("pagesize", this.pagesize);
    this.bindProducts(this.pageNo);
  }

  Setitemname(product) {
    Common.setWithExpiry("itemname", product.itemname);
  }

  Getitemnamefromproduct() {
    var itemname = this.cartService.getitemname();
    if (itemname != undefined && itemname != null) {
      this.gotoproduct(itemname);
    }
  }

  bindProducts(pageNo) {

    Common.setWithExpiry('unavail', this.unavail.toString());

    this.newpageno = this.cartService.getpageno();
    var backflag = this.cartService.getbackflag();
    if (this.newpageno != undefined && this.newpageno != null && backflag != undefined && backflag == '1') {
      pageNo = this.newpageno;
      this.cartService.setbackflag('0');
    }
    var pagesize = this.cartService.getpagesizeno();
    if (pagesize != undefined && pagesize != null) {
      this.pagesize = pagesize;
    }
    if (this.totalLinePage <= this.pagesize) {
      this.newpageno = 1;
      pageNo = 1;
    }
    var stype = this.cartService.getstype();
    if (stype != undefined && stype != null) {
      this.stype = stype;
    }
    var Position = this.cartService.getPosition();
    if (Position != undefined && Position != null) {
      this.Position = Position;
    }


    Common.setWithExpiry("Position", this.Position);
    Common.setWithExpiry("pagesize", this.pagesize);
    Common.setWithExpiry("pageNo", pageNo);
    
    this.pageNo = pageNo;
    this.productName = this.route.snapshot.paramMap.get('productName');
    this.category = this.route.snapshot.paramMap.get('category');
    this.searchText = this.route.snapshot.paramMap.get('searchtext');
    var getsatags = Common.getWithExpiry("selecctedsatags");
    

    // if ((this.productName == undefined || this.productName == null || this.productName == '') && (this.category == undefined || this.category == null || this.category == '')) {
    //   this.productName = Common.getWithExpiry('selectedprod_line');
    // }
    // if ((this.productName == undefined || this.productName == null || this.productName == '') && (this.category == undefined || this.category == null || this.category == '')) {
    //   this.category = Common.getWithExpiry('selectedtreenode');
    // }
    
    // if(getsatags!=undefined && getsatags!=null && getsatags!='' && getsatags.length>0){
    // getsatags=getsatags.replace('[','').replace(']','').replace(/"/ig,'');
    // getsatags=getsatags.replace(/\\/ig,'"').replace(/\\/ig,'"').replace(/\\/ig,'"').replace(/\\/ig,'"').replace(/\\/ig,'"');
    // }    
    
    var wh = (Common.getWithExpiry("warehouse") == undefined ? this.Guestwarehouse : Common.getWithExpiry("warehouse"));
    
    if (this.Asearch != undefined && this.Asearch != null && this.Asearch != '' && (getsatags==undefined || getsatags==null || getsatags=='[]')) {
      try {
        if (Common.getWithExpiry("searchad") != undefined) {
          var searchad = JSON.parse(Common.getWithExpiry("searchad"));
        }
      } catch (ed) { }
      var serach = {
        keywords: searchad.keywords,
        keytype: searchad.keytype,
        itemnumbers: searchad.itemnumbers,
        productLines: searchad.productLines,
        treeLines: searchad.treeLines,
        otype: searchad.otype,
        pageno: this.pageNo,
        pagesize: this.pagesize,
        customer: Common.getWithExpiry("CustID"),
        
      }
      this.sendMessage('start');
      this.dataService.GetProductAdvanceSearch(serach).subscribe((res: any) => {
        // if(this.productList2!=undefined && this.productList2.length>0){
        // this.productList2.push(res);
        // }
        // else{
        //   this.productList2=res;
        // }
        this.productList1=res;
        this.tagmanager();
        this.sendMessage('stop');

        if (this.productList1.length == 0) {
          this.isEmpty = true;
          this.productList = [];
          //this.router.navigate(['categories']);
        }
        else {
          this.getnewproductlist(serach.pageno);
        }
        // }, (error: HttpErrorResponse) => {
        //   this.router.navigateByUrl('404', { skipLocationChange: true })

      });
    }
    else if (this.searchText != undefined && this.searchText != null && this.searchText != '' && (getsatags==undefined || getsatags==null || getsatags=='[]')) {
      this.sendMessage('start');
      this.dataService.getProductListBySearch(this.searchText, pageNo, this.pagesize, wh, this.stype, Common.getWithExpiry("CustID"), this.unavail,null).subscribe((res: any) => {
        // if(this.productList2!=undefined && this.productList2.length>0){
        //   if(res!=undefined && res.length>0){
        //   this.productList2.push(res);
        //   }
        //   }
        //   else{
        //     this.productList2=res;
        //   }
        
          this.productList1=res;
          this.tagmanager();
        this.sendMessage('stop');


        if (this.productList1.length == 0) {
          this.isEmpty = true;
          this.productList = [];
          //this.router.navigate(['categories']);
        }
        else {
          this.getnewproductlist(pageNo);
        }
        // }, (error: HttpErrorResponse) => {
        //   this.router.navigateByUrl('404', { skipLocationChange: true })
      });
    }
    else if (((this.category != undefined && this.category != null && this.category != '') || (getsatags != undefined && getsatags != null && getsatags != '' && getsatags.length > 1))) {
      this.sendMessage('start');
      this.dataService.getProductList(this.category, pageNo, this.pagesize, wh, this.stype, Common.getWithExpiry("CustID"), getsatags, this.unavail).subscribe((res: any) => {
        // if(this.productList2!=undefined && this.productList2.length>0){
        //   this.productList2.push(res);
        //   }
        //   else{
        //     this.productList2=res;
        //   }
          this.productList1=res;
          this.tagmanager();
        this.sendMessage('stop');


        if (this.productList1.length == 0) {
          this.isEmpty = true;
          this.productList = [];
          //this.router.navigate(['categories']);
        }
        else {
          this.getnewproductlist(pageNo);
        }
        // }, (error: HttpErrorResponse) => {
        //   this.router.navigateByUrl('404', { skipLocationChange: true })
      });
    }
    else if (((this.productName != undefined && this.productName != null && this.productName != '' && (this.category==undefined || this.category==null)) || (getsatags != undefined && getsatags != null && getsatags != '' && getsatags.length > 1))) {
      
      this.sendMessage('start');
      this.dataService.getProductListByCategory(this.productName, pageNo, this.pagesize, wh, this.stype, Common.getWithExpiry("CustID"), getsatags, this.unavail).subscribe((res: any) => {
        try{
        // if(this.productList2!=undefined && this.productList2.length>0){
        //   if(res!=undefined && res.length>0){
        //   //this.productList2.push(res);     
        //   this.productList2.push(...res);  
        //   }   
        //   }
        //   else{
        //     this.productList2=res;            
        //   }
          this.productList1=res;
          this.tagmanager();
        }catch(ed){console.log(ed.toString())}
          //this.productList1=res;
        this.sendMessage('stop');

        if (this.productList1.length == 0) {
          this.isEmpty = true;
          this.productList = [];
          //this.router.navigate(['categories']);
        }
        else {
          this.getnewproductlist(pageNo);
        }
        // }, (error: HttpErrorResponse) => {
        //   this.router.navigateByUrl('404', { skipLocationChange: true })
      });
    }
    


    this.gototop();
  }
  public loadScript() {
    try{
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = "";
    script.src = 'assets/js/jquery.sticky-kit.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
    let script1 = document.createElement('script');
    script1.innerHTML = "";
    script1.src = 'assets/js/googlescript.js';
    script1.async = true;
    script1.defer = true;
    body.appendChild(script1);
    }catch(ed){}
  }

  LoginForAddtoQuote(){
    //this.router.navigate(['/login']);
    this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url } });      
  }
  
  getnewproductlist(pageNo) {
    var bulkPrice = [];
    this.inprocesslist = [];
    this.LNpage = pageNo;
    this.itemstoavails = '';
    var getkeywords = '';
    for (let img of this.productList1) {
      try{
              img.profile_2 = JSON.parse(img.profile2);
      }catch(ed){}
      img.itemnameToDisplay = "";
      img.itemnewcheck = "";
      if (this.newItemDate != '' && this.newItemDate != undefined && this.newItemDate != null) {
        var getnewd = new Date(this.newItemDate);
        if (img.last_update != undefined && img.last_update != null && img.last_update != '') {
          img.last_update = new Date(img.last_update);
          if (img.last_update >= getnewd) {
            img.itemnameToDisplay = '* New * ' + img.itemname;
            img.itemnewcheck = "new";
          }
          else {
            img.itemnameToDisplay = "";
            img.itemnewcheck = "";
          }
        }
      }

      if (this.newitemdays != '' && this.newitemdays != undefined && this.newitemdays != null) {

        if (img.last_update != undefined && img.last_update != null && img.last_update != '') {
          img.last_update = new Date(img.last_update);
          var getnewd = new Date();
          getnewd.setDate(getnewd.getDate() - parseInt(this.newitemdays));
          if (img.last_update >= getnewd) {
            img.itemnameToDisplay = '* New * ' + img.itemname;
            img.itemnewcheck = "new";
          }
          else {
            img.itemnameToDisplay = "";
            img.itemnewcheck = "";
          }
        }
      }

      img.descr = img.description1;
      Common.Setdescriptionforitem(img, this.DescrToShow);
      img.Addtocart = true;
      if (this.drop_ship == '0') {
        img.drop_ship = false;
      }
      var gum = JSON.parse(img.um);
      var gqt = JSON.parse(img.umqty);
      for (var i = 0; i < gum.length; i++) {
        if (i == 0 && gum[i] != '') {
          img.firstum = gum[i];
          img.firstumqty = (gqt[i - 1] == undefined ? 1 : gqt[i - 1]);
        }
        if (i == 0) {
          if (img.um_display == gum[i]) {
            img.um_displayQty = 1;
          }
        }
        else {
          if (img.um_display == gum[i]) {
            img.um_displayQty = gqt[i - 1];
          }

        }
      }

      img.profilelabel = "";
      if (this.ProfileNo == '1') {
        var getprofile = JSON.parse(img.profile);
        img.profilelabel = getprofile[this.ProfileIndex - 1];
      }
      else if (this.ProfileNo == '2') {
        var getprofile = JSON.parse(img.profile2);
        img.profilelabel = getprofile[this.ProfileIndex - 1];
      }
      else if (this.ProfileNo == '3') {
        var getprofile = JSON.parse(img.profile3);
        img.profilelabel = getprofile[this.ProfileIndex - 1];
      }

      var profile1 = JSON.parse(img.profile);

      this.show3D = '1';

      //if ((profile1[1] != "" && this.show3D == '1') && (profile1[2] == 'YES' || profile1[2] == 'yes')) {
      if ((profile1[1] != "" && this.show3D == '1' && profile1[2].toUpperCase() == 'YES') || profile1[16].toUpperCase() == "NO") {
        img.IsBaseProduct = true;
      }
      else {
        img.IsBaseProduct = false;
      }
img.quantity=1;
      getkeywords = getkeywords + ',' + img.itemname;

      try {
        //   var dept1 = [];
        //   try {
        //     dept1 = JSON.parse(img.description1);
        //   } catch (ex) {

        //     img.description1 = img.description1.replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';');
        //     img.description1 = img.description1.replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '')
        //       .replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '');
        //     dept1 = img.description1.replace('[', '').replace(']', '').split(';');
        //   }
        //   var des1 = '';
        //   var des2 = [];
        //   for (let newdesrc of dept1) {
        //     newdesrc = newdesrc.trim();
        //     if (newdesrc != '') {
        //       des1 = des1 + newdesrc;
        //       des2.push(newdesrc);
        //     }
        //   }
        //   img.description = des2;
        //   img.descr = des1;


        if (this.webtype == '5' || this.webtype == '6') {
          var sa_group_label = JSON.parse(img.sa_group_label);
          var sa_group_label1 = [];
          this.isfeature = false;
          for (var i = 0; i <= 14; i++) {
            if (sa_group_label[i] != '') {
              this.isfeature = true;
              if (i == 0 && img.sa_group_1 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_1 });
              }
              else if (i == 1 && img.sa_group_2 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_2 });
              }
              else if (i == 2 && img.sa_group_3 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_3 });
              }
              else if (i == 3 && img.sa_group_4 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_4 });
              }
              else if (i == 4 && img.sa_group_5 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_5 });
              }
              else if (i == 5 && img.sa_group_6 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_6 });
              }
              else if (i == 6 && img.sa_group_7 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_7 });
              }
              else if (i == 7 && img.sa_group_8 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_8 });
              }
              else if (i == 8 && img.sa_group_9 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_9 });
              }
              else if (i == 9 && img.sa_group_10 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_10 });
              }
              else if (i == 10 && img.sa_group_11 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_11 });
              }
              else if (i == 11 && img.sa_group_12 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_12 });
              }
              else if (i == 12 && img.sa_group_13 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_13 });
              }
              else if (i == 13 && img.sa_group_14 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_14 });
              }
              else if (i == 14 && img.sa_group_15 != '') {
                sa_group_label1.push({ lbl: sa_group_label[i], txt: img.sa_group_15 });
              }
            }
          }
        }
        if (sa_group_label1 != undefined && sa_group_label1.length > 0) {
          for (var i = 0; i <= 14; i++) {
            for (var j = 0; j < this.salablelist.length; j++) {
              if (sa_group_label1[i].lbl == this.salablelist[j].salablecode) {
                sa_group_label1[i].lbl = this.salablelist[j].salabledescr;
                if (i == 0) {
                  this.Lable1 = this.salablelist[j].salabledescr;
                }
                if (i == 1) {
                  this.Lable2 = this.salablelist[j].salabledescr;
                }
                if (i == 2) {
                  this.Lable3 = this.salablelist[j].salabledescr;
                }
                if (i == 3) {
                  this.Lable4 = this.salablelist[j].salabledescr;
                }
              }
            }
          }
        }
        img.sa_group_label = sa_group_label1;
        
      } catch (ex) {
        img.sa_group_label=JSON.parse(img.sa_group_label);
       }
      

      
      if (this.isLoggedIn && this.logintype == '3') {
        var getmsg = {
          shipid: Common.getWithExpiry("UserID"),
          customer: Common.getWithExpiry("CustID"),
          userid: img.itemname
        }

        this.inprocesslist.push(getmsg);
      }
      //Common.gotoproductdetails(img, this.UrlWithDetails, this.UrlWithFreeForm);
      this.itemstoavails = this.itemstoavails + img.itemname + ',';
      var getunit = JSON.parse(img.um);
      if (this.isLoggedIn && this.withloginprice == '1' && this.withloginpricelist != '1') {
        bulkPrice.push({
          "customer": Common.getWithExpiry("CustID"),
          "item": img.itemname,
          "quantity": 1,
          "warehouse": Common.getWithExpiry("warehouse"),
          "rounding": this.PriceRound,
          "qty_unit": (img.um_display == undefined ? getunit[0] : (img.um_display == null ? getunit[0] : img.um_display)),
          "company_sy": Common.getWithExpiry("company_sy")
        })
        try {
          if (this.ListPriceShow == '1') {
            var umos = JSON.parse(img.um);
            bulkPrice.push({
              "customer": Common.getWithExpiry("CustID"),
              "item": img.itemname,
              "quantity": 1,
              "warehouse": Common.getWithExpiry("warehouse"),
              "rounding": this.PriceRound,
              "qty_unit": (umos[0]),
              "company_sy": Common.getWithExpiry("company_sy")
            })
          }
        } catch (ed) { }
      }
      else if (!this.isLoggedIn && this.priceshow == '1' && this.listprice != '1') {
        bulkPrice.push({
          "customer": this.GuestUserID,
          "item": img.itemname,
          "quantity": 1,
          "warehouse": this.Guestwarehouse,
          "rounding": this.PriceRound,
          "qty_unit": (img.um_display == undefined ? getunit[0] : (img.um_display == null ? getunit[0] : img.um_display)),
          "company_sy": Common.getWithExpiry("company_sy")
        })
        try {
          if (this.ListPriceShow == '1') {
            var umos = JSON.parse(img.um);
            bulkPrice.push({
              "customer": Common.getWithExpiry("CustID"),
              "item": img.itemname,
              "quantity": 1,
              "warehouse": Common.getWithExpiry("warehouse"),
              "rounding": this.PriceRound,
              "qty_unit": (umos[0]),
              "company_sy": Common.getWithExpiry("company_sy")
            })
          }
        } catch (ef) { }
      }
    }

    if (this.productdetailsforlist == undefined || this.productdetailsforlist == null || this.productdetailsforlist.length == 0 || this.productdetailsforlist[0].meta == undefined || this.productdetailsforlist[0].meta == null || this.productdetailsforlist[0].meta == '') {
      this.seoService.setkeywords(getkeywords);
      this.seoService.setdescription(getkeywords);
    }
    if (this.isLoggedIn || this.annavail == '1') {
      var getitem: any;
      var warehous = "";
      if (this.Multiplewarehouseforavaibility != undefined && this.Multiplewarehouseforavaibility != null && this.Multiplewarehouseforavaibility != '') {
        warehous = this.Multiplewarehouseforavaibility;
      }
      else {
        warehous = Common.getWithExpiry("warehouse");
      }

      if (this.isLoggedIn && this.withloginavailshow == '1' && this.withloginavaillist != 1) {
        getitem = {
          items: this.itemstoavails,
          warehouse: warehous,
          company_sy: Common.getWithExpiry("company_sy"),
        }
      }
      else {
        var warehous = "";
        if (this.Multiplewarehouseforavaibility != undefined && this.Multiplewarehouseforavaibility != null && this.Multiplewarehouseforavaibility != '') {
          warehous = this.Multiplewarehouseforavaibility;
        }
        else {
          warehous = this.Guestwarehouse;
        }
        if (!this.isLoggedIn && this.annavail == '1' && this.withoutloginavaillist != '1') {
          getitem = {
            items: this.itemstoavails,
            warehouse: warehous,
            company_sy: Common.getWithExpiry("company_sy")
          }
        }
      }

      if (getitem != null && getitem != undefined) {
        this.dataService.getProductavailibity(getitem).subscribe((res: any) => {
          var availdata = res;
          for (var i = 0; i < this.productList1.length; i++) {
            this.productList1[i].isavails = false;
            this.productList1[i].productavails = [];
            this.productList1[i].warehouse = '';
            this.productList1[i].available = 0;
            if (availdata != null && availdata != undefined) {
              for (var j = 0; j < availdata.length; j++) {
                if (this.productList1[i].itemname == availdata[j].item) {
                  this.productList1[i].productavails.push(availdata[j]);
                  this.productList1[i].warehouse = (this.productList1[i].warehouse != '' ? this.productList1[i].warehouse + ', ' + availdata[j].warehouse : availdata[j].warehouse);
                  this.productList1[i].available = this.productList1[i].available + availdata[j].available;
                  if (this.addnewqtywithnewlogic == '1') {
                    this.productList1[i].availablenew = (availdata[j].available + availdata[j].on_po) - availdata[j].backorder;
                  }

                  if (this.displaynewavails == '1') {
                    this.productList1[i].availablenew1 = availdata[j].on_po - availdata[j].backorder;
                  }
                  if (availdata[j].available > 0) {
                    this.productList1[i].isavails = true;
                    this.productList1[i].available1 = availdata[j].available;
                  }
                  else {
                    this.productList1[i].isavails = false;
                    this.productList1[i].available1 = 0;
                  }
                }
              }
            }
          }
        })
      }
    }
    
    this.Getitemnamefromproduct();
    if (bulkPrice != null && bulkPrice != undefined && bulkPrice.length > 0) {
      this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {

        var data = res;
        for (var i = 0; i < this.productList1.length; i++) {
          for (var j = 0; j < data.length; j++) {
            if (this.productList1[i].itemname.toLowerCase() == data[j].item.toLowerCase() && this.productList1[i].um_display.toLowerCase() == data[j].qty_unit.toLowerCase()) {
              this.productList1[i].isLoggedIn = this.isLoggedIn;
              this.productList1[i].price = parseFloat(data[j].extension) / parseFloat(data[j].quantity);
              this.productList1[i].origin = data[j].origin;
              var profilefor = null
              if (this.AddToCartAsPerProfileNo == '1' && this.productList1[i].profile != undefined) {
                var profilefor = JSON.parse(this.productList1[i].profile);
              }
              else if (this.AddToCartAsPerProfileNo == '2' && this.productList1[i].profile2 != undefined) {
                var profilefor = JSON.parse(this.productList1[i].profile2);
              }
              else if (this.AddToCartAsPerProfileNo == '3' && this.productList1[i].profile3 != undefined) {
                var profilefor = JSON.parse(this.productList1[i].profile3);
              }
              if ((this.configforcartbyprofile == '1' && profilefor != undefined && profilefor != null && profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1].toUpperCase() == 'NO') && ((data[j].origin != 'CI'))) {
                this.productList1[i].Addtocart = false;
                if (this.PriceOrLable == '2') {
                  this.productList1[i].list_price = 0;
                  this.productList1[i].price = 0;
                }
              }
              if(this.iskrayden && data[j].origin != 'CI' && data[j].origin != 'SP'){
                
                this.productList1[i].price = this.productList1[i].list_price;
              }
            }

            try {
              this.productList1[i].umarray = JSON.parse(this.productList1[i].um);
              if (this.ListPriceShow == '1' && this.productList1[i].itemname == data[j].item && this.productList1[i].umarray[0] == data[j].qty_unit) {
                this.productList1[i].ListPriceShow = data[j].extension;
              }
            } catch (ed) { }
          }
          if ((i + 1) == this.productList1.length) {
            if (this.Position == this.LowestPriceFirst) {
              this.lowestFirst();
            }
            else if (this.Position == this.highestPriceFirst) {
              this.highestFirst();
            }
          }
        }
      });
    }
    else {

      if (this.Position == this.LowestPriceFirst) {
        this.lowestFirst();
      }
      else if (this.Position == this.highestPriceFirst) {
        this.highestFirst();
      }
    }
    this.productList = this.productList1;
    

    this.isEmpty = false;


  }

  findandreplace(stringval) {
    try {
      stringval = stringval.trim();
      stringval = stringval.replace(new RegExp("\/", "g"), '');
      stringval = stringval.replace(new RegExp("#", "g"), '');
    } catch (ed) { }
    return stringval;
  }


  onScroll() {
    
    if (this.totalLinePage >= this.productList1.length) {
        // Update ending position to select more items from the array
        this.pageNo=this.pageNo+1;
        this.bindProducts(this.pageNo);
        
    } else {
      
    }
}

  RemoveSpacesandSpeacialCharacters(str) {
    try {
      str = str.trim();
      var newString = str.replace(/[^A-Z0-9]+/ig, "-");
      return newString;
    }
    catch (ed) {

      return str;
    }
  }





  onAddToCart(newaproduct) {
    if (this.qtyonlist == '0') {
      //newaproduct.quantity = 1;
    }

    if (newaproduct.quantity != undefined && newaproduct.quantity != null && newaproduct.quantity > 0) {

      let product = Object.assign({}, newaproduct)
     // product.quantity = 1;
      product.TotQty = 0;
      // if (this.isLoggedIn == false) {
      //   this.router.navigate(['login']);
      //   return;
      // }
      var usrid = null;
      var subuserid = null;
      var cartid = null;
      if (this.isLoggedIn) {
        usrid = Common.getWithExpiry("CustID");
        cartid = Common.getWithExpiry("CustID");
        subuserid = Common.getWithExpiry("UserID");
      }
      else {
        usrid = this.GuestUserID;
        cartid = this.cartService.getSessionId();
        subuserid = cartid;
      }
      // if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
      //   usrid = Common.getWithExpiry("UserID") + Common.getWithExpiry("CustID");
      // }
      // else if(this.isLoggedIn == false){
      //   usrid=this.GuestUserID;
      // }
      // else {
      //   usrid = Common.getWithExpiry("CustID");
      // }
      this.cartProducts = [];
      this.cartService.getCartItemByUserID().subscribe((res: any) => {
        this.cartProducts = res;

        var getproduct = null;
        //getproduct=product;
        product.TotQty = 0;

        for (let cprod of this.cartProducts) {
          if (cprod.itemname == product.itemname) {
            getproduct = cprod;
            var getums = JSON.parse(getproduct.um);
            var getumsqty = JSON.parse(getproduct.umqty);
            for (var i = 0; i < getums.length; i++) {
              if (i == 0 && getums[i] != '') {
                getproduct.firstum = getums[i];
                getproduct.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
                if (i == 0 && getums[i] == getproduct.MeasureUnit) {
                  product.TotQty = product.TotQty + (getproduct.Quantity * 1);
                }
                if (getums[i] == getproduct.um_display) {
                  getproduct.Qty = (getproduct.Quantity * 1);
                  getproduct.um_displayQty = 1;
                }
              }
              else if (i != 0 && getums[i] != '') {
                if (getums[i] == getproduct.MeasureUnit) {
                  product.TotQty = product.TotQty + (getproduct.Quantity * getumsqty[i - 1]);
                }
                if (getums[i] == getproduct.um_display) {
                  getproduct.Qty = (getproduct.Quantity * getumsqty[i - 1]);
                  getproduct.um_displayQty = getumsqty[i - 1];
                }
              }
            }
          }
        }
        var bulkPrice = [];
        if (this.isLoggedIn == true && this.withloginprice == '1' && this.withloginpricelist != '1') {
          var qty = parseFloat(product.quantity) + (getproduct == null ? 0 : parseFloat(getproduct.Quantity))
          bulkPrice.push({
            "customer": usrid,
            "item": product.itemname,
            "quantity": qty,
            "warehouse": Common.getWithExpiry("warehouse"),
            "rounding": this.PriceRound,
            "qty_unit": product.um_display,
            "company_sy": Common.getWithExpiry("company_sy")
          })
        }
        else if (this.isLoggedIn == false && this.priceshow == '1' && this.listprice != '1') {
          var qty = parseFloat(product.quantity) + (getproduct == null ? 0 : parseFloat(getproduct.Quantity))
          bulkPrice.push({
            "customer": usrid,
            "item": product.itemname,
            "quantity": qty,
            "warehouse": Common.getWithExpiry("warehouse"),
            "rounding": this.PriceRound,
            "qty_unit": product.um_display,
            "company_sy": Common.getWithExpiry("company_sy")
          })
        }

        if (getproduct == undefined || getproduct == null) {
          getproduct = product;
          var getums = JSON.parse(getproduct.um);
          var getumsqty = JSON.parse(getproduct.umqty);
          for (var i = 0; i < getums.length; i++) {
            if (i == 0 && getums[i] != '') {
              getproduct.firstum = getums[i];
              getproduct.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
              if (getums[i] == getproduct.um_display) {
                getproduct.um_displayQty = 1;
                getproduct.Qty = (getproduct.Quantity * 1);
              }
              if (i == 0 && getums[i] == getproduct.MeasureUnit) {
                product.TotQty = product.TotQty + (getproduct.Quantity * 1);
              }
            }
            else if (i != 0 && getums[i] != '') {
              if (getums[i] == getproduct.um_display) {
                getproduct.Qty = (getproduct.Quantity * getumsqty[i - 1]);
                getproduct.um_displayQty = getumsqty[i - 1];
              }
              if (getums[i] == getproduct.MeasureUnit) {
                product.TotQty = product.TotQty + (getproduct.Quantity * getumsqty[i - 1]);
              }
            }
          }
        }

        if ((bulkPrice != null && bulkPrice != undefined && bulkPrice.length > 0) || (this.AddZero == 1 || this.withloginpricelist == '1')) {
          this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
            var data = res;
            var getprice = parseFloat(data[0].extension) / parseFloat(data[0].quantity);
            if(this.iskrayden && data[0].origin != 'CI' && data[0].origin != 'SP'){
              
              getprice = product.list_price;
            }
            if ((this.AddZero == 0 && (product.list_price == 0 || product.list_price == undefined) && this.withloginpricelist == '1') || (this.AddZero == 0 && (product.price == 0 || product.price == undefined) && this.withloginpricelist != '1')) {
              this.toastr.error("Please Call For Pricing.", 'Cannot be added to cart!');
              return;
            }
            if (this.addtonotavail == 0 && (this.addnewqtywithnewlogic == '1' ? product.availablenew : product.available)==0 && (product.isavails == false || product.isavails == undefined) && product.drop_ship == false) {
              this.toastr.error("Product not available.", 'Cannot be added to cart!');
              return;
            }

            // if (usrid != undefined && usrid != "") {
            if (product.qty_warn != 0 && this.Multiply == '1') {
              product.quantity = product.qty_warn / product.um_displayQty;
              this.toastr.error("item will be addded in multiple of " + product.quantity + ' of ' + this.getumdescbyumcode(product.um_display));
            }
            else {
             // product.quantity = 1;
            }
            product.TotQty = product.TotQty + (product.quantity * product.um_displayQty);
            try {
              if (this.addtonotavail == 0 && product.TotQty > (parseFloat((this.addnewqtywithnewlogic == '1' ? product.availablenew : product.available))) && product.drop_ship == false) {
                this.toastr.error("you can not add quantity more than available quantity.");
                return;
              }
            } catch (ed) { }
            if (product.min != undefined && product.min != "0" && product.TotQty < product.min && this.MinQty) {
              product.quantity = product.min;
              this.toastr.error("Minimum quantity should be " + product.min + ' of ' + this.getumdescbyumcode(product.um_display));
              //return;
            }

            if (product.max != undefined && product.max != "0" && product.TotQty > product.max && this.MaxQty) {
              this.toastr.error("Maximum quantity should be " + product.max + ' of ' + this.getumdescbyumcode(product.um_display));
              return;
            }

            product.list_price = getprice;

            this.cartService.addProductToCart(product, product.um_display).subscribe((res: any) => {
              this.cartService.cartBroadCaster(res);
              this.toastr.success(product.quantity + " " + this.getumdescbyumcode(product.um_display) + " of item " + product.itemname + " has been added to your cart.", 'Success!');
            })
            //}
          });
        }
      });
    }
    else {
      this.toastr.error("Please Enter Quantity.");
    }
  }
  public async onScrollLoadData(){
    
   
    
    //if( this.productList2.length <= this.totalLinePage){
      this.pageNo +=1;
      await this.bindProducts(this.pageNo);
      
    //}
}



  lowestFirst() {
    this.Position = this.LowestPriceFirst;
    Common.setWithExpiry("Position", this.Position);
    if ((this.isLoggedIn && this.withloginprice == '1' && this.withloginpricelist != '1') || (!this.isLoggedIn && this.priceshow == '1' && this.listprice != '1')) {
      this.productList = arraySort(this.productList, ['price']);
      this.productList1 = arraySort(this.productList1, ['price']);
    }
    else {
      this.productList = arraySort(this.productList, ['list_price']);
      this.productList1 = arraySort(this.productList1, ['list_price']);

    }
  }

  sa_group_1_asc() {
    this.stype = 3;
    this.bindProducts(this.pageNo);
  }
  sa_group_1_desc() {
    this.stype = 4;
    this.bindProducts(this.pageNo);
  }
  sa_group_2_asc() {
    this.stype = 5;
    this.bindProducts(this.pageNo);
  }
  sa_group_2_desc() {
    this.stype = 6;
    this.bindProducts(this.pageNo);
  }
  sa_group_3_asc() {
    this.stype = 7;
    this.bindProducts(this.pageNo);
  }
  sa_group_3_desc() {
    this.stype = 8;
    this.bindProducts(this.pageNo);
  }
  sa_group_4_asc() {
    this.stype = 9;
    this.bindProducts(this.pageNo);
  }
  sa_group_4_desc() {
    this.stype = 10;
    this.bindProducts(this.pageNo);
  }

  highestFirst() {

    this.Position = this.highestPriceFirst;
    Common.setWithExpiry("Position", this.Position);
    if ((this.isLoggedIn && this.withloginprice == '1' && this.withloginpricelist != '1') || (!this.isLoggedIn && this.priceshow == '1' && this.listprice != '1')) {
      this.productList = arraySort(this.productList, ['price'], { reverse: true });
      this.productList1 = arraySort(this.productList1, ['price'], { reverse: true });
    }
    else {
      this.productList = arraySort(this.productList, ['list_price'], { reverse: true });
      this.productList1 = arraySort(this.productList1, ['list_price'], { reverse: true });
    }

  }

  AtoZ() {
    this.stype = 0;
    this.Position = this.ItemAtoZ;
    this.bindProducts(this.pageNo);

  }
  Quantitysortltoh() {
    this.stype = 11;
    this.Position = this.LowestQtyFirst;
    this.bindProducts(this.pageNo);
  }
  Quantitysorthtol() {
    this.stype = 12;
    this.Position = this.highestQtyFirst;
    this.bindProducts(this.pageNo);
  }
  DescrSortsortltoh() {
    this.stype = 13;
    this.Position = this.descrAtoZ;
    this.bindProducts(this.pageNo);
  }
  DescrSortsorthtol() {
    this.stype = 14;
    this.Position = this.descrZtoA;
    this.bindProducts(this.pageNo);
  }
  newestfirstsorting() {
    this.stype = 18;
    this.Position = this.newestfirstsortlabel;
    this.bindProducts(this.pageNo);
  }

  sa13sortascsorting() {
    this.stype = 15;
    this.Position = this.sa13sortasc;
    this.bindProducts(this.pageNo);
  }
  sa13sortdescsorting() {
    this.stype = 16;
    this.Position = this.sa13sortdesc;
    this.bindProducts(this.pageNo);
  }
  ZtoA() {
    this.stype = 1;
    this.Position = this.ItemZtoA;
    this.bindProducts(this.pageNo);
  }
  SortByDimensions() {
    try {
      this.Position = this.DimensionLable;
      this.stype = 17;
      this.bindProducts(this.pageNo);
      // this.productList = arraySort(this.productList, ['ship_height', 'ship_length', 'ship_width']);
      // this.productList1=arraySort(this.productList1, ['ship_height', 'ship_length', 'ship_width']);
    } catch (ed) { }
  }
  streesort() {
    this.stype = 2;
    this.Position = this.Sequencelable;
    this.bindProducts(this.pageNo);
  }
}