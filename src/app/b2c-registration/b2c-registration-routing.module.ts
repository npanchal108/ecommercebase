import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { B2cRegistrationComponent } from './b2c-registration.component';



const routes: Routes = [{ path: '', component: B2cRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class b2cregistrationRoutingModule { }
