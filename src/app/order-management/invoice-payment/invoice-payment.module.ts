import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicePaymentComponent } from './invoice-payment.component';
import { invoicepaymentRoutingModule } from './invoice-payment-routing.module';
import { FormsModule } from '@angular/forms';
import { sharedModule } from 'src/app/shared.module';





@NgModule({
  declarations: [
    InvoicePaymentComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,   
    sharedModule,
    invoicepaymentRoutingModule
  ],
 
})
export class invoicepaymentModule { }
