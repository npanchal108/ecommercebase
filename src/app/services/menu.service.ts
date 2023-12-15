import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Common } from '../model/common.model';
import { environment } from '../../environments/environment.development';


@Injectable()
export class MenuService {

  constructor(private http: HttpClient) {
  }

  getMenu(warehouse:any,treenode:any,customer: any) {    
    var umodel={
      warehouse:warehouse,
      treenode:treenode,
      company_sy:Common.getWithExpiry("company_sy"),
      customer:customer
    }
    return this.http.post(environment.APIUrl + '/Product/GetMenuListToDisplay',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  getMenunewtheme(warehouse: any,treenode: any) {
    var umodel ={
      warehouse:warehouse,
      treenode:treenode,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/GetMenuListToDisplayforNewtheme',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  Getheaderlinkslist() {
    return this.http.get(environment.APIUrl + '/Product/Getheaderlinkslist', { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getsafilters(maj_class: any,prodline: any,treenode: any,satagsdetails: string,words: any,warehouse: any,customer: any,Company_sy: any){
    var models={
      maj_class:maj_class,
      prodline:prodline,
      treenode:treenode,
      satagsdetails:satagsdetails,
      words:words,
      warehouse:warehouse,
      customer:customer,
      Company_sy:Company_sy,
    }
    return this.http.post(environment.APIUrl + '/Product/GetSaLableFilters',models, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getMenuNew(warehouse: any,treenode: string,customer: any) {   
    var umodel={
      warehouse:warehouse,
      treenode:treenode,
      company_sy:Common.getWithExpiry("company_sy"),
      customer:customer//Common.getWithExpiry("CustID")
    } 
    return this.http.post(environment.APIUrl + '/Product/GetMenuListToDisplayNew',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  Getcategoriespath(param: any,stype: any){
    var umodel={
      param:param,
      stype:stype,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/Product/Getcategoriespath',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  hasChildMenu(treeNode: any,warehouse: any) {  
      var mmodel={
        treenode:treeNode,
        warehouse:warehouse,
        company_sy:Common.getWithExpiry("company_sy")
      }
    return this.http.post(environment.APIUrl + '/Product/HasChildMenu',mmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  getBrandListWithMenu(majclass: any,warehouse: any,customer: any) { 
    var ymodel={
      majclass:majclass,
      warehouse:warehouse,
      company_sy:Common.getWithExpiry("company_sy"),
      customer:customer//Common.getWithExpiry("CustID")
    }   
    return this.http.post(environment.APIUrl + '/Product/GetBrandListWithItemCount',ymodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
}
