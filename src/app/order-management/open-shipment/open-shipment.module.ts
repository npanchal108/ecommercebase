import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenShipmentComponent } from './open-shipment.component';
import { openshipmentRoutingModule } from './open-shipment-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DpDatePickerModule } from 'ng2-date-picker';
import { sharedModule } from '../../model/shared.module';





@NgModule({
  declarations: [
    OpenShipmentComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    DpDatePickerModule,
    sharedModule,
    openshipmentRoutingModule
  ],
 
})
export class openshipmentModule { }
