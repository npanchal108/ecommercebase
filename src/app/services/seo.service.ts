import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { isString } from 'util';


@Injectable()
export class SEOService {
   constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private doc:any) {
   }
   titleCase(str: string) {
      var splitStr = str.toLowerCase().split(' ');
      for (var i = 0; i < splitStr.length; i++) {
         // You do not need to check if i is larger than splitStr length, as your for does that for you
         // Assign it back to the array
         splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      // Directly return the joined string
      return splitStr.join(' ');
   }


   setPageTitle(title: string) {
      if (title != undefined && title != null && title != '') {
         //title=title.toUpperCase();
         if (title.length > 80) {
            title = title.substring(0, 79);
         }
         this.title.setTitle(this.titleCase(title));
      }

   }
   setauthormetatag(metadesc: string) {
      this.meta.updateTag({ name: 'author', content: metadesc });
   }
   getPageTitle() {
      return this.title.getTitle();
   }

   setnoindextag() {
      this.meta.updateTag({ name: "robots", content: "noindex" });
      this.meta.updateTag({ name: "googlebot", content: "noindex" });
   }

   setallincex() {
      this.meta.updateTag({ name: "robots", content: "all" });
      this.meta.updateTag({ name: "googlebot", content: "all" });
   }

   setdescription(metadesc: string) {
      if (metadesc.length > 170) {
         metadesc = metadesc.substring(0, 169);
      }
      this.meta.updateTag({ name: 'description', content: metadesc });
   }
   setkeywords(metadesc: string) {
      if (metadesc.length > 150) {
         metadesc = metadesc.substring(0, 149);
      }
      this.meta.updateTag({ name: 'keywords', content: metadesc });
   }

   createLinkForCanonicalURLforproduct(prlink:any) {
      try {
         let link = this.doc.getElementById('canonical');
         link.setAttribute('rel', 'canonical');
         prlink = prlink.replace('http:', 'https:');
         prlink = prlink.toLowerCase();
         var getcurls = this.doc.URL.replace('http:', 'https:');
         getcurls = getcurls.toLowerCase();
         try {
            if(getcurls.includes('/productdetail/')){
            getcurls = getcurls.split('/productdetail/')[0];
            getcurls = getcurls + '/productdetail/' + prlink;
            }
         } catch (ed) { }
         try {
            if(getcurls.includes('/categories/')){
            getcurls = getcurls.split('/categories/')[0];
            getcurls = getcurls + '/categories/' + prlink;
            }
         } catch (ed) { }
         try {
            if(getcurls.includes('/category/')){
            getcurls = getcurls.split('/category/')[0];
            getcurls = getcurls + '/category/' + prlink;
            }
         } catch (ed) { }
         try {
            if(getcurls.includes('/products/')){
            getcurls = getcurls.split('/products/')[0];
            getcurls = getcurls + '/products/' + prlink;
            }
         } catch (ed) { }
         try {
            if(getcurls.includes('/product/')){
            getcurls = getcurls.split('/product/')[0];
            getcurls = getcurls + prlink;
            }
         } catch (ed) { }
         link.setAttribute('href', getcurls);
      } catch (ed) { }
   }
   createLinkForCanonicalURL() {
      //this.doc.getel
      //let link: HTMLLinkElement = this.doc.createElement('link');
      let link = this.doc.getElementById('canonical');
      link.setAttribute('rel', 'canonical');
      var getcurls = this.doc.URL.replace('http:', 'https:');
      getcurls = getcurls.toLowerCase();
      //this.doc.head.appendChild(link);
      link.setAttribute('href', getcurls);
   }

   resetTagsForSocialSharing(){
      this.meta.removeTag(`property='og:title'`);
      this.meta.removeTag(`property='og:description'`);
      this.meta.removeTag(`property='og:image'`);
      this.meta.removeTag(`property='og:url'`);
   }

   addTagsForSocialSharing(pageContent:any) {
      this.meta.addTag({ property: 'og:title', content: pageContent.postTitle });
      this.meta.addTag({ property: 'og:description', content: pageContent.postDescription });
      this.meta.addTag({ property: 'og:image', content: pageContent.postImage });
      this.meta.addTag({ property: 'og:url', content: pageContent.postUrl });
   }
} 