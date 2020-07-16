import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ep-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {

  questionId:any;
  studentId:any;
  submission:any;
  progressBar:boolean = true;
  marksForm:FormGroup;
  res:any;
  marks:number;
  error:string='';
  constructor(private _route:ActivatedRoute,
    private _fb:FormBuilder,
    private _api:ApiService) { }

  ngOnInit(): void {

    
    this._route.params.subscribe(params => {
      this.questionId = +params['qid'];
      this.studentId = +params['sid']; // (+) converts string 'id' to a number
       // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      // console.log(this.questionId);
      // console.log(this.studentId);    
    });

    
    this._api.checkQuestion(this.questionId,this.studentId).subscribe(
      { 
        next:res=>{
          this.progressBar = false;
          this.submission= res.submission[0];
          this.marks = this.submission.marks;
          console.log(res);
        },
        error:err=>{
          this.progressBar =false;
          console.log(err);

        }
      });
      

      this.marksForm = this._fb.group(
        {
          marks:['',[Validators.required,Validators.min(0)]],
        }
      );
  
    }


    onSubmit()
  {

    const marks = this.marksForm.get('marks').value;
    if(this.progressBar!= true && marks <=this.marks )
    {
      this.error ='';
      this.progressBar = true;
      this._api.updateMarks(this.questionId,this.studentId,this.marksForm.get('marks').value).subscribe(
        { 
          next:res=>{
            this.progressBar = false;
            this.res = res.message;
            console.log(res);
          },
          error:err=>{
            this.progressBar =false;
            this.res = err.error.message;
            console.log(err);
  
          }
        });
    }else{
      this.error = "Cannot Assign More Marks";
    }


  }

}
