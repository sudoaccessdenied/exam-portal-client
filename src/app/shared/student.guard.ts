import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  
  constructor(private auth:AuthService,private _router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.auth.isAdmin())
      {
        this._router.navigate(['/admin']);
        return false;
      }
    
    
    
      return true;
  }
  
}
