import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { categoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

import { FormsModule } from '@angular/forms';
import { sharedModule } from '../model/shared.module';





@NgModule({
  declarations: [
    CategoryComponent,
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    categoryRoutingModule,
    
  ],
 
})
export class categoryModule { }
