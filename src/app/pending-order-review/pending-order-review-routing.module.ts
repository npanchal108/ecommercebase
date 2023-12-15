import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingOrderReviewComponent } from './pending-order-review.component';



const routes: Routes = [{ path: '', component: PendingOrderReviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class pendingorderreviewRoutingModule { }
