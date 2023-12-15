import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingOrderReviewComponent } from './pending-order-review.component';
import { pendingorderreviewRoutingModule } from './pending-order-review-routing.module';
import { sharedModule } from '../shared.module';




@NgModule({
  declarations: [
    PendingOrderReviewComponent,
    
  ],
  imports: [
    CommonModule,
    sharedModule,
    pendingorderreviewRoutingModule
  ],
 
})
export class pendingorderreviewModule { }
