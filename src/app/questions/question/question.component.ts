import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface PeriodicElement {
  id: number;
  question: string;
  desc:string;
  marks:number;
  isAttempted:number;
  noOfSub:number;
}


@Component({
  selector: 'ep-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private router:Router) { }
  displayedColumns:string[];
  dataSource:PeriodicElement[] =[];
  data:any;

  ngOnInit(): void {
    
    this.displayedColumns = ['id', 'question', 'marks', 'action'];
    if(history.state.data)
    {
      this.data = history.state.data;
      
    }
    else{
              
      this.data = JSON.parse(localStorage.getItem( '_data'));
      if(!this.data)
      {
          this.router.navigate(['/course']);
      }

    }

    // this.data = this.data.question_details;

    if(this.data)
    {
      this.data.question_details.forEach(element => {
        
          this.dataSource.push({id:element.id,question:element.title,
            marks:element.marks ,isAttempted:element.is_attempted ,desc:element.description,
            noOfSub:element.no_of_submissions })

      });
    }

    
  }

}
