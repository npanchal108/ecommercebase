import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouthernQuotesComponent } from './southern-quotes.component';
import { southernquotesRoutingModule } from './southern-quotes-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { sharedModule } from '../shared.module';




@NgModule({
  declarations: [
    SouthernQuotesComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgxPaginationModule,
    southernquotesRoutingModule
  ],
 
})
export class southernquotesModule { }
