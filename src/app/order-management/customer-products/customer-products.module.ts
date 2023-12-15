import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerProductsComponent } from './customer-products.component';
import { customerproductsRoutingModule } from './customer-products-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { sharedModule } from 'src/app/shared.module';




@NgModule({
  declarations: [
    CustomerProductsComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgxPaginationModule,
    customerproductsRoutingModule
  ],
 
})
export class customerproductsModule { }
