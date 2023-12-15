import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewOrderComponent } from './review-order.component';


const routes: Routes = [{ path: '', component: ReviewOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class revieworderRoutingModule { }
