import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ep-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  
  data:any;
  constructor(private _route:ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.data = this._route.snapshot.data['data'].admin_data;
    // console.log(this._route.snapshot.data['data']);
  }

}
