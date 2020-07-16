import { Injectable } from '@angular/core';
import { CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
// import { Route } from '@angular/compiler/src/core';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{

  constructor(private auth:AuthService , private _router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if(!this.auth.isAuth())
    {

      // this.router.loadChildren(['login']);
      this._router.navigate(['/login']);
      return false
    }

    return true;

  }
}
