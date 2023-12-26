import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Common } from '../model/common.model';
import { ContactService } from '../services/contact.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  contactDtl: any = [];
  addess: string = '';
  sociallinks: any = [];
  flink: string = '';
  tlink: string = '';
  glink: string = '';
  llink: string = '';
  webtype: any;
  address: any = [];
  headerlinks: any;
  businesstype: any;
  isNotLoggedIn: boolean = true;
  Secondcontact: any;
  addressshow: any;
  isShowSalesLogin: any;
  chatcode: any;
  secondaddressobjet: any;
  homebannerList: any;
  logourl: any;
  logoimageurl:any;
  headermsg: any;  
  webname:any;
  Allconfigurationlist:any=[];
  iskyraden:any;
  constructor(private contactService: ContactService, private dataService: DataService, private router: Router) {
this.iskyraden=environment.iskyraden;
    this.GetFooterPageConfigurations();
    //this.GetTheChatCode();
    this.bannerImage();
    this.geheaderlinks();
    //this.GetConfigFortheaddressshow();
    this.getcontactusSecondDetails();
    //this.salesLoginSetting();
    this.Getsecondaddressobjet();
  }

  GetFooterPageConfigurations() {
  try{ 
    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      try{
      this.Allconfigurationlist =JSON.parse(Common.getWithExpiry("Allconfigs"));
      }catch(ed){}
    }
    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      this.dataService.GetAllConfiguration().subscribe((data: any) => {
        this.Allconfigurationlist = data;
        Common.setWithExpiry("Allconfigs",JSON.stringify(this.Allconfigurationlist));
        for(var i=0;i<this.Allconfigurationlist.length;i++){
          if(this.Allconfigurationlist[i].ConfigKey=="ChatCode"){
            this.chatcode=this.Allconfigurationlist[i].ConfigValue;            
            if(this.chatcode!=undefined && this.chatcode!=null && this.chatcode!=''){
              try{
            let body = <HTMLDivElement>document.body;
      let script = document.createElement('script');
      script.innerHTML = this.chatcode;
      body.appendChild(script);
              }catch(ed){}
            }
          }
          if(this.Allconfigurationlist[i].ConfigKey=="IsAddressShow"){
            this.addressshow=this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="SalesLogin"){
            this.isShowSalesLogin=this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="SalesLogin"){
            this.isShowSalesLogin=this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="websitetype"){
            this.webtype=this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="businesstype"){
            this.businesstype=this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="logourl"){
            this.logourl=this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="headermsg"){
            this.headermsg=this.Allconfigurationlist[i].ConfigValue;            
          }
          if(this.Allconfigurationlist[i].ConfigKey=="logoimageurl"){
            this.logoimageurl=this.Allconfigurationlist[i].ConfigValue;            
          }
        }
      })
    }
    else{
      for(var i=0;i<this.Allconfigurationlist.length;i++){
        if(this.Allconfigurationlist[i].ConfigKey=="ChatCode"){
          this.chatcode=this.Allconfigurationlist[i].ConfigValue;            
          if(this.chatcode!=undefined && this.chatcode!=null && this.chatcode!=''){
            try{
          let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = this.chatcode;
    body.appendChild(script);
            }catch(ed){}
          }
        }
        if(this.Allconfigurationlist[i].ConfigKey=="IsAddressShow"){
          this.addressshow=this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="SalesLogin"){
          this.isShowSalesLogin=this.Allconfigurationlist[i].ConfigValue;            
        }
        
        if(this.Allconfigurationlist[i].ConfigKey=="websitetype"){
          this.webtype=this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="businesstype"){
          this.businesstype=this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="logourl"){
          this.logourl=this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="headermsg"){
          this.headermsg=this.Allconfigurationlist[i].ConfigValue;            
        }
        if(this.Allconfigurationlist[i].ConfigKey=="logoimageurl"){
          this.logoimageurl=this.Allconfigurationlist[i].ConfigValue;            
        }
      }
    }
  }catch(ed){}
  }

  ngOnInit() {
    if (Common.getWithExpiry("CustID") != undefined || Common.getWithExpiry("SalesUserID") != undefined) {
      this.isNotLoggedIn = false;
    }
    else {
      this.isNotLoggedIn = true;
    }
    this.getContactDtl();
    // this.webtype = this.dataService.Getconfigbykey("websitetype");
    // if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
    //   this.webtype = Common.getWithExpiry("websitetype");
    // }
    // if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
    //   this.dataService.GetWebsiteType().subscribe((data: any) => {
    //     this.webtype = data;
    //     Common.setWithExpiry("websitetype", this.webtype);
    //   })
    // }
  }

  GetTheChatCode() {
    this.chatcode = this.dataService.Getconfigbykey("ChatCode");
    if (this.chatcode == null || this.chatcode == undefined) {
      this.chatcode = Common.getWithExpiry("chatcode");
    }
    if (this.chatcode == null || this.chatcode == undefined) {
      this.dataService.GetTheChatCode().subscribe((data: any) => {
        this.chatcode = data;
        Common.setWithExpiry("chatcode", this.chatcode);
        let body = <HTMLDivElement>document.body;
        let script = document.createElement('script');
        script.innerHTML = this.chatcode;
        body.appendChild(script);
      })
    }
    else {
      let body = <HTMLDivElement>document.body;
      let script = document.createElement('script');
      script.innerHTML = this.chatcode;
      body.appendChild(script);
    }
  }

  logClick() {
    this.router.navigate(['login']);
  }
  logout() {
    Common.removeWithExpiry("finalObj");
    Common.removeWithExpiry("SalesUserType");
    Common.removeWithExpiry("warehouse");
    Common.removeWithExpiry("UserID");
    Common.removeWithExpiry("CustID");
    Common.removeWithExpiry("UserType");
    Common.removeWithExpiry("Permission");
    Common.removeWithExpiry("SalesUserID");
    Common.removeWithExpiry("SalesUserID");
    try{
    localStorage.clear();
  }catch(ed){}
    this.isNotLoggedIn = true;
    this.router.navigate(['/login']);
    this.ngOnInit();
    try{
    window.location.reload();
    }catch(ed){}

  }


  register() {
    // this.businesstype = this.dataService.Getconfigbykey("businesstype");
    // if (this.businesstype == null || this.businesstype == undefined || this.businesstype == '') {
    //   this.businesstype = Common.getWithExpiry("businesstype");
    // }
    // if (this.businesstype == null || this.businesstype == undefined || this.businesstype == '') {
    //   this.dataService.Getbusinesstype().subscribe((data1: any) => {
    //     this.businesstype = data1;
    //     Common.setWithExpiry("businesstype", this.businesstype);
    //   })
    // }
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
  slogClick() {
    this.router.navigate(['sales-login']);
  }
  bannerImage() {
    try {
      if (Common.getWithExpiry("footerbannerList") != undefined) {
        var homebannerList = JSON.parse(Common.getWithExpiry("footerbannerList"));
      }
    } catch (ed) { }
    if (homebannerList == null || homebannerList == undefined || homebannerList.length == 0) {
      this.dataService.getfooterBanner().subscribe((res: any) => {
        this.homebannerList = res;
        Common.setWithExpiry("footerbannerList", JSON.stringify(this.homebannerList));
      });
    }
    else {
      this.homebannerList = homebannerList;
    }
  }

  geheaderlinks() {
    try {
      if (Common.getWithExpiry('footerlinks') != undefined) {
        var headerlinks = JSON.parse(Common.getWithExpiry('footerlinks'));
      }
    } catch (ed) { }
    if (headerlinks == null || headerlinks == undefined || headerlinks.length == 0) {
      this.dataService.Getfooterlinkslist().subscribe((res: any) => {
        this.headerlinks = res;
        Common.setWithExpiry('footerlinks', JSON.stringify(this.headerlinks));
      });
    }
    else {
      this.headerlinks = headerlinks;
    }
  }
  salesLoginSetting() {
    this.isShowSalesLogin = this.dataService.Getconfigbykey("SalesLogin");
    if (this.isShowSalesLogin == null || this.isShowSalesLogin == undefined || this.isShowSalesLogin == '') {
      this.isShowSalesLogin = Common.getWithExpiry("isShowSalesLogin");
    }
    if (this.isShowSalesLogin == null || this.isShowSalesLogin == undefined || this.isShowSalesLogin == '') {
      this.dataService.SalesLoginSetting().subscribe((res: any) => {
        this.isShowSalesLogin = res;
        Common.setWithExpiry("isShowSalesLogin", this.isShowSalesLogin);
      });
    }
  }
  Getsecondaddressobjet() {
    var secondaddressobjet = this.dataService.Getconfigbykey("secondaddressobjet");
    if (secondaddressobjet == null || secondaddressobjet == undefined) {
      secondaddressobjet = Common.getWithExpiry("secondaddressobjet");
    }
    else {
      if (secondaddressobjet != undefined && secondaddressobjet != null && secondaddressobjet != '') {
        this.secondaddressobjet = JSON.parse(secondaddressobjet);
        this.secondaddressobjet.address = JSON.parse(this.secondaddressobjet.address);
      }
    }
    if (secondaddressobjet == null || secondaddressobjet == undefined) {
      this.dataService.Getsecondaddressobjet().subscribe((res: any) => {
        if (res != undefined && res != null && res != '') {
          this.secondaddressobjet = JSON.parse(res);
          this.secondaddressobjet.address = JSON.parse(this.secondaddressobjet.address);
          Common.setWithExpiry("secondaddressobjet", res);
        }
      });
    }
    else {
      if (secondaddressobjet != undefined && secondaddressobjet != null && secondaddressobjet != '') {
        this.secondaddressobjet = JSON.parse(secondaddressobjet);
        this.secondaddressobjet.address = JSON.parse(this.secondaddressobjet.address);
      }
    }

  }
  GetConfigFortheaddressshow() {
    this.addressshow = this.dataService.Getconfigbykey("IsAddressShow");
    if (this.addressshow == null || this.addressshow == undefined || this.addressshow == '') {
      this.addressshow = Common.getWithExpiry("addressshow");
    }
    if (this.addressshow == null || this.addressshow == undefined || this.addressshow == '') {
      this.dataService.GetConfigFortheaddressshow().subscribe((res: any) => {
        this.addressshow = res;
        Common.setWithExpiry("addressshow", this.addressshow);
      });
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
        Common.setWithExpiry("Secondcontact", JSON.stringify(this.Secondcontact));
      });
    }
    else {
      this.Secondcontact = Secondcontact;
    }
  }


  getContactDtl() {
    try {
      if (Common.getWithExpiry("contactDtl") != undefined) {
        var contactDtl = JSON.parse(Common.getWithExpiry("contactDtl"));
      }
    } catch (ed) { }
    if (contactDtl == undefined || contactDtl == null || contactDtl.company_sy == undefined) {
      this.contactService.getContact(Common.getWithExpiry("company_sy")).subscribe((res: any) => {
        this.contactDtl = res;
        this.webname = this.contactDtl.name;
        Common.setWithExpiry("company_cu", this.contactDtl.company_cu);
        Common.setWithExpiry("company_it", this.contactDtl.company_it);
        Common.setWithExpiry("company_sy", this.contactDtl.company_sy);
        Common.setWithExpiry("contactDtl", JSON.stringify(this.contactDtl));

        try {
          var getarr = this.contactDtl.adr.trim().replace('[', '').replace(']', '').split(',');
        } catch (ed) { }
        if (getarr != undefined && getarr != null) {
          for (var i = 0; i < getarr.length; i++) {
            var adrd = getarr[i].trim().replace('"', '').replace('"', '');
            adrd = adrd.trim();
            this.address.push(adrd);
            if (adrd != '') {
              this.addess = this.addess + " " + adrd;
            }
          }
        }
      })
    }
    else {
      this.contactDtl = contactDtl;
      this.webname = this.contactDtl.name;
      Common.setWithExpiry("company_cu", this.contactDtl.company_cu);
      Common.setWithExpiry("company_it", this.contactDtl.company_it);
      Common.setWithExpiry("company_sy", this.contactDtl.company_sy);
      try {
        var getarr = this.contactDtl.adr.trim().replace('[', '').replace(']', '').split(',');
      } catch (ed) { }
      if (getarr != undefined && getarr != null) {
        for (var i = 0; i < getarr.length; i++) {
          var adrd = getarr[i].trim().replace('"', '').replace('"', '');
          adrd = adrd.trim();
          this.address.push(adrd);
          if (adrd != '') {
            this.addess = this.addess + " " + adrd;
          }
        }
      }
    }
    try {
      if (Common.getWithExpiry("GetSocialLinks") != undefined) {
        var sociallinks = JSON.parse(Common.getWithExpiry("GetSocialLinks"));
      }
    
    if (sociallinks == undefined || sociallinks == null || sociallinks.length == 0) {
      this.dataService.GetSocialLinks().subscribe((data1: any) => {
        this.sociallinks = data1;
        Common.setWithExpiry("GetSocialLinks", JSON.stringify(this.sociallinks));
        for (var i = 0; i < this.sociallinks.length; i++) {
          if (this.sociallinks[i].ConfigValue!=undefined && this.sociallinks[i].ConfigValue!=null && this.sociallinks[i].ConfigValue!='' && this.sociallinks[i].ConfigValue.toString().indexOf("facebook") != -1) {
            this.flink = this.sociallinks[i].ConfigValue;
          }
          if (this.sociallinks[i].ConfigValue!=undefined && this.sociallinks[i].ConfigValue!=null && this.sociallinks[i].ConfigValue!='' && this.sociallinks[i].ConfigValue.toString().indexOf("twitter") != -1) {
            this.tlink = this.sociallinks[i].ConfigValue;
          }
          if (this.sociallinks[i].ConfigValue!=undefined && this.sociallinks[i].ConfigValue!=null && this.sociallinks[i].ConfigValue!='' && this.sociallinks[i].ConfigValue.toString().indexOf("insta") != -1) {
            this.glink = this.sociallinks[i].ConfigValue;
          }
          if (this.sociallinks[i].ConfigValue!=undefined && this.sociallinks[i].ConfigValue!=null && this.sociallinks[i].ConfigValue!='' && this.sociallinks[i].ConfigValue.toString().indexOf("linkedin") != -1) {
            this.llink = this.sociallinks[i].ConfigValue;
          }

        }
      });
    } else {
      this.sociallinks = sociallinks;
      for (var i = 0; i < this.sociallinks.length; i++) {
        if (this.sociallinks[i].ConfigValue!=undefined && this.sociallinks[i].ConfigValue!=null && this.sociallinks[i].ConfigValue!='' && this.sociallinks[i].ConfigValue.toString().indexOf("facebook") != -1) {
          this.flink = this.sociallinks[i].ConfigValue;
        }
        if (this.sociallinks[i].ConfigValue!=undefined && this.sociallinks[i].ConfigValue!=null && this.sociallinks[i].ConfigValue!='' && this.sociallinks[i].ConfigValue.toString().indexOf("twitter") != -1) {
          this.tlink = this.sociallinks[i].ConfigValue;
        }
        if (this.sociallinks[i].ConfigValue!=undefined && this.sociallinks[i].ConfigValue!=null && this.sociallinks[i].ConfigValue!='' && this.sociallinks[i].ConfigValue.toString().indexOf("insta") != -1) {
          this.glink = this.sociallinks[i].ConfigValue;
        }
        if (this.sociallinks[i].ConfigValue!=undefined && this.sociallinks[i].ConfigValue!=null && this.sociallinks[i].ConfigValue!='' && this.sociallinks[i].ConfigValue.toString().indexOf("linkedin") != -1) {
          this.llink = this.sociallinks[i].ConfigValue;
        }

      }
    }
  } catch (ed) { }
  }
}
