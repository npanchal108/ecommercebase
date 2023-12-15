import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { k2cRegistrationComponent } from './k2c-registration.component';



const routes: Routes = [{ path: '', component: k2cRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class k2cregistrationRoutingModule { }
