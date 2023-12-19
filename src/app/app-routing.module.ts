import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { environment } from '../environments/environment.development';


export const AppRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () =>(environment.iscasafina ?  import('./dashboard/dashboard.module').then(m => m.dashboardModule) : import('./home/home.module').then(m => m.HomeModule))
  },
  {
    path: 'sitemap',
    loadChildren: () => import('./sitemap/sitemap.module').then(m => m.SitemapModule)
  },
  {
    path: 'wishlist/:item',
    loadChildren: () => import('./wishlist/wishlist.module').then(m => m.wishlistModule)
  },
  // {
  //   path: 'rfqlist/:item/:rfqid',canActivate: [AuthGuardGuard],
  //   loadChildren: () => import('./rfqlist/rfqlist.module').then(m => m.rfqlistModule)
  // },
  // {
  //   path: 'rfqlist',canActivate: [AuthGuardGuard],
  //   loadChildren: () => import('./rfqlist/rfqlist.module').then(m => m.rfqlistModule)
  // },
  // {
  //   path: 'rma/:item/:rfqid',canActivate: [AuthGuardGuard],
  //   loadChildren: () => import('./rma/rma.module').then(m => m.rmaModule)
  // },
  // {
  //   path: 'rma',canActivate: [AuthGuardGuard],
  //   loadChildren: () => import('./rma/rma.module').then(m => m.rmaModule)
  // },
  // {
  //   path: 'login/:customerId/:userId/:password',
  //   loadChildren: () => import('./login/login.module').then(m => m.loginModule)
  // },
  // {
  //   path: 'wishlist',
  //   loadChildren: () => import('./wishlist/wishlist.module').then(m => m.wishlistModule)
  // },
  // {
  //   path: 'advancesearch',
  //   loadChildren: () => import('./advancesearch/advancesearch.module').then(m => m.advancesearchModule)
  // },
  // {
  //   path: 'productlisting',
  //   loadChildren: () => import('./maj-prod/MajProd.module').then(m => m.MajProdModule)
  // },
  // {
  //   path: 'addyourcard/:id/:ctype',
  //   loadChildren: () => import('./addyourcard/addyourcard.module').then(m => m.addyourcardModule)
  // },
  // {
  //   path: 'addyourcard/:id/:type/:amount/:ctype',
  //   loadChildren: () => import('./addyourcard/addyourcard.module').then(m => m.addyourcardModule)
  // },
  // {
  //   path: 'library',
  //   loadChildren: () => import('./itemdetails/itemdetails.module').then(m => m.ItemDetailsModule)
  // },
  // {
  //   path: 'library/:type',
  //   loadChildren: () => import('./itemdetails/itemdetails.module').then(m => m.ItemDetailsModule)
  // },
  // {
  //   path: 'library/:type/:search',
  //   loadChildren: () => import('./itemdetails/itemdetails.module').then(m => m.ItemDetailsModule)
  // },
  // {
  //   path: 'products/:productName',
  //   loadChildren: () => import('./product/product.module').then(m => m.productModule)
  // },
  // {
  //   path: 'products/:productName/:desc',
  //   loadChildren: () => import('./product/product.module').then(m => m.productModule)
  // },
  // {
  //   path: 'productlist/:satanga',
  //   loadChildren: () => import('./product/product.module').then(m => m.productModule)
  // },
  // {
  //   path: 'product',
  //   loadChildren: () => import('./category/category.module').then(m => m.categoryModule)
  // },
  // {
  //   path: 'allcategory',
  //   loadChildren: () => import('./all-category/all-category.module').then(m => m.allcategoryModule)
  // },
  // {
  //   path: 'product/:name/:desc',
  //   loadChildren: () => import('./category/category.module').then(m => m.categoryModule)
  // },
  // {
  //   path: 'product/:name',
  //   loadChildren: () => import('./category/category.module').then(m => m.categoryModule)
  // },
  // {
  //   path: 'category/:category/:desc',
  //   loadChildren: () => import('./product/product.module').then(m => m.productModule)
  // },
  // {
  //   path: 'category/:category',
  //   loadChildren: () => import('./product/product.module').then(m => m.productModule)
  // },
  // {
  //   path: 'search/:searchtext',
  //   loadChildren: () => import('./product/product.module').then(m => m.productModule)
  // },
  // {
  //   path: 'asearch/:asearch', canActivate: [AuthGuardGuard],
  //   loadChildren: () => import('./product/product.module').then(m => m.productModule)
  // },
  // {
  //   path: 'contact',
  //   loadChildren: () => import('./contact/contact.module').then(m => m.contactModule)
  // },
  // {
  //   path: 'viewcart',
  //   loadChildren: () => import('./cart-preview/cart-preview.module').then(m => m.CartPreviewModule)
  // },
  {
    path: 'productdetail/:item',
    loadChildren: () => import('./product-detail/product-detail.module').then(m => m.ProductDetailModule)
  },
  {
    path: 'productdetail/:item/:desc',
    loadChildren: () => import('./product-detail/product-detail.module').then(m => m.ProductDetailModule)
  },
  // {
  //   path: 'info/:id/:desc',
  //   loadChildren: () => import('./infopage/infopage.module').then(m => m.infopageModule)
  // },
  // {
  //   path: 'services',
  //   loadChildren: () => import('./pagelist/pagelist.module').then(m => m.pagelistModule)
  // },
  // {
  //   path: 'services/:name',
  //   loadChildren: () => import('./pagedetails/pagedetails.module').then(m => m.pagedetailsModule)
  // },
  // {
  //   path: 'blogs',
  //   loadChildren: () => import('./pagelist/pagelist.module').then(m => m.pagelistModule)
  // },
  // {
  //   path: 'blogs/:name',
  //   loadChildren: () => import('./pagedetails/pagedetails.module').then(m => m.pagedetailsModule)
  // },
  // {
  //   path: 'our-lines',
  //   loadChildren: () => import('./pagelist/pagelist.module').then(m => m.pagelistModule)
  // },
  // {
  //   path: 'our-lines/:name',
  //   loadChildren: () => import('./pagedetails/pagedetails.module').then(m => m.pagedetailsModule)
  // },
  // {
  //   path: 'info',
  //   loadChildren: () => import('./pagelist/pagelist.module').then(m => m.pagelistModule)
  // },

  // {
  //   path: 'info/:name',
  //   loadChildren: () => import('./pagedetails/pagedetails.module').then(m => m.pagedetailsModule)
  // },

  // {
  //   path: 'b2b-registration',
  //   loadChildren: () => import('./b2b-registration/b2b-registration.module').then(m => m.b2bregistrationModule)
  // },
  // {
  //   path: 'registration',
  //   loadChildren: () => import('./b2c-registration/b2c-registration.module').then(m => m.b2cregistrationModule)
  // },
  // {
  //   path: 'create-account',
  //   loadChildren: () => import('./k2c-registration/k2c-registration.module').then(m => m.k2cregistrationModule)
  // },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.loginModule)
  },
  {
    path: '404',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.notfoundModule)
  },
  {
    path: 'login/:customerId/:userId/:password',
    loadChildren: () => import('./login/login.module').then(m => m.loginModule)
  },
  {
    path: 'login/:customerId/:password/:type/:custtype',
    loadChildren: () => import('./login/login.module').then(m => m.loginModule)
  },
  // {
  //   path: 'sales-login',
  //   loadChildren: () => import('./sales-login/sales-login.module').then(m => m.salesloginModule)
  // },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.dashboardModule)
  // },
  // {
  //   path: 'userprofile', canActivate: [AuthGuardGuard],
  //   loadChildren: () => import('./userprofile/userprofile.module').then(m => m.userprofileModule)
  // },
  // {
  //   path: 'user', canActivate: [AuthGuardGuard],
  //   loadChildren: () => import('./user/user.module').then(m => m.userModule)
  // },
  // {
  //   path: 'subusers', canActivate: [AuthGuardGuard],
  //   loadChildren: () => import('./subusers/subusers.module').then(m => m.subusersModule)
  // },
  // {
  //   path: 'southerquote/:buyercookie',
  //   loadChildren: () => import('./southern-quotes/southern-quotes.module').then(m => m.southernquotesModule)
  // },
  // {
  //   path: 'order-management',
  //   loadChildren: () => import('./order-management/order-management.module').then(m => m.ordermanagementModule),   
  // },
  // {
  //   path: 'checkout',
  //   loadChildren: () => import('./checkout/checkout.module').then(m => m.checkoutModule)
  // },
  // {
  //   path: 'shipping-address/:shipid/:type',
  //   canActivate: [AuthGuardGuard],
  //   loadChildren: () => import('./shipping-address/shipping-address.module').then(m => m.shippingaddressModule)

  // },
  // {
  //   path: 'categories',
  //   loadChildren: () => import('./all-category/all-category.module').then(m => m.allcategoryModule)
  // },
  // {
  //   path: 'categories/:name/:desc',
  //   loadChildren: () => import('./all-category/all-category.module').then(m => m.allcategoryModule)
  // },
  // {
  //   path: 'categories/:name',
  //   loadChildren: () => import('./all-category/all-category.module').then(m => m.allcategoryModule)
  // },
  // {
  //   path: 'review-order',
  //   loadChildren: () => import('./review-order/review-order.module').then(m => m.revieworderModule)
  // },
  // {
  //   path: 'review-order/:type',
  //   loadChildren: () => import('./review-order/review-order.module').then(m => m.revieworderModule)
  // },
  // {
  //   path: 'changepwd',
  //   canActivate: [AuthGuardGuard],
  //   loadChildren: () => import('./changepwd/changepwd.module').then(m => m.changepwdModule)
  // },
  // {
  //   path: 'pending-order-review',
  //   canActivate: [AuthGuardGuard],
  //   loadChildren: () => import('./pending-order-review/pending-order-review.module').then(m => m.pendingorderreviewModule)

  // },
  // {
  //   path: 'new-customer',
  //   loadChildren: () => import('./new-customers/new-customers.module').then(m => m.newcustomersModule)
  // },
  // {
  //   path: 'quickadd',
  //   loadChildren: () => import('./quick-order-pad/quick-order-pad.module').then(m => m.QuickOrderPadModule)
  // },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./default-redirect/default-redirect.module').then(m => m.defaultredirectModule)
  },
  {
    path: '**',
    loadChildren: () => import('./default-redirect/default-redirect.module').then(m => m.defaultredirectModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, {
    onSameUrlNavigation: 'reload',
    preloadingStrategy: NoPreloading
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
