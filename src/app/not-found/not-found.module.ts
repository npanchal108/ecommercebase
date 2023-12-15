import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { notfoundRoutingModule } from './not-found-routing.module';
import { sharedModule } from '../model/shared.module';





@NgModule({
  declarations: [
    NotFoundComponent,
    
  ],
  imports: [
    CommonModule,
    sharedModule,
    notfoundRoutingModule,
    
  ],
 
})
export class notfoundModule { }
