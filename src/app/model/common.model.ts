import { Inject } from "@angular/core";
import { environment } from "../../environments/environment.development";


export const MY_DATE_FORMATS = {
	parse: {
		dateInput: 'MMM-dd-yyyy',
	},
	display: {
		dateInput: 'MMM-dd-yyyy',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'MMM-dd-yyyy',
		monthYearA11yLabel: 'MMM YYYY',
	}
};

export class Guid {
	static newGuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
}
export class CSVRecord {
	public product: any;
	public qty: any;
	
}
export abstract class LocalStorage {
    readonly length: number;
    abstract clear(): void;
    abstract getItem(key: string): string | null;
    abstract key(index: number): string | null;
    abstract removeItem(key: string): void;
    abstract setItem(key: string, data: string): void;
    [key: string]: any;
    [index: number]: string;
}
  

export class Common {
	
	//APIUrl:string="https://localhost:44320";   
	//APIUrl: string = "https://portal.distone.com/ecommerceapi";
	//APIUrl: string = "https://portal2.distone.com/apexelectricapi";
	//APIUrl: string = "https://shopapi.preiser.com";
	//cookname: string = "apexelectric121521";
	//APIUrl:string="{{AdminURL}}"
	//cookname:string="{{cookname}}";
	//storagetime: any = ((60000 * 1 * 60) * 12);
	public static removespecial(urls: any) {
		return urls.replace(/[^A-Z0-9]/ig, "-");
	  }
	public static Setdescriptionforitem(product: any, descrdconfig: any) {
		try {
			var getumdescr = JSON.parse(product.descr);
			var getconfigs = descrdconfig.split(',');
			product.descrarray = [];
			product.descrstring = '';
			for (var i = 0; i <= getconfigs.length; i++) {
				if (getconfigs[i] == '1' && getumdescr[i] != undefined && getumdescr[i] != null && getumdescr[i] != '') {
					product.descrarray.push(getumdescr[i]);
					product.descrstring = product.descrstring + '' + getumdescr[i];
				}
			}
		} catch (ex) { }
	}

	public static RemoveSpacesandSpeacialCharacters(str: any) {
		try {
			if (str != undefined && str != null && str != '') {
				str = str.replace('[', '').replace(']', '').replace(/"+/ig, '').replace(/,+/ig, '');
				str = str.trim();
				str = str.replace(/[^A-Z0-9]+/ig, "-");
				str = str.replace(/\s/g, '');
				str = str.toLowerCase();
			}
			return str;
		}
		catch (ed) {
			return str;
		}
	}
	public static getSessionId() {
		try {
			var nav = window.navigator;
			var screen = window.screen;
			var guid = nav.mimeTypes.length.toString();
			guid += nav.userAgent.replace(/\D+/g, '');
			guid += nav.plugins.length;
			guid += screen.height || '';
			guid += screen.width || '';
			guid += screen.pixelDepth || '';
			return guid;
		} catch (ed) {
			var date = new Date();
			return date.toString();
		}
	};

	public static setWithExpiry(key: string, value: string) {
		key=environment.cookname+key;
		const now = new Date();
		const item = {
			value: value,
			expiry: now.getTime() + environment.storagetime
		}
		try{
		localStorage.setItem(key, JSON.stringify(item));
	}catch(ed){}
	}

	public static removeWithExpiry(key: string){
		key=environment.cookname+key;
		try{
		localStorage.removeItem(key);
	}catch(ed){}
	} 
public static getWithExpiry(key: string) {
		key=environment.cookname+key;
		try {
			const itemStr = localStorage.getItem(key);
			if (!itemStr) {
				return undefined;
			}
			const item = JSON.parse(itemStr);
			const now = new Date();
			if (now.getTime() > item.expiry) {
				localStorage.removeItem(key);
				return undefined;
			}
			return item.value;
		} catch (Ed) {
			return undefined;
		}
	}
}



