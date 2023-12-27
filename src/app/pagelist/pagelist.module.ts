import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { pagelistRoutingModule } from './pagelist-routing.module';
import { pagelistComponent } from './pagelist.component';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { sharedModule } from '../model/shared.module';




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
