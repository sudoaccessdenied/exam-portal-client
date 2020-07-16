import { Component, Output} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatSlideToggleChange, MatSlideToggle} from '@angular/material/slide-toggle';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';

import { Observable } from 'rxjs';
// import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

// import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'ep-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {

  hide:boolean = true;
  color: ThemePalette = 'accent';
  error:String ;
  submitBar:boolean=false;
  // @Output() signed = new EventEmitter<boolean>();
  
 

  loginForm = this.fb.group(
    {
    isAdmin :false,
    username:['' ,[Validators.required]],
    password : ['', [Validators.required]]
    }
  )
  // sub
  onSubmit():void
  {
    
    // this.signed.emit(true);  
    // Implement this function for authentication
    this.auth.login(this.loginForm.get('username').value,
    this.loginForm.get('password').value,
    this.loginForm.get('isAdmin').value)
      .subscribe( {
        next:data => {

          this.auth.emitChange(true);
          // console.log(data)
          this.error = "";
          this.submitBar = false;
          // this.signed.emit(true);
          if(this.auth.isAdmin())
          {
            this._router.navigate(['/admin']);
          }
          else
          {
            this._router.navigate(['/course']);
          }


          // console.log(data);
        },
        error:err => {
          // err = JSON.stringify(err);
          this.submitBar = false;
          if (err.error instanceof ProgressEvent || err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
               this.error = `An error occurred: ${err.statusText}`;
           } 
        else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
              this.error = err.error.message;
          }


          this.auth.emitChange(false);
          
          // button.setAttribute('disabled','false');
          // console.error(" error have catched"+JSON.stringify(err));
        }
      });
    ;
    
    this.submitBar = true;
  }

  constructor(private fb : FormBuilder,
     private auth:AuthService ,
     private _router:Router
     ) { }

  // ngOnInit(): void {

  //   // this.loginForm.reset();
  // }

  // onToggleChange(eg :MatSlideToggleChange):void{

  //   console.log(eg.checked);
  //   let tog:MatSlideToggle = eg.source;
  // }

}
