import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MajProdComponent } from './maj-prod.component';


const routes: Routes = [{ path: '', component: MajProdComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MajProdRoutingModule { }
