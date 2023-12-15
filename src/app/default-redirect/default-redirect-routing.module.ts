import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { defaultredirectComponent } from './default-redirect.component';



const routes: Routes = [{ path: '', component: defaultredirectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class defaultredirectRoutingModule { }
