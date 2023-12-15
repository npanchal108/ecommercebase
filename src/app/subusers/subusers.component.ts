import { Component, OnInit, Renderer2 } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { NgForm } from '@angular/forms';
import { Md5 } from 'ts-md5';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Common } from '../model/common.model';
import { CartService } from '../services/cart.service';
import { SEOService } from '../services/seo.service';
import * as $ from 'jquery';
import * as parser from 'parse-address'
import * as passwordPolicy from 'password-policy'
import { json } from 'express';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-subusers',
  templateUrl: './subusers.component.html',
  styleUrls: ['./subusers.component.scss']
})
export class subusersComponent implements OnInit {
  hide = true;
  hide1 = true;
  permissionList: any = [];
  permissionList1: any = [];
  isedit: any = false;
  user: any = {};
  selectedPermission: any = [];
  // userObj: any = {};
  isShowForm: boolean;
  isShowMsg: boolean;
  customerlist: any = [];
  AllowO: any;
  confirmPass: boolean;
  cuUserList: any = [];
  
  webtype: any;
  dropdownSettings = {};
  dropdownSettings1 = {};
  selectedcustomers = [];
  ismanageron: any;
  passwordpolicy1: any;
  showOldPermission: boolean;
  
  constructor(private renderer: Renderer2, private seoService: SEOService, private cartService: CartService, private router: Router, private dataService: DataService, private toastr: ToastrService, private registerService: RegistrationService) {
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('User Management - ' + geturl);
    this.seoService.setkeywords('User Management - ' + geturl);
    this.seoService.setdescription('User Management - ' + geturl);
    
    this.gototop();
    
    this.GetConfigurationforPasswordPolicy();
    
    // if (Common.getWithExpiry("CustID") == undefined && Common.getWithExpiry("SalesUserID") == undefined) {
    //   this.router.navigate(['login']);
    // }
    // else {
      this.setconfigmanager();
    //}
this.getnewconfigsforpermisiion();
    
  }

getnewconfigsforpermisiion(){
  var NewPermission = this.dataService.Getconfigbykey("NewPermission");
    if (NewPermission == null || NewPermission == undefined || NewPermission == '') {
      NewPermission = Common.getWithExpiry("NewPermission");
    }
    else{
      if (NewPermission == "1") {
        this.showOldPermission = false;
      }
      else {
        this.showOldPermission = true;
      }
    }
    if (NewPermission == null || NewPermission == undefined || NewPermission == '') {
  this.dataService.GetPermissionConfig().subscribe(data => {
    if (data == "1") {
      this.showOldPermission = false;
    }
    else {
      this.showOldPermission = true;
    }
    Common.setWithExpiry("NewPermission",NewPermission);
  });
}
else{
  if (NewPermission == "1") {
    this.showOldPermission = false;
  }
  else {
    this.showOldPermission = true;
  }
}
}

  
  GetConfigurationforPasswordPolicy() {
    this.passwordpolicy1 = this.dataService.Getconfigbykey("PasswordPolicy");
    if (this.passwordpolicy1 == null || this.passwordpolicy1 == undefined || this.passwordpolicy1 == '') {
      this.passwordpolicy1 = Common.getWithExpiry("PasswordPolicy");
    }
    if (this.passwordpolicy1 == null || this.passwordpolicy1 == undefined || this.passwordpolicy1 == '') {
      this.dataService.GetConfigurationforPasswordPolicy().subscribe((res: any) => {
        this.passwordpolicy1 = res;
        Common.setWithExpiry("PasswordPolicy", this.passwordpolicy1);
      });
    }
  }
  
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  
  setconfigmanager() {
    this.ismanageron = this.dataService.Getconfigbykey("IsManger");
    if (this.ismanageron == null || this.ismanageron == undefined || this.ismanageron == '') {
    this.ismanageron = Common.getWithExpiry("IsManger");
    }
    if (this.ismanageron == null || this.ismanageron == undefined || this.ismanageron == '') {
      this.dataService.Getconfigformanager().subscribe((data: any) => {
        this.ismanageron = data;
        Common.setWithExpiry("IsManger", this.ismanageron);
      })
    }
  }

