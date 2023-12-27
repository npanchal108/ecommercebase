import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { rmaRoutingModule } from './rma-routing.module';
import { rmaComponent } from './rma.component';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../model/shared.module';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';






@NgModule({
  declarations: [
    rmaComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgbTypeaheadModule,
    rmaRoutingModule,
    
  ],
 
})
export class rmaModule { }
