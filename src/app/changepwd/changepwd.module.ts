import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangepwdComponent } from './changepwd.component';
import { changepwdRoutingModule } from './changepwd-routing.module';

import { FormsModule } from '@angular/forms';
import { sharedModule } from '../model/shared.module';




@NgModule({
  declarations: [
    ChangepwdComponent,
    
  ],
  imports: [
    CommonModule,
    sharedModule,
    FormsModule,
   changepwdRoutingModule
  ],
 
})
export class changepwdModule { }
