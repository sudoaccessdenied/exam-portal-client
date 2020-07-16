import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService  implements HttpInterceptor{

  constructor(private auth:AuthService) { }


  intercept(req: import("@angular/common/http").HttpRequest<any>,
   next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    // throw new Error("Method not implemented.");

      const token = localStorage.getItem('ep_token');

      if(token && this.auth.isAuth())
      {
          const clones =  req.clone({
              setHeaders:{
                "Authorization" :"Bearer "+token}
            });
            // console.log("Token attatch");
            return next.handle(clones);
      
          }
      else
      {
        return next.handle(req);
      }
  }
}
