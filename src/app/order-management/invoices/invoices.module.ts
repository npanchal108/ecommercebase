import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesComponent } from './invoices.component';
import { invoicesRoutingModule } from './invoices-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { sharedModule } from '../../model/shared.module';





@NgModule({
  declarations: [
    InvoicesComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgxPaginationModule,
    invoicesRoutingModule
  ],
 
})
export class invoicesModule { }
