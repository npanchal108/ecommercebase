import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingAddressComponent } from './shipping-address.component';
import { shippingaddressRoutingModule } from './shipping-address-routing.module';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared.module';




@NgModule({
  declarations: [
    ShippingAddressComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    shippingaddressRoutingModule
  ],
 
})
export class shippingaddressModule { }
