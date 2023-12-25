import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { DataService } from '../services/data.service';
import { Common } from '../../app/model/common.model';
import { SEOService } from '../services/seo.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../services/loading.service';
import * as passwordPolicy from 'password-policy'
@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.scss']
})
export class ChangepwdComponent implements OnInit {
  
  hide=true;
  hide1=true;
  passwordpolicy1: any;
  constructor(private renderer: Renderer2,private seoService: SEOService, private loadingService: LoadingService, private toastr: ToastrService, private dataService: DataService, private router: Router, private registerService: RegistrationService) {
  
    this.gototop();
    this.GetConfigurationforPasswordPolicy();
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('Change Password - ' + geturl);
    this.seoService.setkeywords('Change Password - ' + geturl);
    this.seoService.setdescription('Change Password - ' + geturl);
    
  }
  confirmPass: boolean;
  user: any = {};
  isShowForm: boolean;
  isShowMsg: boolean;
  cookname: string;
  ngOnInit() {
    if (Common.getWithExpiry("UserID") != null && Common.getWithExpiry("UserID") != undefined) {
      this.user.UserName = Common.getWithExpiry("UserID");
      this.user.UserType = Common.getWithExpiry("UserType");
      this.confirmPass = false;
      this.isShowForm = true;
      this.isShowMsg = false;
    }
    else {
      this.router.navigate(['/login']);
    }

  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  GetConfigurationforPasswordPolicy() {
    this.passwordpolicy1 = Common.getWithExpiry("passwordpolicy");
    if (this.passwordpolicy1 == null || this.passwordpolicy1 == undefined || this.passwordpolicy1 == '') {
      this.dataService.GetConfigurationforPasswordPolicy().subscribe((res:any) => {
        this.passwordpolicy1 = res;
        Common.setWithExpiry("passwordpolicy", this.passwordpolicy1);
      });
    }
  }
  logout() {
    Common.removeWithExpiry("warehouse");
    Common.removeWithExpiry("UserID");
    Common.removeWithExpiry("CustID");
    Common.removeWithExpiry("UserType");
    Common.removeWithExpiry("Permission");
    Common.removeWithExpiry("SalesUserID");
    Common.removeWithExpiry("SalesUserType");
    try{
    localStorage.clear();
  }catch(ed){}
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }

  OnSubmit(form: NgForm) {
    
    if (form.invalid) {
      return;
    }
    

    if (this.passwordpolicy1 == '1') {
      if (passwordPolicy.hasLowerCase(this.user.Password) == false) {
        this.toastr.error("Password should contain One Lower Case Character", 'Message!');
        const element = this.renderer.selectRootElement("#userPassword");
            element.focus();
        return;
      }
      if (passwordPolicy.hasUpperCase(this.user.Password) == false) {
        this.toastr.error("Password should contain One Upper Case Character", 'Message!');
        const element = this.renderer.selectRootElement("#userPassword");
            element.focus();
        return;
      }
      if (passwordPolicy.hasNumber(this.user.Password) == false) {
        this.toastr.error("Password should contain One Numeric value", 'Message!');
        const element = this.renderer.selectRootElement("#userPassword");
            element.focus();
        return;
      }
      if (passwordPolicy.hasSpecialCharacter(this.user.Password) == false) {
        this.toastr.error("Password should contain One Special Character", 'Message!');
        const element = this.renderer.selectRootElement("#userPassword");
            element.focus();
        return;
      }
      if (this.user.Password.length < 8 || this.user.Password.length > 20) {
        this.toastr.error("Password Length should not be less then 8 and greater then 20 characters", 'Message!');
        const element = this.renderer.selectRootElement("#userPassword");
            element.focus();
        return;
      }
    }
    if (form.value.Password != form.value.ConfirmPassword) {
      this.confirmPass = true;
      const element = this.renderer.selectRootElement("#userConfirmPassword");
            element.focus();
      return;
    }
    else {

      this.user.Password = this.registerService.encrypted('8080808080808080', this.user.Password);
      // Md5.hashStr(this.user.Password)
      this.sendMessage('start');
      try {
        this.registerService.CHangePassword(this.user.UserType, this.user.UserName, this.user.Password, Common.getWithExpiry("CustID")).subscribe((res: any) => {
          var getda = res;
          this.sendMessage('stop');
          if (getda == true || getda == 'true' || getda == 'True') {
            this.isShowForm = false;
            this.isShowMsg = true;
            this.logout();
            this.router.navigate(['/login']);
            //window.location.reload();
          }
          else {
            alert("Problem Occured Please try again");
          }

        });
      } catch (ed) {
        this.sendMessage('stop');
      }
    }

  }

  back() {
    this.router.navigate(['/dashboard']);
  }

}
