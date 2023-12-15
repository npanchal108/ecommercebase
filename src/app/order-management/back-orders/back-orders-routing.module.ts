import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOrdersComponent } from './back-orders.component';



const routes: Routes = [{ path: '', component: BackOrdersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class backordersRoutingModule { }
