import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { rfqlistRoutingModule } from './rfqlist-routing.module';
import {RfqlistComponent } from './rfqlist.component';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../model/shared.module';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';







@NgModule({
  declarations: [
    RfqlistComponent,
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgbTypeaheadModule,
    rfqlistRoutingModule
    
  ],
 
})
export class rfqlistModule { }
