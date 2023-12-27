import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManagementComponent } from './order-management.component';
import { ordermanagementRoutingModule } from './order-management-routing.module';

import { FormsModule } from '@angular/forms';
import { sharedModule } from '../model/shared.module';




@NgModule({
  declarations: [
    OrderManagementComponent,
    
  ],
  imports: [
    CommonModule,
    sharedModule,
    FormsModule,
   ordermanagementRoutingModule
  ],
 
})
export class ordermanagementModule { }
