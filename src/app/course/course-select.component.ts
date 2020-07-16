import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api/api.service';
interface Courses{
  value:string;
  viewValue:string;

}


@Component({
  selector: 'ep-course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.css']
})
export class CourseSelectComponent implements OnInit {
  courses: Courses[]=[];

  courseGroup:FormGroup;
  error:string='';
  submitBar:boolean = false;
  

  constructor(private _fb:FormBuilder ,
    private _route:ActivatedRoute,private _api:ApiService ,private router:Router) { }

  ngOnInit(): void {
    // console.log(this._route.snapshot.data['data']);
    this._route.snapshot.data['data'].course.forEach(element => {
      this.courses.push({value:element.course_code,viewValue:element.course_name});
    });
    
    this.courseGroup  = this._fb.group({   
      courseGp : this._fb.group({
      course: ['', Validators.required]
    }),
    pinGp : this._fb.group({
      pin: ['', [Validators.required ,Validators.minLength(4)]]
    }),
      });

  }

  public onSubmit(value)
  {

      this.submitBar = true;
    // document.documentElement.requestFullscreen();
    // window.open("www.google.com", "popup window", 'width=400,height=200,scrollbars=yes'); 
    this._api.getQuestion(value).subscribe(
      {
          next: res =>{  
            this.submitBar = false;
            this.error ='';
            // console.log("received Response")
            this.router.navigate(['/questions/question'],{state:{data:res}});
          
          },
          error:err => {
            this.submitBar = false;
            this.error = err.error.message;
            console.error(err.error)
          }
      }
    );

  }

}
