import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { contactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared.module';
import { RecaptchaModule } from 'ng-recaptcha';




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
