import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { pagedetailsRoutingModule } from './pagedetails-routing.module';
import { pagedetailsComponent } from './pagedetails.component';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared.module';




@NgModule({
  declarations: [
    pagedetailsComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    pagedetailsRoutingModule,
    
  ],
 
})
export class pagedetailsModule { }
