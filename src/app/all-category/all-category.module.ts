import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { allcategoryRoutingModule } from './all-category-routing.module';
import { AllCategoryComponent } from './all-category.component';
import { sharedModule } from '../shared.module';
import { NgxPaginationModule } from 'ngx-pagination';




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
