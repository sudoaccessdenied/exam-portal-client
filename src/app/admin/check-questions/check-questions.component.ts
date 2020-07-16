import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'ep-check-questions',
  templateUrl: './check-questions.component.html',
  styleUrls: ['./check-questions.component.css']
})
export class CheckQuestionsComponent implements OnInit {

  examId:any;
  studentId:any;
  questions:any;
  progressBar:boolean = true;
  constructor(private _route:ActivatedRoute,
    private _api:ApiService) { }

  ngOnInit(): void {

    
    this._route.params.subscribe(params => {
      this.examId = +params['eid'];
      this.studentId = +params['sid']; // (+) converts string 'id' to a number
       // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      // console.log(this.examId);
      // console.log(this.studentId);    
    });

    this._api.checkStudentSub(this.examId,this.studentId).subscribe(
      { 
        next:res=>{
          this.progressBar = false;
          this.questions = res.submission;
          console.log(res);
        },
        error:err=>{
          this.progressBar =false;
          console.log(err);

        }
      }

    )


  }

}
