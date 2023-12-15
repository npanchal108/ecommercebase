import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../model/auth-guard.guard';

import { WishlistComponent } from './wishlist.component';


const routes: Routes = [{ path: '', component: WishlistComponent, canActivate: [AuthGuardGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class wishlistRoutingModule { }
