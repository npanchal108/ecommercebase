import { Component, OnInit, Renderer2 } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { NgForm } from '@angular/forms';
import { Md5 } from 'ts-md5';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Common } from '../../app/model/common.model';
import { CartService } from '../services/cart.service';
import { SEOService } from '../services/seo.service';
import * as $ from 'jquery';
import * as parser from 'parse-address'
import * as passwordPolicy from 'password-policy'
import { json } from 'express';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from '../services/loading.service';
import { AddressvalidationpopupComponent } from '../addressvalidationpopup/addressvalidationpopup.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  hide = true;
  hide1 = true;
  permissionList: any = [];
  permissionList1: any = [];
  isedit: any = false;
  user: any = {};
  selectedPermission: any = [];
  userObj: any = {};
  isShowForm: boolean;
  isShowMsg: boolean;
  addrLst: any = [];
  AllowO: any;
  confirmPass: boolean;
  cuUserList: any = [];
  page: number = 1;
  totalPage: number;
  webtype: any;
  dropdownSettings = {};
  dropdownSettings1 = {};
  selectedship = [];
  ismanageron: any;
  countryList: any = [];
  stateList: any = [];
  isstateshow: any = true;
  cityno: any;
  isaddressparse: string = '0';
  passwordpolicy1: any;
  TextUpperCase: any;
  prof_label_arr = [];
  selected_prof_label_arr = [];
  showOldPermission: boolean;
  prof_label1 = [];
  prof_label2 = [];
  prof_label3 = [];
  iskyraden: any;
  addressList: any[];
  selectedAddress: string;
  isPostalCodeValid: boolean = false;
  newArray: any[] = [];
  constructor(public dialog: MatDialog,private loadingService: LoadingService,private renderer: Renderer2, private seoService: SEOService, private cartService: CartService, private router: Router, private dataService: DataService, private toastr: ToastrService, private registerService: RegistrationService) {
    var geturl = Common.getWithExpiry("cpname");
    this.seoService.setPageTitle('User Management - ' + geturl);
    this.seoService.setkeywords('User Management - ' + geturl);
    this.seoService.setdescription('User Management - ' + geturl);
    this.iskyraden = environment.iskyraden;
    this.gototop();
    this.getaddresscityno("US");
    this.GetConfigurationforPasswordPolicy();
    this.GetconfigurationfroAddressParser();
    this.GetConfigForTextUpperCaseSetting();
    // if (Common.getWithExpiry("CustID") == undefined && Common.getWithExpiry("SalesUserID") == undefined) {
    //   this.router.navigate(['login']);
    // }
    // else {
    this.setconfigmanager();
    //}
    this.getnewconfigsforpermisiion();

  }

  getnewconfigsforpermisiion() {
    var NewPermission = this.dataService.Getconfigbykey("NewPermission");
    if (NewPermission == null || NewPermission == undefined || NewPermission == '') {
      NewPermission = Common.getWithExpiry("NewPermission");
    }
    else {
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
        Common.setWithExpiry("NewPermission", NewPermission);
      });
    }
    else {
      if (NewPermission == "1") {
        this.showOldPermission = false;
      }
      else {
        this.showOldPermission = true;
      }
    }
  }

  GetConfigForTextUpperCaseSetting() {
    this.TextUpperCase = this.dataService.Getconfigbykey("TextUpperCaseSetting");
    if (this.TextUpperCase == null || this.TextUpperCase == undefined || this.TextUpperCase == '') {
      this.TextUpperCase = Common.getWithExpiry("TextUpperCaseSetting");
    }
    if (this.TextUpperCase == null || this.TextUpperCase == undefined || this.TextUpperCase == '') {
      this.dataService.GetConfigForTextUpperCaseSetting().subscribe((res: any) => {
        this.TextUpperCase = res;
        Common.setWithExpiry("TextUpperCaseSetting", this.TextUpperCase);
      });
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
  GetconfigurationfroAddressParser() {
    this.isaddressparse = this.dataService.Getconfigbykey("AddressParser");
    if (this.isaddressparse == null || this.isaddressparse == undefined || this.isaddressparse == '') {
      this.isaddressparse = Common.getWithExpiry("AddressParser");
    }
    if (this.isaddressparse == null || this.isaddressparse == undefined || this.isaddressparse == '') {
      this.dataService.GetconfigurationfroAddressParser().subscribe((res: any) => {
        this.isaddressparse = res;
        Common.setWithExpiry("AddressParser", this.isaddressparse);
      });
    }
  }

  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  addreparser() {
    if (this.user.addressparser == undefined || this.user.addressparser == null || this.user.addressparser == '') {
      this.toastr.error("Please enter address first");
      const element = this.renderer.selectRootElement("#addressparser");
      element.focus();
    }
    else {
      var parsed = parser.parseLocation(this.user.addressparser);
      this.user.adr1 = (parsed.number == undefined ? "" : parsed.number) + ' ' + (parsed.prefix == undefined ? "" : parsed.prefix) + ' ' + (parsed.street == undefined ? "" : parsed.street) + ' ' + (parsed.type == undefined ? "" : parsed.type);
      this.user.state = parsed.state.toUpperCase();
      this.user.city = parsed.city;
      this.user.postal_code = parsed.zip;

    }
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
      idField: 'ship_id',
      textField: 'textad',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'ship_id',
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
    this.getUserList(this.page);
  }

  createEditUser() {
    this.getCountry();
    this.getStates("US");
    this.isedit = false;
    this.user = {};
    this.user.state = '0';
    this.user.county_code = "US";
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
    this.getProfileLabel(true);
    this.selected_prof_label_arr = [];
    for (var i = 0; i < 60; i++) {
      this.selected_prof_label_arr.push(false);
    }
    if (this.iskyraden) {
      this.AllowO = "OE";
      this.user.chkActive = true;      
    }


  }
  getaddresscityno(country) {
    this.cityno = Common.getWithExpiry("GetCountryaddressCityCode" + country);
    if (this.cityno == null || this.cityno == undefined || this.cityno == '') {
      this.cartService.GetCountryaddressCityCode(country).subscribe((res: any) => {
        this.cityno = res;
        Common.setWithExpiry("GetCountryaddressCityCode" + country, this.cityno);
      });
    }
  }
  onCountryChange(val) {
    this.getStates(val);
    this.getaddresscityno(val);
  }

  getUserList(pageNo) {
    this.registerService.GetCuUserList(Common.getWithExpiry("CustID"), pageNo).subscribe((res: any) => {
      this.cuUserList = res;
      try {
        this.totalPage = this.cuUserList[0].TotalPage;
      } catch (Ex) {
        this.totalPage = 1;
      }
    });

    return pageNo;
  }
  getCountry() {
    try {
      this.countryList = JSON.parse(Common.getWithExpiry("getCountry"));
    } catch (ex) { }
    if (this.countryList == undefined || this.countryList == null || this.countryList.length == 0) {
      this.registerService.getCountry().subscribe((res: any) => {
        this.countryList = res;
        Common.setWithExpiry("getCountry", JSON.stringify(this.countryList));
      })
    }
  }
  getStates(val) {
    this.stateList = undefined;
    try {
      this.stateList = JSON.parse(Common.getWithExpiry("getState" + val));
    } catch (ex) { }
    if (this.stateList == undefined || this.stateList == null || this.stateList.length == 0) {
      this.registerService.getState(val).subscribe((res: any) => {
        this.stateList = res;
        if (this.stateList == undefined || this.stateList == null || this.stateList.length == 0) {
          //this.user.state='';
          this.isstateshow = false;
        }
        else {
          this.isstateshow = true;
          Common.setWithExpiry("getState" + val, JSON.stringify(this.stateList));
          //this.user.state='0';
        }
      })
    }
    else {
      if (this.stateList == undefined || this.stateList == null || this.stateList.length == 0) {
        this.isstateshow = false;
      }
      else {
        this.isstateshow = true;
      }
    }
  }
  onManageUser(newuser) {
    this.user = {};
    this.user = newuser;
    this.getCountry();
    this.getStates("US");


    this.isedit = true;
    this.setconfigmanager();
    // for (let i = 0; i < this.cuUserList.length; i++) {
    //   if (this.cuUserList[i].customer == customer && this.cuUserList[i].userId == userId) {
    //     this.user = this.cuUserList[i];
    //   }
    // }
    if (this.user != null) {
      this.selectedPermission = [];
      var getper = this.user.permissions.split(';');
      for (var i = 0; i < getper.length; i++) {
        if (getper[i] != '') {
          if (this.selectedPermission.indexOf(getper[i]) > -1) {
            if (this.iskyraden) {
              this.selectedPermission.push(getper[i]);
            }
          }
          else {
            this.selectedPermission.push(getper[i]);
          }
        }
      }


      this.user.Name = this.user.name;
      this.user.UserID = this.user.userId;
      this.user.Password = "";
      this.user.ConfirmPassword = "";
      try {
        var getaddress = JSON.parse(this.user.adr1);
        //this.user.adr = "adr": "[\"" + this.user.adr1 + "\",\"" + this.user.adr1 + "\",\"" + (this.cityno != 4 ? this.user.city : '') + "\",\"" + (this.cityno == 4 ? this.user.city : '') + "\",\"" + "\"]",
        //this.user.city = this.user.adr2;      
        this.user.adr1 = getaddress[0];
        this.user.adr2 = getaddress[1];
        this.user.city = (this.cityno == 3 ? getaddress[2] : getaddress[3]);
      } catch (ex) { }
      this.user.EmailAddress = this.user.email;
      //this.selectedship=this.user.shiptolist;
      this.user.chkActive = this.user.active;
      this.user.manager = this.user.IsManager;
      this.confirmPass = false;
      this.AllowO = (this.selectedPermission.indexOf("OR") > -1 ? "OR" : "OE");
      var index = this.selectedPermission.indexOf(this.AllowO);
      this.selectedPermission.splice(index, 1);
      this.getAllPermission();
      this.getAllAddress();
      this.isShowForm = true;
      this.isShowMsg = false;
      if (this.user.profile_log != undefined && this.user.profile_log != null && this.user.profile_log != '') {
        this.selected_prof_label_arr = JSON.parse(this.user.profile_log.toLowerCase());
      }
      this.getProfileLabel(false);
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
          if(this.iskyraden){
            //console.log('permiss[i]',permiss[i]);
            this.selectedPermission.push(permiss[i].PermissionCode);
          }
        }
      }
    })
  }

  getAllAddress() {
    var custId = Common.getWithExpiry("CustID");
    this.registerService.getAllAddress(custId).subscribe((res: any) => {
      this.addrLst = res;
      this.selectedship = [];

      for (let ppl of this.addrLst) {
        if(this.iskyraden){    
          this.selectedship.push(ppl.ship_id);
        }
        ppl.adr = JSON.parse(ppl.adr);
        ppl.textad = ppl.ship_id + ' - ' + ppl.name;
        for (let ttl of ppl.adr) {
          if (ttl != '') {
            ppl.textad = ppl.textad + ttl;
          }
        }
        try {
          for (let dd of this.user.shiptolist) {
            if (ppl.ship_id == dd) {
              this.selectedship.push(ppl);
            }
          }
        } catch (ex) { }
        ppl.textad = ppl.textad + ', ' + ppl.state + ', ' + ppl.country_code;
      }
    })
  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  togglePostalCodeFlag() {
    if(this.iskyraden){
    this.isPostalCodeValid = false;
    this.openAddressvalidationpopup();
    }
    else{
      this.isPostalCodeValid = true;
    }
  }
  openAddressvalidationpopup(): void {
    this.sendMessage('start');
    var model = {
          "addressLine1": this.user.adr1,
          "addressLine2": this.user.adr2,
          "countryCode": this.user.county_code,
          "state": this.user.state,
          "postalCode": this.user.postal_code,
    }
    this.dataService.GetValidStreetAddress(model).subscribe((data: any) => {
      this.addressList = data;
      this.sendMessage('stop');

      if (this.addressList && this.addressList.length > 1) {
        this.addressList.forEach(item => {
          let temp = {
            AddressLine1: Array.isArray(item.AddressKeyFormat.AddressLine) ? item.AddressKeyFormat.AddressLine[0] : item.AddressKeyFormat.AddressLine,
            AddressLine2: Array.isArray(item.AddressKeyFormat.AddressLine) && item.AddressKeyFormat.AddressLine.length > 1 ? item.AddressKeyFormat.AddressLine[1] : "",
            Country: item.AddressKeyFormat.CountryCode,
            State: item.AddressKeyFormat.PoliticalDivision1,
            City: item.AddressKeyFormat.PoliticalDivision2,
            PostalCode: item.AddressKeyFormat.PostcodePrimaryLow + '-' + item.AddressKeyFormat.PostcodeExtendedLow,
          }
          this.newArray.push(temp);
        });
        const dialogRef = this.dialog.open(AddressvalidationpopupComponent, {
          data: { userList: this.newArray },
          width: '600px',
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
           this.isPostalCodeValid = true;
           this.user.adr1 = result.addressLine1;
           this.user.adr2 = result.addressLine2;
           this.user.postal_code = result.postalCode;
           this.user.city = result.city;
          }
        });
      }
      else if (this.addressList.length == 1) {
        this.user.adr1 = Array.isArray(this.addressList[0].AddressKeyFormat.AddressLine) ? this.addressList[0].AddressKeyFormat.AddressLine[0] : this.addressList[0].AddressKeyFormat.AddressLine,
        this.user.adr2 = Array.isArray(this.addressList[0].AddressKeyFormat.AddressLine) && this.addressList[0].AddressKeyFormat.AddressLine.length > 1 ? this.addressList[0].AddressKeyFormat.AddressLine[1] : "",
        this.user.city = this.addressList[0].AddressKeyFormat.PoliticalDivision2;
        this.user.postal_code = `${this.addressList[0].AddressKeyFormat.PostcodePrimaryLow}-${this.addressList[0].AddressKeyFormat.PostcodeExtendedLow}`;
        this.isPostalCodeValid = true;
      } else {
        this.isPostalCodeValid = false;
        this.toastr.error("Enter Valid Postalcode", 'Message!');
        return;
      }
    })
  }
  onSubmit(form: NgForm) {

    if (form.invalid)
      return;



    if (this.user.Name == undefined || this.user.Name == null || this.user.Name == '') {
      this.toastr.error("Please Insert Name", 'Message!');
      const element = this.renderer.selectRootElement("#userName");
      element.focus();
      return;
    }
    if ((this.user.UserID == undefined || this.user.UserID == null || this.user.UserID == '') && !this.iskyraden) {
      this.toastr.error("Please Insert UserID", 'Message!');
      const element = this.renderer.selectRootElement("#userUserID");
      element.focus();
      return;
    }

    if (this.user.first_name == undefined || this.user.first_name == null || this.user.first_name == '') {
      this.toastr.error("Please Insert First Name", 'Message!');
      const element = this.renderer.selectRootElement("#userfirst_name");
      element.focus();
      return;
    }
    if (this.user.last_name == undefined || this.user.last_name == null || this.user.last_name == '') {
      this.toastr.error("Please Insert Last Name", 'Message!');
      const element = this.renderer.selectRootElement("#userlast_name");
      element.focus();
      return;
    }
    if (this.user.adr1 == undefined || this.user.adr1 == null || this.user.adr1 == '') {
      this.toastr.error("Please Insert Address", 'Message!');
      const element = this.renderer.selectRootElement("#adr1");
      element.focus();
      return;
    }
    if (this.user.city == undefined || this.user.city == null || this.user.city == '') {
      this.toastr.error("Please Insert city", 'Message!');
      const element = this.renderer.selectRootElement("#City");
      element.focus();
      return;
    }
    if (this.user.state == undefined || this.user.state == null || this.user.state == 0) {
      this.toastr.error("Please Insert State", 'Message!');
      document.getElementById("State").scrollIntoView();
      return;
    }
    if (this.user.postal_code == undefined || this.user.postal_code == null || this.user.postal_code == '') {
      this.toastr.error("Please Insert Postal Code", 'Message!');
      const element = this.renderer.selectRootElement("#postal_code");
      element.focus();
      return;
    }
    if (this.user.EmailAddress == undefined || this.user.EmailAddress == null || this.user.EmailAddress == '') {
      this.toastr.error("Please Insert EmailAddress", 'Message!');
      const element = this.renderer.selectRootElement("#EmailAddress");
      element.focus();
      return;
    }

    if (form.value.Password != form.value.ConfirmPassword) {
      this.confirmPass = true;
      return;
    }

    var permission: string = "";

    for (let p of this.selectedPermission) {
      permission += p + ";"
    }
    var getshi = [];
    for (let p of this.selectedship) {
      getshi.push(p.ship_id);
    }

    permission = permission + this.AllowO + ";";
    this.userObj.customer = Common.getWithExpiry("CustID");
    this.userObj.ParentID = Common.getWithExpiry("CustID");
    if (this.iskyraden) {
      this.user.UserID = this.user.EmailAddress;
    }
    this.userObj.userId = this.user.UserID;
    if (this.user.Password != null && this.user.Password != undefined && this.user.Password != '') {
      if (this.passwordpolicy1 == '1') {
        if (passwordPolicy.hasLowerCase(this.user.Password) == false) {
          this.toastr.error("Password should contain One Lower Case Character", 'Message!');
          const element = this.renderer.selectRootElement("#Password");
          element.focus();
          return;
        }
        if (passwordPolicy.hasUpperCase(this.user.Password) == false) {
          this.toastr.error("Password should contain One Upper Case Character", 'Message!');
          const element = this.renderer.selectRootElement("#Password");
          element.focus();
          return;
        }
        if (passwordPolicy.hasNumber(this.user.Password) == false) {
          this.toastr.error("Password should contain One Numeric value", 'Message!');
          const element = this.renderer.selectRootElement("#Password");
          element.focus();
          return;
        }
        if (passwordPolicy.hasSpecialCharacter(this.user.Password) == false) {
          this.toastr.error("Password should contain One Special Character", 'Message!');
          const element = this.renderer.selectRootElement("#Password");
          element.focus();
          return;
        }
        if (this.user.Password.length < 8 || this.user.Password.length > 20) {
          this.toastr.error("Password Length should not be less then 8 and greater then 20 characters", 'Message!');
          const element = this.renderer.selectRootElement("#Password");
          element.focus();
          return;
        }
      }
      this.userObj.password = this.registerService.encrypted('8080808080808080', this.user.Password); //Md5.hashStr(this.user.Password);
    }

    this.userObj.name = this.user.Name;
    this.userObj.email = this.user.EmailAddress;

    this.userObj.active = this.user.chkActive;
    this.userObj.IsManager = this.user.manager;
    this.userObj.permissions = permission;
    this.userObj.Titled = this.user.Titled;
    this.userObj.first_name = this.user.first_name;
    this.userObj.last_name = this.user.last_name;
    this.userObj.adr1 = "[\"" + this.user.adr1 + "\",\"" + (this.user.adr2 == undefined ? "" : (this.user.adr2 == null ? "" : this.user.adr2)) + "\",\"" + (this.cityno != 4 ? this.user.city : '') + "\",\"" + (this.cityno == 4 ? this.user.city : '') + "\",\"" + "\",\"" + "\"]",
      this.userObj.phone = this.user.phone;
    this.userObj.phone_ext = this.user.phone_ext;
    this.userObj.cell = this.user.cell;
    this.userObj.state = this.user.state;
    this.userObj.county_code = this.user.county_code;
    this.userObj.postal_code = this.user.postal_code;
    this.userObj.shiptolist = getshi;
    this.userObj.company_sy = Common.getWithExpiry("company_sy");
    if (!this.showOldPermission) {
      this.userObj.isNewPermission = true;
      this.userObj.profile_log = JSON.stringify(this.selected_prof_label_arr);
    }
    if (this.TextUpperCase == '1') {
      try {
        this.userObj = this.ConvertKeysToUpperCase(this.userObj);
      } catch (esd) { }
    }
    if (this.user.Password != null && this.user.Password != undefined && this.user.Password != '') {
      this.userObj.password = this.registerService.encrypted('8080808080808080', this.user.Password); //Md5.hashStr(this.user.Password);
    }
    this.registerService.insertCuUser(this.userObj).subscribe((res: any) => {
      this.userObj = {};
      form.reset();
      this.ngOnInit()
      this.isShowMsg = true;
      this.isShowForm = false;
      this.toastr.success(res);
      // if (this.isedit == false) {
      //this.toastr.success("User Created Successfully....");
      // }
      // else {
      //   this.toastr.success("User Updated Successfully....");
      // }
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

  getProfileLabel(isAdd) {
    this.registerService.GetProfileLabel().subscribe((res: any) => {
      var data = res;
      if (data != undefined && data != null) {
        this.prof_label1 = JSON.parse(data.prof_label);
        this.prof_label2 = JSON.parse(data.prof_label2);
        this.prof_label3 = JSON.parse(data.prof_label3);
      }
      this.prof_label_arr = [];

      if (isAdd) {
        for (var i = 0; i < this.prof_label1.length; i++) {
          if (this.prof_label1[i] != undefined && this.prof_label1[i] != null && this.prof_label1[i] != "") {
            if (i == 1) {
              if (this.ismanageron == '1' || this.ismanageron == 1) {
                this.prof_label_arr.push({ "label": this.prof_label1[i], "value": false });
              }
            }
            else {
              this.prof_label_arr.push({ "label": this.prof_label1[i], "value": false });
            }
          }
        }

        for (var j = 0; j < this.prof_label2.length; j++) {
          if (this.prof_label2[j] != undefined && this.prof_label2[j] != null && this.prof_label2[j] != "") {
            this.prof_label_arr.push({ "label": this.prof_label2[j], "value": false });
          }
        }

        for (var k = 0; k < this.prof_label3.length; k++) {
          if (this.prof_label3[k] != undefined && this.prof_label3[k] != null && this.prof_label3[k] != "") {
            this.prof_label_arr.push({ "label": this.prof_label3[k], "value": false });
          }
        }
        //setTimeout(function () {
        $(".active").prop('checked', true);
        //}, 1000);
      }
      else {
        var count = 0;
        for (var i = 0; i < this.prof_label1.length; i++) {
          if (this.prof_label1[i] != undefined && this.prof_label1[i] != null && this.prof_label1[i] != "") {
            this.prof_label_arr.push({ "label": this.prof_label1[i], "value": this.selected_prof_label_arr[count] });
          }
          count++;
        }

        for (var j = 0; j < this.prof_label2.length; j++) {
          if (this.prof_label2[j] != undefined && this.prof_label2[j] != null && this.prof_label2[j] != "") {
            this.prof_label_arr.push({ "label": this.prof_label2[j], "value": this.selected_prof_label_arr[count] });
          }
          count++;
        }

        for (var k = 0; i < this.prof_label3.length; k++) {
          if (this.prof_label3[k] != undefined && this.prof_label3[k] != null && this.prof_label3[k] != "") {
            this.prof_label_arr.push({ "label": this.prof_label3[k], "value": this.selected_prof_label_arr[count] });
          }
          count++;
        }
      }


    })
  }

  updateProfLabelSelection(event) {
    // if (event.target.className == "active" && event.target.checked) {
    //   $(".nolonger").prop('checked', false);
    //   $(".sunil").attr('disabled', false);
    // }

    // if (event.target.className == "nolonger" && event.target.checked) {
    //   $(".active").prop('checked', false);
    //   $(".sunil").attr('disabled', true);
    // }

    var count = 0;
    var index = 0;
    for (var i = 0; i < this.prof_label1.length; i++) {
      if (this.prof_label1[i] == event.target.name) {
        index = count;
      }
      count++;
    }

    for (var j = 0; j < this.prof_label2.length; j++) {
      if (this.prof_label2[j] == event.target.name) {
        index = count;
      }
      count++;
    }

    for (var k = 0; k < this.prof_label3.length; k++) {
      if (this.prof_label3[k] == event.target.name) {
        index = count;
      }
      count++;
    }

    for (var l = 0; l < this.selected_prof_label_arr.length; l++) {
      if (l == index) {
        this.selected_prof_label_arr[l] = event.target.checked;
      }
    }


  }
}
