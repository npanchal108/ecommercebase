import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Common, CSVRecord } from '../model/common.model';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { DataService } from '../services/data.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-quick-order-pad',
  templateUrl: './quick-order-pad.component.html',
  styleUrls: ['./quick-order-pad.component.scss']
})
export class QuickOrderPadComponent implements OnInit {
  lines: any = 5;
  dataSource: any;
  productlines: any = [{ "product": "", "qty": 1 }, { "product": "", "qty": 1 }, { "product": "", "qty": 1 }, { "product": "", "qty": 1 }, { "product": "", "qty": 1 }];
  productlines1: any = [{ "product": "", "qty": 1 }, { "product": "", "qty": 1 }, { "product": "", "qty": 1 }, { "product": "", "qty": 1 }, { "product": "", "qty": 1 }];
  asyncSelected: any;
  productlistfortable: any = [];
  show3D: any;
  IsMuscle: any;
  PriceRound: any;
  baseitemShow: any;
  AddToCartAsPerProfileNo: any;
  configforcartbyprofile: any;
  AddToCartAsPerProfileArrayNo: any;
  isLoggedIn: boolean = false;
  MinQty: boolean = false;
  isumdescr: any;
  umdescrlist: any;
  MaxQty: boolean = false;
  addtonotavail: any;
  Multiply: any;
  searchitems: any;
  linebyline:any;
  copypaste:any;
  fileupload:any;
  Allconfigurationlist:any;
  @ViewChild('csvReader') csvReader: any;
  constructor(private router: Router, private loadingService: LoadingService, private http: HttpClient, private toastr: ToastrService, private dataService: DataService, private checkoutService: CheckoutService, private cartService: CartService) {
    this.GetQuickAddConfigurations();
    // this.get3dsetting();
    // this.getIsMuscle();
    // this.GetpriceRoundingsetting();
    // this.getbaseitemShow();
    // this.GetConfigForAddToCartAsPerProfile();
    // this.getMinQtySetting();
    // this.getumdescrconfig();
    // this.getMaxQtySetting();
    // this.getaddtonotavail();
    // this.getMultiplyQtySetting();
    if (Common.getWithExpiry("CustID") != "" && Common.getWithExpiry("CustID") != null) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }


  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.productlines = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }
  cleartxt(){
    this.searchitems='';
  }
  addtosearchtable() {
    var getlines = this.searchitems.split(',');
    this.productlines = [];
    let csvRecord: CSVRecord = new CSVRecord();
    for (let i = 0; i < getlines.length; i++) {
      if (i % 2 == 0) {
        csvRecord.product = getlines[i];
      }
      else {
        csvRecord.qty = getlines[i];
        this.productlines.push(csvRecord);
        csvRecord = new CSVRecord();
      }
      if (i == (getlines.length - 1)) {
        this.addtofinaltable();
      }
    }

  }

  addtofinaltable() {
    if (this.productlines != undefined && this.productlines != null && this.productlines.length > 0) {
      this.productlistfortable = [];
      this.sendMessage('start');
      var warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
      for (let i = 0; i < this.productlines.length; i++) {
        this.dataService.getProductDetailNameForXref(this.productlines[i].product, warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
          var item1 = res;
          if (item1 != null && item1 != undefined) {
            item1.description1 = item1.itemdesc;
            this.productlistfortable.push({ "product": this.productlines[i].product, "qty": this.productlines[i].qty, "item": item1 });
          }
          if (i == (this.productlines.length - 1)) {
            this.sendMessage('stop');
          }
        });

      }
    }
    else {
      this.toastr.error("File dont have any data");
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      if (csvRecordsArray[i] != undefined && csvRecordsArray[i] != null && csvRecordsArray[i] != "") {
        let curruntRecord = (<string>csvRecordsArray[i]).split(';');
        // if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.product = curruntRecord[0].trim();
        csvRecord.qty = curruntRecord[1].trim();
        csvArr.push(csvRecord);
        //}  
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.productlines = [];
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


  GetQuickAddConfigurations() {    
    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      try {
        this.Allconfigurationlist = JSON.parse(Common.getWithExpiry("GetQuickAddPageConfigurations"));
      } catch (ed) { }
    }
    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      this.dataService.GetQuickAddPageConfigurations().subscribe((data: any) => {
        this.Allconfigurationlist = data;
        Common.setWithExpiry("GetQuickAddPageConfigurations", JSON.stringify(this.Allconfigurationlist));
        for (var i = 0; i < this.Allconfigurationlist.length; i++) {          
          if (this.Allconfigurationlist[i].ConfigKey == "Show3D") {
            this.show3D = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "IsMuscle") {
            this.IsMuscle = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "PriceRound") {
            this.PriceRound = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "baseitemShow") {
            this.baseitemShow = this.Allconfigurationlist[i].ConfigValue;
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
          if (this.Allconfigurationlist[i].ConfigKey == "MinQty") {
            this.MinQty = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "SettingForUMDescription") {
            this.isumdescr  = this.Allconfigurationlist[i].ConfigValue;
          }          
          if (this.Allconfigurationlist[i].ConfigKey == "MaxQty") {
            this.MaxQty = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "addifunavail") {
            this.addtonotavail = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "Multiply") {
            this.Multiply = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "linebyline") {
            this.linebyline = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "copypaste") {
            this.copypaste = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "fileupload") {
            this.fileupload = this.Allconfigurationlist[i].ConfigValue;
          }          
        }
      })
    }
    else {
      for (var i = 0; i < this.Allconfigurationlist.length; i++) {
        if (this.Allconfigurationlist[i].ConfigKey == "Show3D") {
          this.show3D = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "IsMuscle") {
          this.IsMuscle = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "PriceRound") {
          this.PriceRound = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "baseitemShow") {
          this.baseitemShow = this.Allconfigurationlist[i].ConfigValue;
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
        if (this.Allconfigurationlist[i].ConfigKey == "MinQty") {
          this.MinQty = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "SettingForUMDescription") {
          this.isumdescr  = this.Allconfigurationlist[i].ConfigValue;
        }          
        if (this.Allconfigurationlist[i].ConfigKey == "MaxQty") {
          this.MaxQty = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "addifunavail") {
          this.addtonotavail = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "Multiply") {
          this.Multiply = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "linebyline") {
          this.linebyline = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "copypaste") {
          this.copypaste = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "fileupload") {
          this.fileupload = this.Allconfigurationlist[i].ConfigValue;
        }
      }
    }
    // this.fileupload='1';
    // this.copypaste='1';
    // this.linebyline='1';
  }


  ngOnInit(): void {
    //this.searchall();
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
  deleteitem(ind) {
    this.productlistfortable.splice(ind, 1);
  }
  removeall() {
    this.productlistfortable = [];
  }
  addtotable() {
    this.productlistfortable = [];
    for (var i = 0; i < this.productlines.length; i++) {
      if (this.productlines[i].item != undefined && this.productlines[i].item != null) {
        this.productlistfortable.push(this.productlines[i]);
      }
    }
  }
  Addtocart() {
    this.sendMessage('start');
    for (var i = 0; i < this.productlistfortable.length; i++) {
      if (this.productlistfortable[i].item != undefined && this.productlistfortable[i].item != null) {
        this.AddNewProducts(this.productlistfortable[i].product, this.productlistfortable[i].qty, i);
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
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  AddNewProducts(AddNewItem, AddNewQty, index) {
    var warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
    if (AddNewItem == null || AddNewItem == '') {
      this.toastr.error("Please enter valid Item Name", 'Message!');
    }
    else if (AddNewQty == null || AddNewQty == '' || AddNewQty < 0) {
      this.toastr.error("Please enter valid Item Quantity", 'Message!');
    }
    else {
      try {
        this.dataService.getProductDetailNameForXref(AddNewItem, warehouse, Common.getWithExpiry("CustID")).subscribe((res: any) => {
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


          if ((item1 != null && item1.IsGrouped == false && item1.IsBaseProduct == false) || (item1 != null && item1.IsGrouped == true && this.baseitemShow == '1')) {

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
            item1.TotQty = 0;
            // if (this.cartProducts != undefined && this.cartProducts.length > 0) {
            //   for (let cprod of this.cartProducts) {
            //     if (cprod.itemname == item1.itemname) {
            //       var getums = JSON.parse(cprod.um);
            //       var getumsqty = JSON.parse(cprod.umqty);
            //       for (var i = 0; i < getums.length; i++) {
            //         if (i == 0 && getums[i] != '') {
            //           item1.firstum = getums[i];
            //           item1.firstumqty = (getumsqty[i - 1] == undefined ? 1 : getumsqty[i - 1]);
            //           if (i == 0 && getums[i] == cprod.MeasureUnit) {
            //             item1.TotQty = item1.TotQty + (cprod.Quantity * 1);
            //           }
            //           if (getums[i] == item1.um_display) {
            //             item1.um_displayQty = 1;
            //             item1.Qty = (cprod.Quantity * 1);
            //           }
            //         }
            //         else if (i != 0 && getums[i] != '') {
            //           if (getums[i] == cprod.MeasureUnit) {
            //             item1.TotQty = item1.TotQty + (cprod.Quantity * getumsqty[i - 1]);

            //           }
            //           if (getums[i] == item1.um_display) {
            //             item1.Qty = (cprod.Quantity * getumsqty[i - 1]);
            //             item1.um_displayQty = getumsqty[i - 1];
            //           }
            //         }
            //       }
            //     }
            //   }
            // }
            item1.list_price = 1;
            item1.quantity = AddNewQty;
            if (item1.TotQty == undefined || item1.TotQty == null || item1.TotQty == 0) {
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
            this.dataService.getProductavailibity(getitem12).subscribe((res: any) => {
              var availdata = res;
              var bulkPrice = [];

              bulkPrice.push({
                "customer": Common.getWithExpiry("CustID"),
                "item": AddNewItem,
                "quantity": item1.Qty,
                "warehouse": warehouse,
                "rounding": this.PriceRound,
                "qty_unit": item1.um_display.trim(),
                "company_sy": Common.getWithExpiry("company_sy")
              })
              this.cartService.getBulkPrice(bulkPrice).subscribe((res: any) => {
                var pricedata = res;

                if (pricedata != undefined && pricedata.length > 0) {
                  item1.list_price = parseFloat(pricedata[0].extension) / parseFloat(pricedata[0].quantity);
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
                  if ((this.configforcartbyprofile == '1' && profilefor != undefined && profilefor != null && (profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1] == 'NO' || profilefor[parseInt(this.AddToCartAsPerProfileArrayNo) - 1] == 'no')) && ((pricedata[0].origin != 'CI') && this.isLoggedIn)) {
                    this.toastr.error("Product is Not Available");
                    return;
                  }
                }

                item1.totqty = parseFloat(item1.quantity) * parseFloat(item1.um_displayQty.toString());
                item1.TotQty = item1.TotQty + parseFloat(item1.quantity) * parseFloat(item1.um_displayQty.toString());
                if (item1.min != undefined && item1.min != "0" && item1.TotQty < item1.min && this.MinQty) {
                  this.toastr.error("Minimum quantity should be " + item1.min + ' of ' + this.getumdescbyumcode(item1.firstum));
                  return;
                }

                if (item1.max != undefined && item1.max != "0" && item1.TotQty > item1.max && this.MaxQty) {
                  this.toastr.error("Maximum quantity should be " + item1.max + ' of ' + this.getumdescbyumcode(item1.firstum));
                  return;
                }
                if (this.addtonotavail == 0 && (availdata[0].available == 0 || availdata[0].available == undefined)) {
                  this.toastr.error("Product not available.", 'Cannot be added to cart!');
                  return;
                }


                if (item1.qty_warn != undefined && item1.qty_warn != "0" && this.Multiply == '1') {
                  if ((item1.quantity * parseFloat(item1.um_displayQty.toString())) % item1.qty_warn != 0) {
                    this.toastr.error("Please enter item in multiple of " + item1.qty_warn / item1.um_displayQty + ' of ' + this.getumdescbyumcode(item1.um_display));
                    return;
                  }
                }

                this.cartService.addProductToCart(item1, item1.um_display).subscribe((res: any) => {

                  this.cartService.cartBroadCaster(res);
                  AddNewItem = '';
                  AddNewQty = '';
                  if (index == (this.productlistfortable.length - 1)) {
                    this.sendMessage('stop');
                    this.router.navigate(['viewcart']);
                  }

                })

              })
            });
          }
          else {
            this.toastr.error("Product is not available", 'Message!');
          }
        })
      }
      catch (exception) {
        this.toastr.error("Product is not available", 'Message!');
      }
    }
  }

  addminus(i) {
    if (this.productlines[i].qty > 1) {
      this.productlines[i].qty = this.productlines[i].qty - 1;
    }
  }
  addplus(i) {
    this.productlines[i].qty = this.productlines[i].qty + 1;
  }

  // searchall() {
  //   for (var i = 0; i < this.productlines.length; i++) {
  //     if (this.productlines[i].product != undefined && this.productlines[i].product != null && this.productlines[i].product != '') {
  //       this.dataSource = new Observable((observer: any) => {
  //         observer.next(this.productlines[i].product);
  //       }).pipe(mergeMap((token: string) => this.filterResults(token)));
  //     }
  //   }
  // }
  searchallnew(token) {
    this.dataSource = this.filterResults(token);
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
  typeaheadOnSelect(event, i) {
    this.productlines[i].product = event.item.itemname;
    this.productlines[i].item = event.item;

  }


  addfiverowsin() {
    for (var i = 0; i < this.productlines1.length; i++) {
      this.productlines.push(this.productlines1[i]);
    }
  }

}
