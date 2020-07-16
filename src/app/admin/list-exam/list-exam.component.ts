import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ep-list-exam',
  templateUrl: './list-exam.component.html',
  styleUrls: ['./list-exam.component.css']
})
export class ListExamComponent implements OnInit {

  constructor(private _api:ApiService ,private _snackBar:MatSnackBar) { }

  progressBar:boolean = true;

  listExam:any;
  ngOnInit(): void {
    this.progressBar = true;
    this._api.listExam().subscribe({
      next:res=>{
        this.progressBar = false;
        this.listExam = res;  
        console.log(res)
      },
      error:res=>{
        this.progressBar = false;
        console.log(res)
      }
    })
  }

  delete(examId:any){

      let r = window.confirm("Do you want to delete Exam :"+examId);
        if (r == true) {
        
            this._api.deleteExam(examId).subscribe({
              next:res =>{ this._snackBar.open("Exam Deleted Successfully", "Okay", {
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
