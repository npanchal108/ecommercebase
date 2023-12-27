import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCustomersComponent } from './new-customers.component';
import { newcustomersRoutingModule } from './new-customers-routing.module';
import { FormsModule } from '@angular/forms';

import { RecaptchaModule } from 'ng-recaptcha';
import { sharedModule } from '../model/shared.module';




@NgModule({
  declarations: [
    NewCustomersComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    RecaptchaModule,
    newcustomersRoutingModule
  ],
 
})
export class newcustomersModule { }
