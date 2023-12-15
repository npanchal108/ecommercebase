import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { OrderManagementService } from '../../services/order-management.service';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { NG_VALIDATORS, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { Common } from '../../model/common.model';
import { SEOService } from '../../services/seo.service';
// import * as _ from 'lodash';
// import Rx from 'rxjs/Rx';
// import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Customer-Products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent implements OnInit {
  configforcartbyprofile: any;
  AddToCartAsPerProfileNo: any;
  AddToCartAsPerProfileArrayNo: any;
  addtonotavail: any;
  totalPage: any;
  IsShow: any;
  AddZero: any;
  Multiply: any;
  cartProducts: any;
  page: number = 1;
  MinQty: any;
  searchModel: any = {};
  orderList: any = [];
  finalorderList: any = [];
  getdate: any;
  getyearlist: any = [];
  Year: any;
  Month: any;
  YTDType: any;
  webtype: string;

  ToMonth: any;
  ToYear: any;
  FromMonth: any;
  FromYear: any;
  ifpur: boolean = false;
  ToDate: any;
  FromDate: any;
  itemList: any = [];
  nameField: any;
  isreorder: any;
  warehouse: any;
  IsMuscle: any;
  UserType: any;
  MaxQty: any;
  PriceRound: any;
  bulkPrice = [];
  itemname:any='';
  priceshowcust: any = '1';
  itemsearchincustomerproducts:any;
  constructor(private formBuilder: UntypedFormBuilder, el: ElementRef, private renderer: Renderer2, private seoService: SEOService, private toastr: ToastrService, private cartService: CartService, private dataService: DataService, private orderService: OrderManagementService, private router: Router) {
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Contract List - ' + geturl);
    this.seoService.setkeywords('Contract List - ' + geturl);
    this.seoService.setdescription('Contract List - ' + geturl);
    
    this.UserType = Common.getWithExpiry("UserType");
    this.warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
    for (var i = 0; i <= 10; i++) {
      var getyea = new Date();
      var years = getyea.getFullYear() - i;
      this.getyearlist.push(years);
    }
    this.Year = this.getyearlist[0];
    this.YTDType = 1;
    var d = new Date();
    this.Month = d.getMonth() + 1;
    this.SetDates();
    this.getitemsearchincustomerproducts();
    this.showpricetocustomers();
    this.getreorderconfig();
    this.GetpriceRoundingsetting();
    this.getIsMuscle();
    this.getAddZero();
    this.getMultiplyQtySetting();
    this.getMinQtySetting();
    this.getaddtonotavail();
    this.GetConfigForAddToCartAsPerProfile();

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

  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
  getitemsearchincustomerproducts() {
    this.itemsearchincustomerproducts = Common.getWithExpiry("itemsearchincustomerproducts");
    if (this.itemsearchincustomerproducts == null || this.itemsearchincustomerproducts == undefined || this.itemsearchincustomerproducts == '') {
      this.dataService.getitemsearchincustomerproducts().subscribe((res: any) => {
        this.itemsearchincustomerproducts = res;
        Common.setWithExpiry("itemsearchincustomerproducts", this.itemsearchincustomerproducts);
      });
    }
  }

  clearall(){
this.itemname='';
this.SetDates();
  }
  ngOnInit() {

    this.gototop();
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
  getaddtonotavail() {
    this.addtonotavail = Common.getWithExpiry("addtonotavail");
    if (this.addtonotavail == null || this.addtonotavail == undefined || this.addtonotavail == '') {
      this.dataService.GetConfigForisaddifunavail().subscribe((res: any) => {
        this.addtonotavail = res;
        Common.setWithExpiry("addtonotavail", this.addtonotavail);
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


  setprice() {

    if (this.bulkPrice != null && this.bulkPrice != undefined && this.bulkPrice.length > 0) {
      this.cartService.getBulkPrice(this.bulkPrice).subscribe((res: any) => {
        var data = res;
        for (var i = 0; i < this.finalorderList.length; i++) {
          for (var j = 0; j < data.length; j++) {
            if (this.finalorderList[i].itemname == data[j].item) {
              this.finalorderList[i].list_price = parseFloat(data[j].extension) / parseFloat(data[j].quantity);
            }
          }
        }

      });
    }
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

  onKeydown(event, item, i) {
    if (event.key === "Enter" && item.quantity > 0) {
      this.Addtocart(item, i);
    }
  }
  onbluerevent(item) {
    if (item.quantity > 0) {
      this.itemList.push(item);
    }
  }

  setjsonlist(list1) {
    var lits2 = [];
    for (var i = 0; i < list1.length; i++) {
      if (list1[i] != undefined && list1[i] != null && list1[i] != '') {
        lits2.push(list1[i]);
      }
    }
    return lits2;
  }

  addToCartMultiple() {
    for (var i = 0; i < this.itemList.length; i++) {
      this.Addtocart(this.itemList[i], i);
    }
    this.itemList = [];
    // $(".text-input").val('');
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




  Addtocart(getitem, i) {
    try {
      if (getitem.quantity != undefined) {
        if (getitem.quantity > 0) {
          var usrid = null;
          if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
            usrid = Common.getWithExpiry("UserID") + Common.getWithExpiry("CustID");
          }
          else {
            usrid = Common.getWithExpiry("CustID");
          }
          this.cartService.getCartItemByUserID().subscribe((res: any) => {
            this.cartProducts = res;

            var getum = '1';
            this.dataService.getProductDetailName(getitem.itemname, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
              var item1 = res;
              item1.quantity = getitem.quantity;
              if (item1 != null) {
                if (this.cartProducts != undefined && this.cartProducts.length > 0) {
                  for (let cprod of this.cartProducts) {
                    if (cprod.itemname == item1.itemname) {
                      var getums = JSON.parse(cprod.um);
                      var getumsqty = JSON.parse(cprod.umqty);
                      for (var i = 0; i < getums.length; i++) {
                        if (i == 0 && getums[i] != '') {
                          item1.firstum = getums[i];
                          item1.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
                          if (i == 0 && getums[i] == cprod.MeasureUnit) {
                            item1.TotQty = item1.TotQty + (cprod.Quantity * 1);
                          }
                          if (getums[i] == cprod.um_display) {
                            item1.um_displayQty = 1;
                            item1.Qty = (cprod.Quantity * 1);
                          }
                        }
                        else if (i != 0 && getums[i] != '') {
                          if (getums[i] == cprod.um_display) {
                            item1.Qty = (cprod.Quantity * getumsqty[i - 1]);
                            item1.um_displayQty = getumsqty[i - 1];
                          }
                          if (getums[i] == cprod.MeasureUnit) {
                            item1.TotQty = item1.TotQty + (cprod.Quantity * getumsqty[i - 1]);
                          }
                        }
                      }
                    }
                  }
                }
                var units = item1.um.replace('[', '').replace(']', '').split(',')[0];
                getitem.units = units.replace('"', '').replace('"', '');
                var getunits = JSON.parse(item1.um);
                var getum_qty = JSON.parse(item1.umqty);
                for (var i = 0; i < getunits.length; i++) {
                  if (item1.um_display == getunits[i]) {
                    getum = getum_qty[i - 1];
                  }
                }
              }
              else {
                this.toastr.error(getitem.itemname + " is not available", 'Message!');
                i = i + 1;
                //$("#" + i).focus();
                const element = this.renderer.selectRootElement("#" + i.toString());
                element.focus();
              }

              var getitem12 = {
                items: getitem.itemname,
                warehouse: Common.getWithExpiry("warehouse"),
                company_sy: Common.getWithExpiry("company_sy")
              }

              this.dataService.getProductavailibity(getitem12).subscribe((res: any) => {
                var availdata = res;
                // if(availdata[0].available > 0){
                if (item1.TotQty == undefined || item1.TotQty == null || item1.TotQty == 0) {
                  //getproduct = item1;
                  item1.Quantity = item1.quantity;
                  var getums = JSON.parse(item1.um);
                  var getumsqty = JSON.parse(item1.umqty);
                  for (var i = 0; i < getums.length; i++) {
                    if (i == 0 && getums[i] != '') {
                      item1.firstum = getums[i];
                      item1.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
                      if (getums[i] == item1.um_display) {
                        item1.um_displayQty = 1;
                        item1.Qty = (item1.Quantity * 1);
                      }
                      if (getums[i] == item1.MeasureUnit) {
                        item1.TotQty = item1.TotQty + (item1.Quantity * 1);
                      }
                    }

                    else if (i != 0 && getums[i] != '') {
                      if (getums[i] == item1.um_display) {
                        item1.Qty = (item1.Quantity * getumsqty[i - 1]);
                        item1.um_displayQty = getumsqty[i - 1];
                      }
                      if (getums[i] == item1.MeasureUnit) {
                        item1.TotQty = item1.TotQty + (item1.Quantity * getumsqty[i - 1]);
                      }
                    }
                  }
                }
                // getitem.units = getitem.units.replace('"','').replace('"','');

                var qty = parseFloat(item1.quantity) * parseFloat(item1.um_displayQty);
                var bulkPrice = [];


                bulkPrice.push({
                  "customer": Common.getWithExpiry("CustID"),
                  "item": getitem.itemname,
                  // "unit": getitem.units.trim().replace('"', '').replace('"', ''),
                  "quantity": qty,
                  "warehouse": Common.getWithExpiry("warehouse"),
                  "rounding": this.PriceRound,
                  "qty_unit": getitem.units.trim().replace('"', '').replace('"', ''),
                  "company_sy": Common.getWithExpiry("company_sy")
                })
                this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
                  var data = res;
                  getitem.list_price = parseFloat(data[0].extension) / parseFloat(data[0].quantity);
                  getitem.itemname = getitem.itemname;
                  var usrid = null;
                  getum = (getum == undefined ? '1' : getum);
                  getitem.totqty = parseFloat(getitem.quantity) * parseFloat(getum);



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
                    this.toastr.error("Product is Not Available", 'Cannot be added to cart!');
                    return;
                  }


                  item1.TotQty = item1.TotQty + parseFloat(item1.quantity) * parseFloat(item1.um_displayQty.toString());
                  try{
                    if(this.addtonotavail == 0 && item1.TotQty > item1.available){
                      this.toastr.error("you can not add quantity more than available quantity.");
                      return;
                    }
                  }catch(ed){}
                  if (item1.min != undefined && item1.min != "0" && item1.TotQty < item1.min && this.MinQty) {
                    this.toastr.error("Minimum quantity should be " + item1.min + ' of ' + item1.um_display);
                    return;
                  }

                  if (item1.max != undefined && item1.max != "0" && item1.TotQty > item1.max && this.MaxQty) {
                    this.toastr.error("Maximum quantity should be " + item1.max + ' of ' + item1.um_display);
                    return;
                  }
                  if (this.AddZero == 0 && getitem.list_price == 0 || getitem.list_price == undefined) {
                    this.toastr.error("Please Call For Pricing.", 'Cannot be added to cart!');
                    return;
                  }
                  if (this.addtonotavail == 0 && (availdata[0].available == 0 || availdata[0].available == undefined)) {
                    this.toastr.error("Product not available.", 'Cannot be added to cart!');
                    return;
                  }

                  if (item1.qty_warn != undefined && item1.qty_warn != "0" && this.Multiply == '1') {
                    if ((item1.quantity * parseFloat(item1.um_displayQty.toString())) % item1.qty_warn != 0) {
                      this.toastr.error("Please enter item in multiple of " + item1.qty_warn / item1.um_displayQty + ' of ' + item1.um_display);
                      return;
                    }
                  }
                  else {
                    if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
                      usrid = Common.getWithExpiry("UserID");
                    }
                    else {
                      usrid = Common.getWithExpiry("CustID");
                    }

                    this.cartService.addProductToCart(getitem, getitem.units.trim()).subscribe((res: any) => {
                      this.cartService.cartBroadCaster(res);

                      this.toastr.success(getitem.quantity + " " + getitem.units.trim().replace('"', '').replace('"', '') + " of item " + getitem.itemname + " has been added to your cart.", 'Success!');
                      getitem.quantity = "";
                    })


                    i = i + 1;
                    //$("#" + i).focus();
                    const element = this.renderer.selectRootElement("#" + i.toString());
                    element.focus();
                  }
                })
              });
            });
          });
        }
        else {
          this.toastr.error("Invalid Quantity", 'Message!');
          //$("#" + i).focus();
          const element = this.renderer.selectRootElement("#" + i.toString());
          element.focus();
        }

      }

    } catch (exception) {
      this.toastr.error("Cannot be added to cart", 'Product not available!');
      i = i + 1;
      //$("#" + i).focus();
      const element = this.renderer.selectRootElement("#" + i.toString());
      element.focus();
    }
  }
  getPurchaseHistoryCount() {
    this.orderService.GetCustomerProductCounts(Common.getWithExpiry("CustID"),this.itemname).subscribe((res: any) => {
      var getdata = res;
      this.totalPage = (res == null ? 0 : getdata.count);
      this.IsShow = (res == null ? false : (getdata.count > 20 ? true : false));
      this.getPurchaseHistory();
    });
  }

  getPurchaseHistory() {
    this.orderService.GetCustomerProduct(Common.getWithExpiry("CustID"), this.page,this.itemname).subscribe((res: any) => {
      var aa = res;
      // var groupedData = [];

      this.finalorderList = [];
      for (var i = 0; i < aa.length; i++) {
        // if(aa[i].itemdesc!=undefined && aa[i].itemdesc!=null && aa[i].itemdesc!=''){
        // aa[i].itemdesc =this.setjsonlist(JSON.parse(aa[i].itemdesc));
        // }

        try {
          var dept1 = [];
          try {
            dept1 = JSON.parse(aa[i].itemdesc);
          } catch (ex) {

            aa[i].itemdesc = aa[i].itemdesc.replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';');
            aa[i].itemdesc = aa[i].itemdesc.replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '')
              .replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '');
            dept1 = aa[i].itemdesc.replace('[', '').replace(']', '').split(';');
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
          aa[i].itemdesc = des2;
          aa[i].descr = des1;

        } catch (ex) { }


        this.bulkPrice.push({
          "customer": Common.getWithExpiry("CustID"),
          "item": aa[i].itemname,
          // "unit": (img.um_display==undefined ? getunit[0] : (img.um_display==null ? getunit[0] :  img.um_display)),
          "quantity": 1,
          "warehouse": Common.getWithExpiry("warehouse"),
          "rounding": this.PriceRound,
          "qty_unit": aa[i].um_display,
          "company_sy": Common.getWithExpiry("company_sy")
        })
        if (aa[i].cu_item_desc != undefined && aa[i].cu_item_desc != null && aa[i].cu_item_desc != '') {
          aa[i].cu_item_desc = this.setjsonlist(aa[i].cu_item_desc);
        }
        this.finalorderList.push(aa[i]);
      }
      // for (var i = 0; i < aa.length; i++) {
      //   if (groupedData.length > 0) {
      //     var isMatched = false;
      //     for (var j = 0; j < groupedData.length; j++) {
      //       if (aa[i].sum_key_2 == groupedData[j].sum_key_2) {
      //         groupedData[j].amt += aa[i].amt;
      //         groupedData[j].qty += aa[i].qty;
      //         isMatched = true;
      //         break;
      //       }
      //     }
      //     if (!isMatched) {
      //       groupedData.push(aa[i]);
      //     }
      //   }
      //   else {
      //     groupedData.push(aa[i]);
      //   }
      // }
      //this.orderList = groupedData;
      //this.finalorderList = this.orderList;
      // for (let oo of aa) {       
      //   this.dataService.getProductDetailName(oo.itemname,this.warehouse).subscribe((res:any) => {
      //     var item1 = res;
      //     if (item1 != null) {
      //       var units = item1.um.replace('[', '').replace(']', '').split(',')[0];
      //       var desc = item1.itemdesc.replace('[', '').replace(']', '').split(',');
      //       oo.desc = desc[0].replace('"', '').replace('"', '');
      //       oo.units = units;
      //       oo.itemdesc=JSON.parse(oo.itemdesc);
      //     }

      //     this.finalorderList.push(oo);

      //   });

      // }
      this.setprice();
      this.getMaxQtySetting();
    })
  }

  updated() {
    this.SetDates();
  }

  SetDates() {

    this.ToMonth = this.Month;
    this.ToYear = this.Year;
    this.ToDate = this.ToMonth + '-' + this.ToYear;

    if (this.YTDType == 1) {
      this.FromMonth = this.Month - 1 == 0 ? 12 : this.Month - 1;
      this.FromYear = this.Year - 1;
      this.FromDate = this.FromMonth + '-' + this.FromYear;
    }

    if (this.YTDType == 2) {
      this.FromMonth = 1;
      this.FromYear = this.Year;
      this.FromDate = this.FromMonth + '-' + this.FromYear;
    }
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
    this.dataService.GetProductListForQuickOrder().subscribe((res: any) => {
      this.productlistforQuickorder = res;
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
            dept1 = JSON.parse(img.description1);
          } catch (ex) {

            img.description1 = img.description1.replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';');
            img.description1 = img.description1.replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '')
              .replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '');
            dept1 = img.description1.replace('[', '').replace(']', '').split(';');
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
        if (img.qty == undefined || img.qty == 0) {
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
  }



  onKeydownq(event, item, i) {
    if (event.key === "Enter" && item.quantity > 0) {
      this.Addtocartq(item, i);
    }
  }
  onbluereventq(item) {
    if (item.quantity > 0) {
      this.itemList.push(item);
    }
  }

  addToCartMultipleq() {
    for (var i = 0; i < this.itemList.length; i++) {
      this.Addtocartq(this.itemList[i], i);
    }
    this.itemList = [];
    //$(".text-input").val('');
  }

  Addtocartq(getitem, i) {
    try {
      if (getitem.quantity != undefined) {
        if (getitem.quantity > 0) {

          this.dataService.getProductDetailName(getitem.item1, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
            var item1 = res;
            if (item1 != null) {
              item1.quantity = getitem.quantity;
              var units = item1.um.replace('[', '').replace(']', '').split(',')[0];
              item1.units = units.replace('"', '').replace('"', '');
            }
            else {
              this.toastr.error(getitem.item1 + " is not available", 'Message!');
              i = i + 1;
              //$("#" + i).focus();
              const element = this.renderer.selectRootElement("#" + i.toString());
              element.focus();
            }

            var getitem12 = {
              items: getitem.item1,
              warehouse: Common.getWithExpiry("warehouse"),
              company_sy: Common.getWithExpiry("company_sy")
            }
            var usrid = null;
            if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
              usrid = Common.getWithExpiry("UserID") + Common.getWithExpiry("CustID");
            }
            else {
              usrid = Common.getWithExpiry("CustID");
            }
            this.cartService.getCartItemByUserID().subscribe((res: any) => {
              this.cartProducts = res;
              //var getproduct=null;
              for (let cprod of this.cartProducts) {
                if (cprod.itemname == getitem.item1) {
                  //getproduct=cprod;
                  var getums = JSON.parse(cprod.um);
                  var getumsqty = JSON.parse(cprod.umqty);
                  for (var i = 0; i < getums.length; i++) {
                    if (i == 0 && getums[i] != '') {
                      item1.firstum = getums[i];
                      item1.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
                      if (i == 0 && getums[i] == cprod.MeasureUnit) {
                        getitem.TotQty = getitem.TotQty + (cprod.Quantity * 1);
                      }
                      if (getums[i] == item1.um_display) {
                        item1.um_displayQty = 1;
                        item1.Qty = (cprod.Quantity * 1);
                      }
                    }
                    else if (i != 0 && getums[i] != '') {
                      if (getums[i] == item1.um_display) {
                        item1.Qty = (cprod.Quantity * getumsqty[i - 1]);
                        item1.um_displayQty = getumsqty[i - 1];
                      }
                      if (getums[i] == cprod.MeasureUnit) {
                        getitem.TotQty = getitem.TotQty + (cprod.Quantity * getumsqty[i - 1]);
                      }
                    }
                  }
                }
              }
              this.dataService.getProductavailibity(getitem12).subscribe((res: any) => {
                var availdata = res;
                // if(availdata[0].available > 0){
                var bulkPrice = [];

                // getitem.units = getitem.units.replace('"','').replace('"','');

                var qty = parseFloat(item1.quantity) * parseFloat(item1.um_displayQty);
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

                  if (item1.TotQty == undefined || item1.TotQty == null || item1.TotQty == 0) {

                    item1.Quantity = item1.quantity;
                    var getums = JSON.parse(item1.um);
                    var getumsqty = JSON.parse(item1.umqty);
                    for (var i = 0; i < getums.length; i++) {
                      if (i == 0 && getums[i] != '') {
                        item1.firstum = getums[i];
                        item1.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
                        if (i == 0 && getums[i] == item1.MeasureUnit) {
                          item1.TotQty = getitem.TotQty + (item1.Quantity * 1);
                        }
                        if (getums[i] == item1.um_display) {
                          item1.um_displayQty = 1;
                          item1.Qty = (item1.Quantity * 1);
                        }
                      }
                      else if (i != 0 && getums[i] != '') {
                        if (getums[i] == item1.um_display) {
                          item1.Qty = (item1.Quantity * getumsqty[i - 1]);
                          item1.um_displayQty = getumsqty[i - 1];
                        }
                        if (getums[i] == item1.MeasureUnit) {
                          item1.TotQty = getitem.TotQty + (item1.Quantity * getumsqty[i - 1]);
                        }

                      }
                    }
                  }
                  item1.list_price = parseFloat(data[0].extension) / parseFloat(data[0].quantity);
                  item1.itemname = getitem.item1;
                  var usrid = null;
                  if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
                    usrid = Common.getWithExpiry("UserID");
                  }
                  else {
                    usrid = Common.getWithExpiry("CustID");
                  }
                  item1.TotQty = item1.TotQty + item1.quantity * parseFloat(item1.um_displayQty.toString())
                  try{
                    if(this.addtonotavail == 0 && item1.TotQty > (parseFloat(item1.available))){
                      this.toastr.error("you can not add quantity more than available quantity.");
                      return;
                    }
                  }catch(ed){}
                  if (item1.min != undefined && item1.min != "0" && item1.TotQty < item1.min && this.MinQty) {
                    this.toastr.error("Minimum quantity should be " + item1.min + ' of ' + item1.firstum);
                    return;
                  }

                  if (item1.max != undefined && item1.max != "0" && item1.TotQty > item1.max && this.MaxQty) {
                    this.toastr.error("Maximum quantity should be " + item1.max + ' of ' + item1.firstum);
                    return;
                  }



                  if (item1.qty_warn != undefined && item1.qty_warn != "0" && this.Multiply == '1') {
                    if ((getitem.quantity * parseFloat(item1.um_displayQty.toString())) % item1.qty_warn != 0) {
                      this.toastr.error("Please enter item in multiple of " + item1.qty_warn / item1.um_displayQty + ' of ' + item1.um_display);
                      return;
                    }
                  }

                  this.cartService.addProductToCart( item1, item1.um_display).subscribe((res: any) => {
                    this.cartService.cartBroadCaster(res);
                    getitem.quantity = "";
                  })
                })

                if (availdata[0].available > 0) {
                  this.toastr.success(getitem.quantity + " " + getitem.units.trim().replace('"', '').replace('"', '') + " of item " + getitem.item1 + " has been added to your cart.", 'Success!');
                }
                else {
                  this.toastr.info(getitem.quantity + " " + getitem.units.trim().replace('"', '').replace('"', '') + " of item " + getitem.item1 + " has been added to your cart." + " is not available", 'Message!');
                }
                i = i + 1;
                //$("#" + i).focus();
                const element = this.renderer.selectRootElement("#" + i.toString());
                element.focus();
              });
            });
          });
        }
        else {
          this.toastr.error("Invalid Quantity", 'Message!');
          //$("#" + i).focus();
          const element = this.renderer.selectRootElement("#" + i.toString());
          element.focus();
        }

      }

    } catch (exception) {
      this.toastr.error("Product not available", 'Message!');
      i = i + 1;
      //$("#" + i).focus();
      const element = this.renderer.selectRootElement("#" + i.toString());
      element.focus();
    }
  }









}
