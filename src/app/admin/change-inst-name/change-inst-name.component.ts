import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ep-change-inst-name',
  templateUrl: './change-inst-name.component.html',
  styleUrls: ['./change-inst-name.component.css']
})
export class ChangeInstNameComponent implements OnInit {

  constructor(private _fb:FormBuilder,private _api:ApiService ,private _snackBar:MatSnackBar) { }

  insForm:FormGroup;
  progressBar:boolean = false;
  error:any;
  ngOnInit(): void {

  this.insForm= this._fb.group(
    {
    
    name:['' ,[Validators.required]],
    email : ['', [Validators.required,Validators.email]]
    }
  )
  // sub

  }

  onSubmit()
  {
    
    // let parsedTime = LocalTime.parse(this.examForm.get('time').value, DateTimeFormatter.ofPattern("HH:mm AM"));
    
    if(this.progressBar != true)
    {
      
      this.progressBar = true;

      this._api.updateInstructor(this.insForm.value).subscribe({
        next:res =>{
          this.progressBar = false; 
          // console.log(res);
          // this.examForm.clearValidators();
        
          this.error ='';
          this._snackBar.open(res.message, "Okay", {
            duration: 20000,
          });
          this.ngOnInit();
        },
        error:res => {
          this.progressBar = false;
          this.error = res.error.message;

          if(res.error.errors)
          {
            for (var i in res.error.errors){
              this.error += "<br>"+ res.error.errors[i];
            }

          }
          console.log(res);
        },
      })

    }


}

}
