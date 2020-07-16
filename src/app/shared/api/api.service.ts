import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map, tap, shareReplay } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient,private datepipe:DatePipe) { }

getQuestion(value: any)
  {  
    
    
    let params = new HttpParams();
    params = params.append('course_code', value.courseGp.course);
    params = params.append('exam_code', value.pinGp.pin);
    const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};
  
    return this._http.get(environment.startExam ,{params:params,headers:headers}).pipe(
      // catchError(this.handleError),
        
          map( response => response),
          tap(res=> console.log(res))
        
    );

}      
    
  

getCourse():Observable<void|any>{

  return this._http.get(environment.fetchCourse);
}

getSourceCode(id):Observable<void |any>
{
  let params = new HttpParams();
  params = params.append('question_id', id);
  const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};

  return this._http.get<any>(environment.fetchCode ,{params:params,headers:headers}).pipe(
    // catchError(this.handleError),
     
        tap(res=> console.log(res)),
        shareReplay()      
  );
} 
    
  run(input:any,source:any,lang:string,qid:any):Observable<void |any>
  {

        const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};
        let body  = { 'question_id': qid,    
                      'source_code':source,
                      'lang':lang,
                      'input':input,                                             
                    }  
        return this._http.post<any>(environment.run,body,{headers})
          .pipe(
            // catchError(this.handleError),
            tap(res=> console.log(res)),
            shareReplay()
          ); 
  }

  update_duration(exam_id:any,duration_left:any):Observable<void |any>
  {

        const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};
        let body  = { 'exam_id': exam_id,    
                      'duration_left':duration_left,                                             
                    }  

        return this._http.put<any>(environment.updateDuration,body,{headers})
          .pipe(
            // catchError(this.handleError),
            tap(res=> console.log(res)),
           
          ); 
  }

  saveState(source:any,lang:string,qid:any):Observable<void |any>
  {

        const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};
        let body  = { 'question_id': qid,    
                      'source_code':source,
                      'lang':lang,
                      // 'input':input,                                             
                    }  
        return this._http.put<any>(environment.saveSource,body,{headers})
          .pipe(
            // catchError(this.handleError),
            tap(res=> console.log(res)),
          ); 
  }

  submit(input:any,source:any,lang:string,qid:any):Observable<void |any>
  {

        const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};
        let body  = { 'question_id': qid,    
                      'source_code':source,
                      'lang':lang,
                      'input':input,                                             
                    }  
        return this._http.post<any>(environment.submit,body,{headers})
          .pipe(
            // catchError(this.handleError),
            tap(res=> console.log(res)),
            shareReplay()
          ); 
  }


  //// admin Api servicess

  
  getAdminInfo():Observable<void|any>{

    return this._http.get(environment.adminData).pipe(
        // tap(res=> console.log(res))
    );
  }

  nextExam():Observable<void|any>{

    return this._http.get(environment.nextExam).pipe(
        // tap(res=> console.log(res))
    );
  }

  getOnlineUser():Observable<void|any>{

    return this._http.get(environment.onlineUser).pipe(
        // tap(res=> console.log(res))
    );
  }

  listExam():Observable<void|any>{

    return this._http.get(environment.listExam).pipe(
        // tap(res=> console.log(res))
    );
  }

  createExam(data:any):Observable<void |any>
  {

        const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};
        let body  = { 'exam_name': data.name,    
                      'exam_hours':data.duration,
                      'exam_date':this.datepipe.transform(data.date,"yyyy-MM-dd"),
                      'exam_time':data.time,                                             
                    }  

        console.log(body);
        return this._http.post<any>(environment.createExam,body,{headers})
          .pipe(
            // catchError(this.handleError),
            tap(res=> console.log(res)),
            shareReplay()
          ); 
  }

  addQuestion(data:any,examId:any):Observable<void |any>
  {
        const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};
        let body  = { 'exam_id': examId,    
                      'title':data.title,
                      'description':data.description,
                      'marks':data.marks,                                             
                    }  

        console.log(body);
        return this._http.post<any>(environment.addQuestion,body,{headers})
          .pipe(
            // catchError(this.handleError),
            tap(res=> console.log(res)),
            shareReplay()
          ); 
  }

    viewQuestions(examId:any):Observable<void |any>
    {
      let params = new HttpParams();
      params = params.append('exam_id', examId);
      const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};

      return this._http.get<any>(environment.viewQuestion ,{params:params,headers:headers}).pipe(
        // catchError(this.handleError),
        
            tap(res=> console.log(res)),
      );
    }


    deleteExam(examId:any):Observable<void |any>
    {
      let params = new HttpParams();
      params = params.append('exam_id', examId);
      // const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};
      // let urlcor="http://localhost:8000/api/delete_exam";

      const url = `${environment.deleteExam}`;
      return this._http.delete(url ,{params:params});
    }

    
    deleteQuestion(qID:any):Observable<void |any>
    {
      let params = new HttpParams();
      params = params.append('qid', qID);
      // const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};
      // let urlcor="http://localhost:8000/api/delete_exam";

      const url = `${environment.deleteQuestion}`;
      return this._http.delete(url ,{params:params});
    }

    editQuestion(data:any,qID:any):Observable<void |any>
    {
          const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};
          let body  = { 'question_id': qID,    
                        'title':data.title,
                        'description':data.description,
                        'marks':data.marks,                                             
                      }  
  
          console.log(body);
          return this._http.put<any>(environment.editQuestion,body,{headers})
            .pipe(
              shareReplay()
            ); 
    }
  
    questionByID(qid:any):Observable<void |any>
    {
      let params = new HttpParams();
      params = params.append('question_id', qid);
      const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};

      return this._http.get<any>(environment.qByID ,{params:params,headers:headers});
    }

    viewSubmission(qid:any):Observable<void |any>
    {
      let params = new HttpParams();
      params = params.append('exam_id', qid);
      const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};

      return this._http.get<any>(environment.viewSubmission ,{params:params,headers:headers});
    }

    checkStudentSub(examId:any, studentId:any):Observable<void |any>
    {
      let params = new HttpParams();
      params = params.append('exam_id', examId);
      params = params.append('student_id', studentId);

      const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};

      return this._http.get<any>(environment.checkStudentSub ,{params:params,headers:headers});
    }
    checkQuestion(questionId:any, studentId:any):Observable<void |any>
    {
      let params = new HttpParams();
      params = params.append('question_id', questionId);
      params = params.append('student_id', studentId);

      const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};

      return this._http.get<any>(environment.checkQuestion ,{params:params,headers:headers});
    }

    
  updateMarks(questionId:any,studentID:string,marks:any):Observable<void |any>
  {

        const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};
        let body  = { 'question_id': questionId,    
                      'student_id':studentID,
                      'marks':marks,
                      // 'input':input,                                             
                    }  
        return this._http.put<any>(environment.updateMarks,body,{headers});
  }

  updateInstructor(data:any):Observable<void |any>
  {

        const headers = {'Content-Type':'application/json; charset=utf-8','Accept':'application/json'};
        let body  = { 'email': data.email,    
                      'instructor_name':data.name,
                      // 'marks':marks,
                      // 'input':input,                                             
                    }  
        return this._http.put<any>(environment.updateInstructor,body,{headers});
  }
}
