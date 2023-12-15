// import { Observable } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpResponse } from '@angular/common/http';
// import { HttpRequest } from '@angular/common/http';
// import { HttpHandler } from '@angular/common/http';
// import { HttpEvent } from '@angular/common/http';
// import { tap } from 'rxjs/operators';
// import { LoadingService } from '../services/loading.service';
// //import { SpinnerService } from './spinner.service';
 
// @Injectable()
// export class CustomHttpInterceptor implements HttpInterceptor {
 
//      constructor(private spinnerService: LoadingService) { }
 
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
//         //this.spinnerService.LoadingMessage("start");
 
//         return next
//             .handle(req)
//             .pipe(
//                 tap((event: HttpEvent<any>) => {
//                     if (event instanceof HttpResponse) {
//                         //this.spinnerService.hide();
//           //              this.spinnerService.LoadingMessage("stop");
//                     }
//                 }, (error) => {
//                     //this.spinnerService.hide();
//             //        this.spinnerService.LoadingMessage("stop");
//                 })
//             );
//     }
// }