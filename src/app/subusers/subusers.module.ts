import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { subusersComponent } from './subusers.component';
import { subusersRoutingModule } from './subusers-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { sharedModule } from '../model/shared.module';
import { SelectDropDownModule } from 'ngx-select-dropdown';




@NgModule({
  declarations: [
    subusersComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgxPaginationModule,
    SelectDropDownModule,
    subusersRoutingModule
  ],
 
})
export class subusersModule { }
