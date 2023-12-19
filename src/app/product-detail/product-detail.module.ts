import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductDetailComponent } from './product-detail.component';

//import { OrderModule } from 'ngx-order-pipe';
import { FormsModule } from '@angular/forms';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { sharedModule } from '../../app/model/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
// import { PdfViewerModule } from 'ng2-pdf-viewer';



@NgModule({
  declarations: [
    ProductDetailComponent,
        
  ],
  imports: [
    CommonModule,
   // OrderModule,
    FormsModule,
    sharedModule,
    NgxGalleryModule,
    ProductDetailRoutingModule,
    SlickCarouselModule,
    //PdfViewerModule
  ],
 
})
export class ProductDetailModule { }
