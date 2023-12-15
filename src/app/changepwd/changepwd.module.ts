import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangepwdComponent } from './changepwd.component';
import { changepwdRoutingModule } from './changepwd-routing.module';
import { sharedModule } from '../shared.module';
import { FormsModule } from '@angular/forms';




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
