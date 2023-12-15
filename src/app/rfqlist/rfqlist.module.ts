import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { rfqlistRoutingModule } from './rfqlist-routing.module';
import {RfqlistComponent } from './rfqlist.component';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';





@NgModule({
  declarations: [
    RfqlistComponent,
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    TypeaheadModule.forRoot(),
    rfqlistRoutingModule
    
  ],
 
})
export class rfqlistModule { }
