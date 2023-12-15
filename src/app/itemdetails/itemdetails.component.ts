import { Component, Inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.scss']
})

export class ItemDetailsComponent {
  itemDetailslist: any;
  private _routerSub = Subscription.EMPTY;
  totalLinePage: any;
  pageNo: number = 1;
  pagesize: any = 45;
  itype: any;
  filtersList: string[] = ['TDS', 'Literature', 'video'];
  selecctedsatags: string[] = [];
  setopenview: any = '0';
  searchText: string = '';
  type: any;
  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router, private dialog: MatDialog) {
    this.gototop();
    // this._routerSub = this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //   });
  }
  ngOnInit() {
    //this.GetInvalidItems();
    this.pageNo = 1;
    this.pagesize = 45;
    this.route.params.subscribe(params => {
      this.type = this.route.snapshot.paramMap.get('type');
      var search = this.route.snapshot.paramMap.get('search');
      if (search != undefined && search != null && search.length > 0) {
        this.searchText = search;
      }
      if (this.type != undefined && this.type != null && this.type.length > 0) {
        if (this.type.toLowerCase() == "tds") {
          this.addRemoveSatags("TDS");
        }
        if (this.type.toLowerCase() == "literature") {
          this.addRemoveSatags("Literature");
        }
        if (this.type.toLowerCase() == "video") {
          this.addRemoveSatags("video");
        }
      }
      this.getcounts();



    });
  }
  // GetInvalidItems() {
  //   this.dataService.GetInvalidItemsList().subscribe((res: any) => {
  //     console.log('InvalidItems',res);
  //   });
  // }
  getsetopenview(listvi) {
    listvi = (listvi == '1' ? '0' : '1');
    this.setopenview = listvi;
  }
  getcounts() {
    this.dataService.GetItemDetailsListCounts(this.selecctedsatags, this.searchText).subscribe((res: any) => {
      this.totalLinePage = res;
      console.log('this.totalLinePage', this.totalLinePage);
      this.GetItemDetailslist();
    });
  }
  GetNewPageSizeNew(pagesize) {
    this.pagesize = pagesize;
    this.bindProducts(this.pageNo);
  }
  gototop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  bindProducts(pageno) {
    console.log(pageno)
    this.pageNo = pageno;
    //this.getcounts();
    this.GetItemDetailslist();
    return pageno;
  }

  GetItemDetailslist() {
    this.dataService.GetItemDetailsList(this.pageNo, this.pagesize, this.selecctedsatags, this.searchText).subscribe((data: any) => {
      this.itemDetailslist = data;
      console.log('this.itemDetailslist', this.itemDetailslist);
    });
  }
  applyFilter() {
    if (this.searchText.length > 1) {
      this.getcounts();
    }
  }
  onReset() {
    this.searchText = '';
    this.selecctedsatags = [];
    this.getcounts();
  }

  addRemoveSatags(filterVal: string) {
    if (this.selecctedsatags.length === 1 && this.selecctedsatags[0] === filterVal.toLowerCase()) {
      // If the clicked checkbox is already selected, uncheck it
      this.selecctedsatags = [];
    } else {
      // Otherwise, select the clicked checkbox and unselect all others
      this.selecctedsatags = [filterVal.toLowerCase()];
    }
    this.getcounts(); // Update counts or perform other actions as needed
  }
  redirectToUrl(url: string) {
    window.open(url, '_blank');
  }

  openPopup(item): void {

    if (item.ItemType == 'video') {
      const htmlString = item.Url;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const iframe = doc.querySelector('iframe');
      if (iframe) {
        // Get the src attribute value
        const src = iframe.getAttribute('src');
        console.log('SRC:', src);
        const dialogRef = this.dialog.open(MyPopupComponent, {
          width: '560', // Set the width of the popup as needed
          data: src,
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
        });
      } else {
        console.log('No iframe found in the HTML string.');
      }

    }

    else {
      window.open(item.Url, '_blank');
    }
  }
}


@Component({
  selector: 'app-my-popup',
  templateUrl: './my-popup.component.html',
  styleUrls: ['./my-popup.component.css'],
})
export class MyPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<MyPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) { }

  closePopup(): void {
    this.dialogRef.close();
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}