import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Common } from '../model/common.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class DemoService {

  
  constructor(private http: HttpClient) {
  }

  getProductImage(item) {
    var umodel={
      item:item
    }
    return this.http.post(environment.APIUrl + '/ecommerce/GetImage',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }


  downloadPDF(item) {
    const httpOptions = {
      'responseType'  : 'arraybuffer' as 'json'
      //'responseType': 'blob' as 'json'        //This also worked
    };
    var umodel={
      item:item
    }
    return this.http.post(environment.APIUrl + '/Product/DownloadPDF',umodel, httpOptions);
  }
  
  

}
