import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { b2cregistrationRoutingModule } from './b2c-registration-routing.module';
import { B2cRegistrationComponent } from './b2c-registration.component';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared.module';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';



@NgModule({
  declarations: [
    B2cRegistrationComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    RecaptchaModule,
    b2cregistrationRoutingModule,
    
  ],
 
})
export class b2cregistrationModule { }
