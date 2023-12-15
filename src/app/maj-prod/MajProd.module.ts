import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MajProdRoutingModule } from './MajProd-routing.module';
import { MajProdComponent } from './maj-prod.component';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared.module';




@NgModule({
  declarations: [
    MajProdComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    MajProdRoutingModule,
    
  ],
 
})
export class MajProdModule { }
