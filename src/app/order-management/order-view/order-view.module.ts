import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderViewComponent } from './order-view.component';
import { orderviewRoutingModule } from './order-view-routing.module';
import { FormsModule } from '@angular/forms';
import { sharedModule } from 'src/app/shared.module';




@NgModule({
  declarations: [
    OrderViewComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    orderviewRoutingModule
  ],
 
})
export class orderviewModule { }
