import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'ep-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit,OnDestroy {

  nOnlineUser:number =0;
  onlineUser:string[];
  interval:any;
  nextExam:any;
  constructor(private _api:ApiService) { }
  ngOnDestroy(): void {
   clearInterval(this.interval);
  }

  ngOnInit(): void {
    this._api.nextExam().subscribe({
        next:res => { 
          this.nextExam = res.nextExam;
          console.log(res)
        },
        error:err=> {console.log(err)}
    });
    


    this.interval = setInterval(res=>
      {
        this._api.getOnlineUser().subscribe({
          next:res =>{ 
            // console.log(res);
            this.onlineUser = res;
            this.nOnlineUser = this.onlineUser.length;},
          error:err => console.log(err)
        })
      },5000)


  }

}
