import { Component, OnInit } from '@angular/core';
import { SEOService } from '../services/seo.service';
import { Common } from '../model/common.model';
import { DataService } from '../services/data.service';
import { LoadingService } from '../services/loading.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-pagelist',
  templateUrl: './pagelist.component.html',
  styleUrls: ['./pagelist.component.scss']
})
export class pagelistComponent implements OnInit {
  dynamicpagelist: any;
  ListTypeView: any = '1';
  private _routerSub = Subscription.EMPTY;
  totalLinePage: any;
  pageNo: number = 1;
  pagesize: any = 45;
  ptype: any;
  constructor(private seoService: SEOService,   private loadingService: LoadingService,private route: ActivatedRoute, private dataService: DataService, private router: Router) {
    this.gototop();
    this._routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url.indexOf("/info") != -1 || this.router.url.indexOf("/blogs") != -1 || this.router.url.indexOf("/services") != -1 || this.router.url.indexOf("/our-lines") != -1) {
          this.ngOnInit();
        }
        
        
      });

  }
  sendMessage(message): void {
    this.loadingService.LoadingMessage(message);
  }
  getcounts() {
    this.sendMessage('start');
    this.dataService.GetPagelistbytypecounts(this.ptype).subscribe((res: any) => {
      this.totalLinePage = res;
      this.sendMessage('stop');
      this.Getpagelistbytype();
    });
  }

  GetNewPageSizeNew(pagesize) {
    this.pagesize = pagesize;
    this.Getpagelistbytype();
  }

  setlistview(listview) {
    this.ListTypeView = listview;
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  ngOnInit() {
    if (this.router.url.indexOf("/services") != -1) {
      this.ptype = 'services';
      this.ListTypeView = '1';
    this.pageNo = 1;
    this.pagesize = 45;
    this.getcounts();
    }
    else if (this.router.url.indexOf("/info") != -1) {
      this.ptype = 'info';
      this.ListTypeView = '1';
    this.pageNo = 1;
    this.pagesize = 45;
    this.getcounts();
    }
    else if (this.router.url.indexOf("/blogs") != -1) {
      this.ptype = 'blogs';
      this.ListTypeView = '1';
    this.pageNo = 1;
    this.pagesize = 45;
    this.getcounts();
    }
    else if (this.router.url.indexOf("/our-lines") != -1) {
      this.ptype = 'our-lines';
      this.ListTypeView = '1';
    this.pageNo = 1;
    this.pagesize = 45;
    this.getcounts();
    }
  }
  bindProducts(pageno) {
    this.pageNo = pageno;

    this.Getpagelistbytype();
  }

  Getpagelistbytype() {
    this.sendMessage('start');
    this.dataService.GetPagelistbytype(this.pageNo, this.pagesize, this.ptype).subscribe((data: any) => {
      this.dynamicpagelist = data;
      this.sendMessage('stop');
    });
  }

  getFacebookShareLink(pageTitle): string {
    const currentUrl = window.location.href;
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${currentUrl}/${pageTitle}`)}`;
  }
  getlinkedinShareLink(pageTitle): string {
    const currentUrl = window.location.href;
    return `https://www.linkedin.com/share?url=${currentUrl}/${pageTitle}`;
  }

  getInstaShareLink(pageTitle): string {
    const currentUrl = window.location.href;
    return `https://www.instagram.com/share?url=${currentUrl}/${pageTitle}`;
  }

  getPinterestShareLink(pageTitle, image, description): string {
    const urlToShare = `${window.location.href}/${pageTitle}`;
    return `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      urlToShare
    )}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(
      description
    )}`;
  }
  

  getTwitterShareLink(pageTitle): string {
    const urlToShare = `${window.location.href}/${pageTitle}`;
    const text = pageTitle; // Replace with your desired text
    return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      urlToShare
    )}&text=${encodeURIComponent(text)}`;
  }

}
