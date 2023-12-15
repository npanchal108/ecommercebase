import { Injectable } from '@angular/core';
import { Common } from '../model/common.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import * as CryptoJS from 'crypto-js';


@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient) {
   }

   encrypted(keys: any, value: { toString: () => any; }){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  logMd5(blob:any) {
    const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(blob));
    const md5 = hash.toString(CryptoJS.enc.Hex)
   return md5;
  }

  decrypted(keys: any, value: any){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
    //return decrypted;
  }

  Register(registerModel: any) {
    return this.http.post(environment.APIUrl + '/UserModule/InsertNewUser', registerModel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  kraydenRegister(registerModel: any) {
    return this.http.post(environment.APIUrl + '/UserModule/kraydenInsertNewUser', registerModel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  checkemailinseon(email: string){
    return this.http.get(environment.APIUrl + '/UserModule/checkseonapiforemail?email='+email, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  CheckEmail(email: any){
    var model={
      email:email,
      company:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/CheckEmailForCustomer', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  checkemailforkraydenlogin(email: any){
    var model={
      email:email,
      company:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/checkemailforkraydenlogin', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  CheckEmailkrayden(email: any,customer: any){
    var model={
      email:email,
      customer:customer,
      company:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/CheckEmailForCustomer', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  CHangePassword(type: any, UserName: any, Password: any,custId: any) {    
    var rmodel={
      type:type,
      UserName:UserName,
      Password:Password,
      custId:custId,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/ChangePassword',rmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  BusinesstoBusinessRegistration(rmodel: any){
    return this.http.post(environment.APIUrl + '/UserModule/BusinesstoBusinessRegistration',rmodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getCountry() {
    return this.http.get(environment.APIUrl + '/UserModule/GetAllCountries', { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getRegistrationControls() {
    return this.http.get(environment.APIUrl + '/UserModule/Getregistercontrold', { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }


  getState(countryId: any) {
    var umodel={
      Country:countryId
    }  
      return this.http.post(environment.APIUrl + '/UserModule/GetAllStates',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getCity(stateId: any) {
    var smodel={
      stetes:stateId
    }
    return this.http.post(environment.APIUrl + '/UserModule/GetAllCities',smodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  Login(loginModel: { custID?: any; Username?: any; Password?: any; LoginType?: boolean; company_cu?: any; company_sy?: any; }) {
    loginModel.company_sy=Common.getWithExpiry("company_sy");
    return this.http.post(environment.APIUrl + '/UserModule/Login', loginModel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  Loginship(loginModel: { custID?: any; Username?: any; Password?: any; LoginType?: boolean; company_cu?: any; company_sy?: any; }) {
    loginModel.company_sy=Common.getWithExpiry("company_sy");
    return this.http.post(environment.APIUrl + '/UserModule/LoginToship', loginModel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  LoginNew(loginModel: { custID?: any; Username?: any; Password?: any; LoginType?: boolean; company_cu?: any; company_sy?: any; }) {
    loginModel.company_sy=Common.getWithExpiry("company_sy");
    return this.http.post(environment.APIUrl + '/UserModule/LoginNew', loginModel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  GuestLogin() {
    var company_sy=Common.getWithExpiry("company_sy");
    return this.http.get(environment.APIUrl + '/UserModule/GuestLogin?company_sy='+company_sy, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  GetCuUserList(CustID: any,pageno: any) {
    var umodel={
      customer:CustID,
      pageno:pageno,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/GetCuUserList',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  getsalesmansubuserslist(salesman: string) {
    
    return this.http.get(environment.APIUrl + '/UserModule/Getsubusersbysalesman?salesman='+salesman, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  ForgotPasswordForCustomerCuUser(customer: string,UserID: string | undefined) {
    var umodel={
      customer:customer,
      userId:UserID,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/ForgotPasswordForCustomerCuUser',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  ForgotPasswordForSalesman(UserID: any) {
    var umodel={
      userId:UserID,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/ForgotPasswordForSalesman',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  GetContactsForProfile(customer: any) {
    var umodel={
      customer:customer,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/ecommerce/GetContactsForProfile',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  GetProfileDetails(customer: any) {
    var umodel={
      customer:customer,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/GetProfileDetails',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  GetconfigurationforshowprovinceinRegistration() {
    return this.http.get(environment.APIUrl + '/Product/GetconfigurationforshowprovinceinRegistration', { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  getAllPermission() {
    return this.http.get(environment.APIUrl + '/UserModule/GetAllPermission', { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  getAllAddress(custId: any) {
    var umodel={
      custId:custId,
      company_sy:Common.getWithExpiry("company_sy")
    }
    return this.http.post(environment.APIUrl + '/UserModule/GetShippingAddress',umodel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  insertCuUser(model: any) {    
    return this.http.post(environment.APIUrl + '/UserModule/InsertNewcuUser', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  insertsalesmansubusers(model: any) {    
    return this.http.post(environment.APIUrl + '/UserModule/insertnewsalesmansubuser', model, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  getBusinessTypes() {
    return this.http.get(environment.APIUrl + '/UserModule/GetAllBusinesstypes', { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  getCustomerMethod() {
    return this.http.get(environment.APIUrl + '/UserModule/GetAllCustomerMethods', { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }
  getAllOrdereMethod() {
    return this.http.get(environment.APIUrl + '/UserModule/GetAllOrderMethods', { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  insertnewcustomerapplication(NewCustomerViewModel:any){
    NewCustomerViewModel.company_sy=Common.getWithExpiry("company_sy");
    NewCustomerViewModel.company_cu=Common.getWithExpiry("company_cu");
    return this.http.post(environment.APIUrl + '/UserModule/MIInsertNewUser', NewCustomerViewModel, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8' })});
  }

  GetProfileLabel(){
    return this.http.get(environment.APIUrl + '/UserModule/GetEcommerceProfileLabel');
  }

}
