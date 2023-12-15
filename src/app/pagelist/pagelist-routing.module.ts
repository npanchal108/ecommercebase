import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pagelistComponent } from './pagelist.component';


const routes: Routes = [{ path: '', component: pagelistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class pagelistRoutingModule { }
