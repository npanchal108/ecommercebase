import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { userRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { sharedModule } from '../model/shared.module';
import { SelectDropDownModule } from 'ngx-select-dropdown';





@NgModule({
  declarations: [
    UserComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgxPaginationModule,
    SelectDropDownModule,
    userRoutingModule
  ],
 
})
export class userModule { }
