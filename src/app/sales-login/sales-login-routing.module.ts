import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesLoginComponent } from './sales-login.component';



const routes: Routes = [{ path: '', component: SalesLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class salesloginRoutingModule { }
