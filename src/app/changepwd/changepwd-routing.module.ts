import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepwdComponent } from './changepwd.component';



const routes: Routes = [{ path: '', component: ChangepwdComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class changepwdRoutingModule { }
