import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { loginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

import { RecaptchaModule } from 'ng-recaptcha';
import { sharedModule } from '../model/shared.module';





@NgModule({
  declarations: [
    LoginComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,  
    sharedModule,
    RecaptchaModule,
    loginRoutingModule
    
  ],
 
})
export class loginModule { }
