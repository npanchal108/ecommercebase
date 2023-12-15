import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DataService } from '../services/data.service';
import { Common } from '../model/common.model';
@Pipe({
  name: 'million'
})
export class MillionPipe implements PipeTransform {
  decimalpoints: any;
  constructor(private decpipe: DecimalPipe, private dataService: DataService) {
    this.getdecimal();
  }
  getdecimal() {
    this.decimalpoints = this.dataService.Getconfigbykey("decimalpoints");
    if (this.decimalpoints == null || this.decimalpoints == undefined || this.decimalpoints == '') {
      this.decimalpoints = Common.getWithExpiry("decimalpoints");
    }

    //if (this.decimalpoints == null || this.decimalpoints == undefined || this.decimalpoints == '') {
    // this.dataService.GetConfigfordecimalpoints().subscribe((res:any) => {
    //   this.decimalpoints = res
    //   Common.setWithExpiry("decimalpoints", this.decimalpoints);
    // });
    //}
  }

  transform(value: any): any {
    try {
      value = Number(value);
      this.decimalpoints = (this.decimalpoints == undefined ? "2" : (this.decimalpoints == null ? "2" : this.decimalpoints));
      var getvalue = "1." + this.decimalpoints + "-" + this.decimalpoints;
      return this.decpipe.transform(value, getvalue);
    } catch (ex) {

      return value;
    }
  }
}

@Pipe({ name: 'floor' })
export class FloorPipe implements PipeTransform {
  /**
   *
   * @param value
   * @returns {number}
   */
  transform(value: number): number {
    return Math.floor(value);
  }
}

@Pipe({ name: 'tturls' })
export class weburlPipe implements PipeTransform {
  /**
   *
   * @param value
   * @returns {string}
   */
  transform(value: string): string {
    value = value.replace(/[^A-Z0-9]/ig, "-");
    value = value.replace(/---/g, '-');
    value = value.replace(/--/g, '-');
    return value;
  }
}

