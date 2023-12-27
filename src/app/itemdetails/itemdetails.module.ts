import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemDetailsRoutingModule } from './itemdetails-routing.module';
import { ItemDetailsComponent, MyPopupComponent } from './itemdetails.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../model/shared.module';




@NgModule({
  declarations: [
    ItemDetailsComponent,
    MyPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgxPaginationModule,
    ItemDetailsRoutingModule, 
  ],
 
})
export class ItemDetailsModule { }
