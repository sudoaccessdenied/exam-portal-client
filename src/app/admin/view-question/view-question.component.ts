import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ep-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  constructor(private _api:ApiService,private _route:ActivatedRoute ,private _snackBar:MatSnackBar) { }
  examId:number;
  progressBar:boolean = true;
  questions:any;
  error:any;
  ngOnInit(): void {

    this._route.params.subscribe(params => {
      this.examId = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      console.log(this.examId);    
    });


     this._api.viewQuestions(this.examId).subscribe({
       next:res =>{
         this.progressBar = false; 
         this.questions = res.questions;
         this.error ='';
        //  this._snackBar.open(res.message, "Okay", {
        //    duration: 20000,
        //  });
       },
       error:res => {
         this.progressBar = false;
         this.error = res.error.message;
         console.log(res);
       },
     })

  
 
    
  }

  delete(qID:any){

    let r = window.confirm("Do you want to delete Exam :"+qID);
      if (r == true) {
      
          this._api.deleteQuestion(qID).subscribe({
            next:res =>{ this._snackBar.open("Question Deleted Successfully :" +qID, "Okay", {
              duration: 20000,
            });
          this.ngOnInit();
          },
            error:err=>{
              // console.log(err);
              this._snackBar.open("Error :"+ err.error.message, "Okay", {
                duration: 20000,
              });
            }  

          });


      }
  // window.alert();

}

}
