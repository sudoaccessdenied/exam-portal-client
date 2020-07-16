import { Injectable, Output } from '@angular/core';
import { Auth } from './auth';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../user';
import { tap ,shareReplay ,map, catchError} from 'rxjs/operators';
import * as moment from "moment";
import { Observable, throwError, Subject  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})


export class AuthService  implements Auth{

  constructor(private http:HttpClient ,private _router:Router) { }
  //login endpoint
  private readonly loginUrl:string  = environment.loginUrl;
  private readonly logoutUrl:string  = environment.logoutUrl;
  private readonly registorUrl:string  = environment.registerUrl;
  private readonly registerAdminUrl:string  = environment.registerAdminUrl;

  private user: User;

  private emitChangeSource = new Subject<boolean>();
  
  changeEmited$ = this.emitChangeSource.asObservable();

  emitChange(change:boolean)
  {
    this.emitChangeSource.next(change);  

  }




  registorUser(newUser: any):Observable<void |any> {

    const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};
    let body  = { 'name': newUser.firstFormGroup.firstCtrl,    
                  'email':newUser.secondFormGroup.secondCtrl,
                  'username':newUser.thirdFormGroup.thirdCtrl,
                  'course':newUser.fourthFormGroup.fourthCtrl,
                  'semester':newUser.fifthFormGroup.fifthCtrl,
                  'password':newUser.passwordFormGroup.passwordCtrl,
                  'password_confirmation':newUser.passwordFormGroup.confirmPasswordCtrl,
                   
                
                }

    // console.log(body);
    


    return this.http.post<any>(this.registorUrl,body,{headers})
      .pipe(
        // catchError(this.handleError),
        shareReplay()
      );


  }


  registorAdmin(newUser: any):Observable<void |any> {

    const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};
    let body  = { 'course_name': newUser.firstFormGroup.firstCtrl,    
                  'email':newUser.secondFormGroup.secondCtrl,
                  'username':newUser.thirdFormGroup.thirdCtrl,
                  'name':newUser.fourthFormGroup.fourthCtrl,
                  'password':newUser.passwordFormGroup.passwordCtrl,
                  'password_confirmation':newUser.passwordFormGroup.confirmPasswordCtrl,
                   
                
                }

    // console.log(body);
  
    return this.http.post<any>(this.registerAdminUrl,body,{headers})
      .pipe(
        // catchError(this.handleError),
        shareReplay()
      );


  }



  login(username: string, password: string , role:boolean) :Observable< void|User> {

    // implement method
    const headers = {'Content-Type':'application/json; charset=utf-8' ,'Accept' :'application/json'};


    let isAdmin = role?1:0;
    let body  = { 'username':username,'password':password,'isAdmin': isAdmin }
    return this.http.post<User>(this.loginUrl,body,{headers})
      .pipe(
        
          tap( res=> this.setSession(res)),
        shareReplay()
      );
    
    }


  private  setSession (authResult)
  { 
    // this.isLogin.emit("true");
  localStorage.setItem('isAdmin', authResult.isAdmin);    
  localStorage.setItem('ep_token', authResult.token);    
  }


  logout(): boolean {
    // implement method 
    const headers = {'Content-Type':'application/json; charset=utf-8' ,'Accept' :'application/json'};
    this.http.post(this.logoutUrl ,{},{headers} ).subscribe(
      {
        next:data =>{

          console.log(data); 
          this.emitChange(false);
        
        },
        error:erro => console.error(erro)
      }

    );
      
  
    // setRoute to homepage
      
    
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('ep_token');
    this._router.navigate(['login']);
    
    return true;
  }

  public isAuth(): boolean {
    let token = localStorage.getItem('ep_token');
    if(token && this.getExpiration() > new Date())
        return true;
    return false;
  }


  public isAdmin():boolean{
    const isAdmin = localStorage.getItem('isAdmin');
    if(isAdmin!==null && Number.parseInt(isAdmin) == 1)
        return true;
    return false;
  }

  

  forgetPassword(username: String) {
    // forget pass ui
    throw new Error("Method not implemented.");
  }

   getExpiration() {
     const token = localStorage.getItem("ep_token")
    let decode = jwt_decode(token);
    const d = new Date(0);
    d.setUTCSeconds(decode.exp);
    return d;
  }
  // private handleError(err: HttpErrorResponse) {
  //   // in a real world app, we may send the server to some remote logging infrastructure
  //   // instead of just logging it to the console
  //   let errorMessage = '';
  //   if (err.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     errorMessage = `An error occurred: ${err.error.message}`;
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.error}`;
  //   }
  //   // console.error(errorMessage);
  //   return throwError(err);
  // }

}
