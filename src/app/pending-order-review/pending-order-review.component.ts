import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { Router } from '../../../node_modules/@angular/router';
import { DataService } from '../services/data.service';
import { Common } from '../../app/model/common.model';
import { SEOService } from '../services/seo.service';
@Component({
    selector: 'app-pending-order-review',
    templateUrl: './pending-order-review.component.html',
    styleUrls: ['./pending-order-review.component.scss']
})
export class PendingOrderReviewComponent implements OnInit {
    paymentType: any;
    orderList: any = [];
    page: number = 1;
    totalPage: number;
    IsShow: Boolean = true;
    sorttype: any = 1;
    constructor(private seoService: SEOService,  private checkoutService: CheckoutService, private router: Router) {     
        var geturl = Common.getWithExpiry("cpname");
        this.seoService.setPageTitle('Pending Order Review - ' + geturl);
        this.seoService.setkeywords('Pending Order Review - ' + geturl);
        this.seoService.setdescription('Pending Order Review - ' + geturl);
        
    } 
    gototop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    ngOnInit() {
        this.gototop();
        this.getPendingOrdersCount();
        this.getPendingOrders(this.page);
        this.getPaymentType();
    }
    getPendingOrdersCount() {
        this.checkoutService.getPendingOrderReviewCount(Common.getWithExpiry("CustID"),Common.getWithExpiry("UserID")).subscribe((res:any) => {
            var getdata = res;
            this.totalPage = (res == null ? 0 : getdata.count);
            this.IsShow = (res == null ? false : (getdata.count > 9 ? true : false));
        });
    }

    getPendingOrders(pageno) {
        this.checkoutService.getPendingOrder(Common.getWithExpiry("CustID"),Common.getWithExpiry("UserID")).subscribe((res:any) => {
            this.orderList = res;
        })
        return pageno;
    }
    getPaymentType() {
        this.checkoutService.getPaymentTerms(Common.getWithExpiry("CustID")).subscribe((res:any) => {
            this.paymentType = res;
        });
    }

    reviewOrder(orderid) {
        this.checkoutService.getSingleOrder(orderid).subscribe((res:any) => {
            var result = res;
            var headLN = {
                "customer": result.head.customer,
                "rec_type": result.head.rec_type,
                "CardHolderName": result.head.ord_class,
                "warehouse": result.head.warehouse,
                "ship_id": result.head.ship_id,
                "ship_via_code": result.head.ship_via_code,
                "order_by": result.head.order_by,
                "enter_by": result.head.order_by,
                "terms_code": result.head.terms_code,
                "email": result.head.email,
                "source_code": result.head.source_code,
                "job_rel": result.head.rec_type,
                "wanted_date": result.head.wanted_date,
                "paymentTypeList": this.paymentType,
                "cu_po": result.head.cu_po,
                "order": orderid,
                "orderby_phone": result.head.orderby_phone,
                "ship_via_acct": result.head.ship_via_acct,
                "Phone": result.head.bill_phone,
                "cell_phone": result.head.bill_phone,
                "billFax": result.head.bill_fax,
                "billAdr": result.head.bill_adr,
                "o_tot_taxable_it": result.head.o_tot_taxable_it,
                "o_tot_tax_amt": result.head.o_tot_tax_amt,
                "o_tot_net_ar": "3",
                "CardNumber": result.head.CardNumber,
                "ExpirationDate": (result.head.ExpirationMonth != undefined ? result.head.ExpirationMonth.toString() : '') + (result.head.ExpirationYear != undefined ? result.head.ExpirationYear.toString() : ''),
                "SecurityCode": result.head.SecurityCode,
                "ExpirationMonth": result.head.ExpirationMonth,
                "ExpirationYear": result.head.ExpirationYear,
                "CardType": result.head.CardType,
                "c_tot_code_1": "FR",
                "c_tot_code_amt_1": result.head.ord_class,
            };

            var Line = [];

            for (var i=0;i<result.lines.length;i++) {
                Line.push({
                    "image": result.lines[i].image,
                    "reference": result.lines[i].reference,
                    "item": result.lines[i].item,
                    "quantity": result.lines[i].quantity,
                    "um_o": result.lines[i].um_o,
                    "Note": result.lines[i].note,
                    "descr1": JSON.parse(result.lines[i].descr),
                    "descr": JSON.parse(result.lines[i].descr),
                    "price": result.lines[i].price,
                    "price_per": result.lines[i].price_per,
                    "product_line": result.lines[i].productline
                });
            }

            var finalObj = {
                "head": headLN,
                "lines": Line,
                "notes": result.head.notes,
                "echo": true,
                "complete": result.complete,
            }
            Common.setWithExpiry("finalObj", JSON.stringify(finalObj));
            this.router.navigate(['review-order', 'review']);
        });
    }

}
