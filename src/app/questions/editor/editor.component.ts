import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';

// editor imports
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-php';
// import 'ace-builds/src-noconflict/mode-html';
// import 'ace-builds/src-noconflict/mode-css';
// import 'ace-builds/src-noconflict/mode-mysql';



import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/theme-gob';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/theme-vibrant_ink';


import 'ace-builds/src-noconflict/theme-chaos';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-eclipse';
import 'ace-builds/src-noconflict/theme-github';


import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/keybinding-sublime';
import 'ace-builds/webpack-resolver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';





interface Themes{
  value:string;
  viewValue:string;

}

interface FontSizes{
  value:string;
  viewValue:string;

}

interface Languages{
  value:string;
  viewValue:string;

}



const THEME = 'ace/theme/vibrant_ink';
const LANG = 'ace/mode/java';
const INIT_CONTENT = '';

@Component({
  selector: 'ep-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit ,OnInit,OnDestroy{



  private codeEditor: ace.Ace.Editor;
  private editorBeautify;
  @ViewChild('codeEditor') private codeEditorElmRef: ElementRef;
  @Input() content:string;
  element:any;
  exam:any;
  question:any;
  lang:any;
  output:any ='';
  error:any ='';
  status:any ={code:true ,value:""};
  submitBar:boolean = false;
  interval:any;
  document:string[]
  =[ 
    "#include<stdio.h> \n int main(){ printf(\"Hello World\"); return 0; }",
    " import java.util.*; \n import java.lang.*; \n  public class MyClass {public static void main(String[] args){System.out.println(\"Hello World\");} }",
    "print(\"Hello World\")",
    "function fun(){ window.alert(\' Hello World\');}",
    "#include<iostream> int main(){ cout<<\"Hello World\"); return 0; }",
    "<?php echo \"Hello World\";?>",
];

  languages:Languages[] =[
    {value:"ace/mode/c_cpp",viewValue:"C"},
    {value:"ace/mode/java",viewValue:"JAVA"},
    {value:"ace/mode/python",viewValue:"PYTHON"},
    {value:"ace/mode/javascript",viewValue:"JAVASCRIPT_NODE"},
    {value:"ace/mode/c_cpp",viewValue:"CPP14"},
    {value:"ace/mode/php",viewValue:"PHP"},
    // {value:"ace/mode/html",viewValue:"HTML"},
    // {value:"ace/mode/css",viewValue:"CSS"},
    // {value:"ace/mode/mysql",viewValue:"MySql"},
  ];

  themes:Themes[] =[
    {value:"ace/theme/cobalt",viewValue:"Cobalt"},
    {value:"ace/theme/twilight",viewValue:"Twilight"},
    {value:"ace/theme/gob",viewValue:"Green on Black"},
    {value:"ace/theme/terminal",viewValue:"Terminal"},
    {value:"ace/theme/vibrant_ink",viewValue:"Vibrant Int"},
    {value:"ace/theme/github",viewValue:"Github"},
    {value:"ace/theme/xcode",viewValue:"XCode"},
    {value:"ace/theme/chrome",viewValue:"Chrome"},
    {value:"ace/theme/eclipse",viewValue:"Eclipse"},
  ];
  
  fontSizes:FontSizes[]  =[  
    {value :"14px", viewValue:"14px" },
    {value :"16px", viewValue:"16px" },
    {value :"20px", viewValue:"20px" },
    {value :"24px", viewValue:"24px" },
    {value :"30px", viewValue:"30px" },
  ];

  editorOption:FormGroup;

  constructor(private _fb:FormBuilder,
    private _router:Router ,
    private _api:ApiService,
    private _snackBar :MatSnackBar,) { }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  ngOnInit(): void {

    this.lang = 'ace/mode/java';
    if(history.state.exam && history.state.question)
    {
      this.exam = history.state.exam;
      this.question = history.state.question;
      // console.log(this.question);
    }
    else{
      // this.data = JSON.parse(localStorage.getItem( '_data'));
          this._router.navigate(['/questions/question']);
    }

    if(this.question !== undefined)
    this._api.getSourceCode(this.question.id).subscribe(
      {
        next: res => { 
          if(res.source_code !== null){
            localStorage.setItem(`${this.question.id}`, res.source_code);    
          }
          if(res.lang!== "")
            {   this.lang = this.languages.filter(function (entry) { return entry.viewValue === res.lang; })[0].value;
                localStorage.setItem(`${this.question.id}+lang`,this.lang);
                // console.log(this.lang);
            }
  
          const item = localStorage.getItem(`${this.question.id}`);
          const lang = localStorage.getItem(`${this.question.id}+lang`);
          
          if(lang!== null)
              this.editorOption.get("language").setValue(lang);
          
          if(item !== null)
            this.setContent(item);
          // console.log(this.content);
        }
        
        ,
        error:err => console.log(err)
        
      });
      
      

      this.content = this.document[1];
      
      this.editorBeautify = ace.require('ace/ext/beautify');
  
      this.editorOption = this._fb.group(
      
        {
          theme:[ 'ace/theme/vibrant_ink',[Validators.required]],
          language:[this.lang,[Validators.required]],
          fontSize:['16px',[Validators.required]],
          input:['']
  
  
        }
      );
      
    }
    


  ngAfterViewInit(): void {
   
    ace.require('ace/ext/language_tools');
    
        // console.log(this.codeEditorElmRef);
        this.element = this.codeEditorElmRef.nativeElement;
        const editorOptions = this.getEditorOptions();
        this.codeEditor = this.createCodeEditor(this.element, editorOptions);
        this.setContent(this.content || INIT_CONTENT);
        // hold reference to beautify extension
        this.beautifyContent();
        
 

    this.codeEditor.on('blur', (delta) => {
      const content = this.codeEditor.getValue();

        console.log("State change");
        this.saveState();
      localStorage.setItem(`${this.question.id}`, content);
    
  });

}


  onThemeChange(data:any)
  {
   let theme = data.value;

    this.codeEditor.setTheme(theme);

  }

  onLanguageChange(data:any)
  {
     const item=  localStorage.getItem(`${this.question.id}`);

    switch(data.value)
    {
      case this.languages[0].value:  
                this.setContent(item !== null? item :this.document[0]);break;
      case this.languages[1].value:  
                this.setContent(item !== null? item :this.document[1]);break;
      case this.languages[2].value:  
                this.setContent(item !== null? item :this.document[2]);break;
      case this.languages[3].value:  
                this.setContent(item !== null? item :this.document[3]);break;
      case this.languages[4].value:  
                this.setContent(item !== null? item :this.document[4]);break;
      case this.languages[5].value:  
                this.setContent(item !== null? item :this.document[5]);break;
      default: this.setContent(this.content || INIT_CONTENT);break;
    }

    this.beautifyContent();
    this.codeEditor.getSession().setMode(data.value);
    localStorage.setItem(`${this.question.id}+lang`,data.value);
  }

  onSizeChange(data:any)
  {
    this.codeEditor.setFontSize(data.value);
  }

  private createCodeEditor(element: Element, options: any): ace.Ace.Editor {
    const editor = ace.edit(element, options);
    editor.setTheme(THEME);
    editor.getSession().setMode(LANG);
    editor.setShowFoldWidgets(true);
    editor.setFontSize("16px");
    editor.setAutoScrollEditorIntoView(true);
    // editor.session.setUseWrapMode(true);    

    editor.setKeyboardHandler("ace/keyboard/sublime");
    
    return editor;
}

  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
        highlightActiveLine: true,
        minLines: 20,
        maxLines: 24,
        animatedScroll:true,
    };
    const extraEditorOptions = { enableBasicAutocompletion: true };
    return Object.assign(basicEditorOptions, extraEditorOptions);
}

