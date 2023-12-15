import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingOrderComponent } from './pending-order.component';
import { pendingorderRoutingModule } from './pending-order-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { sharedModule } from 'src/app/shared.module';




@NgModule({
  declarations: [
    PendingOrderComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgxPaginationModule,
    pendingorderRoutingModule
  ],
 
})
export class pendingorderModule { }
