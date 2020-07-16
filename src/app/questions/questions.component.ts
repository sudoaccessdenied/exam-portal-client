import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TimeoutDialogComponent } from './timeout-dialog.component';
import { AuthService } from '../shared/auth/auth.service';
import { ApiService } from '../shared/api/api.service';


@Component({
  selector: 'ep-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit ,OnDestroy{


  data:any;
  hour:string;
  minute:string;
  second:string;
  duration:number=4;
  interval;
  serverInterval;
  constructor(private router:Router, 
    public dialog: MatDialog ,
    private _auth:AuthService,
    private _api:ApiService) { }
  ngOnDestroy(): void {

    clearInterval(this.interval);
    clearInterval(this.serverInterval);


  }
  ngOnInit(): void {

    
    if(history.state.data)
    {
      this.data = history.state.data;
      this.duration = this.data.duration_left;
      localStorage.setItem( '_data',JSON.stringify(this.data));
      localStorage.setItem( '_t',JSON.stringify(this.duration))
    }
    else{
          
      this.data = JSON.parse(localStorage.getItem( '_data'));
      this.duration = parseInt(localStorage.getItem( '_t'));
      if(!this.data || !this.duration)
      {
          this.router.navigate(['/course']);
      }

    }


    let temp = this.duration;
    this.hour = ("0"+Math.floor((temp)/3600)).slice(-2);
    this.minute = ("0"+Math.floor((temp%3600)/60)).slice(-2);
    this.second = ("0"+Math.floor(temp%60)).slice(-2);
      
    this.interval = setInterval(val=>{
      if(temp >=0){   
        temp--;
        console.log(temp);
        this.hour = ("0"+Math.floor((temp)/3600)).slice(-2);
        this.minute = ("0"+Math.floor((temp%3600)/60)).slice(-2);
        this.second = ("0"+Math.floor(temp%60)).slice(-2);
        localStorage.setItem( '_t',JSON.stringify(temp))
    
    }
    else{

      clearInterval(this.interval);
      clearInterval(this.serverInterval);
    const dialogRef = this.dialog.open(TimeoutDialogComponent);

    dialogRef.afterClosed().subscribe(result => {

      this._auth.logout();
      console.log(`Dialog result: ${result}`);
    });
    
    }
    
  
  
  },1000)
  
    this.serverInterval = setInterval(res =>{

      if(temp>0)
      {
          this._api.update_duration(this.data.exam_details.exam_id,temp).subscribe(
            {              
            next:res=>console.log(res),
            error:err => console.error(err)
          })
        
      }

    },2000*60);

  }

  

}

