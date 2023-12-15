import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManagementComponent } from './order-management.component';
import { ordermanagementRoutingModule } from './order-management-routing.module';
import { sharedModule } from '../shared.module';
import { FormsModule } from '@angular/forms';




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