  ngOnInit() {


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'salesman1',
      textField: 'textad',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'salesman1',
      textField: 'textad',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.webtype = this.dataService.Getconfigbykey("websitetype");
    if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
      this.webtype = Common.getWithExpiry("websitetype");
    }
    if (this.webtype == null || this.webtype == undefined || this.webtype == '') {
      this.dataService.GetWebsiteType().subscribe((data: any) => {
        this.webtype = data;
        Common.setWithExpiry("websitetype", this.webtype);
      })
    }
    if (this.webtype != '6' && this.webtype != '5') {
      this.toastr.error("You are not authorize to access Sub Users List", 'Message!');
      this.router.navigate(['/home']);
    }
    this.isShowForm = false;
    this.getUserList();
  }

  createEditUser() {
    this.isedit = false;
    this.user = {};
    this.setconfigmanager();
    this.user.manager = false;
    this.selectedPermission = [];
    this.confirmPass = false;
    this.AllowO = "OE";
    this.user.ShippingAddress = 0;
    this.getAllPermission();
    this.getAllAddress();
    this.isShowForm = true;
    this.isShowMsg = false;
    
    
  }
  
  getUserList() {
    this.registerService.getsalesmansubuserslist(Common.getWithExpiry("SalesUserID")).subscribe((res: any) => {
      this.cuUserList = res;
      
    });

    
  }
  
  onManageUser(newuser) {
    this.user={};
    this.user=newuser;
    this.user.manager=false;
    this.user.salesmanid=Common.getWithExpiry("SalesUserID");
    this.isedit = true;
    this.setconfigmanager();
    // for (let i = 0; i < this.cuUserList.length; i++) {
    //   if (this.cuUserList[i].customer == customer && this.cuUserList[i].userId == userId) {
    //     this.user = this.cuUserList[i];
    //   }
    // }
    if (this.user != null) {
      this.selectedPermission = [];
      var getper = this.user.permission.split(';');
      for (var i = 0; i < getper.length; i++) {
        if (getper[i] != '') {
          if (this.selectedPermission.indexOf(getper[i]) > -1) {
          }
          else {
            this.selectedPermission.push(getper[i]);
          }
        }
      }


      
      this.user.password = "";
      this.user.ConfirmPassword = "";
      
      //this.selectedship=this.user.shiptolist;
      this.confirmPass = false;
      this.AllowO = (this.selectedPermission.indexOf("OR") > -1 ? "OR" : "OE");
      var index = this.selectedPermission.indexOf(this.AllowO);
      this.selectedPermission.splice(index, 1);
      this.getAllPermission();
      this.getAllAddress();
      this.isShowForm = true;
      this.isShowMsg = false;
      
      }
  }
  openDialog(customer, userId) {
    this.toastr.error(" customer " + customer + " userId " + userId, 'Message!');
  }

  getAllPermission() {
    this.registerService.getAllPermission().subscribe((res: any) => {
      this.permissionList = [];
      this.permissionList1 = [];
      var permiss = res;
      for (var i = 0; i < permiss.length; i++) {
        if (permiss[i].PermissionCode == 'OE' || permiss[i].PermissionCode == 'OR') {
          this.permissionList1.push(permiss[i]);
        }
        else {
          this.permissionList.push(permiss[i]);
        }
      }
    })
  }

  getAllAddress() {
    var salesman = Common.getWithExpiry("SalesUserID").toString();
    this.dataService.getsalesmansbysalesman(salesman).subscribe((res: any) => {
      this.customerlist = res;
      this.selectedcustomers = [];

      for (let ppl of this.customerlist) {
        ppl.adr = JSON.parse(ppl.adr);
        ppl.textad = ppl.salesman1 + ' - ' + ppl.name;
        
        try {
          for (let dd of this.user.customermapping) {
            if (ppl.salesman1 == dd.customerid) {
              this.selectedcustomers.push(ppl);
            }
          }
        } catch (ex) { }
        
      }
    })
  }

  onSubmit(form: NgForm) {

    if (form.invalid)
      return;


      
    
    // if (this.user.userid == undefined || this.user.userid == null || this.user.userid == '') {
    //   this.toastr.error("Please Insert UserID", 'Message!');
    //   const element = this.renderer.selectRootElement("#userUserID");
    //   element.focus();
    //   return;
    // }

    if (this.user.firstname == undefined || this.user.firstname == null || this.user.firstname == '') {
      this.toastr.error("Please Insert First Name", 'Message!');
      const element = this.renderer.selectRootElement("#userfirst_name");
      element.focus();
      return;
    }
    if (this.user.lastname == undefined || this.user.lastname == null || this.user.lastname == '') {
      this.toastr.error("Please Insert Last Name", 'Message!');
      const element = this.renderer.selectRootElement("#userlast_name");
      element.focus();
      return;
    }
    
    if (this.user.email == undefined || this.user.email == null || this.user.email == '') {
      this.toastr.error("Please Insert EmailAddress", 'Message!');
      const element = this.renderer.selectRootElement("#EmailAddress");
      element.focus();
      return;
    }

    if (form.value.Password != form.value.ConfirmPassword) {
      this.confirmPass = true;
      return;
    }
    this.user.userid=this.user.email;
    var permission: string = "";

    for (let p of this.selectedPermission) {
      permission += p + ";"
    }
    var getshi = [];
    for (let p of this.selectedcustomers) {
      var getn={
        customerid :p.salesman1,
        salesmanid:Common.getWithExpiry("SalesUserID").toString(),
        userid:this.user.userid,
      }
      getshi.push(getn);
    }
this.user.customermapping=getshi;
    permission = permission + this.AllowO + ";";
    this.user.permission=permission;
    // this.userObj.customer = Common.getWithExpiry("CustID");
    // this.userObj.ParentID = Common.getWithExpiry("CustID");
    // this.userObj.userId = this.user.UserID;
    if (this.user.password != null && this.user.password != undefined && this.user.password != '') {
      if (this.passwordpolicy1 == '1') {
        if (passwordPolicy.hasLowerCase(this.user.password) == false) {
          this.toastr.error("Password should contain One Lower Case Character", 'Message!');
          const element = this.renderer.selectRootElement("#Password");
          element.focus();
          return;
        }
        if (passwordPolicy.hasUpperCase(this.user.password) == false) {
          this.toastr.error("Password should contain One Upper Case Character", 'Message!');
          const element = this.renderer.selectRootElement("#Password");
          element.focus();
          return;
        }
        if (passwordPolicy.hasNumber(this.user.password) == false) {
          this.toastr.error("Password should contain One Numeric value", 'Message!');
          const element = this.renderer.selectRootElement("#Password");
          element.focus();
          return;
        }
        if (passwordPolicy.hasSpecialCharacter(this.user.password) == false) {
          this.toastr.error("Password should contain One Special Character", 'Message!');
          const element = this.renderer.selectRootElement("#Password");
          element.focus();
          return;
        }
        if (this.user.password.length < 8 || this.user.password.length > 20) {
          this.toastr.error("Password Length should not be less then 8 and greater then 20 characters", 'Message!');
          const element = this.renderer.selectRootElement("#Password");
          element.focus();
          return;
        }
      }
      //this.user.password = this.registerService.encrypted('8080808080808080', this.user.Password); //Md5.hashStr(this.user.Password);
    }

    
    
    
    // if (this.user.password != null && this.user.password != undefined && this.user.password != '') {
    //   this.user.password = this.registerService.encrypted('8080808080808080', this.user.Password); //Md5.hashStr(this.user.Password);
    // }
    this.user.salesmanid=Common.getWithExpiry("SalesUserID");
    this.registerService.insertsalesmansubusers(this.user).subscribe((res: any) => {
      this.user = {};
      form.reset();
      this.ngOnInit()
      this.isShowMsg = true;
      this.isShowForm = false;
      //this.toastr.success(res);
      if (this.isedit == false && res) {
        this.toastr.success("User Created Successfully....");
      }
      else if (this.isedit == true && res) {
        this.toastr.success("User Updated Successfully....");
      }
      else{
        this.toastr.error("Error is occured please try again...");
      }
    })
  }

  ConvertKeysToUpperCase(obj) {
    try {
      var key, keys = Object.keys(obj);
      var n = keys.length;
      var newobj = {}
      while (n--) {
        key = keys[n];
        try {
          if (obj[key] != undefined && obj[key] != null) {
            newobj[key] = (typeof obj[key] == 'string' ? obj[key].toUpperCase() : obj[key]);
          }
          else {
            newobj[key] = obj[key];
          }
        } catch (ex) {
          newobj[key] = obj[key];


        }
      }
      return newobj;
    } catch (ex) {

      return obj;
    }
  };
  onItemSelect(item) {

  }
  onSelectAll(item) {

  }
  updatePermission(event) {
    if (event.target.checked) {
      if (event.target.name != '') {
        if (this.selectedPermission.indexOf(event.target.name) > -1) {
        }
        else {
          this.selectedPermission.push(event.target.name);
        }
      }
    }
    else {
      if (event.target.name != '') {
        var index = this.selectedPermission.indexOf(event.target.name);
        this.selectedPermission.splice(index, 1);
      }
    }
  }

  
  
}
