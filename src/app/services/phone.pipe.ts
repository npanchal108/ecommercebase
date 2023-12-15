
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
//import { parsePhoneNumber, CountryCode } from 'libphonenumber-js/min';


@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(phoneValue: number | string, country: string): any {
    try {
      phoneValue = "+1"+ phoneValue;

      const countryCodeStr = phoneValue.slice(0,2);
      const areaCodeStr = phoneValue.slice(2,5);
      const midSectionStr = phoneValue.slice(5,8);
      const lastSectionStr = phoneValue.slice(8);
  
      return `${countryCodeStr} (${areaCodeStr})${midSectionStr}-${lastSectionStr}`;
      //const phoneNumber = parsePhoneNumber(phoneValue + '', country as CountryCode);
      //return phoneNumber.formatNational();
    } catch (error) {
      return phoneValue;
    }
  }

}