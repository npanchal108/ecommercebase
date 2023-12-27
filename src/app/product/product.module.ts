import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { productRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../model/shared.module';




@NgModule({
  declarations: [
    ProductComponent,
        
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgxPaginationModule,
    productRoutingModule,

    
  ],
 
})
export class productModule { }
