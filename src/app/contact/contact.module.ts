import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { contactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';

import { RecaptchaModule } from 'ng-recaptcha';
import { sharedModule } from '../model/shared.module';




@NgModule({
  declarations: [
    ContactComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    RecaptchaModule,
    contactRoutingModule,
  ],
 
})
export class contactModule { }
