import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SouthernQuotesComponent } from './southern-quotes.component';



const routes: Routes = [{ path: '', component: SouthernQuotesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class southernquotesRoutingModule { }
