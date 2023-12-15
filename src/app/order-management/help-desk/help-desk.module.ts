import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpDeskComponent } from './help-desk.component';
import { helpdeskRoutingModule } from './help-desk-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { sharedModule } from 'src/app/shared.module';




@NgModule({
  declarations: [
    HelpDeskComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    NgxPaginationModule,
    helpdeskRoutingModule
  ],
 
})
export class helpdeskModule { }
