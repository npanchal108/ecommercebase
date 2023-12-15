import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCustomersComponent } from './new-customers.component';



const routes: Routes = [{ path: '', component: NewCustomersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class newcustomersRoutingModule { }
