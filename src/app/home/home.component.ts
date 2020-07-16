import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ep-home',
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  isUser:boolean = true;
  @Input() index:number;

  selected:number = 0;
  ngOnInit(): void {
  }


  changeTab(val:number)
  {
    this.selected = val;
    console.log(val);
  }
  changeToAdmin()
  {
    this.isUser = !this.isUser;

  }


}
