import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { subusersComponent } from './subusers.component';



const routes: Routes = [{ path: '', component: subusersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class subusersRoutingModule { }
