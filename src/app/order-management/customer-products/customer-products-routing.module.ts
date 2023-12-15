import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerProductsComponent } from './customer-products.component';



const routes: Routes = [{ path: '', component: CustomerProductsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class customerproductsRoutingModule { }
