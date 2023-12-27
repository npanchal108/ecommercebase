import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { allcategoryRoutingModule } from './all-category-routing.module';
import { AllCategoryComponent } from './all-category.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { sharedModule } from '../model/shared.module';




@NgModule({
  declarations: [
    AllCategoryComponent,
    
    
  ],
  imports: [
    CommonModule,
    sharedModule,
    NgxPaginationModule,
    allcategoryRoutingModule,
    
  ],
 
})
export class allcategoryModule { }
