import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

import { Common } from '../model/common.model';

@Injectable()
export class ContactService {

  

  constructor(private http: HttpClient) {
  
  }

  getContact(company:any) {    
    return this.http.get(environment.APIUrl + '/ecommerce/GetSysCompanyDetails?company='+company, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  getContactSecondaryDetails() {    
    return this.http.get(environment.APIUrl + '/UserModule/getcontactusSecondDetails', { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  postInquiry(model: any) {
    return this.http.post(environment.APIUrl + '/ecommerce/ContactUs', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }



}

