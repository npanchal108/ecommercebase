import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickOrderPadComponent } from './quick-order-pad.component';
import { QuickOrderPadRoutingModule } from './quick-order-pad-routing.module';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';




@NgModule({
  declarations: [
    QuickOrderPadComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    TypeaheadModule.forRoot(),
    QuickOrderPadRoutingModule
  ],
 
})
export class QuickOrderPadModule { }
