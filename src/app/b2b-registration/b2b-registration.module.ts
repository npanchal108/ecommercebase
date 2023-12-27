import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { b2bregistrationRoutingModule } from './b2b-registration-routing.module';
import { B2bRegistrationComponent } from './b2b-registration.component';
import { FormsModule } from '@angular/forms';

import { RecaptchaModule } from 'ng-recaptcha';
import { sharedModule } from '../model/shared.module';




@NgModule({
  declarations: [
    B2bRegistrationComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,    
    RecaptchaModule,
    b2bregistrationRoutingModule,
    
  ],
 
})
export class b2bregistrationModule { }
