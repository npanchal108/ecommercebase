import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { sharedModule } from '../model/shared.module';




@NgModule({
  declarations: [
    DashboardComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    SlickCarouselModule,
    SelectDropDownModule,
    dashboardRoutingModule
  ],
 
})
export class dashboardModule { }
