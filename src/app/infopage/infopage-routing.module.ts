import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { infopageComponent } from './infopage.component';


const routes: Routes = [{ path: '', component: infopageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class infopageRoutingModule { }
