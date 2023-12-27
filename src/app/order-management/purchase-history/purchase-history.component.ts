import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { OrderManagementService } from '../../services/order-management.service';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { NG_VALIDATORS, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { Common } from '../../../app/model/common.model';
import { SEOService } from '../../services/seo.service';
//import * as moment from 'moment';
// import * as _ from 'lodash';
// import Rx from 'rxjs/Rx';
// import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
//import { LoadingService } from 'src/app/services/loading.service';
//import { DEF_CONF } from 'src/app/model/consts';
import { IDatePickerConfig } from 'ng2-date-picker';
import { LoadingService } from '../../services/loading.service';
import { DEF_CONF } from '../../model/consts';
import { environment } from '../../../environments/environment';
//import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  configforcartbyprofile: any;
  priceshowcust: any = '1';
  AddToCartAsPerProfileNo: any;
  AddToCartAsPerProfileArrayNo: any;
  totalPage: any;
  AddZero: any;
  IsShow: any;
  Multiply: any;
  cartProducts: any;
  page: number = 1;
  MinQty: any;
  searchModel: any = {};
  orderList: any = [];
  finalorderList: any = [];
  getdate: any;
  getyearlist: any = [];
  // Year: any;
  //Month: any;
  //YTDType: any;
  webtype: string;
  addtonotavail: any;
  // ToMonth: any;
  // ToYear: any;
  // FromMonth: any;
  // FromYear: any;
  ifpur: boolean = false;
  ToDate: any;
  FromDate: any;
  itemList: any = [];
  nameField: any;
  isreorder: any;
  warehouse: any;
  IsMuscle: any = '0';
  UserType: any;
  MaxQty: any;
  PriceRound: any;
  DescrToShow: any;
  stype: any = "4";
  ProductNotAvailableinPurchasehistory: any;
  umdescrlist: any;
  isumdescr: any;
  showwebiteminpurchasehistory: any;
  drop_ship: any;
  addnewqtywithnewlogic:any;
  itemname:any='';
  itemsearchinpurchasehistory:any;
  config: IDatePickerConfig = {
    ...DEF_CONF,
    format: 'MM/DD/YYYY'
  };    
  iskrayden:any;
  constructor(private loadingService: LoadingService, private formBuilder: UntypedFormBuilder, el: ElementRef, private renderer: Renderer2, private seoService: SEOService, private toastr: ToastrService, private cartService: CartService, private dataService: DataService, private orderService: OrderManagementService, private router: Router) {
    //this.ToDate =moment(new Date()).add(1, 'years');
    //this.FromDate =moment(new Date());
this.iskrayden=environment.iskyraden;
    //this.ToDate=moment(new Date());
    //this.FromDate=moment(new Date()).add(-1, 'years');
    
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Purchase History - ' + geturl);
    this.seoService.setkeywords('Purchase History - ' + geturl);
    this.seoService.setdescription('Purchase History - ' + geturl);

    this.UserType = Common.getWithExpiry("UserType");
    this.warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
    this.getumdescrconfig();
    this.getitemsearchinpurchasehistory();
    this.Getaddnewqtywithnewlogic();
    this.getreorderconfig();
    this.GetConfigforProductNotAvailableinPurchasehistory();
    this.showpricetocustomers();
    this.getDescrToShow();
    this.GetpriceRoundingsetting();
    this.getAddZero();
    this.getIsMuscle();
    this.getMultiplyQtySetting();
    this.getMinQtySetting();
    this.getMaxQtySetting();
    this.getaddtonotavail();
    this.GetConfigForAddToCartAsPerProfile();
    this.GetConfigurationforshowwebiteminpurchasehistory();
    this.cofigurtiondfordrop_ship();
  }
  cofigurtiondfordrop_ship() {
    this.drop_ship = this.dataService.Getconfigbykey("drop_ship");
    if (this.drop_ship == null || this.drop_ship == undefined || this.drop_ship == '') {
      this.drop_ship = Common.getWithExpiry("drop_ship");
    }
    if (this.drop_ship == null || this.drop_ship == undefined) {
      this.dataService.cofigurtiondfordrop_ship().subscribe((data: any) => {
        this.drop_ship = data;
        Common.setWithExpiry("drop_ship", this.drop_ship);
      })
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


  clearall(){
    this.itemname='';
      this.ngOnInit();
  }


  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  Getaddnewqtywithnewlogic() {
    this.addnewqtywithnewlogic = this.dataService.Getconfigbykey("addnewqtywithnewlogic");
    if (this.addnewqtywithnewlogic == null || this.addnewqtywithnewlogic == undefined || this.addnewqtywithnewlogic == '') {
      this.addnewqtywithnewlogic = Common.getWithExpiry("addnewqtywithnewlogic");
    }
    if (this.addnewqtywithnewlogic == null || this.addnewqtywithnewlogic == undefined || this.addnewqtywithnewlogic == '') {
      this.dataService.Getaddnewqtywithnewlogic().subscribe((data: any) => {
        this.addnewqtywithnewlogic = data;
        Common.setWithExpiry("addnewqtywithnewlogic", this.addnewqtywithnewlogic);

      });
    }
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
  ngOnInit() {
    //for (var i = 0; i <= 10; i++) {
      //var getyea = new Date();
      //var years = getyea.getFullYear() - i;
      //this.getyearlist.push(years);
    //}
    //this.Year = this.getyearlist[0];
    //this.YTDType = 1;
    // var d = new Date();
    // this.Month = d.getMonth() + 1;
    this.SetDates();

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
  getaddtonotavail() {
    this.addtonotavail = this.dataService.Getconfigbykey("addifunavail");
    if (this.addtonotavail == null || this.addtonotavail == undefined || this.addtonotavail == '') {
      this.addtonotavail = Common.getWithExpiry("addifunavail");
    }
    if (this.addtonotavail == null || this.addtonotavail == undefined || this.addtonotavail == '') {
      this.dataService.GetConfigForisaddifunavail().subscribe((res: any) => {
        this.addtonotavail = res;
        Common.setWithExpiry("addifunavail", this.addtonotavail);
      });
    }
  }
  GetConfigforProductNotAvailableinPurchasehistory() {
    this.ProductNotAvailableinPurchasehistory = this.dataService.Getconfigbykey("ProductNotAvailableinPurchasehistory");
    if (this.ProductNotAvailableinPurchasehistory == null || this.ProductNotAvailableinPurchasehistory == undefined || this.ProductNotAvailableinPurchasehistory == '') {
      this.ProductNotAvailableinPurchasehistory = Common.getWithExpiry("ProductNotAvailableinPurchasehistory");
    }
    if (this.ProductNotAvailableinPurchasehistory == null || this.ProductNotAvailableinPurchasehistory == undefined || this.ProductNotAvailableinPurchasehistory == '') {
      this.dataService.GetConfigforProductNotAvailableinPurchasehistory().subscribe((res: any) => {
        this.ProductNotAvailableinPurchasehistory = res;
        Common.setWithExpiry("ProductNotAvailableinPurchasehistory", this.ProductNotAvailableinPurchasehistory);
      });
    }
  }
  GetConfigurationforshowwebiteminpurchasehistory() {
    this.showwebiteminpurchasehistory = this.dataService.Getconfigbykey("showwebiteminpurchasehistory");
    if (this.showwebiteminpurchasehistory == null || this.showwebiteminpurchasehistory == undefined || this.showwebiteminpurchasehistory == '') {
      this.showwebiteminpurchasehistory = Common.getWithExpiry("showwebiteminpurchasehistory");
    }
    if (this.showwebiteminpurchasehistory == null || this.showwebiteminpurchasehistory == undefined || this.showwebiteminpurchasehistory == '') {
      this.dataService.GetConfigurationforshowwebiteminpurchasehistory().subscribe((res: any) => {
        this.showwebiteminpurchasehistory = res;
        Common.setWithExpiry("showwebiteminpurchasehistory", this.showwebiteminpurchasehistory);
      });
    }
  }
  GetConfigForAddToCartAsPerProfile() {
    this.configforcartbyprofile = Common.getWithExpiry("configforcartbyprofile");
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
  getAddZero() {
    this.AddZero = Common.getWithExpiry("AddZero");
    if (this.AddZero == null || this.AddZero == undefined || this.AddZero == '') {
      this.dataService.GetConfigForZeroPrice().subscribe((res: any) => {
        this.AddZero = res;
        Common.setWithExpiry("AddZero", this.AddZero);
      });
    }
  }
  getitemsearchinpurchasehistory() {
    this.itemsearchinpurchasehistory = Common.getWithExpiry("itemsearchinpurchasehistory");
    if (this.itemsearchinpurchasehistory == null || this.itemsearchinpurchasehistory == undefined || this.itemsearchinpurchasehistory == '') {
      this.dataService.getitemsearchinpurchasehistory().subscribe((res: any) => {
        this.itemsearchinpurchasehistory = res;
        Common.setWithExpiry("itemsearchinpurchasehistory", this.itemsearchinpurchasehistory);
      });
    }
  }
  GetGetAddToCartAsPerProfileNo() {
    this.AddToCartAsPerProfileNo = Common.getWithExpiry("AddToCartAsPerProfileNo");
    if (this.AddToCartAsPerProfileNo == null || this.AddToCartAsPerProfileNo == undefined || this.AddToCartAsPerProfileNo == '') {
      this.dataService.GetAddToCartAsPerProfileNo().subscribe((res: any) => {
        this.AddToCartAsPerProfileNo = res;
        Common.setWithExpiry("AddToCartAsPerProfileNo", this.AddToCartAsPerProfileNo);
      });
    }
  }
  GetAddToCartAsPerProfileArrayNo() {
    this.AddToCartAsPerProfileArrayNo = Common.getWithExpiry("AddToCartAsPerProfileArrayNo");
    if (this.AddToCartAsPerProfileArrayNo == null || this.AddToCartAsPerProfileArrayNo == undefined || this.AddToCartAsPerProfileArrayNo == '') {
      this.dataService.GetAddToCartAsPerProfileArrayNo().subscribe((res: any) => {
        this.AddToCartAsPerProfileArrayNo = res;
        Common.setWithExpiry("AddToCartAsPerProfileArrayNo", this.AddToCartAsPerProfileArrayNo);
      });
    }
  }
  GetpriceRoundingsetting() {
    this.PriceRound = Common.getWithExpiry("PriceRound");
    if (this.PriceRound == null || this.PriceRound == undefined || this.PriceRound == '') {
      this.dataService.GetpriceRoundingsetting().subscribe((res: any) => {
        this.PriceRound = res;
        Common.setWithExpiry("PriceRound", this.PriceRound);
      });
    }
  }
  getMaxQtySetting() {
    var MaxQtySetting = Common.getWithExpiry("MaxQtySetting");
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
  showQorder() {
    this.ifpur = false;
  }
  showpur() {
    this.ifpur = true;
  }

  getreorderconfig() {
    this.isreorder = Common.getWithExpiry("isreorder");
    if (this.isreorder == null || this.isreorder == undefined) {
      this.dataService.GetConfigForisreorder().subscribe((data: any) => {
        this.isreorder = data;
        Common.setWithExpiry("isreorder", this.isreorder);
      })
    }
  }
  getIsMuscle() {
    try{
    var geturl = window.location.hostname;
    }catch(ed){}
    if (geturl.indexOf('shop.musclefoodsusa.com') == -1) {
      this.IsMuscle = Common.getWithExpiry("IsMuscle");
      if (this.IsMuscle == null || this.IsMuscle == undefined) {
        this.dataService.GetConfigForIsMuscle().subscribe((data: any) => {
          this.IsMuscle = data;
          Common.setWithExpiry("IsMuscle", this.IsMuscle);
          if (this.IsMuscle == '1') {
            this.GetCartmethodformuscle();
          }
        })
      }
      else {
        if (this.IsMuscle == '1') {
          this.GetCartmethodformuscle();
        }
      }
    }
  }

  onKeydown(event, item, i) {
    if (event.key === "Enter" && item.quantity > 0) {
      this.Addtocart(item, i);
    }
    else {
      if (item.quantity < 0) {
        this.toastr.error("Invalid Quantity");
      }
    }
  }
  onbluerevent(item) {
    if (item.quantity > 0) {
      this.itemList.push(item);
    }
    else {
      if (item.quantity < 0) {
        this.toastr.error("Invalid Quantity");
      }
    }
  }

  addToCartMultiple() {
    for (var i = 0; i < this.itemList.length; i++) {
      if (this.itemList[i].quantity > 0) {
        this.Addtocart(this.itemList[i], i);
      }
      else {
        if (this.itemList[i].quantity < 0) {
          this.toastr.error("Invalid Quantity");
        }
      }
    }
    this.itemList = [];
    //$(".reordertext").val('');
  }
  getMultiplyQtySetting() {
    this.Multiply = Common.getWithExpiry("Multiply");
    if (this.Multiply == null || this.Multiply == undefined) {
      this.dataService.MultiplySetting().subscribe((data: any) => {
        this.Multiply = data;
        Common.setWithExpiry("Multiply", this.Multiply);
      });
    }
  }
  getMinQtySetting() {
    var MinQtySetting = Common.getWithExpiry("MinQtySetting");
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


  Addtocart(getitem, indexs) {
    try {
      if (getitem.quantity != undefined) {
        if (getitem.quantity > 0) {
          var usrid = null;
          if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle == '1') {
            usrid = Common.getWithExpiry("UserID") + Common.getWithExpiry("CustID");
          }
          else {
            usrid = Common.getWithExpiry("CustID");
          }
          this.cartService.getCartItemByUserID().subscribe((res: any) => {
            this.cartProducts = res;
            var getum = '1';
            this.dataService.getProductDetailName(getitem.sum_key_2, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
              var item1 = res;

              if (item1 != null) {
                if (this.drop_ship == '0') {
                  item1.drop_ship = false;
                }
                item1.quantity = getitem.quantity;
                // var units = item1.um.replace('[', '').replace(']', '').split(',')[0];
                // getitem.units = units.replace('"', '').replace('"', '');
                var getunits = JSON.parse(item1.um);
                var getum_qty = JSON.parse(item1.umqty);
                for (var i = 0; i < getunits.length; i++) {
                  if (item1.um_display == getunits[i]) {
                    getum = getum_qty[i - 1];
                  }
                }
              }
              else {
                this.toastr.error(getitem.sum_key_2 + " is not available", 'Message!');
                indexs = indexs + 1;

                //$("#" + indexs).focus();
                const element = this.renderer.selectRootElement("#Product" + indexs.toString());
                element.focus();
              }

              var getitem12 = {
                items: getitem.sum_key_2,
                warehouse: Common.getWithExpiry("warehouse"),
                company_sy: Common.getWithExpiry("company_sy")
              }
              var getproduct = null;
              for (let cprod of this.cartProducts) {
                if (cprod.itemname == getitem.itemname) {
                  getproduct = cprod;
                  var getums = JSON.parse(getproduct.um);
                  var getumsqty = JSON.parse(getproduct.umqty);
                  for (var i = 0; i < getums.length; i++) {
                    if (i == 0 && getums[i] != '') {
                      getproduct.firstum = getums[i];
                      getproduct.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
                      if (i == 0 && getums[i] == getproduct.MeasureUnit) {
                        getproduct.Qty = (getproduct.Quantity * 1);
                        getitem.TotQty = getitem.TotQty + (getproduct.Quantity * 1);
                      }
                      if (getums[i] == getproduct.um_display) {
                        getproduct.um_displayQty = 1;
                      }
                    }
                    else if (getums[i] == getproduct.MeasureUnit) {
                      getproduct.Qty = (getproduct.Quantity * getumsqty[i - 1]);
                      getitem.TotQty = getitem.TotQty + (getproduct.Quantity * getumsqty[i - 1]);

                    }
                    else if (getums[i] == getproduct.um_display) {
                      getproduct.Qty = (getproduct.Quantity * getumsqty[i - 1]);
                      getitem.TotQty = getitem.TotQty + (getproduct.Quantity * getumsqty[i - 1]);
                      getproduct.um_displayQty = getumsqty[i - 1];
                    }
                  }
                }
              }
              this.dataService.getProductavailibity(getitem12).subscribe((res: any) => {
                var availdata = res;
                // if(availdata[0].available > 0){
                var bulkPrice = [];
                // getitem.units = getitem.units.replace('"','').replace('"','');
                var qty = parseFloat(getitem.quantity) + (getproduct == null ? 0 : parseFloat(getproduct.Quantity))
                bulkPrice.push({
                  "customer": Common.getWithExpiry("CustID"),
                  "item": getitem.sum_key_2,
                  // "unit": getitem.units.trim().replace('"', '').replace('"', ''),
                  "quantity": qty,
                  "warehouse": Common.getWithExpiry("warehouse"),
                  "rounding": this.PriceRound,
                  "qty_unit": item1.um_display,
                  "company_sy": Common.getWithExpiry("company_sy")
                })
                this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
                  var data = res;
                  if(this.iskrayden && data[0].origin != 'CI' && data[0].origin != 'SP'){
                    getitem.list_price = getitem.list_price;
                  }
                  else{
                  getitem.list_price = parseFloat(data[0].extension) / parseFloat(data[0].quantity);
                  }
                  getitem.itemname = getitem.sum_key_2;
                  var usrid = null;
                  getum = (getum == undefined ? '1' : getum);
                  getitem.totqty = parseFloat(getitem.quantity) * parseFloat(getum);
                  if (getproduct == undefined || getproduct == null) {
                    getproduct = item1;
                    var getums = JSON.parse(getproduct.um);
                    var getumsqty = JSON.parse(getproduct.umqty);
                    for (var i = 0; i < getums.length; i++) {
                      if (i == 0 && getums[i] != '') {
                        getproduct.firstum = getums[i];
                        getproduct.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
                        if (i == 0 && getums[i] == getproduct.MeasureUnit) {
                          getitem.TotQty = getitem.TotQty + (getproduct.Quantity * 1);
                        }
                        if (getums[i] == getproduct.um_display) {
                          getproduct.um_displayQty = 1;
                          getproduct.Qty = (getproduct.Quantity * 1);
                        }
                      }
                      else if (i != 0 && getums[i] != '') {
                        if (getums[i] == getproduct.um_display) {
                          getproduct.Qty = (getproduct.Quantity * getumsqty[i - 1]);
                          getproduct.um_displayQty = getumsqty[i - 1];
                        }
                        if (getums[i] == getproduct.MeasureUnit) {
                          getitem.TotQty = getitem.TotQty + (getproduct.Quantity * getumsqty[i - 1]);

                        }

                      }
                    }
                  }
                  var profilefor = null
                  if (this.AddToCartAsPerProfileNo == '1' && item1.profile1 != undefined) {
                    var profilefor = JSON.parse(item1.profile1);
                  }
                  else if (this.AddToCartAsPerProfileNo == '2' && item1.profile2 != undefined) {
                    var profilefor = JSON.parse(item1.profile2);
                  }
                  else if (this.AddToCartAsPerProfileNo == '3' && item1.profile3 != undefined) {
                    var profilefor = JSON.parse(item1.profile3);
                  }
                  if ((this.configforcartbyprofile == '1' && profilefor != undefined && profilefor != null && (profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1] == 'NO' || profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1] == 'no')) && ((data[0].origin != 'CI'))) {
                    this.toastr.error("Product is Not Available");
                    return;
                  }
                  getitem.TotQty = getitem.TotQty + parseFloat(getitem.quantity) * parseFloat(getum);
                  if (item1.qty_warn != undefined && item1.qty_warn != "0" && (this.Multiply == '1' || this.Multiply == 1) && (parseFloat(getitem.quantity) * parseFloat(getum)) % item1.qty_warn != 0) {

                    this.toastr.error("Please enter item " + item1.itemname + " in multiple of " + (parseInt(item1.qty_warn) / parseInt(getum)).toString() + " of " + this.getumdescbyumcode(item1.um_display));
                    getitem.quantity = item1.qty_warn;
                  }
                  try {
                    if (this.addtonotavail == 0 && getitem.TotQty > (parseFloat((this.addnewqtywithnewlogic=='1' ? availdata[0].availablenew : availdata[0].available))) && item1.drop_ship == false) {
                      this.toastr.error("you can not add quantity more than available quantity.");
                      return;
                    }
                  } catch (ex) { }
                  if (item1.min != undefined && item1.min != "0" && getitem.TotQty < item1.min && this.MinQty == true) {
                    this.toastr.error("Minimum quantity of item " + item1.itemname + " should be " + item1.min + ' of ' + this.getumdescbyumcode(item1.um_display.trim()));
                    return;
                  }
                  else if (item1.max != undefined && item1.max != "0" && getitem.TotQty > item1.max && this.MaxQty) {
                    this.toastr.error("Maximum quantity of item " + item1.itemname + " should be " + item1.max + ' of ' + this.getumdescbyumcode(item1.um_display.trim()));
                    return;
                  }
                  if (this.AddZero == 0 && getitem.list_price == 0 || getitem.list_price == undefined) {
                    this.toastr.error("Please Call For Pricing.", 'Cannot be added to cart!');
                    return;
                  }
                  if (this.addtonotavail == 0 && (availdata[0].available == 0 || availdata[0].available == undefined) && item1.drop_ship == false) {
                    this.toastr.error("Product not available.", 'Cannot be added to cart!');
                    return;
                  }

                  else {
                    if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle == '1') {
                      usrid = Common.getWithExpiry("UserID");
                    }
                    else {
                      usrid = Common.getWithExpiry("CustID");
                    }
                    getitem.um_display = item1.um_display;
                    this.cartService.addProductToCart(getitem, getitem.um_display.trim()).subscribe((res: any) => {
                      this.cartService.cartBroadCaster(res);
                      this.toastr.success(getitem.quantity + " " + this.getumdescbyumcode(getitem.um_display.trim().replace('"', '').replace('"', '')) + " of item " + getitem.sum_key_2 + " has been added to your cart.", 'Success!');
                      getitem.quantity = "";
                    })
                    indexs = indexs + 1;
                    //$("#" + indexs).focus();

                    const element = this.renderer.selectRootElement("#Product" + indexs.toString());
                    element.focus();
                  }
                })
              });
            });
          });
        }
        else {
          this.toastr.error("Invalid Quantity", 'Message!');
          //$("#" + indexs).focus();
          const element = this.renderer.selectRootElement("#Product" + indexs.toString());
          element.focus();
        }

      }

    } catch (exception) {
      this.toastr.error("Cannot be added to cart", 'Product not available!');
      //indexs=indexs+1;
      //$("#" + indexs).focus();
      const element = this.renderer.selectRootElement("#Product" + indexs.toString());
      element.focus();
    }
  }

  Addtocartnew(getitem, indexs) {
    try {
      if (getitem.quantity != undefined) {
        if (getitem.quantity > 0) {
          var usrid = null;
          if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle == '1') {
            usrid = Common.getWithExpiry("UserID") + Common.getWithExpiry("CustID");
          }
          else {
            usrid = Common.getWithExpiry("CustID");
          }
          this.cartService.getCartItemByUserID().subscribe((res: any) => {
            this.cartProducts = res;
            var getum = '1';
            this.dataService.getProductDetailName(getitem.item1, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
              var item1 = res;

              if (item1 != null) {
                item1.quantity = getitem.quantity;
                // var units = item1.um.replace('[', '').replace(']', '').split(',')[0];
                // getitem.units = units.replace('"', '').replace('"', '');
                var getunits = JSON.parse(item1.um);
                var getum_qty = JSON.parse(item1.umqty);
                for (var i = 0; i < getunits.length; i++) {
                  if (item1.um_display == getunits[i]) {
                    getum = getum_qty[i - 1];
                  }
                }
              }
              else {
                this.toastr.error(getitem.item1 + " is not available", 'Message!');
                indexs = indexs + 1;

                //$("#" + indexs).focus();
                const element = this.renderer.selectRootElement("#Product" + indexs.toString());
                element.focus();
              }

              var getitem12 = {
                items: getitem.item1,
                warehouse: Common.getWithExpiry("warehouse"),
                company_sy: Common.getWithExpiry("company_sy")
              }
              var getproduct = null;
              for (let cprod of this.cartProducts) {
                if (cprod.itemname == getitem.item1) {
                  getproduct = cprod;
                  var getums = JSON.parse(getproduct.um);
                  var getumsqty = JSON.parse(getproduct.umqty);
                  for (var i = 0; i < getums.length; i++) {
                    if (i == 0 && getums[i] != '') {
                      getproduct.firstum = getums[i];
                      getproduct.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
                      if (i == 0 && getums[i] == getproduct.MeasureUnit) {
                        getproduct.Qty = (getproduct.Quantity * 1);
                        getitem.TotQty = getitem.TotQty + (getproduct.Quantity * 1);
                      }
                      if (getums[i] == getproduct.um_display) {
                        getproduct.um_displayQty = 1;
                      }
                    }
                    else if (getums[i] == getproduct.MeasureUnit) {
                      getproduct.Qty = (getproduct.Quantity * getumsqty[i - 1]);
                      getitem.TotQty = getitem.TotQty + (getproduct.Quantity * getumsqty[i - 1]);

                    }
                    else if (getums[i] == getproduct.um_display) {
                      getproduct.Qty = (getproduct.Quantity * getumsqty[i - 1]);
                      getitem.TotQty = getitem.TotQty + (getproduct.Quantity * getumsqty[i - 1]);
                      getproduct.um_displayQty = getumsqty[i - 1];
                    }
                  }
                }
              }
              this.dataService.getProductavailibity(getitem12).subscribe((res: any) => {
                var availdata = res;
                // if(availdata[0].available > 0){
                var bulkPrice = [];
                // getitem.units = getitem.units.replace('"','').replace('"','');
                var qty = parseFloat(getitem.quantity) + (getproduct == null ? 0 : parseFloat(getproduct.Quantity))
                bulkPrice.push({
                  "customer": Common.getWithExpiry("CustID"),
                  "item": getitem.item1,
                  // "unit": getitem.units.trim().replace('"', '').replace('"', ''),
                  "quantity": qty,
                  "warehouse": Common.getWithExpiry("warehouse"),
                  "rounding": this.PriceRound,
                  "qty_unit": item1.um_display,
                  "company_sy": Common.getWithExpiry("company_sy")
                })
                this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
                  var data = res;
                  if(this.iskrayden && data[0].origin != 'CI' && data[0].origin != 'SP'){
                    getitem.list_price = getitem.list_price;
                  }
                  else{
                  getitem.list_price = parseFloat(data[0].extension) / parseFloat(data[0].quantity);
                  }
                  getitem.itemname = getitem.item1;
                  var usrid = null;
                  getum = (getum == undefined ? '1' : getum);
                  getitem.totqty = parseFloat(getitem.quantity) * parseFloat(getum);
                  if (getproduct == undefined || getproduct == null) {
                    getproduct = item1;
                    var getums = JSON.parse(getproduct.um);
                    var getumsqty = JSON.parse(getproduct.umqty);
                    for (var i = 0; i < getums.length; i++) {
                      if (i == 0 && getums[i] != '') {
                        getproduct.firstum = getums[i];
                        getproduct.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
                        if (i == 0 && getums[i] == getproduct.MeasureUnit) {
                          getitem.TotQty = getitem.TotQty + (getproduct.Quantity * 1);
                        }
                        if (getums[i] == getproduct.um_display) {
                          getproduct.um_displayQty = 1;
                          getproduct.Qty = (getproduct.Quantity * 1);
                        }
                      }
                      else if (i != 0 && getums[i] != '') {
                        if (getums[i] == getproduct.um_display) {
                          getproduct.Qty = (getproduct.Quantity * getumsqty[i - 1]);
                          getproduct.um_displayQty = getumsqty[i - 1];
                        }
                        if (getums[i] == getproduct.MeasureUnit) {
                          getitem.TotQty = getitem.TotQty + (getproduct.Quantity * getumsqty[i - 1]);

                        }

                      }
                    }
                  }
                  var profilefor = null
                  if (this.AddToCartAsPerProfileNo == '1' && item1.profile1 != undefined) {
                    var profilefor = JSON.parse(item1.profile1);
                  }
                  else if (this.AddToCartAsPerProfileNo == '2' && item1.profile2 != undefined) {
                    var profilefor = JSON.parse(item1.profile2);
                  }
                  else if (this.AddToCartAsPerProfileNo == '3' && item1.profile3 != undefined) {
                    var profilefor = JSON.parse(item1.profile3);
                  }
                  if ((this.configforcartbyprofile == '1' && profilefor != undefined && profilefor != null && (profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1] == 'NO' || profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1] == 'no')) && ((data[0].origin != 'CI'))) {
                    this.toastr.error("Product is Not Available");
                    return;
                  }
                  getitem.TotQty = getitem.TotQty + parseFloat(getitem.quantity) * parseFloat(getum);
                  if (item1.qty_warn != undefined && item1.qty_warn != "0" && (this.Multiply == '1' || this.Multiply == 1) && (parseFloat(getitem.quantity) * parseFloat(getum)) % item1.qty_warn != 0) {

                    this.toastr.error("Please enter item " + item1.itemname + " in multiple of " + (parseInt(item1.qty_warn) / parseInt(getum)).toString() + " of " + this.getumdescbyumcode(item1.um_display));
                    getitem.quantity = item1.qty_warn;
                  }
                  if (item1.min != undefined && item1.min != "0" && getitem.TotQty < item1.min && this.MinQty == true) {
                    this.toastr.error("Minimum quantity of item " + item1.itemname + " should be " + item1.min + ' of ' + this.getumdescbyumcode(item1.um_display.trim()));
                    return;
                  }
                  else if (item1.max != undefined && item1.max != "0" && getitem.TotQty > item1.max && this.MaxQty) {
                    this.toastr.error("Maximum quantity of item " + item1.itemname + " should be " + item1.max + ' of ' + this.getumdescbyumcode(item1.um_display.trim()));
                    return;
                  }
                  if (this.AddZero == 0 && getitem.list_price == 0 || getitem.list_price == undefined) {
                    this.toastr.error("Please Call For Pricing.", 'Cannot be added to cart!');
                    return;
                  }
                  try {
                    if (this.addtonotavail == 0 && getitem.TotQty > (parseFloat((this.addnewqtywithnewlogic=='1' ? availdata[0].availablenew : availdata[0].available)))) {
                      this.toastr.error("you can not add quantity more than available quantity.");
                      return;
                    }
                  } catch (ex) { }

                  if (this.addtonotavail == 0 && (availdata[0].available == 0 || availdata[0].available == undefined)) {
                    this.toastr.error("Product not available.", 'Cannot be added to cart!');
                    return;
                  }

                  else {
                    if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle == '1') {
                      usrid = Common.getWithExpiry("UserID");
                    }
                    else {
                      usrid = Common.getWithExpiry("CustID");
                    }
                    getitem.um_display = item1.um_display;
                    this.cartService.addProductToCart(getitem, getitem.um_display.trim()).subscribe((res: any) => {
                      this.cartService.cartBroadCaster(res);
                      this.toastr.success(getitem.quantity + " " + this.getumdescbyumcode(getitem.um_display.trim().replace('"', '').replace('"', '')) + " of item " + getitem.item1 + " has been added to your cart.", 'Success!');
                      getitem.quantity = "";
                    })
                    indexs = indexs + 1;
                    //$("#" + indexs).focus();

                    const element = this.renderer.selectRootElement("#Product" + indexs.toString());
                    element.focus();
                  }
                })
              });
            });
          });
        }
        else {
          this.toastr.error("Invalid Quantity", 'Message!');
          //$("#" + indexs).focus();
          const element = this.renderer.selectRootElement("#Product" + indexs.toString());
          element.focus();
        }

      }

    } catch (exception) {
      this.toastr.error("Cannot be added to cart", 'Product not available!');
      //indexs=indexs+1;
      //$("#" + indexs).focus();
      const element = this.renderer.selectRootElement("#Product" + indexs.toString());
      element.focus();
    }
  }

  returnsmonth(){    
    let cmdate = new Date(this.FromDate.toString());
    return cmdate.getMonth();
  }
  returnsyear(){    
    let cmdate = new Date(this.FromDate);
    return cmdate.getFullYear();
  }
  returnemonth(){
    let cmdate = new Date(this.ToDate.toString());
    return cmdate.getMonth();
  }
  returneyear(){
    let cmdate = new Date(this.ToDate.toString());
    return cmdate.getFullYear();
  }

  getPurchaseHistoryCount() {
    
    
    this.sendMessage('start');
    try {
      this.orderService.getPurchaseHistoryCount(Common.getWithExpiry("CustID"), this.returnsyear(), this.returneyear(),this.returnsmonth(), this.returnemonth(),this.itemname).subscribe((res: any) => {
        var getdata = res;
        this.sendMessage('stop');
        this.totalPage = (res == null ? 0 : getdata.count);
        this.IsShow = (res == null ? false : (getdata.count > 9 ? true : false));
        this.getPurchaseHistory();
      });
    } catch (ec) {
      this.sendMessage('stop');
    }
  }
  getDescrToShow() {
    this.DescrToShow = Common.getWithExpiry("DescrToShow");
    if (this.DescrToShow == null || this.DescrToShow == undefined) {
      this.dataService.GetDescrToShow().subscribe((data: any) => {
        this.DescrToShow = data;
        Common.setWithExpiry("DescrToShow", this.DescrToShow);
      });
    }
  }

  getPurchaseHistory() {
    this.sendMessage('start');
    try {
      this.orderService.getPurchaseHistory(Common.getWithExpiry("CustID"),  this.returnsyear(), this.returneyear(),this.returnsmonth(), this.returnemonth(), this.page, this.stype,this.itemname).subscribe((res: any) => {
        var aa = res;
        this.sendMessage('stop');
        var groupedData = [];
        this.finalorderList = [];

        for (var i = 0; i < aa.length; i++) {
          if (groupedData.length > 0) {
            var isMatched = false;
            for (var j = 0; j < groupedData.length; j++) {
              if (aa[i].sum_key_2 == groupedData[j].sum_key_2) {
                groupedData[j].amt += aa[i].amt;
                groupedData[j].qty += aa[i].qty;
                isMatched = true;
                break;
              }
            }
            if (!isMatched) {
              groupedData.push(aa[i]);
            }
          }
          else {
            groupedData.push(aa[i]);
          }
        }
        //this.orderList = groupedData;
        //this.finalorderList = this.orderList;
        for (let oo of groupedData) {
          this.dataService.getProductDetailName(oo.sum_key_2, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
            var item1 = res;
            if (item1 != null) {
              var units = item1.um.replace('[', '').replace(']', '').split(',')[0];
              item1.descr = item1.itemdesc;
              Common.Setdescriptionforitem(item1, this.DescrToShow);
              oo.descrarray = item1.descrarray;
              oo.descrstring = item1.descrstring;
              oo.image = item1.image;
              oo.links = item1.links;
              oo.um_displayQty = 1;
              oo.um_display=item1.um_display;

              var getunits = JSON.parse(item1.um);

              var getum_qty = JSON.parse(item1.umqty);

              for (var i = 0; i < getunits.length; i++) {
                if (item1.um_display == getunits[i]) {
                  oo.um_displayQty = getum_qty[i - 1];
                }
              }

              if (oo.um_displayQty == undefined || oo.um_displayQty == 0) {
                oo.um_displayQty = 1;
              }
              oo.units = units;
              this.finalorderList.push(oo);
            }
            else {
              oo.flag = true;
              if (this.showwebiteminpurchasehistory === '1') {
                this.finalorderList.push(oo);
              }
            }



          });

        }
      })
    } catch (ex) {
      this.sendMessage('stop');
    }
  }

  updated() {
    this.SetDates();
  }
  updatedNew(stypes) {
    this.stype = stypes;
    this.SetDates();
  }

  toggaleforitem() {
    if (this.stype == 1) {
      this.stype = 2;
      this.SetDates();
    }
    else if (this.stype == 2) {
      this.stype = 1;
      this.SetDates();
    }
    else {
      this.stype = 1;
      this.SetDates();
    }
  }
  toggaleforQUANTITY() {
    if (this.stype == 3) {
      this.stype = 4;
      this.SetDates();
    }
    else if (this.stype == 4) {
      this.stype = 3;
      this.SetDates();
    }
    else {
      this.stype = 3;
      this.SetDates();
    }
  }

  toggaleforAMOUNT() {
    if (this.stype == 5) {
      this.stype = 6;
      this.SetDates();
    }
    else if (this.stype == 6) {
      this.stype = 5;
      this.SetDates();
    }
    else {
      this.stype = 5;
      this.SetDates();
    }
  }

  SetDates() {

    //this.ToMonth = this.Month;
    //this.ToYear = this.Year;
    //this.ToDate = this.ToMonth + '-' + this.ToYear;

    //if (this.YTDType == 1) {
      // this.FromMonth = this.Month - 1 == 0 ? 12 : this.Month - 1;
//      this.FromMonth = (this.Month == 12 ? 1 : parseInt(this.Month) + 1);
//      this.FromYear = (this.Month == 12 ? this.Year : this.Year - 1);
      //this.FromDate = this.FromMonth + '-' + this.FromYear;
  //  }

//    if (this.YTDType == 2) {
  //    this.FromMonth = 1;
    //  this.FromYear = this.Year;
      //this.FromDate = this.FromMonth + '-' + this.FromYear;
   // }
    this.getPurchaseHistoryCount();

  }
  getorderlistpage(page) {
    this.page = page;
    this.getPurchaseHistory();
    return this.page;
  }

  itemstoavails: any;
  productlistforQuickorder: any;
  productlistforQuickorder1: any;
  GetCartmethodformuscle() {
    this.productlistforQuickorder1 = [];
    this.sendMessage('start');
    try {
      this.dataService.GetProductListForQuickOrder().subscribe((res: any) => {
        this.productlistforQuickorder = res;
        this.sendMessage('stop');
        var bulkPrice = [];
        for (let img of this.productlistforQuickorder) {
          // var desrc = img.descr.trim().replace('[', '').replace(']', '').split('"');
          // var desrc1 = [];
          // for (var i = 0; i < desrc.length; i++) {
          //   desrc[i] = desrc[i].trim().replace('"', '').replace('"', '').replace(',', '');
          //   if (desrc[i] != '') {
          //     desrc1.push(desrc[i]);
          //   }
          // }
          // img.description1 = desrc1;

          try {
            var dept1 = [];
            try {

              dept1 = JSON.parse(img.descr);
            } catch (ex) {

              img.descr = img.descr.replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';');
              img.descr = img.descr.replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '')
                .replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '');
              dept1 = img.descr.replace('[', '').replace(']', '').split(';');
            }
            var des1 = '';
            var des2 = [];
            for (let newdesrc of dept1) {
              newdesrc = newdesrc.trim();
              if (newdesrc != '') {
                des1 = des1 + newdesrc;
                des2.push(newdesrc);
              }
            }
            img.description1 = des2;
            img.descr = des1;

          } catch (ex) { }

          var um = img.um.trim().replace('[', '').replace(']', '').split(',');

          var getindex = 0;
          var cnt = 0;
          for (var i = 0; i < um.length; i++) {
            um[i] = um[i].trim();
            um[i] = um[i].replace('"', '').replace('"', '');
            if (um[i] != '') {
              if (um[i] == img.um_display) {
                getindex = (cnt - 1);
              }
              cnt = cnt + 1;
            }
          }

          var umqty = img.um_qty.trim().replace('[', '').replace(']', '').split(',');

          try {
            img.qty = umqty[(getindex)];
          } catch (ed) { img.qty = 1; }
          if (img.qty == undefined || img.qty == 0 || img.qty < 0) {
            img.qty = 1;
          }

          this.itemstoavails = this.itemstoavails + img.item1 + ',';
          bulkPrice.push({
            "customer": Common.getWithExpiry("CustID"),
            "item": img.item1,
            // "unit": img.um_display.trim(),
            "quantity": img.qty,
            "warehouse": Common.getWithExpiry("warehouse"),
            "rounding": this.PriceRound,
            "qty_unit": img.um_display.trim(),
            "company_sy": Common.getWithExpiry("company_sy")
          })
        }
        if (bulkPrice != null && bulkPrice != undefined && bulkPrice.length > 0) {
          this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
            var data = res;
            for (var i = 0; i < this.productlistforQuickorder.length; i++) {
              for (var j = 0; j < data.length; j++) {
                if (this.productlistforQuickorder[i].item1 == data[j].item) {
                  this.productlistforQuickorder[i].price = parseFloat(data[j].extension) / parseFloat(data[j].quantity);
                  this.productlistforQuickorder1.push(this.productlistforQuickorder[i]);
                }
              }
            }

          });
        }
      });
    } catch (ed) {
      this.sendMessage('stop');
    }
  }



  onKeydownq(event, item, i) {
    if (event.key === "Enter" && item.quantity > 0) {
      this.Addtocartnew(item, i);
    }
    else {
      if (item.quantity < 0) {
        this.toastr.error("Invalid Quantity");
      }
    }
  }
  onbluereventq(item) {
    if (item.quantity > 0) {
      this.itemList.push(item);
    }
    else {
      if (item.quantity < 0) {
        this.toastr.error("Invalid Quantity");
      }
    }
  }

  addToCartMultipleq() {
    for (var i = 0; i < this.itemList.length; i++) {
      if (this.itemList[i].quantity > 0) {
        this.Addtocartnew(this.itemList[i], i);
      }
      else {
        if (this.itemList[i].quantity < 0) {
          this.toastr.error("Invalid Quantity");
        }
      }
    }
    this.itemList = [];
    //$(".reordertext").val('');
  }

  Addtocartq(getitem, indexs) {
    try {
      if (getitem.quantity != undefined) {
        if (getitem.quantity > 0) {

          this.dataService.getProductDetailName(getitem.item1, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
            var item1 = res;
            if (item1 != null) {
              var units = item1.um.replace('[', '').replace(']', '').split(',')[0];
              getitem.units = units.replace('"', '').replace('"', '');
            }
            else {
              this.toastr.error(getitem.item1 + " is not available", 'Message!');
              indexs = indexs + 1;
              //$("#" + indexs).focus();
              const element = this.renderer.selectRootElement("#Product" + indexs.toString());
              element.focus();
            }
          });
          var getitem12 = {
            items: getitem.item1,
            warehouse: Common.getWithExpiry("warehouse"),
            company_sy: Common.getWithExpiry("company_sy")
          }
          var usrid = null;
          if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle == '1') {
            usrid = Common.getWithExpiry("UserID") + Common.getWithExpiry("CustID");
          }
          else {
            usrid = Common.getWithExpiry("CustID");
          }
          this.cartService.getCartItemByUserID().subscribe((res: any) => {
            this.cartProducts = res;
            var getproduct = null;
            for (let cprod of this.cartProducts) {
              if (cprod.itemname == getitem.item1) {
                getproduct = cprod;
              }
            }
            this.dataService.getProductavailibity(getitem12).subscribe((res: any) => {
              var availdata = res;
              // if(availdata[0].available > 0){
              var bulkPrice = [];
              // getitem.units = getitem.units.replace('"','').replace('"','');
              var qty = parseFloat(getitem.quantity) + (getproduct == null ? 0 : parseFloat(getproduct.Quantity))
              bulkPrice.push({
                "customer": Common.getWithExpiry("CustID"),
                "item": getitem.item1,
                // "unit": getitem.um_display,
                "quantity": qty,
                "warehouse": Common.getWithExpiry("warehouse"),
                "rounding": this.PriceRound,
                "qty_unit": getitem.um_display,
                "company_sy": Common.getWithExpiry("company_sy")
              })
              this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
                var data = res;
                if(this.iskrayden && data[0].origin != 'CI' && data[0].origin != 'SP'){
                  getitem.list_price = getitem.list_price;
                }
                else{
                getitem.list_price = parseFloat(data[0].extension) / parseFloat(data[0].quantity);
                }
                getitem.itemname = getitem.item1;
                var usrid = null;
                if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle == '1') {
                  usrid = Common.getWithExpiry("UserID");
                }
                else {
                  usrid = Common.getWithExpiry("CustID");
                }
                this.cartService.addProductToCart(getitem, getitem.um_display).subscribe((res: any) => {
                  this.cartService.cartBroadCaster(res);
                  getitem.quantity = "";
                })
              })
              if (availdata[0].available > 0) {
                this.toastr.success(getitem.quantity + " " + this.getumdescbyumcode(getitem.um_display.trim().replace('"', '').replace('"', '')) + " of item " + getitem.item1 + " has been added to your cart.", 'Success!');
              }
              else {
                this.toastr.info(getitem.quantity + " " + this.getumdescbyumcode(getitem.um_display.trim().replace('"', '').replace('"', '')) + " of item " + getitem.item1 + " has been added to your cart." + " is not available", 'Message!');
              }
              indexs = indexs + 1;
              //$("#" + indexs).focus();
              const element = this.renderer.selectRootElement("#Product" + indexs.toString());
              element.focus();
            });
          });
        }
        else {
          this.toastr.error("Invalid Quantity", 'Message!');
          //$("#" + indexs).focus();
          const element = this.renderer.selectRootElement("#Product" + indexs.toString());
          element.focus();
        }
      }
    } catch (exception) {
      this.toastr.error("Cannot be added to cart", 'Product not available!');
      indexs = indexs + 1;
      //$("#" + indexs).focus();
      const element = this.renderer.selectRootElement("#Product" + indexs.toString());
      element.focus();
    }
  }









}
