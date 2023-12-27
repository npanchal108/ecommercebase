import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ContactService } from '../services/contact.service';

import { SEOService } from '../services/seo.service';
import { Common } from '../../app/model/common.model';
import { DataService } from '../services/data.service';
import { CheckoutService } from '../services/checkout.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactDtl: any = [];
  addess: string = '';
  contact: any = {};
  isSubmitted: boolean = false;
  address: any = [];
  Secondcontact: any;
  addressshow: any;
  iscaptcha: any;
  captcha1: any;
  isError: any;
  Errormsg: any;
  contacthtml: any;
  faxonxontactus: any;
  secondaddressobjet: any;
  sociallinks: any = [];
  flink: string = '';
  tlink: string = '';
  glink: string = '';
  llink: string = '';
  iskrayden:any;
  addcartpop:any;
  formtype:any;
  constructor(private checkoutService: CheckoutService, private renderer: Renderer2, private seoService: SEOService, private dataService: DataService, private contactService: ContactService) {
    this.gototop();
    this.iskrayden=environment.iskyraden;
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Contact Us - ' + geturl);
    this.seoService.setkeywords('Contact Us - ' + geturl);
    this.seoService.setdescription('Contact Us - ' + geturl);
    this.GetConfigFortheaddressshow();
    this.Getfaxonxontactus();
    this.getcontactusSecondDetails();
    this.Getcaptchavalue();
    this.GetContactUshtml();
    this.Getsecondaddressobjet();
    this.GetDefaultValues();
  }
  GetDefaultValues() {
    try {
      var userid = null;
      var subuserid = null;
      var userType = null;
      if (Common.getWithExpiry("CustID") != undefined && Common.getWithExpiry("CustID") != null && Common.getWithExpiry("CustID") != '') {
        userid = Common.getWithExpiry("CustID");
        subuserid = Common.getWithExpiry("UserID");
        userType = Common.getWithExpiry("UserType");
        try{
        var getdefaults = JSON.parse(Common.getWithExpiry("DefaultValues" + userid + subuserid + userType));
        }catch(ed){}
        if (getdefaults == undefined || getdefaults == null) {
          this.checkoutService.getDefaultValues(subuserid, userType, userid).subscribe((data: any) => {
            getdefaults = data;
            this.contact.Name = getdefaults.name;
            this.contact.Email = getdefaults.email_address;
            this.contact.Phone = getdefaults.phone;
            Common.setWithExpiry("DefaultValues" + userid + subuserid + userType, JSON.stringify(getdefaults));
          });
        }
        else {
          this.contact.Name = getdefaults.name;
          this.contact.Email = getdefaults.email_address;
          this.contact.Phone = getdefaults.phone;
        }
      }



    } catch (ed) {
      
     }
  }
  openpopup(type){
    if(this.addcartpop==undefined || this.addcartpop=='0'){
      this.addcartpop='1';
      this.formtype=type;
    }
    else{
      this.addcartpop='0';
    }
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  Getsecondaddressobjet() {
    var secondaddressobjet = this.dataService.Getconfigbykey("secondaddressobjet");
    if (secondaddressobjet == null || secondaddressobjet == undefined || secondaddressobjet == '') {
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
  GetContactUshtml() {
    this.contacthtml = Common.getWithExpiry("contacthtml");
    if (this.contacthtml == null || this.contacthtml == undefined) {
      this.dataService.GetContactUshtml().subscribe((res: any) => {
        this.contacthtml = res;
        Common.setWithExpiry("contacthtml", this.contacthtml);
      });
    }
  }
  GetConfigFortheaddressshow() {
    this.addressshow = Common.getWithExpiry("addressshow");
    if (this.addressshow == null || this.addressshow == undefined) {
      this.dataService.GetConfigFortheaddressshow().subscribe((res: any) => {
        this.addressshow = res;
        Common.setWithExpiry("addressshow", this.addressshow);
      });
    }
  }

  Getfaxonxontactus() {
    this.faxonxontactus = Common.getWithExpiry("faxonxontactus");
    if (this.faxonxontactus == null || this.faxonxontactus == undefined) {
      this.dataService.GetConfigforfaxonxontactus().subscribe((res: any) => {
        this.faxonxontactus = res;
        Common.setWithExpiry("faxonxontactus", this.faxonxontactus);
      });
    }
  }
  Getcaptchavalue() {
    this.iscaptcha = Common.getWithExpiry("iscaptchac");
    if (this.iscaptcha == null || this.iscaptcha == undefined) {
      this.dataService.GetConfidForCaptchaInContactUs().subscribe((data: any) => {
        this.iscaptcha = data;
        Common.setWithExpiry("iscaptchac", this.iscaptcha);
      })
    }
  }
  ngOnInit() {

  }
  resolved(captchaResponse: string) {
    this.captcha1 = captchaResponse;
    if (this.captcha1 != null && this.iscaptcha == '1') {
      this.isError = false;
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
        var geturl = Common.getWithExpiry("cpname");
        this.seoService.setauthormetatag(geturl + ' ' + this.address + ' ' + this.contactDtl.state + ' ' + this.contactDtl.postal_code + ' ' + this.contactDtl.country_code + ' ' + this.contactDtl.phone + ' ' + this.contactDtl.co_email + ' ' + this.contactDtl.co_web + ' ' + this.contactDtl.fax);
      })
    }
    else {
      this.contactDtl = contactDtl;
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
      var geturl = Common.getWithExpiry("cpname");
      this.seoService.setauthormetatag(geturl + ' ' + this.address + ' ' + this.contactDtl.state + ' ' + this.contactDtl.postal_code + ' ' + this.contactDtl.country_code + ' ' + this.contactDtl.phone + ' ' + this.contactDtl.co_email + ' ' + this.contactDtl.co_web + ' ' + this.contactDtl.fax);
    }
    try {
      if (Common.getWithExpiry("GetSocialLinks") != undefined) {
        var sociallinks = JSON.parse(Common.getWithExpiry("GetSocialLinks"));
      }
    } catch (ed) { }
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
  }

  // getContactDtl() {
  //   try {
  //     if (Common.getWithExpiry("contactDtl") != undefined) {
  //       this.contactDtl = JSON.parse(Common.getWithExpiry("contactDtl"));
  //     }
  //   } catch (ed) { }
  //   if (this.contactDtl == null || this.contactDtl == undefined || this.contactDtl == '') {
  //   this.contactService.getContact(Common.getWithExpiry("company_sy")).subscribe((res:any) => {
  //     this.contactDtl = res;
  //     Common.setWithExpiry("company_cu", this.contactDtl.company_cu);
  //     Common.setWithExpiry("company_it", this.contactDtl.company_it);
  //     Common.setWithExpiry("company_sy", this.contactDtl.company_sy);
  //     var getarr = this.contactDtl.adr.trim().replace('[', '').replace(']', '').split(',');

  //     for (var i = 0; i < getarr.length; i++) {
  //       var adrd = getarr[i].trim().replace('"', '').replace('"', '');
  //       adrd = adrd.trim();
  //       this.address.push(adrd);
  //       if (adrd != '') {
  //         this.addess = this.addess + ", " + adrd;
  //       }
  //     }
  //     var geturl = Common.getWithExpiry("cpname");
  //     this.seoService.setauthormetatag(geturl + ' ' + this.address + ' ' + this.contactDtl.state + ' ' + this.contactDtl.postal_code + ' ' + this.contactDtl.country_code + ' ' + this.contactDtl.phone + ' ' + this.contactDtl.co_email + ' ' + this.contactDtl.co_web + ' ' + this.contactDtl.fax );
  //   })
  // }
  // else{

  //   var getarr = this.contactDtl.adr.trim().replace('[', '').replace(']', '').split(',');
  //   for (var i = 0; i < getarr.length; i++) {
  //     var adrd = getarr[i].trim().replace('"', '').replace('"', '');
  //     adrd = adrd.trim();
  //     this.address.push(adrd);
  //     if (adrd != '') {
  //       this.addess = this.addess + ", " + adrd;
  //     }
  //   }
  //   var geturl = Common.getWithExpiry("cpname");
  //   this.seoService.setauthormetatag(geturl + ' ' + this.address + ' ' + this.contactDtl.state + ' ' + this.contactDtl.postal_code + ' ' + this.contactDtl.country_code + ' ' + this.contactDtl.phone + ' ' + this.contactDtl.co_email + ' ' + this.contactDtl.co_web + ' ' + this.contactDtl.fax );
  // }
  // }
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
  isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  postInquiry() {

    if (this.contact.Name == undefined || this.contact.Name == null || this.contact.Name == '') {
      this.Errormsg = 'Please Insert Name';
      this.isError = true;
      const element = this.renderer.selectRootElement("#exampleInputName");
      element.focus();
      return;
    }
    if (this.contact.Email == undefined || this.contact.Email == null || this.contact.Email == '') {
      this.Errormsg = 'Please Insert Email';
      this.isError = true;
      const element = this.renderer.selectRootElement("#exampleInputEmail1");
      element.focus();
      return;
    }
    if (this.contact.Title == undefined || this.contact.Title == null || this.contact.Title == '') {
      this.Errormsg = 'Please Insert Subject';
      this.isError = true;
      const element = this.renderer.selectRootElement("#exampleInputTitle");
      element.focus();
      return;
    }
    if (this.contact.Comment == undefined || this.contact.Comment == null || this.contact.Comment == '') {
      this.Errormsg = 'Please Insert Comment';
      this.isError = true;
      const element = this.renderer.selectRootElement("#exampleInputComments");
      element.focus();
      return;
    }
    if (this.contact.Email != undefined && this.contact.Email != '' && !this.isValidEmail(this.contact.Email)) {
      this.Errormsg = 'Please Insert valid Email';
      this.isError = true;
      const element = this.renderer.selectRootElement("#exampleInputEmail1");
      element.focus();
      return;
    }

    if (this.captcha1 == null && this.iscaptcha == '1') {
      this.Errormsg = 'Please Click on Captcha CheckBox';
      this.isError = true;
      return;
    }
    this.contact.company_sy = Common.getWithExpiry("company_sy");
    this.contactService.postInquiry(this.contact).subscribe((res: any) => {
      this.isSubmitted = true;
      this.contact = {};
    });
  }

}
