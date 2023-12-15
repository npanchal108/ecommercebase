import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RfqlistComponent } from './rfqlist.component';


const routes: Routes = [{ path: '', component: RfqlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class rfqlistRoutingModule { }
