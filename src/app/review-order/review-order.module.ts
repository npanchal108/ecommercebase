import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewOrderComponent } from './review-order.component';
import { revieworderRoutingModule } from './review-order-routing.module';

import { FormsModule } from '@angular/forms';
import { sharedModule } from '../model/shared.module';





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
