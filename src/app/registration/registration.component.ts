import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { MatVerticalStepper } from '@angular/material/stepper';



interface Semester {
  value: string;
  viewValue: string;
}
// interface UserRegistration {
//   name:string;
//   email:string;
//   username:string;
//   course :string;
//   semester:string;
//   password:string;
//   password_confirmation:string;
// }




@Component({
  selector: 'ep-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  semesters: Semester[] = [
    {value: '1', viewValue: 'First'},
    {value: '2', viewValue: 'Second'},
    {value: '3', viewValue: 'Third'},
    {value: '4', viewValue: 'Fourth'},
    {value: '5', viewValue: 'Fifth'},
    {value: '6', viewValue: 'Sixth'},
    {value: '7', viewValue: 'Seventh'},
    {value: '8', viewValue: 'Eighth'}
  ];

  

  regGroup:FormGroup;
  isOptional = false;
  submitBar:boolean= false;
  error:any ='';
  @Output() changeTab = new EventEmitter<number>();
  @ViewChild('stepper') stepper:MatVerticalStepper;
  
  constructor(private fb: FormBuilder ,
     private auth:AuthService ,
    private _snackBar :MatSnackBar,
    private _route:Router
    ) {}

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
    fifthFormGroup : this.fb.group({
      fifthCtrl: ['', Validators.required]
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

    // this._snackBar.open("Reqisterd Successfully", "Okay", {
    //   duration: 2000,
    // });

      if(this.submitBar!= true)
      {

        this.submitBar = true;     
        this.auth.registorUser(value).subscribe(
          {
            next:data => {
              this._snackBar.open("Reqisterd Successfully", "Okay", {
                duration: 2000,
              });
              
              this.submitBar = false;
              this.error ='';
              this.stepper.reset();
              
              this.changeTab.emit(0);
              // console.log(data)
            },
            error:err => {
              
              this.submitBar = false;
              // console.log(err);
              let error = err.error.errors;
              this.error = "";
              if(error)
              {
                for (var i in error){
                  this.error += "<br>"+ error[i];
                }
                
              }
            
          }}
          );
          
      }
    }
  
  }



