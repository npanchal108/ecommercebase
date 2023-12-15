import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Common } from './common.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard  {
  constructor(private router: Router) { 
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if ((Common.getWithExpiry("CustID") == null || Common.getWithExpiry("CustID") == undefined) && (Common.getWithExpiry("SalesUserID") == null || Common.getWithExpiry("SalesUserID") == undefined)) {
        //Common.setWithExpiry("afterloginurl", state.url);
        if(environment.iscasafina){
        this.router.navigate(['sales-login'], { queryParams: { returnUrl: state.url } });      
        }
        else{
          this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });      
        }
        return false;
      } 
      return true;
  }
  
}
