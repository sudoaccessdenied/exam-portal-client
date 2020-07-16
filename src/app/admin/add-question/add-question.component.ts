import { Component, OnInit, ViewChild } from '@angular/core';
import {  AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ep-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  constructor(private _fb:FormBuilder,
      private _router:Router,
      private _route:ActivatedRoute,
      private _api:ApiService,
      private _snackBar:MatSnackBar
    ) {}
  
    @ViewChild('form') form;
    addQuesForm:FormGroup;
    progressBar:boolean = false;
    error:any;
    title:string =" Add Question";

    config :AngularEditorConfig= {
      editable: true,
      spellcheck: true,
      height: '15rem',
      minHeight: '5rem',
      placeholder: 'Enter the Question Description Here',
      translate: 'no',
      defaultParagraphSeparator: 'p',
      defaultFontName: 'Arial',
      toolbarHiddenButtons: [
        ['bold']
        ],
      customClasses: []
  };

  examId:number;
  qID:number;
  questions:any;
  ngOnInit(): void {

      this._route.params.subscribe(params => {
      this.examId = +params['id']; // (+) converts string 'id' to a number
      this.qID = +params['qid'];
      // In a real app: dispatch action to load the details here.
      console.log(this.examId); 
      console.log(this.qID);   
    });
 
    if(this.qID){

      this.title = "Edit Question";
      this.progressBar = true;
    this._api.questionByID(this.qID).subscribe({
      next:res =>{
        this.progressBar = false; 
        this.questions = res.questions;
        this.error ='';
        this.addQuesForm.get('title').setValue(this.questions.title);
        this.addQuesForm.get('marks').setValue(this.questions.marks);
        this.addQuesForm.get('description').setValue(this.questions.description);
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


      

    this.addQuesForm = this._fb.group(
      {
        title:['',Validators.required],
        marks:['',Validators.required],
        description:['',Validators.required]

      }
    );


   }

   onSubmit()
   {

    if(this.progressBar != true && this.qID)
     {
      this.progressBar = true;
      this._api.editQuestion(this.addQuesForm.value,this.questions.id).subscribe({
        next:res =>{
          this.progressBar = false; 
          // console.log(res);
          // this.examForm.clearValidators();
          this.form.resetForm();
          this.error ='';
          this._snackBar.open(res.message, "Okay", {
            duration: 20000,
          });

          this._router.navigate(['/admin/list-exam']);
        },
        error:res => {
          this.progressBar = false;
          this.error = res.error.message;
          console.log(res);
        },
      })
    }
    

    
    if(this.progressBar != true && !this.qID)
    {
      this.progressBar = true;
      this._api.addQuestion(this.addQuesForm.value,this.examId).subscribe({
        next:res =>{
          this.progressBar = false; 
          // console.log(res);
          // this.examForm.clearValidators();
          this.form.resetForm();
          this.error ='';
          this._snackBar.open(res.message, "Okay", {
            duration: 20000,
          });
          
          this._router.navigate(['/admin/list-exam']);
          // this._router.navigate(['/view-questions'],{id:});
        },
        error:res => {
          this.progressBar = false;
          this.error = res.error.message;
          console.log(res);
        },
      })
    }

    // console.log(this.addQuesForm);
    // this.progressBar = false;
    

   }


}
