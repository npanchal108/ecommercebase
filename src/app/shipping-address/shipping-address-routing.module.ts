import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingAddressComponent } from './shipping-address.component';



const routes: Routes = [{ path: '', component: ShippingAddressComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class shippingaddressRoutingModule { }
