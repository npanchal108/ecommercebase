import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOrdersComponent } from './back-orders.component';
import { backordersRoutingModule } from './back-orders-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { sharedModule } from 'src/app/shared.module';




@NgModule({
  declarations: [
    BackOrdersComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgxPaginationModule,
    backordersRoutingModule
  ],
 
})
export class backordersModule { }
