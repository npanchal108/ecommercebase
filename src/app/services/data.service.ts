import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Common } from '../model/common.model';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  iskrayden:any;
  constructor(private http: HttpClient) {
    this.iskrayden=environment.iskyraden;
  }


  GetProductPageConfigurationsnew() {
var Allconfigurationlist=null;
    if (Allconfigurationlist == null || Allconfigurationlist == undefined || Allconfigurationlist == '') {
      try {
        Allconfigurationlist = JSON.parse(Common.getWithExpiry("GetProductPageConfigurations"));
      } catch (ed) { }
    }
    if (Allconfigurationlist == null || Allconfigurationlist == undefined || Allconfigurationlist == '') {
     this.GetProductPageConfigurations().subscribe((data: any) => {
        Allconfigurationlist = data;
        Common.setWithExpiry("GetProductPageConfigurations", JSON.stringify(Allconfigurationlist));        
      })
    }    
  }

  Getallconfigurations() {
    var allconfiglist = null;
    try {
      allconfiglist = JSON.parse(Common.getWithExpiry("Allconfigs"));
      return allconfiglist;
    } catch (ed) {
    }
    if (allconfiglist == undefined || allconfiglist == null || allconfiglist.length == 0) {

      this.GetAllConfiguration().subscribe((res: any) => {
        allconfiglist=res;
        Common.setWithExpiry("Allconfigs", JSON.stringify(res));
        return allconfiglist;
      });

    }
    
  }



  Getconfigbykey(Configkey: string) {
    var allconfiglist = null;
    var ConfigValue = '';
    try {
      allconfiglist = JSON.parse(Common.getWithExpiry("Allconfigs"));
    } catch (ed) {
    }
    if (allconfiglist != undefined && allconfiglist != null && allconfiglist.length > 0) {
      for (var i = 0; i < allconfiglist.length; i++) {
        if (Configkey == allconfiglist[i].ConfigKey) {
          ConfigValue = allconfiglist[i].ConfigValue;
          break;
        }
      }
    }
    return ConfigValue;
  }
  GetValidStreetAddress(model: any) {
    return this.http.post(environment.APIUrl + '/ecommerce/ValidateStreetLevelAddress', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GettreenodebyNode(treenode: string) {
    return this.http.get(environment.APIUrl + '/Product/GettreenodebyNode?treenode=' + treenode, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetInvalidItemsList() {
    return this.http.get(environment.APIUrl + '/Product/getInvalidItemsList', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetAllConfiguration() {
    return this.http.get(environment.APIUrl + '/usermodule/GetAllConfigurations', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getvisiblesitemapdata() {
    return this.http.get(environment.APIUrl + '/usermodule/Getvisiblesitemapdata', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetLoginPageConfigurations() {
    return this.http.get(environment.APIUrl + '/usermodule/GetLoginPageConfigurations', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetQuickAddPageConfigurations() {
    return this.http.get(environment.APIUrl + '/usermodule/GetQuickAddPageConfigurations', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getconfigforguestcheckout() {
    return this.http.get(environment.APIUrl + '/Product/Getconfigforguestcheckout', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetHomePageConfigurations() {
    return this.http.get(environment.APIUrl + '/usermodule/GetHomePageConfigurations', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetFooterPageConfigurations() {
    return this.http.get(environment.APIUrl + '/usermodule/GetFooterPageConfigurations', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetProductPageConfigurations() {
    return this.http.get(environment.APIUrl + '/usermodule/GetProductPageConfigurations', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetDashboardPageConfigurations() {
    return this.http.get(environment.APIUrl + '/usermodule/GetDashboardPageConfigurations', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetSidePageConfigurations() {
    return this.http.get(environment.APIUrl + '/usermodule/GetSidePageConfigurations', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetHeaderPageConfigurations() {
    return this.http.get(environment.APIUrl + '/usermodule/GetHeaderPageConfigurations', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigformodifyshipto() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigformodifyshipto', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getconfigforafterloginurl() {
    return this.http.get(environment.APIUrl + '/Product/Getconfigforafterloginurl', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigforwishlistlable() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigforwishlistlable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigtowishlistproductsnote() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigtowishlistproductsnote', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetConfigforproductDDL() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigforproductDDL', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetConfigforNewItem() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigforNewItem', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getconfigurationnewitemdays() {
    return this.http.get(environment.APIUrl + '/Product/Getconfigurationnewitemdays', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigurationForpdfbuttonshow() {
    return this.http.get(environment.APIUrl + '/Product/ConfigurationForpdfbuttonshow', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigtomultiplewarehouseinone() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigtomultiplewarehouseinone', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetConfigforcolorpellet() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigforColorPellet', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetsetdefaultRESIDENTIAL() {
    return this.http.get(environment.APIUrl + '/Product/GetsetdefaultRESIDENTIAL', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  Getship_attn_required() {
    return this.http.get(environment.APIUrl + '/Product/Getship_attn_required', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getblind_ship() {
    return this.http.get(environment.APIUrl + '/Product/Getblind_ship', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getblind_ship_defaultCheck() {
    return this.http.get(environment.APIUrl + '/Product/Getblind_ship_defaultCheck', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetMultiplewarehouseforavaibility() {
    return this.http.get(environment.APIUrl + '/Product/GetMultiplewarehouseforavaibility', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetDisplayListPriceInProductListwithoutLogin() {
    return this.http.get(environment.APIUrl + '/Product/GetDisplayListPriceInProductListwithoutLogin', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetDisplayListPriceInProductListwithLogin() {
    return this.http.get(environment.APIUrl + '/Product/GetDisplayListPriceInProductListwithLogin', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getsetdefaultsafiltersclose() {
    return this.http.get(environment.APIUrl + '/Product/Getsetdefaultsafiltersclose', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforProcesswithzeroprice() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforProcesswithzeroprice', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigurationForPrintOrderReview() {
    return this.http.get(environment.APIUrl + '/Product/ConfigurationForPrintOrderReview', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetEmailTemplateofOrderhead() {
    return this.http.get(environment.APIUrl + '/UserModule/GetEmailTemplateofOrderhead', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetEmailTemplateofProductDetails() {
    return this.http.get(environment.APIUrl + '/UserModule/GetEmailTemplateofProductDetails', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getbeforepricelableinproductlist() {
    return this.http.get(environment.APIUrl + '/Product/Getbeforepricelableinproductlist', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getumafterpriceinproductlist() {
    return this.http.get(environment.APIUrl + '/Product/Getumafterpriceinproductlist', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getmanufacturerproductlist() {
    return this.http.get(environment.APIUrl + '/Product/Getmanufacturerproductlist', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetListPriceShow() {
    return this.http.get(environment.APIUrl + '/Product/GetListPriceShow', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetUMdropdown() {
    return this.http.get(environment.APIUrl + '/Product/GetUMdropdown', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetDescrToShow() {
    return this.http.get(environment.APIUrl + '/Product/GetDescrToShow', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetRMALable() {
    return this.http.get(environment.APIUrl + '/Product/GetRMALable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetEnter_by_Default() {
    return this.http.get(environment.APIUrl + '/Product/GetconfigforEnter_by_Default', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetconfigforEnter_by() {
    return this.http.get(environment.APIUrl + '/Product/GetconfigforEnter_by', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetconfigforEnter_by_Lable() {
    return this.http.get(environment.APIUrl + '/Product/GetconfigforEnter_by_Lable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetconfigurationforIsDisablePayment() {
    return this.http.get(environment.APIUrl + '/Product/GetconfigurationforIsDisablePayment', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetconfigforEnter_by_Required() {
    return this.http.get(environment.APIUrl + '/Product/GetconfigforEnter_by_Required', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigforIsProfileShow() {
    return this.http.get(environment.APIUrl + '/Product/ConfigforIsProfileShow', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigforProfileNo() {
    return this.http.get(environment.APIUrl + '/Product/ConfigforProfileNo', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigforProfileIndex() {
    return this.http.get(environment.APIUrl + '/Product/ConfigforProfileIndex', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigforProfileLable() {
    return this.http.get(environment.APIUrl + '/Product/ConfigforProfileLable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getRetailPriceConfg() {
    return this.http.get(environment.APIUrl + '/Product/getRetailPriceConfg', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getRetailPriceLabel() {
    return this.http.get(environment.APIUrl + '/Product/getRetailPriceLabel', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigforIsARTotal() {
    return this.http.get(environment.APIUrl + '/Product/ConfigforIsARTotal', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigforSearchplaceholder() {
    return this.http.get(environment.APIUrl + '/Product/ConfigforSearchplaceholder', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigforSideMenuDefault() {
    return this.http.get(environment.APIUrl + '/Product/ConfigforSideMenuDefault', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigurationForLogoImageurl() {
    return this.http.get(environment.APIUrl + '/Product/ConfigurationForLogoImageurl', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  showpricetocustomers() {
    return this.http.get(environment.APIUrl + '/Product/showpricetocustomers', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetPagelistbytype(pageno: any, pagesize: any, ptype: string){
    return this.http.get(environment.APIUrl + '/usermodule/GetPagelistbytype?pageno='+pageno+"&pagesize="+pagesize+"&ptype="+ptype, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetPagelistbytypecounts(ptype: string){
    return this.http.get(environment.APIUrl + '/usermodule/GetPagelistbytypecounts?ptype='+ptype, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  Getpagebytypeandname(pagename: string, ptype: string){
    return this.http.get(environment.APIUrl + '/usermodule/Getpagebytypeandname?pagename='+pagename+"&ptype="+ptype, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  Getpagedatabyid(pageid: string) {
    return this.http.get(environment.APIUrl + '/usermodule/Getpagedatabyid?pageid='+pageid, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getpagedatabyname(pagename: string) {
    return this.http.get(environment.APIUrl + '/usermodule/Getpagedatabyname?pagename='+pagename, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigurationForprintinvoice() {
    return this.http.get(environment.APIUrl + '/Product/ConfigurationForprintinvoice', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigurationFordocument() {
    return this.http.get(environment.APIUrl + '/Product/ConfigurationFordocument', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigurationFordocumentlable() {
    return this.http.get(environment.APIUrl + '/Product/ConfigurationFordocumentlable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigurationForprintinvoicelable() {
    return this.http.get(environment.APIUrl + '/Product/ConfigurationForprintinvoicelable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForsameship() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForsameship', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getconfigurationfrieghtcode() {
    return this.http.get(environment.APIUrl + '/Product/Getconfigurationfrieghtcode', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForforgotpwdmsg() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForforgotpwdmsg', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforProcessTempOrder() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforProcessTempOrder', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  cofigurtiondforLowestPriceFirst() {
    return this.http.get(environment.APIUrl + '/Product/cofigurtiondforLowestPriceFirst', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getavg_lead_time() {
    return this.http.get(environment.APIUrl + '/Product/Getavg_lead_time', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getavg_lead_time_lable() {
    return this.http.get(environment.APIUrl + '/Product/Getavg_lead_time_lable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getconfigurationfornewestfirstsort() {
    return this.http.get(environment.APIUrl + '/Product/Getconfigurationfornewestfirstsort', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getconfigurationfornewestfirstsortlabel() {
    return this.http.get(environment.APIUrl + '/Product/Getconfigurationfornewestfirstsortlabel', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getavg_lead_time_value() {
    return this.http.get(environment.APIUrl + '/Product/Getavg_lead_time_value', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetDefaultredirect() {
    return this.http.get(environment.APIUrl + '/Product/GetDefaultredirect', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  cofigurtiondforhighestPriceFirst() {
    return this.http.get(environment.APIUrl + '/Product/cofigurtiondforhighestPriceFirst', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  cofigurtiondforItemAtoZ() {
    return this.http.get(environment.APIUrl + '/Product/cofigurtiondforItemAtoZ', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  cofigurtiondforItemZtoA() {
    return this.http.get(environment.APIUrl + '/Product/cofigurtiondforItemZtoA', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  cofigurtiondforLowestQtyFirst() {
    return this.http.get(environment.APIUrl + '/Product/cofigurtiondforLowestQtyFirst', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  cofigurtiondforhighestQtyFirst() {
    return this.http.get(environment.APIUrl + '/Product/cofigurtiondforhighestQtyFirst', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  cofigurtiondfordescrAtoZ() {
    return this.http.get(environment.APIUrl + '/Product/cofigurtiondfordescrAtoZ', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  cofigurtiondfordescrZtoA() {
    return this.http.get(environment.APIUrl + '/Product/cofigurtiondfordescrZtoA', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  cofigurtiondforQuantitySort() {
    return this.http.get(environment.APIUrl + '/Product/cofigurtiondforQuantitySort', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  cofigurtiondforDescrSort() {
    return this.http.get(environment.APIUrl + '/Product/cofigurtiondforDescrSort', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForDisplaypriceinrfq() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForDisplaypriceinrfq', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  cofigurtiondforHomePageCategoryLable() {
    return this.http.get(environment.APIUrl + '/Product/cofigurtiondforHomePageCategoryLable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GettreenodeAdvance() {
    return this.http.get(environment.APIUrl + '/Product/GettreenodeAdvance', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetproductlineAdvance() {
    return this.http.get(environment.APIUrl + '/Product/GetproductlineAdvance', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetconfigforIsRelatedProduct() {
    return this.http.get(environment.APIUrl + '/Product/GetconfigforIsRelatedProduct', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetconfigforRelatedProductLable() {
    return this.http.get(environment.APIUrl + '/Product/GetconfigforRelatedProductLable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getCardtypelist() {
    return this.http.get(environment.APIUrl + '/UserModule/getCardtypelist', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigtoCartpagemessage() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigtoCartpagemessage', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigtoRegistrationLable() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigtoRegistrationLable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ConfigurationForItemDisclamier() {
    return this.http.get(environment.APIUrl + '/Product/ConfigurationForItemDisclamier', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigtocredicardtermcode() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigtocredicardtermcode', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  cofigurtiondfordrop_ship() {
    return this.http.get(environment.APIUrl + '/Product/cofigurtiondfordrop_ship', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  cofigurtiondfordrop_shiplable() {
    return this.http.get(environment.APIUrl + '/Product/cofigurtiondfordrop_shiplable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetJobReleaselable() {
    return this.http.get(environment.APIUrl + '/Product/GetJobReleaselable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  configforreorderfromorder() {
    return this.http.get(environment.APIUrl + '/Product/configforreorderfromorder', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  configforbreadcuminproductdetail() {
    return this.http.get(environment.APIUrl + '/Product/configforbreadcuminproductdetail', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  gettreenodebyitem(item: any) {
    var model = {
      "items": item
    }
    return this.http.post(environment.APIUrl + '/Product/gettreenodebyitem', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetItemDetailsListCounts(docNames: any ,searchText: any){
    var model = {
      "docName": docNames,
      "searchText":searchText
    }
    return this.http.post(environment.APIUrl + '/usermodule/GetItemDetailsListCounts', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetItemDetailsList(pageno: any, pagesize: any,docNames: any,searchText: any){
    var model = {
      "pageno":pageno,
      "pagesize":pagesize,
      "docName": docNames,
      "searchText":searchText
    }
    return this.http.post(environment.APIUrl + '/usermodule/GetItemDetailsList', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetProductListByRelatedItem(item: any, warehouse: any, company_sy: any) {
    var model = {
      "item": item,
      "warehouse": warehouse,
      "company_sy": company_sy
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductListByRelatedItem', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getitemdetailspagebyitem(item: any) {
    var model = {
      "item": item
    }
    return this.http.post(environment.APIUrl + '/Product/Getitemdetailspagebyitem', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  configforstocklable() {
    return this.http.get(environment.APIUrl + '/Product/configforstocklable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  configforvendorinproductlist() {
    return this.http.get(environment.APIUrl + '/Product/configforvendorinproductlist', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForOrderNoteLable() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForOrderNoteLable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetconfigurationfroAddressParser() {
    return this.http.get(environment.APIUrl + '/Product/GetconfigurationfroAddressParser', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforPasswordPolicy() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforPasswordPolicy', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforaddb2bfields() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforaddb2bfields', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforViewTypeInProductListPage() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforViewTypeInProductListPage', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforTableView() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforTableView', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetCustomerProductLable() {
    return this.http.get(environment.APIUrl + '/Product/GetCustomerProductLable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetconfigforShowSAFilters() {
    return this.http.get(environment.APIUrl + '/Product/GetconfigforShowSAFilters', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforSaFilterLable() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforSaFilterLable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforPriceOrLable() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforPriceOrLable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforProfilePriceLable() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforProfilePriceLable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  // GetFirstSysCompanyDetails() {
  //   return this.http.get(environment.APIUrl + '/ecommerce/GetFirstSysCompanyDetails');
  // }
  GetDisplayListPriceLable() {
    return this.http.get(environment.APIUrl + '/Product/GetDisplayListPriceLable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetDisplayListPriceInProductDetails() {
    return this.http.get(environment.APIUrl + '/Product/GetDisplayListPriceInProductDetails', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetDisplayListPriceInProductDetailswithoutLogin() {
    return this.http.get(environment.APIUrl + '/Product/GetDisplayListPriceInProductDetailswithoutLogin', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetContactUshtml() {
    return this.http.get(environment.APIUrl + '/Product/GetContactUshtml', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Gethelpdeskmenutype() {
    return this.http.get(environment.APIUrl + '/Product/Gethelpdeskmenutype', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigtoCategoryLableShow() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigtoCategoryLableShow', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigtoproductlineLableShow() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigtoproductlineLableShow', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForAddToCartAsPerProfile() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForAddToCartAsPerProfile', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForTextUpperCaseSetting() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForTextUpperCaseSetting', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigforfaxonxontactus() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigforfaxonxontactus', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetAddToCartAsPerProfileNo() {
    return this.http.get(environment.APIUrl + '/Product/GetAddToCartAsPerProfileNo', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetAddToCartAsPerProfileArrayNo() {
    return this.http.get(environment.APIUrl + '/Product/GetAddToCartAsPerProfileArrayNo', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GettermsandconditionsRequired() {
    return this.http.get(environment.APIUrl + '/Product/GettermsandconditionsRequired', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GettermsandconditionsLable() {
    return this.http.get(environment.APIUrl + '/Product/GettermsandconditionsLable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Gettermsandconditions() {
    return this.http.get(environment.APIUrl + '/Product/Gettermsandconditions', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Geturloftermsandconditions() {
    return this.http.get(environment.APIUrl + '/Product/Geturloftermsandconditions', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfidForOrderBy() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForOrderByshow', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetUrlWithDetailssetting() {
    return this.http.get(environment.APIUrl + '/Product/GetUrlWithDetailssetting', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetUrlWithFreeFormsetting() {
    return this.http.get(environment.APIUrl + '/Product/GetUrlWithFreeFormsetting', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfidForshowjobref() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForshowshowjobref', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigtomailtoemailfromorder() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigtomailtoemailfromorder', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigtoDisplayUmQty() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigtoDisplayUmQty', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfidForSalesman() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForSalesmanshow', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfidForshowtracking() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForshowtrackingshow', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfidForcaptchaRegistration() {
    return this.http.get(environment.APIUrl + '/Product/GetConfidForcaptchaRegistration', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getloginfraudmsg() {
    return this.http.get(environment.APIUrl + '/Product/Getloginfraudmsg', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getorderfraudmsg() {
    return this.http.get(environment.APIUrl + '/Product/Getorderfraudmsg', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfidForCaptchaInContactUs() {
    return this.http.get(environment.APIUrl + '/Product/GetConfidForCaptchaInContactUs', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigforisprofiledesc() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigforisprofiledesc', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetSubmitTempOrderConfig() {
    return this.http.get(environment.APIUrl + '/Product/GetSubmitTempOrderConfig', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforlable1() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforlable1', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforlable2() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforlable2', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforlable3() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforlable3', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforlable4() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforlable4', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforlable5() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforlable5', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforlable6() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforlable6', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforlable7() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforlable7', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getSalesmanNameByID(salesmanid: string) {
    var company_cu = Common.getWithExpiry("company_cu");
    return this.http.get(environment.APIUrl + '/Product/getSalesmanNameByID?salesmanid=' + salesmanid + '&company_cu=' + company_cu, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getlableforcustomerinforgotpassword() {
    return this.http.get(environment.APIUrl + '/Product/Getlableforcustomerinforgotpassword', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetlableforcuUserinforgotpassword() {
    return this.http.get(environment.APIUrl + '/Product/GetlableforcuUserinforgotpassword', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getconfigforcheckoutmsg() {
    return this.http.get(environment.APIUrl + '/Product/getconfigforcheckoutmsg', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getconfigurationforurlfromreview() {
    return this.http.get(environment.APIUrl + '/Product/Getconfigurationforurlfromreview', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetViewTypeformultipleproduct() {
    return this.http.get(environment.APIUrl + '/Product/GetViewTypeformultipleproduct', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getpricebreakoneline() {
    return this.http.get(environment.APIUrl + '/Product/Getconfigurationforshowpricebreakoneline', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getconfigurationfroups() {
    return this.http.get(environment.APIUrl + '/Product/Getconfigurationfroups', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getthebaseitemconfiguration() {
    return this.http.get(environment.APIUrl + '/Product/Getthebaseitemconfiguration', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetpriceRoundingsetting() {
    return this.http.get(environment.APIUrl + '/Product/GetpriceRoundingsetting', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetMinOrdervalue() {
    var company = Common.getWithExpiry("company_sy");
    return this.http.get(environment.APIUrl + '/Product/GetMinOrdervalue?company=' + company, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigtoshowCreditLimit() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigtoshowCreditLimit', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetAllDevicenames1() {
    return this.http.get('http://ec2-52-91-50-53.compute-1.amazonaws.com/home/GetAllDevicesNames', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetAllDevicenames() {
    var getmodel = [];
    var getmodelnew= {
      "locationid": 27,
      "userid": "628cb2d43f21092d3878578b",
      "isedit": true,
      "locationname": "Nashville"
  }
  getmodel.push(getmodelnew);
    return this.http.post("http://studioautomation2.vustudio.network/api/values/Insertnewuserlocationmapping", getmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getlatlng(address: string){    
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address);   
  }

  Gettroopsalesprofile(customer: any, username: any) {
    var getmodel = {
      customer: customer,
      UserName: username,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + "/UserModule/Getsalesprofilefortroop", getmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getpdfforhotboards(type: any, order: any, seq: any) {
    var mmodel = {
      type: type,
      order: order,
      seq: seq,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/webBrowser1_Navigating', mmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetPdfForItemNotes(order: any, type: any) {
    var mmodel = {
      type: type,
      order: order,
      seq: '',
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/Getitemnotespdf', mmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetOrderDocumentspdf(order: any, type: any, seq: any) {
    var mmodel = {
      type: type,
      order: order,
      seq: seq,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetOrderDocumentspdf', mmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }




  Getconfigformanager() {
    return this.http.get(environment.APIUrl + '/Product/Getconfigformanager', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigFortheaddressshow() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigFortheaddressshow', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getconfigforitemlable() {
    return this.http.get(environment.APIUrl + '/Product/Getconfigforitemlable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetconfigforSequencelable() {
    return this.http.get(environment.APIUrl + '/Product/GetTheSequenceLable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  SettingForUMDescription() {
    return this.http.get(environment.APIUrl + '/Product/SettingForUMDescription', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  warehousenamesetting() {
    return this.http.get(environment.APIUrl + '/Product/warehousenamesetting', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getwarehousenames() {
    return this.http.get(environment.APIUrl + '/Product/Getwarehousenames', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getunitdescription() {
    return this.http.get(environment.APIUrl + '/Product/getunitdescription', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  showandhidewishinlist() {
    return this.http.get(environment.APIUrl + '/Product/showandhidewishinlist', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  showandhidecartinlist() {
    return this.http.get(environment.APIUrl + '/Product/showandhideAddtocartinlist', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  showandhiderfqinlist() {
    return this.http.get(environment.APIUrl + '/Product/showandhiderfqinlist', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetconfigurationforDisplayCounts() {
    return this.http.get(environment.APIUrl + '/Product/GetconfigurationforDisplayCounts', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetCountFormultipleproduct(item: any, warehouse: any) {
    var pmodel = {
      item: item,
      warehouse: warehouse,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetCountFormultipleproduct', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetAllTotcodes() {
    var company_sy = Common.getWithExpiry("company_sy");
    return this.http.get(environment.APIUrl + '/Product/GetAlltotcodes?company_sy=' + company_sy, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfidForcaptcha() {
    return this.http.get(environment.APIUrl + '/Product/GetConfidForcaptcha', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigFortreesort() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigFortreesort', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForsidecategorylabel() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForsidecategorylabel', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetSAGroupColorCodeConfig() {
    return this.http.get(environment.APIUrl + '/Product/GetSAGroupColorCodeConfig', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForsideproductlabel() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForsideproductlabel', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForProductlineshow() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForProductlineshow', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getsy_prof_label() {
    var company_sy = Common.getWithExpiry("company_sy");
    return this.http.get(environment.APIUrl + '/Product/sy_prof_label?company_sy=' + company_sy, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigforprofilenoforitemdesc() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigforprofilenoforitemdesc', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigforarraynoforitemdesc() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigforarraynoforitemdesc', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForZeroPrice() {
    return this.http.get(environment.APIUrl + '/Product/GetConfidForProductZero', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getitemsearchinpurchasehistory() {
    return this.http.get(environment.APIUrl + '/usermodule/getitemsearchinpurchasehistory', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getitemsearchincustomerproducts() {
    return this.http.get(environment.APIUrl + '/usermodule/getitemsearchincustomerproducts', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForDimensions() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForDimensions', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForVendorinProductDetailspage() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForVendorinProductDetailspage', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForManufacturerinProductDetailspage() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForMenufacturerinProductDetailspage', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForisreorder() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForisreorder', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForisaddifunavail() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForisaddifunavail', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigforProductNotAvailableinPurchasehistory() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigforProductNotAvailableinPurchasehistory', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforshowwebiteminpurchasehistory() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigurationforshowwebiteminpurchasehistory', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Allowmultiuser() {
    return this.http.get(environment.APIUrl + '/Product/Allowmultiuser', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Loginlableformessage() {
    return this.http.get(environment.APIUrl + '/Product/Loginlableformessage', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  IsMultiCompanySetting() {
    return this.http.get(environment.APIUrl + '/UserModule/IsMultiCompanySetting', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetAllCompaniesList() {
    return this.http.get(environment.APIUrl + '/UserModule/GetAllCompaniesList', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetSysCompanyDetails(company: string) {
    return this.http.get(environment.APIUrl + '/ecommerce/GetSysCompanyDetails?company=' + company, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Loginmsgformessage() {
    return this.http.get(environment.APIUrl + '/Product/Loginmsgformessage', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Allowpricebreaks() {
    return this.http.get(environment.APIUrl + '/Product/Allowpricebreaks', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Allowmultipleum() {
    return this.http.get(environment.APIUrl + '/Product/Allowmultipleum', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  anonymoususersavailable() {
    return this.http.get(environment.APIUrl + '/Product/anonymoususersavailable', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Allowsaitemtags() {
    return this.http.get(environment.APIUrl + '/Product/Allowsaitemtags', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  msgdisplayforavaibility() {
    return this.http.get(environment.APIUrl + '/Product/msgdisplayforavaibility', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  msgdisplayforprice() {
    return this.http.get(environment.APIUrl + '/Product/msgdisplayforprice', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  ProductDetailsOrderConfig() {
    return this.http.get(environment.APIUrl + '/Product/ProductDetailsOrderConfig', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  anonymoususersIsstock() {
    return this.http.get(environment.APIUrl + '/Product/anonymoususersIsstock', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  withoutloginavaillist() {
    return this.http.get(environment.APIUrl + '/Product/withoutloginavaillist', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForStockShow() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigForStockShow', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getheaderlinkslist() {
    return this.http.get(environment.APIUrl + '/Product/Getheaderlinkslist', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getfooterlinkslist() {
    return this.http.get(environment.APIUrl + '/Product/Getfooterlinkslist', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getdashboardlinkslist() {
    return this.http.get(environment.APIUrl + '/Product/Getdashboardlinkslist', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  pricemsgwithoutlogin() {
    return this.http.get(environment.APIUrl + '/Product/pricemsgwithoutlogin', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  qtymsgwithoutlogin() {
    return this.http.get(environment.APIUrl + '/Product/qtymsgwithoutlogin', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetaCOOKIENAME() {
    return this.http.get(environment.APIUrl + '/Product/GetaCOOKIENAME', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfidForlistprice() {
    return this.http.get(environment.APIUrl + '/Product/GetConfidForlistprice', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForFastAddCart() {
    return this.http.get(environment.APIUrl + '/Product/GetConfidForFastAddCart', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  withloginprice() {
    return this.http.get(environment.APIUrl + '/Product/withloginprice', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  withloginpricelist() {
    return this.http.get(environment.APIUrl + '/Product/withloginpricelist', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  withloginavailshow() {
    return this.http.get(environment.APIUrl + '/Product/withloginavailshow', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  withloginavaillist() {
    return this.http.get(environment.APIUrl + '/Product/withloginavaillist', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  loginlabel1() {
    return this.http.get(environment.APIUrl + '/Product/loginlabel1', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  loginlabel2() {
    return this.http.get(environment.APIUrl + '/Product/loginlabel2', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  withloginavailqty() {
    return this.http.get(environment.APIUrl + '/Product/withloginavailqty', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetTreeListForAdvanceSearch() {
    var company_sy = Common.getWithExpiry("company_sy");
    return this.http.get(environment.APIUrl + '/Product/GetTreeListForAdvanceSearch?company_sy=' + company_sy, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getacustomer(customer: any) {
    var cmodel = {
      customer: customer,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/GetCustomerByID', cmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetloginCustomerInfo(CustID: any) {
    var umodel={
      customer:CustID,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/GetCustomer',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getProduct(Menuname: any, PageNo: any, PageSize: any, warehouse: any, type: any) {
    var pcmap = {
      Menuname: Menuname,
      PageNo: PageNo,
      PageSize: PageSize,
      warehouse: warehouse,
      type: type,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductListToDisplay', pcmap, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getcustomerbysalesman(salesman: any,subuser: any) {
    var smodel = {
      salesman: salesman,
      username:subuser,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/GetcustomerListbySalesman', smodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetcustomerListbysubuseremail(email: any) {
    var smodel = {
      salesman: email,
      username:email,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/GetcustomerListbysubuseremail', smodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getsalesmansbysalesman(salesman: any) {
    var smodel = {
      salesman: salesman,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/getsalesmanlistbysalesman', smodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getProductList(Menuname: any, pageNo: any, PageSize: any, warehouse: any, type: any, customer: any, satagsdetails: any,hideunavail: any) {
    var pmodel = {
      Menuname: Menuname,
      PageNo: pageNo,
      PageSize: PageSize,
      warehouse: warehouse,
      type: type,
      customer: customer,
      satagsdetails: satagsdetails,
      company_sy: Common.getWithExpiry("company_sy"),
      hideunavail:hideunavail
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductListToDisplay', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getProductListToDisplayCountNew(tree_node: any, BrandProduct: any, warehouse: any, satagsdetails: any,hideunavail: any) {
    var pmodel = {
      Menuname: tree_node,
      BrandProduct: BrandProduct,
      warehouse: warehouse,
      customer: Common.getWithExpiry("CustID"),
      satagsdetails: satagsdetails,
      company_sy: Common.getWithExpiry("company_sy"),
      hideunavail:hideunavail
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductListToDisplayCountNew', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }


  getProductListToDisplayCount(productName: any, warehouse: any) {
    var pmodel = {
      Menuname: productName,
      warehouse: warehouse,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductListToDisplayCount', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getBrandProductListCount(productName: any, warehouse: any) {
    var pmodel = {
      Menuname: productName,
      warehouse: warehouse,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetBrandProductListCount', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getproductdetailforlist(types: string, name: string) {
    var company_sy = Common.getWithExpiry("company_sy");
    return this.http.get(environment.APIUrl + '/Product/getimageforproductlistpage?types=' + types + '&name=' + name + '&company_sy=' + company_sy, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }


  signinPunchout() {
    const headers = new HttpHeaders({ responseType: 'text', 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');
    let body = '<?xml version = "1.0" encoding = "UTF-8"?>'
    '<request>'
    '<header version="1.0">'
    '<login>'
    '<username/>'
    '<password>welcome</password>'
    '</login>'
    '<action>shopping</action>'
    '<language>EN</language>'
    '<searchLanguage/>'
    '<userArea>'
    '<operatingUnit>204</operatingUnit>'
    '<shipTo>V1- New York City</shipTo>'
    '<deliverTo>V1- New York City</deliverTo>'
    '<fullName>Stock, Ms. Pat</fullName>'
    '<title>MS.</title>'
    '<manager>Brown, Ms. Casey</manager>'
    '<managerEmail>cbrown@vision.com</managerEmail>'
    '<location>V1- New York City</location>'
    '<language>US</language>'
    '<currency>USD</currency><dateFormat>DD-MON-RRRR</dateFormat>'
    '</userArea>'
    '</header>'
    '<body>'
    '<loginInfo>'
    '<exchangeInfo>'
    '<exchangeName>Oracle iProcurement</exchangeName>'
    '</exchangeInfo>'
    '<userInfo>'
    '<userName>Stock, Pat</userName>'
    '<userContactInfo>'
    '<userPhone/>'
    '<userEmail>pat.stock@vision.com</userEmail>'
    '</userContactInfo>'
    '<appUserName>OPERATIONS</appUserName>'
    '<userCompany>'
    '<companyName>Buyer Corp.</companyName>'
    '<companyDUNS>144709193</companyDUNS>'
    '<contactName/>'
    '<contactPhone/>'
    '</userCompany>'
    '</userInfo>'
    '<returnURL>http://qapache.us.oracle.com:15671/OA_'
    'HTML/OA.jsp?OAFunc=ICX_CAT_PUNCHOUT_CALLBACK&#38;OAHP=ICX_POR_HOMEPAGE_'
    'MENU&#38;OASF=ICX_CAT_PUNCHOUT_CALLBACK&#38;transactionid=1577779317</returnURL>'
    '</loginInfo>'
    '<partySiteId/>'
    '<searchKeywords/>'
    '<icxSessionCallBackURL/>'
    '</body>'
    '</request>';
    const hdr = { headers: headers, body: body };

    return this.http.post('https://66.128.132.126:8002/?event=account_login', hdr);
  }

  Getcategoriespath(param: any, stype: any) {
    var cmodel = {
      param: param,
      stype: stype,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/Getcategoriespath', cmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetcategoriespathProductDetails(param: any) {
    var cmodel = {
      param: param,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductDetailsBreadcum', cmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigfordecimalpoints() {
    return this.http.get(environment.APIUrl + '/Product/GetConfigfordecimalpoints', { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getProductListBySearchCount(productName: any, warehouse: any, customer: any,hideunavail: any,getsatags: any) {
    var model = {
      Menuname: productName,
      warehouse: warehouse,
      customer: customer,
      company_sy: Common.getWithExpiry("company_sy"),
      hideunavail:hideunavail,
      satagsdetails:getsatags
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductListBySearchCount', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }


  getProductavailibity(itemlist: { company_sy: any; }) {
// if(this.iskrayden){
//   itemlist.warehouse="*";
// }
    itemlist.company_sy = Common.getWithExpiry("company_sy");
    return this.http.post(environment.APIUrl + '/ecommerce/itemavailability', itemlist, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getProductListBySearch(searchText: any, pageNo: any, PageSize: any, warehouse: any, type: any, customer: any,hideunavail: any,getsatags: any) {
    var pmodel = {
      word: searchText,
      PageNo: pageNo,
      PageSize: PageSize,
      warehouse: warehouse,
      type: type,
      customer: customer,
      company_sy: Common.getWithExpiry("company_sy"),
      hideunavail:hideunavail,
      satagsdetails:getsatags
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductListBySearch', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetProductListBySearchforheader(searchText: any, pageNo: any, PageSize: any, warehouse: any, type: any, customer: any) {
    var pmodel = {
      word: searchText,
      PageNo: pageNo,
      PageSize: PageSize,
      warehouse: warehouse,
      type: type,
      customer: customer,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductListBySearchforheader', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetProductAdvanceSearch(searchview: any) {
    searchview.company_sy = Common.getWithExpiry("company_sy");
    return this.http.post(environment.APIUrl + '/Product/GetAdvanceSearch', searchview, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetProductAdvanceSearchCount(searchview: any) {
    searchview.company_sy = Common.getWithExpiry("company_sy");
    return this.http.post(environment.APIUrl + '/Product/GetAdvanceSearchCount', searchview, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getProductDetail(item: any, warehouse: any) {
    var pmodel = {
      itemnumber: item,
      warehouse: warehouse,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductListByItemnumber', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getProductDetailbyItemName(item: any, warehouse: any, customer: any) {
    var pmodel = {
      itemnumber: item,
      warehouse: warehouse,
      customer: customer,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductListByItemNameNew', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetProductDetailsByItemNameNew(item: any, warehouse: any, customer: any, word: any) {
    var pmodel = {
      itemnumber: item,
      warehouse: warehouse,
      customer: customer,
      word: word,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductDetailsByItemName', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetitemProfileDetails(item: any) {
    var pmodel = {
      item: item,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/GetitemProfileDetails', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getPriceBreaks(UserID: any, item: any) {
    var pmodel = {
      customer: UserID,
      item: item,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/GetPriceBreak', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getProductDetailName(itemName: any, warehouse: any, customer: any) {
    var pmodel = {
      itemName: itemName,
      warehouse: warehouse,
      customer: customer,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductListByItemName', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getProductDetailNameForXref(itemName: any, warehouse: any, customer: any) {
    var pmodel = {
      itemName: itemName,
      warehouse: warehouse,
      customer: customer,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductListByItemNameForXref', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getProductListByCategory(BrandProduct: any, pageNo: any, PageSize: any, warehouse: any, type: any, customer: any, satagsdetails: any,hideunavail: any) {
    var pmodel = {
      BrandProduct: BrandProduct,
      PageNo: pageNo,
      PageSize: PageSize,
      warehouse: warehouse,
      type: type,
      customer: customer,
      satagsdetails: satagsdetails,
      company_sy: Common.getWithExpiry("company_sy"),
      hideunavail:hideunavail
    }
    return this.http.post(environment.APIUrl + '/Product/GetProductListByBrandName', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getBrandProduct(warehouse: any, customer: any) {
    var pmodel = {
      warehouse: warehouse,
      customer: customer,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + "/Product/GetBrandProductToDisplay", pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  getMajProd() {
    return this.http.get(environment.APIUrl + "/Product/GetMajProd", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetWebsiteType() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetWebsiteType", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetlinebylineSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetlinebylineSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getaddnewqtywithnewlogic() {
    return this.http.get(environment.APIUrl + "/Product/Getaddnewqtywithnewlogic", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getdisplaynewavails() {
    return this.http.get(environment.APIUrl + "/Product/Getdisplaynewavails", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getdisplaynewavailslable() {
    return this.http.get(environment.APIUrl + "/Product/Getdisplaynewavailslable", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getconfigtowhlable1() {
    return this.http.get(environment.APIUrl + "/Product/getconfigtowhlable1", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getconfigtowhlable2() {
    return this.http.get(environment.APIUrl + "/Product/getconfigtowhlable2", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getconfigtowhlable3() {
    return this.http.get(environment.APIUrl + "/Product/getconfigtowhlable3", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getavailsincart() {
    return this.http.get(environment.APIUrl + "/ecommerce/Getavailsincart", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getinvoicepartialpayment() {
    return this.http.get(environment.APIUrl + "/ecommerce/Getinvoicepartialpayment", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getachininvoice() {
    return this.http.get(environment.APIUrl + "/ecommerce/Getachininvoice", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getachincheckout() {
    return this.http.get(environment.APIUrl + "/ecommerce/Getachincheckout", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  Getconfigforcustomedropdown() {
    return this.http.get(environment.APIUrl + "/product/ConfigurationForcustomedropdown", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetcopypasteSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetcopypasteSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetfileuploadSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetfileuploadSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetTheChatCode() {
    return this.http.get(environment.APIUrl + "/Product/GetTheChatCode", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfidForanonymoususersbrowsethesite() {
    return this.http.get(environment.APIUrl + "/Product/GetConfidForanonymoususersbrowsethesite", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfidForanonymoususersPriceshow() {
    return this.http.get(environment.APIUrl + "/Product/GetConfidForanonymoususersPriceshow", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForIsMuscle() {
    return this.http.get(environment.APIUrl + "/Product/GetConfigForIsMuscle", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getgetsalablesettings() {
    var company_sy = Common.getWithExpiry("company_sy");
    return this.http.get(environment.APIUrl + "/Product/getsalablesettings?company_sy=" + company_sy, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfidForGuestUserID() {
    return this.http.get(environment.APIUrl + "/Product/GetConfidForGuestUserID", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfidForGuestwarehouse() {
    var comapny_sy = Common.getWithExpiry("company_sy");
    return this.http.get(environment.APIUrl + "/Product/GetConfidForGuestwarehouse?comapny_sy=" + comapny_sy, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetMenuColor() {
    return this.http.get(environment.APIUrl + "/UserModule/GetMenuColor", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getmenufontcolor() {
    return this.http.get(environment.APIUrl + "/UserModule/Getmenufontcolor", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetTreeNodeValue() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetTreeNavigationValue", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetSocialLinks() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetSocialLinks", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  Getbusinesstype() {
    return this.http.get(environment.APIUrl + "/ecommerce/Getbusinesstype", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetItemNotes(item: any) {
    var omodel = {
      keys: item,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + "/ecommerce/GetItemNotes", omodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetUserwishlist(username: any, type: any) {
    var umodel = {
      username: username,
      type: type
    }
    return this.http.post(environment.APIUrl + "/Product/GetUserwishlist", umodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetShippingMethodCalculate() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetShippingMethodConfig", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetUPSRateSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetUPSRateSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetUSPSRateSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetUSPSRateSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetFedExRateSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetFedExRateSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetFreeFormSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetFreeFormSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetItemNoteSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetItemNoteSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetProductDetailNote() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetProductDetailNote", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetOpenInvoicePaymentSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetOpenInvoicePaymentSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getwishlistfeatureonoff() {
    return this.http.get(environment.APIUrl + "/Product/GetConfigforwishlist", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getconfigfortheheadermsg() {
    return this.http.get(environment.APIUrl + "/Product/getconfigfortheheadermsg", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  geturlforthelogo() {
    return this.http.get(environment.APIUrl + "/Product/geturlforthelogo", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getrfqlistfeatureonoff() {
    return this.http.get(environment.APIUrl + "/Product/GetConfigforrfqlist", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforsa13sortdesc() {
    return this.http.get(environment.APIUrl + "/Product/GetConfigurationforsa13sortdesc", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforsa13sortasc() {
    return this.http.get(environment.APIUrl + "/Product/GetConfigurationforsa13sortasc", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigurationforsa13sort() {
    return this.http.get(environment.APIUrl + "/Product/GetConfigurationforsa13sort", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetwishlistProductByID(wishlistId: any, customer: any) {
    var pmodel = {
      wishlistId: wishlistId,
      username: customer,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + "/Product/GetwishlistProductByID", pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Deletewishlistbyusername(wishlistid: any) {
    var pmdoel = {
      wishlistId: wishlistid
    }
    return this.http.post(environment.APIUrl + "/Product/Deletewishlistbyusername", pmdoel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  AddProducttowishlist(WishlistitemID: any, WishlistID: any, item: any, Qty: any) {
    var modelnew = {
      WishlistitemID: WishlistitemID,
      WishlistID: WishlistID,
      item: item,
      Qty: Qty
    }
    return this.http.post(environment.APIUrl + '/Product/AddProducttowishlist', modelnew, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Addwishlistheader(WishlistID: any, WishlistName: any, username: any, shipto: any, type: any) {
    var modelnew = {
      WishlistID: WishlistID,
      WishlistName: WishlistName,
      username: username,
      shipto: shipto,
      type: type
    }
    return this.http.post(environment.APIUrl + '/Product/Addwishlistheader', modelnew, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  DeleteProducttowishlist(wishlistproductid: any) {
    var dmodel = {
      wishlistproductid: wishlistproductid
    }
    return this.http.post(environment.APIUrl + "/Product/DeleteProducttowishlist", dmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  DeleteAllProducttowishlist(wishlistId: any) {
    var dmodel = {
      wishlistId: wishlistId
    }
    return this.http.post(environment.APIUrl + "/Product/DeleteAllProducttowishlist", dmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetProductListForQuickOrder() {
    return this.http.get(environment.APIUrl + "/Product/GetProductListForQuickOrder", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }


  GetItemNotesimg(item: any, seq: any) {
    var pmodel = {
      category: 'it_note',
      key: item,
      seq: seq,
      max_width: '500',
      max_height: '500',
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + "/ecommerce/imagefetchcategory", pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getRemoteData(url: string): Observable<any> {
    return this.http.get(url);
    //    .map(this.extractData)
    //  .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      return errMsg;
    //return Observable.throw(errMsg);
  }
  search(term: string) {
    if (term === '') {
      return of([]);
    }
    var Guestwarehouse = Common.getWithExpiry("Guestwarehouse");
    var wh = (Common.getWithExpiry("warehouse") == undefined ? Guestwarehouse : Common.getWithExpiry("warehouse"));
    var pmodel = {
      word: term,
      PageNo: 1,
      PageSize: 10,
      warehouse: wh,
      type: 0,
      customer: Common.getWithExpiry("CustID"),
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post<any>(environment.APIUrl + '/Product/GetProductListBySearchforheader', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) }).pipe(
        map(response => response.data), //since the response is wrapped in a data object
        //tap((res:any) => console.log({res}))
      );
  }
  getproductlistforsearch(pmodel:any){
    return this.http.post(environment.APIUrl + '/Product/GetProductListBySearchforheader', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetBrandList(warehouse: any, customer: any) {
    var pmodel = {
      warehouse: warehouse,
      customer: customer,
      company_sy: Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetBrandList', pmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetShipToSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetShipToSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetWantedDateSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetWantedDateSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }


  GetCancelDateSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetCancelDateSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetJobReleaseSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetJobReleaseSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetPONumberSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetPONumberSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetContactNameSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetContactNameSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetEmailAddressSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetEmailAddressSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetShipViaSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetShipViaSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetShippingAccountSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetShippingAccountSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetPayTypeSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetPayTypeSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetNotesSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetNotesSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetPhoneSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetPhoneSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetShipCompleteSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetShipCompleteSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetSortingSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetSortingSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetPagingSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetPagingSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetProductView() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetProductView", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigForItemProfileshow() {
    return this.http.get(environment.APIUrl + "/Product/GetConfigForItemProfileshow", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetPendingOrderSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetPendingOrderSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetopenshipmentSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetopenshipmentSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetHelpDesksetting() {
    return this.http.get(environment.APIUrl + "/Product/GetHelpDesksetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetBackOrderItemsSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetBackOrderItemsSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetOpenInvoiceSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetOpenInvoiceSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetOrderHistorySetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetOrderHistorySetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetPurchaseHistorySetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetPurchaseHistorySetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetContractListSetting() {
    return this.http.get(environment.APIUrl + "/Product/GetConfigForContractlist", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetWantedDateRequired() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetWantedDateRequired", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetCancelDateRequired() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetCancelDateRequired", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetJobReleaseRequired() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetJobReleaseRequired", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetPhoneRequired() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetPhoneRequired", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetShipCompleteRequired() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetShipCompleteRequired", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetPORequired() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetPORequired", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetContactRequired() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetContactRequired", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetEmailRequired() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetEmailRequired", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetPayTypeRequired() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetPayTypeRequired", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetShipViaRequired() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetShipViaRequired", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetNoteRequired() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetNoteRequired", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetCreditCardSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetCreditCardSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetFeatureTitle() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetFeatureTitle", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetProfileTitle() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetProfileTitle", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetOverviewTitle() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetOverviewTitle", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  Get3DTitle() {
    return this.http.get(environment.APIUrl + "/ecommerce/Get3DTitle", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  Get3DSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/Get3DSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  SalesLoginSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/SalesLoginSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getsecondaddressobjet() {
    return this.http.get(environment.APIUrl + "/Product/Getsecondaddressobjet", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  RegistrationSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/RegistrationSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Findmyidbyemailorphone(Email: string) {
    return this.http.get(environment.APIUrl + "/UserModule/Findmyidbyemailorphone?Email="+Email, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  GuestLoginSetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/GuestLoginSetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getalavartax() {
    return this.http.get(environment.APIUrl + "/UserModule/Getalavartax", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getchilditemlable() {
    return this.http.get(environment.APIUrl + "/UserModule/Getchilditemlable", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetavaibilitylableConfig() {
    return this.http.get(environment.APIUrl + "/product/GetavaibilitylableConfig", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getminlable() {
    return this.http.get(environment.APIUrl + "/ecommerce/Getminlable", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  Getmaxlable() {
    return this.http.get(environment.APIUrl + "/ecommerce/Getmaxlable", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  MinQtySetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/MinQtySetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  MaxQtySetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/MaxQtySetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetItemInProcessto(item: any,shipid: any,customer: any){
    var getmodel={
      shipid:shipid,
      customer:customer,
      userid:item
    }
    return this.http.post(environment.APIUrl + "/UserModule/GetItemInProcessto",getmodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetItemInProcesstolist(listofitems: any){    
    return this.http.post(environment.APIUrl + "/UserModule/GetItemInProcesstolist",listofitems, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  MultiplySetting() {
    return this.http.get(environment.APIUrl + "/ecommerce/MultiplySetting", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetConfigformsgonrfq() {
    return this.http.get(environment.APIUrl + "/ecommerce/GetConfigformsgonrfq", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getHomeBanner() {
    return this.http.get(environment.APIUrl + "/product/getbanner", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  getfooterBanner() {
    return this.http.get(environment.APIUrl + "/product/GetfooterBanner", { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  get3dmodulehtml(iname: any, pname: any, cname: any) {
    var umodel = {
      iname: iname,
      pname: pname,
      cname: cname
    }
    return this.http.post(environment.APIUrl + '/UserModule/Get3dmodulehtml', umodel, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
  GetPunchOutSessionDetail(custId: string, userId: string) {
    return this.http.get(environment.APIUrl + '/UserModule/GetPunchOutSessionDetail?custId=' + custId + '&userId=' + userId, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  GetSouthernPunchOutSessionDetail(buyerCookie: string) {
    return this.http.get(environment.APIUrl + '/UserModule/GetSouthernPunchOutSessionDetail?buyerCookie=' + buyerCookie, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

  PunchOutCheckOut(url: string, model: any) {
    return this.http.post(url, model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }

 GetPermissionConfig() {
    return this.http.get(environment.APIUrl + '/Product/GetPermissionConfig');
  }

  GetCategoryCode(itemNo: string) {
    return this.http.get(environment.APIUrl + '/Product/GetCategoryCode?item='+itemNo, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })});
  }

  GetWarehouse(customerId: string, company_cu: string, company_sy: string) {
    return this.http.get(environment.APIUrl + '/UserModule/GetWarehouse?customerId='+customerId+'&company_cu='+company_cu+'&company_sy='+company_sy, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })});
  }

  DeleteSouthernCart(customerId: string, buyerCookie: string) {
    return this.http.get(environment.APIUrl + '/UserModule/DeleteSouthernCart?userId='+customerId+'&sessionId='+buyerCookie, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })});
  }

  postSouthernOrderData(model: any) {
    return this.http.post(environment.APIUrl + '/ecommerce/PostSouthernOrderData', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) });
  }
}
