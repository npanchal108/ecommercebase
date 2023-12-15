import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { subusersComponent } from './subusers.component';
import { subusersRoutingModule } from './subusers-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { sharedModule } from '../shared.module';




@NgModule({
  declarations: [
    subusersComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
    subusersRoutingModule
  ],
 
})
export class subusersModule { }
