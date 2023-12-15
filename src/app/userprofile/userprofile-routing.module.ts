import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userprofileComponent } from './userprofile.component';



const routes: Routes = [{ path: '', component: userprofileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class userprofileRoutingModule { }
