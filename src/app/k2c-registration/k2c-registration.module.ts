import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { k2cregistrationRoutingModule } from './k2c-registration-routing.module';
import { k2cRegistrationComponent } from './k2c-registration.component';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared.module';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';



@NgModule({
  declarations: [
    k2cRegistrationComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    RecaptchaModule,
    k2cregistrationRoutingModule,
    
  ],
 
})
export class k2cregistrationModule { }
