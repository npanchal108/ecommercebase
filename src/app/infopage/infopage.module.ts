import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { infopageRoutingModule } from './infopage-routing.module';
import { infopageComponent } from './infopage.component';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared.module';




@NgModule({
  declarations: [
    infopageComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    infopageRoutingModule,
    
  ],
 
})
export class infopageModule { }
