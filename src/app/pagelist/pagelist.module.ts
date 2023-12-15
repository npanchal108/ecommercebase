import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { pagelistRoutingModule } from './pagelist-routing.module';
import { pagelistComponent } from './pagelist.component';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared.module';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [
    pagelistComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    pagelistRoutingModule,
    NgxPaginationModule,
  ],
 
})
export class pagelistModule { }
