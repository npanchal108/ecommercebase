import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewOrderComponent } from './review-order.component';
import { revieworderRoutingModule } from './review-order-routing.module';
import { sharedModule } from '../shared.module';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    ReviewOrderComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
  revieworderRoutingModule
  ],
 
})
export class revieworderModule { }
