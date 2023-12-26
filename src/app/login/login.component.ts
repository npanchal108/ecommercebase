import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { RegistrationService } from '../services/registration.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CartService } from '../services/cart.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha';
import { DataService } from '../services/data.service';
import { Common } from '../model/common.model';
import { ContactService } from '../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { SEOService } from '../services/seo.service';
import { delay, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';


import { LoadingService } from '../services/loading.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { environment } from '../../environments/environment.development';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isaccesswithlogin: any;
  hide = true;
  user: any = {};
  loginRes: any = {};
  isError: boolean = false;
  returnUrl: string | undefined;
  captcha1: string | undefined;
  Errormsg: string | undefined;
  GuestLogin: any = {};
  webtype: any;
  IsLoginShow: string = '1';
  CustomerID: string | undefined;
  UserID: string | undefined;
  ismulti: any;
  isGuestLogin: boolean = false;
  label1: any;
  label2: any;
  iscaptcha: any;
  loginlable: any;
  loginmsg: any;
  lableforcustomerinforgotpassword: any;
  lableforcuUserinforgotpassword: any;
  IsMultiCompanySetting: any;
  AllCompaniesList: any;
  company: any = 0;
  selectedcompany: any;
  Secondcontact: any;
  isShowRegistration: boolean = false;
  afterloginurl: any;
  forgotpwdmsg: any;
  //ipAddress: string;
  businesstype: any;
  Allconfigurationlist: any = [];
  isfindmyid: any;
  EmailAddress: any;
  showemailid: any = '0';
  emailmsg: any;
  logintype: any = '1';
  PunchOutType: any;
  NewPermission: any;
  iskrayden:any;
  private _routerSub = Subscription.EMPTY;
  Emailcheckflag=false;
  emailapiflag=false;
  emailapimsg:any='';
  constructor(private renderer: Renderer2,private gtmService: GoogleTagManagerService,private toastr: ToastrService,private loadingService: LoadingService, private seoService: SEOService, private contactService: ContactService, private registerService: RegistrationService,  private dataService: DataService, private router: Router, private cartService: CartService, private route: ActivatedRoute) {
    this.EmailAddress = '';
    this.GetLoginPageConfigurations();
    this.iskrayden=environment.iskyraden;
    var custID = this.route.snapshot.paramMap.get('customerId');
    var userID = this.route.snapshot.paramMap.get('userId');
    var password = this.route.snapshot.paramMap.get('password');
    if (custID != null && custID != '' && custID != undefined && password != null && password != '' && password != undefined) {
      if(this.iskrayden){
      this.forkraydenlogin();
      }else{
        this.onlinklogin();
      }
    }
    else {
      try {
        this._routerSub = this.router.events.pipe(
          filter(event => event instanceof NavigationEnd))
          .subscribe((value) => {
            if (this.router.url == "/login") {
              this.IsLoginShow = '1';
            }
          });

        this.company = (Common.getWithExpiry("company_sy") == null ? 0 : Common.getWithExpiry("company_sy"));
        this.getcontactusSecondDetails();
        this.gototop();
      } catch (ex) {
      }
    }
  }
  Gotologinnew() {
    this.IsLoginShow = '1';
    
    this.EmailAddress = '';
    this.emailmsg = '';
    this.Errormsg=''
  }

  findmyidshow() {
    this.showemailid = '1';
    this.IsLoginShow = '3';
  }
  findmyid() {
    if (this.EmailAddress != undefined && this.EmailAddress != null && this.EmailAddress != '') {
      this.dataService.Findmyidbyemailorphone(this.EmailAddress).subscribe((res: any) => {
        this.emailmsg = res;
      });
    }
    else {
      this.toastr.error("Please Enter Email");
    }
  }

  getcontactusSecondDetails() {
    try {
      if (Common.getWithExpiry("Secondcontact") != undefined) {
        var Secondcontact = JSON.parse(Common.getWithExpiry("Secondcontact"));
      }
    } catch (ed) { }
    if (Secondcontact == null || Secondcontact == undefined || Secondcontact.length == 0) {
      this.contactService.getContactSecondaryDetails().subscribe((res: any) => {
        this.Secondcontact = res;
        this.getContactDtl();
        Common.setWithExpiry("Secondcontact", JSON.stringify(this.Secondcontact));
      });
    }
    else {
      this.Secondcontact = Secondcontact;
      this.getContactDtl();
    }
  }
  ngOnDestroy() {
    this._routerSub.unsubscribe();
  }



  
  googletagforcheckout(){
    try{

      const gtmTag = {
        event: 'login',
        user_id: Common.getWithExpiry("CustID")
                };
              console.log('gtmTag',gtmTag);
                this.gtmService.pushTag(gtmTag);
      
    }catch(e:any){
      console.log('googletagforcheckout',e.toString());
    }
  }

  getContactDtl() {
    try {
      if (Common.getWithExpiry("contactDtl") != undefined) {
        var contactDtl = JSON.parse(Common.getWithExpiry("contactDtl"));
      }
    } catch (ed) { }
    if (contactDtl == null || contactDtl == undefined || contactDtl == '') {
      this.contactService.getContact(Common.getWithExpiry("company_sy")).subscribe((res: any) => {
        contactDtl = res;
        Common.setWithExpiry("contactDtl", contactDtl);
        if (this.Secondcontact.cName == undefined || this.Secondcontact.cName == null || this.Secondcontact.cName == '') {
          Common.setWithExpiry("cpname", contactDtl.name);
        }
        else {
          Common.setWithExpiry("cpname", this.Secondcontact.cName);
        }
        Common.setWithExpiry("company_cu", contactDtl.company_cu);
        Common.setWithExpiry("company_it", contactDtl.company_it);
        Common.setWithExpiry("company_sy", contactDtl.company_sy);
        var geturl = Common.getWithExpiry("cpname");
        this.seoService.setPageTitle('Login / Sign In - ' + geturl);
        this.seoService.setkeywords('Login / Sign In - ' + geturl);
        this.seoService.setdescription('Login / Sign In - ' + geturl);

      })
    }
    else {

      if (this.Secondcontact.cName == undefined || this.Secondcontact.cName == null || this.Secondcontact.cName == '') {
        Common.setWithExpiry("cpname", contactDtl.name);
      }
      else {
        Common.setWithExpiry("cpname", this.Secondcontact.cName);
      }
      var geturl = Common.getWithExpiry("cpname");
      this.seoService.setPageTitle('Login / Sign In - ' + geturl);
      this.seoService.setkeywords('Login / Sign In - ' + geturl);
      this.seoService.setdescription('Login / Sign In - ' + geturl);

    }
  }
  companychange(company: any) {
    if (company != undefined && company != null && company != '0') {
      this.dataService.GetSysCompanyDetails(company).subscribe((data: any) => {
        this.selectedcompany = data;
        try{
        localStorage.clear();
      }catch(ed){}
        if (this.selectedcompany != undefined && this.selectedcompany != null) {
          Common.setWithExpiry("company_cu", this.selectedcompany.company_cu);
          Common.setWithExpiry("company_it", this.selectedcompany.company_it);
          Common.setWithExpiry("company_sy", this.selectedcompany.company_sy);
        }
        try{
        window.location.reload();
        }catch(ed){}
      })
    }
    else {
      this.toastr.warning("Please select Company");
    }
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  GetLoginPageConfigurations() {

    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      try {
        this.Allconfigurationlist = JSON.parse(Common.getWithExpiry("Allconfigs"));
      } catch (ed) { }
    }
    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      this.sendMessage('start');
      this.dataService.GetAllConfiguration().subscribe((data: any) => {
        this.sendMessage('stop');
        this.Allconfigurationlist = data;
        Common.setWithExpiry("Allconfigs", JSON.stringify(this.Allconfigurationlist));
        for (var i = 0; i < this.Allconfigurationlist.length; i++) {
          // if (this.Allconfigurationlist[i].ConfigKey == "afterloginurl") {
          //   this.afterloginurl = this.Allconfigurationlist[i].ConfigValue;
          // }
          if (this.Allconfigurationlist[i].ConfigKey == "MemberReference") {
            this.PunchOutType = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "forgotpwdmsg") {
            this.forgotpwdmsg = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "findmyid") {
            this.isfindmyid = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "captcha") {
            this.iscaptcha = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "multiuser") {
            this.ismulti = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "loginlabel1") {
            this.label1 = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "loginmsglable") {
            this.loginlable = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "IsMultiCompany") {
            this.IsMultiCompanySetting = this.Allconfigurationlist[i].ConfigValue;
            if (this.IsMultiCompanySetting == '1') {
              this.GetAllCompaniesList();
            }
          }
          if (this.Allconfigurationlist[i].ConfigKey == "loginmsg") {
            this.loginmsg = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "lableforcustomerinforgotpassword") {
            this.lableforcustomerinforgotpassword = this.Allconfigurationlist[i].ConfigValue;
          }

          if (this.Allconfigurationlist[i].ConfigKey == "logintype") {
            this.logintype = this.Allconfigurationlist[i].ConfigValue;
            //this.logintype ='3';
          }
          if (this.Allconfigurationlist[i].ConfigKey == "lableforcuUserinforgotpassword") {
            this.lableforcuUserinforgotpassword = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "withoutloginBrowse") {
            this.isaccesswithlogin = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "Registration") {
            this.isShowRegistration = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
          }
          if (this.Allconfigurationlist[i].ConfigKey == "GuestLogin") {
            this.isGuestLogin = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
          }
          if (this.Allconfigurationlist[i].ConfigKey == "websitetype") {
            this.webtype = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "loginlabel2") {
            this.label2 = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "businesstype") {
            this.businesstype = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "afterloginurl") {
            this.afterloginurl = this.Allconfigurationlist[i].ConfigValue;
          }
          if (this.Allconfigurationlist[i].ConfigKey == "NewPermission") {
            this.NewPermission = this.Allconfigurationlist[i].ConfigValue;
          }
        }
      })
      //this.iscaptcha='0';
    }
    else {
      for (var i = 0; i < this.Allconfigurationlist.length; i++) {
        // if (this.Allconfigurationlist[i].ConfigKey == "afterloginurl") {
        //   this.afterloginurl = this.Allconfigurationlist[i].ConfigValue;
        // }
        if (this.Allconfigurationlist[i].ConfigKey == "MemberReference") {
          this.PunchOutType = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "forgotpwdmsg") {
          this.forgotpwdmsg = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "logintype") {
          this.logintype = this.Allconfigurationlist[i].ConfigValue;
          //this.logintype ='3';
        }
        if (this.Allconfigurationlist[i].ConfigKey == "findmyid") {
          this.isfindmyid = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "captcha") {
          this.iscaptcha = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "multiuser") {
          this.ismulti = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "loginlabel1") {
          this.label1 = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "loginmsglable") {
          this.loginlable = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "IsMultiCompany") {
          this.IsMultiCompanySetting = this.Allconfigurationlist[i].ConfigValue;
          if (this.IsMultiCompanySetting == '1') {
            this.GetAllCompaniesList();
          }
        }
        if (this.Allconfigurationlist[i].ConfigKey == "loginmsg") {
          this.loginmsg = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "lableforcustomerinforgotpassword") {
          this.lableforcustomerinforgotpassword = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "lableforcuUserinforgotpassword") {
          this.lableforcuUserinforgotpassword = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "withoutloginBrowse") {
          this.isaccesswithlogin = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "Registration") {
          this.isShowRegistration = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
        }
        if (this.Allconfigurationlist[i].ConfigKey == "GuestLogin") {
          this.isGuestLogin = (this.Allconfigurationlist[i].ConfigValue == '1' ? true : false);
        }
        if (this.Allconfigurationlist[i].ConfigKey == "websitetype") {
          this.webtype = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "loginlabel2") {
          this.label2 = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "businesstype") {
          this.businesstype = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "afterloginurl") {
          this.afterloginurl = this.Allconfigurationlist[i].ConfigValue;
        }
        if (this.Allconfigurationlist[i].ConfigKey == "NewPermission") {
          this.NewPermission = this.Allconfigurationlist[i].ConfigValue;
        }
      }
      //this.iscaptcha='0';
    }
  }

  GetAllCompaniesList() {
    try {
      if (Common.getWithExpiry("AllCompaniesList") != undefined) {
        var AllCompaniesList = JSON.parse(Common.getWithExpiry("AllCompaniesList"));
      }
    } catch (ed) { }
    if (AllCompaniesList == null || AllCompaniesList == undefined || AllCompaniesList.length == 0) {
      this.dataService.GetAllCompaniesList().subscribe((data: any) => {
        this.AllCompaniesList = data;
        Common.setWithExpiry("AllCompaniesList", JSON.stringify(this.AllCompaniesList));
      })
    }
    else {
      this.AllCompaniesList = AllCompaniesList;
    }

  }

  ngOnInit() {
    if (Common.getWithExpiry("CustID") != undefined || Common.getWithExpiry("SalesUserID") != undefined) {
      if (this.afterloginurl == undefined) {
        this.router.navigate(['/dashboard']);
      }
      else {
        this.router.navigateByUrl(this.afterloginurl);
      }

    }
  }
  resolved(captchaResponse: any) {
    this.captcha1 = captchaResponse;
    if (this.captcha1 != null && this.iscaptcha == '1') {
      this.isError = false;
    }
  }


  Gotologin() {
    if (this.IsLoginShow == '1') {
      this.IsLoginShow = '2';
      this.EmailAddress = '';
      if(this.user.CustomerId!=undefined && this.user.CustomerId!=null && this.user.CustomerId!=''){
        this.CustomerID=this.user.CustomerId;
      }
    this.emailmsg = '';
    this.Errormsg=''
    this.isError=false;
    }
    else {
      this.IsLoginShow = '1';
      this.user.CustomerId=this.CustomerID;
      this.EmailAddress = '';
    this.emailmsg = '';
    this.Errormsg=''
    this.isError=false;
    }
  }

  MailPassword() {
    if (this.CustomerID == '' || this.CustomerID == null || this.CustomerID == undefined) {
      this.toastr.error('Please insert customer id');
      const element = this.renderer.selectRootElement("#CustomerId");
      element.focus();
    }
    else if (this.captcha1 == null && this.iscaptcha == '1') {
      this.toastr.error('Please Click on Captcha CheckBox');
    }
    else {
      this.sendMessage('start');
      this.registerService.ForgotPasswordForCustomerCuUser(this.CustomerID, this.UserID).subscribe((res: any) => {
        this.sendMessage('stop');
        this.toastr.info(res);
      });
    }
  }

  checkemail(CustomerId: any) {
    if (this.iskrayden && CustomerId != undefined && CustomerId != '' && CustomerId.length > 0) {
      this.sendMessage('start');
      this.registerService.checkemailforkraydenlogin(CustomerId).subscribe((res: any) => {
        var getmsg = res;
        this.sendMessage('stop');
        
        if(getmsg!=undefined && getmsg!=null && getmsg.length>0){
          this.emailapiflag=true;
        for (var i = 0; i < getmsg.length; i++) {
          if(getmsg[i].customer_is_deleted==false && getmsg[i].customer_Active==true && getmsg[i].customer_stat==true && getmsg[i].sy_contact_profile_log[0]==true){
               this.Emailcheckflag=true;
          }
          }

          if(this.Emailcheckflag==false){
            if(getmsg[0].sy_contact_profile_log[0]==false){
              this.toastr.error('Contact User Account Inactive! Please contact the Customer Account Specialists at 1-800-448-0406 option 4.')
              this.Errormsg = 'Contact User Account Inactive! Please contact the Customer Account Specialists at 1-800-448-0406 option 4.';
              this.emailapimsg='Contact User Account Inactive! Please contact the Customer Account Specialists at 1-800-448-0406 option 4.';
              this.isError=true;
            }
            else{
              this.toastr.error('Customer Account Inactive!  Please contact the Customer Account Specialists at 1-800-448-0406 option 4')
              this.Errormsg = 'Customer Account Inactive!  Please contact the Customer Account Specialists at 1-800-448-0406 option 4';
              this.emailapimsg= 'Customer Account Inactive!  Please contact the Customer Account Specialists at 1-800-448-0406 option 4';
              this.isError=true;
            }
          }
        }
        else{
          this.toastr.error("Email is not registered, please register your account.");
          this.Errormsg = 'Email is not registered, please register your account.';
          this.emailapimsg= 'Email is not registered, please register your account.';
          this.isError=true;
        }

        // if (getmsg != true) {
        //   console.log('getmsg',getmsg);
        //   if(getmsg[0].key1!=undefined && getmsg[0].key1!=null && getmsg[0].key1!=''){
        //     //var profile= JSON.parse(getmsg[0].profile_log);
        //     //console.log('profile[0]',profile[0]);
        //     if(getmsg[0].profile_log[0]=="true" || getmsg[0].profile_log[0]==true){
              
              
        //     }
        //     else{
              
        //       this.toastr.error('User Account Inactive! Please contact the Customer Account Specialists at 1-800-448-0406 option 4.')
              
        //     }
        //   }
        //   else{
        //     if(getmsg[0].active=='true' || getmsg[0].active==true){
              
        //     }
        //     else{
              
        //       this.toastr.error('Customer Account Inactive!  Please contact the Customer Account Specialists at 1-800-448-0406 option 4')
              
        //     }
        //   }

        //   //this.toastr.error("This user Already Registered with customer ID "+getmsg);
          
        // }
        // else{
        //   this.toastr.error("Email is not register, please register your account.");
        // }
        
      });
    }
  }


  Onguestlogin() {
    this.registerService.GuestLogin().subscribe((res: any) => {
      this.GuestLogin = res;
      Common.setWithExpiry("warehouse", this.GuestLogin.warehouse);
      Common.setWithExpiry("UserID", this.GuestLogin.CustID);
      Common.setWithExpiry("CustID", this.GuestLogin.CustID);
      Common.setWithExpiry("UserType", this.GuestLogin.UserType);
      Common.setWithExpiry("Permission", this.GuestLogin.Permission);
      Common.setWithExpiry("Name", "Guest");
      this.cartService.customerBroadCaster(this.GuestLogin.CustID);
      this.cartService.cartBroadCasterLogin(Common.getWithExpiry("CustID"), Common.getWithExpiry("UserID"));
      this.router.navigateByUrl(this.afterloginurl);

    });
  }


