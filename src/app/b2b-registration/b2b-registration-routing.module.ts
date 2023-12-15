import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { B2bRegistrationComponent } from './b2b-registration.component';


const routes: Routes = [{ path: '', component: B2bRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class b2bregistrationRoutingModule { }
