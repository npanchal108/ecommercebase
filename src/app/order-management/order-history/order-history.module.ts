import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderHistoryComponent } from './order-history.component';
import { orderhistoryRoutingModule } from './order-history-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DpDatePickerModule } from 'ng2-date-picker';
import { sharedModule } from '../../model/shared.module';





@NgModule({
  declarations: [
    OrderHistoryComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    sharedModule,
    DpDatePickerModule,
    orderhistoryRoutingModule
  ],
 
})
export class orderhistoryModule { }
