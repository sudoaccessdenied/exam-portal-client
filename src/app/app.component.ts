import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'ep-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title:string = 'Lab Exam Portal';
  isLogin:boolean = false;

  constructor(private _auth:AuthService){}
  ngOnInit(): void {
    
      this.isLogin = this._auth.isAuth(); 
    this._auth.changeEmited$.subscribe(
     res=> {this.isLogin = res;
    }
   )
    

  }

  
  logout()
  {
    this._auth.logout();
    this._auth.emitChange(false);
    console.log("Logout done");
    
    }

  


}
