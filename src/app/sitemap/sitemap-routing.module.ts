import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sitemapComponent } from './sitemap.component';


const routes: Routes = [{ path: '', component: sitemapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitemapRoutingModule { }
