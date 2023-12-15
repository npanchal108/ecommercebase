import { NgModule } from '@angular/core';

//import { AddressvalidationpopupComponent } from '../app/addressvalidationpopup/addressvalidationpopup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeysPipe, LowerPipe, SafePipe, urlsPipe } from '../services/safe.pipe';
import { FloorPipe, MillionPipe, weburlPipe } from '../services/MillionPipe';
import { PhonePipe } from '../services/phone.pipe';
import { DateFormatPipe } from '../services/DatesPipe';
import { SplitPipe } from '../services/SplitPipe';
// import { ShipToAddressPopupComponent } from '../app/checkout/shiptoaddresspopup.component';
// import { CreditCardAddrsPopupComponent } from '../app/checkout/creditcardaddrspopup.component';

@NgModule({
    imports: [CommonModule,MatDialogModule,FormsModule],
    declarations: [
        SafePipe,
        MillionPipe,
        LowerPipe,
        PhonePipe,
        KeysPipe,
        urlsPipe, 
        FloorPipe,
        DateFormatPipe,
        SplitPipe,
        weburlPipe,
        // AddressvalidationpopupComponent,
        // ShipToAddressPopupComponent,
        // CreditCardAddrsPopupComponent
    ],
    exports: [
        SafePipe,
        MillionPipe,
        LowerPipe,
        PhonePipe,
        KeysPipe,
        urlsPipe, 
        FloorPipe,
        DateFormatPipe,
        SplitPipe,
        weburlPipe,
        // AddressvalidationpopupComponent,
        // ShipToAddressPopupComponent,
        // CreditCardAddrsPopupComponent
    ]
})

export class sharedModule { }