forkraydenlogin(){
  this.route.params.subscribe(params => {
    var custID = this.route.snapshot.paramMap.get('customerId');
    var userID = this.route.snapshot.paramMap.get('userId');
    var password = this.route.snapshot.paramMap.get('password');

    if (custID != undefined && custID != null && custID != '' && password != undefined && password != null && password != '') {
      this.user.CustomerId=custID;
      this.user.Password=password;
      var model = {
        "custID": this.user.CustomerId,
        "Username": this.user.Username,
        "Password": this.registerService.logMd5(this.user.Password),
        "LoginType": true,
        "company_cu": Common.getWithExpiry("company_cu").toString()
      }
      this.sendMessage('start');
      this.registerService.LoginNew(model).subscribe((res: any) => {
        //this.sendMessage('stop');
        this.loginRes = res;
        if (this.loginRes.Status == "Success") {

          this.cartService.customerBroadCaster(this.loginRes.ValidateTokenExpiretime);
          
          Common.setWithExpiry("warehouse", this.loginRes.UserFullName);
          Common.setWithExpiry("UserID", this.loginRes.UserID);
          Common.setWithExpiry("CustID", this.loginRes.AuthenticationToken);
          Common.setWithExpiry("UserType", this.loginRes.RedirectUrl);
          Common.setWithExpiry("Permission", this.loginRes.TokenExpiryMinutes);
          Common.setWithExpiry("IsManager", this.loginRes.IsManager);
          Common.setWithExpiry("Name", this.loginRes.ValidateTokenExpiretime);
          Common.setWithExpiry("ProfileLog", this.loginRes.PrivateChannel);
          Common.setWithExpiry("useremail", this.loginRes.CompanyID);
          Common.setWithExpiry("customerp", '1');
          this.cartService.cartBroadCasterLogin(this.loginRes.AuthenticationToken, this.loginRes.UserID);          
          this.googletagforcheckout();
          if (this.loginRes.RedirectUrl == '3' && this.NewPermission == '1') {
            var getper = JSON.parse(this.loginRes.PrivateChannel);
            if (getper[5] == false && getper[6] == false) {
              this.toastr.info("Please conatct administrator for your permission");
              this.sendMessage('stop');
              this.router.navigate(['login']);
              return;
            }
          }

          
          //this.cartService.updateCartForSession();
          let returnUrl:any = this.route.snapshot.queryParamMap.get('returnUrl');
          var geturl = Common.getWithExpiry("url");
          var carturl = Common.getWithExpiry("carturl");
          if (returnUrl != undefined && returnUrl != null && returnUrl != '') {
            
            //this.sendMessage('start');
            setTimeout( () => {
              this.sendMessage('stop');
              this.router.navigateByUrl(returnUrl.toLowerCase());
            }, 2000 );
            //location.reload();
          }
          else if(carturl!=undefined && carturl!=null && carturl!=''){

            //this.sendMessage('start');
            setTimeout( () => {
              this.sendMessage('stop');
              this.router.navigateByUrl(carturl.toLowerCase());
            }, 2000 );

            
          }
          else if (geturl != undefined && geturl != null && geturl != '') {
            Common.removeWithExpiry("url");
            this.sendMessage('stop');
            this.router.navigate(['/productdetail/' + geturl]);
          }
          else {
            this.sendMessage('stop');
            this.router.navigateByUrl(this.afterloginurl);
          }
          
        }
        else {
          this.sendMessage('stop');
          if(this.iskrayden){
            this.Errormsg = 'Invalid Password! Please try again or reset it using "Forgot Your Password?"';
            this.toastr.error('Invalid Password! Please try again or reset it using "Forgot Your Password?"');
          }
          else{
          this.Errormsg = 'Invalid UserName Or Password';
          }
          this.isError = true;
        }
      })
    }
  })
}


  onlinklogin() {


    this.route.params.subscribe(params => {
      var custID = this.route.snapshot.paramMap.get('customerId');
      var userID = this.route.snapshot.paramMap.get('userId');
      var password = this.route.snapshot.paramMap.get('password');

      if (custID != undefined && custID != null && custID != '' && password != undefined && password != null && password != '') {

        if (Common.getWithExpiry("company_sy") == undefined) {
          this.contactService.getContact(Common.getWithExpiry("company_sy")).subscribe((res: any) => {
            var contactDtl = res;
            var model = {
              "custID": custID,
              "Username": userID == "none" ? "" : userID,
              "Password": password,
              "LoginType": true,
              "company_cu": contactDtl.company_cu
            }
            this.sendMessage('start');
            this.registerService.Login(model).subscribe((res: any) => {
              this.sendMessage('stop');
              this.loginRes = res;
              if (this.loginRes.Status == "Success") {
                Common.setWithExpiry("warehouse", this.loginRes.UserFullName);
                Common.setWithExpiry("UserID", this.loginRes.UserID);
                Common.setWithExpiry("CustID", this.loginRes.AuthenticationToken);
                Common.setWithExpiry("UserType", this.loginRes.RedirectUrl);
                Common.setWithExpiry("Permission", this.loginRes.TokenExpiryMinutes);
                Common.setWithExpiry("IsManager", this.loginRes.IsManager);
                Common.setWithExpiry("Name", this.loginRes.ValidateTokenExpiretime);
                Common.setWithExpiry("ProfileLog", this.loginRes.PrivateChannel);
                Common.setWithExpiry("IsPunchOut", "Yes");

                //Common.setWithExpiry("PunchOutCustID", custID);
                //Common.setWithExpiry("PunchOutUserID", userID == "none" ? "" : userID);
                let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                var geturl = Common.getWithExpiry("url");
                if (returnUrl != undefined && returnUrl != null && returnUrl != '') {

                  this.router.navigateByUrl(returnUrl.toLowerCase());
                }
                else if (geturl != undefined && geturl != null && geturl != '') {
                  Common.removeWithExpiry("url");
                  this.router.navigate(['/productdetail/' + geturl.toLowerCase()]);
                }
                else if (this.webtype == '1') {
                  this.router.navigate(['/order-management/pending-order']);
                }
                else if (this.route.snapshot.paramMap.get('type') == 'rfq') {
                  Common.setWithExpiry("PunchOutType", this.PunchOutType);
                  this.router.navigate(['/southerquote']);
                }
                else {
                  Common.setWithExpiry("PunchOutType", this.PunchOutType);
                  this.router.navigateByUrl(this.afterloginurl);
                }
                this.cartService.customerBroadCaster(this.loginRes.ValidateTokenExpiretime);
                this.cartService.cartBroadCasterLogin(Common.getWithExpiry("CustID"), Common.getWithExpiry("UserID"));
              }
              else {
                if(this.iskrayden){
                  this.Errormsg = 'Invalid Password! Please try again or Please use forgot password to reset it.';
                  this.toastr.error("Invalid Password! Please try again or Please use forgot password to reset it.");
                }
                else{
                this.Errormsg = 'Invalid UserName Or Password';
                }
                this.isError = true;
              }
            })
          });
        }
        else {
          var model = {
            "custID": custID,
            "Username": userID == "none" ? "" : userID,
            "Password": password,
            "LoginType": true,
            "company_cu": Common.getWithExpiry("company_cu").toString()
          }
          this.sendMessage('start');
          this.registerService.Login(model).subscribe((res: any) => {
            this.sendMessage('stop');
            this.loginRes = res;
            if (this.loginRes.Status == "Success") {
              Common.setWithExpiry("warehouse", this.loginRes.UserFullName);
              Common.setWithExpiry("UserID", this.loginRes.UserID);
              Common.setWithExpiry("CustID", this.loginRes.AuthenticationToken);
              Common.setWithExpiry("UserType", this.loginRes.RedirectUrl);
              Common.setWithExpiry("Permission", this.loginRes.TokenExpiryMinutes);
              Common.setWithExpiry("IsManager", this.loginRes.IsManager);
              Common.setWithExpiry("Name", this.loginRes.ValidateTokenExpiretime);
              Common.setWithExpiry("ProfileLog", this.loginRes.PrivateChannel);
              Common.setWithExpiry("IsPunchOut", "Yes");

              //Common.setWithExpiry("PunchOutCustID", custID);
              //Common.setWithExpiry("PunchOutUserID", userID == "none" ? "" : userID);

              let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
              var geturl = Common.getWithExpiry("url");
              if (returnUrl != undefined && returnUrl != null && returnUrl != '') {
                this.router.navigateByUrl(returnUrl.toLowerCase());
              }
              else if (geturl != undefined && geturl != null && geturl != '') {
                Common.removeWithExpiry("url")
                this.router.navigate(['/productdetail/' + geturl.toLowerCase()]);
              }
              else if (this.webtype == '1') {
                this.router.navigate(['/order-management/pending-order']);
              }
              else if (this.route.snapshot.paramMap.get('type') == 'rfq') {
                Common.setWithExpiry("PunchOutType", this.PunchOutType);
                this.router.navigate(['/southerquote']);
              }
              else {
                Common.setWithExpiry("PunchOutType", this.PunchOutType);
                this.router.navigateByUrl(this.afterloginurl);
              }
              this.cartService.customerBroadCaster(this.loginRes.ValidateTokenExpiretime);
              this.cartService.cartBroadCasterLogin(Common.getWithExpiry("CustID"), Common.getWithExpiry("UserID"));
            }
            else {
              if(this.iskrayden){
                this.Errormsg = 'Invalid Password! Please try again or reset it using "Forgot Your Password?"';
                this.toastr.error('Invalid Password! Please try again or reset it using "Forgot Your Password?"');
              }
              else{
              this.Errormsg = 'Invalid UserName Or Password';
              }
              this.isError = true;
            }
          })
        }
      }
    })


  }

  register() {
    if (this.businesstype == "B2C") {
      this.router.navigate(['registration']);
    }
    else if (this.businesstype == "B2B") {
      this.router.navigate(['b2b-registration']);
    }
    else {
      this.router.navigate(['new-customer']);
    }
  }

  sendMessage(message:any): void {
    this.loadingService.LoadingMessage(message);
  }


  onSubmit() {

    if (this.user.CustomerId == '' || this.user.CustomerId == null || this.user.CustomerId == undefined) {
      this.Errormsg = 'Please insert customer id';
      this.isError = true;
      const element = this.renderer.selectRootElement("#userCustomerId");
      element.focus();
    }
    else if (this.user.Password == '' || this.user.Password == null || this.user.Password == undefined) {
      this.Errormsg = 'Please insert Password';
      this.isError = true;
      const element = this.renderer.selectRootElement("#userPassword");
      element.focus();
    }
    else if (this.captcha1 == null && this.iscaptcha == '1') {
      this.Errormsg = 'Please Click on Captcha CheckBox';
      this.isError = true;
    }
    else {
      var model = {
        "custID": this.user.CustomerId,
        "Username": this.user.Username,
        "Password": this.registerService.logMd5(this.user.Password),
        "LoginType": true,
        "company_cu": Common.getWithExpiry("company_cu").toString()
      }
      this.sendMessage('start');
      this.registerService.Login(model).subscribe((res: any) => {
        this.sendMessage('stop');
        this.loginRes = res;
        if (this.loginRes.Status == "Success") {



          Common.setWithExpiry("warehouse", this.loginRes.UserFullName);
          Common.setWithExpiry("UserID", this.loginRes.UserID);
          Common.setWithExpiry("CustID", this.loginRes.AuthenticationToken);
          Common.setWithExpiry("UserType", this.loginRes.RedirectUrl);
          Common.setWithExpiry("Permission", this.loginRes.TokenExpiryMinutes);
          Common.setWithExpiry("IsManager", this.loginRes.IsManager);
          Common.setWithExpiry("Name", this.loginRes.ValidateTokenExpiretime);
          Common.setWithExpiry("ProfileLog", this.loginRes.PrivateChannel);
          Common.removeWithExpiry('menuList');
          Common.removeWithExpiry('menuList'+this.loginRes.AuthenticationToken);
          this.cartService.customerBroadCaster(this.loginRes.ValidateTokenExpiretime);
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          var geturl = Common.getWithExpiry("url");
          if (returnUrl != undefined && returnUrl != null && returnUrl != '') {
            this.router.navigateByUrl(returnUrl.toLowerCase());
          }
          else if (geturl != undefined && geturl != null && geturl != '') {
            Common.removeWithExpiry("url")
            this.router.navigate(['/productdetail/' + geturl]);
          }
          else {
            this.router.navigateByUrl(this.afterloginurl);
          }
          this.cartService.cartBroadCasterLogin(Common.getWithExpiry("CustID"), Common.getWithExpiry("UserID"));
        }
        else {
          if(this.iskrayden){
            this.Errormsg = 'Invalid Password! Please try again or reset it using "Forgot Your Password?"';
            this.toastr.error('Invalid Password! Please try again or reset it using "Forgot Your Password?"');
          }
          else{
            this.Errormsg = 'Invalid UserName Or Password';
          }
          this.isError = true;

        }
      })
    }
  }

  onSubmitship() {

    if (this.user.CustomerId == '' || this.user.CustomerId == null || this.user.CustomerId == undefined) {
      this.Errormsg = 'Please insert customer id';
      this.isError = true;
      const element = this.renderer.selectRootElement("#userCustomerId");
      element.focus();
    }
    else if (this.user.Password == '' || this.user.Password == null || this.user.Password == undefined) {
      this.Errormsg = 'Please insert Password';
      this.isError = true;
      const element = this.renderer.selectRootElement("#userPassword");
      element.focus();
    }
    else if (this.captcha1 == null && this.iscaptcha == '1') {
      this.Errormsg = 'Please Click on Captcha CheckBox';
      this.isError = true;
    }
    else {
      var model = {
        "custID": this.user.CustomerId,
        "Username": this.user.Username,
        "Password": this.registerService.logMd5(this.user.Password),
        "LoginType": true,
        "company_cu": Common.getWithExpiry("company_cu").toString()
      }

      this.registerService.Loginship(model).subscribe((res: any) => {
        this.loginRes = res;
        if (this.loginRes.Status == "Success") {
          Common.setWithExpiry("warehouse", this.loginRes.UserFullName);
          Common.setWithExpiry("UserID", this.loginRes.UserID);
          Common.setWithExpiry("CustID", this.loginRes.AuthenticationToken);
          Common.setWithExpiry("UserType", this.loginRes.RedirectUrl);
          Common.setWithExpiry("Permission", this.loginRes.TokenExpiryMinutes);
          Common.setWithExpiry("IsManager", this.loginRes.IsManager);
          Common.setWithExpiry("Name", this.loginRes.ValidateTokenExpiretime);
          Common.setWithExpiry("ProfileLog", this.loginRes.PrivateChannel);
          this.cartService.customerBroadCaster(this.loginRes.ValidateTokenExpiretime);
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          var geturl = Common.getWithExpiry("url");
          if (returnUrl != undefined && returnUrl != null && returnUrl != '') {
            this.router.navigateByUrl(returnUrl.toLowerCase());
          }
          else if (geturl != undefined && geturl != null && geturl != '') {
            Common.removeWithExpiry("url");
            this.router.navigate(['/productdetail/' + geturl]);
          }
          else {
            this.router.navigateByUrl(this.afterloginurl);
          }
          this.cartService.cartBroadCasterLogin(Common.getWithExpiry("CustID"), Common.getWithExpiry("UserID"));
        }
        else {
          if(this.iskrayden){
            this.Errormsg = 'Invalid Password! Please try again or reset it using "Forgot Your Password?"';
            this.toastr.error('Invalid Password! Please try again or reset it using "Forgot Your Password?"');
          }
          else{
          this.Errormsg = 'Invalid UserName Or Password';
          }
          this.isError = true;
        }
      })
    }
  }

  onSubmitnew() {

    if (this.user.CustomerId == '' || this.user.CustomerId == null || this.user.CustomerId == undefined) {
      this.Errormsg = 'Please insert Email';
      this.isError = true;
      const element = this.renderer.selectRootElement("#userCustomerId");
      element.focus();
    }
    else if (this.user.Password == '' || this.user.Password == null || this.user.Password == undefined) {
      this.Errormsg = 'Please insert Password';
      this.isError = true;
      const element = this.renderer.selectRootElement("#userPassword");
      element.focus();
    }
    else if (this.captcha1 == null && this.iscaptcha == '1') {
      this.Errormsg = 'Please Click on Captcha CheckBox';
      this.isError = true;
    }
    else if(this.iskrayden && (this.emailapiflag==false || this.Emailcheckflag==false)){
      this.Errormsg = this.emailapimsg;
      this.isError = true;
      return;
    }
    else {
      var model = {
        "custID": this.user.CustomerId,
        "Username": this.user.Username,
        "Password": this.registerService.logMd5(this.user.Password),
        "LoginType": true,
        "company_cu": Common.getWithExpiry("company_cu").toString()
      }
      this.sendMessage('start');
      this.registerService.LoginNew(model).subscribe((res: any) => {
        
        this.loginRes = res;
        if (this.loginRes.Status == "Success") {

          this.cartService.customerBroadCaster(this.loginRes.ValidateTokenExpiretime);
          
          Common.setWithExpiry("warehouse", this.loginRes.UserFullName);
          Common.setWithExpiry("UserID", this.loginRes.UserID);
          Common.setWithExpiry("CustID", this.loginRes.AuthenticationToken);
          Common.setWithExpiry("UserType", this.loginRes.RedirectUrl);
          Common.setWithExpiry("Permission", this.loginRes.TokenExpiryMinutes);
          Common.setWithExpiry("IsManager", this.loginRes.IsManager);
          Common.setWithExpiry("Name", this.loginRes.ValidateTokenExpiretime);
          Common.setWithExpiry("ProfileLog", this.loginRes.PrivateChannel);
          Common.setWithExpiry("useremail", this.loginRes.CompanyID);
          Common.setWithExpiry("customerp", '1');
          this.cartService.cartBroadCasterLogin(this.loginRes.AuthenticationToken, this.loginRes.UserID);          
          this.googletagforcheckout();
          if (this.loginRes.RedirectUrl == '3' && this.NewPermission == '1') {
            var getper = JSON.parse(this.loginRes.PrivateChannel);
            if (getper[5] == false && getper[6] == false) {
              this.toastr.info("Please conatct administrator for your permission");
              this.sendMessage('stop');
              this.router.navigate(['login']);
              return;
            }
          }

          
          //this.cartService.updateCartForSession();
          let returnUrl:any = this.route.snapshot.queryParamMap.get('returnUrl');
          var geturl = Common.getWithExpiry("url");
          var carturl = Common.getWithExpiry("carturl");
          if (returnUrl != undefined && returnUrl != null && returnUrl != '') {
            
            
            setTimeout( () => {
              this.sendMessage('stop');
              this.router.navigateByUrl(returnUrl.toLowerCase());
            }, 2000 );
            //location.reload();
          }
          else if(carturl!=undefined && carturl!=null && carturl!=''){

            
            setTimeout( () => {
              this.sendMessage('stop');
              this.router.navigateByUrl(carturl.toLowerCase());
            }, 2000 );

            
          }
          else if (geturl != undefined && geturl != null && geturl != '') {
            Common.removeWithExpiry("url");
            this.sendMessage('stop');
            this.router.navigate(['/productdetail/' + geturl]);
          }
          else {
            this.sendMessage('stop');
            this.router.navigateByUrl(this.afterloginurl);
          }
          
        }
        else {
          this.sendMessage('stop');
          if(this.iskrayden){
            this.Errormsg = 'Invalid Password! Please try again or reset it using "Forgot Your Password?"';
            this.toastr.error('Invalid Password! Please try again or reset it using "Forgot Your Password?"');
          }
          else{
          this.Errormsg = 'Invalid UserName Or Password';
          }
          this.isError = true;
        }
      })
    }
  }
}
