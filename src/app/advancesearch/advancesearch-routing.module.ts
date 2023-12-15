import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancesearchComponent } from './advancesearch.component';



const routes: Routes = [{ path: '', component: AdvancesearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class advancesearchRoutingModule { }
