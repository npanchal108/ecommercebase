import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesLoginComponent } from './sales-login.component';
import { salesloginRoutingModule } from './sales-login-routing.module';
import { FormsModule } from '@angular/forms';

import { RecaptchaModule } from 'ng-recaptcha';
import { sharedModule } from '../model/shared.module';




@NgModule({
  declarations: [
    SalesLoginComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    RecaptchaModule,
    salesloginRoutingModule
  ],
 
})
export class salesloginModule { }
