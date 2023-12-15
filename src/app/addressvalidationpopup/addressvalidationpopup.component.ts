import { ContentObserver } from '@angular/cdk/observers';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef  } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addressvalidationpopup',
  templateUrl: './addressvalidationpopup.component.html',
  styleUrls: ['./addressvalidationpopup.component.scss']
})
export class AddressvalidationpopupComponent implements OnInit {
  selectedAddress: any;
  selectedpostalcode:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { userList: string[] },private toastr: ToastrService,public dialogRef: MatDialogRef<AddressvalidationpopupComponent>) { }

  ngOnInit() {
   console.log('this.data====>',this.data);
  }
  showSelectedAddress(addressLine1: string,addressLine2: string,city:string,postalCode: string) {
    this.selectedpostalcode=postalCode;
    this.selectedAddress = {
      addressLine1 : addressLine1,
      addressLine2 : addressLine2,
      city : city,
      postalCode : postalCode
    }
  }
  closeDialog() {
    if (this.selectedAddress == undefined) {
      this.toastr.error("Select Valid Address", 'Message!');
    } else {
      this.dialogRef.close(this.selectedAddress);
    }
  }
}
