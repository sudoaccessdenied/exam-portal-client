import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminResolverService  implements Resolve<any>{

   data :any= undefined;
  
  constructor(private api:ApiService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    

    if(this.data)
    {
    return   this.getSavedData();
    }
    
    return this.api.getAdminInfo();
  }


  private getSavedData()
  {
    return this.data;
  }
}
