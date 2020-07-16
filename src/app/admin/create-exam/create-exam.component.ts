import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'ep-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {

  constructor(private _fb:FormBuilder, private _api:ApiService ,private _snackBar:MatSnackBar) { }

  examForm:FormGroup;
  progressBar:boolean;
  error:any;
  @ViewChild('form') form;
  ngOnInit(): void {
    this.progressBar = false;
    this.examForm = this._fb.group(

      {
          name:['',[Validators.required]],
          duration:['',[Validators.required]],
          date:['',[Validators.required]],
          time:['',[Validators.required]],

      }
    )

  }



  onSubmit()
  {
    
    // let parsedTime = LocalTime.parse(this.examForm.get('time').value, DateTimeFormatter.ofPattern("HH:mm AM"));
    
    if(this.progressBar != true)
    {
      
      this.progressBar = true;

      this._api.createExam(this.examForm.value).subscribe({
        next:res =>{
          this.progressBar = false; 
          // console.log(res);
          // this.examForm.clearValidators();
          this.form.resetForm();
          this.error ='';
          this._snackBar.open("Exam Created Successfuly with Exam Code:"+res.exam_code, "Okay", {
            duration: 20000,
          });
        },
        error:res => {
          this.progressBar = false;
          this.error = res.error.message;
          console.log(res);
        },
      })



    }

  }

}
