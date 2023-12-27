import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { addyourcardRoutingModule } from './addyourcard-routing.module';
import { AddyourcardComponent } from './addyourcard.component';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../model/shared.module';





@NgModule({
  declarations: [
    AddyourcardComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    addyourcardRoutingModule,
    
  ],
 
})
export class addyourcardModule { }
