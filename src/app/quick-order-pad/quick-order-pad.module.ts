import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickOrderPadComponent } from './quick-order-pad.component';
import { QuickOrderPadRoutingModule } from './quick-order-pad-routing.module';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../model/shared.module';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  declarations: [
    QuickOrderPadComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgbTypeaheadModule,
    QuickOrderPadRoutingModule
  ],
 
})
export class QuickOrderPadModule { }
