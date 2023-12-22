import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitemapRoutingModule } from './sitemap-routing.module';
import { sitemapComponent } from './sitemap.component';
import { sharedModule } from '../model/shared.module';





@NgModule({
  declarations: [
    sitemapComponent,
    
  ],
  imports: [
    CommonModule,
    //sharedModule,
    SitemapRoutingModule,
    
  ],
 
})
export class SitemapModule { }
