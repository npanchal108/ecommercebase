import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesLoginComponent } from './sales-login.component';
import { salesloginRoutingModule } from './sales-login-routing.module';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared.module';
import { RecaptchaModule } from 'ng-recaptcha';




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
