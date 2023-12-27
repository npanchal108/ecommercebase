import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderManagementService } from '../../services/order-management.service';
import { DataService } from '../../services/data.service';
import { DomSanitizer } from '../../../../node_modules/@angular/platform-browser';
import { Common } from '../../../app/model/common.model';
import { ContactService } from '../../services/contact.service';
import { CheckoutService } from '../../services/checkout.service';
import { SEOService } from '../../services/seo.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../../services/loading.service';


// import * as $ from 'jquery';
@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {
  rec_type: any;
  priceshowcust: any = '1';
  orderDetail: any = [];
  orderHead: any = {};
  order: string;
  IsMuscle: any;
  contactDtl: any;
  AddZero: any;
  reorderfromorder: any;
  PriceRound: any;
  cartProducts: any;
  addtonotavail: any;
  AddToCartAsPerProfileArrayNo: any;
  configforcartbyprofile: any;
  AddToCartAsPerProfileNo: any;
  MaxQty: any;
  MinQty: any;
  Multiply: any;
  type: number;
  Sum: number = 0;
  discount: number = 0;
  taxs: number = 0;
  finaltotal: number = 0;
  customer;
  tot_code: any = [];
  tot_code_amt: any = [];
  all_code_amt: number = 0;
  subTotal: number = 0;
  shiptoadd: any;
  pdfLink: string = "";
  printFileName: string = "";
  trackingNoList: any = [];
  isTrackingEmpty: boolean;
  warehouse: any;
  oe_tot_codes: any;
  aftertotcodes: any;
  caddress: any;
  shipaddress: any;
  OrderBy: any;
  Salesman: any;
  showtracking: any;
  showjobref: any;
  umdescrlist:any;
  headernotes: any;
  isumdescr:any;
  // isrfqshow: any;
  OrderNoteLable: any;
  punchOutModel: any;
  isPunchOut: boolean = false;
  mailtoemailfromorder: any;
  printinvoice: any;
  printinvoicelable: any;
  document: any;
  documentlable: any;
  itemCounter: number;
  missingItems: any = [];
  Displaypriceinrfq:any;
  productlist:any=[];
  addnewqtywithnewlogic:any;
  iskyraden:any;
  wanterdatelable:any;
  constructor(private seoService: SEOService, private contactService: ContactService, private cartService: CartService, private toastr: ToastrService, private checkoutService: CheckoutService, private dataService: DataService, private route: ActivatedRoute, private orderService: OrderManagementService, private sanitizer: DomSanitizer, private router: Router, private loadingService: LoadingService) {
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Order View - ' + geturl);
    this.seoService.setkeywords('Order View - ' + geturl);
    this.seoService.setdescription('Order View - ' + geturl);
    this.iskyraden=environment.iskyraden;
    this.wanterdatelable=environment.wanted_date;
    this.Getaddnewqtywithnewlogic();
    this.gototop();
    this.getumdescrconfig();
    this.showpricetocustomers();
    this.ConfigurationFordocument();
    this.ConfigurationFordocumentlable();
    this.ConfigurationForprintinvoice();
    this.ConfigurationForprintinvoicelable();
    this.getOrderNoteLable();
    this.warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
    this.Getoe_tot_codes();
    this.configforreorderfromorder();
    this.GetOrderBy();
    this.GetSalesman();
    this.getContactDtl();
    this.Getshowtracking();
    this.Getshowjobref();
    this.GetConfigtomailtoemailfromorder();
    this.getDisplaypriceinrfq();
    // this.getrfqconfig();

    if (Common.getWithExpiry("IsPunchOut") == "Yes") {
      this.isPunchOut = true;
    }
    else {
      this.isPunchOut = false;
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
  getDisplaypriceinrfq() {
    this.Displaypriceinrfq = this.dataService.Getconfigbykey("Displaypriceinrfq");
    if (this.Displaypriceinrfq == null || this.Displaypriceinrfq == undefined || this.Displaypriceinrfq == '') {
    this.Displaypriceinrfq = Common.getWithExpiry("Displaypriceinrfq");
    }
    if (this.Displaypriceinrfq == null || this.Displaypriceinrfq == undefined || this.Displaypriceinrfq == '') {
      this.dataService.GetConfigForDisplaypriceinrfq().subscribe((res: any) => {
        this.Displaypriceinrfq = res;
        Common.setWithExpiry("Displaypriceinrfq", this.Displaypriceinrfq);
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
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  getContactDtl() {
    try {
      if (Common.getWithExpiry("getContact" + Common.getWithExpiry("company_sy")) != undefined) {
        var contactDtl = JSON.parse(Common.getWithExpiry("getContact" + Common.getWithExpiry("company_sy")));
      }
    } catch (ed) { }
    if (contactDtl == undefined || contactDtl == null) {
      this.contactService.getContact(Common.getWithExpiry("company_sy")).subscribe((res: any) => {
        this.contactDtl = res;
        Common.setWithExpiry("getContact" + Common.getWithExpiry("company_sy"), JSON.stringify(this.contactDtl));
        Common.setWithExpiry("company_cu", this.contactDtl.company_cu);
        Common.setWithExpiry("company_it", this.contactDtl.company_it);
        Common.setWithExpiry("company_sy", this.contactDtl.company_sy);

      })
    }
    else {
      this.contactDtl = contactDtl;
      Common.setWithExpiry("company_cu", this.contactDtl.company_cu);
      Common.setWithExpiry("company_it", this.contactDtl.company_it);
      Common.setWithExpiry("company_sy", this.contactDtl.company_sy);
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
  GetConfigtomailtoemailfromorder() {
    this.mailtoemailfromorder = Common.getWithExpiry("mailtoemailfromorder");
    if (this.mailtoemailfromorder == null || this.mailtoemailfromorder == undefined || this.mailtoemailfromorder == '') {
      this.dataService.GetConfigtomailtoemailfromorder().subscribe((res: any) => {
        this.mailtoemailfromorder = res;
        Common.setWithExpiry("mailtoemailfromorder", this.mailtoemailfromorder);
      });
    }
  }
  configforreorderfromorder() {
    this.reorderfromorder = Common.getWithExpiry("reorderfromorder");
    if (this.reorderfromorder == null || this.reorderfromorder == undefined || this.reorderfromorder == '') {
      this.dataService.configforreorderfromorder().subscribe((res: any) => {
        this.reorderfromorder = res;
        if (this.reorderfromorder == '1') {
          this.getMinQtySetting();
          this.getAddZero();
          this.getaddtonotavail();
          this.getMultiplyQtySetting();
          this.GetAddToCartAsPerProfileArrayNo();
          this.GetpriceRoundingsetting();
          this.getMaxQtySetting();
          this.getIsMuscle();
        }
        Common.setWithExpiry("reorderfromorder", this.reorderfromorder);
      });
    }
    else {
      if (this.reorderfromorder == '1') {
        this.getMinQtySetting();
        this.getAddZero();
        this.getIsMuscle();
        this.getaddtonotavail();
        this.getMultiplyQtySetting();
        this.GetAddToCartAsPerProfileArrayNo();
        this.GetpriceRoundingsetting();
        this.getMaxQtySetting();
      }
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
  GetGetAddToCartAsPerProfileNo() {
    this.AddToCartAsPerProfileNo = Common.getWithExpiry("AddToCartAsPerProfileNo");
    if (this.AddToCartAsPerProfileNo == null || this.AddToCartAsPerProfileNo == undefined || this.AddToCartAsPerProfileNo == '') {
      this.dataService.GetAddToCartAsPerProfileNo().subscribe((res: any) => {
        this.AddToCartAsPerProfileNo = res;
        Common.setWithExpiry("AddToCartAsPerProfileNo", this.AddToCartAsPerProfileNo);
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
  ConfigurationForprintinvoice() {
    this.printinvoice = this.dataService.Getconfigbykey("printinvoice");
    if (this.printinvoice == undefined || this.printinvoice == null || this.printinvoice == '') {
      this.printinvoice = Common.getWithExpiry("printinvoice");
    }
    if (this.printinvoice == undefined || this.printinvoice == null || this.printinvoice == '') {
      this.dataService.ConfigurationForprintinvoice().subscribe((data: any) => {
        this.printinvoice = data;
        Common.setWithExpiry("printinvoice", this.printinvoice);
      })
    }
  }
  ConfigurationFordocument() {
    this.document = this.dataService.Getconfigbykey("document");
    if (this.document == undefined || this.document == null || this.document == '') {
      this.document = Common.getWithExpiry("document");
    }
    if (this.document == undefined || this.document == null || this.document == '') {
      this.dataService.ConfigurationFordocument().subscribe((data: any) => {
        this.document = data;
        Common.setWithExpiry("document", this.document);
      })
    }
  }
  ConfigurationFordocumentlable() {
    this.documentlable = this.dataService.Getconfigbykey("documentlable");
    if (this.documentlable == undefined || this.documentlable == null || this.documentlable == '') {
      this.documentlable = Common.getWithExpiry("documentlable");
    }
    if (this.documentlable == undefined || this.documentlable == null || this.documentlable == '') {
      this.dataService.ConfigurationFordocumentlable().subscribe((data: any) => {
        this.documentlable = data;
        Common.setWithExpiry("documentlable", this.documentlable);
      })
    }
  }
  ConfigurationForprintinvoicelable() {
    this.printinvoicelable = this.dataService.Getconfigbykey("printinvoicelable");
    if (this.printinvoicelable == undefined || this.printinvoicelable == null || this.printinvoicelable == '') {
      this.printinvoicelable = Common.getWithExpiry("printinvoicelable");
    }
    if (this.printinvoicelable == undefined || this.printinvoicelable == null || this.printinvoicelable == '') {
      this.dataService.ConfigurationForprintinvoicelable().subscribe((data: any) => {
        this.printinvoicelable = data;
        Common.setWithExpiry("printinvoicelable", this.printinvoicelable);
      })
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
  GetConfigForAddToCartAsPerProfile() {
    this.configforcartbyprofile = Common.getWithExpiry("configforcartbyprofile");
    if (this.configforcartbyprofile == null || this.configforcartbyprofile == undefined || this.configforcartbyprofile == '') {
      this.dataService.GetConfigForAddToCartAsPerProfile().subscribe((res: any) => {
        this.configforcartbyprofile = res;
        Common.setWithExpiry("configforcartbyprofile", this.configforcartbyprofile);
      });
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
  GetAddToCartAsPerProfileArrayNo() {
    this.AddToCartAsPerProfileArrayNo = Common.getWithExpiry("AddToCartAsPerProfileArrayNo");
    if (this.AddToCartAsPerProfileArrayNo == null || this.AddToCartAsPerProfileArrayNo == undefined || this.AddToCartAsPerProfileArrayNo == '') {
      this.dataService.GetAddToCartAsPerProfileArrayNo().subscribe((res: any) => {
        this.AddToCartAsPerProfileArrayNo = res;
        if (this.AddToCartAsPerProfileArrayNo == '1') {
          this.GetConfigForAddToCartAsPerProfile();
          this.GetGetAddToCartAsPerProfileNo();
        }
        Common.setWithExpiry("AddToCartAsPerProfileArrayNo", this.AddToCartAsPerProfileArrayNo);
      });
    }
    else {
      if (this.AddToCartAsPerProfileArrayNo == '1') {
        this.GetConfigForAddToCartAsPerProfile();
        this.GetGetAddToCartAsPerProfileNo();
      }
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
  }
  // getrfqconfig() {
  //   this.isrfqshow = Common.getWithExpiry("isrfqshow");
  //   if (this.isrfqshow == null || this.isrfqshow == undefined || this.isrfqshow == '') {
  //     this.dataService.Getrfqlistfeatureonoff().subscribe((res:any) => {
  //       this.isrfqshow = res;
  //       Common.setWithExpiry("isrfqshow", this.isrfqshow);
  //     });
  //   }
  // }
  getOrderNoteLable() {
    this.OrderNoteLable = Common.getWithExpiry("OrderNoteLable");
    if (this.OrderNoteLable == null || this.OrderNoteLable == undefined || this.OrderNoteLable == '') {
      this.dataService.GetConfigForOrderNoteLable().subscribe((res: any) => {
        this.OrderNoteLable = res;
        Common.setWithExpiry("OrderNoteLable", this.OrderNoteLable);
      });
    }
  }
  Getshowjobref() {
    this.showjobref = Common.getWithExpiry("showjobref");
    if (this.showjobref == null || this.showjobref == undefined || this.showjobref == '') {
      this.dataService.GetConfidForshowjobref().subscribe((res: any) => {
        this.showjobref = res;
        Common.setWithExpiry("showjobref", this.showjobref);
      });
    }
  }
  GetOrderBy() {
    this.OrderBy = Common.getWithExpiry("OrderBy");
    if (this.OrderBy == null || this.OrderBy == undefined || this.OrderBy == '') {
      this.dataService.GetConfidForOrderBy().subscribe((res: any) => {
        this.OrderBy = res;
        Common.setWithExpiry("OrderBy", this.OrderBy);
      });
    }
  }
  GetSalesman() {
    this.Salesman = Common.getWithExpiry("Salesman");
    if (this.Salesman == null || this.Salesman == undefined || this.Salesman == '') {
      this.dataService.GetConfidForSalesman().subscribe((res: any) => {
        this.Salesman = res;
        Common.setWithExpiry("Salesman", this.Salesman);
      });
    }
  }
  Getshowtracking() {
    this.showtracking = Common.getWithExpiry("showtracking");
    if (this.showtracking == null || this.showtracking == undefined || this.showtracking == '') {
      this.dataService.GetConfidForshowtracking().subscribe((res: any) => {
        this.showtracking = res;
        Common.setWithExpiry("showtracking", this.showtracking);
      });
    }
  }

  Getsalesman() {
    if (this.orderHead.salesman1 != undefined && this.orderHead.salesman1 != '') {
      this.dataService.getSalesmanNameByID(this.orderHead.salesman1).subscribe((res: any) => {
        this.orderHead.salesman1 = res;
      });

    }
    else if (this.orderHead.oe_head_salesman1 != undefined && this.orderHead.oe_head_salesman1 != '') {
      this.dataService.getSalesmanNameByID(this.orderHead.oe_head_salesman1).subscribe((res: any) => {
        this.orderHead.oe_head_salesman1 = res;
      });

    }
  }

  getShipFOB() {
    this.checkoutService.getShipFOB(Common.getWithExpiry("CustID")).subscribe((res: any) => {
      var shipFOB = res;
      for (let fob of shipFOB) {
        try {
          if (fob.ship_via_code == this.orderHead.ship_via_code) {
            this.orderHead.ship_via_code = fob.descr;
          }
        } catch (ed) { }
        try {
          if (fob.ship_via_code == this.shiptoadd.ship_via_code) {
            this.shiptoadd.ship_via_code = fob.descr;
          }
        } catch (ed) { }
        try {
          if (fob.ship_via_code == this.orderHead.oe_head_ship_via_code) {
            this.orderHead.oe_head_ship_via_code = fob.descr;
          }
        } catch (ed) { }
      }
    });
  }
  getPaymentType() {
    this.checkoutService.Getallsystermscode().subscribe((res: any) => {
      var paymentType = res;
      for (let prod of paymentType) {
        try {
          if (prod.terms_code == this.orderHead.terms_code) {
            this.orderHead.terms_code = prod.descr;
          }
        } catch (ed) { }
        try {
          if (prod.terms_code == this.orderHead.oe_head_terms_code) {
            this.orderHead.oe_head_terms_code = prod.descr;
          }
        }
        catch (ed) { }
      }
    });
  }

  GetshipAddress(ordobject) {

    this.shipaddress = '';
    if (ordobject.s_adr != null && ordobject.s_adr != undefined && ordobject.s_adr != '') {
      try {

        this.shipaddress = JSON.parse(ordobject.s_adr);
      } catch (ex) { }
      
      this.shipaddress = ordobject.s_adr;
      // for (var i = 0; i < ordobject.s_adr.length; i++) {
      //   if(ordobject.s_adr[i]!=''){
      //     this.shipaddress=this.shipaddress+ordobject.s_adr[i]+',';
      //   }
      // }
    }
    else if (ordobject.oe_head_adr != null && ordobject.oe_head_adr != undefined && ordobject.oe_head_adr != '') {
      try {

        this.shipaddress = ordobject.oe_head_adr;
      } catch (ex) { }
     // for (var i = 0; i < ordobject.oe_head_adr.length; i++) {
      //   if(ordobject.oe_head_adr[i]!=''){
      //     this.shipaddress=this.shipaddress+ordobject.oe_head_adr[i]+',';
      //   }
      // } 
    }
    else if (ordobject.adr != null && ordobject.adr != undefined && ordobject.adr != '') {
      try {

        this.shipaddress = JSON.parse(ordobject.adr);
      } catch (ex) { }
      // for (var i = 0; i < getadr.length; i++) {
      //   if(getadr[i]!=undefined && getadr[i]!=''){
      //     this.shipaddress=this.shipaddress+getadr[i]+',';
      //   }
      // }
    }
  }

  Getoe_tot_codes() {
    try {
      if (Common.getWithExpiry('oe_tot_codes') != undefined) {
        var oe_tot_codes = JSON.parse(Common.getWithExpiry('oe_tot_codes'));
      }
    } catch (ed) { }
    if (oe_tot_codes == null || oe_tot_codes == undefined) {
      this.dataService.GetAllTotcodes().subscribe((res: any) => {
        this.oe_tot_codes = res;
        Common.setWithExpiry('oe_tot_codes', JSON.stringify(this.oe_tot_codes));
      });
    }
    else {
      this.oe_tot_codes = oe_tot_codes;
    }
  }

  getorderheadernotes(orderid) {
    this.checkoutService.GetOrderHeaderNotes(orderid).subscribe((res: any) => {
      this.headernotes = res;
    });
  }

  ngOnInit() {
    this.order = this.route.snapshot.paramMap.get('id');
    this.type = parseInt(this.route.snapshot.paramMap.get('type'));
    this.rec_type = this.route.snapshot.paramMap.get('rec_type');
    this.getorderheadernotes(this.order);
    this.orderService.GetloginCustomerInfo(Common.getWithExpiry("CustID")).subscribe((res: any) => {
      var getcu = res;
      this.customer = getcu[0];
      this.caddress = '';
      try {
        this.caddress = JSON.parse(this.customer.adr);
      } catch (ed) { }

      this.printFileName = this.order + ".pdf";
      if (this.type == 1) {
        this.ProcessingOrderView();
      }
      else if (this.type == 3) {
        this.getInvoiceDetail();
      }
      else {
        this.getOrderDetail(this.rec_type);
      }
    });
  }



  getOrderDetail(rec_type) {
    this.sendMessage('start');
    this.orderService.orderView(this.order, rec_type).subscribe((res: any) => {
      this.orderDetail = res;
      this.orderHead = this.orderDetail[0];
      this.GetshipAddress(this.orderHead);
      this.warehouse = this.orderHead.oe_head_warehouse;
      this.tot_code = this.orderHead.oe_head_c_tot_code;
      this.tot_code_amt = this.orderHead.oe_head_c_tot_code_amt;
      for (var i = 0; i < this.tot_code_amt.length; i++) {
        if (this.tot_code_amt[i] != 0)
          this.all_code_amt += this.tot_code_amt[i];
      }
      var gettos = this.orderHead.oe_head_c_tot_code;
      //gettos =  gettos.trim().replace('[', '').replace(']', '').split(',');
      var getsaamt = this.orderHead.oe_head_curx_c_tot_code_amt;
      // getsaamt = getsaamt.trim().replace('[', '').replace(']', '').split(',');
      this.aftertotcodes = [];
      for (var i = 0; i < gettos.length; i++) {
        for (var j = 0; j < this.oe_tot_codes.length; j++) {
          if (gettos[i] == this.oe_tot_codes[j].code) {
            this.aftertotcodes.push({ 'name': this.oe_tot_codes[j].name, 'amt': getsaamt[i] });
          }
        }
      }



      this.subTotal = this.orderHead.oe_head_curx_o_tot_net_ar;// + this.all_code_amt - this.orderHead.oe_head_curx_o_disc_amt;

      this.Sum = 0;
      this.subTotal = 0;
      for (let order of this.orderDetail) {
        this.Sum = this.Sum + (parseFloat(order.oe_line_price) * parseFloat(order.oe_line_q_ord));
        this.subTotal = this.subTotal + (parseFloat(order.oe_line_price) * parseFloat(order.oe_line_q_ord));
        this.productlist.push({"QuoteNumber":this.order,"itemname":order.oe_line_item,"qty":order.oe_line_q_ord,"um":order.oe_line_um_o,"price":(parseFloat(order.oe_line_price) * parseFloat(order.oe_line_q_ord)),"userid":Common.getWithExpiry("CustID"),"sessionid":Common.getWithExpiry("UserID"),"priceper":parseFloat(order.oe_line_price)});
        //if (this.type == 1)
        //this.Sum = this.Sum + parseFloat(order.ec_oeline_unit_price);
        // else
        
      }
      this.Getsalesman();
      this.getShipFOB();
      this.getPaymentType();
      this.sendMessage('stop');
    })
  }
  getInvoiceDetail() {
    this.orderService.InvoiceView(Common.getWithExpiry("CustID"), this.order).subscribe((res: any) => {
      this.orderDetail = res;

      this.orderHead = this.orderDetail[0];
      this.GetshipAddress(this.orderHead);
      for (let order of this.orderDetail) {
        if (this.type == 1)
          this.Sum = this.Sum + parseFloat(order.ec_oeline_unit_price);
        else
          this.Sum = this.Sum + parseFloat(order.oe_line_price);
      }
      this.tot_code = this.orderHead.oe_head_c_tot_code;
      this.tot_code_amt = this.orderHead.oe_head_c_tot_code_amt;

      for (var i = 0; i < this.tot_code_amt.length; i++) {
        if (this.tot_code_amt[i] != 0)
          this.all_code_amt += this.tot_code_amt[i];
      }
      var gettos = this.orderHead.oe_head_c_tot_code;
      //gettos =  gettos.trim().replace('[', '').replace(']', '').split(',');
      var getsaamt = this.orderHead.oe_head_curx_c_tot_code_amt;
      // getsaamt = getsaamt.trim().replace('[', '').replace(']', '').split(',');
      this.aftertotcodes = [];
      for (var i = 0; i < gettos.length; i++) {
        for (var j = 0; j < this.oe_tot_codes.length; j++) {
          if (gettos[i] == this.oe_tot_codes[j].code) {
            this.aftertotcodes.push({ 'name': this.oe_tot_codes[j].name, 'amt': getsaamt[i] });
          }
        }
      }

      this.subTotal = this.orderHead.oe_head_curx_o_tot_gross + this.all_code_amt - this.orderHead.oe_head_curx_o_disc_amt;


      for (let order of this.orderDetail) {
        if (this.type == 1)
          this.Sum = this.Sum + parseFloat(order.ec_oeline_unit_price);
        else
          this.Sum = this.Sum + parseFloat(order.oe_line_price);
      }
      this.Getsalesman();
      this.getShipFOB();
      this.getPaymentType();
    })
  }
  ProcessingOrderView() {
    this.orderService.ProcessingOrderView(Common.getWithExpiry("CustID"), this.order).subscribe((res: any) => {
      this.orderHead = res;

      this.orderHead = this.orderHead[0];
      this.orderService.ProcessingOrderView1(Common.getWithExpiry("CustID"), this.order).subscribe((res1: any) => {
        this.orderDetail = res1;

        var gettos = this.orderHead.tot_code;
        //gettos =  gettos.trim().replace('[', '').replace(']', '').split(',');
        var getsaamt = this.orderHead.tot_code_amt;
        // getsaamt = getsaamt.trim().replace('[', '').replace(']', '').split(',');
        //  this.subTotal=0;
        //  for(var i=0;i< this.orderDetail.length;i++){
        // this.subTotal=this.subTotal+this.orderDetail[i].itemtotal;
        //  }

        this.aftertotcodes = [];
        for (var i = 0; i < gettos.length; i++) {
          for (var j = 0; j < this.oe_tot_codes.length; j++) {
            if (gettos[i] == this.oe_tot_codes[j].code) {
              this.aftertotcodes.push({ 'name': this.oe_tot_codes[j].name, 'amt': getsaamt[i] });
            }
          }
        }

        for (let order of this.orderDetail) {
          order.itemtotal = parseFloat(order.qty_ord) * parseFloat(order.unit_price);
          this.Sum = this.Sum + parseFloat(order.itemtotal);
          this.discount = this.discount + parseFloat(order.qty_ord) * parseFloat(this.orderHead.disc_amount);
          this.taxs = this.taxs + parseFloat(order.qty_ord) * parseFloat(this.orderHead.tax_amount);
          this.finaltotal = this.finaltotal + ((order.itemtotal + this.taxs) - this.discount);
          this.dataService.getProductDetailName(order.item, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
            var item1221 = res;
            // item1221.itemdesc = item1221.itemdesc.replace('[', '').replace(']', '').split(',');
            // order.descr = item1221.itemdesc[0].trim().replace('"', '').replace('"', '') + item1221.itemdesc[1].trim().replace('"', '').replace('"', '') + item1221.itemdesc[2].trim().replace('"', '').replace('"', '') + item1221.itemdesc[3].trim().replace('"', '').replace('"', '');


            try {
              var dept1 = [];
              try {
                dept1 = JSON.parse(item1221.itemdesc);
              } catch (ex) {

                item1221.itemdesc = item1221.itemdesc.replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';').replace('",', ';');
                item1221.itemdesc = item1221.itemdesc.replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '')
                  .replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('"', '');
                dept1 = item1221.itemdesc.replace('[', '').replace(']', '').split(';');
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
              order.description = des2;
              order.descr = des1;

            } catch (ex) { }

          });
        }
        if (this.orderHead.ship_id != undefined && this.orderHead.ship_id != null && this.orderHead.ship_id != '') {
          this.orderService.GetShiptoaddressbyID(Common.getWithExpiry("CustID"), this.orderHead.ship_id).subscribe((res2: any) => {
            this.shiptoadd = res2;
            this.GetshipAddress(this.shiptoadd);
            this.Getsalesman();
            this.getShipFOB();
            this.getPaymentType();
          })
        }
        else {
          this.GetshipAddress(this.orderHead);
          this.Getsalesman();
          this.getShipFOB();
          this.getPaymentType();
        }
      })
    })
  }

  print() {
    var type = this.type == 3 ? "invoice" : "order";
    var seq;
    var order;
    if (this.type == 3) {
      type = "invoice";
      var seqnol = this.order.split('-');
      order = seqnol[0];
      seq = seqnol[1];
      seq="000"+seq;
    }
    else {
      if (this.rec_type == 'Q') {
        type = "quote";
        order = this.order;
        seq = "0";
      }
      else {
        type = "order";
        order = this.order;
        seq = "0";
      }
    }

    this.orderService.GetPrintData(type, order, seq).subscribe((res: any) => {
      var data = res;
      var dlnk = document.getElementById('dwnldLnk');
      dlnk.setAttribute("href", data)
      dlnk.click();
    });
  }
  printNew() {
    var type = this.type == 3 ? "invoice" : "order";
    var seq;
    var order;
    if (this.type == 3) {
      type = "invoice";
      var seqnol = this.order.split('-');
      order = seqnol[0];
      seq = "000" + seqnol[1];
    }
    else {
      if (this.rec_type == 'Q') {
        type = "quote";
        order = this.order;
        seq = "0";
      }
      else {
        type = "order";
        order = this.order;
        seq = "0";
      }
    }

    this.dataService.GetOrderDocumentspdf(order, '3', seq).subscribe((res: any) => {
      var data = res;
      if (data != "NotFound") {
        var dlnk = document.getElementById('dwnldLnk1');
        dlnk.setAttribute("href", data)
        dlnk.click();
      }
      else {
        this.toastr.info("DOcument not found");
      }
    });
  }

  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }

  async addToCartMultiple() {

    var punchOutType = Common.getWithExpiry("PunchOutType");

    if (punchOutType == "Southern") {
      Common.removeWithExpiry("MissingItems");
      if (Common.getWithExpiry("IsPunchOut") == "Yes") {

        var dateFormat;
  
        if (this.orderHead.oe_head_wanted_date != null) {
          var wantedDate = new Date(this.orderHead.oe_head_wanted_date);
          dateFormat = (wantedDate.getMonth() + 1) + '/' + wantedDate.getDate() + '/' + wantedDate.getFullYear();
        }
        var cancelFormat;
        if (this.orderHead.oe_head_cancel_date != null) {
          var cancelDate = new Date(this.orderHead.oe_head_cancel_date);
          cancelFormat = (cancelDate.getMonth() + 1) + '/' + cancelDate.getDate() + '/' + cancelDate.getFullYear();
        }
  
        var headLN = {
          "billPhone": this.customer.phone,
          "billFax": this.customer.fax,
          "ship_id": (this.orderHead.oe_head_ship_id == "-1" ? null : this.orderHead.oe_head_ship_id),
          "wanted_date": dateFormat, //new Date(this.head.WantedDate),
          "cancel_date": cancelFormat,
          "job_rel": this.type == 1 ? this.orderHead.job_rel : this.orderHead.oe_head_job_rel,
          "cell_phone": this.customer.phone,
          "cu_po": this.orderHead.oe_head_cu_po,
          "orderby_phone": this.customer.phone,
          "email": this.type == 1 ? this.orderHead.email_address : this.orderHead.oe_head_email,
          "terms_code": this.type == 1 ? this.orderHead.terms_code : this.orderHead.oe_head_terms_code,
          "ship_via_code": this.type == 1 ? this.orderHead.ship_via_code : this.orderHead.oe_head_ship_via_code,
          "ship_via_acct": this.type == 1 ? this.orderHead.ship_via_acct : this.orderHead.oe_head_ship_via_acct,
          "Frieght": this.type == 1 ? this.orderHead.tax_amount : this.orderHead.oe_head_curx_o_tot_tax_amt,
          "c_tot_code_1": "FR",
          "c_tot_code_amt_1": this.type == 1 ? this.orderHead.tax_amount : this.orderHead.oe_head_curx_o_tot_tax_amt,
          "customer": Common.getWithExpiry("CustID"),
          "rec_type": "O",
          "warehouse": Common.getWithExpiry("warehouse"),
          "order_by": Common.getWithExpiry("CustID"),
          "source_code": "web",
          "s_adr": this.customer.adr,
          "s_country_code": this.customer.country_code,
          "s_name": this.orderHead.s_nam,
          "s_st": this.customer.state,
          "s_postal_code": this.customer.postal_code,
          "company_sy": Common.getWithExpiry("company_sy"),
          "orderid": 0,
          "orderstatus": true,
          "response": "",
          "echo": true,
          "complete": false,
          "order": "",
          "bill_phone": this.customer.phone,
          "bill_fax": this.customer.fax,
          "o_tot_taxable_it": 0,
          "o_tot_tax_amt": 0,
          "o_tot_net_ar": 0,
          "southenShipName": this.orderHead.oe_head_name,
          "southernShipPhone": this.orderHead.s_phone,
          "southernShipFax": this.orderHead.s_fax,
          "southernShipAddress1": this.shipaddress[0],
          "southernShipAddress2": this.shipaddress[1],
          "southernShipCity": this.shipaddress[3],
          "southernShipState": this.orderHead.oe_head_state,
          "southernShipPostalCode": this.orderHead.oe_head_postal_code,
          "southernShipCountry": this.orderHead.oe_head_country_code
        };
  
        var finalObj = {
          "head": headLN,
          "lines": "",
          //"notes": this.head.notes,
          "echo": true,
          "complete": false,
          "company_sy": Common.getWithExpiry("company_sy")
        }
  
        Common.setWithExpiry("addrObj", JSON.stringify(this.shiptoadd));
        Common.setWithExpiry("shippingAddress", JSON.stringify(this.shiptoadd));
        Common.setWithExpiry("finalObj", JSON.stringify(finalObj));
        Common.setWithExpiry("PunchOutQuoteNo",this.order);
  
      }
      this.sendMessage('start');
      this.cartService.addtocartforsouthern(this.productlist).subscribe((res: any) => {
          if(res){
            this.router.navigate(['/viewcart']);
            this.cartService.cartBroadCaster(res);
            this.toastr.success("Product List Added Succesfully...");
          }
          else{
            this.toastr.error("Error Is Occurred Please Try Again...");
          }
      });
    }
    else{
    

    if (Common.getWithExpiry("IsPunchOut") == "Yes") {

      var dateFormat;

      if (this.orderHead.oe_head_wanted_date != null) {
        var wantedDate = new Date(this.orderHead.oe_head_wanted_date);
        dateFormat = (wantedDate.getMonth() + 1) + '/' + wantedDate.getDate() + '/' + wantedDate.getFullYear();
      }
      var cancelFormat;
      if (this.orderHead.oe_head_cancel_date != null) {
        var cancelDate = new Date(this.orderHead.oe_head_cancel_date);
        cancelFormat = (cancelDate.getMonth() + 1) + '/' + cancelDate.getDate() + '/' + cancelDate.getFullYear();
      }

      var headLN = {
        "billPhone": this.customer.phone,
        "billFax": this.customer.fax,
        "ship_id": (this.orderHead.oe_head_ship_id == "-1" ? null : this.orderHead.oe_head_ship_id),
        "wanted_date": dateFormat, //new Date(this.head.WantedDate),
        "cancel_date": cancelFormat,
        "job_rel": this.type == 1 ? this.orderHead.job_rel : this.orderHead.oe_head_job_rel,
        "cell_phone": this.customer.phone,
        "cu_po": this.orderHead.oe_head_cu_po,
        "orderby_phone": this.customer.phone,
        "email": this.type == 1 ? this.orderHead.email_address : this.orderHead.oe_head_email,
        "terms_code": this.type == 1 ? this.orderHead.terms_code : this.orderHead.oe_head_terms_code,
        "ship_via_code": this.type == 1 ? this.orderHead.ship_via_code : this.orderHead.oe_head_ship_via_code,
        "ship_via_acct": this.type == 1 ? this.orderHead.ship_via_acct : this.orderHead.oe_head_ship_via_acct,
        "Frieght": this.type == 1 ? this.orderHead.tax_amount : this.orderHead.oe_head_curx_o_tot_tax_amt,
        "c_tot_code_1": "FR",
        "c_tot_code_amt_1": this.type == 1 ? this.orderHead.tax_amount : this.orderHead.oe_head_curx_o_tot_tax_amt,
        "customer": Common.getWithExpiry("CustID"),
        "rec_type": "O",
        "warehouse": Common.getWithExpiry("warehouse"),
        "order_by": Common.getWithExpiry("CustID"),
        "source_code": "web",
        "s_adr": this.customer.adr,
        "s_country_code": this.customer.country_code,
        "s_name": this.orderHead.s_nam,
        "s_st": this.customer.state,
        "s_postal_code": this.customer.postal_code,
        "company_sy": Common.getWithExpiry("company_sy"),
        "orderid": 0,
        "orderstatus": true,
        "response": "",
        "echo": true,
        "complete": false,
        "order": "",
        "bill_phone": this.customer.phone,
        "bill_fax": this.customer.fax,
        "o_tot_taxable_it": 0,
        "o_tot_tax_amt": 0,
        "o_tot_net_ar": 0,
        "southenShipName": this.orderHead.oe_head_name,
        "southernShipPhone": this.orderHead.s_phone,
        "southernShipFax": this.orderHead.s_fax,
        "southernShipAddress1": this.shipaddress[0],
        "southernShipAddress2": this.shipaddress[1],
        "southernShipCity": this.shipaddress[3],
        "southernShipState": this.orderHead.oe_head_state,
        "southernShipPostalCode": this.orderHead.oe_head_postal_code,
        "southernShipCountry": this.orderHead.oe_head_country_code
      };

      var finalObj = {
        "head": headLN,
        "lines": "",
        //"notes": this.head.notes,
        "echo": true,
        "complete": false,
        "company_sy": Common.getWithExpiry("company_sy")
      }

      Common.setWithExpiry("addrObj", JSON.stringify(this.shiptoadd));
      Common.setWithExpiry("shippingAddress", JSON.stringify(this.shiptoadd));
      Common.setWithExpiry("finalObj", JSON.stringify(finalObj));
      Common.setWithExpiry("PunchOutQuoteNo",this.order);

    }

    for (var i = 0; i < this.orderDetail.length; i++) {
      if (this.type != 1) {
        this.orderDetail[i].item = this.orderDetail[i].oe_line_item;
        this.orderDetail[i].quantity = this.orderDetail[i].oe_line_q_ord_d;
      }
      else {
        this.orderDetail[i].quantity = this.orderDetail[i].qty_ord;
      }
      if (this.orderDetail[i].quantity > 0) {
        if (Common.getWithExpiry("IsPunchOut") == "Yes") {
          //this.itemCounter = i;
          await this.AddtocartPunchOut(this.orderDetail[i], i);
        }
        else {
          this.Addtocart(this.orderDetail[i], i);
        }
      }
      else {
        if (this.orderDetail[i].quantity < 0) {
          this.toastr.error("Invalid Quantity");
        }
      }
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
            this.dataService.getProductDetailName(getitem.item, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
              var item1 = res;

              if (item1 != null) {
                item1.quantity = getitem.quantity;
                var units = item1.um.replace('[', '').replace(']', '').split(',')[0];
                getitem.units = units.replace('"', '').replace('"', '');
                
                if(this.type==1){
                  getitem.units=getitem.um_o;
                }
                else{
                  getitem.units=getitem.oe_line_um_o;
                }
                //getitem.units=getitem.um_o;
                var getunits = JSON.parse(item1.um);
                var getum_qty = JSON.parse(item1.umqty);
                for (var i = 0; i < getunits.length; i++) {
                  if (item1.um_display == getunits[i]) {
                    getum = getum_qty[i - 1];
                  }
                }
              }
              else {
                this.toastr.error(getitem.item + " is not available", 'Message!');
                i = i + 1;
                //$("#" + i).focus();
              }

              var getitem12 = {
                items: getitem.item,
                warehouse: Common.getWithExpiry("warehouse"),
                company_sy: Common.getWithExpiry("company_sy")
              }
              var getproduct = null;
              if(this.cartProducts!=undefined && this.cartProducts!=null && this.cartProducts.length>0){
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
            }
              this.dataService.getProductavailibity(getitem12).subscribe((res: any) => {
                var availdata = res;
                // if(availdata[0].available > 0){
                var bulkPrice = [];
                // getitem.units = getitem.units.replace('"','').replace('"','');
                var qty = parseFloat(getitem.quantity) + (getproduct == null ? 0 : parseFloat(getproduct.Quantity))
                bulkPrice.push({
                  "customer": Common.getWithExpiry("CustID"),
                  "item": getitem.item,
                  // "unit": getitem.units.trim().replace('"', '').replace('"', ''),
                  "quantity": qty,
                  "warehouse": Common.getWithExpiry("warehouse"),
                  "rounding": this.PriceRound,
                  "qty_unit": getitem.units.trim().replace('"', '').replace('"', ''),
                  "company_sy": Common.getWithExpiry("company_sy")
                })
                this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
                  var data = res;
                  if(this.iskyraden && data[0].origin != 'CI' && data[0].origin != 'SP'){
                    
                    getitem.list_price = getitem.list_price;
                  }
                  else{
                  getitem.list_price = parseFloat(data[0].extension) / parseFloat(data[0].quantity);
                  }
                  getitem.itemname = getitem.item;
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
                  try{
                    if(this.addtonotavail == 0 && getitem.TotQty > (parseFloat((this.addnewqtywithnewlogic=='1' ? availdata[0].availablenew : availdata[0].available)))){
                      this.toastr.error("you can not add quantity more than available quantity.");
                      return;
                    }
                  }catch(ed){}
                  if (item1.min != undefined && item1.min != "0" && getitem.TotQty < item1.min && this.MinQty == true) {
                    this.toastr.error("Minimum quantity of item " + item1.itemname + " should be " + item1.min + ' of ' + this.getumdescbyumcode(units.trim()));
                    return;
                  }
                  else if (item1.max != undefined && item1.max != "0" && getitem.TotQty > item1.max && this.MaxQty) {
                    this.toastr.error("Maximum quantity of item " + item1.itemname + " should be " + item1.max + ' of ' + this.getumdescbyumcode(units.trim()));
                    return;
                  }
                  if (this.AddZero == 0 && getitem.list_price == 0 || getitem.list_price == undefined) {
                    this.toastr.error("Please Call For Pricing.", 'Add To Cart Disabled!');
                    return;
                  }
                  if (this.addtonotavail == 0 && (availdata[0].available == 0 || availdata[0].available == undefined)) {
                    this.toastr.error("Please Call For Avaibility", 'Add To Cart Disabled!');
                    return;
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
                      this.toastr.success(getitem.quantity + " " + this.getumdescbyumcode(getitem.units.trim().replace('"', '').replace('"', '')) + " of item " + getitem.item + " has been added to your cart.", 'Success!');
                      getitem.quantity = "";

                    })


                    i = i + 1;
                    //$("#" + i).focus();
                  }
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

  async AddtocartPunchOut(getitem, i) {
    //this.itemCounter = i;

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
            this.dataService.getProductDetailName(getitem.item, this.warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
              var item1 = res;

              if (item1 != null) {
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
                this.toastr.error(getitem.item + " is not available", 'Message!');
                i = i + 1;
                //$("#" + i).focus();
                var punchOutType = Common.getWithExpiry("PunchOutType");
                if (punchOutType == "Southern") {
                  this.missingItems.push({ "ItemNo": getitem.item });

                  var model = {
                    "QuoteNumber": this.order,
                    "company_sy": Common.getWithExpiry("company_sy"),
                    "MissingItemList": this.missingItems
                  }

                  Common.setWithExpiry("MissingItems",JSON.stringify(model));

                  this.cartService.cartBroadCaster1(this.orderDetail.length);
                }
              }

              var getitem12 = {
                items: getitem.item,
                warehouse: this.warehouse,
                company_sy: Common.getWithExpiry("company_sy")
              }
              var getproduct = null;
              if(this.cartProducts!=undefined && this.cartProducts!=null && this.cartProducts.length>0){
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
            }
              this.dataService.getProductavailibity(getitem12).subscribe((res: any) => {
                var availdata = res;
                // if(availdata[0].available > 0){
                var bulkPrice = [];
                // getitem.units = getitem.units.replace('"','').replace('"','');
                var qty = parseFloat(getitem.quantity) + (getproduct == null ? 0 : parseFloat(getproduct.Quantity))
                bulkPrice.push({
                  "customer": Common.getWithExpiry("CustID"),
                  "item": getitem.item,
                  // "unit": getitem.units.trim().replace('"', '').replace('"', ''),
                  "quantity": qty,
                  "warehouse": this.warehouse,
                  "rounding": this.PriceRound,
                  "qty_unit": getitem.units.trim().replace('"', '').replace('"', ''),
                  "company_sy": Common.getWithExpiry("company_sy")
                })
                this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
                  var data = res;
                  if(this.iskyraden && data[0].origin != 'CI' && data[0].origin != 'SP'){
                    getitem.list_price= getitem.list_price;
                  }
                  else{
                  getitem.list_price = parseFloat(data[0].extension) / parseFloat(data[0].quantity);
                  }
                  getitem.itemname = getitem.item;
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
                    this.toastr.error("Minimum quantity of item " + item1.itemname + " should be " + item1.min + ' of ' + this.getumdescbyumcode(units.trim()));
                    return;
                  }
                  else if (item1.max != undefined && item1.max != "0" && getitem.TotQty > item1.max && this.MaxQty) {
                    this.toastr.error("Maximum quantity of item " + item1.itemname + " should be " + item1.max + ' of ' + this.getumdescbyumcode(units.trim()));
                    return;
                  }
                  if (this.AddZero == 0 && getitem.list_price == 0 || getitem.list_price == undefined) {
                    this.toastr.error("Please Call For Pricing.", 'Add To Cart Disabled!');
                    return;
                  }
                  if (this.addtonotavail == 0 && (availdata[0].available == 0 || availdata[0].available == undefined)) {
                    this.toastr.error("Please Call For Avaibility", 'Add To Cart Disabled!');
                    return;
                  }

                  else {
                    if (Common.getWithExpiry("UserType") == '3' && this.IsMuscle) {
                      usrid = Common.getWithExpiry("UserID");
                    }
                    else {
                      usrid = Common.getWithExpiry("CustID");
                    }

                    this.cartService.addProductToCartPunchOut(Common.getWithExpiry("CustID"), Common.getWithExpiry("UserID"), getitem, getitem.units.trim()).subscribe((res: any) => {
                      this.cartService.cartBroadCaster(res);
                      var punchOutType = Common.getWithExpiry("PunchOutType");
                      if (punchOutType != "Southern") {
                        this.toastr.success(getitem.quantity + " " + this.getumdescbyumcode(getitem.units.trim().replace('"', '').replace('"', '')) + " of item " + getitem.item + " has been added to your cart.", 'Success!');
                      }
                      if (punchOutType == "Southern") {
                        this.cartService.cartBroadCaster1(this.orderDetail.length);
                      }
                      getitem.quantity = "";
                    })
                    i = i + 1;
                    //$("#" + i).focus();
                  }
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

  getTrackingNo() {

    if (this.type == 2) {
      this.orderService.GetTrackingNoForPendingOrder(this.order).subscribe((res: any) => {
        this.trackingNoList = res;
        if (this.trackingNoList.length == 0)
          this.isTrackingEmpty = true;
      });
    }
    else {
      this.orderService.GetTrackingNo(this.order).subscribe((res: any) => {
        this.trackingNoList = res;
        if (this.trackingNoList.length == 0)
          this.isTrackingEmpty = true;
      });
    }
  }
}
