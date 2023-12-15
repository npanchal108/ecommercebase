import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Common } from '../model/common.model';
import { DataService } from '../services/data.service';
import { LoadingService } from '../services/loading.service';
@Component({
  selector: 'app-NotFound',
  templateUrl: './default-redirect.component.html',
  styleUrls: ['./default-redirect.component.scss']
})
export class defaultredirectComponent implements OnInit {
  Defaultredirect: any;
  constructor( private loadingService: LoadingService,private dataService: DataService, private router: Router,) {
    this.GetDefaultredirect();
  }


  ngOnInit() {

  }
  GetDefaultredirect() {
    this.Defaultredirect = this.dataService.Getconfigbykey("Defaultredirect");
    if (this.Defaultredirect == null || this.Defaultredirect == undefined || this.Defaultredirect == '') {
      this.Defaultredirect = Common.getWithExpiry("Defaultredirect");
    }
    else {
      if (this.Defaultredirect != undefined && this.Defaultredirect != null && this.Defaultredirect != '') {
        //this.router.navigate([this.Defaultredirect]);
        this.router.navigateByUrl(this.Defaultredirect, { skipLocationChange: true });
      }
    }
    if (this.Defaultredirect == null || this.Defaultredirect == undefined || this.Defaultredirect == '') {
      this.loadingService.LoadingMessage('start');
      this.dataService.GetDefaultredirect().subscribe((data: any) => {
        this.Defaultredirect = data;
        this.loadingService.LoadingMessage('stop');
        Common.setWithExpiry("Defaultredirect", this.Defaultredirect);
        if (this.Defaultredirect != undefined && this.Defaultredirect != null && this.Defaultredirect != '') {
          //this.router.navigate([this.Defaultredirect]);
          this.router.navigateByUrl(this.Defaultredirect, { skipLocationChange: true });
        }
      })
    }
    else {
      if (this.Defaultredirect != undefined && this.Defaultredirect != null && this.Defaultredirect != '') {
        this.router.navigate([this.Defaultredirect]);
      }
    }
  }

}
