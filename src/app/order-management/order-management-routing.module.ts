import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../model/auth-guard.guard';

import { OrderManagementComponent } from './order-management.component';



const routes: Routes = [{ path: '', component: OrderManagementComponent,
children:[
  { path: 'pending-order',  canActivate: [AuthGuardGuard],
loadChildren: () => import('./pending-order/pending-order.module').then(m => m.pendingorderModule)
 },
 { path: 'open-shipment',  canActivate: [AuthGuardGuard],
 loadChildren: () => import('./open-shipment/open-shipment.module').then(m => m.openshipmentModule)
 },
 { path: 'back-orders', canActivate: [AuthGuardGuard],
 loadChildren: () => import('./back-orders/back-orders.module').then(m => m.backordersModule)
 },
 { path: 'expected-shipment', canActivate: [AuthGuardGuard],
 loadChildren: () => import('./back-orders/back-orders.module').then(m => m.backordersModule)
 },
 { path: 'invoices', canActivate: [AuthGuardGuard],
 loadChildren: () => import('./invoices/invoices.module').then(m => m.invoicesModule)
 },
 { path: 'order-history',  canActivate: [AuthGuardGuard],
 loadChildren: () => import('./order-history/order-history.module').then(m => m.orderhistoryModule)
 },
 { path: 'purchase-history', canActivate: [AuthGuardGuard],
 loadChildren: () => import('./purchase-history/purchase-history.module').then(m => m.purchasehistoryModule)
 },
 { path: 'customer-products', canActivate: [AuthGuardGuard],
 loadChildren: () => import('./customer-products/customer-products.module').then(m => m.customerproductsModule)
 },
 { path: 'helpdesk',  canActivate: [AuthGuardGuard],
 loadChildren: () => import('./help-desk/help-desk.module').then(m => m.helpdeskModule)
 },
 { path: 'order-view/:id/:type/:rec_type', canActivate: [AuthGuardGuard],
 loadChildren: () => import('./order-view/order-view.module').then(m => m.orderviewModule)
},
{ path: 'invoice-payment/:orderno/:seq',canActivate: [AuthGuardGuard],
loadChildren: () => import('./invoice-payment/invoice-payment.module').then(m => m.invoicepaymentModule)
}

]
 },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ordermanagementRoutingModule { }
