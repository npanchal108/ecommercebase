import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { rmaRoutingModule } from './rma-routing.module';
import { rmaComponent } from './rma.component';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';




@NgModule({
  declarations: [
    rmaComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    TypeaheadModule.forRoot(),
    rmaRoutingModule,
    
  ],
 
})
export class rmaModule { }
