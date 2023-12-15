import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
	name: 'safe'
})
export class SafePipe implements PipeTransform {

	constructor(protected sanitizer: DomSanitizer) { }

	public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
		switch (type) {
			case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
			case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
			case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
			case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
			case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
			default: throw new Error(`Invalid safe type specified: ${type}`);
		}
	}
}

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
	transform(value: string): string {
		try{
		let stringary = JSON.parse(value);
		let finalstr = '';
		for(var i=0;i<stringary.length;i++){
			if (stringary[i] != undefined && stringary[i] != null && stringary[i] != '') {
				finalstr = finalstr + ' ' + stringary[i];
			}
		}	

		return finalstr;
	}catch(ed){
		return value;
		
	}
	}
}
@Pipe({ name: 'urls' })
export class urlsPipe implements PipeTransform {
	transform(value: string): string {
		try{
		let stringary = JSON.parse(value);
		let finalstr = '';
		for(var i=0;i<stringary.length;i++){
			if (stringary[i] != undefined && stringary[i] != null && stringary[i] != '') {
				finalstr = finalstr + '' + stringary[i];
			}
		}
		if(finalstr!=undefined && finalstr!=null && finalstr!=''){
		return finalstr.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/ /g,"-");
		}
		else{
			return '';
		}
	}catch(ed){
		if(value!=undefined && value!=null && value!=''){
		return value.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/ /g,"-");
		}
		else{
			return '';
		}
	}
	}
}
@Pipe({ name: 'lowerurl' })
export class LowerPipe implements PipeTransform {
	transform(value: string): string {		
		if(value!=undefined && value!=null && value!=''){
			//value=value.replace(" ","nayan");
			value= encodeURIComponent(value.toLowerCase());
			//value=value.replace("nayan"," ");
			//value= encodeURI(value.toLowerCase());
		return value.toLowerCase();
		}
		else{
			return '';
		}
	}
	
}