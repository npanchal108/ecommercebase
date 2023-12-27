import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';
import { Common } from '../../app/model/common.model';
import { SEOService } from '../services/seo.service';
// import { allResolved } from 'q';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-sales-login',
  templateUrl: './sales-login.component.html',
  styleUrls: ['./sales-login.component.scss']
})
export class SalesLoginComponent implements OnInit {
  user: any = {};
  hide = true;
  loginRes: any = {};
  isError: boolean = false;
  Errormsg: string;
  captcha1: string = null;
  IsLoginShow: string = '1';
  UserID: string;
  webtype: any;
  iscaptcha: any;
  isaccesswithlogin: any;
  private _routerSub = Subscription.EMPTY;
  usernamelable:string='Email';
  constructor(private renderer: Renderer2, private seoService: SEOService, private dataService: DataService, private toastr: ToastrService, private registerService: RegistrationService, private router: Router, private cartService: CartService) {
    this._routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe((value) => {
        if (this.router.url == "/sales-login") {
          this.IsLoginShow = '1';
        }
      });
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Sales Login - ' + geturl);
    this.seoService.setkeywords('Sales Login - ' + geturl);
    this.seoService.setdescription('Sales Login - ' + geturl);

    this.gototop();
    this.Getcaptchavalue();
    this.getwebsitetype();
    this.Accessannomyous();

  }
  ngOnDestroy() {
    this._routerSub.unsubscribe();
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  Accessannomyous() {
    this.isaccesswithlogin = Common.getWithExpiry("isaccesswithlogin");
    if (this.isaccesswithlogin == null || this.isaccesswithlogin == undefined || this.isaccesswithlogin == '') {
      this.dataService.GetConfidForanonymoususersbrowsethesite().subscribe((res: any) => {
        this.isaccesswithlogin = res;
        Common.setWithExpiry("isaccesswithlogin", this.isaccesswithlogin);
      });
    }
  }
  getwebsitetype() {
    this.webtype = this.dataService.Getconfigbykey("websitetype");
    if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
      this.webtype = Common.getWithExpiry("websitetype");
    }
    if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
      this.dataService.GetWebsiteType().subscribe((data: any) => {
        this.webtype = data;
        Common.setWithExpiry("websitetype", this.webtype);
        if (this.webtype != '6') {

          this.toastr.error("You are not authorize to access sales account", 'Message!');
          this.router.navigate(['/login']);
        }
        else if (Common.getWithExpiry("SalesUserID") != undefined && Common.getWithExpiry("SalesUserID") != null) {
    
          this.router.navigate(['/dashboard']);
        }
      })
    }
    else{
      if (this.webtype != '6') {
        this.toastr.error("You are not authorize to access sales account", 'Message!');
        this.router.navigate(['/login']);
      }
      else if (Common.getWithExpiry("SalesUserID") != undefined && Common.getWithExpiry("SalesUserID") != null) {  
        this.router.navigate(['/dashboard']);
      }
    }
  }
  Getcaptchavalue() {
    this.iscaptcha = Common.getWithExpiry("iscaptcha");
    if (this.iscaptcha == null || this.iscaptcha == undefined) {
      this.dataService.GetConfidForcaptcha().subscribe((data: any) => {
        this.iscaptcha = data;
        Common.setWithExpiry("iscaptcha", this.iscaptcha);
      })
    }
  }

  ngOnInit() {

  }

  resolved(captchaResponse: string) {
    this.captcha1 = captchaResponse;
    if (this.captcha1 != null) {
      this.isError = false;
    }
  }
  Gotologin() {
    if (this.IsLoginShow == '1') {
      this.IsLoginShow = '2';
    }
    else {
      this.IsLoginShow = '1';
    }
  }

  MailPassword() {
    if (this.UserID != undefined && this.UserID != null && this.UserID != '') {
      this.registerService.ForgotPasswordForSalesman(this.UserID).subscribe((res: any) => {
        this.toastr.success(res.json(), 'Success!');
      });
    }
    else {
      this.toastr.error("Please insert Username or Email", 'Error!');
      const element = this.renderer.selectRootElement("#userid1");
      element.focus();
    }
  }
  onSubmit() {

    if (this.user.Username == undefined || this.user.Username == null || this.user.Username == '') {
      this.Errormsg = 'Please insert username';
      this.isError = true;
      const element = this.renderer.selectRootElement("#username");
      element.focus();
      return;
    }
    if (this.user.Password == undefined || this.user.Password == null || this.user.Password == '') {
      this.Errormsg = 'Please insert Password';
      this.isError = true;
      const element = this.renderer.selectRootElement("#password");
      element.focus();
      return;
    }

    if (this.captcha1 == null && this.iscaptcha == '1') {
      this.Errormsg = 'Please Click on Captcha CheckBox';
      this.isError = true;
      return;

    }
    // else{
    //this.user.Password = Md5.hashStr(this.user.Password)
    var model = {
      "Username": this.user.Username,
      "Password": this.registerService.logMd5(this.user.Password),
      "LoginType": false
    }


    this.registerService.Login(model).subscribe((res: any) => {
      this.loginRes = res;
      if (this.loginRes.Message == "Login successful") {
        //     window.location.reload();
        Common.setWithExpiry("SalesUserID", this.loginRes.UserID);
        Common.setWithExpiry("SalesUserType", this.loginRes.RedirectUrl);
        Common.setWithExpiry("Name", this.loginRes.PrivateChannel);
        Common.setWithExpiry("subuser", this.loginRes.TokenExpiryMinutes);
        Common.setWithExpiry("Permission", this.loginRes.ValidateTokenExpiretime);
        Common.setWithExpiry("ProfileLog", "sales");
        this.cartService.cartBroadCasterLogin(Common.getWithExpiry("CustID"), Common.getWithExpiry("UserID"));
        this.router.navigate(['/dashboard']);
      }
      else {
        this.Errormsg = 'Invalid UserName Or Password';
        this.isError = true;
      }
    })
    // }
  }
}
