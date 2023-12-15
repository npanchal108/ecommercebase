import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { wishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist.component';

import { sharedModule } from '../shared.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    WishlistComponent,
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    sharedModule,
    TypeaheadModule,
    wishlistRoutingModule
    
  ],
 
})
export class wishlistModule { }
