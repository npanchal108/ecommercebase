import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../auth-guard.guard';
import { AddyourcardComponent } from './addyourcard.component';


const routes: Routes = [{ path: '', component: AddyourcardComponent,canActivate: [AuthGuardGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class addyourcardRoutingModule { }
