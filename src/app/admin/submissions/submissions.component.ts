import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'ep-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit {

  constructor(private _fb:FormBuilder, private _api:ApiService) { }

  progressBar:boolean = false;
  subForm:any;
  listStudent:any;
  examId:any;
  ngOnInit(): void {
    

    this.subForm = this._fb.group(
      {
        examCode:['',Validators.required],
      }
    );
  }

  onSubmit()
  {

    if(this.progressBar!= true)
    {
      this.progressBar = true;
      this._api.viewSubmission(this.subForm.get('examCode').value).subscribe({
        next:res=>{
          this.examId = this.subForm.get('examCode').value;
          this.progressBar = false;
          this.listStudent = res;  
          console.log(res)
        },
        error:res=>{
          this.progressBar = false;
          console.log(res)
        }
      })
    }

  }

}
