import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pagedetailsComponent } from './pagedetails.component';


const routes: Routes = [{ path: '', component: pagedetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class pagedetailsRoutingModule { }
