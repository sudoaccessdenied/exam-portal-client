import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatVerticalStepper } from '@angular/material/stepper';




@Component({
  selector: 'ep-adminreg',
  templateUrl: './adminreg.component.html',
  styleUrls: ['./adminreg.component.css']
})
export class AdminregComponent implements OnInit {

  regGroup:FormGroup;
  isOptional = false;
  submitBar:boolean= false;
  error:any="";
  @Output() changeTab = new EventEmitter<number>();
  @ViewChild('stepper') stepper:MatVerticalStepper;
  

  
  constructor(private fb: FormBuilder , private auth:AuthService ,private _snackBar :MatSnackBar) {}

  ngOnInit() {


    this.regGroup = this.fb.group({

    firstFormGroup : this.fb.group({
      firstCtrl: ['', Validators.required]
    }),
    secondFormGroup : this.fb.group({
      secondCtrl: ['', [Validators.email,Validators.required]]
    }),

    thirdFormGroup : this.fb.group({
      thirdCtrl: ['', Validators.required]
    }),
    fourthFormGroup : this.fb.group({
      fourthCtrl: ['', Validators.required]
    }),
    passwordFormGroup : this.fb.group({
      passwordCtrl: ['',[ Validators.required,Validators.minLength(8)]],
      confirmPasswordCtrl : ['',[Validators.required]] 
        // ,Validators.pattern(this.regGroup.value.passwordFormGroup.passwordCtrl)] ]
    }, { 
      validator: this.ConfirmedValidator('passwordCtrl', 'confirmPasswordCtrl')
    })
  });

  }

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}



  onSubmit(value : any)
  {

   
    if(this.submitBar != true)
    {

      this.submitBar = true;
      this.auth.registorAdmin(value).subscribe(
        {
          next:data => {
            this._snackBar.open("Reqisterd Successfully", "Okay", {
              duration: 2000,
            });
            
            this.submitBar = false;
            this.error ="";
            this.stepper.reset();
            
            this.changeTab.emit(0);
            // console.log(data)
          },
          error:err => {
            
            // console.log(err);
            let error = err.error.errors;
            
            // let error = err.error.errors;
            this.submitBar = false;
            this.error = "";
            if(error)
            {
              for (var i in error){
                this.error += "<br>"+ error[i];
              }
              
            }
          }
        }
        );
      }
    }
      
}
    