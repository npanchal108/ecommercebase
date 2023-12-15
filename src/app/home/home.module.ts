import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { sharedModule } from '../model/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    sharedModule,
    HomeRoutingModule,
    SlickCarouselModule
  ],
 
})
export class HomeModule { }