public getContent() {
  if (this.codeEditor) {
      const code = this.codeEditor.getValue();
      return code;
  }
}
public setContent(content: string): void {
  if (this.codeEditor) {
    
      this.codeEditor.setValue(content);
  }
}

public run()
{
  // this.submitBar = true; 
  const input = this.editorOption.get('input').value;
  const source = this.getContent();
  const lang = this.languages.filter( element=> element.value == this.editorOption.get('language').value)[0].viewValue;
  const qid = this.question.id;
  
if(!this.submitBar)
{
  this.submitBar = true;

this._api.run(input,source,lang,qid).subscribe({
  next:res =>{
      this.submitBar = false;
    if(res.hackerearth.run_status.status!=='AC' )
      {
        this.status = {code:false,value:res.hackerearth.run_status.status_detail}; 
        this.error = res.hackerearth.compile_status;
        this.error = "Compilation Status :" +this.error+"<br> STDERR:"+res.hackerearth.run_status.stderr;
        this._snackBar.open("Error :"+this.status.value, "Okay", {
          duration: 5000,
        });
      
      }
    else{
      this._snackBar.open("Compiled Successfully", "Okay", {
        duration: 5000,
      });
        this.error = '';
        this.status = {code:true ,value:"Code Exceuted Successfully"};
        this.output = res.hackerearth.run_status.output_html;
      }
  },
  error:err => {
    this.submitBar = false;
    this._snackBar.open("Error :"+err.error.message, "Okay", {
      duration: 10000,
    });
  }
  });

}
// console.log("Run " + "Input :"+input+"  Code  :" +source+"lang :"+lang + "qid"+qid);
}

