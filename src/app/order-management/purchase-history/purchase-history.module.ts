import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseHistoryComponent } from './purchase-history.component';
import { purchasehistoryRoutingModule } from './purchase-history-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


import { DpDatePickerModule } from 'ng2-date-picker';
import { sharedModule } from '../../model/shared.module';


@NgModule({
  declarations: [
    PurchaseHistoryComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgxPaginationModule,
    purchasehistoryRoutingModule,
    DpDatePickerModule
  ],
 
})
export class purchasehistoryModule { }
