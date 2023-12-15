import { Component, OnInit } from '@angular/core';

import { SEOService } from '../services/seo.service';
import { Common } from '../../app/model/common.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss']
})
export class sitemapComponent implements OnInit {
  
  urlheaderlist1: any;
  urlheaderlist2: any;

  urllisttodisplay1: any;
  urllisttodisplay2: any;
  constructor(private dataService: DataService) {
    this.gototop();
    this.Getvisiblesitemapdata();
  }
  Getvisiblesitemapdata() {
    this.dataService.Getvisiblesitemapdata().subscribe((data: any) => {
      var getdata1 = data;
      this.urllisttodisplay1 = getdata1.splice(0, (getdata1.length / 2));
      this.urllisttodisplay2 = getdata1;
      this.urlheaderlist1 = this.urllisttodisplay1
        .map((item: { header: any; }) => item.header)
        .filter((value: any, index: any, self: string | any[]) => self.indexOf(value) === index);
      this.urlheaderlist2 = this.urllisttodisplay2
        .map((item: { header: any; }) => item.header)
        .filter((value: any, index: any, self: string | any[]) => self.indexOf(value) === index);
    })
  }



  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  ngOnInit() {
  }


}
