import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Common } from '../model/common.model';
import { SEOService } from '../services/seo.service';
// import { IpServiceService } from '../ip-service.service';
@Component({
  selector: 'app-advancesearch',
  templateUrl: './advancesearch.component.html',
  styleUrls: ['./advancesearch.component.scss']
})
export class AdvancesearchComponent implements OnInit {
  skeywoard: any;
  keytype: any;
  itemnums: any;
  productlines: any;
  treelines: any;
  sorttype: any;
  brandList: any;
  treeList: any;
  selectedPermission: any = [];
  selectedtree: any = [];
  warehouse: any;
  ipAddress: string;
  Allconfigurationlist:any;
  treenodeAdvance:any;
  productlineAdvance:any;
  constructor(private seoService: SEOService, private menuService: MenuService, private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.gototop();
      this.warehouse = (Common.getWithExpiry("warehouse") != null ? (Common.getWithExpiry("warehouse") != "" ? Common.getWithExpiry("warehouse") : "") : "");
      this.GetAllConfigurations();
    });
  }
  GetAllConfigurations() {
    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      try {
        this.Allconfigurationlist = JSON.parse(Common.getWithExpiry("Allconfigs"));
      } catch (ed) { }
    }
    if (this.Allconfigurationlist == null || this.Allconfigurationlist == undefined || this.Allconfigurationlist == '') {
      this.dataService.GetAllConfiguration().subscribe((data: any) => {
        this.Allconfigurationlist = data;
        Common.setWithExpiry("Allconfigs", JSON.stringify(this.Allconfigurationlist));
        for (var i = 0; i < this.Allconfigurationlist.length; i++) {
          
          if (this.Allconfigurationlist[i].ConfigKey == "treenodeAdvance") {
            this.treenodeAdvance = this.Allconfigurationlist[i].ConfigValue;
            if(this.treenodeAdvance=='1'){
              try{
                if(Common.getWithExpiry("GetTreeListForAdvanceSearch")!=undefined){
              var treeList = JSON.parse(Common.getWithExpiry("GetTreeListForAdvanceSearch"));
                }
            }catch(ed){}
              if (treeList == undefined || treeList == null || treeList.length == 0) {
                this.dataService.GetTreeListForAdvanceSearch().subscribe((res:any) => {
                  this.treeList = res;
                  Common.setWithExpiry("GetTreeListForAdvanceSearch", JSON.stringify(this.treeList));
                });
              }
              else{
                this.treeList =treeList;
              }
            }     
          }
          if (this.Allconfigurationlist[i].ConfigKey == "productlineAdvance") {
            this.productlineAdvance = this.Allconfigurationlist[i].ConfigValue;
            if(this.productlineAdvance=='1'){
              try{
                if(Common.getWithExpiry("getBrandProduct" + this.warehouse + Common.getWithExpiry("CustID"))!=undefined){
              var brandList = JSON.parse(Common.getWithExpiry("getBrandProduct" + this.warehouse + Common.getWithExpiry("CustID")));
                }
            }catch(ed){}
              if (brandList == undefined || brandList == null || brandList.length == 0) {
                this.dataService.getBrandProduct(this.warehouse, Common.getWithExpiry("CustID")).subscribe((res:any) => {
                  this.brandList = res;
                  Common.setWithExpiry("getBrandProduct" + this.warehouse + Common.getWithExpiry("CustID"), JSON.stringify(this.brandList));
                });
              }
              else{
                this.brandList=brandList;
              }
            }      
          }
          
        }
      })
    }
    else {
      for (var i = 0; i < this.Allconfigurationlist.length; i++) {
        if (this.Allconfigurationlist[i].ConfigKey == "treenodeAdvance") {
          this.treenodeAdvance = this.Allconfigurationlist[i].ConfigValue;
          if(this.treenodeAdvance=='1'){
            try{
              if(Common.getWithExpiry("GetTreeListForAdvanceSearch")!=undefined){
            var treeList = JSON.parse(Common.getWithExpiry("GetTreeListForAdvanceSearch"));
              }
          }catch(ed){}
            if (treeList == undefined || treeList == null || treeList.length == 0) {
              this.dataService.GetTreeListForAdvanceSearch().subscribe((res:any) => {
                this.treeList = res;
                Common.setWithExpiry("GetTreeListForAdvanceSearch", JSON.stringify(this.treeList));
              });
            }
            else{
              this.treeList =treeList;
            }
          }     
        }
        if (this.Allconfigurationlist[i].ConfigKey == "productlineAdvance") {
          this.productlineAdvance = this.Allconfigurationlist[i].ConfigValue;
          if(this.productlineAdvance=='1'){
            try{
              if(Common.getWithExpiry("getBrandProduct" + this.warehouse + Common.getWithExpiry("CustID"))!=undefined){
            var brandList = JSON.parse(Common.getWithExpiry("getBrandProduct" + this.warehouse + Common.getWithExpiry("CustID")));
              }
          }catch(ed){}
            if (brandList == undefined || brandList == null || brandList.length == 0) {
              this.dataService.getBrandProduct(this.warehouse, Common.getWithExpiry("CustID")).subscribe((res:any) => {
                this.brandList = res;
                Common.setWithExpiry("getBrandProduct" + this.warehouse + Common.getWithExpiry("CustID"), JSON.stringify(this.brandList));
              });
            }
            else{
              this.brandList=brandList;
            }
          }      
        }
        
      }
    }
  }
  

  

  




  ngOnInit() {
    this.keytype = 1;
    this.sorttype = 1;
    var geturl = Common.getWithExpiry("cpname");    
    
    this.seoService.setPageTitle('Advanced Search - '+geturl);
    this.seoService.setkeywords('Advanced Search - '+ geturl);
    this.seoService.setdescription('Advanced Search - '+ geturl);
    //this.getIP();
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  updatePermission(event) {
    if (event.target.checked) {
      this.selectedPermission.push(event.target.name);
    }
    else {
      var index = this.selectedPermission.indexOf(event.target.name);
      this.selectedPermission.splice(index, 1);
    }
  }
  updatetreelist(event) {
    if (event.target.checked) {
      this.selectedtree.push(event.target.name);
    }
    else {
      var index = this.selectedtree.indexOf(event.target.name);
      this.selectedtree.splice(index, 1);
    }
  }
  beginsearch() {
    this.productlines = '';
    for (let pr of this.selectedPermission) {
      this.productlines = this.productlines + pr + ",";
    }
    this.treelines = '';
    for (let pr of this.selectedtree) {
      this.treelines = this.treelines + pr + ",";
    }
    var getobj = {
      keywords: this.skeywoard,
      keytype: this.keytype,
      itemnumbers: this.itemnums,
      productLines: this.productlines,
      treeLines: this.treelines,
      otype: this.sorttype,
      warehouse: this.warehouse
    }
    Common.setWithExpiry("searchad", JSON.stringify(getobj));

    // var model = {
    //   "LogType": "AdvanceSearch",
    //   "Description": "",
    //   "SearchKeyword": JSON.stringify(model),
    //   "CustID":Common.getWithExpiry("CustID"),
    //   "UserId": Common.getWithExpiry("UserID"),
    //   "ClientIP": this.ipAddress
    // }

    // this.dataService.AddActivityLog(model).subscribe((res: any) => {
    
    // });

    this.router.navigate(['asearch', 'asearch']);
  }
  ResetForm() {
    try{
    window.location.reload();
    }catch(e){}
  }
}
