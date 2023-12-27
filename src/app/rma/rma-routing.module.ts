import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../model/auth-guard.guard';

import { rmaComponent } from './rma.component';



const routes: Routes = [{ path: '', component: rmaComponent, canActivate: [AuthGuardGuard]  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class rmaRoutingModule { }