public submit()
{
   // this.submitBar = true; 
   const input = this.editorOption.get('input').value;
   const source = this.getContent();
   const lang = this.languages.filter( element=> element.value == this.editorOption.get('language').value)[0].viewValue;
   const qid = this.question.id;
   
 if(!this.submitBar)
 {
   this.submitBar = true;
 
 this._api.submit(input,source,lang,qid).subscribe({
   next:res =>{
       this.submitBar = false;
     if(res.hackerearth.run_status.status!=='AC' )
       {
         this.status = {code:false,value:res.hackerearth.run_status.status_detail}; 
         this.error = res.hackerearth.compile_status;
         this.error = "Compilation Status :" +this.error+"<br> STDERR:"+res.hackerearth.run_status.stderr;
       }
     else{
       this._snackBar.open("Submitted Successfully", "Okay", {
         duration: 5000,
       });
         this.error = '';
         this.status = {code:true ,value:"Code Submitted Successfully"};
         this.output = res.hackerearth.run_status.output_html;
       }
   },
   error:err => {
     this.submitBar = false;
     this._snackBar.open("Error :"+err.error.message, "Okay", {
       duration: 10000,
     });
   }
   });
 
 }

  // console.log("Submit" + "Input :"+input+"  Code  :" +source+"lang :"+lang + "qid"+qid);
}


public saveState()
{
   // this.submitBar = true; 
   const input = this.editorOption.get('input').value;
   const source = this.getContent();
   const lang = this.languages.filter( element=> element.value == this.editorOption.get('language').value)[0].viewValue;
   const qid = this.question.id;
  this._api.saveState(source,lang,qid).subscribe({
   next:res =>{},
   error:err => {}
   });
 
 }



public beautifyContent(): void {
  if (this.codeEditor && this.editorBeautify) {
      const session = this.codeEditor.getSession();
      session.setMode(this.languages[0].value);
      this.editorBeautify.beautify(session);
      session.setMode(this.editorOption.get('language').value);
      // console.log(this.editorOption.get('language').value);
  }
}



// public OnContentChange(callback: (content: string, delta: ace.Ace.Delta) => void): void {
//   this.codeEditor.on('change', (delta) => {
//       const content = this.codeEditor.getValue();

//         console.log("State change");
//         this.saveState();
//       localStorage.setItem(`${this.question.id}`, content);
//       callback(content, delta);
//   });
// }


}
