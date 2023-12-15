import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userprofileComponent } from './userprofile.component';
import { userprofileRoutingModule } from './userprofile-routing.module';
import { sharedModule } from '../shared.module';




@NgModule({
  declarations: [
    userprofileComponent
    
  ],
  imports: [
    CommonModule,
    sharedModule,
    userprofileRoutingModule
  ],
 
})
export class userprofileModule { }
