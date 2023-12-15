import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { Common } from '../../app/model/common.model';
import { DataService } from '../services/data.service';
// import * as $ from 'jquery';
import * as parser from 'parse-address'
@Component({
  selector: 'app-new-customers',
  templateUrl: './new-customers.component.html',
  styleUrls: ['./new-customers.component.scss']
})
export class NewCustomersComponent implements OnInit {
  newCustomer: any = {};
  submitNewCustomer: any;
  businessTypes: any;
  getCustomer: any;
  getOrders: any;
  countryList: any;
  stateList: any;

  isBusinessType: boolean = false;
  isPreferred: boolean = false;
  isOrdered: boolean = false;
  isSubstitutions: boolean = false;
  isResidential: boolean = false;
  isStateValidation: boolean = false;
  isCountry: boolean = false;
  isaddressparse: any;
  constructor(private dataService: DataService, private seoService: SEOService, private router: Router, private registerService: RegistrationService, private toastr: ToastrService) {
    var geturl = Common.getWithExpiry("cpname");    
    this.seoService.setPageTitle('Registration - '+geturl);
    this.seoService.setkeywords('Registration - '+geturl);
    this.seoService.setdescription('Registration - '+geturl);
    
    this.GetconfigurationfroAddressParser();
    this.getBusiness()
    this.getCustomerMethods()
    this.getOrderMethods()
    this.getCountry()
    this.getStates("US");
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  ngOnInit() {
    this.gototop();
    this.newCustomer.selectedBtype = "0";
    this.newCustomer.selectedPmethod = "0";
    this.newCustomer.orderPmethod = "0";
    this.newCustomer.substitutions = "0";
    this.newCustomer.residential = "0";
    this.newCustomer.selectedState = "0";
    this.newCustomer.selectedCity = "0";
    this.newCustomer.Country1 = "US";
    this.newCustomer.Country2 = "US";



  }
  GetconfigurationfroAddressParser() {
    this.isaddressparse = Common.getWithExpiry("isaddressparse");
    if (this.isaddressparse == null || this.isaddressparse == undefined || this.isaddressparse == '') {
      this.dataService.GetconfigurationfroAddressParser().subscribe((res:any) => {
        this.isaddressparse = res;
        Common.setWithExpiry("isaddressparse", this.isaddressparse);
      });
    }
  }
  addreparser() {
    if (this.newCustomer.addressparser == undefined || this.newCustomer.addressparser == null || this.newCustomer.addressparser == '') {
      this.toastr.error("Please enter address first");
    }
    else {      
      var parsed = parser.parseLocation(this.newCustomer.addressparser);      
      this.newCustomer.Address1=(parsed.number==undefined?"":parsed.number)+' '+(parsed.prefix==undefined?"":parsed.prefix)+' '+(parsed.street==undefined?"":parsed.street) +' '+(parsed.type==undefined?"":parsed.type);
      this.newCustomer.City1=parsed.city;
      this.newCustomer.State1=parsed.state.toUpperCase();
      this.newCustomer.Zip1=parsed.zip;
      // $("#Address1").val((parsed.number==undefined?"":parsed.number)+' '+(parsed.prefix==undefined?"":parsed.prefix)+' '+(parsed.street==undefined?"":parsed.street) +' '+(parsed.type==undefined?"":parsed.type));
      // $("#City").val(parsed.city);
      // $("#State").val(parsed.state);
      // $("#PostalCode").val(parsed.zip);
      
    }
  }
  getBusiness() {
    this.registerService.getBusinessTypes().subscribe((res:any) => {
      this.businessTypes = res;
    })
  }
  getCustomerMethods() {
    this.registerService.getCustomerMethod().subscribe((res:any) => {
      this.getCustomer = res;
    })
  }
  getCountry() {
    this.registerService.getCountry().subscribe((res:any) => {
      this.countryList = res;

    })
  }
  getStates(val) {
    this.registerService.getState(val).subscribe((res:any) => {
      this.stateList = res;
    })
  }
  getOrderMethods() {
    this.registerService.getAllOrdereMethod().subscribe((res:any) => {
      this.getOrders = res;
    })
  }
  newCustomerSubmit(form: NgForm) {
    if (this.newCustomer.BusinessType == null || this.newCustomer.BusinessType == undefined || this.newCustomer.BusinessType == '') {
      this.toastr.warning("Please Select Business Type", 'Message!');
      return;
    }
    if (this.newCustomer.CustomerMethod == null || this.newCustomer.CustomerMethod == undefined || this.newCustomer.CustomerMethod == '') {
      this.toastr.warning("Please Select Customer Method", 'Message!');
      return;
    }
    if (this.newCustomer.PreferredMethod == null || this.newCustomer.PreferredMethod == undefined || this.newCustomer.PreferredMethod == '') {
      this.toastr.warning("Please Select Preferred Method", 'Message!');
      return;
    }
    if (this.newCustomer.CompanyName == null || this.newCustomer.CompanyName == undefined || this.newCustomer.CompanyName == '') {
      this.toastr.warning("Please Insert Company Name", 'Message!');
      return;
    }
    if (this.newCustomer.Address1 == null || this.newCustomer.Address1 == undefined || this.newCustomer.Address1 == '') {
      this.toastr.warning("Please Insert Address1", 'Message!');
      return;
    }
    if (this.newCustomer.Address2 == null || this.newCustomer.Address2 == undefined || this.newCustomer.Address2 == '') {
      this.toastr.warning("Please Insert Address2", 'Message!');
      return;
    }
    if (this.newCustomer.substitutions == null || this.newCustomer.substitutions == undefined || this.newCustomer.substitutions == '') {
      this.toastr.warning("Please Insert Substitutions", 'Message!');
      return;
    }
    if (this.newCustomer.City1 == null || this.newCustomer.City1 == undefined || this.newCustomer.City1 == '') {
      this.toastr.warning("Please Insert City1", 'Message!');
      return;
    }
    if (this.newCustomer.State1 == null || this.newCustomer.State1 == undefined || this.newCustomer.State1 == '') {
      this.toastr.warning("Please Insert State1", 'Message!');
      return;
    }
    if (this.newCustomer.Zip1 == null || this.newCustomer.Zip1 == undefined || this.newCustomer.Zip1 == '') {
      this.toastr.warning("Please Insert Zip1", 'Message!');
      return;
    }
    if (this.newCustomer.Country1 == null || this.newCustomer.Country1 == undefined || this.newCustomer.Country1 == '') {
      this.toastr.warning("Please Insert Country1", 'Message!');
      return;
    }
    if (this.newCustomer.Phone1 == null || this.newCustomer.Phone1 == undefined || this.newCustomer.Phone1 == '') {
      this.toastr.warning("Please Insert Phone1", 'Message!');
      return;
    }
    if (this.newCustomer.Email1 == null || this.newCustomer.Email1 == undefined || this.newCustomer.Email1 == '') {
      this.toastr.warning("Please Insert Email1", 'Message!');
      return;
    }
    if (this.newCustomer.Name1 == null || this.newCustomer.Name1 == undefined || this.newCustomer.Name1 == '') {
      this.toastr.warning("Please Insert Name1", 'Message!');
      return;
    }
    if (this.newCustomer.Address3 == null || this.newCustomer.Address3 == undefined || this.newCustomer.Address3 == '') {
      this.toastr.warning("Please Insert Address3", 'Message!');
      return;
    }
    if (this.newCustomer.Residential1 == null || this.newCustomer.Residential1 == undefined || this.newCustomer.Residential1 == '') {
      this.toastr.warning("Please Insert Address3", 'Message!');
      return;
    }
    if (this.newCustomer.City2 == null || this.newCustomer.City2 == undefined || this.newCustomer.City2 == '') {
      this.toastr.warning("Please Insert City2", 'Message!');
      return;
    }
    if (this.newCustomer.State2 == null || this.newCustomer.State2 == undefined || this.newCustomer.State2 == '') {
      this.toastr.warning("Please Insert State2", 'Message!');
      return;
    }
    if (this.newCustomer.Country2 == null || this.newCustomer.Country2 == undefined || this.newCustomer.Country2 == '') {
      this.toastr.warning("Please Insert Country2", 'Message!');
      return;
    }
    if (this.newCustomer.Zip2 == null || this.newCustomer.Zip2 == undefined || this.newCustomer.Zip2 == '') {
      this.toastr.warning("Please Insert Zip2", 'Message!');
      return;
    }
    if (this.newCustomer.Phone2 == null || this.newCustomer.Phone2 == undefined || this.newCustomer.Phone2 == '') {
      this.toastr.warning("Please Insert Phone2", 'Message!');
      return;
    }
    if (this.newCustomer.Phone2 == null || this.newCustomer.Phone2 == undefined || this.newCustomer.Phone2 == '') {
      this.toastr.warning("Please Insert Phone2", 'Message!');
      return;
    }

    var NewCustomerViewModel = {
      "business_type": (this.newCustomer.BusinessType == undefined ? "" : this.newCustomer.BusinessType),
      "customer_method": (this.newCustomer.CustomerMethod == undefined ? "" : this.newCustomer.CustomerMethod),
      "prefer_method": (this.newCustomer.PreferredMethod == undefined ? "" : this.newCustomer.PreferredMethod),
      "company_name": (this.newCustomer.CompanyName == undefined ? "" : this.newCustomer.CompanyName),
      "add_1": (this.newCustomer.Address1 == undefined ? "" : this.newCustomer.Address1),
      "add_2": (this.newCustomer.Address2 == undefined ? "" : this.newCustomer.Address2),
      "substitutions": (this.newCustomer.substitutions == undefined ? "" : this.newCustomer.substitutions.toString()),
      "city_1": (this.newCustomer.City1 == undefined ? "" : this.newCustomer.City1),
      "state_1": (this.newCustomer.State1 == undefined ? "" : this.newCustomer.State1),
      "zip_1": (this.newCustomer.Zip1 == undefined ? "" : this.newCustomer.Zip1),
      "country_1": (this.newCustomer.Country1 == undefined ? "" : this.newCustomer.Country1),
      "territory": (this.newCustomer.Territory == undefined ? "" : this.newCustomer.Territory),
      "phone_1": (this.newCustomer.Phone1 == undefined ? "" : this.newCustomer.Phone1),
      "fax_1": (this.newCustomer.Fax1 == undefined ? "" : this.newCustomer.Fax1),
      "email_1": (this.newCustomer.Email1 == undefined ? "" : this.newCustomer.Email1),
      "name_1": (this.newCustomer.Name1 == undefined ? "" : this.newCustomer.Name1),
      "add_3": (this.newCustomer.Address3 == undefined ? "" : this.newCustomer.Address3),
      "add_4": (this.newCustomer.Address4 == undefined ? "" : this.newCustomer.Address4),
      "residential_1": (this.newCustomer.Residential1 == undefined ? "" : this.newCustomer.Residential1.toString()),
      "city_2": (this.newCustomer.City2 == undefined ? "" : this.newCustomer.City2),
      "country_2": (this.newCustomer.Country2 == undefined ? "" : this.newCustomer.Country2),
      "territory_1": (this.newCustomer.Territory1 == undefined ? "" : this.newCustomer.Territory1),
      "zip_2": (this.newCustomer.Zip2 == undefined ? "" : this.newCustomer.Zip2),
      "phone_2": (this.newCustomer.Phone2 == undefined ? "" : this.newCustomer.Phone2),
      "fax_2": (this.newCustomer.Fax2 == undefined ? "" : this.newCustomer.Fax2),
      "checp_no": (this.newCustomer.ChepNo == undefined ? "" : this.newCustomer.ChepNo),
      "own_manager_1": (this.newCustomer.OwnManger1 == undefined ? "" : this.newCustomer.OwnManger1),
      "own_manager_2": (this.newCustomer.OwnManger2 == undefined ? "" : this.newCustomer.OwnManger2),
      "own_manager_3": (this.newCustomer.OwnManger3 == undefined ? "" : this.newCustomer.OwnManger3),
      "buyer_name_1": (this.newCustomer.BuyerName1 == undefined ? "" : this.newCustomer.BuyerName1),
      "buyer_name_2": (this.newCustomer.BuyerName2 == undefined ? "" : this.newCustomer.BuyerName2),
      "buyer_name_3": (this.newCustomer.BuyerName3 == undefined ? "" : this.newCustomer.BuyerName3),
      "app_manager_1": (this.newCustomer.AppManager1 == undefined ? "" : this.newCustomer.AppManager1),
      "app_manager_2": (this.newCustomer.AppManager2 == undefined ? "" : this.newCustomer.AppManager2),
      "app_manager_3": (this.newCustomer.AppManager3 == undefined ? "" : this.newCustomer.AppManager3),
      "receiving_name_1": (this.newCustomer.ReceivingName1 == undefined ? "" : this.newCustomer.ReceivingName1),
      "receiving_name_2": (this.newCustomer.ReceivingName2 == undefined ? "" : this.newCustomer.ReceivingName2),
      "receiving_name_3": (this.newCustomer.ReceivingName3 == undefined ? "" : this.newCustomer.ReceivingName3),
      "phone_3": (this.newCustomer.Phone3 == undefined ? "" : this.newCustomer.Phone3),
      "type_account": (this.newCustomer.TypeAccount == undefined ? "" : this.newCustomer.TypeAccount),
      "email_2": (this.newCustomer.Email2 == undefined ? "" : this.newCustomer.Email2),
      "Creditors_Name": (this.newCustomer.Creditors_Name == undefined ? "" : this.newCustomer.Creditors_Name),
      "Contact_Person": (this.newCustomer.Contact_Person == undefined ? "" : this.newCustomer.Contact_Person),
      "Phones1": (this.newCustomer.Phones1 == undefined ? "" : this.newCustomer.Phones1),
      "Email_Address": (this.newCustomer.Email_Address == undefined ? "" : this.newCustomer.Email_Address),
      "Creditors_Name1": (this.newCustomer.Creditors_Name1 == undefined ? "" : this.newCustomer.Creditors_Name1),
      "Contact_Person1": (this.newCustomer.Contact_Person1 == undefined ? "" : this.newCustomer.Contact_Person1),
      "Phones2": (this.newCustomer.Phones2 == undefined ? "" : this.newCustomer.Phones2),
      "Email_Address1": (this.newCustomer.Email_Address1 == undefined ? "" : this.newCustomer.Email_Address1),
      "Creditors_Name2": (this.newCustomer.Creditors_Name2 == undefined ? "" : this.newCustomer.Creditors_Name2),
      "Contact_Person2": (this.newCustomer.Contact_Person2 == undefined ? "" : this.newCustomer.Contact_Person2),
      "Phones3": (this.newCustomer.Phones3 == undefined ? "" : this.newCustomer.Phones3),
      "Email_Address2": (this.newCustomer.Email_Address2 == undefined ? "" : this.newCustomer.Email_Address2),
      "Creditors_Name3": (this.newCustomer.Creditors_Name3 == undefined ? "" : this.newCustomer.Creditors_Name3),
      "Contact_Person3": (this.newCustomer.Contact_Person3 == undefined ? "" : this.newCustomer.Contact_Person3),
      "Phones4": (this.newCustomer.Phones4 == undefined ? "" : this.newCustomer.Phones4),
      "Email_Address3": (this.newCustomer.Email_Address3 == undefined ? "" : this.newCustomer.Email_Address3),
      "state_2": (this.newCustomer.State2 == undefined ? "" : this.newCustomer.State2),
      "bank": (this.newCustomer.bank == undefined ? "" : this.newCustomer.bank),
      "acount": (this.newCustomer.acount == undefined ? "" : this.newCustomer.acount),
      "Phone3": (this.newCustomer.Phone3 == undefined ? "" : this.newCustomer.Phone3),
      "TypeAccount": (this.newCustomer.TypeAccount == undefined ? "" : this.newCustomer.TypeAccount),
      "ContactPerson": (this.newCustomer.ContactPerson == undefined ? "" : this.newCustomer.ContactPerson),
      "Email2": (this.newCustomer.Email2 == undefined ? "" : this.newCustomer.Email2),

    }

    this.registerService.insertnewcustomerapplication(NewCustomerViewModel).subscribe((res:any) => {
      this.submitNewCustomer = res;
      if (this.submitNewCustomer == '1') {
        this.toastr.success("Your Request Successfully Submitted", 'Message!');
        this.router.navigate(['login']);
      }
      else {
        this.toastr.error("Error is occured please try again", 'Message!');
      }
    })
  }
}
