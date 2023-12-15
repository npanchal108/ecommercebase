import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { checkoutRoutingModule } from './checkout-routing.module';
import { FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';
import { sharedModule } from '../shared.module';




@NgModule({
  declarations: [
    CheckoutComponent,
   
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    DpDatePickerModule,
    checkoutRoutingModule
  ],
 
})
export class checkoutModule { }
