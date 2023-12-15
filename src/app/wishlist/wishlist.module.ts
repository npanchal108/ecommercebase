import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { wishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist.component';


import { FormsModule } from '@angular/forms';
import { sharedModule } from '../model/shared.module';




@NgModule({
  declarations: [
    WishlistComponent,
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    //TypeaheadModule,
    wishlistRoutingModule
    
  ],
 
})
export class wishlistModule { }
