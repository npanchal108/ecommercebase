import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicePaymentComponent } from './invoice-payment.component';



const routes: Routes = [{ path: '', component: InvoicePaymentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class invoicepaymentRoutingModule { }
