import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { advancesearchRoutingModule } from './advancesearch-routing.module';
import { AdvancesearchComponent } from './advancesearch.component';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared.module';




@NgModule({
  declarations: [
    AdvancesearchComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    advancesearchRoutingModule,
    
  ],
 
})
export class advancesearchModule { }
