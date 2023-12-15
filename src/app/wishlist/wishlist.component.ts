import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Common } from '../../app/model/common.model';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';
import { SEOService } from '../services/seo.service';
// import * as $ from 'jquery';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {
  configforcartbyprofile: any;
  AddToCartAsPerProfileNo: any;
  AddToCartAsPerProfileArrayNo: any;
  wishlist: any;
  currentwishlist: any;
  currentproductlist: any;
  addtonotavail: any;
  showdiv: string;
  itemList: any;
  newitem: any;
  warehouse: any;
  cartProducts: any;
  dataSource: any;
  Multiply: any;
  MinQty: any;
  MaxQty: any;
  AddZero: any;
  umdescrlist: any;
  isumdescr: any;
  IsMuscle: any;
  isprofiledesc: any;
  PriceRound: any;
  baseitemShow: any;
  UrlWithFreeForm: any;
  UrlWithDetails: any;
  show3D: any;
  DescrToShow: any;
  priceshowcust: any = '1';
  wishlistlable: any;
  wishlistproductsnote: any;
  drop_ship: any;
  addnewqtywithnewlogic: any;
  private _routerSub = Subscription.EMPTY;
  iskrayden:any;
  constructor(private http: HttpClient, private formBuilder: UntypedFormBuilder, el: ElementRef, private renderer: Renderer2, private seoService: SEOService, private cartService: CartService, private toastr: ToastrService, private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    this.iskrayden=environment.iskyraden;
    this.GetConfigforwishlistlable();
    this.Getaddnewqtywithnewlogic();
    this._routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe((value) => {
        if (this.router.url == "/wish") {
          this.ngOnInit();
        }
      });
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle(this.wishlistlable + ' - ' + geturl);
    this.seoService.setdescription(this.wishlistlable + ' - ' + geturl);
    this.seoService.setkeywords(this.wishlistlable + ' - ' + geturl);

    this.newitem = this.route.snapshot.paramMap.get('item');
    this.warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
    this.GetpriceRoundingsetting();
    this.getumdescrconfig();
    this.GetConfigtowishlistproductsnote();
    this.showpricetocustomers();
    this.getDescrToShow();
    this.getAddZero();
    this.getaddtonotavail();
    this.getIsMuscle();
    this.getMultiplyQtySetting();
    this.getMinQtySetting();
    this.getMaxQtySetting();
    this.getisprofiledesc();
    this.getbaseitemShow();
    this.getUrlWithDetails();
    this.getUrlWithFreeForm();
    this.get3dsetting();
    this.GetConfigForAddToCartAsPerProfile();
    this.GetGetAddToCartAsPerProfileNo();
    this.GetAddToCartAsPerProfileArrayNo();
    this.cofigurtiondfordrop_ship();
    if (this.newitem != null && this.newitem != '' && this.newitem != undefined) {
      var getyea = new Date();
      var name1 = getyea.toUTCString();
      this.dataService.Addwishlistheader(null, name1, Common.getWithExpiry("CustID"), null, 1).subscribe((res: any) => {
        var results = res;
        if (results > 0) {
          this.getwishlist();
          this.dataService.AddProducttowishlist(null, results, this.newitem, 1).subscribe((res: any) => {
            var results1 = res;
            if (results1) {
              this.newitem = '';
              this.createnewlist(results);
            }
            else {
              this.toastr.error("Error Occured Please Try Again", 'Message!');
            }
          });
        }
      });
    }
  }
  ngOnDestroy() {
    this._routerSub.unsubscribe();
  }
  searchallnew(token) {
    this.dataSource = this.filterResults(token);
  }

  onplus(pro) {
    if (pro.quantity > 0) {
      pro.quantity = pro.quantity + 1;
    }
    else {
      pro.quantity = 1;
    }
  }

  onminus(pro) {
    if (pro.quantity > 0) {
      pro.quantity = pro.quantity - 1;
    }
    else {
      pro.quantity = 0;
    }
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
    return this.http.post(environment.APIUrl + '/Product/GetProductListBySearchforheader', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) })
      .map((results: any[]) => results.filter(res => res.freeform.toLowerCase().indexOf(token.toLowerCase()) > -1));
  }
  typeaheadOnSelect(event) {
    if (event.item != undefined && event.item != null) {
      this.newitem = event.item.itemname;
    }
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
  GetConfigtowishlistproductsnote() {
    this.wishlistproductsnote = this.dataService.Getconfigbykey("wishlistproductsnote");
    if (this.wishlistproductsnote == null || this.wishlistproductsnote == undefined || this.wishlistproductsnote == '') {
      this.wishlistproductsnote = Common.getWithExpiry("wishlistproductsnote");
    }
    if (this.wishlistproductsnote == null || this.wishlistproductsnote == undefined || this.wishlistproductsnote == '') {
      this.dataService.GetConfigtowishlistproductsnote().subscribe((data: any) => {
        this.wishlistproductsnote = data;
        Common.setWithExpiry("wishlistproductsnote", this.wishlistproductsnote);
      });
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
  getDescrToShow() {
    this.DescrToShow = Common.getWithExpiry("DescrToShow");
    if (this.DescrToShow == null || this.DescrToShow == undefined) {
      this.dataService.GetDescrToShow().subscribe((data: any) => {
        this.DescrToShow = data;
        Common.setWithExpiry("DescrToShow", this.DescrToShow);
      });
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
  get3dsetting() {
    this.show3D = Common.getWithExpiry("show3D");
    if (this.show3D == null || this.show3D == undefined || this.show3D == '') {
      this.dataService.Get3DSetting().subscribe((res: any) => {
        this.show3D = res;
        Common.setWithExpiry("show3D", this.show3D);
      });
    }
  }
  GetConfigForAddToCartAsPerProfile() {
    this.configforcartbyprofile = Common.getWithExpiry("configforcartbyprofile");
    if (this.configforcartbyprofile == null || this.configforcartbyprofile == undefined || this.configforcartbyprofile == '') {
      this.dataService.GetConfigForAddToCartAsPerProfile().subscribe((res: any) => {
        this.configforcartbyprofile = res;
        Common.setWithExpiry("configforcartbyprofile", this.configforcartbyprofile);
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
  getbaseitemShow() {
    this.baseitemShow = Common.getWithExpiry("baseitemShow");
    if (this.baseitemShow == null || this.baseitemShow == undefined) {
      this.dataService.Getthebaseitemconfiguration().subscribe((data: any) => {
        this.baseitemShow = data;
        Common.setWithExpiry("baseitemShow", this.baseitemShow);
      })
    }
  }
  getisprofiledesc() {
    this.isprofiledesc = Common.getWithExpiry("isprofiledesc");
    if (this.isprofiledesc == null || this.isprofiledesc == undefined || this.isprofiledesc == '') {
      this.dataService.GetConfigforisprofiledesc().subscribe((res: any) => {
        this.isprofiledesc = res;
        Common.setWithExpiry("isprofiledesc", this.isprofiledesc);
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
  itemstoavails: any;
  productlistforQuickorder: any;
  productlistforQuickorder1: any;
  GetCartmethodformuscle() {
    this.productlistforQuickorder1 = [];
    this.dataService.GetProductListForQuickOrder().subscribe((res: any) => {
      this.productlistforQuickorder = res;
      var bulkPrice = [];
      for (let img of this.productlistforQuickorder) {
        Common.Setdescriptionforitem(img, this.DescrToShow);
        // try {
        //   var dept1 = [];
        //   try {
        //     dept1 = JSON.parse(img.descr);
        //   } catch (ex) {

        //     img.descr = img.descr.replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';');
        //     img.descr = img.descr.replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '')
        //       .replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '');
        //     dept1 = img.descr.replace('[', '').replace(']', '').split(';');
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
        //   img.description1 = des2;
        //   img.descr = des1;

        // } catch (ex) {  }

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
          "quantity": 1,
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
  findandreplace(stringval) {
    try {
      stringval = stringval.trim();
      stringval = stringval.replace(new RegExp("\/", "g"), '');
      stringval = stringval.replace(new RegExp("#", "g"), '');
    } catch (ed) { }
    return stringval;
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

  getUrlWithDetails() {
    this.UrlWithDetails = Common.getWithExpiry("UrlWithDetails");
    if (this.UrlWithDetails == null || this.UrlWithDetails == undefined) {
      this.dataService.GetUrlWithDetailssetting().subscribe((data: any) => {
        this.UrlWithDetails = data;
        Common.setWithExpiry("UrlWithDetails", this.UrlWithDetails);
      })
    }
  }
  getUrlWithFreeForm() {
    this.UrlWithFreeForm = Common.getWithExpiry("UrlWithFreeForm");
    if (this.UrlWithFreeForm == null || this.UrlWithFreeForm == undefined) {
      this.dataService.GetUrlWithFreeFormsetting().subscribe((data: any) => {
        this.UrlWithFreeForm = data;
        Common.setWithExpiry("UrlWithFreeForm", this.UrlWithFreeForm);
      })
    }
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

  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  ngOnInit() {
    this.gototop();
    if (Common.getWithExpiry("CustID") == undefined || Common.getWithExpiry("CustID") == '' || Common.getWithExpiry("CustID") == null) {
      this.router.navigate(['login']);
    }
    else {
      this.showdiv = '1';
      this.getwishlist();
    }
  }


  goback() {
    this.showdiv = '1';
    this.ngOnInit();
  }

  getwishlist() {
    this.dataService.GetUserwishlist(Common.getWithExpiry("CustID"), 1).subscribe((res: any) => {
      this.wishlist = res;
    });
  }
  onbluerevent(item) {
    if (item.quantity > 0) {
      this.itemList.push(item);
    }
  }
  onKeydown(event, item, i) {
    if (event.key === "Enter" && item.quantity > 0) {
      this.Addtocart(item, i);
    }
    else {
      if (item.quantity < 0) {
        item.quantity = 1;
        this.toastr.error("Invalid Quantity", 'Message!');
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

              if (item1 != null) {
                if (this.drop_ship == '0') {
                  item1.drop_ship = false;
                }
                item1.quantity = getitem.quantity;
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
              }

              var getitem12 = {
                items: getitem.itemname,
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
                var bulkPrice = [];
                var qty = parseFloat(getitem.quantity) + (getproduct == null ? 0 : parseFloat(getproduct.Quantity))
                bulkPrice.push({
                  "customer": Common.getWithExpiry("CustID"),
                  "item": getitem.itemname,
                  "quantity": qty,
                  "warehouse": Common.getWithExpiry("warehouse"),
                  "rounding": this.PriceRound,
                  "qty_unit": getitem.units.trim().replace('"', '').replace('"', ''),
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
                  getitem.itemname = getitem.itemname;
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
                  if ((this.configforcartbyprofile == '1' && profilefor != undefined && profilefor != null && (profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1].toUpperCase() == 'NO' || profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1].toLowerCase() == 'no')) && ((data[0].origin != 'CI'))) {
                    this.toastr.error("User RFQ for this Item");
                    return;
                  }
                  getitem.TotQty = getitem.TotQty + parseFloat(getitem.quantity) * parseFloat(getum);

                  if (item1.min != undefined && item1.min != "0" && getitem.TotQty < item1.min && this.MinQty == true) {
                    this.toastr.error("Minimum quantity should be " + item1.min + ' of ' + this.getumdescbyumcode(units.trim()));
                    return;
                  }
                  else if (item1.max != undefined && item1.max != "0" && getitem.TotQty > item1.max && this.MaxQty) {
                    this.toastr.error("Maximum quantity should be " + item1.max + ' of ' + this.getumdescbyumcode(units.trim()));
                    return;
                  }
                  else if (item1.qty_warn != undefined && item1.qty_warn != "0" && (this.Multiply == '1' || this.Multiply == 1) && (parseFloat(getitem.quantity) * parseFloat(getum)) % item1.qty_warn != 0) {
                    this.toastr.error("Please enter item in multiple of " + item1.qty_warn / parseInt(getum) + ' of ' + this.getumdescbyumcode(item1.um_display));
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
                  try {
                    if (this.addtonotavail == 0 && getitem.TotQty > (parseFloat((this.addnewqtywithnewlogic == '1' ? availdata[0].availablenew : availdata[0].available))) && item1.drop_ship == false) {
                      this.toastr.error("you can not add quantity more than available quantity.");
                      return;
                    }
                  } catch (ed) { }

                  if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
                    usrid = Common.getWithExpiry("UserID");
                  }
                  else {
                    usrid = Common.getWithExpiry("CustID");
                  }
                  this.cartService.addProductToCart(getitem, getitem.units.trim()).subscribe((res: any) => {
                    this.cartService.cartBroadCaster(res);
                    this.toastr.success(getitem.quantity + " " + this.getumdescbyumcode(getitem.units.trim().replace('"', '').replace('"', '')) + " of item " + getitem.itemname + " has been added to your cart.", 'Success!');
                    getitem.quantity = "";
                  })
                  i = i + 1;
                  //$("#" + i).focus();

                })
              });
            });
          });
        }
        else {
          this.toastr.error("Invalid Quantity", 'Message!');
          //$("#" + i).focus();
        }

      }

    } catch (exception) {
      this.toastr.error("Cannot be added to cart", 'Product not available!');
      i = i + 1;
      //$("#" + i).focus();
    }
  }
  getproductprice(bulkPrice) {
    if (bulkPrice != null && bulkPrice != undefined && bulkPrice.length > 0) {
      this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
        var data = res;
        for (var i = 0; i < this.currentproductlist.length; i++) {
          for (var j = 0; j < data.length; j++) {
            if (this.currentproductlist[i].itemname == data[j].item) {
              this.currentproductlist[i].price = parseFloat(data[j].extension) / parseFloat(data[j].quantity);
            }
          }
        }
      });
    }
  }


  GetwishlistProductByID(wishlistId) {
    this.dataService.GetwishlistProductByID(wishlistId, Common.getWithExpiry("CustID")).subscribe((res: any) => {
      this.currentproductlist = res;
      var bulkPrice = [];
      for (let oo of this.currentproductlist) {

        if (oo.item.indexOf('~') != -1) {
          var name = oo.item.split('~');
          oo.item = name[0];
          oo.itemBase = name[1];
        }

        this.dataService.getProductDetailName(oo.item, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
          var item1 = res;
          if (item1 != null) {
            oo.image = item1.image;
            oo.prodlinename = item1.prodlinename;
            oo.itemname = item1.itemname;
            oo.UM = item1.um_display;
            oo.freeform = item1.freeform;
            oo.itemdesc = item1.itemdesc;
            oo.descr = item1.itemdesc;
            oo.links = item1.links;
            Common.Setdescriptionforitem(oo, this.DescrToShow);
            bulkPrice.push({
              "customer": Common.getWithExpiry("CustID"),
              "item": oo.itemname,
              "quantity": 1,
              "warehouse": Common.getWithExpiry("warehouse"),
              "rounding": this.PriceRound,
              "qty_unit": oo.UM,
              "company_sy": Common.getWithExpiry("company_sy")
            })
            //Common.gotoproductdetails(oo,this.UrlWithDetails,this.UrlWithFreeForm);
            item1.descr = item1.itemdesc;
            Common.Setdescriptionforitem(item1, this.DescrToShow);
            // try {
            //   var dept1 = [];
            //   try {
            //     dept1 = JSON.parse(item1.itemdesc);
            //   } catch (ex) {

            //     item1.itemdesc = item1.itemdesc.replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';');
            //     item1.itemdesc = item1.itemdesc.replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '')
            //       .replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '');
            //     dept1 = item1.itemdesc.replace('[', '').replace(']', '').split(';');
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
            //   des2.push(oo.itemBase)
            //   oo.desclist = des2;
            //   oo.descr1 = oo.itemBase + ' ' + des1;
            // } catch (ex) { }
            if (bulkPrice != null && bulkPrice != undefined && bulkPrice.length > 0 && bulkPrice.length == this.currentproductlist.length) {
              this.getproductprice(bulkPrice);
            }

          }
        });
      }

    });
  }
  DeletewishlistByID(wishlistId) {
    this.dataService.Deletewishlistbyusername(wishlistId).subscribe((res: any) => {
      var results = res;
      if (results) {
        this.goback();
      }
      else {
        this.toastr.error("Error Occured Please Try Again", 'Message!');
      }
    });
  }
  AddNewItem() {
    this.dataService.getProductDetailNameForXref(this.newitem, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
      var item1 = res;
      if (item1 != null && item1 != undefined) {

        var profile1 = JSON.parse(item1.profile1);
        if ((profile1[1] != "" && this.show3D == '1') && (profile1[2] == 'YES' || profile1[2] == 'yes')) {
          item1.IsBaseProduct = true;
        }
        else {
          item1.IsBaseProduct = false;
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
      // if ((this.configforcartbyprofile == '1' && profilefor != undefined && profilefor != null && (profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1] == 'NO' || profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1].toLowerCase() == 'no'))) {
      //   this.toastr.error("Product is Not Available");
      //   return;
      // }
      if ((item1 != null && item1.IsGrouped == false && item1.IsBaseProduct == false) || (item1 != null && item1.IsGrouped == true && this.baseitemShow == '1')) {
        this.AddProducttowishlist(null, this.currentwishlist.WishlistID, this.newitem, 1);
      }
      else {
        this.toastr.error("Invalid Item", 'Message!');
      }
    });
  }

  AddProducttowishlist(WishlistitemID, WishlistID, item, Qty) {
    this.dataService.AddProducttowishlist(WishlistitemID, WishlistID, item, Qty).subscribe((res: any) => {
      var results = res;
      if (results) {
        this.newitem = '';
        this.createnewlist(WishlistID);
      }
      else {
        this.toastr.error("Error Occured Please Try Again", 'Message!');
      }
    });
  }
  Clicktoeditwishlist(currentwishlist) {
    currentwishlist.canEditCode = true;
    //window.setTimeout(() =>{
    const element = this.renderer.selectRootElement("#WishlistName");
    element.focus();
    //});
  }
  Addwishlistheader(WishlistName) {

    if (WishlistName == undefined || WishlistName == undefined || WishlistName == null || WishlistName == '') {
      this.toastr.error("Enter the " + this.wishlistlable + " name", 'Message!');
    }
    else {
      this.currentwishlist.WishlistName = WishlistName;
      this.currentwishlist.canEditCode = false;
      this.dataService.Addwishlistheader(this.currentwishlist.WishlistID, this.currentwishlist.WishlistName, Common.getWithExpiry("CustID"), null, 1).subscribe((res: any) => {
        var results = res;
        if (results == 0) {
          this.toastr.error("Error Occured Please Try Again", 'Message!');
        }
        else {
          this.toastr.success("Updated Successfully", 'Message!');
        }
      });
    }
  }

  addToCartMultiple() {
    for (var i = 0; i < this.itemList.length; i++) {
      if (this.itemList[i].quantity < 0 || this.itemList[i].quantity == 0 || this.itemList[i].quantity == undefined) {
        this.toastr.success("Invalid quantity", 'Message!');
      }
      else {
        this.Addtocart(this.itemList[i], i);
      }
    }
    this.itemList = [];
    //$(".text-input").val('');
  }

  createnewlist(WishlistID) {
    if (WishlistID > 0) {
      this.showdiv = '2';
      this.Getcurrentwishlist(WishlistID);
      this.GetwishlistProductByID(WishlistID);
    }
    else {
      var getyea = new Date();
      var name1 = getyea.toUTCString();
      this.dataService.Addwishlistheader(null, name1, Common.getWithExpiry("CustID"), null, 1).subscribe((res: any) => {
        var results = res;
        if (results > 0) {
          this.dataService.GetUserwishlist(Common.getWithExpiry("CustID"), 1).subscribe((res: any) => {
            this.wishlist = res;
            this.createnewlist(results);
          });
        }
      });
    }
  }
  navigatetowishdetails(WishlistID) {
    this.showdiv = '2';
    this.itemList = [];
    this.Getcurrentwishlist(WishlistID);
    this.GetwishlistProductByID(WishlistID);
  }
  Getcurrentwishlist(WishlistID) {
    for (let wish1 of this.wishlist) {
      if (wish1.WishlistID == WishlistID) {
        this.currentwishlist = wish1;
      }
    }
  }
  DeleteProducttowishlist(WishlistID, wishlistproductid) {
    this.dataService.DeleteProducttowishlist(wishlistproductid).subscribe((res: any) => {
      var results = res;
      if (results) {
        this.createnewlist(WishlistID);
      }
      else {
        this.toastr.error("Error Occured Please Try Again", 'Message!');
      }
    });
  }
}
