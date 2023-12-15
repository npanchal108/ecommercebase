import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPreviewComponent } from './cart-preview.component';
import { CartPreviewRoutingModule } from './cart-preview-routing.module';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'
import { sharedModule } from '../shared.module';



@NgModule({
  declarations: [
    CartPreviewComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    TypeaheadModule.forRoot(),
    CartPreviewRoutingModule,
    
  ],
 
})
export class CartPreviewModule { }
