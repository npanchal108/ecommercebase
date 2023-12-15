import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../model/auth-guard.guard';

import { DashboardComponent } from './dashboard.component';



const routes: Routes = [{ path: '', component: DashboardComponent,canActivate: [AuthGuardGuard]  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class dashboardRoutingModule { }
