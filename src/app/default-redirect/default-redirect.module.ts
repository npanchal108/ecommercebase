import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { defaultredirectComponent } from './default-redirect.component';
import { defaultredirectRoutingModule } from './default-redirect-routing.module';
import { sharedModule } from '../model/shared.module';




@NgModule({
  declarations: [
    defaultredirectComponent,
    
  ],
  imports: [
    CommonModule,
    sharedModule,
    defaultredirectRoutingModule
  ],
 
})
export class defaultredirectModule { }
