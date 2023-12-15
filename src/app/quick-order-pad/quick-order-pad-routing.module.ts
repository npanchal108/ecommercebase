import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickOrderPadComponent } from './quick-order-pad.component';


const routes: Routes = [{ path: '', component: QuickOrderPadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickOrderPadRoutingModule { }
