import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPreviewComponent } from './cart-preview.component';
import { CartPreviewRoutingModule } from './cart-preview-routing.module';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../model/shared.module';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    CartPreviewComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgbTypeaheadModule,
    CartPreviewRoutingModule,
    
  ],
 
})
export class CartPreviewModule { }
